import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useIdleTimer } from 'react-idle-timer'
import { SocketContext } from "../context/socketContext";
import { removeSocket } from "./helper/removeSocket";
import { GlobalStore } from "../context/globalStore";
import { removeCurrentUser } from "../newStore/reducers/currentUser";
import {
    removeManualBookMarkerRates, removeSelectedMatch,
} from "../newStore/reducers/matchDetails";
import { logout } from "../newStore/reducers/auth";
import { useNavigate } from "react-router-dom";

const IdleTimer = ({ role }) => {
    const { setGlobalStore } = useContext(GlobalStore);
    const { socket, socketMicro } = useContext(SocketContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnIdle = event => {
        // console.log('user is idle', event)
        // console.log('last active', getLastActiveTime())

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
            }
            else if (url.includes("wallet")) {
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
    }

    const handleOnActive = event => {
        // console.log('user is active', event)
        // console.log('time remaining', getRemainingTime())
    }

    const handleOnAction = event => {
        // console.log('user did something', event)
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 5 * 60 * 1000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    })

    return (
        <>
        </>
    )

}

export default IdleTimer;