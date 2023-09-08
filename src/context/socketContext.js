import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  apiBasePath,
  apiMicroBasePath,
  microServiceApiPath,
} from "../components/helper/constants";
import { setRole } from "../newStore";
import { GlobalStore } from "./globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutCurrentUser,
  removeCurrentUser,
  setCurrentUser,
} from "../newStore/reducers/currentUser";
import {
  logoutMatchDetails,
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setAllBetRate,
  setAllSessionBets,
  setManualBookMarkerRates,
  setManualBookmaker,
  setQuickBookmaker,
  setQuickSession,
  setSelectedMatch,
  setSelectedSessionBettings,
  setSessionExposure,
  setSessionOffline,
  setUserAllMatches,
} from "../newStore/reducers/matchDetails";
import { removeSocket } from "../components/helper/removeSocket";
import { logout, logoutAuth } from "../newStore/reducers/auth";
import ResetAllState from "../components/helper/logoutUserAction";

export const SocketContext = createContext();
var match_id;

export const SocketProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [socket, setSocket] = useState(null);
  const [socketMicro, setSocketMicro] = useState(null);
  const { JWT, role } = setRole();
  const token = "Bearer " + JWT;
  const checkSocket = localStorage.getItem("socket");
  const checkMicroSocket = localStorage.getItem("microSocket");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const {
    allBetRates,
    allSessionBets,
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    userAllMatches,
    selectedSessionBettings,
    quickSession,
    quickBookmaker,
  } = useSelector((state) => state?.matchDetails);

  const [localCurrentUser, setLocalCurrentUser] = useState(null);
  const [localAllBetRates, setLocalAllBetRates] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [localSessionOffline, setLocalSessionOffline] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [localAllmatches, setLocalAllMatches] = useState([]);
  const [LSelectedSessionBetting, setLSelectedSessionBetting] = useState([]);
  const [localQuickSession, setLocalQuickSession] = useState([]);
  const [localQuickBookmaker, setLocalQuickBookmaker] =
    useState(quickBookmaker);

  useEffect(() => {
    if (allBetRates) {
      setLocalAllBetRates(allBetRates);
    }
    if (allSessionBets) {
      setSessionBets(allSessionBets);
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
    if (selectedSessionBettings) {
      setLSelectedSessionBetting(selectedSessionBettings);
    }
    if (quickSession) {
      setLocalQuickSession(quickSession);
    }
    if (quickBookmaker) {
      setLocalQuickBookmaker(quickBookmaker);
    }
  }, [
    allBetRates,
    allSessionBets,
    currentUser,
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    userAllMatches,
    selectedSessionBettings,
    quickSession,
    quickBookmaker,
  ]);

  console.log("nav", location);
  const dispatch = useDispatch();
  const getToken = (tk, rl) => {
    let token = "";
    if (rl === "role4") {
      token = "Bearer " + (tk.userJWT || sessionStorage.getItem("JWTuser"));
    } else if (rl === "role3") {
      token = "Bearer " + (tk.expertJWT || sessionStorage.getItem("JWTexpert"));
    } else if (rl === "role2") {
      token = "Bearer " + (tk.adminWT || sessionStorage.getItem("JWTwallet"));
    }
    if (rl === "role1") {
      token = "Bearer " + (tk.walletWT || sessionStorage.getItem("JWTadmin"));
    }
    return token;
  };

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

  const localUserServerEvents = (localSocket, microSocket) => {
    localSocket.on("logoutUserForce", (event) => {
      try {
        // ResetAllState()
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
        setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
        // await axios.get("auth/logout");
        removeSocket();
        socket.disconnect();
        socketMicro.disconnect();
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("resultDeclareForBet", (event) => {
      const data = event;
      try {
        setLocalAllMatches((prev) => {
          const filteredMatches = prev.filter(
            (v) => !(v.id === data?.match_id && data.sessionBet === false)
          );
          dispatch(setUserAllMatches(filteredMatches));
          return filteredMatches;
        });
        setCurrentMatch((currentMatch) => {
          if (
            currentMatch?.id === data?.match_id &&
            data?.sessionBet === false
          ) {
            navigate("/matches");
            return currentMatch;
          }
          if (
            currentMatch?.id === data?.match_id &&
            data?.sessionBet === true
          ) {
            setLSelectedSessionBetting((prev) => {
              const updatedBettings = prev?.map((betting) => {
                if (betting.id === data.betId) {
                  return { ...betting, betStatus: 2 };
                }
                return betting;
              });
              dispatch(setSelectedSessionBettings(updatedBettings));
              return updatedBettings;
            });
            setLocalQuickSession((prev) => {
              const updatedBettings = prev?.map((betting) => {
                if (betting.id === data.betId) {
                  return { ...betting, betStatus: 2 };
                }
                return betting;
              });
              dispatch(setQuickSession(updatedBettings));
              return updatedBettings;
            });
            const updatedBettings = currentMatch?.bettings?.map((betting) => {
              if (betting.id === data.betId) {
                return { ...betting, betStatus: 2 };
              }
              return betting;
            });
            var newUpdatedValue = updatedBettings;
            const newBody = {
              ...currentMatch,
              bettings: newUpdatedValue,
            };
            dispatch(setSelectedMatch(newBody));

            setSessionBets((sessionBets) => {
              const res = sessionBets?.filter((v) => v?.bet_id !== data?.betId);
              dispatch(setAllSessionBets(res));
              return res;
            });

            return newBody;
          }

          return currentMatch;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("updateMatchActiveStatus", (event) => {
      const data = event;
      try {
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id === data?.matchId) {
            const idToNewBetStatusMap = data?.quick_bookmaker?.reduce(
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
              apiBookMakerActive: data?.apiBookMakerActive,
              apiMatchActive: data?.apiMatchActive,
              apiSessionActive: data?.apiSessionActive,
              manualBookMakerActive: data?.manualBookMakerActive,
              manualSessionActive: data?.manualSessionActive,
              bookmakers: updatedArray1,
            };
            dispatch(setQuickBookmaker(updatedArray1));
            dispatch(setSelectedMatch(newBody));
            return newBody;
          }
          return currentMatch;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("updateSessionRate_user", (event) => {
      const data = event;
      try {
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id !== data?.match_id) {
            // If the new bet doesn't belong to the current match, return the current state
            return currentMatch;
          }
          setLSelectedSessionBetting((prev) => {
            const updated = prev?.map((item) => {
              if (item?.id === data?.betId) {
                return {
                  ...item,
                  ...data,
                };
              }
              return item;
            });
            dispatch(setSelectedSessionBettings(updated));
            return updated;
          });

          setLocalQuickSession((prev) => {
            const updated = prev?.map((item) => {
              if (item?.id === data?.betId) {
                return {
                  ...item,
                  ...data,
                };
              }
              return item;
            });
            dispatch(setQuickSession(updated));
            return updated;
          });
          // Update the bettings array in the current match object
          // const updatedBettings = currentMatch?.bettings?.map((betting) => {
          //   if (betting.id === data.betId) {
          //     // alert(JSON.stringify(value));
          //     // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
          //     return {
          //       ...betting,
          //       ...data,
          //     };
          //   } else if (
          //     betting?.id === data?.betId &&
          //     data.sessionBet === false
          //   ) {
          //     return {
          //       ...betting,
          //       ...data,
          //     };
          //   }
          //   return betting;
          // });
          // var newUpdatedValue = updatedBettings;
          // const bettingsIds = updatedBettings?.map((betting) => betting?.id);
          // if (!bettingsIds?.includes(data.betId)) {
          //   // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array
          //   newUpdatedValue = [...newUpdatedValue, data];
          // }

          // // Return the updated current match object
          // const newBody = {
          //   ...currentMatch,
          //   bettings: newUpdatedValue,
          // };

          // dispatch(setSelectedMatch(newBody));
          // return newBody;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("match_bet", (event) => {
      const data = event;
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
          country: null,
          ip_address: null,
          deleted_reason: data?.betPlaceData?.deleted_reason || null,
          rate: null,
          marketType: data?.betPlaceData?.marketType,
          amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
        };
        if (data?.betPlaceData?.match_id === match_id) {
          setLocalAllBetRates((prev) => {
            const prevId = prev?.map((v) => v?.id) || [];
            if (!prevId?.includes(body?.id)) {
              const newBody = [body, ...prev];
              dispatch(setAllBetRate(newBody));
              return newBody;
            }
            return prev;
          });

          setLocalCurrentUser((prev) => {
            const user = {
              ...prev,
              current_balance: data.newBalance,
              exposure: data.exposure,
            };
            dispatch(setCurrentUser(user));
            return user;
          });

          const manualBookmaker = {
            matchId: data?.betPlaceData?.match_id,
            teamA: data.teamA_rate,
            teamB: data.teamB_rate,
            teamC: data.teamC_rate,
          };
          dispatch(setManualBookMarkerRates(manualBookmaker));
        }
        // alert(JSON.stringify(manualBookmaker));
      } catch (e) {
        console.log("error", e?.message);
      }
    });

    localSocket.on("session_bet", (event) => {
      const data = event;

      try {
        const body = {
          ...data.betPlaceData,
          deleted_reason: data.betPlaceData?.deleted_reason || null,
        };
        if (data?.betPlaceData?.match_id === match_id) {
          setLSelectedSessionBetting((prev) => {
            const updatedBettings = prev?.map((betting) => {
              if (betting?.id === data?.betPlaceData?.bet_id) {
                let profitLoss = data?.profitLoss;
                return {
                  ...betting,
                  profitLoss: profitLoss,
                };
              }
              return betting;
            });
            dispatch(setSelectedSessionBettings(updatedBettings));
            return updatedBettings;
          });
          setLocalQuickSession((prev) => {
            const updatedBettings = prev?.map((betting) => {
              if (betting?.id === data?.betPlaceData?.bet_id) {
                let profitLoss = data?.profitLoss;
                return {
                  ...betting,
                  profitLoss: profitLoss,
                };
              }
              return betting;
            });
            dispatch(setQuickSession(updatedBettings));
            return updatedBettings;
          });

          setSessionBets((prev) => {
            const prevId = prev?.map((v) => v?.id) || [];
            if (!prevId?.includes(body?.id)) {
              const newBody = [body, ...prev];
              dispatch(setAllSessionBets(newBody));
              return newBody;
            }
            return prev;
          });
          setLocalCurrentUser((prev) => {
            const user = {
              ...prev,
              current_balance: data.newBalance,
              exposure: data.exposure,
            };
            dispatch(setCurrentUser(user));
            return user;
          });

          dispatch(setSessionExposure(data?.sessionExposure));
        }
      } catch (err) {
        console.log(err?.message);
      }
    });

    localSocket.on("newBetAdded", (event) => {
      const value = event;
      // matchId = value?.match_id;
      try {
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id !== value?.match_id) {
            // If the new bet doesn't belong to the current match, return the current state
            return currentMatch;
          }
          if (value?.selectionId) {
            setLSelectedSessionBetting((prev) => {
              //   const updatedValue = prev.map((v) => {
              //     if (v.selectionId === value.selectionId && v.id === value.id) {
              //       return { ...v, betStatus: value.betStatus };
              //     }
              //     return v;
              //   });

              //   const existingEntry = updatedValue.find(
              //     (v) => v.selectionId === value.selectionId && v.id === value.id
              //   );

              //   if (!existingEntry) {
              //     updatedValue.unshift(value);
              //   }

              //   dispatch(setSelectedSessionBettings(updatedValue));
              //   return updatedValue;
              // });
              const findBet = prev?.find(
                (betting) =>
                  betting?.selectionId === value?.selectionId &&
                  betting?.id === value?.id
              );

              const body = {
                ...findBet,
                betStatus: value?.betStatus,
                rate_percent: value?.rate_percent,
                yes_rate: value?.yes_rate,
                no_rate: value?.no_rate,
                suspended: value?.suspended,
              };
              var removedBet = prev?.filter(
                (betting) =>
                  betting?.selectionId !== value?.selectionId &&
                  betting?.id !== value?.id
              );
              var updatedBettings = [body, ...removedBet];

              const ids = prev?.map((v) => v?.id);
              if (!ids.includes(value?.id)) {
                const newres = [value, ...prev];
                updatedBettings = newres;
              }
              dispatch(setSelectedSessionBettings(updatedBettings));
              return updatedBettings;
            });
          } else {
            setLocalQuickSession((prev) => {
              const findBet = prev?.find(
                (betting) => betting?.id === value?.id
              );
              const body = {
                ...findBet,
                ...value,
              };
              var removedBet = prev?.filter(
                (betting) => betting?.id !== value?.id
              );
              var updatedBettings = [body, ...removedBet];

              const ids = prev?.map((v) => v?.id);
              if (!ids.includes(value?.id)) {
                const newres = [value, ...prev];
                updatedBettings = newres;
              }
              dispatch(setQuickSession(updatedBettings));
              return updatedBettings;
            });
          }

          // const findBet = currentMatch?.bettings?.find(
          //   (betting) =>
          //     betting?.selectionId === value?.selectionId ||
          //     betting?.id === value?.id
          // );
          // const body = {
          //   ...findBet,
          //   ...value,
          // };
          // var removedBet = currentMatch?.bettings?.filter(
          //   (betting) =>
          //     betting?.selectionId !== value?.selectionId &&
          //     betting?.id !== value?.id
          // );
          // var updatedBettings = [body, ...removedBet];
          // Update the bettings array in the current match object
          // const updatedBettings = currentMatch?.bettings?.map((betting) => {
          //   if (betting.id === value.id && value.sessionBet) {
          //     // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
          //     return {
          //       ...betting,
          //       ...value,
          //     };
          //   } else if (
          //     betting?.id === value?.id &&
          //     value.sessionBet === false
          //   ) {
          //     return {
          //       ...betting,
          //       ...value,
          //     };
          //   }
          //   return betting;
          // });
          //   var newUpdatedValue = updatedBettings;
          //   const bettingsIds = updatedBettings?.map((betting) => betting?.id);

          //   if (!bettingsIds?.includes(value.id)) {
          //     // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

          //     newUpdatedValue = [...newUpdatedValue, value];
          //   } else {
          //     setLocalSessionOffline((prev) => {
          //       if (value.betStatus === 1) {
          //         // If value.betStatus is 1, add the id to the array if it doesn't exist
          //         if (!prev.includes(value.id)) {
          //           const newres = [...prev, value.id];
          //           dispatch(setSessionOffline(newres));
          //           return newres;
          //         }
          //       } else if (value.betStatus === 0) {
          //         // If value.betStatus is 0, remove the id from the array if it exists
          //         const newres = prev.filter((id) => id !== value.id);
          //         dispatch(setSessionOffline(newres));
          //         return newres;
          //       }

          //       return prev; // Return the unchanged prev if no action is taken
          //     });

          //     // newUpdatedValue = newUpdatedValue?.filter(
          //     //   (v) => v?.id !== value?.id && v?.betStatus === 1
          //     // );
          //   }

          //   // Return the updated current match object
          //   const newBody = {
          //     ...currentMatch,
          //     bettings: newUpdatedValue,
          //   };
          //   dispatch(setSelectedMatch(newBody));
          //   return newBody;
        });

        // manualBookmakerData session bet false
        // manualBookmakerData
        let betData = {
          betRestult: null,
          betStatus: 1,
          bet_condition: null,
          createAt: value?.createAt,
          createdBy: value?.createdBy,
          deletedAt: null,
          drawRate: null,
          id: value?.id,
          isActive: true,
          matchType: "cricket",
          match_id: value?.match_id,
          no_rate: null,
          rate_percent: null,
          selectionId: null,
          sessionBet: false,
          stopAt: value?.stopAt,
          suspended: value?.suspended,
          teamA_Back: value?.teamA_Back,
          teamA_lay: value?.teamA_lay,
          teamA_suspend: value?.teamA_suspend,
          teamB_Back: null,
          teamB_lay: null,
          teamB_suspend: value?.teamB_suspend,
          teamC_Back: null,
          teamC_lay: null,
          teamC_suspend: value?.teamC_suspend,
          updateAt: value?.updateAt,
          yes_rate: null,
        };
        setManualBookmakerData((prev) => {
          if (prev.length == 0 && value?.sessionBet) {
            const body = [...prev, betData];
            dispatch(setManualBookmaker(body));
            return body;
          }
          return prev;
        });
      } catch (err) {
        console.log(err?.message);
      }
    });

    localSocket.on("allApiSessionStop", (event) => {
      const value = event;
      // matchId = value?.match_id;
      try {
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id !== value?.matchId) {
            // If the new bet doesn't belong to the current match, return the current state
            return currentMatch;
          }
          setLSelectedSessionBetting((prev) => {
            const updatedBettings = prev?.map((betting) => {
              if (betting?.selectionId !== null && betting?.betStatus !== 2) {
                return { ...betting, betStatus: 0 };
              }
              return betting;
            });

            dispatch(setSelectedSessionBettings(updatedBettings));
            return updatedBettings;
          });
        });
      } catch (err) {
        console.log(err?.message);
      }
    });
    // The `message` event listener is not being overridden.
    localSocket.on("matchOddRateLive", (event) => {
      const value = event;
      console.log("matchOddRateLive", event);
      try {
        setCurrentMatch((prev) => {
          if (prev?.id === value?.matchId) {
            const newBody = {
              ...prev,
              matchOddRateLive: value?.matchOddLive,
            };
            dispatch(setSelectedMatch(newBody));
            return;
          }
          return prev;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("userBalanceUpdate", (event) => {
      const data = event;
      try {
        setLocalCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.currentBalacne,
          };
          dispatch(setCurrentUser(user));
          return user;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("bookMakerRateLive", (event) => {
      const data = event;
      try {
        setCurrentMatch((prev) => {
          if (prev?.id === data?.matchId) {
            const newBody = {
              ...prev,
              bookMakerRateLive: data?.bookMakerLive,
            };
            dispatch(setSelectedMatch(newBody));
            return newBody;
          }
          return prev;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("sessionResult", (event) => {
      const data = event;
      try {
        setLocalCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.current_balance,
            exposure: data.exposure,
          };
          dispatch(setCurrentUser(user));
          return user;
        });

        setCurrentMatch((currentMatch) => {
          if (currentMatch?.matchId !== data?.matchId) {
            // If the new bet doesn't belong to the current match, return the current state
            return currentMatch;
          }

          const updatedBettings = currentMatch?.bettings?.filter(
            (betting) => betting?.id !== data?.betId
          );
          const newBody = {
            ...currentMatch,
            bettings: updatedBettings,
          };

          dispatch(setSelectedMatch(newBody));
          return newBody;
        });
        dispatch(setSessionExposure(data?.sessionExposure));
        setSessionBets((sessionBets) => {
          const res = sessionBets?.filter((v) => v?.bet_id !== data?.betId);
          dispatch(setAllSessionBets(res));
          return res;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("sessionNoResult", (event) => {
      const data = event;
      try {
        setLocalCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.current_balance,
            exposure: data.exposure,
          };
          dispatch(setCurrentUser(user));
          return user;
        });

        setCurrentMatch((currentMatch) => {
          const updatedBettings = currentMatch?.bettings?.map((betting) => {
            if (
              betting?.id === data?.betId &&
              currentMatch?.id === data?.match_id
            ) {
              return {
                ...betting,
                profitLoss: null,
              };
            }
            return betting;
          });
          const newBody = {
            ...currentMatch,
            bettings: updatedBettings,
          };

          dispatch(setSelectedMatch(newBody));
          return newBody;
        });
        dispatch(setSessionExposure(data?.sessionExposure));
        setSessionBets((sessionBets) => {
          const res = sessionBets?.filter((v) => v?.bet_id !== data?.betId);
          dispatch(setAllSessionBets(res));
          return res;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("matchResult", (event) => {
      const data = event;
      try {
        setLocalCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.current_balance,
            exposure: data.exposure,
          };
          dispatch(setCurrentUser(user));
          return user;
        });

        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id === data?.matchId) {
            return navigate("/matches");
          }

          return currentMatch;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("updateRate_user", (event) => {
      const data = event;
      try {
        if (!data?.lock) {
          if (data?.isTab) {
            // setCurrentMatch((currentMatches) => {
            setLocalQuickBookmaker((bookmaker) => {
              const updatedBookmaker = bookmaker.map((prev) => {
                if (prev?.id === data?.id && prev?.match_id === data?.matchId) {
                  return {
                    ...prev,
                    teamA: data?.teamA,
                    teamB: data?.teamB,
                    teamC: data?.teamC,
                    teamA_Back: data?.teamA_Back,
                    teamA_lay: "",
                    teamB_Back: data?.teamB_Back,
                    teamB_lay: "",
                    teamC_Back: data?.teamC_Back,
                    teamC_lay: "",
                    teamA_suspend: "live",
                    teamB_suspend: "live",
                    teamC_suspend: "live",
                  };
                }
                return prev;
              });
              dispatch(setQuickBookmaker(updatedBookmaker));
              return updatedBookmaker;
            });
            //   const updatedBookmaker = currentMatches?.bookmakers?.map(
            //     (bookmaker) => {
            //       if (
            //         bookmaker?.id === data?.id &&
            //         bookmaker?.match_id === currentMatches?.id
            //       ) {
            //         return {
            //           ...bookmaker,
            //           teamA_Back: data?.teamA_Back,
            //           teamA_lay: "",
            //           teamB_Back: data?.teamB_Back,
            //           teamB_lay: "",
            //           teamC_Back: data?.teamC_Back,
            //           teamC_lay: "",
            //           teamA_suspend: "live",
            //           teamB_suspend: "live",
            //           teamC_suspend: "live",
            //         };
            //       }
            //       return bookmaker;
            //     }
            //   );
            //   const newBody = {
            //     ...currentMatches,
            //     bookmakers: updatedBookmaker,
            //   };
            //   dispatch(setSelectedMatch(newBody));
            //   return newBody;
            // });
          } else {
            // setCurrentMatch((currentMatches) => {
            setLocalQuickBookmaker((bookmaker) => {
              const updatedBookmaker = bookmaker.map((prev) => {
                if (prev?.id === data?.id && prev?.match_id === data?.matchId) {
                  return {
                    ...prev,
                    teamA_Back: data?.teamA_Back ?? "",
                    teamA_lay: data?.teamA_lay ?? "",
                    teamA_suspend:
                      data?.teamA_suspend == false ? null : "suspended",
                    teamB_Back: data?.teamB_Back ?? "",
                    teamB_lay: data?.teamB_lay ?? "",
                    teamB_suspend:
                      data?.teamB_suspend == false ? null : "suspended",
                    teamC_Back: data?.teamC_Back ?? "",
                    teamC_lay: data?.teamC_lay ?? "",
                    teamC_suspend:
                      data?.teamC_suspend == false ? null : "suspended",
                    teamA_Ball: null,
                    teamB_Ball: null,
                    teamC_Ball: null,
                  };
                }
                return prev;
              });
              dispatch(setQuickBookmaker(updatedBookmaker));
              return updatedBookmaker;
            });
            // const updatedBookmaker = currentMatches?.bookmakers?.map(
            //   (bookmaker) => {
            //     if (
            //       bookmaker?.id === data?.id &&
            //       bookmaker?.match_id === currentMatches?.id
            //     ) {
            //       return {
            //         ...bookmaker,
            //         teamA_Back: data?.teamA_Back ?? "",
            //         teamA_lay: data?.teamA_lay ?? "",
            //         teamA_suspend:
            //           data?.teamA_suspend == false ? null : "suspended",
            //         teamB_Back: data?.teamB_Back ?? "",
            //         teamB_lay: data?.teamB_lay ?? "",
            //         teamB_suspend:
            //           data?.teamB_suspend == false ? null : "suspended",
            //         teamC_Back: data?.teamC_Back ?? "",
            //         teamC_lay: data?.teamC_lay ?? "",
            //         teamC_suspend:
            //           data?.teamC_suspend == false ? null : "suspended",
            //         teamA_Ball: null,
            //         teamB_Ball: null,
            //         teamC_Ball: null,
            //       };
            //     }
            //     return bookmaker;
            //   }
            // );
            // const newBody = {
            //   ...currentMatches,
            //   bookmakers: updatedBookmaker,
            // };
            // dispatch(setSelectedMatch(newBody));
            // return newBody;
            // });
          }
        } else {
          if (data.teamA_suspend == "Ball Started") {
            try {
              // setCurrentMatch((currentMatches) => {
              setLocalQuickBookmaker((bookmaker) => {
                const updatedBookmaker = bookmaker.map((prev) => {
                  if (
                    prev?.id === data?.id &&
                    prev?.match_id === data?.matchId
                  ) {
                    return {
                      ...prev,
                      teamA_suspend: data?.teamA_suspend
                        ? "suspended"
                        : data?.teamA_suspend,
                      teamB_suspend: data?.teamB_suspend
                        ? "suspended"
                        : data?.teamB_suspend,
                      teamC_suspend: data?.teamC_suspend
                        ? "suspended"
                        : data?.teamC_suspend,
                      teamA_Ball: "ball",
                      teamB_Ball: "ball",
                      teamC_Ball: "ball",
                    };
                  }
                  return prev;
                });
                dispatch(setQuickBookmaker(updatedBookmaker));
                return updatedBookmaker;
              });
              // const updatedBookmaker = currentMatches?.bookmakers?.map(
              //   (bookmaker) => {
              //     if (
              //       bookmaker?.id === data?.id &&
              //       bookmaker?.match_id === currentMatches?.id
              //     ) {
              //       return {
              //         ...bookmaker,
              //         teamA_suspend: data?.teamA_suspend
              //           ? "suspended"
              //           : data?.teamA_suspend,
              //         teamB_suspend: data?.teamB_suspend
              //           ? "suspended"
              //           : data?.teamB_suspend,
              //         teamC_suspend: data?.teamC_suspend
              //           ? "suspended"
              //           : data?.teamC_suspend,
              //         teamA_Ball: "ball",
              //         teamB_Ball: "ball",
              //         teamC_Ball: "ball",
              //       };
              //     }
              //     return bookmaker;
              //   }
              // );
              // const newBody = {
              //   ...currentMatches,
              //   bookmakers: updatedBookmaker,
              // // };
              // dispatch(setSelectedMatch(newBody));
              // return newBody;
              // });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              // setCurrentMatch((currentMatches) => {
              // alert(JSON.stringify(currentMatches[0]));
              setLocalQuickBookmaker((bookmaker) => {
                const updatedBookmaker = bookmaker.map((prev) => {
                  if (
                    prev?.id === data?.id &&
                    prev?.match_id === data?.matchId
                  ) {
                    return {
                      ...prev,
                      teamA_suspend: data?.teamA_suspend
                        ? "suspended"
                        : data?.teamA_suspend,
                      teamB_suspend: data?.teamB_suspend
                        ? "suspended"
                        : data?.teamB_suspend,
                      teamC_suspend: data?.teamC_suspend
                        ? "suspended"
                        : data?.teamC_suspend,
                      teamA_Ball: null,
                      teamB_Ball: null,
                      teamC_Ball: null,
                    };
                  }
                  return prev;
                });
                dispatch(setQuickBookmaker(updatedBookmaker));
                return updatedBookmaker;
              });
              // const updatedBookmaker = currentMatches?.bookmakers?.map(
              //   (bookmaker) => {
              //     if (
              //       bookmaker?.id === data?.id &&
              //       bookmaker?.match_id === currentMatches?.id
              //     ) {
              //       return {
              //         ...bookmaker,
              //         teamA_suspend: data?.teamA_suspend
              //           ? "suspended"
              //           : data?.teamA_suspend,
              //         teamB_suspend: data?.teamB_suspend
              //           ? "suspended"
              //           : data?.teamB_suspend,
              //         teamC_suspend: data?.teamC_suspend
              //           ? "suspended"
              //           : data?.teamC_suspend,
              //         teamA_Ball: null,
              //         teamB_Ball: null,
              //         teamC_Ball: null,
              //       };
              //     }
              //     return bookmaker;
              //   }
              // );
              // const newBody = {
              //   ...currentMatches,
              //   bookmakers: updatedBookmaker,
              // };
              // dispatch(setSelectedMatch(newBody));
              // return newBody;
              // });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("marketBlock", (event) => {
      const data = event;
      try {
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id === data?.match_id) {
            let updatedBlockMarket;
            if (data?.marketType === "MANUAL BOOKMAKER") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                MANUALBOOKMAKER: { block: data?.marketLock },
              };
            } else if (data?.marketType === "BOOKMAKER") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                BOOKMAKER: { block: data?.marketLock },
              };
            } else if (data?.marketType === "MATCH ODDS") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                MATCH_ODDS: { block: data?.marketLock },
              };
            } else if (data?.marketType === "SESSION") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                SESSION: { block: data?.marketLock },
              };
            }
            console.log(updatedBlockMarket, "updatedBlockMarket ");
            const newBody = {
              ...currentMatch,
              blockMarket: updatedBlockMarket,
            };

            dispatch(setSelectedMatch(newBody));
            return newBody;
          }
          return currentMatch;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("matchDeleteBet", (event) => {
      const data = event;
      try {
        setLocalCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.newBalance,
            exposure: data.exposure,
          };
          dispatch(setCurrentUser(user));
          return user;
        });
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id === data?.match_id) {
            let updatedBlockMarket;
            if (data?.marketType === "MANUAL BOOKMAKER") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                MANUALBOOKMAKER: { block: data?.marketLock },
              };
            } else if (data?.marketType === "BOOKMAKER") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                BOOKMAKER: { block: data?.marketLock },
              };
            } else if (data?.marketType === "MATCH ODDS") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                MATCH_ODDS: { block: data?.marketLock },
              };
            } else if (data?.marketType === "SESSION") {
              updatedBlockMarket = {
                ...currentMatch?.blockMarket,
                SESSION: { block: data?.marketLock },
              };
            }
            console.log(updatedBlockMarket, "updatedBlockMarket ");
            const newBody = {
              ...currentMatch,
              blockMarket: updatedBlockMarket,
            };
            dispatch(setSelectedMatch(newBody));
            return newBody;
          }
          return currentMatch;
        });

        const manualBookmaker = {
          matchId: data?.matchId,
          teamA: data.teamA_rate,
          teamB: data.teamB_rate,
          teamC: data.teamC_rate,
        };
        dispatch(setManualBookMarkerRates(manualBookmaker));

        setLocalAllBetRates((prev) => {
          const updatedBettings = prev?.map((betting) => {
            if (data?.betPlaceIds.includes(betting.id)) {
              return {
                ...betting,
                deleted_reason: data?.deleted_reason,
              };
            }
            return betting;
          });

          dispatch(setAllBetRate(updatedBettings));
          return updatedBettings;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("sessionDeleteBet", (event) => {
      const data = event;
      try {
        setLocalCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.newBalance,
            exposure: data.exposure,
          };
          dispatch(setCurrentUser(user));
          return user;
        });

        setCurrentMatch((currentMatch) => {
          const updatedBettings = currentMatch?.bettings?.map((betting) => {
            if (betting?.id === data?.betId) {
              let profitLoss = data?.profitLoss;
              return {
                ...betting,
                profitLoss: profitLoss,
              };
            }
            return betting;
          });
          // Return the updated current match object
          if (currentMatch?.id === data.matchId) {
            dispatch(setSessionExposure(data?.sessionExposure));
          }
          const newBody = {
            ...currentMatch,
            bettings: updatedBettings,
          };

          dispatch(setSelectedMatch(newBody));
          return newBody;
        });

        setSessionBets((sessionBets) => {
          const updatedBettings = sessionBets?.map((betting) => {
            if (data?.betPlaceIds.includes(betting.id)) {
              return {
                ...betting,
                deleted_reason: data?.deleted_reason,
              };
            }
            return betting;
          });

          dispatch(setAllSessionBets(updatedBettings));
          return updatedBettings;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("newMatchAdded", (event) => {
      const data = event;
      try {
        setLocalAllMatches((prev) => {
          const newBody = [...prev, data];
          dispatch(setUserAllMatches(newBody));
          return newBody;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });
  };

  const localServerSocket = () => {
    // if (!socket && checkSocket !== "true") {
    const newSocket = io(`${apiBasePath}`, {
      transports: ["websocket"],
      headers: {
        Authorization: `${token}`,
      },
      auth: {
        token: `${token}`,
      },
    });
    newSocket.on("connect", () => {
      setSocket(newSocket);
      // toast.success("Socket connect !", { autoClose: 2000 });
      // localStorage.setItem("socket", newSocket.connected)
    });

    // }
    // newSocket.on("disconnect", () => {
    //   toast.error("Socket disconnect !", { autoClose: 1000 });
    // });
    // }
    // if (!socketMicro && checkMicroSocket !== "true") {
    // if (role === "role4") {
    localUserServerEvents(newSocket);
    // }

    // if (role === "role3") {
    //   alert(role);
    //   localExpertServerEvents(newSocket);
    // }

    // } else if (role === "role2") {
    // localExpertServerEvents(newSocket);
    // }
    // else if (["role1", "role2".includes](role)) {
    // }
  };

  const mircoServerSocket = () => {
    const newMicroSocket = io(`${microServiceApiPath}`, {
      transports: ["websocket"],
      headers: {
        Authorization: `${token}`,
      },
      auth: {
        token: `${token}`,
      },
    });

    newMicroSocket.on("connect", () => {
      setSocketMicro(newMicroSocket);
      // toast.success("Third party socket connect !", { autoClose: 2000 });
      // localStorage.setItem("microSocket", newMicroSocket.connected)
    });
    // newMicroSocket.on("disconnect", () => {
    //   toast.error("Third party socket disconnect !", { autoClose: 1000 });
    // });

    newMicroSocket.onerror = (event) => {
      // Handle the WebSocket connection error here
      console.error("WebSocket connection failed:", event);
    };
    // }
  };
  useEffect(() => {
    try {
      console.log(role, "role");
      const token = getToken(globalStore, role);
      if (!["Bearer null", ""].includes(token)) {
        localServerSocket();
        mircoServerSocket();
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }, [role, globalStore]);

  return (
    <SocketContext.Provider value={{ socket, socketMicro }}>
      {children}
    </SocketContext.Provider>
  );
};
