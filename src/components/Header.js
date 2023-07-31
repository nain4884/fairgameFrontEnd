import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Drawer,
  AppBar,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { ArrowDown, Draw, logo, Logout, DownIcon } from "../assets";
import SessionTimeOut from "./helper/SessionTimeOut";
import SideBar from "./sideBar/SideBar";
import StyledImage from "./StyledImage";
import { logout, logoutAuth } from "../newStore/reducers/auth";
import {
  logoutCurrentUser,
  removeCurrentUser,
  setCurrentUser,
} from "../newStore/reducers/currentUser";
import axios from "../axios/axios";
import { setRole } from "../newStore";
import { removeSocket } from "./helper/removeSocket";
import { GlobalStore } from "../context/globalStore";
import {
  logoutMatchDetails,
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setConfirmAuth,
} from "../newStore/reducers/matchDetails";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import IdleTimer from "./IdleTimer";
import ModalMUI from "@mui/material/Modal";
import CustomLoader from "./helper/CustomLoader";

const CustomHeader = ({}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSideBarMobile, setShowSideBarMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  let { axios } = setRole();
  const [firstTimeLoader, setFirstTimeLoader] = useState(true);

  const { currentUser } = useSelector((state) => state?.currentUser);

  const { globalStore, setGlobalStore } = useContext(GlobalStore);
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
    const handleBeforeUnload = (event) => {};

    const handleLoad = (event) => {
      let jwtS = sessionStorage.getItem("JWTuser");
      let jwtL = localStorage.getItem("JWTuser");
      if (jwtS && jwtL) {
        const jwtSDecoded = jwtDecode(jwtS);
        const jwtLDecoded = jwtDecode(jwtL);
        function getLatestJWT(jwt1, jwt2) {
          if (jwt1.iat > jwt2.iat) {
            return jwt1;
          } else {
            return jwt2;
          }
        }
        const latestJWT = getLatestJWT(jwtSDecoded, jwtLDecoded);
        function checkSubMatch(resultObj, jwt1, jwt2) {
          return resultObj.sub === jwt1.sub || resultObj.sub === jwt2.sub;
        }
        const result = checkSubMatch(latestJWT, jwtSDecoded, jwtLDecoded);
        if (result) {
          // dispatch(removeCurrentUser());
          // dispatch(removeManualBookMarkerRates());
          // dispatch(removeSelectedMatch());
          // dispatch(logout({ roleType: "role4" }));//add
          dispatch(logoutMatchDetails());
          dispatch(logoutCurrentUser());
          dispatch(logoutAuth());
          localStorage.removeItem("role4");
          localStorage.removeItem("JWTuser");
          sessionStorage.clear();
          socket?.disconnect();
          socketMicro?.disconnect();
          setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
          // await axios.get("auth/logout");
          removeSocket();
          localStorage.setItem("role4", "role4");
        }

        console.log("jwtSDecoded,jwtLDecoded", jwtSDecoded, jwtLDecoded);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("load", handleLoad);
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

  const [selected, setSelected] = useState(
    location.state?.activeTab || "CRICKET"
  );

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
        localStorage.removeItem("role4");
        localStorage.removeItem("JWTuser");
        sessionStorage.clear();
        // dispatch(removeCurrentUser());
        // dispatch(removeManualBookMarkerRates());
        // dispatch(removeSelectedMatch());
        // dispatch(logout({ roleType: "role4" }));
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
          <marquee loop={true}>
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

const BoxMobile = ({ value }) => {
  return (
    <Box
      sx={{
        width: "130px",
        height: "23px",
        background: "red",
        borderRadius: "12px",
        // justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <Typography
        sx={{
          fontSize: "11px",
          color: "black",
          fontWeight: "500",
          marginLeft: "5px",
        }}
      >
        {value}:
        <span style={{ color: "#27AC1E", fontWeight: "700" }}>10,000,00</span>
      </Typography>
    </Box>
  );
};

const NewBoxData = ({
  title,
  value,
  showDropDown,
  containerStyle,
  valueStyle,
  titleStyle,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    // console.log(anchorEl)
  }, [anchorEl]);
  const handleClose = () => {
    setAnchorEl(0);
  };

  const { axios } = setRole();
  return (
    <Box>
      <Box
        onClick={(event) => {
          if (title != "Exposure") {
            handleClick(event);
          }
        }}
        sx={[
          {
            backgroundColor: "white",
            minWidth: { laptop: "120px", mobile: "110px" },
            marginLeft: "1vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            height: { laptop: "35px", mobile: "33px" },
            overflow: "hidden",
            paddingX: "3px",
            borderRadius: "5px",
            cursor: "pointer",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={{
            marginLeft: { laptop: "5px", mobile: "5px" },
            justifyContent: { mobile: "center" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={[
              {
                fontSize: { laptop: "8px", mobile: "8px" },
                fontWeight: { mobile: "bold", laptop: "500px" },
                textTransform: showDropDown && "capitalize",
                whiteSpace: showDropDown && "nowrap",
                textOverflow: showDropDown && "ellipsis",
                maxWidth: showDropDown && "54px",
                overflow: showDropDown && "hidden",
                marginLeft: 0.5,
                color: "black",
              },
              titleStyle,
            ]}
          >
            {title}
          </Typography>
          <Typography
            sx={[
              {
                fontWeight: "bold",
                color: "#27AC1E",
                fontSize: { mobile: "12px", laptop: "12px" },
                marginLeft: 0.5,
              },
              valueStyle,
            ]}
          >
            {value}
          </Typography>
        </Box>
        {showDropDown && (
          <Box>
            <StyledImage
              src={DownIcon}
              sx={{ height: "10px", width: "10px", marginRight: "5px" }}
            />
          </Box>
        )}
      </Box>
      <DropdownMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
        axios={axios}
      />
    </Box>
  );
};
const BoxMoney = ({ image, title, value, containerStyle }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      sx={[
        {
          backgroundColor: "white",
          minWidth: { laptop: "120px", mobile: "120px" },
          marginLeft: "1vw",
          display: "flex",
          alignItems: "center",
          boxShadow: "0px 3px 10px #B7B7B726",
          height: { laptop: "35px", mobile: "35px" },
          overflow: "hidden",
          paddingX: "3px",
          borderRadius: "40px",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={{
          height: { mobile: "30px", laptop: "30px" },
          width: { laptop: "30px", mobile: "28px" },
          borderRadius: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FEFEFE",
          boxShadow: "0px 0px 5px #00000026",
        }}
      >
        <StyledImage src={image} sx={{ height: "50%", width: "auto" }} />
      </Box>
      <Box
        sx={{
          marginLeft: { laptop: "5px", mobile: "5px" },
          justifyContent: { mobile: "center" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: "8px", mobile: "8px" },
            fontWeight: { mobile: "bold", laptop: "500px" },
            marginLeft: 0.5,
            color: "black",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#27AC1E",
            fontSize: { mobile: "12px", laptop: "12px" },
            marginLeft: 0.5,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const BoxProfile = ({ image, value, containerStyle }) => {
  const theme = useTheme();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    // console.log(anchorEl)
  }, [anchorEl]);
  const handleClose = () => {
    setAnchorEl(0);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        minWidth: { laptop: "120px" },
      }}
    >
      <Box
        onClick={(event) => handleClick(event)}
        sx={[
          {
            backgroundColor: "primary.main",
            minWidth: { laptop: "120px", mobile: "90px" },
            marginLeft: "1vw",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            justifyContent: "space-between",
            height: { laptop: "35px", mobile: "30px" },
            overflow: "hidden",
            paddingX: "2px",
            borderRadius: "35px",
          },
          containerStyle,
        ]}
      >
        <StyledImage
          src={image}
          sx={{
            height: { laptop: "30px", mobile: "27px" },
            width: { laptop: "30px", mobile: "27px" },
            borderRadius: "150px",
          }}
        />
        <Box style={{}}>
          <Typography
            sx={{
              fontSize: { laptop: "11px", mobile: "8px" },
              color: "text.white",
              fontWeight: "600",
            }}
          >
            {value}
          </Typography>
        </Box>
        <StyledImage
          src={ArrowDown}
          sx={{ height: "6px", width: "10px", marginRight: "5px" }}
        />
      </Box>
      <DropdownMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
        axios={axios}
      />
    </Box>
  );
};

const menutItems = [{ title: "Rules", link: "/rules" }];
const DropdownMenu = ({ anchorEl, open, handleClose, axios }) => {
  const [loading, setLoading] = useState(false);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket, socketMicro } = useContext(SocketContext);

  const logoutProcess = async () => {
    try {
      // dispatch(setConfirmAuth(false));
      sessionStorage.setItem("JWTuser", null);
      setLoading(true);
      localStorage.setItem("confirmAuth", false);
      handleClose();
      dispatch(logoutMatchDetails());
      dispatch(logoutCurrentUser());
      dispatch(logoutAuth());
      localStorage.removeItem("role4");
      localStorage.removeItem("JWTuser");
      sessionStorage.clear();
      // dispatch(removeCurrentUser());
      // removeSocket();
      // dispatch(logout({ roleType: "role4" }));
      setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
      // dispatch(removeManualBookMarkerRates());
      // dispatch(removeSelectedMatch());
      socket.disconnect();
      socketMicro.disconnect();
      navigate("/");
      const { data } = await axios.get("auth/logout");
      if (data?.data == "success logout") {
        toast.success(data?.data);
      }
    } catch (e) {
      toast.error(e.response?.data?.message);
      setLoading(false);
      console.log("error", e.message);
    }
  };
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        sx: {
          marginLeft: matchesMobile ? "7px" : "2px",
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {menutItems.map((x, idx) => (
        <MenuItem
          key={idx}
          dense={true}
          sx={{
            fontSize: { laptop: "12px", mobile: "10px" },
            fontWeight: "500",
            marginX: "5px",
            width: { laptop: "200px", mobile: "200px" },
            borderBottomWidth: 1,
            borderColor: "#EAEFEC",
            paddingY: "2px",
            borderStyle: "solid",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
              borderColor: "white",
              borderRadius: "5px",
              transform: "scale(1.02)",
            },
          }}
          onClick={() => {
            if (x.link) {
              navigate(x.link);
            }
            handleClose();
          }}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          if (!loading) {
            logoutProcess();
          } else {
            return false;
          }
        }}
        sx={{
          borderRadius: "5px",
          height: { laptop: "38px", mobile: "34px" },
          width: "200px",
          marginLeft: "5px",
          marginTop: "10px",
          backgroundColor: "#F1C550",
          display: "flex",
          border: "2px solid #2626264D",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={20}
            thickness={4}
            value={60}
          />
        ) : (
          <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
        )}
      </Box>
    </Menu>
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
export default CustomHeader;
