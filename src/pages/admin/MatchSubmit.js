import { useEffect, useState, useContext } from "react";
import { Typography, Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import "../../components/index.css";
import { Background } from "../../components/index";
import AllBets from "../../components/AllBets";
import FullAllBets from "../../components/FullAllBets";
import { useLocation } from "react-router-dom";
import Odds from "./matches/Odds";
import BookMarketer from "./matches/BookMaketer";
import SessionMarket from "./matches/SessionMarket";
import { setRole } from "../../newStore";
import { SocketContext } from "../../context/socketContext";
import { useDispatch, useSelector } from "react-redux";

let matchOddsCount = 0;
const MatchSubmit = ({}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { socket, socketMicro } = useContext(SocketContext);
  const { axios } = setRole();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state?.currentUser);
  const matchIds = location?.state?.matchIds;
  const marketIds = location?.state?.marketIds;
  // const [marketIds, setMarketIds] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [IObets, setIObtes] = useState([]);
  const [mode, setMode] = useState(false);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [isHandled, setIsHandled] = useState(false);
  // matchIds
  useEffect(() => {
    // alert(matchIds)
    if (matchIds !== undefined) {
      getAllBetsData();
      getThisMatch();
    }
  }, [matchIds]);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newMessage", (value) => {
        console.log(value);
      });

      socket.onevent = async (packet) => {
        // console.log(`Received event: ${packet.data[0]}`, packet.data[1]);
        for (var i = 0; i < matchIds.length; i++) {
          (function (i) {
            if (packet.data[0] === "updateMatchActiveStatus") {
              const value = packet.data[1];
              setMatchData((prevMatchData) => {
                return prevMatchData.map((item) => {
                  if (item?.id === matchIds[i]) {
                    return {
                      ...item,
                      apiBookMakerActive: value?.apiBookMakerActive,
                      apiMatchActive: value?.apiMatchActive,
                      apiSessionActive: value?.apiSessionActive,
                      manualBookMakerActive: value?.manualBookMakerActive,
                      manualSessionActive: value?.manualSessionActive,
                    };
                  }
                  return item;
                });
              });
            }

            // manual bookmaker
            if (packet.data[0] === "teamA_rate_user") {
              const value = packet.data[1];
              try {
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    const updatedBettings = item.bettings.map((betting) => {
                      // Check if the betting object has the specified ID
                      if (betting.id === value.betId) {
                        // Update the bet_condition value
                        return {
                          ...betting,
                          teamA_Back: value?.teamA_Back,
                          teamA_lay: value?.teamA_lay,
                          teamA_suspend:
                            value?.teamA_suspend === false ? null : "suspended",
                          teamA_Ball: null,
                          teamB_Ball: null,
                          teamC_Ball: null,
                        };
                      }
                      return betting;
                    });

                    return {
                      ...item,
                      bettings: updatedBettings,
                    };
                  });
                });

                // console.log("manualBookmakerData 222:", manualBookmakerData);
              } catch (err) {
                console.log(err?.message);
              }
            }

            if (packet.data[0] === "teamB_rate_user") {
              const value = packet.data[1];
              try {
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    const updatedBettings = item.bettings.map((betting) => {
                      // Check if the betting object has the specified ID
                      if (betting.id === value.betId) {
                        // Update the bet_condition value
                        return {
                          ...betting,
                          teamB_Back: value?.teamB_Back, // Update the teamA_Back value
                          teamB_lay: value?.teamB_lay, // Update the teamA_lay value
                          teamB_suspend:
                            value?.teamB_suspend == false ? null : "suspended",
                          teamA_Ball: null,
                          teamB_Ball: null,
                          teamC_Ball: null,
                        };
                      }
                      return betting;
                    });

                    return {
                      ...item,
                      bettings: updatedBettings,
                    };
                  });
                });
              } catch (err) {
                console.log(err?.message);
              }
            }

            if (packet.data[0] === "teamC_rate_user") {
              const value = packet.data[1];
              try {
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    const updatedBettings = item.bettings.map((betting) => {
                      // Check if the betting object has the specified ID
                      if (betting.id === value.betId) {
                        // Update the bet_condition value
                        return {
                          ...betting,
                          teamC_Back: value?.teamC_Back, // Update the teamA_Back value
                          teamC_lay: value?.teamC_lay, // Update the teamA_lay value
                          teamC_suspend:
                            value?.teamC_suspend == false ? null : "suspended", // Update the teamA_susp
                          teamA_Ball: null,
                          teamB_Ball: null,
                          teamC_Ball: null,
                        };
                      }
                      return betting;
                    });

                    return {
                      ...item,
                      bettings: updatedBettings,
                    };
                  });
                });
              } catch (err) {
                console.log(err?.message);
              }
            }

            if (packet.data[0] === "updateRate_user") {
              const value = packet.data[1];
              try {
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    const updatedBettings = item.bettings.map((betting) => {
                      // Check if the betting object has the specified ID
                      if (betting.id === value.betId) {
                        // Update the bet_condition value
                        return {
                          ...betting,
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
                      return betting;
                    });

                    return {
                      ...item,
                      bettings: updatedBettings,
                    };
                  });
                });
              } catch (err) {
                console.log(err?.message);
              }
            }

            if (packet.data[0] === "teamA_suspend_user") {
              const value = packet.data[1];
              if (value.teamA_suspend == "Ball Started") {
                try {
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      const updatedBettings = item.bettings.map((betting) => {
                        // Check if the betting object has the specified ID
                        if (betting.id === value.betId) {
                          // Update the bet_condition value
                          return {
                            ...betting,
                            teamA_suspend: "suspended",
                            teamA_Ball: "ball",
                            teamB_Ball: "ball",
                            teamC_Ball: "ball",
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: updatedBettings,
                      };
                    });
                  });
                } catch (err) {
                  console.log(err?.message);
                }
              } else {
                try {
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      const updatedBettings = item.bettings.map((betting) => {
                        // Check if the betting object has the specified ID
                        if (betting.id === value.betId) {
                          // Update the bet_condition value
                          return {
                            ...betting,
                            teamA_suspend: "suspended",
                            teamA_Ball: null,
                            teamB_Ball: null,
                            teamC_Ball: null,
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: updatedBettings,
                      };
                    });
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
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      const updatedBettings = item.bettings.map((betting) => {
                        // Check if the betting object has the specified ID
                        if (betting.id === value.betId) {
                          // Update the bet_condition value
                          return {
                            ...betting,
                            teamB_suspend: "suspended",
                            teamA_Ball: "ball",
                            teamB_Ball: "ball",
                            teamC_Ball: "ball",
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: updatedBettings,
                      };
                    });
                  });
                } catch (err) {
                  console.log(err?.message);
                }
              } else {
                try {
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      const updatedBettings = item.bettings.map((betting) => {
                        // Check if the betting object has the specified ID
                        if (betting.id === value.betId) {
                          // Update the bet_condition value
                          return {
                            ...betting,
                            teamB_suspend: "suspended",
                            teamA_Ball: null,
                            teamB_Ball: null,
                            teamC_Ball: null,
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: updatedBettings,
                      };
                    });
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
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      const updatedBettings = item.bettings.map((betting) => {
                        // Check if the betting object has the specified ID
                        if (betting.id === value.betId) {
                          // Update the bet_condition value
                          return {
                            ...betting,
                            teamC_suspend: "suspended",
                            teamA_Ball: "ball",
                            teamB_Ball: "ball",
                            teamC_Ball: "ball",
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: updatedBettings,
                      };
                    });
                  });
                } catch (err) {
                  console.log(err?.message);
                }
              } else {
                try {
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      const updatedBettings = item.bettings.map((betting) => {
                        // Check if the betting object has the specified ID
                        if (betting.id === value.betId) {
                          // Update the bet_condition value
                          return {
                            ...betting,
                            teamC_suspend: "suspended",
                            teamA_Ball: null,
                            teamB_Ball: null,
                            teamC_Ball: null,
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: updatedBettings,
                      };
                    });
                  });
                } catch (err) {
                  console.log(err?.message);
                }
              }
            }

            if (packet.data[0] === "updateSessionRate_user") {
              const value = packet.data[1];
              try {
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((currentMatch) => {
                    if (currentMatch?.id !== value?.match_id) {
                      // If the new bet doesn't belong to the current match, return the current state
                      return currentMatch;
                    }
                    // Update the bettings array in the current match object
                    const updatedBettings = currentMatch?.bettings?.map(
                      (betting) => {
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
                      }
                    );
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
                });
              } catch (err) {
                console.log(err?.message);
              }
            }

            if (packet.data[0] === "newBetAdded") {
              const value = packet.data[1];
              // matchId = value?.match_id;
              try {
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    if (item?.id === value?.match_id) {
                      // Update the bettings array in the current match object
                      const updatedBettings = item?.bettings?.map((betting) => {
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
                        if (!item.sessionOffline) {
                          item.sessionOffline = [];
                        }
                        if (
                          item?.sessionOffline &&
                          item?.sessionOffline.includes(value.id) &&
                          value.betStatus === 1
                        ) {
                          const newres = item?.sessionOffline.filter(
                            (id) => id !== value.id
                          );
                          item.sessionOffline = newres;
                        }
                        if (value?.betStatus === 0) {
                          item.sessionOffline.push(value.id);
                        }

                        // newUpdatedValue = newUpdatedValue?.filter(v => v?.id !== value?.id && v?.betStatus === 1);
                      }

                      // Return the updated current match object
                      return {
                        ...item,
                        bettings: newUpdatedValue,
                        sessionOffline: item.sessionOffline,
                      };
                    }
                    return item;
                  });
                });
              } catch (err) {
                console.log(err?.message);
              }
            }
            if (packet.data[0] === "session_bet") {
              const data = packet.data[1];

              try {
                setCurrentOdds({
                  bet_id: data?.betPlaceData?.bet_id,
                  odds: data?.betPlaceData?.odds,
                  match_id: data?.betPlaceData?.match_id,
                });
                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
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
                    };
                  });
                });
              } catch (err) {
                console.log(err?.message);
              }
              // setCurrentMatch({
              //   ...currentMatch,
              //   matchSessionData: updatedBettings1
              // });
              if (data?.betPlaceData?.match_id === matchIds[i]) {
                setSessionBets((prev) => {
                  const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
                  return [
                    {
                      ...data.betPlaceData,
                      deleted_reason:
                        data?.betPlaceData?.deleted_reason || null,
                    },
                    ...updatedPrev,
                  ];
                });
              }
            }
            if (packet.data[0] === "match_bet") {
              const data = packet.data[1];
              if (!isHandled) {
                setIsHandled(true);
                try {
                  if (data) {
                    // alert(1111)
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
                      myStack: data?.betPlaceData?.myStack,
                      userName: data?.betPlaceData?.userName,
                      win_amount: null,
                      loss_amount: null,
                      bet_type: data?.betPlaceData?.bet_type,
                      country: null,
                      ip_address: null,
                      rate: null,
                      marketType: data?.betPlaceData?.marketType,
                      amount:
                        data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                    };
                    if (data?.betPlaceData?.match_id === matchIds[i]) {
                      setIObtes((prev) => [body, ...prev]);
                      setMatchData((prevMatchData) => {
                        return prevMatchData.map((item) => {
                          if (item?.id === matchIds[i]) {
                            return {
                              ...item,
                              teamA_rate: data?.teamA_rate,
                              teamB_rate: data?.teamB_rate,
                              teamC_rate: data?.teamC_rate,
                            };
                          }
                          return item;
                        });
                      });
                    }

                    // dispatch(setCurrentUser(user));
                    // dispatch(setManualBookMarkerRates(manualBookmaker));
                  }
                } catch (e) {
                  console.log("error", e?.message);
                } finally {
                  setIsHandled(false);
                }
              }
            }
          })(i);
        }

        // if (packet.data[0] === "match_bet") {
        //   const data = packet.data[1];
        //   if (!isHandled) {
        //     setIsHandled(true);
        //     try {
        //       if (data) {
        //         // alert(1111)
        //         const body = {
        //           id: data?.betPlaceData?.id,
        //           isActive: true,
        //           createAt: data?.betPlaceData?.createAt,
        //           updateAt: data?.betPlaceData?.createAt,
        //           createdBy: null,
        //           deletedAt: null,
        //           user_id: null,
        //           match_id: data?.betPlaceData?.match_id,
        //           bet_id: data?.betPlaceData?.bet_id,
        //           result: "pending",
        //           team_bet: data?.betPlaceData?.team_bet,
        //           odds: data?.betPlaceData?.odds,
        //           myStack: data?.betPlaceData?.myStack,
        //           userName: data?.betPlaceData?.userName,
        //           win_amount: null,
        //           loss_amount: null,
        //           bet_type: data?.betPlaceData?.bet_type,
        //           country: null,
        //           ip_address: null,
        //           rate: null,
        //           marketType: data?.betPlaceData?.marketType,
        //           amount:
        //             data?.betPlaceData?.stack || data?.betPlaceData?.stake,
        //         };
        //         // if (data?.betPlaceData?.match_id === id) {
        //         setIObtes((prev) => [body, ...prev]);
        //         // }

        //         // dispatch(setCurrentUser(user));
        //         // dispatch(setManualBookMarkerRates(manualBookmaker));
        //       }
        //     } catch (e) {
        //       console.log("error", e?.message);
        //     } finally {
        //       setIsHandled(false);
        //     }
        //   }
        // }
        // manual bookmaker end
      };
    }
  }, [socket]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketIds) {
        socketMicro.on("connect", () => {
          for (var index = 0; index < marketIds.length; index++) {
            socketMicro.emit("init", { id: marketIds[index] });
          }
          // socketMicro.emit("init", { id: marketId });
          // activateLiveMatchMarket();
          // setSessionLock(false)
        });

        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here
          // setMacthOddsLive([]);
          // setBookmakerLive([]);
          // setSessionLock(true)
          // console.log("WebSocket connection failed:", event);
        });
        // for (var j = 0; j < matchIds.length; j++) {
        //   socketMicro.emit("init", { id: matchIds[j] });
        //   // activateLiveMatchMarket();
        //   // socketMicro.on("bookMakerRateLive", (e) => {
        //   //   console.log("BookMaker", e);
        //   // });

        //   socketMicro.on("reconnect", () => {
        //     socketMicro.emit("init", { id: matchIds[j] });
        //     // activateLiveMatchMarket();
        //     // setSessionLock(false)
        //   });
        // }

        for (var i = 0; i < marketIds?.length; i++) {
          (function (i) {
            socketMicro.emit("init", { id: marketIds[i] });

            socketMicro.on("reconnect", () => {
              socketMicro.emit("init", { id: marketIds[i] });
              // activateLiveMatchMarket();
              // setSessionLock(false)
            });
            socketMicro.on(`session${marketIds[i]}`, (val) => {
              // console.log("currentMatchProfit 33:", val);

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
                    if (item.marketId === marketIds[i]) {
                      // Merge the filteredNewVal with the currentMatch bettings array
                      const data = item.bettings?.map((betting) => {
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
                  // matchOddsCount += 1;
                  // if (matchOddsCount >= 3) {
                  socketMicro.emit("disconnect_market", {
                    id: marketIds[i],
                  });
                  // setMacthOddsLive([]);
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item.marketId === marketIds[i]) {
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
                      if (item.marketId === marketIds[i]) {
                        return {
                          ...item,
                          matchOddsLive: val[0], // Add the new array property with array
                        };
                      }
                      return item;
                    });
                  });
                  // console.log(updatedData);
                  // setMacthOddsLive(val[0]);// add
                  if (val[0]?.status === "CLOSED") {
                    socketMicro.emit("disconnect_market", {
                      id: marketIds[i],
                    });
                    // const updatedData = matchData.map(item => {
                    //   if (item.marketId === matchIds[i]) {
                    //     return {
                    //       ...item,
                    //       matchOddsLive: []  // Add the new array property with an empty array
                    //     };
                    //   }
                    //   return item;
                    // });
                    // setMatchData(updatedData)
                    // setMacthOddsLive([]);
                    setMatchData((prevMatchData) => {
                      return prevMatchData.map((item) => {
                        if (item.marketId === marketIds[i]) {
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
                // console.log("val 222:", val);
                if (val.length > 0) {
                  // dispatch(setBookMakerLive(val[0]));
                  // setBookmakerLive(val[0]);
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item.marketId === marketIds[i]) {
                        return {
                          ...item,
                          bookmakerLive: val[0], // Add the new array property with an empty array
                        };
                      }
                      return item;
                    });
                  });
                }
                // setBookmakerLive([]);
              }
            });
          })(i);
        }
        // for (var i = 0; i < matchIds.length; i++) {

        //   socketMicro.on(`session${matchIds[i]}`, (val) => {
        //     // console.log("currentMatchProfit 33:", val);

        //     if (val !== null) {
        //       var newVal = val?.map((v) => ({
        //         bet_condition: v?.RunnerName,
        //         betStatus: 0,
        //         sessionBet: true,
        //         no_rate: v?.LayPrice1,
        //         yes_rate: v?.BackPrice1,
        //         rate_percent: `${v?.LaySize1}-${v?.BackSize1}`,
        //         suspended: v?.GameStatus,
        //         selectionId: v?.SelectionId,
        //       }));

        //       setMatchData(prevMatchData => {
        //         return prevMatchData.map(item => {
        //           if (item.marketId === matchIds[i]) {
        //             // Merge the filteredNewVal with the currentMatch bettings array
        //             const data = item.bettings?.map((betting) => {
        //               var selectedData = newVal?.find(
        //                 (data) => data?.selectionId === betting?.selectionId
        //               );
        //               if (selectedData !== undefined) {
        //                 return {
        //                   ...betting,
        //                   bet_condition: selectedData?.bet_condition,
        //                   no_rate: selectedData?.no_rate,
        //                   yes_rate: selectedData?.yes_rate,
        //                   rate_percent: selectedData?.rate_percent,
        //                   suspended: selectedData?.suspended,
        //                   selectionId: selectedData?.selectionId,
        //                 };
        //               }
        //               return betting;
        //             });

        //             return {
        //               ...item,
        //               bettings: data,
        //             };
        //           }
        //           return item;
        //         });
        //       });
        //     }

        //     // dispatch(setSessionOddsLive(body));
        //   });

        //   socketMicro.on(`matchOdds${matchIds[i]}`, (val) => {

        //     // matchodds Market live and stop disable condition
        //     if (val !== null) {
        //       if (val.length === 0) {
        //         matchOddsCount += 1;
        //         if (matchOddsCount >= 3) {
        //           socketMicro.emit("disconnect_market", {
        //             id: matchIds[i],
        //           });
        //           // setMacthOddsLive([]);
        //           setMatchData(prevMatchData => {
        //             return prevMatchData.map(item => {
        //               if (item.marketId === matchIds[i]) {
        //                 return {
        //                   ...item,
        //                   matchOddsLive: []  // Add the new array property with an empty array
        //                 };
        //               }
        //               return item;
        //             });
        //           });
        //         }
        //       } else {
        //         // dispatch(setMatchOddsLive(val[0]));
        //         setMatchData(prevMatchData => {
        //           return prevMatchData.map(item => {
        //             if (item.marketId === matchIds[i]) {
        //               return {
        //                 ...item,
        //                 matchOddsLive: val[0]  // Add the new array property with array
        //               };
        //             }
        //             return item;
        //           });
        //         });
        //         // console.log(updatedData);
        //         // setMacthOddsLive(val[0]);// add
        //         if (val[0]?.status === "CLOSED") {
        //           socketMicro.emit("disconnect_market", {
        //             id: matchIds[i],
        //           });
        //           // const updatedData = matchData.map(item => {
        //           //   if (item.marketId === matchIds[i]) {
        //           //     return {
        //           //       ...item,
        //           //       matchOddsLive: []  // Add the new array property with an empty array
        //           //     };
        //           //   }
        //           //   return item;
        //           // });
        //           // setMatchData(updatedData)
        //           // setMacthOddsLive([]);
        //           setMatchData(prevMatchData => {
        //             return prevMatchData.map(item => {
        //               if (item.marketId === matchIds[i]) {
        //                 return {
        //                   ...item,
        //                   matchOddsLive: []  // Add the new array property with an empty array
        //                 };
        //               }
        //               return item;
        //             });
        //           });
        //         }
        //       }
        //     }
        //   });

        //   socketMicro.on(`bookmaker${matchIds[i]}`, (val) => {
        //     if (val !== null) {
        //       // console.log("val 222:", val);
        //       if (val.length > 0) {
        //         // dispatch(setBookMakerLive(val[0]));
        //         // setBookmakerLive(val[0]);
        //         setMatchData(prevMatchData => {
        //           return prevMatchData.map(item => {
        //             if (item.marketId === matchIds[i]) {
        //               return {
        //                 ...item,
        //                 bookmakerLive: val[0]  // Add the new array property with an empty array
        //               };
        //             }
        //             return item;
        //           });
        //         });
        //       }
        //       // setBookmakerLive([]);

        //     }
        //   });
        // }
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
        // setMacthOddsLive([]);
        // setBookmakerLive([]);
        // setSessionLock(false)
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      // socketMicro?.emit("disconnect_market", {
      //   id: marketId,
      // });
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
      // setMacthOddsLive([]);
      // setBookmakerLive([]);
      // setSessionLock(false)
    };
  }, [socketMicro, marketIds]);

  async function getThisMatch() {
    let payload = {
      idArray: matchIds,
    };
    try {
      let response = await axios.post(
        `/game-match/multipleMatchDetail`,
        payload
      );
      // alert(111)
      setMatchData(response?.data?.data);
      // let matchOddsDataTemp = response.data?.bettings?.filter(
      //   (element) => element.sessionBet === false
      // );

      // setManualBookmakerData(matchOddsDataTemp);

      //   setSessionExposure(response?.data?.sessionExposure);
      // setCurrentMatch({
      //   ...response.data,
      // });

      // dispatch(
      //   setSelectedMatch({
      //     ...response.data,
      //   })
      // );
      // const ids = response?.data?.data.map(item => item.marketId);
      // // alert(JSON.stringify(ids))
      // setMarketIds(ids);
      // setMarketId(response.data.marketId);
      // setMatchDetail(response.data);
    } catch (e) {
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

      // setIObtes(
      //   data?.data?.data?.filter((b) =>
      //     ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
      //       b?.marketType
      //     )
      //   )
      // );
      setIObtes(data?.data?.data);
      // alert(IObets.length)
      const bets = data?.data?.data?.filter(
        (b) =>
          !["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
      );
      setSessionBets(bets || []);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Background>
      {location?.state?.match == 3 && (
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
            {matchData.map((item, index) => {
              let matchOddsDataTemp = item?.bettings?.filter(
                (element) => element.sessionBet === false
              );
              let IObetsData = IObets?.filter(
                (element) => element.match_id === item.id
              );
              let sessionBetsData = sessionBets?.filter(
                (element) => element.match_id === item.id
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
                              color: "white",
                              fontWeight: "700",
                              paddingTop: "2%",
                              alignSelf: "start",
                            }}
                          >
                            {item?.teamA} V/S {item?.teamB}
                            {index}
                          </Typography>
                          {item?.apiMatchActive && (
                            <Odds
                              currentMatch={item}
                              matchOddsLive={item.matchOddsLive}
                              data={
                                item.matchOddsLive?.runners?.length > 0
                                  ? item.matchOddsLive?.runners
                                  : []
                              }
                              typeOfBet={"Match Odds"}
                              // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                            />
                          )}
                          {item?.apiBookMakerActive && (
                            <BookMarketer
                              currentMatch={item}
                              bookmakerLive={item.bookmakerLive}
                              data={
                                item.bookmakerLive?.runners?.length > 0
                                  ? item.bookmakerLive?.runners
                                  : []
                              }
                            />
                          )}
                          {item?.manualBookMakerActive && (
                            <Odds
                              currentMatch={item}
                              // matchOddsLive={matchOddsLive}
                              // data={
                              //   matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
                              // }
                              data={item}
                              manualBookmakerData={matchOddsDataTemp}
                              typeOfBet={"MANUAL BOOKMAKER"}
                              // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                            />
                          )}
                          {(item?.apiSessionActive ||
                            item?.manualSessionActive) && (
                            <SessionMarket
                              currentOdds={currentOdds}
                              currentMatch={item}
                              data={[]}
                              sessionOffline={item.sessionOffline}
                              sessionBets={sessionBetsData}
                            />
                          )}
                        </Box>
                        {/* <Box sx={{ width: "20px" }} /> */}
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
                            {/* <Box sx={{ width: "2%" }}></Box> */}
                            <Box
                              sx={{
                                width: "150px",
                                marginY: ".75%",
                                height: "35px",
                              }}
                            ></Box>
                          </Box>
                          <FullAllBets
                            IObets={IObets}
                            mode={mode}
                            tag={false}
                          />
                        </Box>
                      </Box>
                    </>
                  ) : (
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
                      </Typography>
                      <Odds
                        currentMatch={item}
                        // matchOddsLive={matchOddsLive}
                        matchOddsLive={item.matchOddsLive}
                        // data={[]}
                        data={
                          item.matchOddsLive?.runners?.length > 0
                            ? item.matchOddsLive?.runners
                            : []
                        }
                        typeOfBet={"Match Odds"}
                      />
                      <BookMarketer
                        currentMatch={item}
                        bookmakerLive={item.bookmakerLive}
                        data={
                          item.bookmakerLive?.runners?.length > 0
                            ? item.bookmakerLive?.runners
                            : []
                        }
                      />
                      {item?.manualBookMakerActive && (
                        <Odds
                          currentMatch={item}
                          data={item}
                          manualBookmakerData={matchOddsDataTemp}
                          typeOfBet={"MANUAL BOOKMAKER"}
                          // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                        />
                      )}
                      {(item?.apiSessionActive ||
                        item?.manualSessionActive) && (
                        <SessionMarket
                          currentOdds={currentOdds}
                          currentMatch={item}
                          sessionOffline={item.sessionOffline}
                          sessionBets={sessionBetsData}
                        />
                      )}
                      <FullAllBets tag={true} IObets={IObetsData} />
                    </Box>
                  )}
                </>
              );
            })}
          </Box>
        </Box>
      )}

      {(location?.state?.match === 4 || location?.state?.match === 2) && (
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
            {matchData.map((item, index) => {
              let matchOddsDataTemp = item?.bettings?.filter(
                (element) => element.sessionBet === false
              );
              let IObetsData = IObets?.filter(
                (element) => element.match_id === item.id
              );
              let sessionBetsData = sessionBets?.filter(
                (element) => element.match_id === item.id
              );
              return (
                <>
                  <Box
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
                    </Typography>
                    <Odds
                      currentMatch={item}
                      // matchOddsLive={matchOddsLive}
                      matchOddsLive={item.matchOddsLive}
                      data={
                        item.matchOddsLive?.runners?.length > 0
                          ? item.matchOddsLive?.runners
                          : []
                      }
                      typeOfBet={"Match Odds"}
                    />
                    <BookMarketer
                      currentMatch={item}
                      bookmakerLive={item.bookmakerLive}
                      data={
                        item.bookmakerLive?.runners?.length > 0
                          ? item.bookmakerLive?.runners
                          : []
                      }
                    />
                    {item?.manualBookMakerActive && (
                      <Odds
                        currentMatch={item}
                        data={item}
                        manualBookmakerData={matchOddsDataTemp}
                        typeOfBet={"MANUAL BOOKMAKER"}
                        // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                      />
                    )}
                    {(item?.apiSessionActive || item?.manualSessionActive) && (
                      <SessionMarket
                        currentMatch={item}
                        currentOdds={currentOdds}
                        sessionOffline={item.sessionOffline}
                        sessionBets={sessionBetsData}
                      />
                    )}
                    <FullAllBets tag={true} IObets={IObetsData} />
                  </Box>
                </>
              );
            })}
          </Box>
        </Box>
      )}
    </Background>
  );
};

export default MatchSubmit;
