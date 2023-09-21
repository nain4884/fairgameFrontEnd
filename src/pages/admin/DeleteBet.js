import React from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import "../../components/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react";
import { DeleteIcon } from "../../admin/assets";
import { Background, DailogModal } from "../../components/index";
import { useLocation, useNavigate } from "react-router-dom";
import FullAllBets from "../../components/FullAllBets";
import AddNotificationModal from "../../components/AddNotificationModal";
import { setDailogData } from "../../store/dailogModal";
import Odds from "./matches/Odds";
import SessionMarket from "./matches/SessionMarket";
import BookMarketer from "./matches/BookMaketer";
import { useEffect } from "react";
import { setRole } from "../../newStore";
import {
  setAllBetRate,
  setManualBookmaker,
  setQuickBookmaker,
  setQuickSession,
  setSelectedMatch,
  setSelectedSessionBettings,
} from "../../newStore/reducers/matchDetails";
import { SocketContext } from "../../context/socketContext";
import CustomLoader from "../../components/helper/CustomLoader";
import { removeSocket } from "../../components/helper/removeSocket";
import { removeCurrentUser } from "../../newStore/reducers/currentUser";
import { setAllSessionBets } from "../../newStore/reducers/matchDetails";
import { GlobalStore } from "../../context/globalStore";
import { logout } from "../../newStore/reducers/auth";
import UserProfitLoss from "./matches/UserProfitLoss";
import _ from "lodash";

let matchOddsCount = 0;
const DeleteBet = ({}) => {
  const dispatch = useDispatch();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { socket, socketMicro } = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();
  const matchId = location?.state?.matchId;
  const { axios } = setRole();
  const [loadingDeleteBet, setLoadingDeleteBet] = useState(false);

  const [IOSinglebets, setSingleIObtes] = useState([]);
  const [marketId, setMarketId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const {
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    allBetRates,
    allSessionBets,
    quickSession,
    selectedSessionBettings,
  } = useSelector((state) => state?.matchDetails);
  const { currentOdd } = useSelector((state) => state?.expertMatchDetails);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [matchDetail, setMatchDetail] = useState();
  const [sessionLock, setSessionLock] = useState(false);
  const [isHandled, setIsHandled] = useState(false);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popData, setPopData] = useState("");
  const [sessionExposer, setSessionExposure] = useState(0);
  const [sessionOff, setSessionOff] = useState([]);
  const [localQuickSession, setLocalQuickSession] = useState([]);
  const [localSelectedSessionBettings, setLocalSelectedSessionBettings] =
    useState([]);

  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const url = window.location.href;
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }

    if (sessionOffline) {
      setSessionOff(sessionOffline);
    }

    if (manualBookmaker) {
      setManualBookmakerData(manualBookmaker);
    }
    if (currentOdd) {
      setCurrentOdds(currentOdd);
    }

    if (allSessionBets) {
      setSessionBets(allSessionBets);
    }
    if (allBetRates) {
      setSingleIObtes(allBetRates);
    }
    if (quickSession) {
      setLocalQuickSession(quickSession);
    }
    if (selectedSessionBettings) {
      setLocalSelectedSessionBettings(selectedSessionBettings);
    }
  }, [
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    allSessionBets,
    currentOdd,
    allBetRates,
    quickSession,
    selectedSessionBettings,
  ]);

  // useEffect(() => {
  //   if (socket && socket.connected) {
  //     socket.on("newMessage", (value) => {
  //       console.log(value);
  //     });

  //     socket.onevent = async (packet) => {
  //       // console.log(`Received event: ${packet.data[0]}`, packet.data[1]);

  //       if (packet.data[0] === "updateMatchActiveStatus") {
  //         const value = packet.data[1];
  //         setCurrentMatch((currentMatch) => {
  //           if (currentMatch?.id === value?.matchId) {
  //             return {
  //               ...currentMatch,
  //               apiBookMakerActive: value?.apiBookMakerActive,
  //               apiMatchActive: value?.apiMatchActive,
  //               apiSessionActive: value?.apiSessionActive,
  //               manualBookMakerActive: value?.manualBookMakerActive,
  //               manualSessionActive: value?.manualSessionActive,
  //             };
  //           }
  //           return currentMatch;
  //         });
  //       }

  //       // manual bookmaker

  //       if (packet.data[0] === "updateRate_user") {
  //         const value = packet.data[1];
  //         try {
  //           if (!value?.lock) {
  //             if (value?.isTab) {
  //               setManualBookmakerData((currentMatches) => {
  //                 if (currentMatches[0]?.id != value.betId) {
  //                   return currentMatches;
  //                 }
  //                 const updatedMatch = {
  //                   ...currentMatches[0],
  //                   teamA_Back: value?.teamA_Back,
  //                   teamA_lay: "",
  //                   teamB_Back: value?.teamB_Back,
  //                   teamB_lay: "",
  //                   teamC_Back: value?.teamC_Back,
  //                   teamC_lay: "",
  //                   // teamA_suspend: "live",
  //                   teamA_suspend: null, // Update the teamA_susp
  //                   teamB_suspend: null, // Update the teamA_susp
  //                   teamC_suspend: null, // Update the teamA_susp
  //                   // teamB_suspend: "live",
  //                   // teamC_suspend: "live",
  //                 };

  //                 // Create a new array with the updated match object
  //                 const updatedMatches = [
  //                   ...currentMatches.slice(0, 0),
  //                   updatedMatch,
  //                   ...currentMatches.slice(0 + 1),
  //                 ];

  //                 // Return the new array as the updated state
  //                 return updatedMatches;
  //               });
  //             } else {
  //               setManualBookmakerData((currentMatches) => {
  //                 if (currentMatches[0]?.id != value.betId) {
  //                   return currentMatches;
  //                 }
  //                 const updatedMatch = {
  //                   ...currentMatches[0],
  //                   teamA_Back: value?.teamA_Back ? value?.teamA_Back : "", // Update the teamA_Back value
  //                   teamA_lay: value?.teamA_lay ? value?.teamA_lay : "", // Update the teamA_lay value
  //                   teamA_suspend:
  //                     value?.teamA_suspend == false ? null : "suspended", // Update the teamA_susp
  //                   teamB_Back: value?.teamB_Back ? value?.teamB_Back : "",
  //                   teamB_lay: value?.teamB_lay ? value?.teamB_lay : "",
  //                   teamB_suspend: value?.teamB_suspend
  //                     ? value?.teamB_suspend
  //                     : "",
  //                   teamC_Back: value?.teamC_Back ? value?.teamC_Back : "",
  //                   teamC_lay: value?.teamC_lay ? value?.teamC_lay : "",
  //                   teamC_suspend: value?.teamC_suspend
  //                     ? value?.teamC_suspend
  //                     : "",
  //                   teamA_Ball: null,
  //                   teamB_Ball: null,
  //                   teamC_Ball: null,
  //                 };

  //                 // Create a new array with the updated match object
  //                 const updatedMatches = [
  //                   ...currentMatches.slice(0, 0),
  //                   updatedMatch,
  //                   ...currentMatches.slice(0 + 1),
  //                 ];

  //                 // Return the new array as the updated state
  //                 return updatedMatches;
  //               });
  //             }
  //           } else {
  //             if (value.teamA_suspend == "Ball Started") {
  //               try {
  //                 setManualBookmakerData((currentMatches) => {
  //                   // alert(JSON.stringify(currentMatches))
  //                   if (currentMatches[0]?.id != value.betId) {
  //                     return currentMatches;
  //                   }
  //                   const updatedMatch = {
  //                     ...currentMatches[0],
  //                     teamA_suspend: value?.teamA_suspend
  //                       ? "suspended"
  //                       : value?.teamA_suspend,
  //                     teamB_suspend: value?.teamB_suspend
  //                       ? "suspended"
  //                       : value?.teamB_suspend,
  //                     teamC_suspend: value?.teamC_suspend
  //                       ? "suspended"
  //                       : value?.teamC_suspend,
  //                     teamA_Ball: "ball",
  //                     teamB_Ball: "ball",
  //                     teamC_Ball: "ball",
  //                   };
  //                   const updatedMatches = [
  //                     ...currentMatches.slice(0, 0),
  //                     updatedMatch,
  //                     ...currentMatches.slice(0 + 1),
  //                   ];
  //                   return updatedMatches;
  //                 });
  //               } catch (err) {
  //                 console.log(err?.message);
  //               }
  //             } else {
  //               try {
  //                 setManualBookmakerData((currentMatches) => {
  //                   // alert(JSON.stringify(currentMatches[0]));
  //                   if (currentMatches[0]?.id != value.betId) {
  //                     return currentMatches;
  //                   }
  //                   const updatedMatch = {
  //                     ...currentMatches[0],
  //                     teamA_suspend: value?.teamA_suspend
  //                       ? "suspended"
  //                       : value?.teamA_suspend,
  //                     teamB_suspend: value?.teamB_suspend
  //                       ? "suspended"
  //                       : value?.teamB_suspend,
  //                     teamC_suspend: value?.teamC_suspend
  //                       ? "suspended"
  //                       : value?.teamC_suspend,
  //                     teamA_Ball: null,
  //                     teamB_Ball: null,
  //                     teamC_Ball: null,
  //                   };
  //                   const updatedMatches = [
  //                     ...currentMatches.slice(0, 0),
  //                     updatedMatch,
  //                     ...currentMatches.slice(0 + 1),
  //                   ];
  //                   return updatedMatches;
  //                 });
  //               } catch (err) {
  //                 console.log(err?.message);
  //               }
  //             }
  //           }
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "updateSessionRate_user") {
  //         const value = packet.data[1];
  //         try {
  //           setCurrentMatch((currentMatch) => {
  //             if (currentMatch?.id !== value?.match_id) {
  //               // If the new bet doesn't belong to the current match, return the current state
  //               return currentMatch;
  //             }
  //             // Update the bettings array in the current match object
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting.id === value.betId) {
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               } else if (
  //                 betting?.id === value?.betId &&
  //                 value.sessionBet === false
  //               ) {
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               }
  //               return betting;
  //             });
  //             var newUpdatedValue = updatedBettings;
  //             const bettingsIds = updatedBettings?.map(
  //               (betting) => betting?.id
  //             );
  //             if (!bettingsIds?.includes(value.betId)) {
  //               newUpdatedValue = [...newUpdatedValue, value];
  //             }

  //             // Return the updated current match object
  //             return {
  //               ...currentMatch,
  //               bettings: newUpdatedValue,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "newBetAdded") {
  //         const value = packet.data[1];
  //         // matchId = value?.match_id;
  //         try {
  //           setCurrentMatch((currentMatch) => {
  //             if (currentMatch?.id !== value?.match_id) {
  //               // If the new bet doesn't belong to the current match, return the current state
  //               return currentMatch;
  //             }

  //             // Update the bettings array in the current match object
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting.id === value.id && value.sessionBet) {
  //                 // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               } else if (
  //                 betting?.id === value?.id &&
  //                 value.sessionBet === false
  //               ) {
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               }
  //               return betting;
  //             });
  //             var newUpdatedValue = updatedBettings;
  //             const bettingsIds = updatedBettings?.map(
  //               (betting) => betting?.id
  //             );

  //             if (!bettingsIds?.includes(value.id)) {
  //               // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

  //               newUpdatedValue = [...newUpdatedValue, value];
  //             } else {
  //               if (
  //                 sessionOffline.includes(value.id) &&
  //                 value.betStatus === 1
  //               ) {
  //                 const newres = sessionOffline.filter((id) => id !== value.id);
  //                 sessionOffline = newres;
  //               }
  //               if (value?.betStatus === 0) {
  //                 sessionOffline.push(value.id);
  //               }
  //             }

  //             // Return the updated current match object
  //             return {
  //               ...currentMatch,
  //               bettings: newUpdatedValue,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "matchOddRateLive") {
  //         // Bookmaker Market live and stop disable condition
  //         const value = packet.data[1];
  //         setCurrentMatch((prev) => {
  //           if (prev?.id === value?.matchId) {
  //             return {
  //               ...prev,
  //               matchOddRateLive: value?.matchOddLive,
  //             };
  //           }
  //           return prev;
  //         });
  //       }
  //       if (packet.data[0] === "bookMakerRateLive") {
  //         // Bookmaker Market live and stop disable condition
  //         const value = packet.data[1];
  //         setCurrentMatch((prev) => {
  //           if (prev?.id === value?.matchId) {
  //             return {
  //               ...prev,
  //               bookMakerRateLive: value?.bookMakerLive,
  //             };
  //           }
  //           return prev;
  //         });
  //       }

  //       if (packet.data[0] === "session_bet") {
  //         const data = packet.data[1];
  //         try {
  //           setSessionExposure(data?.sessionExposure);
  //           setCurrentOdds({
  //             bet_id: data?.betPlaceData?.bet_id,
  //             odds: data?.betPlaceData?.odds,
  //             match_id: data?.betPlaceData?.match_id,
  //           });
  //           setCurrentMatch((currentMatch) => {
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting?.id === data?.betPlaceData?.bet_id) {
  //                 // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                 let profitLoss = data?.profitLoss;
  //                 return {
  //                   ...betting,
  //                   profitLoss: profitLoss,
  //                 };
  //               }
  //               return betting;
  //             });
  //             // Return the updated current match object
  //             return {
  //               ...currentMatch,
  //               bettings: updatedBettings,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //         if (data?.betPlaceData?.match_id === matchId) {
  //           setSingleIObtes((prev) => {
  //             const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
  //             return [
  //               {
  //                 ...data.betPlaceData,
  //                 deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //               },
  //               ...updatedPrev,
  //             ];
  //           });
  //         }
  //         setSessionBets((prev) => {
  //           const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
  //           return [
  //             {
  //               ...data.betPlaceData,
  //               deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //             },
  //             ...updatedPrev,
  //           ];
  //         });
  //       }

  //       if (packet.data[0] === "match_bet") {
  //         const data = packet.data[1];
  //         if (!isHandled) {
  //           setIsHandled(true);
  //           try {
  //             if (data) {
  //               const body = {
  //                 id: data?.betPlaceData?.id,
  //                 isActive: true,
  //                 createAt: data?.betPlaceData?.createAt,
  //                 updateAt: data?.betPlaceData?.createAt,
  //                 createdBy: null,
  //                 deletedAt: null,
  //                 user_id: null,
  //                 match_id: data?.betPlaceData?.match_id,
  //                 bet_id: data?.betPlaceData?.bet_id,
  //                 result: "pending",
  //                 team_bet: data?.betPlaceData?.team_bet,
  //                 odds: data?.betPlaceData?.odds,
  //                 win_amount: null,
  //                 loss_amount: null,
  //                 bet_type: data?.betPlaceData?.bet_type,
  //                 myStack: data?.betPlaceData?.myStack,
  //                 userName: data?.betPlaceData?.userName,
  //                 deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //                 country: null,
  //                 ip_address: null,
  //                 rate: null,
  //                 marketType: data?.betPlaceData?.marketType,
  //                 amount:
  //                   data?.betPlaceData?.stack || data?.betPlaceData?.stake,
  //               };
  //               if (data?.betPlaceData?.match_id === matchId) {
  //                 setSingleIObtes((prev) => [body, ...prev]);
  //               }

  //               setCurrentMatch((prev) => {
  //                 if (prev?.id === data?.betPlaceData?.match_id) {
  //                   return {
  //                     ...prev,
  //                     teamA_rate: data?.teamA_rate,
  //                     teamB_rate: data?.teamB_rate,
  //                     teamC_rate: data?.teamC_rate,
  //                   };
  //                 }
  //                 return prev;
  //               });
  //             }
  //           } catch (e) {
  //             console.log("error", e?.message);
  //           } finally {
  //             setIsHandled(false);
  //           }
  //         }
  //       }
  //       if (packet.data[0] === "sessionNoResult") {
  //         const value = packet.data[1];
  //         // matchId = value?.match_id;
  //         try {
  //           const user = {
  //             ...currentUser,
  //             current_balance: value.current_balance,
  //             exposure: value.exposure,
  //           };

  //           // dispatch(setCurrentUser(user));
  //           setCurrentMatch((currentMatch) => {
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (
  //                 betting?.id === value?.betId &&
  //                 currentMatch?.id === value?.match_id
  //               ) {
  //                 return {
  //                   ...betting,
  //                   profitLoss: null,
  //                 };
  //               }
  //               return betting;
  //             });

  //             return {
  //               ...currentMatch,
  //               bettings: updatedBettings,
  //             };
  //           });

  //           setSingleIObtes((sessionBets) =>
  //             sessionBets?.filter((v) => v?.bet_id !== value?.betId)
  //           );
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "matchDeleteBet") {
  //         const value = packet.data[1];
  //         try {
  //           setSingleIObtes((IOSinglebets) => {
  //             const updatedBettings = IOSinglebets?.map((betting) => {
  //               if (value?.betPlaceIds.includes(betting.id)) {
  //                 return {
  //                   ...betting,
  //                   deleted_reason: value?.deleted_reason,
  //                 };
  //               }
  //               return betting;
  //             });

  //             return updatedBettings;
  //           });
  //           setCurrentMatch((prev) => {
  //             const updatedBettings = prev?.bettings?.map((betting) => {
  //               if (betting?.id === value?.betId) {
  //                 // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                 let profitLoss = value?.profitLoss;
  //                 return {
  //                   ...betting,
  //                   profitLoss: profitLoss,
  //                 };
  //               }
  //               return betting;
  //             });

  //             if (prev?.id === value?.matchId) {
  //               return {
  //                 ...prev,
  //                 bettings: updatedBettings,
  //                 teamA_rate: value?.teamA_rate,
  //                 teamB_rate: value?.teamB_rate,
  //                 teamC_rate: value?.teamC_rate,
  //               };
  //             }

  //             return prev;
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "sessionDeleteBet") {
  //         const value = packet.data[1];
  //         try {
  //           setSingleIObtes((IOSinglebets) => {
  //             const updatedBettings = IOSinglebets?.map((betting) => {
  //               if (value?.betPlaceIds.includes(betting.id)) {
  //                 // let profitLoss = value?.profitLoss;
  //                 return {
  //                   ...betting,
  //                   deleted_reason: value?.deleted_reason,
  //                   // profitLoss: profitLoss,
  //                 };
  //               }
  //               return betting;
  //             });

  //             return updatedBettings;
  //           });

  //           setCurrentMatch((prev) => {
  //             const updatedBettings = prev?.bettings?.map((betting) => {
  //               if (betting?.id === value?.betId) {
  //                 // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                 let profitLoss = value?.profitLoss;
  //                 return {
  //                   ...betting,
  //                   profitLoss: profitLoss,
  //                 };
  //               }
  //               return betting;
  //             });
  //             if (currentMatch.id === value.matchId) {
  //               setSessionExposure(value.sessionExposure);
  //             }
  //             if (prev?.id === value?.matchId && value?.teamA_rate) {
  //               return {
  //                 ...prev,
  //                 bettings: updatedBettings,
  //                 teamA_rate: value?.teamA_rate,
  //                 teamB_rate: value?.teamB_rate,
  //                 teamC_rate: value?.teamC_rate,
  //               };
  //             } else {
  //               return {
  //                 ...prev,
  //                 bettings: updatedBettings,
  //               };
  //             }
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "resultDeclareForBet") {
  //         const value = packet.data[1];
  //         // matchId = value?.match_id;
  //         if (value?.sessionBet == false) {
  //           if (matchId == value?.match_id) {
  //             navigate("/wallet/market_analysis");
  //           }
  //           return;
  //         }
  //         try {
  //           setCurrentMatch((currentMatch) => {
  //             if (currentMatch?.id !== value?.match_id) {
  //               return currentMatch;
  //             }
  //             // Update the bettings array in the current match object
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting.id === value.betId) {
  //                 if (sessionOffline.includes(value.betId)) {
  //                   const newres = sessionOffline.filter(
  //                     (id) => id !== value.betId
  //                   );
  //                   sessionOffline = newres;
  //                 }
  //                 sessionOffline.push(value.betId);
  //               }
  //               return betting;
  //             });
  //             var newUpdatedValue = updatedBettings;
  //             return {
  //               ...currentMatch,
  //               bettings: newUpdatedValue,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "sessionResult") {
  //         const value = packet.data[1];
  //         // matchId = value?.match_id;
  //         try {
  //           setCurrentMatch((currentMatch) => {
  //             if (currentMatch?.matchId !== value?.matchId) {
  //               // If the new bet doesn't belong to the current match, return the current state
  //               return currentMatch;
  //             }

  //             const updatedBettings = currentMatch?.bettings?.filter(
  //               (betting) => betting?.id !== value?.betId
  //             );

  //             return {
  //               ...currentMatch,
  //               bettings: updatedBettings,
  //             };
  //           });
  //           setSessionBets((sessionBets) =>
  //             sessionBets?.filter((v) => v?.bet_id !== value?.betId)
  //           );
  //           setSingleIObtes((sessionBets) =>
  //             sessionBets?.filter((v) => v?.bet_id !== value?.betId)
  //           );
  //           setPopData(value?.betId);
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "logoutUserForce") {
  //         dispatch(logout({ roleType: "role2" }));
  //         setGlobalStore((prev) => ({ ...prev, walletWT: "" }));
  //         dispatch(removeManualBookMarkerRates());
  //         dispatch(removeCurrentUser());
  //         // dispatch(removeSelectedMatch());
  //         removeSocket();
  //         socket.disconnect();
  //         navigate("/wallet");
  //         await axios.get("auth/logout");
  //       }
  //     };
  //   }
  // }, [socket]);

  const debouncedSession = _.debounce((val) => {
    if (val !== null && matchId === checkMctchId) {
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

      setCurrentMatch((currentMatch) => {
        if (currentMatch?.bettings?.length > 0) {
          setLocalSelectedSessionBettings((prev) => {
            const data = prev?.map((betting) => {
              const selectedData = newVal?.find(
                (nv) => nv?.selectionId === betting?.selectionId
              );
              return {
                ...betting,
                bet_condition:
                  selectedData?.bet_condition || betting?.bet_condition,
                no_rate:
                  selectedData?.no_rate !== undefined
                    ? selectedData.no_rate
                    : 0,
                yes_rate:
                  selectedData?.yes_rate !== undefined
                    ? selectedData.yes_rate
                    : 0,
                rate_percent:
                  selectedData?.rate_percent || betting?.rate_percent,
                suspended: selectedData?.suspended || "",
                selectionId: selectedData?.selectionId || betting?.selectionId,
              };
            });
            dispatch(setSelectedSessionBettings(data));
            return data;
          });
          const data = currentMatch?.bettings?.map((betting) => {
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

          // Merge the filteredNewVal with the currentMatch bettings array

          return {
            ...currentMatch,
            bettings: data,
          };
        }
        return currentMatch;
      });
    }

    // dispatch(setSessionOddsLive(body));
  }, 300);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on("connect", () => {
          socketMicro.emit("init", { id: marketId });
          // activateLiveMatchMarket();
          setSessionLock(false);
        });
        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here

          setMacthOddsLive([]);
          setBookmakerLive([]);
          setSessionLock(true);
          console.log("WebSocket connection failed:", event);
        });

        socketMicro.emit("init", { id: marketId });

        socketMicro.on("reconnect", () => {
          socketMicro.emit("init", { id: marketId });
          setSessionLock(false);
        });

        socketMicro.on(`session${marketId}`, debouncedSession);
        socketMicro.on(`matchOdds${marketId}`, (val) => {
          // matchodds Market live and stop disable condition
          if (val !== null) {
            if (val.length === 0) {
              matchOddsCount += 1;
              if (matchOddsCount >= 3) {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            } else {
              setMacthOddsLive(val[0]);
              if (val[0]?.status === "CLOSED") {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            }
          }
        });
        socketMicro.on(`bookmaker${marketId}`, (val) => {
          if (val !== null) {
            if (val.length > 0) {
              setBookmakerLive(val[0]);
            } else {
              setBookmakerLive([]);
            }
          }
        });
      } else {
        setMacthOddsLive([]);
        setBookmakerLive([]);
        setSessionLock(false);
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      socketMicro?.emit("disconnect_market", {
        id: marketId,
      });
      setMacthOddsLive([]);
      setBookmakerLive([]);
      setSessionLock(false);
    };
  }, [marketId, socketMicro]);

  async function getThisMatch(id) {
    try {
      setLoading(true);
      const response = await axios.get(`/game-match/matchDetail/${id}`);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );

      let sessionDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet && element.selectionId !== null
      );

      let quickSessionDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet && element.selectionId === null
      );

      const updateLiveSesssion = sessionDataTemp?.map((v) => ({
        ...v,
        yes_rate: 0,
        no_rate: 0,
        suspended: "",
      }));

      dispatch(setQuickSession(quickSessionDataTemp));
      dispatch(setSelectedSessionBettings(updateLiveSesssion));

      setManualBookmakerData(matchOddsDataTemp);
      dispatch(setManualBookmaker(matchOddsDataTemp));
      const newBody = {
        ...response.data,
      };
      // setCurrentMatch(newBody);
      const updatedNewData = newBody?.bettings?.map((v) => {
        if (v?.selectionId) {
          return { ...v, yes_rate: 0, no_rate: 0, suspended: "" };
        }
        return v;
      });

      dispatch(setSelectedMatch({ ...newBody, bettings: updatedNewData }));

      setSessionExposure(response.data.sessionExposure);
      setMarketId(response.data.marketId);
      setMatchDetail(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log("response", e.response.data);
    }
  }

  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      setSingleIObtes(data?.data?.data);
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

  useEffect(() => {
    if (matchId !== undefined) {
      getThisMatch(matchId);
      getAllBetsData(matchId);
    }
  }, [matchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (matchId !== undefined) {
          getThisMatch(matchId);
          getAllBetsData(matchId);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleDeleteBet = async (value) => {
    let data = {
      deleteReason: value,
      placeBetId: selectedBetData,
      matchId: matchId,
    };
    try {
      setLoadingDeleteBet(true);
      let response = await axios.post(`/betting/deleteMultipleBet`, data);
      if (response) {
        setLoadingDeleteBet(false);
        setMode(false);
      }
    } catch (e) {
      setLoadingDeleteBet(false);
      console.log(e);
    }
  };

  const [mode, setMode] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);

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
          {visible && (
            <AddNotificationModal
              value={value}
              title={"Add Remark"}
              visible={visible}
              loadingDeleteBet={loadingDeleteBet}
              setVisible={setVisible}
              onDone={handleDeleteBet}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);
                setMode(false);
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { matchesMobile: "column", laptop: "row" },
              // marginY: { mobile: ".2vh", laptop: ".5vh" },
              flex: 1,
              height: "100%",
              marginX: "0.5%",
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
                  color: "white",
                  fontWeight: "700",
                  // paddingTop: "2%",
                  alignSelf: "start",
                  // paddingBottom: "5px"
                }}
              >
                {currentMatch?.teamA} V/S {currentMatch?.teamB}
              </Typography>
              {currentMatch?.apiMatchActive && (
                <Odds
                  currentMatch={currentMatch}
                  matchOddsLive={matchOddsLive}
                  data={
                    matchOddsLive?.runners?.length > 0
                      ? matchOddsLive?.runners
                      : []
                  }
                  typeOfBet={"Match Odds"}
                  minBet={currentMatch?.betfair_match_min_bet}
                  maxBet={currentMatch?.betfair_match_max_bet}
                />
              )}
              {currentMatch?.bookmakers?.map((bookmaker) => {
                if (bookmaker.betStatus === 1) {
                  return (
                    <Odds
                      currentMatch={currentMatch}
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
              {/* {currentMatch?.manualBookMakerActive && (
                <Odds
                  currentMatch={currentMatch}
                  data={currentMatch}
                  manualBookmakerData={manualBookmakerData}
                  typeOfBet={"Quick Bookmaker"}
                />
              )} */}

              {currentMatch?.apiBookMakerActive && (
                <BookMarketer
                  currentMatch={currentMatch}
                  data={
                    bookmakerLive?.runners?.length > 0
                      ? bookmakerLive?.runners
                      : []
                  }
                />
              )}

              {currentMatch?.manualSessionActive && matchesMobile && (
                <SessionMarket
                  title={"Quick Session Market"}
                  sessionExposer={sessionExposer}
                  currentMatch={currentMatch}
                  sessionBets={sessionBets?.length}
                  sessionData={localQuickSession}
                  // data={[]}
                  sessionOffline={sessionOff}
                  setPopData={setPopData}
                  popData={popData}
                  min={currentMatch?.manaual_session_min_bet || 0}
                  max={currentMatch?.manaual_session_max_bet || 0}
                />
              )}
              {currentMatch?.apiSessionActive && matchesMobile && (
                <SessionMarket
                  title={"Session Market"}
                  currentMatch={currentMatch}
                  sessionBets={sessionBets?.length}
                  sessionExposer={sessionExposer}
                  sessionData={localSelectedSessionBettings}
                  // data={[]}
                  sessionOffline={sessionOff}
                  setPopData={setPopData}
                  popData={popData}
                  max={currentMatch?.betfair_session_max_bet}
                  min={currentMatch?.betfair_session_min_bet}
                />
              )}
              {matchesMobile && (
                <UserProfitLoss title={"User Profit Loss"} matchId={matchId} />
              )}
              {/* {matchesMobile && */}
              {url.includes("wallet") && IOSinglebets.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  {mode && (
                    //  <CancelButton setMode={setMode} />
                    <Box
                      onClick={() => {
                        setMode(!mode);
                      }}
                      sx={{
                        width: "150px",
                        marginY: ".75%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5px",
                        background: "#f1c550",
                        height: "35px",
                        border: "1.5px solid white",
                        display: "flex",
                        alignSelf: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                          color: "black",
                          marginRight: "10px",
                        }}
                      >
                        {"Cancel"}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ width: "2%" }}></Box>
                  {/* <CustomButton mode={mode} setMode={setMode} setVisible={setVisible} /> */}
                  <Box
                    onClick={() => {
                      if (mode) {
                        setVisible(true);
                      } else {
                        setMode(!mode);
                      }
                    }}
                    sx={{
                      width: "150px",
                      marginY: ".75%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      background: "#E32A2A",
                      height: "35px",
                      border: "1.5px solid white",
                      display: "flex",
                      alignSelf: "flex-end",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: "white",
                        marginRight: "10px",
                      }}
                    >
                      {mode ? "Delete" : "Delete Bet"}
                    </Typography>
                    <img
                      src={DeleteIcon}
                      style={{ width: "17px", height: "20px" }}
                    />
                  </Box>
                </Box>
              )}
              {/* } */}
              {IOSinglebets.length > 0 && (
                <FullAllBets
                  IObets={IOSinglebets}
                  mode={mode}
                  tag={false}
                  setSelectedBetData={setSelectedBetData}
                  selectedBetData={selectedBetData}
                />
              )}
            </Box>
            {!matchesMobile && <Box sx={{ width: "20px" }} />}
            {!matchesMobile && (
              <Box
                sx={{
                  flex: 1,
                  flexDirection: "column",
                  display: "flex",
                  minHeight: "100px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  {/* {mode && <CancelButton />} */}
                  <Box sx={{ width: "2%" }}></Box>
                  <Box
                    sx={{ width: "150px", marginY: ".75%", height: "15px" }}
                  ></Box>
                </Box>
                {currentMatch?.manualSessionActive && (
                  <SessionMarket
                    title={"Quick Session Market"}
                    currentOdds={currentOdds}
                    currentMatch={currentMatch}
                    sessionBets={sessionBets?.length}
                    sessionExposer={currentMatch?.sessionExposure}
                    sessionData={localQuickSession}
                    // data={[]}
                    sessionOffline={sessionOff}
                    setPopData={setPopData}
                    popData={popData}
                    min={currentMatch?.manaual_session_min_bet || 0}
                    max={currentMatch?.manaual_session_max_bet || 0}
                  />
                )}
                {currentMatch?.apiSessionActive && (
                  <SessionMarket
                    title={"Session Market"}
                    currentOdds={currentOdds}
                    currentMatch={currentMatch}
                    sessionBets={sessionBets?.length}
                    sessionExposer={currentMatch?.sessionExposure}
                    sessionData={localSelectedSessionBettings}
                    // data={[]}
                    sessionOffline={sessionOff}
                    setPopData={setPopData}
                    popData={popData}
                    max={currentMatch?.betfair_session_max_bet}
                    min={currentMatch?.betfair_session_min_bet}
                  />
                )}
                <UserProfitLoss title={"User Profit Loss"} matchId={matchId} />
              </Box>
            )}
          </Box>
          <DailogModal />
        </>
      )}
    </Background>
  );
};

export default DeleteBet;
