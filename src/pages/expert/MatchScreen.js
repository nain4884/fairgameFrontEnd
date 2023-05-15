import React, { memo, useCallback, useContext, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Typography, Box } from "@mui/material";

import "../../components/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import AllBets from "../../components/AllBets";
import { Background, CustomHeader as CHeader } from "../../components/index";
import CustomHeader from "./Header";
import { SocketContext } from "../../context/socketContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setAllBetRate,
  setManualBookMarkerRates,
} from "../../newStore/reducers/matchDetails";

import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { setRole } from "../../newStore";
import BookMarketer from "./BookMarketer";
import SessionMarket from "./SessionMarket/SessionMarket";
import RunsBox from "./RunsBox";
import MatchOdds from "./MatchOdds/MatchOdds";
import DropdownMenu from "./DropdownMenu";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import { logout } from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import SessionMarketLive from "../expert/SessionMarket/LiveSessionMarket/SessionMarketLive";
let matchOddsCount = 0;
let marketId = "";
const MatchScreen = () => {
  const [data, setData] = useState([]);
  const { socket, socketMicro } = useContext(SocketContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { axios } = setRole();
  const dispatch = useDispatch();
  const { allBetRates } = useSelector((state) => state?.matchDetails);
  const { selectedMatch } = useSelector((state) => state?.expertMatchDetails);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [IObets, setIObtes] = useState(allBetRates);
  const [bookmakerLivedata, setBookmakerLiveData] = useState([]);
  const [matchOddsLive, setMatchOddsLive] = useState([]);
  const [localState, setLocalState] = useState(null);
  const [liveData, setLiveData] = useState([]);
  const { currentUser } = useSelector((state) => state?.currentUser);

  const { globalStore, setGlobalStore } = useContext(GlobalStore);

  const getSingleMatch = async (val) => {
    try {
      // dispatch(removeSelectedMatch());
      // setCurrentMatch({});
      const { data } = await axios.get(`game-match/matchDetail/${val}`);
      const newMatch = { ...data, bettings: data?.bettings?.reverse() };
      setCurrentMatch(newMatch);
      marketId = data?.marketId;
      // dispatch(setSelectedMatch(data));
    } catch (e) {
      console.log(e?.message, "message");
    }
  };
  useEffect(() => {
    if (state?.id) {
      getSingleMatch(state.id);
      getAllBetsData(state?.id);
    }
  }, [state?.id]);

  useEffect(() => {
    if (localState?.id) {
      setCurrentMatch((currentMatch) => ({ ...currentMatch, ...localState }));
      setLocalState(null);
    }
  }, [localState]);

  useEffect(() => {
    console.log("socket", socket);
    if (socket && socket.connected && currentMatch !== null) {
      console.log("BookMaker", socket);
      socket.onevent = async (packet) => {
        console.log(`Received event: ${packet.data[0]}`, packet.data[1]);
        if (packet.data[0] === "logoutUserForce") {
          console.log(`Received event: ${packet.data[0]}`, packet.data[1]);
          dispatch(removeManualBookMarkerRates());
          dispatch(removeCurrentUser());
          dispatch(logout({ roleType: "role3" }));
          dispatch(removeSelectedMatch());
          setGlobalStore((prev) => ({ ...prev, expertJWT: "" }));
          await axios.get("auth/logout");
          removeSocket();
          navigate("/expert");
        }

        if (packet.data[0] === "match_bet") {
          const data = packet.data[1];
          try {
            // getAllBets();
            // console.warn(data, "MATCHH_BET");
            if (data) {
              const manualBookmaker = {
                matchId: data?.betPlaceData?.match_id,
                teamA: data.teamA_rate,
                teamB: data.teamB_rate,
              };

              console.log(
                "currentMatch?.i",
                currentMatch?.id,
                data?.betPlaceData?.match_id
              );
              setIObtes((prev) => {
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
                    rate: data?.betPlaceData?.rate,
                    marketType: data?.betPlaceData?.marketType,
                    amount:
                      data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                  };
                  return [body, ...prev];
                }
                return prev;
              });

              dispatch(setManualBookMarkerRates(manualBookmaker));
            }
          } catch (e) {
            console.log("error", e?.message);
          }
        }

        if (packet.data[0] === "bookMakerRateLive") {
          const e = packet.data[1];
          if (e?.matchId === currentMatch?.id) {
            const body = {
              ...currentMatch,
              bookMakerRateLive: e?.bookMakerLive,
            };
            setCurrentMatch(body);
          }
        }

        if (packet.data[0] === "matchOddRateLive") {
          const e = packet.data[1];
          if (e?.matchId === currentMatch?.id) {
            const body = {
              ...currentMatch,
              matchOddRateLive: e?.matchOddLive,
            };
            setCurrentMatch(body);
          }
        }
        if (packet.data[0] === "newBetAdded") {
          const value = packet.data[1];
          try {
            setLiveData((liveData) =>
              liveData?.filter((v) => v.betStatus !== 1)
            );

            setLiveData((liveData) => {
              liveData?.map((val) => {
                if (val?.selectionId === data?.selectionId) {
                  return {
                    ...val,
                    betStatus: 1, // update betStatus to 1
                  };
                }
                return val;
              });
            });
            setCurrentMatch((currentMatch) => {
              var updatedBettings = currentMatch?.bettings.map((betting) => {
                if (
                  betting?.selectionId === value?.selectionId ||
                  betting?.id === value?.id
                ) {
                  return value;
                } else {
                  return betting;
                }
              });

              if (
                !updatedBettings.find(
                  (betting) =>
                    betting?.selectionId === value?.selectionId ||
                    betting?.id === value?.id
                )
              ) {
                updatedBettings.unshift(value);
              }

              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });
          } catch (e) {
            console.log(e.message);
          }
        }
        if (packet.data[0] === "session_bet") {
          const data = packet.data[1];
          //  console.log(data,"session_bet")
          try {
            // getAllBets();
            // console.log(
            //   currentMatch?.id,
            //   data?.betPlaceData?.match_id,
            //   "MATCHH_BET"
            // );
            if (data) {
              setIObtes((IObets) => {
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
                    rate: data?.betPlaceData?.rate,
                    marketType: data?.betPlaceData?.marketType,
                    amount:
                      data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                  };
                  return [body, ...IObets];
                }

                return IObets;
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
                // Return the updated current match object
                return {
                  ...currentMatch,
                  bettings: updatedBettings,
                };
              });

              // dispatch(setCurrentUser(user));
              // dispatch(setManualBookMarkerRates(manualBookmaker));
            }
          } catch (e) {
            console.log("error", e?.message);
          }
        }
      };

      // socket.emit("init", { id: currentMatch?.marketId });
    }
    // }, [socket, currentMatch]);
  }, [socket, currentMatch]);

  // console.log('currentMatch', currentMatch)
  const activateLiveMatchMarket = async (val) => {
    try {
      await Axios.get(`${microServiceApiPath}/market/${val}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  const handleMatchOdds = useCallback(
    (val) => {
      if (val.length === 0) {
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
    },
    [state?.marketId]
  );

  const handleBookmaker = useCallback(
    (val) => {
      if (val.length > 0) {
        setBookmakerLiveData(val[0]);
      }
    },
    [state?.marketId]
  );

  const handleSession = useCallback(
    (val) => {
      if (state?.marketId === marketId) {
        // add this check ignore duplicate rates
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

            const filteredNewVal =
              newVal?.filter((newData) => {
                const hasMatch = currentMatch?.bettings.some(
                  (betting) => betting.selectionId === newData.selectionId
                );
                // Return false to exclude newData from filteredNewVal if a match is found
                return !hasMatch;
              }) || [];

            // Merge the filteredNewVal with the currentMatch bettings array
            return { ...currentMatch, bettings: [...data, ...filteredNewVal] };
          }
          return { ...currentMatch, bettings: newVal };
        });
      }
    },
    [state?.marketId, marketId]
  );

  useEffect(() => {
    if (socketMicro?.connected && state?.marketId && marketId) {
      socketMicro.emit("init", { id: state?.marketId });
      socketMicro.on("reconnect", () => {
        socket.emit("init", { id: state?.marketId });
      });
      activateLiveMatchMarket(state?.marketId);
      sessionStorage.setItem("marketId", state?.marketId);
      socketMicro.on(`session${state?.marketId}`, handleSession);
      socketMicro.on(`matchOdds${state?.marketId}`, handleMatchOdds);
      socketMicro.on(`bookmaker${state?.marketId}`, handleBookmaker);
    }

    return () => {
      socketMicro?.emit("disconnect_market", { id: marketId });
      setMatchOddsLive([]);
      matchOddsCount = 0;
    };
  }, [socketMicro, state?.marketId, marketId, localState]);

  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      setIObtes(data?.data[0]);
      dispatch(setAllBetRate(data?.data[0]));
    } catch (e) {
      console.log(e);
    }
  }

  // console.log('IObets', IObets)
  return (
    <Background>
      {/* <CHeader /> */}
      <CustomHeader />
      <Box
        sx={{
          display: { laptop: "flex" },
          alignSelf: "center",
          borderRadius: "10px",
          flexDirection: "row",
          width: "100%",
          // marginX: ".5%",
          height: "100%",
          // marginTop: "5px",
          background: "white",
          padding: 1,
        }}
      >
        <Box
          sx={{
            width: { laptop: "60%", mobile: "100%", tablet: "100%" },
          }}
        >
          {(currentMatch?.apiSessionActive ||
            currentMatch?.manualSessionActive) && (
            <Box
              sx={{
                width: { laptop: "100%", mobile: "100%", tablet: "100%" },
                display: "flex",
                flexDirection: { tablet: "column", laptop: "row" },
              }}
            >
              <Box
                sx={{
                  width: { laptop: "40%", mobile: "100%", tablet: "100%" },
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
                  sessionData={[...currentMatch?.bettings]?.filter(
                    (e) => e?.sessionBet && !e?.id && e?.betStatus === 0
                  )}
                  setLocalState={setLocalState}
                  setCurrentMatch={setCurrentMatch}
                  currentMatch={currentMatch}
                  SessionMarket={SessionMarket}
                />
              </Box>
              <Box
                sx={{
                  width: { laptop: "60%", mobile: "100%", tablet: "100%" },
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
                  sessionData={[...currentMatch?.bettings]?.filter(
                    (element) => element?.sessionBet && element?.id
                  )}
                  hideResult={false}
                  setLocalState={setLocalState}
                  setCurrentMatch={setCurrentMatch}
                  currentMatch={currentMatch}
                  SessionMarket={SessionMarket}
                />
              </Box>
            </Box>
          )}

          {data?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: ".25vw",
              }}
            >
              {data?.map((v) => {
                return <RunsBox key={v?.id} item={v} setData={setData} />;
              })}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: { laptop: "40%", mobile: "100%", tablet: "100%" },
            flexDirection: "column",
            display: "flex",
          }}
        >
          {currentMatch?.apiMatchActive && (
            <MatchOdds
              socket={socket}
              matchOdds={
                [...currentMatch?.bettings].filter(
                  (v) => v?.sessionBet === false
                )[0] || null
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
                [...currentMatch?.bettings].filter(
                  (v) => v?.sessionBet === false
                )[0] || null
              }
              currentMatch={currentMatch}
              liveData={bookmakerLivedata}
            />
          )}
          <AllBets allBetRates={IObets} />
        </Box>
      </Box>
    </Background>
  );
};

export default memo(MatchScreen);
