import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { SocketContext } from "../../context/socketContext";
import { setRole } from "../../newStore";
import { useEffect } from "react";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setAllSessionBets,
  setManualBookMarkerRates,
  setSelectedMatch,
  setButtonData,
} from "../../newStore/reducers/matchDetails";
import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { MatchOdds } from "../../components";
import MatchComponent from "../../components/MathComponent";
import LiveMatchHome from "../../components/LiveMatchHome";
import AllRateSeperate from "../../components/AllRateSeperate";
import SessionBetSeperate from "../../components/sessionBetSeperate";
import BetPlaced from "../../components/BetPlaced";
import { memo } from "react";
import { logout, setGeoLocation } from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import CustomLoader from "../../components/helper/CustomLoader";
import { toast } from "react-toastify";

let sessionOffline = [];
let matchOddsCount = 0;
const Home = ({ setVisible, visible, handleClose, selected }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fastAmount, setFastAmount] = useState({
    bookMaker: 0,
    mannualBookMaker: 0,
    sessionOdds: 0,
  });

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { allBetRates, allSessionBets } = useSelector(
    (state) => state?.matchDetails
  );
  const [IObets, setIObtes] = useState(allBetRates);
  const [sessionBets, setSessionBets] = useState(allSessionBets);
  const id = location?.state?.matchId;
  const [matchDetail, setMatchDetail] = useState();
  const [marketId, setMarketId] = useState("");
  const [eventId, setEventId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { selectedMatch } = useSelector((state) => state?.matchDetails);
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);

  const [bookMakerRateLive, setBookMakerLive] = useState(
    currentMatch?.bookMakerRateLive
  );
  const { socket, socketMicro } = useContext(SocketContext);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [liveScoreData, setLiveScoreData] = useState();
  const [isHandled, setIsHandled] = useState(false);
  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const { axios, role } = setRole();
  const [matchId, setMatchId] = useState(
    id || sessionStorage.getItem("matchId")
  );
  const [sessionExposer, setSessionExposure] = useState(0);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [sessionLock, setSessionLock] = useState(false);
  const { geoLocation } = useSelector((state) => state.auth);

  async function FetchIpAddress() {
    const maxRetries = 3; // Maximum number of retries
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const res = await fetch("https://geolocation-db.com/json/");
        if (res.ok) {
          return await res.json();
        } else {
          throw new Error(`Request failed with status ${res.status}`);
        }
      } catch (err) {
        console.log(err?.message);
        retryCount++;
      }
    }

    console.log("Max retries exceeded. Unable to fetch IP address.");
    return null;
  }

  useEffect(() => {
    if (geoLocation === null) {
      FetchIpAddress().then((res) => {
        dispatch(setGeoLocation(res));
      });
    }
  }, []);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newMessage", (value) => {
        // console.log(value);
      });

      socket.onevent = async (packet) => {
        // console.log(`Received event: ${packet.data[0]}`, packet.data[1]);

        if (packet.data[0] === "resultDeclareForBet") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id !== value?.match_id) {
                return currentMatch;
              }
              // Update the bettings array in the current match object
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting.id === value.betId) {
                  if (sessionOffline.includes(value.betId)) {
                    const newres = sessionOffline.filter(
                      (id) => id !== value.betId
                    );
                    sessionOffline = newres;
                  }
                  sessionOffline.push(value.betId);
                }
                return betting;
              });
              var newUpdatedValue = updatedBettings;
              return {
                ...currentMatch,
                bettings: newUpdatedValue,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "updateMatchActiveStatus") {
          const value = packet.data[1];
          // matchId = value?.matchId;
          setCurrentMatch((currentMatch) => {
            // if (currentMatch?.id === matchId) {
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
        if (packet.data[0] === "logoutUserForce") {
          dispatch(removeCurrentUser());
          dispatch(removeManualBookMarkerRates());
          dispatch(removeSelectedMatch());
          dispatch(logout({ roleType: "role4" }));
          setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
          // await axios.get("auth/logout");
          removeSocket();
          socket.disconnect();
          socketMicro.disconnect();
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
                  // alert(JSON.stringify(value));
                  // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
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
                // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array
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

            // manualBookmakerData session bet false
            // manualBookmakerData
            if (manualBookmakerData.length == 0 && value?.sessionBet) {
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
              setManualBookmakerData((prevData) => [...prevData, betData]);
            }
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
        if (packet.data[0] === "userBalanceUpdate") {
          const data = packet.data[1];
          const user = {
            ...currentUser,
            current_balance: data?.currentBalacne,
          };
          dispatch(setCurrentUser(user));

          //currentBalacne
        }
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
        }

        if (packet.data[0] === "match_bet") {
          // alert(3333)
          const data = packet.data[1];
          if (!isHandled) {
            setIsHandled(true);
            try {
              if (data) {
                const user = {
                  ...currentUser,
                  current_balance: data.newBalance,
                  exposure: data.exposure,
                };
                const manualBookmaker = {
                  matchId: data?.betPlaceData?.match_id,
                  teamA: data.teamA_rate,
                  teamB: data.teamB_rate,
                  teamC: data.teamC_rate,
                };
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
                  amount:
                    data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                };
                if (data?.betPlaceData?.match_id === id) {
                  setIObtes((prev) => [body, ...prev]);
                }
                // alert(JSON.stringify(manualBookmaker));
                dispatch(setCurrentUser(user));
                dispatch(setManualBookMarkerRates(manualBookmaker));
              }
            } catch (e) {
              console.log("error", e?.message);
            } finally {
              setIsHandled(false);
            }
          }
        }

        if (packet.data[0] === "session_bet") {
          const data = packet.data[1];
          try {
            setSessionExposure(data?.sessionExposure);
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

          const user = {
            ...currentUser,
            current_balance: data.newBalance,
            exposure: data.exposure,
          };

          setSessionBets((prev) => {
            const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
            return [
              {
                ...data.betPlaceData,
                deleted_reason: data.betPlaceData?.deleted_reason || null,
              },
              ...updatedPrev,
            ];
          });

          // dispatch(setAllSessionBets([data.betPlaceData, ...session]));
          dispatch(setCurrentUser(user));
          // dispatch(setSessionRates(data?.profitLoss));
        }

        if (packet.data[0] === "sessionResult") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.current_balance,
              exposure: value.exposure,
            };

            dispatch(setCurrentUser(user));
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.matchId !== value?.matchId) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }

              const updatedBettings = currentMatch?.bettings?.filter(
                (betting) => betting?.id !== value?.betId
              );

              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });
            setSessionExposure(value?.sessionExposure);
            setSessionBets((sessionBets) =>
              sessionBets?.filter((v) => v?.bet_id !== value?.betId)
            );
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "sessionNoResult") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.current_balance,
              exposure: value.exposure,
            };

            dispatch(setCurrentUser(user));
            setCurrentMatch((currentMatch) => {
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
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
              });

              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });

            setSessionExposure(value?.sessionExposure);
            setSessionBets((sessionBets) =>
              sessionBets?.filter((v) => v?.bet_id !== value?.betId)
            );
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "matchResult") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.current_balance,
              exposure: value.exposure,
            };

            dispatch(setCurrentUser(user));
            // setCurrentMatch((currentMatch) => {
            //   if (currentMatch?.matchId !== value?.matchId) {
            //     // If the new bet doesn't belong to the current match, return the current state
            //     return currentMatch;
            //   }
            // });
            // console.log('currentMatch?.matchId == value?.matchId', currentMatch?.matchId == value?.matchId)
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id === value?.matchId) {
                return navigate("/matches");
              }

              return currentMatch;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        // manual bookmaker
        if (packet.data[0] === "updateRate_user") {
          const value = packet.data[1];
          try {
            if (!value?.lock) {
              if (value?.isTab) {
                setCurrentMatch((currentMatches) => {
                  const updatedBookmaker = currentMatch?.bookmakers?.map(
                    (bookmaker) => {
                      if (
                        bookmaker?.id === value?.id &&
                        bookmaker.match_id === matchId
                      ) {
                        return {
                          ...bookmaker,
                          teamA_Back: value?.teamA_Back,
                          teamA_lay: "",
                          teamB_Back: value?.teamB_Back,
                          teamB_lay: "",
                          teamC_Back: value?.teamC_Back,
                          teamC_lay: "",
                          teamA_suspend: "live",
                          teamB_suspend: "live",
                          teamC_suspend: "live",
                        };
                      }
                      return bookmaker;
                    }
                  );
                  return {
                    ...currentMatches,
                    bookmakers: updatedBookmaker,
                  };
                  // if (currentMatches[0]?.id != value.betId) {
                  //   return currentMatches;
                  // }
                  // const updatedMatch = {
                  //   ...currentMatches[0],
                  //   teamA_Back: value?.teamA_Back,
                  //   teamA_lay: "",
                  //   teamB_Back: value?.teamB_Back,
                  //   teamB_lay: "",
                  //   teamC_Back: value?.teamC_Back,
                  //   teamC_lay: "",
                  //   teamA_suspend: "live",
                  //   teamB_suspend: "live",
                  //   teamC_suspend: "live",
                  // };
                  // // Create a new array with the updated match object
                  // const updatedMatches = [
                  //   ...currentMatches.slice(0, 0),
                  //   updatedMatch,
                  //   ...currentMatches.slice(0 + 1),
                  // ];
                  // // Return the new array as the updated state
                  // return updatedMatches;
                });
              } else {
                setCurrentMatch((currentMatches) => {
                  const updatedBookmaker = currentMatch?.bookmakers?.map(
                    (bookmaker) => {
                      if (
                        bookmaker?.id === value?.id &&
                        bookmaker.match_id === matchId
                      ) {
                        return {
                          ...bookmaker,
                          teamA_Back: value?.teamA_Back
                            ? value?.teamA_Back
                            : "",
                          teamA_lay: value?.teamA_lay ? value?.teamA_lay : "",
                          teamA_suspend:
                            value?.teamA_suspend == false ? null : "suspended",
                          teamB_Back: value?.teamB_Back
                            ? value?.teamB_Back
                            : "",
                          teamB_lay: value?.teamB_lay ? value?.teamB_lay : "",
                          teamB_suspend:
                            value?.teamB_suspend == false ? null : "suspended",
                          teamC_Back: value?.teamC_Back
                            ? value?.teamC_Back
                            : "",
                          teamC_lay: value?.teamC_lay ? value?.teamC_lay : "",
                          teamC_suspend:
                            value?.teamC_suspend == false ? null : "suspended",
                          teamA_Ball: null,
                          teamB_Ball: null,
                          teamC_Ball: null,
                        };
                      }
                      return bookmaker;
                    }
                  );
                  return {
                    ...currentMatches,
                    bookmakers: updatedBookmaker,
                  };
                  // alert(value.betId)
                  // if (currentMatches[0]?.id != value.betId) {
                  //   return currentMatches;
                  // }
                  // const updatedMatch = {
                  //   ...currentMatches[0],
                  //   teamA_Back: value?.teamA_Back ? value?.teamA_Back : "", // Update the teamA_Back value
                  //   teamA_lay: value?.teamA_lay ? value?.teamA_lay : "", // Update the teamA_lay value
                  //   teamA_suspend:
                  //     value?.teamA_suspend == false ? null : "suspended", // Update the teamA_susp
                  //   teamB_Back: value?.teamB_Back ? value?.teamB_Back : "",
                  //   teamB_lay: value?.teamB_lay ? value?.teamB_lay : "",
                  //   teamB_suspend:
                  //     value?.teamB_suspend == false ? null : "suspended",
                  //   teamC_Back: value?.teamC_Back ? value?.teamC_Back : "",
                  //   teamC_lay: value?.teamC_lay ? value?.teamC_lay : "",
                  //   teamC_suspend:
                  //     value?.teamC_suspend == false ? null : "suspended",
                  //   teamA_Ball: null,
                  //   teamB_Ball: null,
                  //   teamC_Ball: null,
                  // };

                  // // Create a new array with the updated match object
                  // const updatedMatches = [
                  //   ...currentMatches.slice(0, 0),
                  //   updatedMatch,
                  //   ...currentMatches.slice(0 + 1),
                  // ];

                  // // Return the new array as the updated state
                  // return updatedMatches;
                });
              }
            } else {
              if (value.teamA_suspend == "Ball Started") {
                try {
                  setManualBookmakerData((currentMatches) => {
                    // alert(JSON.stringify(currentMatches))
                    if (currentMatches[0]?.id != value.betId) {
                      return currentMatches;
                    }
                    const updatedMatch = {
                      ...currentMatches[0],
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
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "marketBlock") {
          const value = packet.data[1];
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id === value?.match_id) {
                let updatedBlockMarket;
                if (value?.marketType === "MANUAL BOOKMAKER") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    MANUALBOOKMAKER: { block: value?.marketLock },
                  };
                } else if (value?.marketType === "BOOKMAKER") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    BOOKMAKER: { block: value?.marketLock },
                  };
                } else if (value?.marketType === "MATCH ODDS") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    MATCH_ODDS: { block: value?.marketLock },
                  };
                } else if (value?.marketType === "SESSION") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    SESSION: { block: value?.marketLock },
                  };
                }
                console.log(updatedBlockMarket, "updatedBlockMarket ");
                return {
                  ...currentMatch,
                  blockMarket: updatedBlockMarket,
                };
              }
              return currentMatch;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "matchDeleteBet") {
          const value = packet.data[1];
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id === value?.match_id) {
                let updatedBlockMarket;
                if (value?.marketType === "MANUAL BOOKMAKER") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    MANUALBOOKMAKER: { block: value?.marketLock },
                  };
                } else if (value?.marketType === "BOOKMAKER") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    BOOKMAKER: { block: value?.marketLock },
                  };
                } else if (value?.marketType === "MATCH ODDS") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    MATCH_ODDS: { block: value?.marketLock },
                  };
                } else if (value?.marketType === "SESSION") {
                  updatedBlockMarket = {
                    ...currentMatch?.blockMarket,
                    SESSION: { block: value?.marketLock },
                  };
                }
                console.log(updatedBlockMarket, "updatedBlockMarket ");
                return {
                  ...currentMatch,
                  blockMarket: updatedBlockMarket,
                };
              }
              return currentMatch;
            });
            const user = {
              ...currentUser,
              current_balance: value.newBalance,
              exposure: value.exposure,
            };
            const manualBookmaker = {
              matchId: value?.matchId,
              teamA: value.teamA_rate,
              teamB: value.teamB_rate,
              teamC: value.teamC_rate,
            };
            dispatch(setCurrentUser(user));
            dispatch(setManualBookMarkerRates(manualBookmaker));

            setIObtes((IObets) => {
              const updatedBettings = IObets?.map((betting) => {
                if (value?.betPlaceIds.includes(betting.id)) {
                  return {
                    ...betting,
                    deleted_reason: value?.deleted_reason,
                  };
                }
                return betting;
              });

              return updatedBettings;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        // if (packet.data[0] === "matchDeleteBet") {
        //   const value = packet.data[1];
        //   // matchId = value?.match_id;
        //   try {
        //     const user = {
        //       ...currentUser,
        //       current_balance: value.newBalance,
        //       exposure: value.exposure,
        //     };
        //     const manualBookmaker = {
        //       matchId: value?.matchId,
        //       teamA: value.teamA_rate,
        //       teamB: value.teamB_rate,
        //       teamC: value.teamC_rate,
        //     };
        //     dispatch(setCurrentUser(user));
        //     dispatch(setManualBookMarkerRates(manualBookmaker));

        //     setIObtes((IObets) => {
        //       const updatedBettings = IObets?.map((betting) => {
        //         if (value?.betPlaceIds.includes(betting.id)) {
        //           return {
        //             ...betting,
        //             deleted_reason: value?.deleted_reason,
        //           };
        //         }
        //         return betting;
        //       });

        //       return updatedBettings;
        //     });
        //   } catch (err) {
        //     console.log(err?.message);
        //   }
        // }
        if (packet.data[0] === "sessionDeleteBet") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.newBalance,
              exposure: value.exposure,
            };
            dispatch(setCurrentUser(user));

            setSessionBets((sessionBets) => {
              const updatedBettings = sessionBets?.map((betting) => {
                if (value?.betPlaceIds.includes(betting.id)) {
                  return {
                    ...betting,
                    deleted_reason: value?.deleted_reason,
                  };
                }
                return betting;
              });

              return updatedBettings;
            });
            setCurrentMatch((currentMatch) => {
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting?.id === value?.betId) {
                  let profitLoss = value?.profitLoss;
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
        }
      };
    }
  }, [socket]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on("connect", () => {
          socketMicro.emit("init", { id: marketId });

          socketMicro.emit("score", { id: eventId });
          activateLiveMatchMarket();
          setSessionLock(false);
        });
        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here

          setMacthOddsLive([]);
          setBookmakerLive([]);
          setCurrentMatch((currentMatch) => {
            const bettingToUpdate = currentMatch?.bettings?.map((betting) => {
              if (betting?.id && betting?.selectionId && betting?.sessionBet) {
                return { ...betting, yes_rate: null, no_rate: null };
              }
              return betting;
            });

            return {
              ...currentMatch,
              bettings: bettingToUpdate,
            };
          });
          setSessionLock(true);
        });

        socketMicro.emit("init", { id: marketId });
        setInterval(() => {
          socketMicro.emit("init", { id: marketId });
        }, 3000);

        socketMicro.emit("score", { id: eventId });
        activateLiveMatchMarket();

        socketMicro.on("reconnect", () => {
          socketMicro.emit("init", { id: marketId });
          socketMicro.emit("score", { id: eventId });
          activateLiveMatchMarket();
          setSessionLock(false);
        });

        socketMicro.on(`session${marketId}`, (val) => {
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
        socketMicro.on(`liveScore${eventId}`, (val) => {
          if (val !== null) {
            setLiveScoreData(val);
            if (val) {
              setLiveScoreData(val);
            } else {
              setLiveScoreData();
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
      socketMicro?.emit("leaveScore", { id: eventId });
      setMacthOddsLive([]);
      setBookmakerLive([]);
      setSessionLock(false);
    };
  }, [socketMicro, marketId]);

  async function getAllBetsData1() {
    let payload = {
      match_id: id,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);

      setIObtes(
        data?.data?.data?.filter((b) =>
          ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
        )
      );
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

  const activateLiveMatchMarket = async () => {
    try {
      await Axios.get(`${microServiceApiPath}/market/${marketId}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  const activateLiveMatchEvent = async (eventId) => {
    try {
      // https://super007.in/api/MatchOdds/score/32466783
      await Axios.get(`${microServiceApiPath}/event/${eventId}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  async function getThisMatch(id) {
    try {
      const response = await axios.get(`/game-match/matchDetail/${id}`);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );
      setManualBookmakerData(matchOddsDataTemp);
      setSessionExposure(response?.data?.sessionExposure);
      setCurrentMatch({
        ...response.data,
      });
      dispatch(
        setSelectedMatch({
          ...response.data,
        })
      );
      dispatch(
        setManualBookMarkerRates({
          matchId: response.data.id,
          teamA: response.data.teamA_rate ? response.data.teamA_rate : 0,
          teamB: response.data.teamB_rate ? response.data.teamB_rate : 0,
          teamC: response.data.teamC_rate ? response.data.teamC_rate : 0,
        })
      );
      setMarketId(response.data.marketId);
      setEventId(response.data.EventId);
      activateLiveMatchEvent(response?.data?.EventId);
      setMatchDetail(response.data);
      dispatch(
        setAllSessionBets(
          response?.data?.betting?.filter((v) => v?.sessionBet === true) || []
        )
      );
      setLoading(false);
      if (response?.data?.stopAt) {
        toast.success("Match Declare");
        navigate("/matches");
      }
    } catch (e) {
      console.log("response", e.response.data);
      setLoading(false);
    }
  }

  function customSort(a, b) {
    if (a.lable === "1k") {
      return -1; // "1k" comes first
    } else if (b.lable === "1k") {
      return 1; // "1k" comes first
    } else {
      // For other labels, maintain their original order
      return 0;
    }
  }

  const getButtonList = async () => {
    try {
      const { data } = await axios.get("/users/getButtonValues");
      const initialData = data?.data?.buttons; // Replace this with your initial data
      const jsonObject = JSON.parse(initialData);
      const resultArray = Object.entries(jsonObject).map(([lable, value]) => ({
        lable: lable,
        value: value,
      }));
      resultArray.sort(customSort);
      dispatch(setButtonData(resultArray));
      // setButtonData(resultArray);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    if (matchId) {
      getThisMatch(matchId);
    }
    // getAllBetsData();
    getAllBetsData1();
    getButtonList();
  }, [matchId]);

  const handleRateChange = async () => {
    getThisMatch(matchId);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // User returned to the web browser
        if (matchId) {
          if (socket && socket.connected) {
            socket.emit("checkConnection");
          }
          getThisMatch(matchId);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getScoreBord = async (eventId) => {
    // alert(1)
    try {
      const response = await Axios.get(
        `https://super007.in/api/MatchOdds/score/${eventId}`
      );
      // Handle the API response here
      console.log("API Response:", response.data);
    } catch (e) {
      console.log("Error:", e?.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getScoreBord(eventId);
    }, 5000); // 30000 milliseconds (30 seconds)

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [eventId]);

  return (
    <Box
      sx={{
        display: "flex",
        // overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        // overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <BetPlaced visible={visible} setVisible={setVisible} />
      {loading ? (
        <Box
          sx={{
            minHeight: "90vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader height={"70vh"} />
        </Box>
      ) : (
        <>
          {matchesMobile && (
            <div
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: { laptop: "8px", mobile: "0px", tablet: "0px" },
                marginTop: "2%",
                flexDirection: "column",
              }}
            >
              <MatchComponent
                currentMatch={currentMatch}
                liveScoreData={liveScoreData}
              />
              <div style={{ width: "100%" }}>
                <MatchOdds
                  sessionBets={sessionBets}
                  setFastAmount={setFastAmount}
                  fastAmount={fastAmount}
                  matchOddsLive={matchOddsLive}
                  sessionExposer={sessionExposer}
                  bookmakerLive={bookmakerLive}
                  onClick={() => handleClose(true)}
                  bookMakerRateLive={bookMakerRateLive}
                  data={currentMatch}
                  sessionOffline={sessionOffline}
                  // dataProfit={currentMatchProfit}
                  allBetsData={sessionBets}
                  manualBookmakerData={manualBookmakerData}
                  handleRateChange={handleRateChange}
                />
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "98%",
                  }}
                >
                  {matchDetail?.manualSessionActive && (
                    <SessionBetSeperate allBetsData={sessionBets} mark />
                  )}
                  {IObets.length > 0 && (
                    <AllRateSeperate
                      allBetsData={IObets?.filter((v) =>
                        [
                          "MATCH ODDS",
                          "BOOKMAKER",
                          "MANUAL BOOKMAKER",
                        ]?.includes(v.marketType)
                      )}
                      count={
                        IObets?.filter((v) =>
                          [
                            "MATCH ODDS",
                            "BOOKMAKER",
                            "MANUAL BOOKMAKER",
                          ]?.includes(v.marketType)
                        ).length
                      }
                      mark
                    />
                  )}
                </Box>
                <LiveMatchHome />
              </Box>
            </div>
          )}
          {!matchesMobile && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: "8px",
                marginTop: "1%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <MatchOdds
                  sessionBets={sessionBets}
                  sessionExposer={sessionExposer}
                  setFastAmount={setFastAmount}
                  fastAmount={fastAmount}
                  matchOddsLive={matchOddsLive}
                  bookmakerLive={bookmakerLive}
                  sessionOffline={sessionOffline}
                  onClick={() => handleClose(true)}
                  data={currentMatch}
                  // dataProfit={currentMatchProfit}
                  allBetsData={allSessionBets}
                  manualBookmakerData={manualBookmakerData}
                  handleRateChange={handleRateChange}
                />
              </Box>
              <Box sx={{ width: "30%", paddingRight: "1%" }}>
                <MatchComponent
                  currentMatch={currentMatch}
                  liveScoreData={liveScoreData}
                />{" "}
                {/** Live scoreBoard */}
                <LiveMatchHome currentMatch={currentMatch} /> {/* Poster */}
                <AllRateSeperate
                  allBetsData={IObets?.filter((v) =>
                    ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"]?.includes(
                      v.marketType
                    )
                  )}
                  count={
                    IObets?.filter((v) =>
                      ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"]?.includes(
                        v.marketType
                      )
                    ).length
                  }
                  mark
                />
                {(matchDetail?.manualSessionActive ||
                  matchDetail?.apiSessionActive) && (
                  <SessionBetSeperate allBetsData={sessionBets} mark />
                )}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(Home);
