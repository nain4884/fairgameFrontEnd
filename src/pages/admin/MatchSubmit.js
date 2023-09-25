import { useEffect, useState, useContext } from "react";
import { Typography, Box, useMediaQuery, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import "../../components/index.css";
import { Background } from "../../components/index";
import FullAllBets from "../../components/FullAllBets";
import { useLocation, useNavigate } from "react-router-dom";
import Odds from "./matches/Odds";
import BookMarketer from "./matches/BookMaketer";
import SessionMarket from "./matches/SessionMarket";
import { setRole } from "../../newStore";
import { SocketContext } from "../../context/socketContext";
import { useSelector, useDispatch } from "react-redux";
import CustomLoader from "../../components/helper/CustomLoader";
import { removeSocket } from "../../components/helper/removeSocket";
import { removeCurrentUser } from "../../newStore/reducers/currentUser";
import {
  removeManualBookMarkerRates,
  setAllBetRate,
  setAllSessionBets,
  setMultiSelectedMatch,
} from "../../newStore/reducers/matchDetails";
import { GlobalStore } from "../../context/globalStore";
import { logout } from "../../newStore/reducers/auth";
import UserProfitLoss from "./matches/UserProfitLoss";
import ModalMUI from "@mui/material/Modal";

let matchOddsCount = 0;
const MatchSubmit = ({}) => {
  const dispatch = useDispatch();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { socket, socketMicro } = useContext(SocketContext);
  const { axios } = setRole();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state?.currentUser);
  const matchIds = location?.state?.matchIds;
  const marketIds = location?.state?.marketIds;
  const [matchData, setMatchData] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [IObets, setIObtes] = useState([]);
  const [mode, setMode] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [isHandled, setIsHandled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popData, setPopData] = useState();
  const [showUserProfitLoss, setShowUserProfitLoss] = useState(false);
  const [storedMatchid, setStoredMatchId] = useState("");

  const { multiSelectedMatches, allBetRates, allSessionBets } = useSelector(
    (state) => state?.matchDetails
  );

  const navigate = useNavigate();
  // matchIds

  useEffect(() => {
    if (multiSelectedMatches) {
      console.log(multiSelectedMatches, "multiSelectedMatches");
      setMatchData(multiSelectedMatches);
    }

    if (allBetRates) {
      setIObtes(allBetRates);
    }
    if (allSessionBets) {
      setSessionBets(allSessionBets);
    }
  }, [multiSelectedMatches, allBetRates, allSessionBets]);

  useEffect(() => {
    // alert(JSON.stringify(matchIds))
    if (matchIds !== undefined) {
      getAllBetsData();
      getThisMatch();
    }
  }, [matchIds]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       if (matchIds !== undefined) {
  //         getAllBetsData();
  //         getThisMatch();
  //       }
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [matchIds]);

  // useEffect(() => {
  //   if (socket && socket.connected) {
  //     socket.on("newMessage", (value) => {
  //       console.log(value);
  //     });

  //     socket.onevent = async (packet) => {
  //       // console.log(`Received event: ${packet.data[0]}`, packet.data[1]);
  //       for (var i = 0; i < matchIds?.length; i++) {
  //         (function (i) {
  //           if (packet.data[0] === "updateMatchActiveStatus") {
  //             const value = packet.data[1];
  //             setMatchData((prevMatchData) => {
  //               return prevMatchData.map((item) => {
  //                 if (item?.id === matchIds[i]) {
  //                   return {
  //                     ...item,
  //                     apiBookMakerActive: value?.apiBookMakerActive,
  //                     apiMatchActive: value?.apiMatchActive,
  //                     apiSessionActive: value?.apiSessionActive,
  //                     manualBookMakerActive: value?.manualBookMakerActive,
  //                     manualSessionActive: value?.manualSessionActive,
  //                   };
  //                 }
  //                 return item;
  //               });
  //             });
  //           }

  //           if (packet.data[0] === "updateRate_user") {
  //             const value = packet.data[1];
  //             try {
  //               if (!value?.lock) {
  //                 if (value?.isTab) {
  //                   setMatchData((prevMatchData) => {
  //                     return prevMatchData.map((item) => {
  //                       const updatedBettings = item.bettings.map((betting) => {
  //                         // Check if the betting object has the specified ID
  //                         if (betting.id === value.betId) {
  //                           // Update the bet_condition value
  //                           return {
  //                             ...betting,
  //                             teamA_Back: value?.teamA_Back,
  //                             teamA_lay: "",
  //                             teamB_Back: value?.teamB_Back,
  //                             teamB_lay: "",
  //                             teamC_Back: value?.teamC_Back,
  //                             teamC_lay: "",
  //                             // teamA_suspend: "live",
  //                             // teamB_suspend: "live",
  //                             // teamC_suspend: "live",
  //                             teamA_suspend: null,
  //                             teamB_suspend: null,
  //                             teamC_suspend: null,
  //                           };
  //                         }
  //                         return betting;
  //                       });

  //                       return {
  //                         ...item,
  //                         bettings: updatedBettings,
  //                       };
  //                     });
  //                   });
  //                 } else {
  //                   setMatchData((prevMatchData) => {
  //                     return prevMatchData.map((item) => {
  //                       const updatedBettings = item.bettings.map((betting) => {
  //                         // Check if the betting object has the specified ID
  //                         if (betting.id === value.betId) {
  //                           // Update the bet_condition value
  //                           return {
  //                             ...betting,
  //                             teamA_Back: value?.teamA_Back
  //                               ? value?.teamA_Back
  //                               : "",
  //                             teamA_lay: value?.teamA_lay
  //                               ? value?.teamA_lay
  //                               : "",
  //                             teamA_suspend:
  //                               value?.teamA_suspend === false
  //                                 ? null
  //                                 : "suspended",
  //                             teamB_Back: value?.teamB_Back
  //                               ? value?.teamB_Back
  //                               : "",
  //                             teamB_lay: value?.teamB_lay
  //                               ? value?.teamB_lay
  //                               : "",
  //                             teamB_suspend:
  //                               value?.teamB_suspend === false
  //                                 ? null
  //                                 : "suspended",
  //                             teamC_Back: value?.teamC_Back
  //                               ? value?.teamC_Back
  //                               : "",
  //                             teamC_lay: value?.teamC_lay
  //                               ? value?.teamC_lay
  //                               : "",
  //                             teamC_suspend:
  //                               value?.teamC_suspend === false
  //                                 ? null
  //                                 : "suspended",
  //                             teamA_Ball: null,
  //                             teamB_Ball: null,
  //                             teamC_Ball: null,
  //                           };
  //                         }
  //                         return betting;
  //                       });

  //                       return {
  //                         ...item,
  //                         bettings: updatedBettings,
  //                       };
  //                     });
  //                   });
  //                 }
  //               } else {
  //                 if (value.teamA_suspend == "Ball Started") {
  //                   try {
  //                     setMatchData((prevMatchData) => {
  //                       return prevMatchData.map((item) => {
  //                         const updatedBettings = item.bettings.map(
  //                           (betting) => {
  //                             // Check if the betting object has the specified ID
  //                             if (betting.id === value.betId) {
  //                               // Update the bet_condition value
  //                               return {
  //                                 ...betting,
  //                                 teamA_suspend: value?.teamA_suspend
  //                                   ? "suspended"
  //                                   : value?.teamA_suspend,
  //                                 teamB_suspend: value?.teamB_suspend
  //                                   ? "suspended"
  //                                   : value?.teamB_suspend,
  //                                 teamC_suspend: value?.teamC_suspend
  //                                   ? "suspended"
  //                                   : value?.teamC_suspend,
  //                                 teamA_Ball: "ball",
  //                                 teamB_Ball: "ball",
  //                                 teamC_Ball: "ball",
  //                               };
  //                             }
  //                             return betting;
  //                           }
  //                         );

  //                         return {
  //                           ...item,
  //                           bettings: updatedBettings,
  //                         };
  //                       });
  //                     });
  //                   } catch (err) {
  //                     console.log(err?.message);
  //                   }
  //                 } else {
  //                   try {
  //                     setMatchData((prevMatchData) => {
  //                       return prevMatchData.map((item) => {
  //                         const updatedBettings = item.bettings.map(
  //                           (betting) => {
  //                             // Check if the betting object has the specified ID
  //                             if (betting.id === value.betId) {
  //                               // Update the bet_condition value
  //                               return {
  //                                 ...betting,
  //                                 teamA_suspend: value?.teamA_suspend
  //                                   ? "suspended"
  //                                   : value?.teamA_suspend,
  //                                 teamB_suspend: value?.teamB_suspend
  //                                   ? "suspended"
  //                                   : value?.teamB_suspend,
  //                                 teamC_suspend: value?.teamC_suspend
  //                                   ? "suspended"
  //                                   : value?.teamC_suspend,

  //                                 teamA_Ball: null,
  //                                 teamB_Ball: null,
  //                                 teamC_Ball: null,
  //                               };
  //                             }
  //                             return betting;
  //                           }
  //                         );

  //                         return {
  //                           ...item,
  //                           bettings: updatedBettings,
  //                         };
  //                       });
  //                     });
  //                   } catch (err) {
  //                     console.log(err?.message);
  //                   }
  //                 }
  //               }
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //           }

  //           if (packet.data[0] === "updateSessionRate_user") {
  //             const value = packet.data[1];
  //             try {
  //               setMatchData((prevMatchData) => {
  //                 return prevMatchData.map((currentMatch) => {
  //                   if (currentMatch?.id !== value?.match_id) {
  //                     // If the new bet doesn't belong to the current match, return the current state
  //                     return currentMatch;
  //                   }
  //                   // Update the bettings array in the current match object
  //                   const updatedBettings = currentMatch?.bettings?.map(
  //                     (betting) => {
  //                       if (betting.id === value.betId) {
  //                         return {
  //                           ...betting,
  //                           ...value,
  //                         };
  //                       } else if (
  //                         betting?.id === value?.betId &&
  //                         value.sessionBet === false
  //                       ) {
  //                         return {
  //                           ...betting,
  //                           ...value,
  //                         };
  //                       }
  //                       return betting;
  //                     }
  //                   );
  //                   var newUpdatedValue = updatedBettings;
  //                   const bettingsIds = updatedBettings?.map(
  //                     (betting) => betting?.id
  //                   );
  //                   if (!bettingsIds?.includes(value.betId)) {
  //                     newUpdatedValue = [...newUpdatedValue, value];
  //                   }
  //                   // Return the updated current match object
  //                   return {
  //                     ...currentMatch,
  //                     bettings: newUpdatedValue,
  //                   };
  //                 });
  //               });
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //           }

  //           if (packet.data[0] === "newBetAdded") {
  //             const value = packet.data[1];
  //             // matchId = value?.match_id;
  //             try {
  //               setMatchData((prevMatchData) => {
  //                 return prevMatchData.map((item) => {
  //                   if (item?.id === value?.match_id) {
  //                     // Update the bettings array in the current match object
  //                     const updatedBettings = item?.bettings?.map((betting) => {
  //                       if (betting.id === value.id && value.sessionBet) {
  //                         // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                         return {
  //                           ...betting,
  //                           ...value,
  //                         };
  //                       } else if (
  //                         betting?.id === value?.id &&
  //                         value.sessionBet === false
  //                       ) {
  //                         return {
  //                           ...betting,
  //                           ...value,
  //                         };
  //                       }
  //                       return betting;
  //                     });
  //                     var newUpdatedValue = updatedBettings;
  //                     const bettingsIds = updatedBettings?.map(
  //                       (betting) => betting?.id
  //                     );

  //                     if (!bettingsIds?.includes(value.id)) {
  //                       // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array
  //                       newUpdatedValue = [...newUpdatedValue, value];
  //                     } else {
  //                       if (!item.sessionOffline) {
  //                         item.sessionOffline = [];
  //                       }
  //                       if (
  //                         item?.sessionOffline &&
  //                         item?.sessionOffline.includes(value.id) &&
  //                         value.betStatus === 1
  //                       ) {
  //                         const newres = item?.sessionOffline.filter(
  //                           (id) => id !== value.id
  //                         );
  //                         item.sessionOffline = newres;
  //                       }
  //                       if (value?.betStatus === 0) {
  //                         item.sessionOffline.push(value.id);
  //                       }

  //                       // newUpdatedValue = newUpdatedValue?.filter(v => v?.id !== value?.id && v?.betStatus === 1);
  //                     }

  //                     // Return the updated current match object
  //                     return {
  //                       ...item,
  //                       bettings: newUpdatedValue,
  //                       sessionOffline: item.sessionOffline,
  //                     };
  //                   }
  //                   return item;
  //                 });
  //               });
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //           }
  //           if (packet.data[0] === "session_bet") {
  //             const data = packet.data[1];

  //             try {
  //               setCurrentOdds({
  //                 bet_id: data?.betPlaceData?.bet_id,
  //                 odds: data?.betPlaceData?.odds,
  //                 match_id: data?.betPlaceData?.match_id,
  //               });
  //               setMatchData((prevMatchData) => {
  //                 return prevMatchData.map((item) => {
  //                   const updatedBettings = item.bettings.map((betting) => {
  //                     // Check if the betting object has the specified ID
  //                     if (betting.id === data?.betPlaceData?.bet_id) {
  //                       // Update the properties of the betting object
  //                       let profitLoss = data?.profitLoss;
  //                       return {
  //                         ...betting,
  //                         profitLoss: profitLoss,
  //                       };
  //                     }
  //                     return betting;
  //                   });

  //                   return {
  //                     ...item,
  //                     bettings: updatedBettings,
  //                     sessionExposure: data?.sessionExposure,
  //                   };
  //                 });
  //               });
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //             if (data?.betPlaceData?.match_id === matchIds[i]) {
  //               setSessionBets((prev) => {
  //                 const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
  //                 return [
  //                   {
  //                     ...data.betPlaceData,
  //                     deleted_reason:
  //                       data?.betPlaceData?.deleted_reason || null,
  //                   },
  //                   ...updatedPrev,
  //                 ];
  //               });
  //               setIObtes((prev) => [data.betPlaceData, ...prev]);
  //             }
  //           }
  //           if (packet.data[0] === "match_bet") {
  //             const data = packet.data[1];
  //             if (!isHandled) {
  //               setIsHandled(true);
  //               try {
  //                 if (data) {
  //                   // alert(1111)
  //                   const body = {
  //                     id: data?.betPlaceData?.id,
  //                     isActive: true,
  //                     createAt: data?.betPlaceData?.createAt,
  //                     updateAt: data?.betPlaceData?.createAt,
  //                     createdBy: null,
  //                     deletedAt: null,
  //                     user_id: null,
  //                     match_id: data?.betPlaceData?.match_id,
  //                     bet_id: data?.betPlaceData?.bet_id,
  //                     result: "pending",
  //                     team_bet: data?.betPlaceData?.team_bet,
  //                     odds: data?.betPlaceData?.odds,
  //                     myStack: data?.betPlaceData?.myStack,
  //                     userName: data?.betPlaceData?.userName,
  //                     win_amount: null,
  //                     loss_amount: null,
  //                     bet_type: data?.betPlaceData?.bet_type,
  //                     country: null,
  //                     ip_address: null,
  //                     rate: null,
  //                     marketType: data?.betPlaceData?.marketType,
  //                     amount:
  //                       data?.betPlaceData?.stack || data?.betPlaceData?.stake,
  //                   };
  //                   if (data?.betPlaceData?.match_id === matchIds[i]) {
  //                     setIObtes((prev) => [body, ...prev]);
  //                     setMatchData((prevMatchData) => {
  //                       return prevMatchData.map((item) => {
  //                         if (item?.id === matchIds[i]) {
  //                           return {
  //                             ...item,
  //                             teamA_rate: data?.teamA_rate,
  //                             teamB_rate: data?.teamB_rate,
  //                             teamC_rate: data?.teamC_rate,
  //                           };
  //                         }
  //                         return item;
  //                       });
  //                     });
  //                   }

  //                   // dispatch(setCurrentUser(user));
  //                   // dispatch(setManualBookMarkerRates(manualBookmaker));
  //                 }
  //               } catch (e) {
  //                 console.log("error", e?.message);
  //               } finally {
  //                 setIsHandled(false);
  //               }
  //             }
  //           }
  //           if (packet.data[0] === "sessionNoResult") {
  //             const value = packet.data[1];
  //             // matchId = value?.match_id;
  //             try {
  //               const user = {
  //                 ...currentUser,
  //                 current_balance: value.current_balance,
  //                 exposure: value.exposure,
  //               };

  //               // dispatch(setCurrentUser(user));
  //               setMatchData((prevMatchData) => {
  //                 return prevMatchData.map((item) => {
  //                   const updatedBettings = item.bettings.map((betting) => {
  //                     if (
  //                       betting.id === value.betId &&
  //                       item.id === value.match_id
  //                     ) {
  //                       return {
  //                         ...betting,
  //                         profitLoss: null,
  //                       };
  //                     }
  //                     return betting;
  //                   });

  //                   return {
  //                     ...item,
  //                     bettings: updatedBettings,
  //                   };
  //                 });
  //               });

  //               // setSessionExposure(value?.sessionExposure);
  //               if (value?.match_id === matchIds[i]) {
  //                 setIObtes((sessionBets) =>
  //                   sessionBets?.filter((v) => v?.bet_id !== value?.betId)
  //                 );
  //               }
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //           }

  //           if (packet.data[0] === "resultDeclareForBet") {
  //             const value = packet.data[1];
  //             // matchId = value?.match_id;
  //             if (value?.sessionBet == false) {
  //               if (matchIds.includes(value?.match_id)) {
  //                 navigate("/wallet/market_analysis");
  //               }
  //               return;
  //             }
  //             try {
  //               setMatchData((prevMatchData) => {
  //                 return prevMatchData.map((item) => {
  //                   if (item?.id === value?.match_id) {
  //                     const updatedBettings = item?.bettings.map((betting) => {
  //                       if (betting.id === value?.betId) {
  //                         if (
  //                           item &&
  //                           item?.sessionOffline.includes(value?.betId)
  //                         ) {
  //                           const newRes = item?.sessionOffline.filter(
  //                             (id) => id !== value?.betId
  //                           );
  //                           item.sessionOffline = newRes;
  //                         }
  //                         item.sessionOffline.push(value?.betId);
  //                       }
  //                       return betting;
  //                     });

  //                     if (!item?.sessionOffline) {
  //                       item.sessionOffline = [];
  //                     }
  //                     if (
  //                       item?.sessionOffline.includes(value?.id) &&
  //                       value.betStatus === 1
  //                     ) {
  //                       const newRes = item.sessionOffline.filter(
  //                         (id) => id !== value?.id
  //                       );
  //                       item.sessionOffline = newRes;
  //                     }
  //                     if (value.betStatus === 0) {
  //                       item.sessionOffline.push(value?.id);
  //                     }

  //                     return {
  //                       ...item,
  //                       bettings: updatedBettings,
  //                       sessionOffline: item.sessionOffline,
  //                     };
  //                   }
  //                   return item;
  //                 });
  //               });
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //           }
  //           if (packet.data[0] === "sessionResult") {
  //             const value = packet.data[1];
  //             try {
  //               setMatchData((prevMatchData) => {
  //                 return prevMatchData.map((item) => {
  //                   const updatedBettings = item.bettings.filter(
  //                     (betting) => betting.id !== value?.betId
  //                   );

  //                   return {
  //                     ...item,
  //                     bettings: updatedBettings,
  //                   };
  //                 });
  //               });
  //               setSessionBets((sessionBets) =>
  //                 sessionBets?.filter((v) => v?.bet_id !== value?.betId)
  //               );
  //               setPopData(value?.betId);
  //             } catch (err) {
  //               console.log(err?.message);
  //             }
  //           }
  //         })(i);
  //       }
  //       // if (packet.data[0] === "logoutUserForce") {
  //       //   dispatch(logout({ roleType: "role1" }));
  //       //   setGlobalStore((prev) => ({ ...prev, adminWT: "" }));
  //       //   dispatch(removeManualBookMarkerRates());
  //       //   dispatch(removeCurrentUser());
  //       //   // dispatch(removeSelectedMatch());
  //       //   // await axios.get("auth/logout");
  //       //   removeSocket();
  //       //   navigate("/wallet");
  //       //   socket.disconnect();
  //       // }
  //     };
  //   }
  // }, [socket]);

  console.log(matchData, "matchData");

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketIds) {
        socketMicro.on("connect", () => {
          for (var index = 0; index < marketIds.length; index++) {
            socketMicro.emit("init", { id: marketIds[index] });
            setInterval(() => {
              socketMicro.emit("init", { id: marketIds[index] });
            }, 3000);
          }
        });

        socketMicro.on("connect_error", (event) => {});

        for (var i = 0; i < marketIds?.length; i++) {
          (function (i) {
            socketMicro.emit("init", { id: marketIds[i] });

            setInterval(() => {
              socketMicro.emit("init", { id: marketIds[i] });
            }, 3000);
            socketMicro.on("reconnect", () => {
              socketMicro.emit("init", { id: marketIds[i] });
            });
            socketMicro.on(`session${marketIds[i]}`, (val) => {
              if (val !== null) {
                var newVal = val?.map((v) => ({
                  bet_condition: v?.RunnerName,
                  betStatus: 0,
                  sessionBet: true,
                  no_rate: v?.LayPrice1,
                  yes_rate: v?.BackPrice1,
                  rate_percent: `${v?.LaySize1}-${v?.BackSize1}`,
                  suspended: v?.GameStatus,
                  selectionId: v?.SelectionId,
                }));

                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    if (item?.marketId === marketIds[i]) {
                      // Merge the filteredNewVal with the currentMatch bettings array
                      const data = item.bettings?.map((betting) => {
                        var selectedData =
                          newVal?.length > 0 &&
                          newVal?.find(
                            (data) => data?.selectionId === betting?.selectionId
                          );
                        if (selectedData && selectedData !== undefined) {
                          return {
                            ...betting,
                            bet_condition: selectedData?.bet_condition,
                            no_rate: selectedData?.no_rate,
                            yes_rate: selectedData?.yes_rate,
                            rate_percent: selectedData?.rate_percent,
                            suspended: selectedData?.suspended,
                            selectionId: selectedData?.selectionId,
                          };
                        }
                        if (betting?.selectionId !== null) {
                          return {
                            ...betting,
                            bet_condition: betting?.bet_condition,
                            no_rate: 0,
                            yes_rate: 0,
                            rate_percent: betting?.rate_percent,
                            suspended: "",
                            selectionId: betting?.selectionId,
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: data,
                      };
                    }
                    return item;
                  });
                });
              }

              // dispatch(setSessionOddsLive(body));
            });

            socketMicro.on(`matchOdds${marketIds[i]}`, (val) => {
              // matchodds Market live and stop disable condition
              if (val !== null) {
                if (val.length === 0) {
                  socketMicro.emit("disconnect_market", {
                    id: marketIds[i],
                  });
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item?.marketId === marketIds[i]) {
                        return {
                          ...item,
                          matchOddsLive: [], // Add the new array property with an empty array
                        };
                      }
                      return item;
                    });
                  });
                  // }
                } else {
                  // dispatch(setMatchOddsLive(val[0]));
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item?.marketId === marketIds[i]) {
                        return {
                          ...item,
                          matchOddsLive: val[0], // Add the new array property with array
                        };
                      }
                      return item;
                    });
                  });
                  if (val[0]?.status === "CLOSED") {
                    socketMicro.emit("disconnect_market", {
                      id: marketIds[i],
                    });
                    setMatchData((prevMatchData) => {
                      return prevMatchData.map((item) => {
                        if (item?.marketId === marketIds[i]) {
                          return {
                            ...item,
                            matchOddsLive: [], // Add the new array property with an empty array
                          };
                        }
                        return item;
                      });
                    });
                  }
                }
              }
            });

            socketMicro.on(`bookmaker${marketIds[i]}`, (val) => {
              if (val !== null) {
                if (val.length > 0) {
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item?.marketId === marketIds[i]) {
                        return {
                          ...item,
                          bookmakerLive: val[0], // Add the new array property with an empty array
                        };
                      }
                      return item;
                    });
                  });
                }
              }
            });
          })(i);
        }
      } else {
        for (var k = 0; k < marketIds.length; k++) {
          (function (k) {
            setMatchData((prevMatchData) => {
              return prevMatchData.map((item) => {
                if (item.marketId === marketIds[k]) {
                  return {
                    ...item,
                    matchOddsLive: [], // Add the new array property with an empty array
                    bookmakerLive: [],
                  };
                }
                return item;
              });
            });
          })(k);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      for (var j = 0; j < marketIds?.length; j++) {
        (function (j) {
          socketMicro?.emit("disconnect_market", {
            id: marketIds[j],
          });
          setMatchData((prevMatchData) => {
            return prevMatchData.map((item) => {
              if (item.marketId === marketIds[j]) {
                return {
                  ...item,
                  matchOddsLive: [], // Add the new array property with an empty array
                  bookmakerLive: [],
                };
              }
              return item;
            });
          });
        })(j);
      }
    };
  }, [socketMicro, marketIds]);

  async function getThisMatch() {
    let payload = {
      idArray: matchIds,
    };
    try {
      setLoading(true);
      let response = await axios.post(
        `/game-match/multipleMatchDetail`,
        payload
      );
      // setMatchData(response?.data?.data);
      const newData = response?.data?.data || [];
      const updatedData = newData?.map((element) => {
        if (element?.bettings !== null) {
          const updatedBettings = element?.bettings?.map((bet) => {
            if (bet?.selectionId !== null) {
              return { ...bet, yes_rate: 0, no_rate: 0, suspended: "" };
            }
            return bet;
          });
          return { ...element, bettings: updatedBettings };
        }
        return element;
      });
      dispatch(setMultiSelectedMatch(updatedData));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      setLoading(false);
      console.log("response", e.response.data);
    }
  }

  async function getAllBetsData() {
    let payload = {
      match_id: matchIds,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);

      setIObtes(data?.data?.data);
      dispatch(setAllBetRate(data?.data?.data));
      const bets = data?.data?.data?.filter(
        (b) =>
          ![
            "MATCH ODDS",
            "BOOKMAKER",
            "MANUAL BOOKMAKER",
            "QuickBookmaker0",
            "QuickBookmaker1",
            "QuickBookmaker2",
          ].includes(b?.marketType)
      );
      setSessionBets(bets || []);
      dispatch(setAllSessionBets(bets));
    } catch (e) {
      console.log(e);
    }
  }

  const handleClicked = (matchId) => {
    try {
      setStoredMatchId(matchId);
      setShowUserProfitLoss(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Background>
      {loading ? (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader text="" />
        </Box>
      ) : (
        <>
          {location?.state?.match == 3 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: { matchesMobile: "column", laptop: "row" },
                  flex: 1,
                  height: "100%",
                  marginLeft: "0.5%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {matchData?.length > 0 &&
                    matchData?.map((item, index) => {
                      let matchOddsDataTemp = item?.bettings?.filter(
                        (element) => element?.sessionBet === false
                      );
                      let IObetsData = IObets?.filter(
                        (element) => element?.match_id === item?.id
                      );
                      let sessionBetsData = sessionBets?.filter(
                        (element) => element?.match_id === item?.id
                      );

                      return (
                        <>
                          {index === 0 ? (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  sx={{
                                    flex: 1,
                                    flexDirection: "column",
                                    minHeight: "100px",
                                    display: "flex",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "16px",
                                      width: "100%",
                                      color: "white",
                                      fontWeight: "700",
                                      paddingTop: "2%",
                                      alignSelf: "start",
                                    }}
                                  >
                                    {item?.teamA} V/S {item?.teamB}
                                    <Button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleClicked(item?.id);
                                      }}
                                      sx={{
                                        backgroundColor: "#F8C851",
                                        fontSize: "10px",
                                        color: "black",
                                        fontWeight: "700",
                                        float: "right",
                                        border: " 1px solid white",
                                        marginBottom: "2px",
                                        alignSelf: "start",
                                        "&:hover": {
                                          backgroundColor: "#F8C851",
                                        },
                                      }}
                                    >
                                      User Profit Loss
                                    </Button>
                                  </Typography>
                                  {item?.apiMatchActive && (
                                    <Odds
                                      currentMatch={item}
                                      matchOddsLive={item?.matchOddsLive}
                                      data={
                                        item?.matchOddsLive?.runners?.length > 0
                                          ? item?.matchOddsLive?.runners
                                          : []
                                      }
                                      typeOfBet={"Match Odds"}
                                    />
                                  )}
                                  {item?.bookmakers?.map((bookmaker) => {
                                    if (bookmaker.betStatus === 1) {
                                      return (
                                        <Odds
                                          currentMatch={item}
                                          session={"manualBookMaker"}
                                          data={bookmaker}
                                          minBet={bookmaker?.min_bet || 0}
                                          maxBet={bookmaker?.max_bet || 0}
                                          typeOfBet={bookmaker?.marketName}
                                          matchOddsData={bookmaker}
                                        />
                                      );
                                    }
                                  })}
                                  {/* {item?.manualBookMakerActive && (
                                  <Odds
                                    currentMatch={item}
                                    data={item}
                                    manualBookmakerData={matchOddsDataTemp}
                                    typeOfBet={"Quick Bookmaker"}
                                  />
                                )} */}
                                  {item?.bookmakers?.map((bookmaker) => {
                                    if (bookmaker.betStatus === 1) {
                                      return (
                                        <Odds
                                          currentMatch={item}
                                          session={"manualBookMaker"}
                                          data={bookmaker}
                                          minBet={bookmaker?.min_bet || 0}
                                          maxBet={bookmaker?.max_bet || 0}
                                          typeOfBet={bookmaker?.marketName}
                                          matchOddsData={bookmaker}
                                        />
                                      );
                                    }
                                  })}
                                  {item?.apiBookMakerActive && (
                                    <BookMarketer
                                      currentMatch={item}
                                      bookmakerLive={item?.bookmakerLive}
                                      data={
                                        item?.bookmakerLive?.runners?.length > 0
                                          ? item?.bookmakerLive?.runners
                                          : []
                                      }
                                    />
                                  )}

                                  {item?.manualSessionActive && (
                                    <SessionMarket
                                      title={"Quick Session Market"}
                                      currentOdds={currentOdds}
                                      currentMatch={item}
                                      data={[]}
                                      sessionOffline={item?.sessionOffline}
                                      sessionExposer={item?.sessionExposure}
                                      sessionBets={sessionBetsData?.length}
                                      setPopData={setPopData}
                                      popData={popData}
                                      max={item?.manaual_session_max_bet}
                                      min={item?.manaual_session_min_bet}
                                    />
                                  )}
                                  {item?.apiSessionActive && (
                                    <SessionMarket
                                      title={"Session Market"}
                                      currentOdds={currentOdds}
                                      currentMatch={item}
                                      data={[]}
                                      sessionOffline={item?.sessionOffline}
                                      sessionExposer={item?.sessionExposure}
                                      sessionBets={sessionBetsData?.length}
                                      setPopData={setPopData}
                                      popData={popData}
                                      max={item?.betfair_session_max_bet}
                                      min={item?.betfair_session_min_bet}
                                    />
                                  )}
                                </Box>
                                <Box
                                  sx={{
                                    flex: 1,
                                    flexDirection: "column",
                                    display: "flex",
                                    minHeight: "100px",
                                    marginX: "0.5%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      width: "100%",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: "150px",
                                        marginY: ".75%",
                                        height: "35px",
                                      }}
                                    ></Box>
                                  </Box>
                                  <FullAllBets
                                    IObets={IObetsData}
                                    mode={mode}
                                    tag={false}
                                    setSelectedBetData={setSelectedBetData}
                                    selectedBetData={selectedBetData}
                                  />
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <>
                              <Box
                                sx={{
                                  maxWidth: matchesMobile ? "99%" : "49.5%",
                                  flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                                  marginRight: "0.5%",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    color: "white",
                                    fontWeight: "700",
                                    paddingTop: "0.7%",
                                    alignSelf: "start",
                                  }}
                                >
                                  {item?.teamA} V/S {item?.teamB}
                                  <Button
                                    onClick={() => handleClicked(item?.id)}
                                    sx={{
                                      backgroundColor: "#F8C851",
                                      fontSize: "10px",
                                      color: "black",
                                      fontWeight: "700",
                                      float: "right",
                                      border: " 1px solid white",
                                      marginBottom: "2px",
                                      alignSelf: "start",
                                      "&:hover": { backgroundColor: "#F8C851" },
                                    }}
                                  >
                                    User Profit Loss
                                  </Button>
                                </Typography>
                                {item?.apiMatchActive && (
                                  <Odds
                                    currentMatch={item}
                                    // matchOddsLive={matchOddsLive}
                                    matchOddsLive={item?.matchOddsLive}
                                    // data={[]}
                                    data={
                                      item?.matchOddsLive?.runners?.length > 0
                                        ? item?.matchOddsLive?.runners
                                        : []
                                    }
                                    typeOfBet={"Match Odds"}
                                  />
                                )}
                                {/* {item?.manualBookMakerActive && (
                              <Odds
                                currentMatch={item}
                                data={item}
                                manualBookmakerData={matchOddsDataTemp}
                                typeOfBet={"Quick Bookmaker"}
                                // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                              />
                            )} */}
                                {item?.bookmakers?.map((bookmaker) => {
                                  if (bookmaker.betStatus === 1) {
                                    return (
                                      <Odds
                                        currentMatch={item}
                                        session={"manualBookMaker"}
                                        data={bookmaker}
                                        minBet={bookmaker?.min_bet || 0}
                                        maxBet={bookmaker?.max_bet || 0}
                                        typeOfBet={bookmaker?.marketName}
                                        matchOddsData={bookmaker}
                                      />
                                    );
                                  }
                                })}
                                {item?.apiBookMakerActive && (
                                  <BookMarketer
                                    currentMatch={item}
                                    bookmakerLive={item?.bookmakerLive}
                                    data={
                                      item?.bookmakerLive?.runners?.length > 0
                                        ? item?.bookmakerLive?.runners
                                        : []
                                    }
                                  />
                                )}

                                {item?.manualSessionActive && (
                                  <SessionMarket
                                    title={"Quick Session Market"}
                                    currentOdds={currentOdds}
                                    currentMatch={item}
                                    sessionExposer={item.sessionExposure}
                                    sessionOffline={item?.sessionOffline}
                                    sessionBets={sessionBetsData?.length}
                                    setPopData={setPopData}
                                    popData={popData}
                                    max={item?.manaual_session_max_bet}
                                    min={item?.manaual_session_min_bet}
                                  />
                                )}
                                {item?.apiSessionActive && (
                                  <SessionMarket
                                    title={"Session Market"}
                                    currentOdds={currentOdds}
                                    currentMatch={item}
                                    sessionExposer={item?.sessionExposure}
                                    sessionOffline={item?.sessionOffline}
                                    sessionBets={sessionBetsData?.length}
                                    setPopData={setPopData}
                                    popData={popData}
                                    max={item?.betfair_session_max_bet}
                                    min={item?.betfair_session_min_bet}
                                  />
                                )}
                                <FullAllBets
                                  tag={true}
                                  IObets={IObetsData}
                                  setSelectedBetData={setSelectedBetData}
                                  selectedBetData={selectedBetData}
                                />
                              </Box>
                            </>
                          )}
                        </>
                      );
                    })}
                </Box>
              </Box>
              <ModalMUI
                open={showUserProfitLoss}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: "center",
                      width: { mobile: "90%", laptop: "50%" },
                    }}
                  >
                    <UserProfitLoss
                      title={"User Profit Loss"}
                      matchId={storedMatchid}
                      setShowUserProfitLoss={setShowUserProfitLoss}
                      single={"multiple"}
                    />
                  </Box>
                </Box>
              </ModalMUI>
            </>
          )}

          {(location?.state?.match === 4 || location?.state?.match === 2) && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { matchesMobile: "column", laptop: "row" },
                  flex: 1,
                  height: "100%",
                  // marginX: "0.5%",
                  marginLeft: "0.5%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {matchData?.length > 0 &&
                    matchData?.map((item, index) => {
                      let matchOddsDataTemp = item?.bettings?.filter(
                        (element) => element?.sessionBet === false
                      );
                      let IObetsData = IObets?.filter(
                        (element) => element?.match_id === item?.id
                      );
                      let sessionBetsData = sessionBets?.filter(
                        (element) => element?.match_id === item?.id
                      );
                      console.log("sdsdfsf", item, index);
                      return (
                        <>
                          <Box
                            key={item?.id}
                            sx={{
                              maxWidth: matchesMobile ? "99%" : "49.5%",
                              flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                              marginRight: matchesMobile ? "0%" : "0.5%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "white",
                                fontWeight: "700",
                                paddingTop: "0.7%",
                                alignSelf: "start",
                              }}
                            >
                              {item?.teamA} V/S {item?.teamB}
                              <Button
                                onClick={() => handleClicked(item?.id)}
                                sx={{
                                  backgroundColor: "#F8C851",
                                  fontSize: "10px",
                                  color: "black",
                                  fontWeight: "700",
                                  float: "right",
                                  border: " 1px solid white",
                                  marginBottom: "2px",
                                  alignSelf: "start",
                                  "&:hover": { backgroundColor: "#F8C851" },
                                }}
                              >
                                User Profit Loss
                              </Button>
                            </Typography>

                            {item?.apiMatchActive && (
                              <Odds
                                currentMatch={item}
                                matchOddsLive={item?.matchOddsLive}
                                data={
                                  item.matchOddsLive?.runners?.length > 0
                                    ? item.matchOddsLive?.runners
                                    : []
                                }
                                typeOfBet={"Match Odds"}
                              />
                            )}
                            {/* {item?.manualBookMakerActive && (
                          <Odds
                            currentMatch={item}
                            data={item}
                            manualBookmakerData={matchOddsDataTemp}
                            typeOfBet={"Quick Bookmaker"}
                          />
                        )} */}
                            {item?.bookmakers?.map((bookmaker) => {
                              if (bookmaker.betStatus === 1) {
                                return (
                                  <Odds
                                    key={bookmaker?.id}
                                    currentMatch={item}
                                    session={"manualBookMaker"}
                                    data={bookmaker}
                                    minBet={bookmaker?.min_bet || 0}
                                    maxBet={bookmaker?.max_bet || 0}
                                    typeOfBet={bookmaker?.marketName}
                                    matchOddsData={bookmaker}
                                  />
                                );
                              }
                            })}

                            {item?.apiBookMakerActive && (
                              <BookMarketer
                                currentMatch={item}
                                bookmakerLive={item?.bookmakerLive}
                                data={
                                  item?.bookmakerLive?.runners?.length > 0
                                    ? item?.bookmakerLive?.runners
                                    : []
                                }
                              />
                            )}

                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={"Quick Session Market"}
                                currentMatch={item}
                                currentOdds={currentOdds}
                                sessionOffline={item?.sessionOffline}
                                sessionExposer={item?.sessionExposure}
                                sessionBets={sessionBetsData?.length}
                                setPopData={setPopData}
                                popData={popData}
                                max={item?.manaual_session_max_bet}
                                min={item?.manaual_session_min_bet}
                              />
                            )}
                            {item?.apiSessionActive && (
                              <SessionMarket
                                title={"Session Market"}
                                currentMatch={item}
                                currentOdds={currentOdds}
                                sessionOffline={item?.sessionOffline}
                                sessionExposer={item?.sessionExposure}
                                sessionBets={sessionBetsData?.length}
                                setPopData={setPopData}
                                popData={popData}
                                max={item?.betfair_session_max_bet}
                                min={item?.betfair_session_min_bet}
                              />
                            )}
                            <FullAllBets
                              tag={true}
                              IObets={IObetsData}
                              setSelectedBetData={setSelectedBetData}
                              selectedBetData={selectedBetData}
                            />
                          </Box>
                        </>
                      );
                    })}
                </Box>
              </Box>
              <ModalMUI
                open={showUserProfitLoss}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: "center",
                      width: { mobile: "90%", laptop: "50%" },
                    }}
                  >
                    <UserProfitLoss
                      title={"User Profit Loss"}
                      matchId={storedMatchid}
                      setShowUserProfitLoss={setShowUserProfitLoss}
                      single={"multiple"}
                    />
                  </Box>
                </Box>
              </ModalMUI>
            </>
          )}
        </>
      )}
    </Background>
  );
};

export default MatchSubmit;
