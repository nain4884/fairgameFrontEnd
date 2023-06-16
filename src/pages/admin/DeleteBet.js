import React from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import "../../components/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react";
import { DeleteIcon } from "../../admin/assets";
import { Background, DailogModal } from "../../components/index";
import { useLocation } from "react-router-dom";
import FullAllBets from "../../components/FullAllBets";
import AddNotificationModal from "../../components/AddNotificationModal";
import { setDailogData } from "../../store/dailogModal";
import Odds from "./matches/Odds";
import SessionMarket from "./matches/SessionMarket";
import BookMarketer from "./matches/BookMaketer";
import { useEffect } from "react";
import { setRole } from "../../newStore";
import { setSelectedMatch } from "../../newStore/reducers/matchDetails";
import { SocketContext } from "../../context/socketContext";

let matchOddsCount = 0;
let sessionOffline = [];
const DeleteBet = ({ }) => {

  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { socket, socketMicro } = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();
  const matchId = location?.state?.matchId;
  const { axios } = setRole();

  const [IOSinglebets, setSingleIObtes] = useState([]);
  const [marketId, setMarketId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { selectedMatch } = useSelector((state) => state?.matchDetails);
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [matchDetail, setMatchDetail] = useState();
  const [sessionLock, setSessionLock] = useState(false)
  const [isHandled, setIsHandled] = useState(false);
  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newMessage", (value) => {
        console.log(value);
      });

      socket.onevent = async (packet) => {
        // console.log(`Received event: ${packet.data[0]}`, packet.data[1]);

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

        // manual bookmaker
        if (packet.data[0] === "teamA_rate_user") {
          const value = packet.data[1];
          // console.log("value :", value);
          // console.log("manualBookmakerData :", manualBookmakerData);
          // alert(value?.betId);
          // alert(JSON.stringify(value.betId));
          try {
            setManualBookmakerData((currentMatches) => {
              if (currentMatches[0]?.id != value.betId) {
                return currentMatches;
              }
              // Find the index of the match that you want to update
              // const index = currentMatches.findIndex(match => match.id === value?.betId);
              // alert(index)
              // if (index === -1) {
              //   // Match not found, return the current state
              //   return currentMatches;
              // }

              // Update the match object at the specified index
              const updatedMatch = {
                ...currentMatches[0],
                teamA_Back: value?.teamA_Back, // Update the teamA_Back value
                teamA_lay: value?.teamA_lay, // Update the teamA_lay value
                teamA_suspend:
                  value?.teamA_suspend == false ? null : "suspended", // Update the teamA_susp
                teamA_Ball: null,
                teamB_Ball: null,
                teamC_Ball: null,
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });

            console.log("manualBookmakerData 222:", manualBookmakerData);
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "teamB_rate_user") {
          const value = packet.data[1];
          try {
            setManualBookmakerData((currentMatches) => {
              if (currentMatches[0]?.id != value.betId) {
                return currentMatches;
              }

              // Update the match object at the specified index
              const updatedMatch = {
                ...currentMatches[0],
                teamB_Back: value?.teamB_Back, // Update the teamA_Back value
                teamB_lay: value?.teamB_lay, // Update the teamA_lay value
                teamB_suspend:
                  value?.teamB_suspend == false ? null : "suspended", // Update the teamA_susp
                teamA_Ball: null,
                teamB_Ball: null,
                teamC_Ball: null,
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "teamC_rate_user") {
          const value = packet.data[1];
          try {
            setManualBookmakerData((currentMatches) => {
              if (currentMatches[0]?.id != value.betId) {
                return currentMatches;
              }

              // Update the match object at the specified index
              const updatedMatch = {
                ...currentMatches[0],
                teamC_Back: value?.teamC_Back, // Update the teamA_Back value
                teamC_lay: value?.teamC_lay, // Update the teamA_lay value
                teamC_suspend:
                  value?.teamC_suspend == false ? null : "suspended", // Update the teamA_susp
                teamA_Ball: null,
                teamB_Ball: null,
                teamC_Ball: null,
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "updateRate_user") {
          const value = packet.data[1];
          try {
            setManualBookmakerData((currentMatches) => {
              if (currentMatches[0]?.id != value.betId) {
                return currentMatches;
              }
              const updatedMatch = {
                ...currentMatches[0],
                teamA_Back: value?.teamA_Back,
                teamA_lay: "",
                teamB_Back: value?.teamB_Back,
                teamB_lay: "",
                teamC_Back: value?.teamC_Back,
                teamC_lay: "",
                // teamA_suspend: "live",
                teamA_suspend:
                  null, // Update the teamA_susp
                teamB_suspend:
                  null, // Update the teamA_susp
                teamC_suspend:
                  null, // Update the teamA_susp
                // teamB_suspend: "live",
                // teamC_suspend: "live",
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "teamA_suspend_user") {
          const value = packet.data[1];
          if (value.teamA_suspend == "Ball Started") {
            try {
              setManualBookmakerData((currentMatches) => {
                // alert(JSON.stringify(currentMatches))
                if (currentMatches[0]?.id != value.betId) {
                  return currentMatches;
                }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamA_suspend: "suspended",
                  teamA_Ball: "ball",
                  teamB_Ball: "ball",
                  teamC_Ball: "ball",
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              setManualBookmakerData((currentMatches) => {
                // alert(JSON.stringify(currentMatches[0]));
                if (currentMatches[0]?.id != value.betId) {
                  return currentMatches;
                }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamA_suspend: "suspended",
                  teamA_Ball: null,
                  teamB_Ball: null,
                  teamC_Ball: null,
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }
        if (packet.data[0] === "teamB_suspend_user") {
          const value = packet.data[1];
          if (value.teamB_suspend == "Ball Started") {
            try {
              setManualBookmakerData((currentMatches) => {
                if (currentMatches[0]?.id != value.betId) {
                  return currentMatches;
                }

                const updatedMatch = {
                  ...currentMatches[0],
                  teamB_suspend: "suspended",
                  teamA_Ball: "ball",
                  teamB_Ball: "ball",
                  teamC_Ball: "ball",
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              setManualBookmakerData((currentMatches) => {
                if (currentMatches[0]?.id != value.betId) {
                  return currentMatches;
                }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamB_suspend: "suspended",
                  teamA_Ball: null,
                  teamB_Ball: null,
                  teamC_Ball: null,
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }
        if (packet.data[0] === "teamC_suspend_user") {
          const value = packet.data[1];
          if (value.teamC_suspend == "Ball Started") {
            try {
              setManualBookmakerData((currentMatches) => {
                if (currentMatches[0]?.id != value.betId) {
                  return currentMatches;
                }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamC_suspend: "suspended",
                  teamA_Ball: "ball",
                  teamB_Ball: "ball",
                  teamC_Ball: "ball",
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              setManualBookmakerData((currentMatches) => {
                if (currentMatches[0]?.id != value.betId) {
                  return currentMatches;
                }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamC_suspend: "suspended",
                  teamA_Ball: null,
                  teamB_Ball: null,
                  teamC_Ball: null,
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }

        if (packet.data[0] === "updateSessionRate_user") {
          const value = packet.data[1];
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id !== value?.match_id) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }
              // Update the bettings array in the current match object
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting.id === value.betId) {
                  return {
                    ...betting,
                    ...value,
                  };
                } else if (
                  betting?.id === value?.betId &&
                  value.sessionBet === false
                ) {
                  return {
                    ...betting,
                    ...value,
                  };
                }
                return betting;
              });
              var newUpdatedValue = updatedBettings;
              const bettingsIds = updatedBettings?.map(
                (betting) => betting?.id
              );
              if (!bettingsIds?.includes(value.betId)) {
                newUpdatedValue = [...newUpdatedValue, value];
              }

              // Return the updated current match object
              return {
                ...currentMatch,
                bettings: newUpdatedValue,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "newBetAdded") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id !== value?.match_id) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }

              // Update the bettings array in the current match object
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting.id === value.id && value.sessionBet) {
                  // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                  return {
                    ...betting,
                    ...value,
                  };
                } else if (
                  betting?.id === value?.id &&
                  value.sessionBet === false
                ) {
                  return {
                    ...betting,
                    ...value,
                  };
                }
                return betting;
              });
              var newUpdatedValue = updatedBettings;
              const bettingsIds = updatedBettings?.map(
                (betting) => betting?.id
              );

              if (!bettingsIds?.includes(value.id)) {
                // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

                newUpdatedValue = [...newUpdatedValue, value];
              } else {
                if (
                  sessionOffline.includes(value.id) &&
                  value.betStatus === 1
                ) {
                  const newres = sessionOffline.filter((id) => id !== value.id);
                  sessionOffline = newres;
                }
                if (value?.betStatus === 0) {
                  sessionOffline.push(value.id);
                }
                // newUpdatedValue = newUpdatedValue?.filter(
                //   (v) => v?.id !== value?.id && v?.betStatus === 1
                // );
              }

              // Return the updated current match object
              return {
                ...currentMatch,
                bettings: newUpdatedValue,
              };
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
              return {
                ...prev,
                matchOddRateLive: value?.matchOddLive,
              };
            }
            return prev;
          });
        }
        // if (packet.data[0] === "userBalanceUpdate") {
        //   const data = packet.data[1];
        //   const user = {
        //     ...currentUser,
        //     current_balance: data?.currentBalacne,
        //   };
        //   dispatch(setCurrentUser(user));

        //   //currentBalacne
        // }
        if (packet.data[0] === "bookMakerRateLive") {
          // Bookmaker Market live and stop disable condition
          const value = packet.data[1];
          setCurrentMatch((prev) => {
            if (prev?.id === value?.matchId) {
              return {
                ...prev,
                bookMakerRateLive: value?.bookMakerLive,
              };
            }
            return prev;
          });

          // if (value?.matchId === currentMatch?.id) {
          //   setCurrentMatch((prev) => ({
          //     ...prev,
          //     bookMakerRateLive: value?.bookMakerLive,
          //   }));
          // }
        }

        if (packet.data[0] === "session_bet") {
          const data = packet.data[1];
          try {
            // setSessionExposure(data?.sessionExposure);
            setCurrentMatch((currentMatch) => {
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting?.id === data?.betPlaceData?.bet_id) {
                  // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                  let profitLoss = data?.profitLoss;
                  return {
                    ...betting,
                    profitLoss: profitLoss,
                  };
                }
                return betting;
              });
              // Return the updated current match object
              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }

          setSingleIObtes((prev) => {
            const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
            return [{...data.betPlaceData, deleted_reason: data?.betPlaceData?.deleted_reason || null,}, ...updatedPrev];
          });
          // setCurrentMatch({
          //   ...currentMatch,
          //   matchSessionData: updatedBettings1
          // });
          setSessionBets((prev) => {
            const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
            return [{...data.betPlaceData, deleted_reason: data?.betPlaceData?.deleted_reason || null,}, ...updatedPrev];
          });
        }

        if (packet.data[0] === "match_bet") {
          const data = packet.data[1];
          if (!isHandled) {
            setIsHandled(true);
            try {
              if (data) {
                // const user = {
                //   ...currentUser,
                //   current_balance: data.newBalance,
                //   exposure: data.exposure,
                // };
                // const manualBookmaker = {
                //   matchId: data?.betPlaceData?.match_id,
                //   teamA: data.teamA_rate,
                //   teamB: data.teamB_rate,
                // };
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
                  amount:
                    data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                };
                // if (data?.betPlaceData?.match_id === id) {
                setSingleIObtes((prev) => [body, ...prev]);
                // }

                // dispatch(setCurrentUser(user));
                // dispatch(setManualBookMarkerRates(manualBookmaker));
                setCurrentMatch((prev) => {
                  if (prev?.id === data?.betPlaceData?.match_id) {
                    return {
                      ...prev,
                      teamA_rate: data?.teamA_rate,
                      teamB_rate: data?.teamB_rate,
                      teamC_rate: data?.teamC_rate,
                    };
                  }
                  return prev;
                });
              }
            } catch (e) {
              console.log("error", e?.message);
            } finally {
              setIsHandled(false);
            }
          }
        }
      };
    }
  }, [socket]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on("connect", () => {
          socketMicro.emit("init", { id: marketId });
          // activateLiveMatchMarket();
          setSessionLock(false)
        });
        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here

          setMacthOddsLive([]);
          setBookmakerLive([]);
          setSessionLock(true)
          console.log("WebSocket connection failed:", event);
        });

        socketMicro.emit("init", { id: marketId });
        // activateLiveMatchMarket();
        // socketMicro.on("bookMakerRateLive", (e) => {
        //   console.log("BookMaker", e);
        // });

        socketMicro.on("reconnect", () => {
          socketMicro.emit("init", { id: marketId });
          // activateLiveMatchMarket();
          setSessionLock(false)
        });

        socketMicro.on(`session${marketId}`, (val) => {
          // console.log("currentMatchProfit 33:", val);

          if (val !== null && matchId === checkMctchId) {
            // console.warn("updatedBettings1 ", updatedBettings1);
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
                const data = currentMatch?.bettings?.map((betting) => {
                  var selectedData = newVal?.find(
                    (data) => data?.selectionId === betting?.selectionId
                  );
                  if (selectedData !== undefined) {
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
        });
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
                // socketMicro.disconnect();
              }
            } else {
              // dispatch(setMatchOddsLive(val[0]));
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
            // console.log("val 222:", val);
            if (val.length > 0) {
              // dispatch(setBookMakerLive(val[0]));
              // alert(JSON.stringify(val[0].runners))
              setBookmakerLive(val[0]);
            } else {
              setBookmakerLive([]);
            }

          }
        });
      } else {
        setMacthOddsLive([]);
        setBookmakerLive([]);
        setSessionLock(false)
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
      setSessionLock(false)
    };
  }, [socketMicro, marketId]);

  async function getThisMatch(id) {
    try {
      const response = await axios.get(`/game-match/matchDetail/${id}`);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );

      setManualBookmakerData(matchOddsDataTemp);
      // alert(response?.data?.status)
      //   setSessionExposure(response?.data?.sessionExposure);
      setCurrentMatch({
        ...response.data,
      });

      dispatch(
        setSelectedMatch({
          ...response.data,
        })
      );
      //TODO
      //   dispatch(
      //     setManualBookMarkerRates({
      //       matchId: response.data.id,
      //       teamA: response.data.teamA_rate ? response.data.teamA_rate : 0,
      //       teamB: response.data.teamB_rate ? response.data.teamB_rate : 0,
      //     })
      //   );

      setMarketId(response.data.marketId);
      setMatchDetail(response.data);

      //TODO
      //   dispatch(
      //     setAllSessionBets(
      //       response?.data?.betting?.filter((v) => v?.sessionBet === true) || []
      //     )
      //   );
    } catch (e) {
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

      // setSingleIObtes(
      //   data?.data?.data?.filter((b) =>
      //     ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
      //       b?.marketType
      //     )
      //   )
      // );
      setSingleIObtes(data?.data?.data);
      const bets = data?.data?.data?.filter(
        (b) =>
          !["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
      );

      // console.log("bets", bets, data?.data?.data);
      setSessionBets(bets || []);
    } catch (e) {
      console.log(e);
    }
  }

  // console.log("currentMatch", IOSinglebets);
  useEffect(() => {
    if (matchId !== undefined) {
      getThisMatch(matchId);
      getAllBetsData(matchId)
    }
  }, [matchId]);



  //TODO
  // const PlaceBetComponent = () => {
  //     const [anchorEl, setAnchorEl] = useState(null);
  //     const handleClick = (event) => {
  //         setAnchorEl(event.currentTarget);
  //     };
  //     const handleClose = () => {
  //         setAnchorEl(0);
  //     };
  //     return (
  //         <>
  //             <Box onClick={e => handleClick(e)} sx={{ background: "#0B4F26", flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { laptop: "90px", mobile: '80px' }, borderRadius: '5px', height: '35px', left: '35px', position: 'absolute' }} >
  //                 <Box sx={{ background: "#FDF21A", borderRadius: '3px', width: "90%", height: '45%', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
  //                     <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: 'bold', color: "#FF4D4D" }}>Total Bet : <span style={{ color: "#0B4F26" }} >250</span></Typography>
  //                 </Box>
  //                 <Box >
  //                     <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: '500', color: "white" }}>Profit/Loss</Typography>

  //                 </Box>
  //             </Box >
  //             <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />

  //         </>
  //     )
  // }

  // const menutItems = [{ title: "Account Statement" }, { title: "Profile Loss Report" }, { title: "Bet History" }, { title: "Unsetteled Bet" }, { title: "Casino Report History" }, { title: "Set Button Values" }, { title: "Security Auth Verfication" }, { title: "Change Password" }]

  const [mode, setMode] = useState(false);
  const CustomButton = () => {
    return (
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
        <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
      </Box>
    );
  };
  const CancelButton = () => {
    return (
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
    );
  };
  const dispatch = useDispatch();
  return (
    <Background>
      <AddNotificationModal
        value={value}
        title={"Add Remark"}
        visible={visible}
        onDone={() => {
          dispatch(
            setDailogData({
              isModalOpen: true,
              showRight: true,
              bodyText: "Deleted Sucessfully",
            })
          );
        }}
        setVisible={() => {
          setVisible(false);
          setMode(!mode);
        }}
      />
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
              paddingTop: "2%",
              alignSelf: "start",
            }}
          >
            {currentMatch?.teamA} V/S {currentMatch?.teamB}
          </Typography>
          {currentMatch?.apiMatchActive && <Odds
            currentMatch={currentMatch}
            matchOddsLive={matchOddsLive}
            data={
              matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
            }
            typeOfBet={"Match Odds"}
          // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
          />
          }
          {currentMatch?.apiBookMakerActive && <BookMarketer
            currentMatch={currentMatch}
            data={
              bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
            }
          />}
          {currentMatch?.manualBookMakerActive && <Odds
            currentMatch={currentMatch}
            // matchOddsLive={matchOddsLive}
            // data={
            //   matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
            // }
            data={currentMatch}
            manualBookmakerData={manualBookmakerData}
            typeOfBet={"MANUAL BOOKMAKER"}
          // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
          />
          }
          {(currentMatch?.apiSessionActive ||
            currentMatch?.manualSessionActive) && matchesMobile && <SessionMarket
              currentMatch={currentMatch}
              sessionBets={sessionBets}
              data={[]}
              sessionOffline={sessionOffline}
            />}
          {IOSinglebets.length > 0 && <FullAllBets IObets={IOSinglebets} mode={mode} tag={false} />}
        </Box>
        {!matchesMobile && <Box sx={{ width: "20px" }} />}
        {!matchesMobile && <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            {mode && <CancelButton />}
            <Box sx={{ width: "2%" }}></Box>
            <Box sx={{ width: "150px", marginY: ".75%", height: "35px", }} ></Box>
          </Box>
          {(currentMatch?.apiSessionActive ||
            currentMatch?.manualSessionActive) && <SessionMarket
              currentMatch={currentMatch}
              sessionBets={sessionBets}
              data={[]}
              sessionOffline={sessionOffline}
            />}
        </Box>}
      </Box>
      <DailogModal />
    </Background >
  );
};

export default DeleteBet;
