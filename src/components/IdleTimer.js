import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
import { SocketContext } from "../context/socketContext";
import { removeSocket } from "./helper/removeSocket";
import { GlobalStore } from "../context/globalStore";
import { removeCurrentUser } from "../newStore/reducers/currentUser";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../newStore/reducers/matchDetails";
import { logout } from "../newStore/reducers/auth";
import { useNavigate } from "react-router-dom";
import constants from "../components/helper/constants";

const IdleTimer = ({ role }) => {
  const { setGlobalStore } = useContext(GlobalStore);
  const { socket, socketMicro } = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [timer, setTimer] = useState(constants.customTimeOut);
  const [showTimer, setShowTimer] = useState(constants.sessionExpireTime);

  const handleOnIdle = (event) => {
    if (role == "user") {
      dispatch(removeCurrentUser());
      dispatch(removeManualBookMarkerRates());
      dispatch(removeSelectedMatch());
      dispatch(logout({ roleType: "role4" }));
      socket.disconnect();
      socketMicro.disconnect();
      setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
      // await axios.get("auth/logout");
      removeSocket();
      navigate("/");
    } else {
      const url = window.location.href;
      if (url.includes("expert")) {
        dispatch(removeManualBookMarkerRates());
        dispatch(removeCurrentUser());
        dispatch(logout({ roleType: "role3" }));
        socketMicro.disconnect();
        socket.disconnect();
        dispatch(removeSelectedMatch());
        setGlobalStore((prev) => ({
          ...prev,
          expertJWT: "",
          isSession: true,
        }));
        removeSocket();
        navigate("/expert");
      } else if (url.includes("wallet")) {
        dispatch(removeManualBookMarkerRates());
        dispatch(removeCurrentUser());
        dispatch(logout({ roleType: "role2" }));
        socketMicro.disconnect();
        socket.disconnect();
        dispatch(removeSelectedMatch());
        setGlobalStore((prev) => ({
          ...prev,
          JWTwallet: "",
          isSession: true,
        }));
        removeSocket();
        navigate("/wallet");
      } else if (url.includes("admin")) {
        dispatch(removeManualBookMarkerRates());
        dispatch(removeCurrentUser());
        dispatch(logout({ roleType: "role1" }));
        socketMicro.disconnect();
        socket.disconnect();
        dispatch(removeSelectedMatch());
        setGlobalStore((prev) => ({
          ...prev,
          JWTadmin: "",
          isSession: true,
        }));
        removeSocket();
        navigate("/admin");
      }
    }
  };

  const handleOnActive = (event) => {
    setShowWarning(false);
  };

  const handleOnAction = (event) => {
    console.log(event);
    if (event instanceof MouseEvent || event instanceof TouchEvent) {
      setShowWarning(false);
      setShowTimer(constants.sessionExpireTime);
    }
    let time = constants.customTimer;
    setTimer(getRemainingTime() - time);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: constants.customTimeOut,
    // onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  useEffect(() => {
    const warningTimeout = setTimeout(() => {
      setShowWarning(true);
    }, timer); // Show the warning 10 seconds before timeout

    let interval;
    if (showWarning) {
      if (showTimer > 0) {
        interval = setInterval(() => {
          setShowTimer((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setShowWarning(false);
      }
    }

    return () => {
      clearTimeout(warningTimeout);
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    let interval;
    if (showWarning) {
      if (showTimer > 0) {
        interval = setInterval(() => {
          setShowTimer((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setShowWarning(false);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [showWarning]);

  useEffect(() => {
    const updateTitle = () => {
      document.title = `${showTimer} sec${showTimer !== 1 ? "s" : ""}.`;
    };

    if (showTimer > 0 && showWarning) {
      updateTitle();
    } else {
      document.title = "Fairgame"; // Set your default title here
      if(showTimer===0){
        handleOnIdle();
      }
    }
  }, [showTimer, showWarning]);

  return (
    <>
      {showWarning && (
        <div
          style={{
            color: "#fdf21b",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Your session will expire in {showTimer} second{showTimer !== 1 && "s"}
          .
        </div>
      )}
    </>
  );
};

export default IdleTimer;
