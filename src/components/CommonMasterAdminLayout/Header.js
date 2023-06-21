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
var roleName = "";
const CustomHeader = ({ }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [anchor1, setAnchor1] = React.useState(null);
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

  const { socket, socketMicro } = useContext(SocketContext);

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
    const handleBeforeUnload = (event) => {
      if (nav === "admin") {
        localStorage.removeItem("role1");
        localStorage.removeItem("JWTadmin");
      } else {
        localStorage.removeItem("role2");
        localStorage.removeItem("JWTwallet");
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
            navigate("/admin");
            dispatch(removeManualBookMarkerRates());
            dispatch(removeCurrentUser());
            dispatch(logout({ roleType: "role1" }));
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
            navigate("/wallet");
            dispatch(removeManualBookMarkerRates());
            dispatch(removeCurrentUser());
            dispatch(logout({ roleType: "role2" }));
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

  useEffect(() => {
    if (socket && socket.connected) {
      socket.onevent = async (packet) => {
        if (packet.data[0] === "logoutUserForce") {
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
      };
    }
  }, [socket, nav]);

  async function getUserDetail(nav) {
    try {
      if (nav === "admin") {
        // localStorage.setItem("role1", "role1");
      }
      if (nav === "wallet") {
        localStorage.setItem("role2", "role2");
      }
      const { data } = await axios.get("users/profile");
      setBalance(data.data.current_balance);
      dispatch(setCurrentUser(data.data));

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

  useEffect(() => {
    if (currentUser === null) {
      getUserDetail(nav);
    }
  }, []);
  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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
        paddingX: { laptop: "0.5%", mobile: "1%" },
        paddingY: matchesMobile ? "15px" : "0px",
        paddingBottom: matchesMobile ? "10px" : "0px",
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
      marginLeft: { mobile: "-143px", laptop: 0, tablet: 0 },
      justifyContent: "flex-end",
      // minWidth: matchesMobile ? "100%" : "0px",
      alignItems: "center",
      marginTop: matchesMobile ? "15px" : "0px",
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
        mobile: ["admin", "wallet"].includes(nav) ? "113px" : 60 + 32 + 42,
        tablet: ["admin", "wallet"].includes(nav) ? "75px" : 60 + 32 + 42,
      },
    },
  };
  const RenderLogo = useCallback(() => {
    return (
      <StyledImage
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/${nav}/list_of_clients`);
        }}
        src={logo}
        sx={classes.RenderLogoCompStyleImg}
      />
    );
  }, [classes.RenderLogoCompStyleImg, nav, navigate]);

  return (
    <>
      <SessionTimeOut />
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
              <RenderLogo />
            </Box>
            {!matchesTablet && (
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <ButtonHead
                  onClick={() => {
                    dispatch(setActiveAdmin(0));
                    navigate(`/${nav}/list_of_clients`);
                  }}
                  title={"LIST OF CLIENTS"}
                  boxStyle={classes.BoxCont1sub1ButtonHead1boxStyle}
                  titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                    currentSelected,
                    0
                  )}
                />
                <LiveMarket
                  onClick={() => {
                    dispatch(setActiveAdmin(1));
                    navigate(`/${nav}/live_market`);
                  }}
                  title={"LIVE MARKET"}
                  boxStyle={classes.BoxCont1sub1LiveMarketboxStyle}
                />
                <ButtonHead
                  selected={currentSelected == 2}
                  report={true}
                  onClick={(e) => {
                    dispatch(setActiveAdmin(2));
                    setAnchor(e.currentTarget);
                  }}
                  title={"REPORTS"}
                  boxStyle={classes.BoxCont1sub1ButtonHead2boxStyle}
                  titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                    currentSelected,
                    2
                  )}
                />
                <ButtonHead
                  onClick={() => {
                    dispatch(setActiveAdmin(3));
                    navigate(`/${nav}/market_analysis`);
                  }}
                  title={"MARKET ANALYSIS"}
                  boxStyle={classes.BoxCont1sub1ButtonHead3boxStyle}
                  titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                    currentSelected,
                    3
                  )}
                />
                {roleName === "fairGameWallet" && (
                  <ButtonHead
                    onClick={(e) => {
                      dispatch(setActiveAdmin(4));
                      setAnchor1(e.currentTarget);
                    }}
                    title={"WALLET"}
                    report={true}
                    selected={currentSelected == 4}
                    boxStyle={classes.BoxCont1sub1ButtonHead4boxStyle}
                    titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                      currentSelected,
                      4
                    )}
                  />
                )}
              </Box>
            )}
            <Box sx={classes.BoxCont1sub2}>
              <SearchInput
                show={showSearch}
                setShowSearch={() => {
                  setShowSearch((prev) => !prev);
                }}
                placeholder={"All Clients..."}
                header={true}
                inputContainerStyle={classes.BoxCont1sub2SearchInputContStyle}
              />
              <BoxProfile
                nav={nav}
                containerStyle={classes.BoxCont1sub2BoxProfileContStyle}
                image={"https://picsum.photos/200/300"}
                value={currentUser?.userName || ""}
                amount={currentUser?.current_balance || 0}
              />
            </Box>
          </Box>

          {matchesTablet && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <ButtonHead
                onClick={() => {
                  dispatch(setActiveAdmin(0));
                  navigate(`/${nav}/list_of_clients`);
                }}
                title={"LIST OF CLIENTS"}
                boxStyle={classes.BoxCont1sub1ButtonHead1boxStyle}
                titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                  currentSelected,
                  0
                )}
              />
              <LiveMarket
                onClick={() => {
                  dispatch(setActiveAdmin(1));
                  navigate(`/${nav}/live_market`);
                }}
                title={"LIVE MARKET"}
                boxStyle={classes.BoxCont1sub1LiveMarketboxStyle}
              />
              <ButtonHead
                selected={currentSelected == 2}
                report={true}
                onClick={(e) => {
                  dispatch(setActiveAdmin(2));
                  setAnchor(e.currentTarget);
                }}
                title={"REPORTS"}
                boxStyle={classes.BoxCont1sub1ButtonHead2boxStyle}
                titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                  currentSelected,
                  2
                )}
              />
              <ButtonHead
                onClick={() => {
                  dispatch(setActiveAdmin(3));
                  navigate(`/${nav}/market_analysis`);
                }}
                title={"MARKET ANALYSIS"}
                boxStyle={classes.BoxCont1sub1ButtonHead3boxStyle}
                titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                  currentSelected,
                  3
                )}
              />
              {roleName === "fairGameWallet" && (
                <ButtonHead
                  onClick={(e) => {
                    dispatch(setActiveAdmin(4));
                    setAnchor1(e.currentTarget);
                  }}
                  title={"WALLET"}
                  report={true}
                  selected={currentSelected == 4}
                  boxStyle={classes.BoxCont1sub1ButtonHead4boxStyle}
                  titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                    currentSelected,
                    4
                  )}
                />
              )}
            </Box>
          )}
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
        handleClose={() => setAnchor(null)}
      />
      <DropdownMenu2
        open={Boolean(anchor1)}
        anchorEl={anchor1}
        handleClose={() => setAnchor1(null)}
      />
      <Box sx={classes.BoxEnd} />
    </>
  );
};

export default memo(CustomHeader);
