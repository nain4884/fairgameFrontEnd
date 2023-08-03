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
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ModalMUI from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Draw, logo, Logout } from "../../assets";
import SearchInput from "../../components/SearchInput";
import SessionTimeOut from "../../components/helper/SessionTimeOut";
import StyledImage from "../../components/StyledImage";
import { stateActions } from "../../store/stateActions";
import { setActiveAdmin } from "../../store/admin";
import SideBarAdmin from "../../components/sideBar/SideBarAdmin";
import { ThisUseModal } from "../../components/Modal";
import LiveMarket from "./LiveMarket";
import ButtonHead from "./ButtonHead";
import DropdownMenu2 from "./WithrawDepositMenu";
import DropdownMenu1 from "./MenuBar";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  logout,
  setPage,
  setUpdatedTransPasswords,
} from "../../newStore/reducers/auth";
import { setRole } from "../../newStore";
import { removeSocket } from "../helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../../newStore/reducers/matchDetails";
import { toast } from "react-toastify";
import { memo } from "react";
import MobileSideBar from "./MobileSideBar";
import BoxProfile from "./BoxProfile";
import jwtDecode from "jwt-decode";
import {
  setWConfirmAuth,
  setAConfirmAuth,
} from "../../newStore/reducers/expertMatchDetails";
import EventListing from "../EventListing";
import AdminEventListing from "../AdminEventListing";
import HomeSlide from "../HomeSlide";
import IdleTimer from "../../components/IdleTimer";
import CustomLoader from "../helper/CustomLoader";
import {
  setAdminAllMatches,
  setSelectedMatch,
  setSessionOffline,
} from "../../newStore/reducers/adminMatches";

var roleName = "";
const CustomHeader = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [anchor1, setAnchor1] = React.useState(null);
  const [firstTimeLoader, setFirstTimeLoader] = useState(true);
  const currentSelected = useSelector(
    (state) => state?.activeAdmin?.activeTabAdmin
  );
  const { axios, role, JWT, roleName } = setRole();

  const { userWallet, allRole, isTransPasswordCreated } = useSelector(
    (state) => state.auth
  );
  const { currentUser } = useSelector((state) => state?.currentUser);
  var nav =
    roleName !== ""
      ? ["fairGameAdmin", "fairGameWallet"].includes(roleName)
        ? "wallet"
        : "admin"
      : "";

  const location = useLocation();

  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const { adminAllMatches, selectedMatch, sessionOffline } = useSelector(
    (state) => state?.adminMatches
  );

  const { socket, socketMicro } = useContext(SocketContext);
  const [notificationData, setNotificationData] = useState(null);
  const [localAllmatches, setLocalAllMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [localSessionOffline, setLocalSessionOffline] = useState([]);
  useEffect(() => {
    if (adminAllMatches) {
      setLocalAllMatches(adminAllMatches);
    }
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }
    if (sessionOffline) {
      setLocalSessionOffline(sessionOffline);
    }
    
  }, [adminAllMatches, selectedMatch, sessionOffline]);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.onevent = async (packet) => {
        if (packet.data[0] === "logoutUserForce") {
          // alert(1111)
          const url = window.location.href;
          if (url.includes("wallet")) {
            dispatch(setWConfirmAuth(true));
            let token = localStorage.getItem("JWTwallet");
            if (token) {
              sessionStorage.setItem("JWTwallet", token);
            }
            dispatch(logout({ roleType: "role2" }));
            setGlobalStore((prev) => ({ ...prev, walletWT: "" }));
            dispatch(removeManualBookMarkerRates());
            dispatch(removeCurrentUser());
            // dispatch(removeSelectedMatch());
            removeSocket();
            socketMicro.disconnect();
            socket.disconnect();
            navigate("/wallet");
            await axios.get("auth/logout");
          } else {
            dispatch(setAConfirmAuth(true));
            let token = localStorage.getItem("JWTadmin");
            if (token) {
              sessionStorage.setItem("JWTadmin", token);
            }
            dispatch(logout({ roleType: "role1" }));
            setGlobalStore((prev) => ({ ...prev, adminWT: "" }));
            dispatch(removeManualBookMarkerRates());
            dispatch(removeCurrentUser());
            socketMicro.disconnect();
            socket.disconnect();
            // dispatch(removeSelectedMatch());
            removeSocket();
            navigate("/admin");
            await axios.get("auth/logout");
          }
          // const { data } = await axios.get("auth/logout");
          // if (data?.data === "success logout") {
          // dispatch(removeSelectedMatch());
          // dispatch(removeCurrentUser());
          // dispatch(removeManualBookMarkerRates());
          // dispatch(logout({ roleType: "role2" }));
          // dispatch(setUpdatedTransPasswords(false));
          // socket.disconnect();
          // socketMicro.disconnect();
          // dispatch(setPage(parseInt(1)));
          // setGlobalStore((prev) => ({ ...prev, walletWT: "" }));
          // if (nav === "admin") {
          //   navigate("/admin");
          //   dispatch(logout({ roleType: "role1" }));
          //   setGlobalStore((prev) => ({ ...prev, adminWT: "" }));
          // }
          // navigate(`/${nav}`);
          // removeSocket();
          // } else {
          //   toast.error("Something went wrong");
          // }
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

        if (packet.data[0] === "newMatchAdded") {
          const data = packet.data[1];
          setLocalAllMatches((prev) => {
            const newBody = [...prev, data];
            dispatch(setAdminAllMatches(newBody));
            return newBody;
          });

          setCurrentMatch((currentMatch) => {
            if (currentMatch?.id !== data?.match_id) {
              // If the new bet doesn't belong to the current match, return the current state
              return currentMatch;
            }

            // Update the bettings array in the current match object
            const updatedBettings = currentMatch?.bettings?.map((betting) => {
              if (betting.id === data.id && data.sessionBet) {
                // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                return {
                  ...betting,
                  ...data,
                };
              } else if (
                betting?.id === data?.id &&
                data.sessionBet === false
              ) {
                return {
                  ...betting,
                  ...data,
                };
              }
              return betting;
            });
            var newUpdatedValue = updatedBettings;
            const bettingsIds = updatedBettings?.map((betting) => betting?.id);

            if (!bettingsIds?.includes(data.id)) {
              // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

              newUpdatedValue = [...newUpdatedValue, data];
            } else {
              setLocalSessionOffline((prev) => {
                if (prev.includes(data.id)) {
                  const newres = sessionOffline.filter((id) => id !== data.id);

                  dispatch(setSessionOffline(newres));
                }
                const body = [...prev, data.id];

                dispatch(setSessionOffline(body));
                return body;
              });
            }

            // Return the updated current match object
            const newBody = {
              ...currentMatch,
              bettings: newUpdatedValue,
            };
            dispatch(setSelectedMatch(newBody));
            return newBody;
          });
        }
        if (packet.data[0] === "resultDeclareForBet") {
          const data = packet.data[1];
          setLocalAllMatches((prev) => {
            const filteredMatches = prev.filter(
              (v) => !(v.id === data?.match_id && data.sessionBet === false)
            );
            dispatch(setAdminAllMatches(filteredMatches));
            return filteredMatches;
          });
        }

        if (packet.data[0] === "updateMatchActiveStatus") {
          const value = packet.data[1];
          setCurrentMatch((currentMatch) => {
            if (currentMatch?.id === value?.matchId) {
              return {
                ...currentMatch,
                apiBookMakerActive: value?.apiBookMakerActive,
                apiMatchActive: value?.apiMatchActive,
                apiSessionActive: value?.apiSessionActive,
                manualBookMakerActive: value?.manualBookMakerActive,
                manualSessionActive: value?.manualSessionActive,
              };
            }
            return currentMatch;
          });
        }
      };
    }
  }, [socket, nav]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // User returned to the web browser
        console.log("User returned from sleep mode");
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
      if (nav === "admin") {
        localStorage.removeItem("role1");
      } else {
        localStorage.removeItem("role2");
      }
      // Chrome requires the returnValue to be set for the event
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [nav]);

  useEffect(() => {
    setTimeout(() => {
      setFirstTimeLoader(false);
    }, 4000);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (nav === "admin") {
        // localStorage.removeItem("role1");//add
        // localStorage.removeItem("JWTadmin");//add
      } else {
        // localStorage.removeItem("role2");//add
        // localStorage.removeItem("JWTwallet");//add
      }
    };

    const handleLoad = (event) => {
      if (nav === "admin") {
        let jwtS = sessionStorage.getItem("JWTadmin");
        let jwtL = localStorage.getItem("JWTadmin");
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
            // navigate("/admin");//add
            dispatch(removeManualBookMarkerRates());
            // dispatch(removeCurrentUser());// add
            // dispatch(logout({ roleType: "role1" }));//add
            socketMicro?.disconnect();
            socket?.disconnect();
            dispatch(removeSelectedMatch());
            setGlobalStore((prev) => ({ ...prev, adminWT: "" }));
            // await axios.get("auth/logout");
            removeSocket();
            localStorage.setItem("role1", "role1");
          }
        }
      } else {
        let jwtS = sessionStorage.getItem("JWTwallet");
        let jwtL = localStorage.getItem("JWTwallet");
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
            // navigate("/wallet");
            dispatch(removeManualBookMarkerRates());
            // dispatch(removeCurrentUser());//add
            // dispatch(logout({ roleType: "role2" }));//add
            socketMicro?.disconnect();
            socket?.disconnect();
            dispatch(removeSelectedMatch());
            setGlobalStore((prev) => ({ ...prev, walletWT: "" }));
            // await axios.get("auth/logout");
            removeSocket();
            localStorage.setItem("role2", "role2");
          }
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("load", handleLoad);
    };
  }, [nav]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (nav === "admin") {
        localStorage.removeItem("role1");
      } else {
        localStorage.removeItem("role2");
      }
      // Chrome requires the returnValue to be set for the event
    };

    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [nav]);

  useEffect(() => {
    if (nav === "admin") {
      // Your existing code within the event handler
      let checkLoStorage = localStorage.getItem("role1");
      let checkSeStorage = sessionStorage.getItem("JWTadmin");
      if (checkSeStorage && checkLoStorage === null) {
        localStorage.setItem("role1", "role1");
      }
    } else {
      // Your existing code within the event handler
      let checkLoStorage = localStorage.getItem("role2");
      let checkSeStorage = sessionStorage.getItem("JWTwallet");
      if (checkSeStorage && checkLoStorage === null) {
        localStorage.setItem("role2", "role2");
      }
    }
  }, [localStorage, nav]);

  async function getUserDetail(nav) {
    try {
      if (nav === "admin") {
        // localStorage.setItem("role1", "role1");
      }
      if (nav === "wallet") {
        localStorage.setItem("role2", "role2");
      }
      const { data } = await axios.get("users/profile");
      if (!data.data.loginAt) {
        if (nav === "admin") {
          dispatch(removeCurrentUser());
          dispatch(logout({ roleType: "role1" }));
          setGlobalStore((prev) => ({
            ...prev,
            JWTadmin: "",
            isSession: true,
          }));
          removeSocket();
          navigate("/admin");
          await axios.get("auth/logout");
        }
        if (nav === "wallet") {
          dispatch(removeCurrentUser());
          dispatch(logout({ roleType: "role2" }));
          setGlobalStore((prev) => ({
            ...prev,
            JWTwallet: "",
            isSession: true,
          }));
          removeSocket();
          navigate("/wallet");
          await axios.get("auth/logout");
        }
      } else {
        setBalance(data.data.current_balance);
        dispatch(setCurrentUser(data.data));
      }

      var value = allRole?.find((role) => role?.id === data?.data?.roleId);
      roleName = value?.roleName;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (location.pathname.includes("market_analysis")) {
      dispatch(setActiveAdmin(3));
    } else if (location.pathname.includes("list_of_clients")) {
      dispatch(setActiveAdmin(0));
    } else if (location.pathname.includes("live_market")) {
      dispatch(setActiveAdmin(1));
    } else if (
      [
        "reports",
        "account_statement",
        "current_bet",
        "general_report",
        "game_report",
        "profit_loss",
      ].includes(location.pathname)
    ) {
      dispatch(setActiveAdmin(2));
    }
  }, [location, window.location.pathname, JWT]);

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

    getUserDetail(nav);
  }, []);
  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("Client list");
  useEffect(() => {
    if (location?.state) {
      setSelected(location?.state?.activeTab);
    }
    if (show) {
      setSelected("My Account");
    }
  }, [location?.state, show]);
  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);

  const classes = {
    AppBarVal: { zIndex: (theme) => theme.zIndex.drawer + 1 },
    BoxCont1: [
      {
        width: "100%",
        minHeight: { laptop: 60, tablet: 60, mobile: 60 },
        display: "flex",
        flexDirection: matchesMobile ? "column" : "row",
        alignItems: !matchesMobile ? "center" : "flex-start",
        justifyContent: "space-between",
        paddingX: { laptop: "2%", mobile: "2%" },
        paddingY: matchesMobile ? "9px" : "0px",
        paddingBottom: matchesMobile ? "5px" : "0px",
      },
      (theme) => ({
        backgroundImage: `${theme.palette.primary.headerGradient}`,
      }),
    ],
    BoxCont1sub1: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      flex: 1,
    },
    BoxCont1sub1sub1: {
      display: "flex",
      alignItems: "center",
      marginRight: "12px",
    },
    BoxCont1sub1sub1StyleImg: {
      height: { laptop: "24px", mobile: "20px" },
      width: "auto",
      cursor: "pointer",
    },
    RenderLogoCompStyleImg: {
      height: { laptop: "45px", mobile: "30px" },
      width: "auto",
      marginTop: "12px",
      marginLeft: { laptop: "20px", mobile: "10px" },
    },
    BoxCont1sub1ButtonHead1boxStyle: {
      backgroundColor: currentSelected == 0 ? "white" : "transparent",
      justifyContent: "center",
      borderRadius: "3px",
      marginLeft: "2%",
    },
    BoxCont1sub1LiveMarketboxStyle: {
      backgroundColor: currentSelected == 1 ? "white" : "transparent",
      borderRadius: "3px",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      marginLeft: "2%",
    },
    BoxCont1sub1ButtonHead2boxStyle: {
      backgroundColor: currentSelected == 2 ? "white" : "transparent",
      borderRadius: "3px",
      marginLeft: "2%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHeadtitleStylefn: (currentSelected, num) => {
      return { color: currentSelected == num ? "green" : "white" };
    },
    BoxCont1sub1ButtonHead3boxStyle: {
      backgroundColor: currentSelected == 3 ? "white" : "transparent",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHead4boxStyle: {
      backgroundColor: currentSelected == 4 ? "white" : "transparent",
      width: "90px",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "space-around",
    },
    BoxCont1sub2: {
      width: "100%",
      display: "flex",
      marginLeft: { mobile: showSearch ? "-143px" : 0, laptop: 0, tablet: 0 },
      justifyContent: "flex-end",
      // minWidth: matchesMobile ? "100%" : "0px",
      alignItems: "center",
      marginTop: matchesMobile ? "0" : "0px",
    },
    BoxCont1sub2SearchInputContStyle: {
      height: "30px",
      minWidth: { laptop: "100px", mobile: "1.5vw" },
      width: "140px",
    },
    BoxCont1sub2BoxProfileContStyle: matchesMobile ? { width: "52%" } : {},
    BoxEnd: {
      minHeight: {
        laptop: 60,
        mobile: ["admin", "wallet"].includes(nav) ? "60px" : 60 + 32 + 42,
        tablet: ["admin", "wallet"].includes(nav) ? "60px" : 60 + 32 + 42,
      },
    },
  };
  // const RenderLogo = useCallback(() => {
  //   return (

  //   );
  // }, [classes.RenderLogoCompStyleImg, nav, navigate]);

  const menutItems1 = [
    { title: "Profit/Loss", link: `/${nav}/profit_loss` },
    { title: "Account Statement", link: `/${nav}/account_statement` },
    { title: "Current Bet", link: `/${nav}/current_bet` },
    { title: "General Report", link: `/${nav}/general_report` },
  ];

  const menutItems2 = [
    { title: "Deposit", link: "/wallet/deposit" },
    { title: "Withdraw", link: "/wallet/withdraw" },
  ];

  return (
    <>
      <ModalMUI
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

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
        <CustomLoader />
      </ModalMUI>
      <SessionTimeOut />
      <IdleTimer role="" />
      <AppBar position="fixed" sx={classes.AppBarVal}>
        <Box sx={classes.BoxCont1}>
          <Box sx={classes.BoxCont1sub1}>
            <Box sx={classes.BoxCont1sub1sub1}>
              <StyledImage
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
                src={Draw}
                sx={classes.BoxCont1sub1sub1StyleImg}
              />
              <StyledImage
                onClick={(e) => {
                  navigate(`/${nav}/list_of_clients`, {
                    state: { activeTab: "Client list" },
                  });
                  e.stopPropagation();
                }}
                src={logo}
                sx={classes.RenderLogoCompStyleImg}
              />
            </Box>
            <Box sx={classes.BoxCont1sub2}>
              <BoxProfile
                nav={nav}
                containerStyle={classes.BoxCont1sub2BoxProfileContStyle}
                image={"https://picsum.photos/200/300"}
                value={currentUser?.userName || ""}
                amount={currentUser?.current_balance || 0}
              />
            </Box>
          </Box>
        </Box>
        {
          <MobileSideBar
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        }

        {!isTransPasswordCreated && (
          <ThisUseModal
            message="You don't have transaction password"
            buttonMessage="Create Transaction Password"
            navigateTo="createTransPassword"
          />
        )}
      </AppBar>

      <DropdownMenu1
        nav={nav}
        open={Boolean(anchor)}
        anchorEl={anchor}
        menutItems1={menutItems1}
        title={"Report"}
        activeTab={"Reports"}
        // setShow={setShow}
        handleClose={() => {
          setAnchor(null);
          // const pathname = location.pathname.split("/")[1];
          // const url = `/${pathname}/list_of_clients`;
          // navigate(url, {
          //   state: {
          //     activeTab: "Client list",
          //   },
          // });
        }}
      />
      <DropdownMenu2
        open={Boolean(anchor1)}
        anchorEl={anchor1}
        menutItems2={menutItems2}
        // setShow={setShow}
        title={"Wallet"}
        handleClose={() => {
          setAnchor1(null);
          // const pathname = location.pathname.split("/")[1];
          // const url = `/${pathname}/list_of_clients`;
          // navigate(url, {
          //   state: {
          //     activeTab: "Client list",
          //   },
          // });
        }}
      />
      <Box sx={classes.BoxEnd} />

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
      <Box
        sx={[
          { flex: 1, padding: "1%" },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
          }),
        ]}
      >
        <AdminEventListing
          selected={selected}
          // show={show}
          // setShow={setShow}
          setAnchor={(e) => setAnchor(e.currentTarget)}
          setAnchor1={(e) => setAnchor1(e.currentTarget)}
        />
        {/* {show && <HomeSlide show={show} setShow={setShow} />} */}
      </Box>
    </>
  );
};

export default memo(CustomHeader);
