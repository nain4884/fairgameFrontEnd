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
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Draw, logo, Logout, Money, MoneyBag } from "../../assets";
import SearchInput from "../../components/SearchInput";
import StyledImage from "../../components/StyledImage";
import { NotiBadge, Down, Users, ArrowLeft } from "../../expert/assets";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../store/activeUser";
import { stateActions } from "../../store/stateActions";
import SessionTimeOut from "../../components/helper/SessionTimeOut";
import AddNotificationModal from "../../components/AddNotificationModal";
import { ThisUseModal } from "../../components/Modal";
import { logout, logoutAuth } from "../../newStore/reducers/auth";
import {
  logoutCurrentUser,
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  setAllMatchs,
  setAllEventSession,
  setEConfirmAuth,
  setCurrentOdd,
  logoutExpertDetails,
  setSessionAllBet,
  setSessionProfitLoss,
  setBookmakerTeamRates,
  setQuickBookmaker,
} from "../../newStore/reducers/expertMatchDetails";
import { setRole } from "../../newStore";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import { memo } from "react";
import {
  logoutMatchDetails,
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setBookMakerBetRate,
  setManualBookMarkerRates,
  setSelectedMatch,
  setSessionResults,
  setUserAllMatches,
} from "../../newStore/reducers/matchDetails";
import { a } from "@react-spring/web";
import ButtonHead from "./ButtonHead";
import ActiveUsers from "./ActiveUsers";
import BoxProfile from "./BoxProfile";
import DropdownMenu1 from "./DropDownMenu1";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import IdleTimer from "../../components/IdleTimer";
import CustomLoader from "../../components/helper/CustomLoader";
import ModalMUI from "@mui/material/Modal";
import { setAllBetRate } from "../../newStore/reducers/expertMatchDetails";

var match_id;
const CustomHeader = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [isTransPasswordExist, setIsTransPasswordExist] = useState(false);
  const activeUser = useSelector((state) => state?.activeUser?.activeUser);
  const currentSelected = useSelector((state) => state?.activeUser?.selected);
  const dispatch = useDispatch();
  const location = useLocation();
  const [active, setActiveAdmin] = useState(0);
  const {
    allEventSession,
    activeUsers,
    allMatch,
    allBetRates,
    currentOdd,
    sessionAllBet,
    sessionBetId,
    bookmakerTeamRates,
    selectedBookmaker,
    quickBookmaker,
  } = useSelector((state) => state?.expertMatchDetails);
  const { userAllMatches, selectedMatch, bookMakerBetRates } = useSelector(
    (state) => state?.matchDetails
  );
  const { userExpert } = useSelector((state) => state.auth);
  const { socket, socketMicro } = useContext(SocketContext);

  const [allMatchData, setAllMatchData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [onlineUser, setOnlineUser] = useState(activeUsers);
  const [fullName, setFullName] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [firstTimeLoader, setFirstTimeLoader] = useState(true);
  const [localAllBetRates, setLocalAllBetRates] = useState([]);
  const [localSessionBets, setLocalSessionBets] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [localCurrentUser, setLocalCurrentUser] = useState(null);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [betId, setBetId] = useState("");

  const [allLiveEventSession, setAllLiveEventSession] = useState([]);
  const [localAllmatches, setLocalAllMatches] = useState([]);
  const [teamRates, setTeamRates] = useState({
    teamA: bookmakerTeamRates?.teamA,
    teamB: bookmakerTeamRates?.teamB,
    teamC: bookmakerTeamRates?.teamC,
  });
  const [localBookMakerRates, setLocalBookMakerRates] = useState([]);

  const [localSelectedBookmaker, setLocalSelectedBookmaker] = useState(null);

  const [localQuickBookmaker, setLocalQuickBookmaker] =
    useState(quickBookmaker);
  useEffect(() => {
    if (allBetRates) {
      setLocalAllBetRates(allBetRates);
    }
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }

    if (currentUser) {
      setLocalCurrentUser(currentUser);
    }
    if (currentOdd) {
      setCurrentOdds(currentOdd);
    }

    if (allEventSession) {
      setAllLiveEventSession(allEventSession);
    }

    if (sessionAllBet) {
      setLocalSessionBets(sessionAllBet);
    }

    if (sessionBetId) {
      setBetId(sessionBetId);
    }

    if (userAllMatches) {
      setLocalAllMatches(userAllMatches);
    }
    if (bookmakerTeamRates) {
      setTeamRates((prev) => ({
        ...prev,
        teamA: bookmakerTeamRates?.teamA,
        teamB: bookmakerTeamRates?.teamB,
        teamC: bookmakerTeamRates?.teamC,
      }));

      if (bookMakerBetRates) {
        setLocalBookMakerRates(bookMakerBetRates);
      }
    }

    if (quickBookmaker) {
      setLocalQuickBookmaker(quickBookmaker);
    }

    if (selectedBookmaker) {
      setLocalSelectedBookmaker(selectedBookmaker);
    }
  }, [
    allBetRates,
    selectedMatch,
    currentUser,
    allEventSession,
    currentOdd,
    sessionAllBet,
    sessionBetId,
    userAllMatches,
    bookmakerTeamRates,
    bookMakerBetRates,
    selectedBookmaker,
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

  function customSort(a, b) {
    // betStatus 1 should come before betStatus 2
    const betStatusOrder = { 1: 0, 0: 1, 2: 2 };
    const aStatus = betStatusOrder[a?.betStatus] || 0;
    const bStatus = betStatusOrder[b?.betStatus] || 0;
    return aStatus - bStatus;
  }

  useEffect(() => {
    if (socket && socket.connected) {
      socket.onevent = async (packet) => {
        if (packet.data[0] === "logoutUserForce") {
          dispatch(logoutMatchDetails());
          dispatch(logoutCurrentUser());
          dispatch(logoutAuth());
          dispatch(logoutExpertDetails());
          sessionStorage.removeItem("JWTexpert");
          setGlobalStore((prev) => ({
            ...prev,
            expertJWT: "",
            // isSession: true,
          }));
          // await axios.get("auth/logout");
          removeSocket();
          navigate("/expert");
          socketMicro.disconnect();
          socket.disconnect();
        }
        if (packet.data[0] === "userBalanceUpdate") {
          const data = packet.data[1];

          setLocalCurrentUser((prev) => {
            const user = {
              ...prev,
              current_balance: data?.currentBalacne,
            };
            dispatch(setCurrentUser(user));
            return user;
          });
        }
        if (packet.data[0] === "loginUserCount") {
          const data = packet.data[1];
          setOnlineUser(data?.count);
        }

        if (packet.data[0] === "match_bet") {
          const data = packet.data[1];
          try {
            setLocalAllBetRates((prev) => {
              if (match_id === data?.betPlaceData?.match_id) {
                const manualBookmaker = {
                  matchId: data?.betPlaceData?.match_id,
                  teamA: data.teamA_rate,
                  teamB: data.teamB_rate,
                  teamC: data.teamC_rate,
                };
                dispatch(setManualBookMarkerRates(manualBookmaker));

                setTeamRates((prev) => {
                  const newBody = {
                    ...prev,
                    teamA: data?.teamA_rate ? data?.teamA_rate : 0,
                    teamB: data?.teamB_rate ? data?.teamB_rate : 0,
                    teamC: data?.teamC_rate ? data?.teamC_rate : 0,
                  };
                  dispatch(setBookmakerTeamRates(newBody));
                  return newBody;
                });
                const body = {
                  id: data?.betPlaceData?.id,
                  isActive: true,
                  createAt: data?.betPlaceData?.createdAt,
                  updateAt: data?.betPlaceData?.createdAt,
                  createdBy: null,
                  deletedAt: null,
                  user: { userName: data?.betPlaceData?.userName },
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
                  rate: data?.betPlaceData?.rate,
                  deleted_reason: data?.betPlaceData?.deleted_reason || null,
                  marketType: data?.betPlaceData?.marketType,
                  myStack: data?.betPlaceData?.myStack,
                  myStack: data?.betPlaceData?.myStack,
                  amount:
                    data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                };
                const newBody = [body, ...prev];
                dispatch(setAllBetRate(newBody));
                return newBody;
              }
              return prev;
            });

            setLocalBookMakerRates((prev) => {
              if (
                data?.betPlaceData?.match_id === match_id &&
                data?.betPlaceData?.bet_id === selectedBookmaker?.betId &&
                selectedBookmaker?.marketType === data?.betPlaceData?.marketType
              ) {
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
                  rate: null,
                  deleted_reason: data?.betPlaceData?.deleted_reason || null,
                  userName: data?.betPlaceData?.userName,
                  myStack: data?.betPlaceData?.myStack,
                  marketType: data?.betPlaceData?.marketType,
                  amount:
                    data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                };
                const newBody = [body, ...prev];
                dispatch(setBookMakerBetRate(newBody));
                return newBody; // Push the new element at the beginning of the array
              }

              return prev;
            });
          } catch (e) {
            console.log("error", e?.message);
          }
        }

        if (packet.data[0] === "matchOddRateLive") {
          const e = packet.data[1];
          setCurrentMatch((prev) => {
            if (prev?.id === e?.matchId) {
              const newBody = {
                ...prev,
                matchOddRateLive: e?.matchOddLive,
              };
              dispatch(setSelectedMatch(newBody));
              return;
            }
            return prev;
          });
        }

        if (packet.data[0] === "bookMakerRateLive") {
          const e = packet.data[1];
          setCurrentMatch((prev) => {
            if (prev?.id === e?.matchId) {
              const newBody = {
                ...prev,
                bookMakerRateLive: e?.bookMakerLive,
              };
              dispatch(setSelectedMatch(newBody));
              return newBody;
            }
            return prev;
          });
        }

        if (packet.data[0] === "updateMatchActiveStatus") {
          const data = packet.data[1];

          setLocalAllMatches((prev) => {
            const updated = prev?.map((matches) => {
              if (matches?.id === data?.matchId) {
                const newBody = {
                  ...matches,
                  apiBookMakerActive: data?.apiBookMakerActive,
                  apiMatchActive: data?.apiMatchActive,
                  apiSessionActive: data?.apiSessionActive,
                  manualBookMakerActive: data?.manualBookMakerActive,
                  manualSessionActive: data?.manualSessionActive,
                };
                return newBody;
              }
              return matches;
            });
            dispatch(setUserAllMatches(updated));
            return updated;
          });
        }

        if (packet.data[0] === "newBetAdded") {
          const value = packet.data[1];
          try {
            // if (matchId == value?.match_id) {
            // setLiveData((liveData) =>
            //   liveData?.filter((v) => v.betStatus !== 1)
            // );

            // setLiveData((liveData) => {
            //   liveData?.map((val) => {
            //     if (val?.selectionId === e?.selectionId) {
            //       return {
            //         ...val,
            //         betStatus: 1, // update betStatus to 1
            //       };
            //     }
            //     return val;
            //   });
            // });
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id === value?.match_id) {
                var updatedBettings = currentMatch?.bettings.map((betting) => {
                  if (
                    betting?.selectionId === value?.selectionId ||
                    betting?.id === value?.id
                  ) {
                    return { ...betting, betStatus: value?.betStatus };
                  }
                  return betting; // Return the unchanged betting object if no match is found
                });

                // If no match was found, push the value to the bettings array
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
            });

            setAllLiveEventSession((prev) => {
              const updatedAllEventSession = prev?.map((match) => {
                if (
                  match.id === value?.match_id &&
                  [undefined, null].includes(value?.selectionId)
                ) {
                  const betObj = {
                    id: value.id,
                    bet_condition: value.bet_condition,
                  };
                  const newBettings = [...match.bettings, betObj];
                  return {
                    ...match,
                    bettings: newBettings,
                  };
                }
                return match;
              });

              dispatch(setAllEventSession(updatedAllEventSession));

              return updatedAllEventSession;
            });
          } catch (e) {
            console.log(e.message);
          }
        }

        if (packet.data[0] === "session_bet") {
          const data = packet.data[1];
          if (betId === data?.betPlaceData?.bet_id) {
            let profitLoss = data?.profitLoss;
            dispatch(setSessionProfitLoss(profitLoss));
            const body = {
              id: data?.betPlaceData?.id,
              isActive: true,
              createAt: data?.betPlaceData?.createAt,
              updateAt: data?.betPlaceData?.createdAt,
              createdBy: null,
              deletedAt: null,
              user: { userName: data?.betPlaceData?.userName },
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
              deleted_reason: data?.betPlaceData?.deleted_reason || null,
              ip_address: null,
              rate: data?.betPlaceData?.rate,
              marketType: data?.betPlaceData?.marketType,
              myStack: data?.betPlaceData?.myStack,
              amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
            };
            setLocalSessionBets((prev) => {
              const prevId = prev?.map((v) => v?.id) || [];
              if (!prevId?.includes(body?.id)) {
                const newBody = [body, ...prev];
                dispatch(setSessionAllBet(newBody));
                return newBody;
              }
              return prev;
            });
          }

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
              setLocalAllBetRates((IObets) => {
                const updatedIObets = Array.isArray(IObets) ? IObets : []; // Ensure IObets is an array

                if (currentMatch?.id === data?.betPlaceData?.match_id) {
                  const body = {
                    id: data?.betPlaceData?.id,
                    isActive: true,
                    createAt: data?.betPlaceData?.createdAt,
                    updateAt: data?.betPlaceData?.createdAt,
                    createdBy: null,
                    deletedAt: null,
                    user: { userName: data?.betPlaceData?.userName },
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
                    rate: data?.betPlaceData?.rate,
                    marketType: data?.betPlaceData?.marketType,
                    myStack: data?.betPlaceData?.myStack,
                    amount:
                      data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                  };
                  const newBody = [body, ...updatedIObets];
                  dispatch(setAllBetRate(newBody));
                  return newBody;
                }
                dispatch(setAllBetRate(updatedIObets));
                return updatedIObets;
              });

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
              const newBody = {
                ...currentMatch,
                bettings: updatedBettings,
              };
              dispatch(setSelectedMatch(newBody));
              return newBody;
            });
          } catch (e) {
            console.log("error", e?.message);
          }
        }
        if (packet.data[0] === "matchDeleteBet") {
          const value = packet.data[1];
          try {
            setLocalAllBetRates((IObets) => {
              const updatedBettings = IObets?.map((betting) => {
                if (value?.betPlaceIds.includes(betting.id)) {
                  return {
                    ...betting,
                    deleted_reason: value?.deleted_reason,
                  };
                }
                return betting;
              });
              dispatch(setAllBetRate(updatedBettings));
              return updatedBettings;
            });
            const manualBookmaker = {
              matchId: value?.matchId,
              teamA: value?.teamA_rate,
              teamB: value?.teamB_rate,
              teamC: value?.teamC_rate,
            };
            dispatch(setManualBookMarkerRates(manualBookmaker));

            setLocalBookMakerRates((prev) => {
              const updatedAllBet = prev.map((currentMatch) => {
                if (currentMatch.match_id === value?.matchId) {
                  if (value?.betPlaceIds.includes(currentMatch.id)) {
                    return {
                      ...currentMatch,
                      deleted_reason: value?.deleted_reason,
                    };
                  }
                }
                return currentMatch;
              });
              dispatch(setBookMakerBetRate(updatedAllBet));
              return updatedAllBet;
            });

            // setBookMakerBetRate
            setTeamRates((prev) => {
              const newBody = {
                ...prev,
                teamA: value?.teamA_rate ? value?.teamA_rate : 0,
                teamB: value?.teamB_rate ? value?.teamB_rate : 0,
                teamC: value?.teamC_rate ? value?.teamC_rate : 0,
              };
              dispatch(setBookmakerTeamRates(newBody));
              return newBody;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "sessionDeleteBet") {
          const value = packet.data[1];
          try {
            setLocalSessionBets((prev) => {
              const updatedAllBet = prev.map((currentMatch) => {
                if (currentMatch.match_id === value?.matchId) {
                  if (value?.betPlaceData.includes(currentMatch.id)) {
                    return {
                      ...currentMatch,
                      deleted_reason: value?.deleted_reason,
                    };
                  }
                }
                return currentMatch;
              });
              let profitLoss = value?.profitLoss;
              dispatch(setSessionProfitLoss(profitLoss));
              dispatch(setSessionAllBet(updatedAllBet));
              return updatedAllBet;
            });
            setLocalAllBetRates((IObets) => {
              const updatedBettings = IObets?.map((betting) => {
                if (value?.betPlaceData.includes(betting.id)) {
                  return {
                    ...betting,
                    deleted_reason: value?.deleted_reason,
                  };
                }
                return betting;
              });
              dispatch(setAllBetRate(updatedBettings));
              return updatedBettings;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "resultDeclareForBet") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            setCurrentMatch((prev) => {
              if (prev.id === value?.match_id && value?.sessionBet === false) {
                navigate("/expert/match");
              }
              if (prev.id === value?.match_id && value?.sessionBet) {
                dispatch(setSessionProfitLoss(value?.profitLoss));
                const updatedBettings = prev?.bettings?.map((betting) => {
                  if (value?.betId === betting?.id && value?.sessionBet) {
                    return {
                      ...betting,
                      betStatus: 2,
                      betRestult: value.score,
                      profitLoss: value?.profitLoss,
                    };
                  }
                  return betting;
                });

                const newBody = { ...prev, bettings: updatedBettings };

                dispatch(setSelectedMatch(newBody));
                return newBody;
              }

              return prev;
            });

            setAllLiveEventSession((prev) => {
              var updatedPrev = prev?.map((item) => {
                if (item.id === value?.match_id && value?.sessionBet) {
                  const updatedBettings = item.bettings.filter(
                    (betting) => betting.id !== value?.betId
                  );
                  return { ...item, bettings: updatedBettings };
                }

                return item;
              });

              const newUpdatedPrev = updatedPrev?.filter(
                (v) => !(v.id === value?.match_id && value.sessionBet === false)
              );
              dispatch(setAllEventSession(newUpdatedPrev));

              return newUpdatedPrev;
            });

            // setLocalAllMatches((prev) => {
            //   const filteredMatches = prev.filter(
            //     (v) => !(v.id === value?.match_id && value.sessionBet === false)
            //   );
            //   dispatch(setUserAllMatches(filteredMatches));
            //   return filteredMatches;
            // });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "newMatchAdded") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            setLocalAllMatches((prev) => {
              const newBody = [value, ...prev];
              dispatch(setUserAllMatches(newBody));
              return newBody;
            });

            setAllLiveEventSession((prev) => {
              const body = {
                bettings: [],
                bookmakers: value.bookmakerA,
                gameType: value.match.gameType,
                id: value.match.id,
                teamA: value.match.teamA,
                teamB: value.match.teamB,
                teamC: value.match.teamC,
                title: value.match.title,
              };
              const newBody = [...prev, body];
              dispatch(setAllEventSession(newBody));
              return newBody;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "updateRate_user") {
          const data = packet.data[1];

          if (selectedBookmaker?.id === data?.id) {
            if (!data?.lock) {
              if (data?.isTab) {
                // setIsTeamBackUnlock(false);
                setLocalQuickBookmaker((prev) => {
                  const newBody = {
                    ...prev,
                    teamA: {
                      rate: data.teamA_Back,
                      suspended: data.teamA_suspend,
                      lock: data?.teamA_suspend,
                      lay: data?.teamA_lay !== "" ? data?.teamA_lay : null,
                      layLock: true,
                    },
                    teamB: {
                      rate: data.teamB_Back,
                      suspended: data.teamB_suspend,
                      lock: data?.teamB_suspend,
                      lay: data?.teamB_lay !== "" ? data?.teamB_lay : null,
                      layLock: true,
                    },
                    teamC: {
                      rate: data.teamC_Back,
                      suspended: data.teamC_suspend,
                      lock: data?.teamC_suspend,
                      lay: data?.teamC_lay !== "" ? data?.teamC_lay : null,
                      layLock: true,
                    },
                    teamSuspended: {
                      teamA_suspend: data?.teamA_suspend,
                      teamB_suspend: data?.teamB_suspend,
                      teamC_suspend: data?.teamC_suspend,
                    },
                    teamBackUnlock: false,
                  };
                  dispatch(setQuickBookmaker(newBody));
                  return newBody;
                });
              } else {
                setLocalQuickBookmaker((prev) => {
                  const newBody = {
                    ...prev,
                    teamA: {
                      rate: data.teamA_Back,
                      suspended: data.teamA_suspend,
                      lock: data?.teamA_suspend,
                      lay: data?.teamA_lay,
                      layLock: false,
                    },
                    teamB: {
                      rate: data.teamB_Back,
                      suspended: data.teamB_suspend,
                      lock: data.teamB_suspend,
                      lay: data?.teamB_lay,
                      layLock: false,
                    },
                    teamC: {
                      rate: data.teamC_Back,
                      suspended: data.teamC_suspend,
                      lock: data.teamC_suspend,
                      lay: data?.teamC_lay,
                      layLock: false,
                    },
                    teamBall: {
                      isABall: false,
                      isBBall: false,
                      isCBall: false,
                    },
                    teamSuspended: {
                      teamA_suspend: data?.teamA_suspend,
                      teamB_suspend: data?.teamB_suspend,
                      teamC_suspend: data?.teamC_suspend,
                    },
                    teamBackUnlock: false,
                  };
                  dispatch(setQuickBookmaker(newBody));
                  return newBody;
                });
              }
            } else {
              if (data.teamA_suspend == "Ball Started") {
                setLocalQuickBookmaker((prev) => {
                  const newBody = {
                    ...prev,

                    teamBall: {
                      isABall: true,
                      isBBall: true,
                      isCBall: true,
                    },
                  };
                  dispatch(setQuickBookmaker(newBody));
                  return newBody;
                });
              } else {
                setLocalQuickBookmaker((prev) => {
                  const newBody = {
                    ...prev,
                    teamA: {
                      rate: prev?.teamA?.teamA_Back,
                      suspended: data.teamA_suspend,
                      lock: prev?.teamA?.teamA_suspend,
                      lay: prev?.teamA?.teamA_lay,
                      layLock: false,
                    },
                    teamB: {
                      rate: prev?.teamB?.teamB_Back,
                      suspended: data?.teamB_suspend,
                      lock: prev?.teamB?.teamB_suspend,
                      lay: prev?.teamB?.teamB_lay,
                      layLock: false,
                    },
                    teamC: {
                      rate: prev?.teamC?.teamC_Back,
                      suspended: data.teamC_suspend,
                      lock: prev?.teamC?.teamC_suspend,
                      lay: prev?.teamC?.teamC_lay,
                      layLock: false,
                    },
                    teamBall: {
                      isABall: false,
                      isBBall: false,
                      isCBall: false,
                    },
                    teamSuspended: {
                      teamA_suspend: data?.teamA_suspend,
                      teamB_suspend: data?.teamB_suspend,
                      teamC_suspend: data?.teamC_suspend,
                    },
                    teamBackUnlock: true,
                  };
                  dispatch(setQuickBookmaker(newBody));
                  return newBody;
                });
              }
            }
          }
        }
      };
    }
  }, [socket, betId, match_id, selectedBookmaker]);

  useEffect(() => {
    if (activeUsers !== 0) {
      setOnlineUser(activeUsers);
    }
  }, [activeUsers]);

  useEffect(() => {
    setAllMatchData(allMatch);
  }, [allMatch]);

  let { transPass, axios, role, JWT } = setRole();

  const { globalStore, setGlobalStore } = useContext(GlobalStore);

  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");
      if (!data.data.loginAt) {
        // navigate("/expert");
        dispatch(logoutMatchDetails());
        dispatch(logoutCurrentUser());
        dispatch(logoutAuth());
        dispatch(logoutExpertDetails());
        sessionStorage.removeItem("JWTexpert");
        setGlobalStore((prev) => ({
          ...prev,
          expertJWT: "",
          isSession: true,
        }));
        removeSocket();
        navigate("/expert");
        await axios.get("auth/logout");
      } else {
        localStorage.setItem("role3", "role3");
        dispatch(setCurrentUser(data.data));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserCount() {
    try {
      const { data } = await axios.get("/users/onlineUserCount");
      setOnlineUser(data?.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // User returned to the web browser
        console.log("User returned from sleep mode 111");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {};

    const handleLoad = (event) => {
      let jwtS = sessionStorage.getItem("JWTexpert");
      let jwtL = localStorage.getItem("JWTexpert");
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
          // navigate("/expert");//add
          dispatch(removeManualBookMarkerRates());
          socketMicro?.disconnect();
          socket?.disconnect();
          dispatch(removeSelectedMatch());
          setGlobalStore((prev) => ({
            ...prev,
            expertJWT: "",
            isSession: true,
          }));
          // await axios.get("auth/logout");
          removeSocket();
          localStorage.setItem("role3", "role3");
        }

        console.log("jwtSDecoded,jwtLDecoded", jwtSDecoded, jwtLDecoded);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // localStorage.removeItem("role3");//add
    };

    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Your existing code within the event handler
    let checkLoStorage = localStorage.getItem("role3");
    let checkSeStorage = sessionStorage.getItem("JWTexpert");
    if (checkSeStorage && checkLoStorage === null) {
      localStorage.setItem("role3", "role3");
    }
  }, [localStorage]);

  useEffect(() => {
    setTimeout(() => {
      setFirstTimeLoader(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("home")) {
      dispatch(setSelected(0));
    } else if (location.pathname.includes("match")) {
      dispatch(setSelected(null));
    } else if (location.pathname.includes("betodds")) {
      dispatch(setSelected(2));
    }
    setIsTransPasswordExist(userExpert?.isTransPasswordCreated);
  }, [location, userExpert]);

  useEffect(() => {
    getUserCount();
    getMatchLiveSession();
    if (allMatchData.length === 0) {
      // getAllMatch();
    }
  }, []);

  const getMatchLiveSession = async () => {
    try {
      let response = await axios.get(`/game-match/getLiveMatchSession`);
      // setAllLiveEventSession(response.data.data[0]);
      dispatch(setAllEventSession(response.data.data[0]));
      setAllMatchData(response.data.data[0]);
      dispatch(setAllMatchs(response.data.data[0]));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser === null) {
      getUserDetail();
    }
  }, []);

  const handleAddNotification = async (val) => {
    try {
      const { data } = await axios.post(`/users/addNotification`, {
        typeValue: val,
      });
      if (data?.data?.id) {
        toast.success("Updated successfully");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err?.response.data.message);
      console.log(err.message);
    }
  };
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
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <IdleTimer role="" />
        <AddNotificationModal
          setVisible={setVisible}
          visible={visible}
          onClick={() => {}}
          onDone={(value) => {
            handleAddNotification(value);
          }}
        />
        <Box
          sx={[
            {
              width: "100%",
              minHeight: { laptop: 66, tablet: 80, mobile: 60 },
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
          ]}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "12px",
              }}
            >
              <StyledImage
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
                src={Draw}
                sx={{
                  height: { laptop: "24px", mobile: "20px" },
                  width: "auto",
                }}
              />
              <StyledImage
                src={logo}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/expert/match`);
                }}
                sx={{
                  cursor: "pointer",
                  height: { laptop: "45px", mobile: "40px" },
                  width: "auto",
                  marginLeft: { laptop: "20px", mobile: "10px" },
                }}
              />
            </Box>
            {activeUser != 1 && activeUser != "2" && (
              <ButtonHead
                onClick={(e) => {
                  dispatch(setSelected(0));
                  navigate("/expert/home");
                }}
                title={"ADD MATCH"}
                boxStyle={{
                  backgroundColor:
                    currentSelected == 0 ? "white" : "transparent",
                  py: "5px",
                  borderRadius: "5px",
                  marginLeft: "15px",
                }}
                titleStyle={{ color: currentSelected == 0 ? "green" : "white" }}
              />
            )}
            {(activeUser == 1 || activeUser == "2" || activeUser == "3") && (
              <>
                <ButtonHead
                  onClick={(e) => {
                    dispatch(setSelected(1));
                    if (activeUser == "3") {
                      return;
                    }
                    setAnchor(e.currentTarget);
                  }}
                  title={"ALL MATCH"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 1 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                  titleStyle={{
                    color: currentSelected == 1 ? "green" : "white",
                  }}
                />
                {activeUser != "3" && (
                  <ButtonHead
                    onClick={(e) => {
                      dispatch(setSelected(5));
                      if (window.location.pathname.split("/")[2] == "live") {
                        return;
                      }
                      navigate("/expert/live");
                    }}
                    title={"ALL BET"}
                    boxStyle={{
                      backgroundColor:
                        currentSelected == 5 ? "white" : "transparent",
                      py: "5px",
                      borderRadius: "5px",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                    titleStyle={{
                      color: currentSelected == 5 ? "green" : "white",
                    }}
                  />
                )}
                {
                  <ButtonHead
                    onClick={(e) => {
                      dispatch(setSelected(4));
                      if (window.location.pathname.split("/")[2] == "match") {
                        return;
                      }
                      navigate("/expert/match");
                    }}
                    title={"MATCH LIST"}
                    boxStyle={{
                      backgroundColor:
                        window.location.pathname.split("/")[2] == "match"
                          ? "white"
                          : "transparent",
                      py: "5px",
                      borderRadius: "5px",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                    titleStyle={{
                      color:
                        window.location.pathname.split("/")[2] == "match"
                          ? "green"
                          : "white",
                    }}
                  />
                }
              </>
            )}
            {activeUser != 1 && activeUser !== "2" && (
              <>
                <ButtonHead
                  selected={currentSelected == 2}
                  onClick={(e) => {
                    dispatch(setSelected(2));
                    navigate("/expert/betodds");
                  }}
                  title={"BETFAIR ODDS"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 2 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                  }}
                  titleStyle={{
                    color: currentSelected == 2 ? "green" : "white",
                  }}
                />
                <ButtonHead
                  onClick={() => {
                    dispatch(setSelected(3));
                  }}
                  title={"QUICK BOOKMAKER"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 3 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                  }}
                  titleStyle={{
                    color: currentSelected == 3 ? "green" : "white",
                  }}
                />
                <ButtonHead
                  onClick={() => {
                    dispatch(setSelected(4));
                  }}
                  title={"MANUAL SESSION"}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 4 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                  }}
                  titleStyle={{
                    color: currentSelected == 4 ? "green" : "white",
                  }}
                />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: matchesMobile ? "100%" : "0px",
              alignItems: "center",
              marginTop: matchesMobile ? "15px" : "0px",
            }}
          >
            <Box
              onClick={() => {
                setVisible(true);
              }}
              sx={{
                height: "45px",
                width: "45px",
                borderRadius: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
              }}
            >
              <StyledImage
                src={NotiBadge}
                sx={{ height: "25px", width: "25px" }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ActiveUsers
                containerStyle={{}}
                image={Users}
                value={onlineUser}
              />
              <BoxProfile
                containerStyle={{ marginTop: "0" }}
                image={"https://picsum.photos/200/300"}
                value={
                  activeUser == 1
                    ? "Session"
                    : activeUser == 2
                    ? "Bookmaker"
                    : "Betfair"
                }
                value1={localCurrentUser?.userName || ""}
              />
            </Box>
          </Box>
        </Box>
      </AppBar>
      {isTransPasswordExist === "false" &&
        !/createTransPassword/.test(window.location.pathname) && (
          <ThisUseModal
            message="You don't have transaction password"
            buttonMessage="Create Transaction Password"
            navigateTo="createTransPassword"
          />
        )}
      <Box sx={{ minHeight: { laptop: 66, mobile: 60 + 32 + 42 } }} />
      <DropdownMenu1
        anchorEl={anchor}
        open={Boolean(anchor)}
        allMatch={allLiveEventSession}
        handleClose={() => {
          setAnchor(null);
        }}
        allLiveEventSession={allLiveEventSession}
      />
      {console.log("allMatchData", allEventSession)}
    </>
  );
};

export default memo(CustomHeader);
