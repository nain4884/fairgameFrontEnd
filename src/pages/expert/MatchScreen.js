import React, { memo, useCallback, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import "../../components/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import AllBets from "../../components/AllBets";
import { Background, CustomHeader as CHeader } from "../../components/index";
import { SocketContext } from "../../context/socketContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setManualBookMarkerRates,
  setRefreshForBets,
  setSelectedMatch,
} from "../../newStore/reducers/matchDetails";

import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { setRole } from "../../newStore";
import BookMarketer from "./BookMarketer";
import SessionMarket from "./SessionMarket/SessionMarket";
import RunsBox from "./RunsBox";
import MatchOdds from "./MatchOdds/MatchOdds";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import { logout } from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import SessionMarketLive from "../expert/SessionMarket/LiveSessionMarket/SessionMarketLive";
import CustomLoader from "../../components/helper/CustomLoader";
import {
  setActiveUsers,
  setAllBetRate,
  setSessionExpertOdds,
} from "../../newStore/reducers/expertMatchDetails";
import { setSelected } from "../../store/activeUser";
import { customSort } from "../../components/helper/util";
import _ from "lodash";
let matchOddsCount = 0;
let marketId = "";
let profitLoss;
const MatchScreen = () => {
  const [data, setData] = useState([]);
  const { socket, socketMicro } = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { axios } = setRole();
  const dispatch = useDispatch();
  const { allBetRates, currentOdd, sessionExpertOdds, declaredMatchDetail } =
    useSelector((state) => state?.expertMatchDetails);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [IObets, setIObtes] = useState([]);
  const [bookmakerLivedata, setBookmakerLiveData] = useState([]);
  const [matchOddsLive, setMatchOddsLive] = useState([]);
  const [localState, setLocalState] = useState(null);
  const [liveData, setLiveData] = useState([]);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [currentOdds, setCurrentOdds] = useState(null);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [matchLiveSession, setMatchLiveSession] = useState([]);
  const [localSessionExpertOdds, setLocalSessionExpertOdds] = useState([]);

  const { selectedMatch, refreshForBets } = useSelector(
    (state) => state?.matchDetails
  );

  useEffect(() => {
    if (allBetRates) {
      setIObtes(allBetRates);
    }
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }
    if (currentOdd) {
      setCurrentOdds(currentOdd);
    }
    if (currentOdd) {
      setCurrentOdds(currentOdd);
    }
    if (sessionExpertOdds) {
      setLocalSessionExpertOdds(sessionExpertOdds);
    }
  }, [selectedMatch, allBetRates, currentOdd, sessionExpertOdds]);

  useEffect(() => {
    try {
      if (
        declaredMatchDetail?.match_id === currentMatch?.id &&
        declaredMatchDetail?.sessionBet === false
      ) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  }, [declaredMatchDetail]);

  const getSingleMatch = async (val) => {
    try {
      const { data } = await axios.get(`game-match/matchDetail/${val}`);
      const newMatch = { ...data, bettings: data?.bettings };
      const updatedbettings = newMatch.bettings.map((v) => {
        if (v.selectionId !== null) {
          return {
            ...v,
            yes_rate: "0",
            no_rate: "0",
            suspended: "",
          };
        }
        return v;
      });
      // setCurrentMatch(updatedbettings);
      const sessionList = newMatch?.bettings?.map((v) => ({
        ...v,
        no_rate: "0",
        yes_rate: "0",
        suspended: "",
      }));
      dispatch(setSessionExpertOdds(sessionList));
      dispatch(setSelectedMatch({ ...newMatch, bettings: updatedbettings }));
      marketId = data?.marketId;
      const manualBookmaker = {
        matchId: data?.id,
        teamA: data?.teamA_rate,
        teamB: data?.teamB_rate,
        teamC: data?.teamC_rate,
      };

      dispatch(setManualBookMarkerRates(manualBookmaker));
      setLoading(false);
    } catch (e) {
      console.log(e?.message, "message");
    }
  };
  useEffect(() => {
    try {
      if (state?.id) {
        getSingleMatch(state.id);
        getAllBetsData(state?.id);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  useEffect(() => {
    if (refreshForBets) {
      getAllBetsData(state?.id);
    }
  }, [refreshForBets]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      try {
        if (document.visibilityState === "visible") {
          // User returned to the web browser
          if (state?.id) {
            // if (socket && socket.connected) {
            //   socket.emit("checkConnection");
            // }
            getSingleMatch(state?.id);
            getAllBetsData(state?.id);
          }
        }
      } catch (e) {
        console.log(e?.message, "message");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      try {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      } catch (e) {
        console.log(e?.message, "message");
      }
    };
  }, []);

  const [liveSessionData, setLiveSessionData] = useState([]);
  // useEffect(() => {
  //   if (localState?.id) {
  //     setCurrentMatch((currentMatch) => ({ ...currentMatch, ...localState }));
  //     setLocalState(null);
  //   }
  // }, [localState]);

  // useEffect(() => {
  //   if (socket && socket.connected && currentMatch !== null) {
  //     socket.onevent = async (packet) => {
  //       if (packet.data[0] === "logoutUserForce") {
  //         dispatch(removeManualBookMarkerRates());
  //         dispatch(removeCurrentUser());
  //         dispatch(logout({ roleType: "role3" }));
  //         dispatch(removeSelectedMatch());
  //         setGlobalStore((prev) => ({ ...prev, expertJWT: "" }));
  //         // await axios.get("auth/logout");
  //         removeSocket();
  //         navigate("/expert");
  //         socket.disconnect();
  //         socketMicro.disconnect();
  //       }

  //       if (packet.data[0] === "match_bet") {
  //         const data = packet.data[1];
  //         try {
  //           if (data) {
  //             const manualBookmaker = {
  //               matchId: data?.betPlaceData?.match_id,
  //               teamA: data.teamA_rate,
  //               teamB: data.teamB_rate,
  //               teamC: data.teamC_rate,
  //             };

  //             setIObtes((prev) => {
  //               if (currentMatch?.id === data?.betPlaceData?.match_id) {
  //                 const body = {
  //                   id: data?.betPlaceData?.id,
  //                   isActive: true,
  //                   createAt: data?.betPlaceData?.createdAt,
  //                   updateAt: data?.betPlaceData?.createdAt,
  //                   createdBy: null,
  //                   deletedAt: null,
  //                   user: { userName: data?.betPlaceData?.userName },
  //                   user_id: null,
  //                   match_id: data?.betPlaceData?.match_id,
  //                   bet_id: data?.betPlaceData?.bet_id,
  //                   result: "pending",
  //                   team_bet: data?.betPlaceData?.team_bet,
  //                   odds: data?.betPlaceData?.odds,
  //                   win_amount: null,
  //                   loss_amount: null,
  //                   bet_type: data?.betPlaceData?.bet_type,
  //                   country: null,
  //                   ip_address: null,
  //                   rate: data?.betPlaceData?.rate,
  //                   deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //                   marketType: data?.betPlaceData?.marketType,
  //                   myStack: data?.betPlaceData?.myStack,
  //                   myStack: data?.betPlaceData?.myStack,
  //                   amount:
  //                     data?.betPlaceData?.stack || data?.betPlaceData?.stake,
  //                 };
  //                 return [body, ...prev];
  //               }
  //               return prev;
  //             });

  //             dispatch(setManualBookMarkerRates(manualBookmaker));
  //           }
  //         } catch (e) {
  //           console.log("error", e?.message);
  //         }
  //       }

  //       if (packet.data[0] === "bookMakerRateLive") {
  //         const e = packet.data[1];
  //         if (e?.matchId === currentMatch?.id) {
  //           const body = {
  //             ...currentMatch,
  //             bookMakerRateLive: e?.bookMakerLive,
  //           };
  //           setCurrentMatch(body);
  //         }
  //       }

  //       if (packet.data[0] === "matchOddRateLive") {
  //         const e = packet.data[1];
  //         if (e?.matchId === currentMatch?.id) {
  //           const body = {
  //             ...currentMatch,
  //             matchOddRateLive: e?.matchOddLive,
  //           };
  //           setCurrentMatch(body);
  //         }
  //       }
  //       if (packet.data[0] === "newBetAdded") {
  //         const value = packet.data[1];
  //         try {
  //           if (currentMatch?.id == value?.match_id) {
  //             setLiveData((liveData) =>
  //               liveData?.filter((v) => v.betStatus !== 1)
  //             );

  //             setLiveData((liveData) => {
  //               liveData?.map((val) => {
  //                 if (val?.selectionId === data?.selectionId) {
  //                   return {
  //                     ...val,
  //                     betStatus: 1, // update betStatus to 1
  //                   };
  //                 }
  //                 return val;
  //               });
  //             });
  //             setCurrentMatch((currentMatch) => {
  //               var updatedBettings = currentMatch?.bettings.map((betting) => {
  //                 if (
  //                   betting?.selectionId === value?.selectionId ||
  //                   betting?.id === value?.id
  //                 ) {
  //                   return { ...betting, betStatus: value?.betStatus };
  //                 }
  //                 return betting; // Return the unchanged betting object if no match is found
  //               });

  //               // If no match was found, push the value to the bettings array
  //               if (value.selectionId && !updatedBettings.some((betting) => betting.id === value.id)) {
  //                 updatedBettings.unshift(value);
  //               }

  //               return {
  //                 ...currentMatch,
  //                 bettings: updatedBettings.sort(customSort),
  //               };
  //             });
  //           }
  //         } catch (e) {
  //           console.log(e.message);
  //         }
  //       }
  //       if (packet.data[0] === "session_bet") {
  //         const data = packet.data[1];
  //         try {
  //           if (data) {
  //             setCurrentOdds({
  //               bet_id: data?.betPlaceData?.bet_id,
  //               odds: data?.betPlaceData?.odds,
  //               match_id: data?.betPlaceData?.match_id,
  //             });
  //             setIObtes((IObets) => {
  //               const updatedIObets = Array.isArray(IObets) ? IObets : []; // Ensure IObets is an array

  //               if (currentMatch?.id === data?.betPlaceData?.match_id) {
  //                 const body = {
  //                   id: data?.betPlaceData?.id,
  //                   isActive: true,
  //                   createAt: data?.betPlaceData?.createdAt,
  //                   updateAt: data?.betPlaceData?.createdAt,
  //                   createdBy: null,
  //                   deletedAt: null,
  //                   user: { userName: data?.betPlaceData?.userName },
  //                   user_id: null,
  //                   match_id: data?.betPlaceData?.match_id,
  //                   bet_id: data?.betPlaceData?.bet_id,
  //                   result: "pending",
  //                   team_bet: data?.betPlaceData?.team_bet,
  //                   odds: data?.betPlaceData?.odds,
  //                   win_amount: null,
  //                   loss_amount: null,
  //                   bet_type: data?.betPlaceData?.bet_type,
  //                   country: null,
  //                   ip_address: null,
  //                   deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //                   rate: data?.betPlaceData?.rate,
  //                   marketType: data?.betPlaceData?.marketType,
  //                   myStack: data?.betPlaceData?.myStack,
  //                   amount:
  //                     data?.betPlaceData?.stack || data?.betPlaceData?.stake,
  //                 };

  //                 return [body, ...updatedIObets];
  //               }

  //               return updatedIObets;
  //             });

  //             setCurrentMatch((currentMatch) => {
  //               const updatedBettings = currentMatch?.bettings?.map(
  //                 (betting) => {
  //                   if (betting?.id === data?.betPlaceData?.bet_id) {
  //                     // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                     let profitLoss = data?.profitLoss;

  //                     return {
  //                       ...betting,
  //                       profitLoss: profitLoss,
  //                     };
  //                   }
  //                   return betting;
  //                 }
  //               );
  //               // Return the updated current match object
  //               return {
  //                 ...currentMatch,
  //                 bettings: updatedBettings,
  //               };
  //             });
  //           }
  //         } catch (e) {
  //           console.log("error", e?.message);
  //         }
  //       }

  //       if (packet.data[0] === "userBalanceUpdate") {
  //         const data = packet.data[1];
  //         const user = {
  //           ...currentUser,
  //           current_balance: data?.currentBalacne,
  //         };
  //         dispatch(setCurrentUser(user));

  //         //currentBalacne
  //       }
  //       if (packet.data[0] === "loginUserCount") {
  //         const data = packet.data[1];
  //         console.log(data, "user");
  //         dispatch(setActiveUsers(data?.count));
  //       }
  //       if (packet.data[0] === "matchDeleteBet") {
  //         const value = packet.data[1];
  //         try {
  //           setIObtes((IObets) => {
  //             const updatedBettings = IObets?.map((betting) => {
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
  //           const manualBookmaker = {
  //             matchId: value?.matchId,
  //             teamA: value?.teamA_rate,
  //             teamB: value?.teamB_rate,
  //             teamC: value?.teamC_rate,
  //           };
  //           dispatch(setManualBookMarkerRates(manualBookmaker));
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "sessionDeleteBet") {
  //         const value = packet.data[1];
  //         try {
  //           setIObtes((IObets) => {
  //             const updatedBettings = IObets?.map((betting) => {
  //               if (value?.betPlaceData.includes(betting.id)) {
  //                 return {
  //                   ...betting,
  //                   deleted_reason: value?.deleted_reason,
  //                 };
  //               }
  //               return betting;
  //             });

  //             return updatedBettings;
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "resultDeclareForBet") {
  //         const value = packet.data[1];
  //         // matchId = value?.match_id;
  //         try {
  //           if (
  //             currentMatch?.id == value?.match_id &&
  //             value?.sessionBet === false
  //           ) {
  //             navigate("/expert/match");
  //           }
  //           setCurrentMatch((prev) => {
  //             const updatedBettings = prev?.bettings?.map((betting) => {
  //               if (value?.betId === betting?.id && value?.sessionBet) {
  //                 return {
  //                   ...betting,
  //                   betStatus: 2,
  //                   betRestult:value.score,
  //                   profitLoss: value?.profitLoss,
  //                 };
  //               }
  //               return betting;
  //             });
  //             return { ...prev, bettings: updatedBettings };
  //           });

  //           if (
  //             currentMatch?.id == value?.match_id &&
  //             value?.sessionBet === false
  //           ) {
  //             navigate("/expert/match");
  //           }
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //     };
  //   }
  // }, [socket, currentMatch]);

  const activateLiveMatchMarket = async (val) => {
    try {
      await Axios.get(`${microServiceApiPath}/market/${val}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  const handleMatchOdds = useCallback(
    (val) => {
      try {
        if (val?.length === 0 || val === null) {
          matchOddsCount += 1;
          if (matchOddsCount >= 3) {
            socketMicro.emit("disconnect_market", { id: state?.marketId });
          }
        } else {
          setMatchOddsLive(val[0]);
          if (val[0]?.status === "CLOSED") {
            socketMicro.emit("disconnect_market", { id: state?.marketId });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [state?.marketId, socketMicro]
  );

  const handleBookmaker = useCallback(
    (val) => {
      try {
        if (val.length > 0) {
          setBookmakerLiveData(val[0]);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [state?.marketId]
  );

  const handleSession = useCallback(
    (val) => {
      try {
        if (val !== null && state?.marketId === marketId) {
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
          setLiveSessionData(newVal);

          setLocalSessionExpertOdds((prev) => {
            if (!prev) {
              return prev; // Return early if prev is null or undefined
            }

            const updatedOdds = prev.map((betting) => {
              const selectedData = newVal.find(
                (nv) => nv?.selectionId === betting.selectionId
              );

              if (selectedData) {
                return {
                  ...betting,
                  bet_condition: selectedData.bet_condition,
                  no_rate: selectedData.no_rate,
                  yes_rate: selectedData.yes_rate,
                  rate_percent: selectedData.rate_percent,
                  suspended: selectedData.suspended,
                  selectionId: selectedData.selectionId,
                };
              }
              return {
                ...betting,
                no_rate: "0",
                yes_rate: "0",
                suspended: "",
              }; // Keep unchanged if no match found
            });
            dispatch(setSessionExpertOdds(updatedOdds));
            return updatedOdds;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [state?.marketId, marketId]
  );
  const debouncedHandleSession = _.debounce(handleSession, 300);

  useEffect(() => {
    try {
      if (socketMicro?.connected && state?.marketId && marketId) {
        socketMicro.emit("init", { id: state?.marketId });
        setInterval(() => {
          socketMicro.emit("init", { id: state?.marketId });
        }, 3000);
        socketMicro.on("reconnect", () => {
          socket.emit("init", { id: state?.marketId });
          activateLiveMatchMarket(state?.marketId);
        });
        activateLiveMatchMarket(state?.marketId);
        sessionStorage.setItem("marketId", state?.marketId);
        socketMicro.on(`session${state?.marketId}`, debouncedHandleSession);
        socketMicro.on(`matchOdds${state?.marketId}`, handleMatchOdds);
        socketMicro.on(`bookmaker${state?.marketId}`, handleBookmaker);
      }
    } catch (e) {
      console.log(e);
    }

    return () => {
      try {
        socketMicro?.emit("disconnect_market", { id: marketId });
        setMatchOddsLive([]);
        matchOddsCount = 0;
      } catch (e) {
        console.log(e);
      }
    };
  }, [socketMicro, state?.marketId, marketId, localState]);

  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      setIObtes(data?.data?.data || []);
      dispatch(setAllBetRate(data?.data?.data || []));
      setTimeout(() => {
        dispatch(setRefreshForBets(false));
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        dispatch(setRefreshForBets(false));
      }, 1000);
      console.log(e);
    }
  }

  const arrayObject = localSessionExpertOdds?.filter(
    (element) => element?.sessionBet && element?.id
  );

  const idx = localSessionExpertOdds?.map(
    (v) => v?.selectionId && v?.selectionId
  );
  console.log(idx, "dx");
  return (
    <Background>
      {/* <CHeader /> */}
      {/* <CustomHeader /> */}

      <Box
        sx={{
          display: { laptop: "flex" },
          alignSelf: "center",
          borderRadius: "10px",
          flexDirection: "row",
          width: "100%",
          // marginX: ".5%",
          height: {
            mobile: loading ? "80vh" : "100%",
            laptop: loading ? "90vh" : "100%",
          },
          minHeight: "92vh",
          // marginTop: "5px",
          background: !loading && "white",
          padding: 1,
          gap: 1,
        }}
      >
        {loading ? (
          <CustomLoader text="" />
        ) : (
          <>
            <Box
              sx={{
                width: { laptop: "50%", mobile: "100%", tablet: "100%" },
              }}
            >
              {(currentMatch?.apiSessionActive ||
                currentMatch?.manualSessionActive) && (
                <Box
                  sx={{
                    width: { laptop: "100%", mobile: "100%", tablet: "100%" },
                    display: "flex",
                    gap: 0.1,
                    flexDirection: { tablet: "column", laptop: "coulmn" },
                  }}
                >
                  <Box
                    sx={{
                      width: { laptop: "100%", mobile: "100%", tablet: "100%" },
                      flexDirection: "column",
                      display: "flex",
                    }}
                  >
                    <SessionMarketLive
                      title={"Session API Market"}
                      hideTotalBet={true}
                      liveOnly={true}
                      stopAllHide={true}
                      hideResult={true}
                      sessionData={liveSessionData?.filter(
                        (v) => !idx?.includes(v?.selectionId)
                      )}
                      setMatchLiveSession={setLiveSessionData}
                      setLocalState={setLocalState}
                      setCurrentMatch={setCurrentMatch}
                      currentMatch={currentMatch}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: { laptop: "100%", mobile: "100%", tablet: "100%" },
                      flexDirection: "column",
                      display: "flex",
                    }}
                  >
                    <SessionMarket
                      setIObtes={(val) => {
                        setIObtes((IObets) =>
                          IObets?.filter(
                            (v) =>
                              v?.bet_id !== val?.betId &&
                              val?.match_id === v?.match_id
                          )
                        );
                      }}
                      title={"Session Market"}
                      setLiveData={setLiveData}
                      liveOnly={false}
                      hideTotalBet={false}
                      stopAllHide={false}
                      setData={setData}
                      sessionData={arrayObject?.sort(customSort)}
                      hideResult={false}
                      setLocalState={setLocalState}
                      setCurrentMatch={setCurrentMatch}
                      currentMatch={currentMatch}
                      setLocalSessionExpertOdds={setLocalSessionExpertOdds}
                    />
                  </Box>
                </Box>
              )}

              {data?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "1px",
                    rowGap: "5px",
                    height: "524px",
                    overflow: "scroll",
                    marginTop: "1.25vw",
                  }}
                >
                  {data?.map((v) => {
                    return (
                      <RunsBox
                        currentOdds={
                          currentOdds?.bet_id === v?.id ? currentOdds : null
                        }
                        key={v?.id}
                        item={v}
                        setData={setData}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: { laptop: "50%", mobile: "100%", tablet: "100%" },
                flexDirection: "column",
                display: "flex",
                paddingLeft: "5px",
              }}
            >
              {currentMatch?.apiMatchActive && (
                <MatchOdds
                  socket={socket}
                  matchOdds={
                    currentMatch?.bettings?.length > 0
                      ? currentMatch?.bettings?.filter(
                          (v) => v?.sessionBet === false
                        )[0]
                      : null
                  }
                  showHeader={true}
                  currentMatch={currentMatch}
                  setCurrentMatch={setCurrentMatch}
                  matchOddsLive={matchOddsLive}
                />
              )}
              {currentMatch?.apiBookMakerActive && (
                <BookMarketer
                  socket={socket}
                  setCurrentMatch={setCurrentMatch}
                  matchOdds={
                    currentMatch?.bettings?.length > 0
                      ? [...currentMatch?.bettings].filter(
                          (v) => v?.sessionBet === false
                        )[0]
                      : null
                  }
                  currentMatch={currentMatch}
                  liveData={bookmakerLivedata}
                />
              )}

              {currentMatch?.id && <AllBets allBetRates={IObets} />}
            </Box>
          </>
        )}
      </Box>
    </Background>
  );
};

export default memo(MatchScreen);
