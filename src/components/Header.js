import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  AppBar,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { Draw, logo } from "../assets";
import SessionTimeOut from "./helper/SessionTimeOut";
import SideBar from "./sideBar/SideBar";
import StyledImage from "./StyledImage";
import { logoutAuth } from "../newStore/reducers/auth";
import {
  logoutCurrentUser,
  setCurrentUser,
} from "../newStore/reducers/currentUser";
import { setRole } from "../newStore";
import { removeSocket } from "./helper/removeSocket";
import { GlobalStore } from "../context/globalStore";
import { logoutMatchDetails } from "../newStore/reducers/matchDetails";
import IdleTimer from "./IdleTimer";
import ModalMUI from "@mui/material/Modal";
import CustomLoader from "./helper/CustomLoader";
import NewBoxData from "./NewBoxData";
import { memo } from "react";

const CustomHeader = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSideBarMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  let { axios } = setRole();
  const [firstTimeLoader, setFirstTimeLoader] = useState(true);

  const { currentUser } = useSelector((state) => state?.currentUser);

  const { setGlobalStore } = useContext(GlobalStore);
  const { socket, socketMicro } = useContext(SocketContext);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // User returned to the web browser
        console.log("User returned from sleep mode 111 user");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("role4");
    };

    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFirstTimeLoader(false);
    }, 4000);
  }, []);

  useEffect(() => {
    // Your existing code within the event handler
    let checkLoStorage = localStorage.getItem("role4");
    let checkSeStorage = sessionStorage.getItem("JWTuser");
    if (checkSeStorage && checkLoStorage === null) {
      localStorage.setItem("role4", "role4");
    }
  }, [localStorage]);

  // useEffect(() => {
  //   if (socket && socket.connected) {
  //     socket.onevent = async (packet) => {
  //     };
  //   }
  // }, [socket]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");

      localStorage.setItem("role4", "role4");
      dispatch(setCurrentUser(data.data));
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        navigate("/");
        // LogoutUser();
        dispatch(logoutMatchDetails());
        dispatch(logoutCurrentUser());
        dispatch(logoutAuth());
        socket.disconnect();
        socketMicro.disconnect();
        setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
        // // await axios.get("auth/logout");
        removeSocket();
      }
    }
  }

  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);

  const handleGetNotification = async () => {
    try {
      const { data } = await axios.get(`/users/getNotification`);
      console.log(data, "data");
      if (data?.data?.id) {
        setNotificationData(data.data.typeValue);
      }
    } catch (err) {
      console.log(err?.response.data.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    handleGetNotification();
    getUserDetail();
  }, []);

  return (
    <>
      <ModalMUI
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: !isOnline ? "none" : "center",

          backgroundColor: "white",
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(2px)",
            backgroundColor: "white",
          },
        }}
        open={firstTimeLoader}
        // onClose={setSelected}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          {!isOnline && (
            <Box
              sx={{
                position: "absolute",
                height: "32px",
                display: "flex",
                width: "100%",
                background: !isOnline ? "red" : "green",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "text.white",
                  fontSize: "13px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {!isOnline && "Your are currently offline"}
              </Typography>
            </Box>
          )}
          <CustomLoader height={"100%"} />
        </Box>
      </ModalMUI>
      <SessionTimeOut />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
        <IdleTimer role="user" />
        {!isOnline && (
          <Box
            sx={{
              height: "32px",
              display: "flex",
              background: !isOnline && "red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "text.white",
                fontSize: "13px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {!isOnline && "Your are currently offline"}
            </Typography>
          </Box>
        )}
        <Box
          sx={[
            {
              width: "100%",
              minHeight: { laptop: 90, tablet: 80, mobile: 40 },
              display: "flex",
              flexDirection: matchesMobile ? "column" : "row",
              alignItems: !matchesMobile ? "center" : "flex-start",
              justifyContent: "space-between",
              // paddingLeft: { laptop: "6.5%" },
              paddingRight: { laptop: "1%" },
              paddingX: { mobile: "2%", laptop: "1%" },
              paddingY: matchesMobile ? "5px" : "0px",
              paddingBottom: matchesMobile ? "5px" : "0px",
            },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.headerGradient}`,
            }),
          ]}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <StyledImage
                onClick={() => {
                  if (matchesMobile || showSideBarMobile) {
                    setMobileOpen(!mobileOpen);
                  }
                }}
                src={Draw}
                sx={{
                  height: { laptop: "24px", mobile: "20px" },
                  width: "auto",
                }}
              />
              <StyledImage
                onClick={(e) => {
                  navigate("/matches", { state: { activeTab: "CRICKET" } });
                  e.stopPropagation();
                }}
                src={logo}
                sx={{
                  height: { laptop: "45px", mobile: "30px" },
                  width: "auto",
                  marginLeft: { laptop: "20px", mobile: "10px" },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { mobile: "column-reverse", laptop: "row" },
                alignItems: "center",
              }}
            >
              <NewBoxData
                showDropDown={false}
                containerStyle={{ marginTop: matchesMobile ? "5px" : "0px" }}
                valueStyle={{}}
                title={"Exposure"}
                value={currentUser?.exposure || 0}
              />
              <NewBoxData
                showDropDown={true}
                title={currentUser?.userName || ""}
                valueStyle={{ color: "white" }}
                titleStyle={{ color: "white" }}
                value={currentUser?.current_balance || 0}
                containerStyle={{ background: "#0B4F26" }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: "32px",
            display: "flex",
            background: "#202020",
            alignItems: "center",
          }}
        >
          <marquee loop={true} scrollamount="3">
            <Typography
              sx={{
                color: "text.white",
                fontSize: "10px",
                fontStyle: "italic",
                letterSpacing: "1px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                textOverflow: "ellipsis",
              }}
            >
              {notificationData}
            </Typography>
          </marquee>
        </Box>

        {(matchesMobile || showSideBarMobile) && (
          <MobileSideBar
            showSideBarMobile={showSideBarMobile}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        )}
      </AppBar>
      <Box sx={{ minHeight: { laptop: 90 + 32, mobile: 60 + 32 + 21 } }} />
    </>
  );
};

const MobileSideBar = ({ mobileOpen, setMobileOpen, showSideBarMobile }) => {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: {
          top: "114px",
        },
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: { laptop: "300px", mobile: "190px" },
        },
      }}
    >
      <Box
        sx={{
          minHeight: {
            laptop: showSideBarMobile ? 50 + 32 + 40 : 90 + 32 + 40,
            // mobile: 60 + 32 + 21,
          },
        }}
      />
      <Box sx={{ height: "100vh" }}>
        <SideBar mobileShow={true} handleDrawerToggle={handleDrawerToggle} />
      </Box>
    </Drawer>
  );
};
export default memo(CustomHeader);
