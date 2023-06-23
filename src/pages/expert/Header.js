import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Drawer,
  AppBar,
  Toolbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Draw, logo, Logout, Money, MoneyBag } from "../../assets";
import SearchInput from "../../components/SearchInput";
import StyledImage from "../../components/StyledImage";
import { NotiBadge, Down, Users, ArrowLeft } from "../../expert/assets";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../store/activeUser";
import { stateActions } from "../../store/stateActions";
import SessionTimeOut from "../../components/helper/SessionTimeOut";
import AddNotificationModal from "../../components/AddNotificationModal";
import { ThisUseModal } from "../../components/Modal";
import { logout } from "../../newStore/reducers/auth";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  setAllMatchs,
  setAllEventSession,
  setEConfirmAuth
} from "../../newStore/reducers/expertMatchDetails";
import { setRole } from "../../newStore";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import { memo } from "react";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../../newStore/reducers/matchDetails";
import { a } from "@react-spring/web";
import ButtonHead from "./ButtonHead";
import ActiveUsers from "./ActiveUsers";
import BoxProfile from "./BoxProfile";
import DropdownMenu1 from "./DropDownMenu1";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const CustomHeader = ({ }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [isTransPasswordExist, setIsTransPasswordExist] = useState(false);
  const activeUser = useSelector((state) => state?.activeUser?.activeUser);
  const currentSelected = useSelector((state) => state?.activeUser?.selected);
  const dispatch = useDispatch();
  const location = useLocation();
  const [active, setActiveAdmin] = useState(0);
  const { allEventSession, activeUsers, allMatch } = useSelector(
    (state) => state?.expertMatchDetails
  );
  const [allMatchData, setAllMatchData] = useState([]);
  // const [allLiveEventSession, setAllLiveEventSession] = useState(allEventSession);
  const [balance, setBalance] = useState(0);
  const [onlineUser, setOnlineUser] = useState(activeUsers);
  const [fullName, setFullName] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  useEffect(() => {
    if (activeUsers !== 0) {
      setOnlineUser(activeUsers);
    }
  }, [activeUsers]);

  useEffect(() => {
    setAllMatchData(allMatch);
  }, [allMatch]);

  let { transPass, axios, role, JWT } = setRole();

  const { globalStore, setGlobalStore } = useContext(GlobalStore);

  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");
      localStorage.setItem("role3", "role3");
      dispatch(setCurrentUser(data.data));
      // alert(111)
      // setBalance(data.data.current_balance)
      // dispatch(stateActions.setBalance(data.data.current_balance, role, data.data.exposure))
      // setFullName(data.data.fullName)
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserCount() {
    try {
      const { data } = await axios.get("/users/onlineUserCount");
      // dispatch(setCurrentUser(data.data));
      setOnlineUser(data?.data);
      // alert(JSON.stringify(data.data));
      // setBalance(data.data.current_balance)
      // dispatch(stateActions.setBalance(data.data.current_balance, role, data.data.exposure))
      // setFullName(data.data.fullName)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);

  const { userExpert } = useSelector((state) => state.auth);
  const { socket, socketMicro } = useContext(SocketContext);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // localStorage.removeItem("role3");
      // localStorage.removeItem("JWTexpert");
    };

    const handleLoad = (event) => {
      let jwtS = sessionStorage.getItem("JWTexpert");
      let jwtL = localStorage.getItem("JWTexpert");
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
          // navigate("/expert");//add
          dispatch(removeManualBookMarkerRates());
          // dispatch(removeCurrentUser());
          // dispatch(logout({ roleType: "role3" }));//add
          socketMicro?.disconnect();
          socket?.disconnect();
          dispatch(removeSelectedMatch());
          setGlobalStore((prev) => ({
            ...prev,
            expertJWT: "",
            isSession: true,
          }));
          // await axios.get("auth/logout");
          removeSocket();
          localStorage.setItem("role3", "role3");
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
      // localStorage.removeItem("role3");//add
    };

    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Your existing code within the event handler
    let checkLoStorage = localStorage.getItem("role3");
    let checkSeStorage = sessionStorage.getItem("JWTexpert");
    if (checkSeStorage && checkLoStorage === null) {
      localStorage.setItem("role3", "role3");
    }
  }, [localStorage]);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.onevent = async (packet) => {
        if (packet.data[0] === "logoutUserForce") {
          // alert(4)
          dispatch(setEConfirmAuth(true));
          // localStorage.setItem("confirmAuth", true);
          let token = localStorage.getItem("JWTexpert");
          if (token) {
            sessionStorage.setItem("JWTexpert", token);
          }
          navigate("/expert");
          // dispatch(removeManualBookMarkerRates());
          // dispatch(removeCurrentUser());
          // dispatch(logout({ roleType: "role3" }));
          // socketMicro.disconnect();
          // socket.disconnect();
          // dispatch(removeSelectedMatch());
          // setGlobalStore((prev) => ({
          //   ...prev,
          //   expertJWT: "",
          //   isSession: true,
          // }));
          // await axios.get("auth/logout");
          // removeSocket();
        }
        if (packet.data[0] === "userBalanceUpdate") {
          const data = packet.data[1];
          const user = {
            ...currentUser,
            current_balance: data?.currentBalacne,
          };
          dispatch(setCurrentUser(user));

          //currentBalacne
        }
        if (packet.data[0] === "loginUserCount") {
          const data = packet.data[1];
          setOnlineUser(data?.count);
        }
      };
    }
  }, [socket]);

  useEffect(() => {
    if (location.pathname.includes("home")) {
      dispatch(setSelected(0));
    } else if (location.pathname.includes("match")) {
      dispatch(setSelected(null));
    } else if (location.pathname.includes("betodds")) {
      dispatch(setSelected(2));
    }
    setIsTransPasswordExist(userExpert?.isTransPasswordCreated);
  }, [location, userExpert]);

  useEffect(() => {
    getUserCount();
    if (allMatchData.length === 0) {
      getAllMatch();
    }
    // if (allEventSession?.length === 0) {
    getMatchLiveSession();
    // }
  }, []);

  const getMatchLiveSession = async () => {
    try {
      let response = await axios.get(`/game-match/getLiveMatchSession`);
      // setAllLiveEventSession(response.data.data[0]);
      dispatch(setAllEventSession(response.data.data[0]));
    } catch (e) {
      console.log(e);
    }
  };
  const getAllMatch = async () => {
    try {
      let response = await axios.get(`/game-match/getAllMatch`);
      setAllMatchData(response.data[0]);
      dispatch(setAllMatchs(response.data[0]));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (currentUser === null) {
      getUserDetail();
    }
  }, []);

  const handleAddNotification = async (val) => {
    try {
      const { data } = await axios.post(`/users/addNotification`, {
        typeValue: val,
      });
      if (data?.data?.id) {
        toast.success("Updated successfully");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err?.response.data.message);
      console.log(err.message);
    }
  };
  return (
    <>
      <SessionTimeOut />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <AddNotificationModal
          setVisible={setVisible}
          visible={visible}
          onClick={() => { }}
          onDone={(value) => {
            handleAddNotification(value);
          }}
        />
        <Box
          sx={[
            {
              width: "100%",
              minHeight: { laptop: 90, tablet: 80, mobile: 60 },
              display: "flex",
              flexDirection: matchesMobile ? "column" : "row",
              alignItems: !matchesMobile ? "center" : "flex-start",
              justifyContent: "space-between",
              paddingX: { laptop: "0.5%", mobile: "1%" },
              paddingY: matchesMobile ? "15px" : "0px",
              paddingBottom: matchesMobile ? "10px" : "0px",
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
              width: "100%",
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "12px",
              }}
            >
              <StyledImage
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
                src={Draw}
                sx={{
                  height: { laptop: "24px", mobile: "20px" },
                  width: "auto",
                }}
              />
              <StyledImage
                src={logo}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/expert/match`);
                }}
                sx={{
                  cursor: "pointer",
                  height: { laptop: "45px", mobile: "40px" },
                  width: "auto",
                  marginLeft: { laptop: "20px", mobile: "10px" },
                }}
              />
            </Box>
            {activeUser != 1 && activeUser != "2" && (
              <ButtonHead
                onClick={(e) => {
                  dispatch(setSelected(0));
                  navigate("/expert/home");
                }}
                title={"ADD MATCH"}
                boxStyle={{
                  backgroundColor:
                    currentSelected == 0 ? "white" : "transparent",
                  py: "5px",
                  borderRadius: "5px",
                  marginLeft: "15px",
                }}
                titleStyle={{ color: currentSelected == 0 ? "green" : "white" }}
              />
            )}
            {(activeUser == 1 || activeUser == "2" || activeUser == "3") && (
              <>
                <ButtonHead
                  onClick={(e) => {
                    dispatch(setSelected(1));
                    if (activeUser == "3") {
                      return;
                    }
                    setAnchor(e.currentTarget);
                  }}
                  title={"ALL MATCH"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 1 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                  titleStyle={{
                    color: currentSelected == 1 ? "green" : "white",
                  }}
                />
                {activeUser != "3" && (
                  <ButtonHead
                    onClick={(e) => {
                      dispatch(setSelected(5));
                      if (window.location.pathname.split("/")[2] == "live") {
                        return;
                      }
                      navigate("/expert/live");
                    }}
                    title={"ALL BET"}
                    boxStyle={{
                      backgroundColor:
                        currentSelected == 5 ? "white" : "transparent",
                      py: "5px",
                      borderRadius: "5px",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                    titleStyle={{
                      color: currentSelected == 5 ? "green" : "white",
                    }}
                  />
                )}
                {
                  <ButtonHead
                    onClick={(e) => {
                      dispatch(setSelected(4));
                      if (window.location.pathname.split("/")[2] == "match") {
                        return;
                      }
                      navigate("/expert/match");
                    }}
                    title={"MATCH LIST"}
                    boxStyle={{
                      backgroundColor:
                        window.location.pathname.split("/")[2] == "match"
                          ? "white"
                          : "transparent",
                      py: "5px",
                      borderRadius: "5px",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                    titleStyle={{
                      color:
                        window.location.pathname.split("/")[2] == "match"
                          ? "green"
                          : "white",
                    }}
                  />
                }
              </>
            )}
            {activeUser != 1 && activeUser !== "2" && (
              <>
                <ButtonHead
                  selected={currentSelected == 2}
                  onClick={(e) => {
                    dispatch(setSelected(2));
                    navigate("/expert/betodds");
                  }}
                  title={"BETFAIR ODDS"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 2 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                  }}
                  titleStyle={{
                    color: currentSelected == 2 ? "green" : "white",
                  }}
                />
                <ButtonHead
                  onClick={() => {
                    dispatch(setSelected(3));
                  }}
                  title={"MANUAL BOOKMAKER"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 3 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                  }}
                  titleStyle={{
                    color: currentSelected == 3 ? "green" : "white",
                  }}
                />
                <ButtonHead
                  onClick={() => {
                    dispatch(setSelected(4));
                  }}
                  title={"MANUAL SESSION"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 4 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                  }}
                  titleStyle={{
                    color: currentSelected == 4 ? "green" : "white",
                  }}
                />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: matchesMobile ? "100%" : "0px",
              alignItems: "center",
              marginTop: matchesMobile ? "15px" : "0px",
            }}
          >
            <Box
              onClick={() => {
                setVisible(true);
              }}
              sx={{
                height: "50px",
                width: "50px",
                borderRadius: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
              }}
            >
              <StyledImage
                src={NotiBadge}
                sx={{ height: "25px", width: "25px" }}
              />
            </Box>
            <Box>
              <ActiveUsers
                containerStyle={{}}
                image={Users}
                value={onlineUser}
              />
              <BoxProfile
                containerStyle={{ marginTop: "5px" }}
                image={"https://picsum.photos/200/300"}
                value={
                  activeUser == 1
                    ? "Session"
                    : activeUser == 2
                      ? "Bookmaker"
                      : "Betfair"
                }
                value1={currentUser?.userName || ""}
              />
            </Box>
          </Box>
        </Box>
      </AppBar>
      {isTransPasswordExist === "false" &&
        !/createTransPassword/.test(window.location.pathname) && (
          <ThisUseModal
            message="You don't have transaction password"
            buttonMessage="Create Transaction Password"
            navigateTo="createTransPassword"
          />
        )}
      <Box sx={{ minHeight: { laptop: 90, mobile: 60 + 32 + 42 } }} />
      <DropdownMenu1
        anchorEl={anchor}
        open={Boolean(anchor)}
        allMatch={allMatchData}
        handleClose={() => {
          setAnchor(null);
        }}
        allLiveEventSession={allEventSession}
      />
    </>
  );
};

// const MobileSideBar = ({ mobileOpen, setMobileOpen }) => {
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const container =
//     window !== undefined ? () => window.document.body : undefined;

//   return (
//     <Drawer
//       container={container}
//       variant="temporary"
//       open={mobileOpen}
//       onClose={handleDrawerToggle}
//       ModalProps={{
//         keepMounted: true, // Better open performance on mobile.
//       }}
//       sx={{
//         display: { xs: "block", sm: "none" },
//         "& .MuiDrawer-paper": { boxSizing: "border-box", width: "300px" },
//       }}
//     >
//       <Box sx={{ minHeight: { laptop: 90, mobile: 60 + 32 } }} />
//       <Box sx={{ height: "100vh" }}></Box>
//     </Drawer>
//   );
// };

export default memo(CustomHeader);
