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
  logoutCurrentUser,
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  logout,
  logoutAuth,
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
  setAllBetRate,
  setAllSessionBets,
  setSessionExposure,
  setSelectedMatch,
  setSessionOffline,
  setManualBookmaker,
  setUserAllMatches,
  setMultiSelectedMatch,
  logoutMatchDetails,
} from "../../newStore/reducers/matchDetails";
import { toast } from "react-toastify";
import { memo } from "react";
import MobileSideBar from "./MobileSideBar";
import BoxProfile from "./BoxProfile";
import jwtDecode from "jwt-decode";
import {
  setWConfirmAuth,
  setAConfirmAuth,
  setCurrentOdd,
  logoutExpertDetails,
} from "../../newStore/reducers/expertMatchDetails";
import EventListing from "../EventListing";
import AdminEventListing from "../AdminEventListing";
import HomeSlide from "../HomeSlide";
import IdleTimer from "../../components/IdleTimer";
import CustomLoader from "../helper/CustomLoader";
import { customSort } from "../helper/util";

var roleName = "";
var match_id;
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

  const {
    allBetRates,
    allSessionBets,
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    userAllMatches,
    multiSelectedMatches,
  } = useSelector((state) => state?.matchDetails);
  const { currentOdd } = useSelector((state) => state?.expertMatchDetails);

  const { socket, socketMicro } = useContext(SocketContext);
  const [notificationData, setNotificationData] = useState(null);
  const [localAllmatches, setLocalAllMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [localSessionOffline, setLocalSessionOffline] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [localAllBetRates, setLocalAllBetRates] = useState([]);
  const [localSessionBets, setLocalSessionBets] = useState([]);
  const [localCurrentUser, setLocalCurrentUser] = useState(null);
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    if (allBetRates) {
      setLocalAllBetRates(allBetRates);
    }
    if (allSessionBets) {
      setLocalSessionBets(allSessionBets);
    }
    if (currentUser) {
      setLocalCurrentUser(currentUser);
    }
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }
    if (sessionOffline) {
      setLocalSessionOffline(sessionOffline);
    }
    if (manualBookmaker) {
      setManualBookmakerData(manualBookmaker);
    }
    if (userAllMatches) {
      setLocalAllMatches(userAllMatches);
    }
    if (currentOdd) {
      setCurrentOdds(currentOdd);
    }
    if (multiSelectedMatches) {
      setMatchData(multiSelectedMatches);
    }
  }, [
    allBetRates,
    allSessionBets,
    currentUser,
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    userAllMatches,
    currentOdd,
    multiSelectedMatches,
  ]);

  function getSessionStorageItemAsync(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const item = sessionStorage.getItem(key);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
  // Usage example
  getSessionStorageItemAsync("matchId")
    .then((matchId) => {
      if (matchId !== null) {
        console.log("Match ID:", matchId);
        match_id = matchId;
        // Your further processing with the matchId
      } else {
        console.log("Match ID not found in sessionStorage.");
      }
    })
    .catch((error) => {
      console.error("Error occurred while accessing sessionStorage:", error);
    });

  useEffect(() => {
    try {
      if (socket && socket.connected) {
        socket.onevent = async (packet) => {
          if (packet.data[0] === "logoutUserForce") {
            // alert(1111)
            const url = window.location.href;
            dispatch(logoutMatchDetails());
            dispatch(logoutCurrentUser());
            dispatch(logoutAuth());
            dispatch(logoutExpertDetails());
            if (url?.includes("wallet")) {
              dispatch(setWConfirmAuth(true));
              let token = localStorage.getItem("JWTwallet");
              if (token) {
                sessionStorage.setItem("JWTwallet", token);
              }

              setGlobalStore((prev) => ({ ...prev, walletWT: "" }));
              sessionStorage.removeItem("JWTwallet");
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

              setGlobalStore((prev) => ({ ...prev, adminWT: "" }));
              sessionStorage.removeItem("JWTadmin");
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
              dispatch(setUserAllMatches(newBody));
              return newBody;
            });
          }
          if (packet.data[0] === "resultDeclareForBet") {
            const value = packet.data[1];

            setLocalAllBetRates((prev) => {
              const filtered = prev.filter((v) => v.bet_id !== value?.betId);
              dispatch(setAllBetRate(filtered));
              return filtered;
            });

            setLocalAllMatches((prev) => {
              const filteredMatches = prev.filter(
                (v) => !(v.id === value?.match_id && value.sessionBet === false)
              );
              dispatch(setUserAllMatches(filteredMatches));
              return filteredMatches;
            });
            // matchId = value?.match_id;
            // if (value?.sessionBet == false && match_id) {
            //   if (match_id == value?.match_id) {
            //     navigate(`/${nav}/market_analysis`);
            //   }
            //   return;
            // }
            try {
              setCurrentMatch((currentMatch) => {
                if (
                  currentMatch?.id === value?.match_id &&
                  value?.sessionBet == false
                ) {
                  return navigate(`/${nav}/market_analysis`);
                }
                // Update the bettings array in the current match object
                const updatedBettings = currentMatch?.bettings?.map(
                  (betting) => {
                    if (betting?.id === value?.betId) {
                      return { ...betting, betStatus: 2 };
                    }
                    return betting;
                  }
                );
                const newBody = {
                  ...currentMatch,
                  bettings: updatedBettings,
                };
                dispatch(setSelectedMatch(newBody));
                return newBody;
              });

              setMatchData((prevMatchData) => {
                const updated = prevMatchData.map((item) => {
                  if (
                    item?.id === value?.match_id &&
                    value?.sessionBet === false
                  ) {
                    return navigate(`/${nav}/market_analysis`);
                  }

                  if (item?.id === value?.match_id) {
                    const updatedBettings = item?.bettings.map((betting) => {
                      if (betting.id === value?.betId) {
                        return { ...betting, betStatus: 2 };
                      }
                      return betting;
                    });

                    const updatedItem = {
                      ...item,
                      bettings: updatedBettings,
                    };

                    return updatedItem;
                  }

                  return item;
                });

                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "updateMatchActiveStatus") {
            const value = packet.data[1];
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id === value?.matchId) {
                const idToNewBetStatusMap = value?.quick_bookmaker?.reduce(
                  (map, item) => {
                    map[item.id] = item.betStatus;
                    return map;
                  },
                  {}
                );

                const updatedArray1 = currentMatch?.bookmakers?.map((item) => ({
                  ...item,
                  betStatus: idToNewBetStatusMap[item?.id],
                }));
                const newBody = {
                  ...currentMatch,
                  apiBookMakerActive: value?.apiBookMakerActive,
                  apiMatchActive: value?.apiMatchActive,
                  apiSessionActive: value?.apiSessionActive,
                  manualBookMakerActive: value?.manualBookMakerActive,
                  manualSessionActive: value?.manualSessionActive,
                  bookmakers: updatedArray1,
                };
                dispatch(setSelectedMatch(newBody));
                return newBody;
              }
              return currentMatch;
            });

            setMatchData((prevMatchData) => {
              const updated = prevMatchData.map((item) => {
                if (item?.id === value?.matchId) {
                  const newBody = {
                    ...item,
                    apiBookMakerActive: value?.apiBookMakerActive,
                    apiMatchActive: value?.apiMatchActive,
                    apiSessionActive: value?.apiSessionActive,
                    manualBookMakerActive: value?.manualBookMakerActive,
                    manualSessionActive: value?.manualSessionActive,
                  };

                  return newBody;
                }

                return item;
              });
              dispatch(setMultiSelectedMatch(updated));
              return updated;
            });
          }

          if (packet.data[0] === "updateRate_user") {
            const value = packet.data[1];
            try {
              if (!value?.lock) {
                if (value?.isTab) {
                  setCurrentMatch((currentMatches) => {
                    if (currentMatches?.id != value?.matchId) {
                      return currentMatches;
                    }

                    const updatedBookmaker = currentMatches?.bookmakers?.map(
                      (bookmaker) => {
                        // Check if the betting object has the specified ID
                        if (bookmaker?.id === value?.id) {
                          // Update the bet_condition value
                          return {
                            ...bookmaker,
                            teamA_Back: value?.teamA_Back,
                            teamA_lay: "",
                            teamB_Back: value?.teamB_Back,
                            teamB_lay: "",
                            teamC_Back: value?.teamC_Back,
                            teamC_lay: "",
                            // teamA_suspend: "live",
                            // teamB_suspend: "live",
                            // teamC_suspend: "live",
                            teamA_suspend: null,
                            teamB_suspend: null,
                            teamC_suspend: null,
                          };
                        }
                        return bookmaker;
                      }
                    );
                    const newBody = {
                      ...currentMatches,
                      bookmakers: updatedBookmaker,
                    };

                    dispatch(setSelectedMatch(newBody));
                    // Return the new array as the updated state
                    return newBody;
                  });

                  setMatchData((prevMatchData) => {
                    const updated = prevMatchData.map((item) => {
                      const updatedBookmaker = item?.bookmakers?.map(
                        (bookmaker) => {
                          // Check if the betting object has the specified ID
                          if (bookmaker?.id === value?.id) {
                            // Update the bet_condition value
                            return {
                              ...bookmaker,
                              teamA_Back: value?.teamA_Back,
                              teamA_lay: "",
                              teamB_Back: value?.teamB_Back,
                              teamB_lay: "",
                              teamC_Back: value?.teamC_Back,
                              teamC_lay: "",
                              // teamA_suspend: "live",
                              // teamB_suspend: "live",
                              // teamC_suspend: "live",
                              teamA_suspend: null,
                              teamB_suspend: null,
                              teamC_suspend: null,
                            };
                          }
                          return bookmaker;
                        }
                      );

                      return {
                        ...item,
                        bookmakers: updatedBookmaker,
                      };
                    });

                    dispatch(setMultiSelectedMatch(updated));
                    return updated;
                  });
                } else {
                  setCurrentMatch((currentMatches) => {
                    if (currentMatches?.id != value?.matchId) {
                      return currentMatches;
                    }

                    const updatedBookmaker = currentMatches?.bookmakers?.map(
                      (bookmaker) => {
                        // Check if the betting object has the specified ID
                        if (bookmaker?.id === value?.id) {
                          return {
                            ...bookmaker,
                            teamA_Back: value?.teamA_Back
                              ? value?.teamA_Back
                              : "", // Update the teamA_Back value
                            teamA_lay: value?.teamA_lay ? value?.teamA_lay : "", // Update the teamA_lay value
                            teamA_suspend:
                              value?.teamA_suspend == false
                                ? null
                                : "suspended", // Update the teamA_susp
                            teamB_Back: value?.teamB_Back
                              ? value?.teamB_Back
                              : "",
                            teamB_lay: value?.teamB_lay ? value?.teamB_lay : "",
                            teamB_suspend: value?.teamB_suspend
                              ? value?.teamB_suspend
                              : "",
                            teamC_Back: value?.teamC_Back
                              ? value?.teamC_Back
                              : "",
                            teamC_lay: value?.teamC_lay ? value?.teamC_lay : "",
                            teamC_suspend: value?.teamC_suspend
                              ? value?.teamC_suspend
                              : "",
                            teamA_Ball: null,
                            teamB_Ball: null,
                            teamC_Ball: null,
                          };
                        }
                        return bookmaker;
                      }
                    );
                    const newBody = {
                      ...currentMatches,
                      bookmakers: updatedBookmaker,
                    };

                    dispatch(setSelectedMatch(newBody));
                    // Return the new array as the updated state
                    return newBody;
                  });

                  setMatchData((prevMatchData) => {
                    const updated = prevMatchData.map((item) => {
                      const updatedBookmaker = item?.bookmakers?.map(
                        (bookmaker) => {
                          // Check if the betting object has the specified ID
                          if (bookmaker?.id === value?.id) {
                            // Update the bet_condition value
                            return {
                              ...bookmaker,
                              teamA_Back: value?.teamA_Back
                                ? value?.teamA_Back
                                : "",
                              teamA_lay: value?.teamA_lay
                                ? value?.teamA_lay
                                : "",
                              teamA_suspend:
                                value?.teamA_suspend === false
                                  ? null
                                  : "suspended",
                              teamB_Back: value?.teamB_Back
                                ? value?.teamB_Back
                                : "",
                              teamB_lay: value?.teamB_lay
                                ? value?.teamB_lay
                                : "",
                              teamB_suspend:
                                value?.teamB_suspend === false
                                  ? null
                                  : "suspended",
                              teamC_Back: value?.teamC_Back
                                ? value?.teamC_Back
                                : "",
                              teamC_lay: value?.teamC_lay
                                ? value?.teamC_lay
                                : "",
                              teamC_suspend:
                                value?.teamC_suspend === false
                                  ? null
                                  : "suspended",
                              teamA_Ball: null,
                              teamB_Ball: null,
                              teamC_Ball: null,
                            };
                          }
                          return bookmaker;
                        }
                      );

                      return {
                        ...item,
                        bookmakers: updatedBookmaker,
                      };
                    });
                    dispatch(setMultiSelectedMatch(updated));
                    return updated;
                  });
                }
              } else {
                if (value.teamA_suspend == "Ball Started") {
                  try {
                    setCurrentMatch((currentMatches) => {
                      // alert(JSON.stringify(currentMatches))
                      if (currentMatches?.id != value.matchId) {
                        return currentMatches;
                      }

                      const updatedBookmaker = currentMatches?.bookmakers?.map(
                        (bookmaker) => {
                          // Check if the betting object has the specified ID
                          if (bookmaker?.id === value?.id) {
                            return {
                              ...bookmaker,
                              teamA_suspend: value?.teamA_suspend
                                ? "suspended"
                                : value?.teamA_suspend,
                              teamB_suspend: value?.teamB_suspend
                                ? "suspended"
                                : value?.teamB_suspend,
                              teamC_suspend: value?.teamC_suspend
                                ? "suspended"
                                : value?.teamC_suspend,
                              teamA_Ball: "ball",
                              teamB_Ball: "ball",
                              teamC_Ball: "ball",
                            };
                          }
                          return bookmaker;
                        }
                      );

                      const newBody = {
                        ...currentMatches,
                        bookmakers: updatedBookmaker,
                      };

                      dispatch(setSelectedMatch(newBody));
                      // Return the new array as the updated state
                      return newBody;
                    });

                    setMatchData((prevMatchData) => {
                      const updated = prevMatchData.map((item) => {
                        const updatedBookmaker = item?.bookmakers?.map(
                          (bookmaker) => {
                            // Check if the betting object has the specified ID
                            if (bookmaker?.id === value?.id) {
                              // Update the bet_condition value
                              return {
                                ...bookmaker,
                                teamA_suspend: value?.teamA_suspend
                                  ? "suspended"
                                  : value?.teamA_suspend,
                                teamB_suspend: value?.teamB_suspend
                                  ? "suspended"
                                  : value?.teamB_suspend,
                                teamC_suspend: value?.teamC_suspend
                                  ? "suspended"
                                  : value?.teamC_suspend,
                                teamA_Ball: "ball",
                                teamB_Ball: "ball",
                                teamC_Ball: "ball",
                              };
                            }
                            return bookmaker;
                          }
                        );

                        return {
                          ...item,
                          bookmakers: updatedBookmaker,
                        };
                      });
                      dispatch(setMultiSelectedMatch(updated));
                      return updated;
                    });
                  } catch (err) {
                    console.log(err?.message);
                  }
                } else {
                  try {
                    setCurrentMatch((currentMatches) => {
                      console.log(currentMatches, "currentMatches12");
                      // alert(JSON.stringify(currentMatches[0]));
                      if (currentMatches?.id != value?.matchId) {
                        return currentMatches;
                      }

                      const updatedBookmaker = currentMatches?.bookmakers?.map(
                        (bookmaker) => {
                          // Check if the betting object has the specified ID
                          if (bookmaker?.id === value?.id) {
                            return {
                              ...bookmaker,
                              teamA_suspend: value?.teamA_suspend
                                ? "suspended"
                                : value?.teamA_suspend,
                              teamB_suspend: value?.teamB_suspend
                                ? "suspended"
                                : value?.teamB_suspend,
                              teamC_suspend: value?.teamC_suspend
                                ? "suspended"
                                : value?.teamC_suspend,
                              teamA_Ball: null,
                              teamB_Ball: null,
                              teamC_Ball: null,
                            };
                          }
                          return bookmaker;
                        }
                      );

                      const newBody = {
                        ...currentMatches,
                        bookmakers: updatedBookmaker,
                      };

                      dispatch(setSelectedMatch(newBody));
                      // Return the new array as the updated state
                      return newBody;
                    });
                    setMatchData((prevMatchData) => {
                      const updated = prevMatchData.map((item) => {
                        const updatedBookmaker = item?.bookmakers?.map(
                          (bookmaker) => {
                            // Check if the betting object has the specified ID
                            if (bookmaker?.id === value?.id) {
                              // Update the bet_condition value
                              return {
                                ...bookmaker,
                                teamA_suspend: value?.teamA_suspend
                                  ? "suspended"
                                  : value?.teamA_suspend,
                                teamB_suspend: value?.teamB_suspend
                                  ? "suspended"
                                  : value?.teamB_suspend,
                                teamC_suspend: value?.teamC_suspend
                                  ? "suspended"
                                  : value?.teamC_suspend,

                                teamA_Ball: null,
                                teamB_Ball: null,
                                teamC_Ball: null,
                              };
                            }
                            return bookmaker;
                          }
                        );

                        return {
                          ...item,
                          bookmakers: updatedBookmaker,
                        };
                      });
                      dispatch(setMultiSelectedMatch(updated));
                      return updated;
                    });
                  } catch (err) {
                    console.log(err?.message);
                  }
                }
              }
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "updateSessionRate_user") {
            const value = packet.data[1];
            try {
              setCurrentMatch((currentMatch) => {
                if (currentMatch?.id === value?.match_id) {
                  const findBet = currentMatch?.bettings?.find(
                    (betting) =>
                      betting?.selectionId === value?.selectionId ||
                      betting?.id === value?.id
                  );
                  const body = {
                    ...findBet,
                    betStatus: value?.betStatus,
                  };
                  var removedBet = currentMatch?.bettings?.filter(
                    (betting) =>
                      betting?.selectionId !== value?.selectionId &&
                      betting?.id !== value?.id
                  );
                  var updatedBettings = [body, ...removedBet];
                  if (
                    value.selectionId &&
                    !updatedBettings.some((betting) => betting.id === value.id)
                  ) {
                    updatedBettings.unshift(value);
                  }
                  const newBody = {
                    ...currentMatch,
                    bettings: updatedBettings.sort(customSort),
                  };
                  dispatch(setSelectedMatch(newBody));
  
                  return newBody;
                }
                return currentMatch;
                //   const updatedBettings = currentMatch?.bettings?.map(
                //     (betting) => {
                //       if (betting.id === value.betId) {
                //         return {
                //           ...betting,
                //           ...value,
                //         };
                //       } else if (
                //         betting?.id === value?.betId &&
                //         value.sessionBet === false
                //       ) {
                //         return {
                //           ...betting,
                //           ...value,
                //         };
                //       }
                //       return betting;
                //     }
                //   );
                //   var newUpdatedValue = updatedBettings;
                //   const bettingsIds = updatedBettings?.map(
                //     (betting) => betting?.id
                //   );
                //   if (!bettingsIds?.includes(value.betId)) {
                //     newUpdatedValue = [...newUpdatedValue, value];
                //   }

                //   // Return the updated current match object
                //   const newBody = {
                //     ...currentMatch,
                //     bettings: newUpdatedValue,
                //   };
                //   dispatch(setSelectedMatch(newBody));
                //   return newBody;
                // }

                // return currentMatch;
              });

              setMatchData((prevMatchData) => {
                const updated = prevMatchData.map((currentMatch) => {
                  if (currentMatch?.id === value?.match_id) {
                    const findBet = currentMatch?.bettings?.find(
                      (betting) =>
                        betting?.selectionId === value?.selectionId ||
                        betting?.id === value?.id
                    );
                    const body = {
                      ...findBet,
                      betStatus: value?.betStatus,
                    };
                    var removedBet = currentMatch?.bettings?.filter(
                      (betting) =>
                        betting?.selectionId !== value?.selectionId &&
                        betting?.id !== value?.id
                    );
                    var updatedBettings = [body, ...removedBet];
                    if (
                      value.selectionId &&
                      !updatedBettings.some((betting) => betting.id === value.id)
                    ) {
                      updatedBettings.unshift(value);
                    }
                    const newBody = {
                      ...currentMatch,
                      bettings: updatedBettings.sort(customSort),
                    };
                    dispatch(setSelectedMatch(newBody));
    
                    return newBody;
                  }
                  return currentMatch;
                    // If the new bet doesn't belong to the current match, return the current state
                  //   const updatedBettings = currentMatch?.bettings?.map(
                  //     (betting) => {
                  //       if (betting.id === value.betId) {
                  //         return {
                  //           ...betting,
                  //           ...value,
                  //         };
                  //       } else if (
                  //         betting?.id === value?.betId &&
                  //         value.sessionBet === false
                  //       ) {
                  //         return {
                  //           ...betting,
                  //           ...value,
                  //         };
                  //       }
                  //       return betting;
                  //     }
                  //   );
                  //   var newUpdatedValue = updatedBettings.sort(customSort);
                  //   const bettingsIds = updatedBettings?.map(
                  //     (betting) => betting?.id
                  //   );
                  //   if (!bettingsIds?.includes(value.betId)) {
                  //     newUpdatedValue = [...newUpdatedValue, value];
                  //   }
                  //   // Return the updated current match object
                  //   return {
                  //     ...currentMatch,
                  //     bettings: newUpdatedValue,
                  //   };
                  // }

                  // return currentMatch;
                  // Update the bettings array in the current match object
                });

                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "newBetAdded") {
            const data = packet.data[1];
            // matchId = value?.match_id;
            try {
              setCurrentMatch((currentMatch) => {
                if (currentMatch?.id === data?.match_id) {
                  const findBet = currentMatch?.bettings?.find(
                    (betting) => betting?.id === data?.id && data?.sessionBet
                  );
                  const body = {
                    ...findBet,
                    ...data,
                  };
                  var removedBet = currentMatch?.bettings?.filter(
                    (betting) => betting?.id !== data?.id && data?.sessionBet
                  );
                  var updatedBettings = [body, ...removedBet];
                  // If the new bet doesn't belong to the current match, return the current state
                  // Update the bettings array in the current match object
                  // const updatedBettings = currentMatch?.bettings?.map(
                  //   (betting) => {
                  //     if (betting?.id === data?.id && data?.sessionBet) {
                  //       // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                  //       return {
                  //         ...data,
                  //         ...betting,
                  //       };
                  //     } else if (
                  //       betting?.id === data?.id &&
                  //       data.sessionBet === false
                  //     ) {
                  //       return {
                  //         ...data,
                  //         ...betting,
                  //       };
                  //     }
                  //     return betting;
                  //   }
                  // );
                  var newUpdatedValue = updatedBettings;
                  const bettingsIds = updatedBettings?.map(
                    (betting) => betting?.id
                  );

                  if (!bettingsIds?.includes(data.id)) {
                    // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

                    newUpdatedValue = [data, ...newUpdatedValue];
                  } else {
                    setLocalSessionOffline((prev) => {
                      if (prev.includes(data.id)) {
                        const newres = prev.filter((id) => id !== data.id);

                        dispatch(setSessionOffline(newres));
                        return newres;
                      }
                      const body = [...prev, data.id];

                      dispatch(setSessionOffline(body));
                      return body;
                    });
                  }

                  // Return the updated current match object
                  const filterdUpdatedValue = newUpdatedValue?.map((v) => {
                    if (v.selectionId !== null) {
                      return { ...v, yes_rate: 0, no_rate: 0 };
                    }
                    return v;
                  });
                  const newBody = {
                    ...currentMatch,
                    bettings: filterdUpdatedValue,
                  };
                  dispatch(setSelectedMatch(newBody));
                  return newBody;
                }

                return currentMatch;
              });

              setMatchData((prevMatchData) => {
                const updated = prevMatchData.map((item) => {
                  if (item?.id === data?.match_id) {
                    const findBet = item?.bettings?.find(
                      (betting) => betting?.id === data?.id && data?.sessionBet
                    );
                    const body = {
                      ...findBet,
                      ...data,
                    };
                    var removedBet = item?.bettings?.filter(
                      (betting) => betting?.id !== data?.id && data?.sessionBet
                    );
                    var updatedBettings = [body, ...removedBet];
                    // Update the bettings array in the current match object
                    // const updatedBettings = item?.bettings?.map((betting) => {
                    //   if (betting.id === data.id && data.sessionBet) {
                    //     // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                    //     return {
                    //       ...data,
                    //       ...betting,
                    //     };
                    //   } else if (
                    //     betting?.id === data?.id &&
                    //     data.sessionBet === false
                    //   ) {
                    //     return {
                    //       ...data,
                    //       ...betting,
                    //     };
                    //   }
                    //   return betting;
                    // });
                    var newUpdatedValue = updatedBettings;
                    const bettingsIds = updatedBettings?.map(
                      (betting) => betting?.id
                    );

                    if (!bettingsIds?.includes(data.id)) {
                      // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array
                      newUpdatedValue = [data, ...newUpdatedValue];
                    }
                    // else {
                    // if (!item.sessionOffline) {
                    //   item.sessionOffline = [];
                    // }
                    // if (
                    //   item?.sessionOffline &&
                    //   item?.sessionOffline.includes(data.id) &&
                    //   data.betStatus === 1
                    // ) {
                    //   const newres = item?.sessionOffline.filter(
                    //     (id) => id !== data.id
                    //   );
                    //   item.sessionOffline = newres;
                    // }
                    // if (data?.betStatus === 0) {
                    //   item.sessionOffline.push(data.id);
                    // }

                    // newUpdatedValue = newUpdatedValue?.filter(v => v?.id !== value?.id && v?.betStatus === 1);
                    // }

                    // Return the updated current match object
                    const filterdUpdatedValue = newUpdatedValue?.map((v) => {
                      if (v.selectionId !== null) {
                        return { ...v, yes_rate: 0, no_rate: 0 };
                      }
                      return v;
                    });
                    return {
                      ...item,
                      bettings: filterdUpdatedValue,
                      sessionOffline: item.sessionOffline,
                    };
                  }
                  return item;
                });

                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "matchOddRateLive") {
            // Bookmaker Market live and stop disable condition
            const value = packet.data[1];
            setCurrentMatch((prev) => {
              if (prev?.id === value?.matchId) {
                const newBody = {
                  ...prev,
                  matchOddRateLive: value?.matchOddLive,
                };
                dispatch(setSelectedMatch(newBody));
                return newBody;
              }
              return prev;
            });
          }
          if (packet.data[0] === "bookMakerRateLive") {
            // Bookmaker Market live and stop disable condition
            const value = packet.data[1];
            setCurrentMatch((prev) => {
              if (prev?.id === value?.matchId) {
                const newBody = {
                  ...prev,
                  bookMakerRateLive: value?.bookMakerLive,
                };
                dispatch(setSelectedMatch(newBody));
                return newBody;
              }
              return prev;
            });
          }

          if (packet.data[0] === "session_bet") {
            const data = packet.data[1];
            try {
              setCurrentOdds((prev) => {
                const newBody = {
                  ...prev,
                  bet_id: data?.betPlaceData?.bet_id,
                  odds: data?.betPlaceData?.odds,
                  match_id: data?.betPlaceData?.match_id,
                };
                dispatch(setCurrentOdd(newBody));
                return newBody;
              });

              setCurrentMatch((currentMatch) => {
                const updatedBettings = currentMatch?.bettings?.map(
                  (betting) => {
                    if (betting?.id === data?.betPlaceData?.bet_id) {
                      // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                      let profitLoss = data?.profitLoss;
                      return {
                        ...betting,
                        profitLoss: profitLoss,
                      };
                    }
                    return betting;
                  }
                );

                if (data?.betPlaceData?.match_id === currentMatch?.id) {
                  setLocalAllBetRates((prev) => {
                    const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array

                    // Check if the new data's id already exists in updatedPrev
                    const newDataId = data?.betPlaceData?.id;
                    const idExists =
                      newDataId &&
                      updatedPrev.some((item) => item.id === newDataId);

                    if (!idExists) {
                      const newBody = [
                        {
                          ...data.betPlaceData,
                          deleted_reason:
                            data?.betPlaceData?.deleted_reason || null,
                        },
                        ...updatedPrev,
                      ];

                      dispatch(setAllBetRate(newBody));
                      return newBody;
                    }

                    // If id already exists, return the original array
                    return updatedPrev;
                  });

                  setLocalSessionBets((prev) => {
                    // Check if the new data's id already exists in prev
                    const newDataId = data?.betPlaceData?.id;
                    const idExists =
                      newDataId && prev.some((item) => item.id === newDataId);

                    if (!idExists) {
                      const newBody = [
                        {
                          ...data.betPlaceData,
                          deleted_reason:
                            data?.betPlaceData?.deleted_reason || null,
                        },
                        ...prev,
                      ];

                      dispatch(setAllSessionBets(newBody));
                    }

                    // Always return the original array
                    return prev;
                  });
                }
                // Return the updated current match object
                const newBody = {
                  ...currentMatch,
                  sessionExposure: data?.sessionExposure,
                  bettings: updatedBettings,
                };
                dispatch(setSelectedMatch(newBody));
                return newBody;
              });

              setMatchData((prevMatchData) => {
                const updated = prevMatchData?.map((item) => {
                  if (data?.betPlaceData?.match_id === item?.id) {
                    setLocalAllBetRates((prev) => {
                      const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
                      const newBody = [
                        {
                          ...data.betPlaceData,
                          deleted_reason:
                            data?.betPlaceData?.deleted_reason || null,
                        },
                        ...updatedPrev,
                      ];
                      dispatch(setAllBetRate(newBody));
                      return newBody;
                    });

                    setLocalSessionBets((prev) => {
                      const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
                      const newBody = [
                        {
                          ...data.betPlaceData,
                          deleted_reason:
                            data?.betPlaceData?.deleted_reason || null,
                        },
                        ...updatedPrev,
                      ];
                      dispatch(setAllSessionBets(newBody));
                      return newBody;
                    });

                    const updatedBettings = item.bettings.map((betting) => {
                      // Check if the betting object has the specified ID
                      if (betting.id === data?.betPlaceData?.bet_id) {
                        // Update the properties of the betting object
                        let profitLoss = data?.profitLoss;
                        return {
                          ...betting,
                          profitLoss: profitLoss,
                        };
                      }
                      return betting;
                    });

                    return {
                      ...item,
                      bettings: updatedBettings,
                      sessionExposure: data?.sessionExposure,
                    };
                  }
                  return item;
                });
                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });
            } catch (err) {
              console.log(err?.message);
            }
            if (data?.betPlaceData?.match_id === match_id) {
              setLocalAllBetRates((prev) => {
                const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
                const newBody = [
                  {
                    ...data.betPlaceData,
                    deleted_reason: data?.betPlaceData?.deleted_reason || null,
                  },
                  ...updatedPrev,
                ];
                dispatch(setAllBetRate(newBody));
                return newBody;
              });
            }
            setLocalSessionBets((prev) => {
              const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
              const newBody = [
                {
                  ...data.betPlaceData,
                  deleted_reason: data?.betPlaceData?.deleted_reason || null,
                },
                ...updatedPrev,
              ];
              dispatch(setAllSessionBets(newBody));
              return newBody;
            });
          }
          if (packet.data[0] === "match_bet") {
            const data = packet.data[1];

            try {
              const body = {
                id: data?.betPlaceData?.id,
                isActive: true,
                createAt: data?.betPlaceData?.createAt,
                updateAt: data?.betPlaceData?.createAt,
                createdBy: null,
                deletedAt: null,
                user_id: null,
                match_id: data?.betPlaceData?.match_id,
                bet_id: data?.betPlaceData?.bet_id,
                result: "pending",
                team_bet: data?.betPlaceData?.team_bet,
                odds: data?.betPlaceData?.odds,
                win_amount: null,
                loss_amount: null,
                bet_type: data?.betPlaceData?.bet_type,
                myStack: data?.betPlaceData?.myStack,
                userName: data?.betPlaceData?.userName,
                deleted_reason: data?.betPlaceData?.deleted_reason || null,
                country: null,
                ip_address: null,
                rate: null,
                marketType: data?.betPlaceData?.marketType,
                amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
              };

              setMatchData((prevMatchData) => {
                const updated = prevMatchData.map((item) => {
                  if (item?.id === data?.betPlaceData?.match_id) {
                    setLocalAllBetRates((prev) => {
                      const newBody = [body, ...prev];
                      dispatch(setAllBetRate(newBody));
                      return newBody;
                    });
                    return {
                      ...item,
                      teamA_rate: data?.teamA_rate,
                      teamB_rate: data?.teamB_rate,
                      teamC_rate: data?.teamC_rate,
                    };
                  }

                  return item;
                });

                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });

              setCurrentMatch((prev) => {
                if (prev?.id === data?.betPlaceData?.match_id) {
                  setLocalAllBetRates((prev) => {
                    const newBody = [body, ...prev];
                    dispatch(setAllBetRate(newBody));
                    return newBody;
                  });
                  const newBody = {
                    ...prev,
                    teamA_rate: data?.teamA_rate,
                    teamB_rate: data?.teamB_rate,
                    teamC_rate: data?.teamC_rate,
                  };
                  dispatch(setSelectedMatch(newBody));
                  return newBody;
                }
                return prev;
              });
            } catch (e) {
              console.log("error", e?.message);
            }
          }
          if (packet.data[0] === "sessionNoResult") {
            const value = packet.data[1];
            // matchId = value?.match_id;
            try {
              setLocalCurrentUser((prev) => {
                const user = {
                  ...prev,
                  current_balance: value?.current_balance,
                  exposure: value.exposure,
                };
                dispatch(setCurrentUser(user));
                return user;
              });
              // dispatch(setCurrentUser(user));
              setCurrentMatch((currentMatch) => {
                const updatedBettings = currentMatch?.bettings?.map(
                  (betting) => {
                    if (
                      betting?.id === value?.betId &&
                      currentMatch?.id === value?.match_id
                    ) {
                      return {
                        ...betting,
                        profitLoss: null,
                      };
                    }
                    return betting;
                  }
                );
                const newBody = {
                  ...currentMatch,
                  sessionExposure: value?.sessionExposure,
                  bettings: updatedBettings,
                };

                dispatch(setSelectedMatch(newBody));
                return newBody;
              });

              setMatchData((prevMatchData) => {
                const updated = prevMatchData.map((item) => {
                  const updatedBettings = item.bettings.map((betting) => {
                    if (
                      betting.id === value.betId &&
                      item.id === value.match_id
                    ) {
                      return {
                        ...betting,
                        profitLoss: null,
                      };
                    }
                    return betting;
                  });

                  return {
                    ...item,
                    sessionExposure: value?.sessionExposure,
                    bettings: updatedBettings,
                  };
                });
                // if (value?.match_id === item.id) {
                //   //                 setIObtes((sessionBets) =>
                //   //                   sessionBets?.filter((v) => v?.bet_id !== value?.betId)
                //   //                 );
                //   //               }
                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });

              // dispatch(setSessionExposure(value?.sessionExposure));
              setLocalSessionBets((sessionBets) => {
                const res = sessionBets?.filter(
                  (v) => v?.bet_id !== value?.betId
                );
                dispatch(setAllSessionBets(res));
                return res;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "matchDeleteBet") {
            const value = packet.data[1];
            try {
              setLocalAllBetRates((IOSinglebets) => {
                const updatedBettings = IOSinglebets?.map((betting) => {
                  if (value?.betPlaceIds.includes(betting.id)) {
                    // let profitLoss = value?.profitLoss;
                    return {
                      ...betting,
                      deleted_reason: value?.deleted_reason,
                      // profitLoss: profitLoss,
                    };
                  }
                  return betting;
                });
                dispatch(setAllBetRate(updatedBettings));
                return updatedBettings;
              });

              setCurrentMatch((prev) => {
                const updatedBettings = prev?.bettings?.map((betting) => {
                  if (betting?.id === value?.betId) {
                    // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                    let profitLoss = value?.profitLoss;
                    return {
                      ...betting,
                      profitLoss: profitLoss,
                    };
                  }
                  return betting;
                });

                if (prev?.id === value?.matchId) {
                  const newBody = {
                    ...prev,
                    bettings: updatedBettings,
                    teamA_rate: value?.teamA_rate,
                    teamB_rate: value?.teamB_rate,
                    teamC_rate: value?.teamC_rate,
                  };

                  dispatch(setSelectedMatch(newBody));
                  return newBody;
                }

                return prev;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "sessionDeleteBet") {
            const value = packet.data[1];
            try {
              setLocalAllBetRates((IOSinglebets) => {
                const updatedBettings = IOSinglebets?.map((betting) => {
                  if (value?.betPlaceIds.includes(betting.id)) {
                    // let profitLoss = value?.profitLoss;
                    return {
                      ...betting,
                      deleted_reason: value?.deleted_reason,
                      // profitLoss: profitLoss,
                    };
                  }
                  return betting;
                });
                dispatch(setAllBetRate(updatedBettings));
                return updatedBettings;
              });

              setCurrentMatch((prev) => {
                const updatedBettings = prev?.bettings?.map((betting) => {
                  if (betting?.id === value?.betId) {
                    // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                    let profitLoss = value?.profitLoss;
                    return {
                      ...betting,
                      profitLoss: profitLoss,
                    };
                  }
                  return betting;
                });
                // if (prev?.id === value.matchId) {
                //   dispatch(setSessionExposure(value.sessionExposure));
                // }
                if (prev?.id === value?.matchId && value?.teamA_rate) {
                  const newBody = {
                    ...prev,
                    sessionExposure: value?.sessionExposure,
                    bettings: updatedBettings,
                    teamA_rate: value?.teamA_rate,
                    teamB_rate: value?.teamB_rate,
                    teamC_rate: value?.teamC_rate,
                  };
                  dispatch(setSelectedMatch(newBody));
                  return newBody;
                } else {
                  const newBody = {
                    ...prev,
                    sessionExposure: value?.sessionExposure,
                    bettings: updatedBettings,
                  };
                  dispatch(setSelectedMatch(newBody));
                  return;
                }
              });
            } catch (err) {
              console.log(err?.message);
            }
          }

          if (packet.data[0] === "sessionResult") {
            const value = packet.data[1];
            // matchId = value?.match_id;
            try {
              setCurrentMatch((currentMatch) => {
                if (currentMatch?.matchId !== value?.matchId) {
                  // If the new bet doesn't belong to the current match, return the current state
                  return currentMatch;
                }

                const updatedBettings = currentMatch?.bettings?.filter(
                  (betting) => betting?.id !== value?.betId
                );

                const newBody = {
                  ...currentMatch,
                  bettings: updatedBettings,
                  sessionExposure: value.sessionExposure,
                };

                dispatch(setSelectedMatch(newBody));
                return newBody;
              });
              setMatchData((prevMatchData) => {
                const updated = prevMatchData.map((item) => {
                  if (item?.id === value?.match_id) {
                    const updatedBettings = item.bettings.filter(
                      (betting) => betting.id !== value?.betId
                    );

                    return {
                      ...item,
                      bettings: updatedBettings,
                      sessionExposure: value.sessionExposure,
                    };
                  }
                  return item;
                });

                dispatch(setMultiSelectedMatch(updated));
                return updated;
              });
              setLocalSessionBets((sessionBets) => {
                const res = sessionBets?.filter(
                  (v) => v?.bet_id !== value?.betId
                );
                dispatch(setAllSessionBets(res));
                return res;
              });
              setAllBetRate((sessionBets) => {
                const res = sessionBets?.filter(
                  (v) => v?.bet_id !== value?.betId
                );
                dispatch(setAllBetRate(res));
                return res;
              });
              // setPopData(value?.betId);
            } catch (err) {
              console.log(err?.message);
            }
          }
        };
      }
    } catch (err) {
      console.log(err?.message);
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
            dispatch(logoutMatchDetails());
            dispatch(logoutCurrentUser());
            dispatch(logoutAuth());
            dispatch(logoutExpertDetails());
            sessionStorage.removeItem("JWTadmin");
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
            // dispatch(removeManualBookMarkerRates());
            dispatch(logoutMatchDetails());
            dispatch(logoutCurrentUser());
            dispatch(logoutAuth());
            dispatch(logoutExpertDetails());
            sessionStorage.removeItem("JWTwallet");
            // dispatch(removeCurrentUser());//add
            // dispatch(logout({ roleType: "role2" }));//add
            socketMicro?.disconnect();
            socket?.disconnect();
            // dispatch(removeSelectedMatch());
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
