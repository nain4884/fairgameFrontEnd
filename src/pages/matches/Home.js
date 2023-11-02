import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socketContext";
import { setRole } from "../../newStore";
import { useEffect } from "react";
import _ from "lodash";
import {
  setAllSessionBets,
  setManualBookMarkerRates,
  setSelectedMatch,
  setAllBetRate,
  setManualBookmaker,
  setSessionExposure,
  setSelectedSessionBettings,
  setQuickSession,
  setQuickBookmaker,
  setMatchButtonData,
  setSessionButtonData,
  setRefreshForBets,
} from "../../newStore/reducers/matchDetails";
import {
  apiMatchScore,
  microServiceApiPath,
} from "../../components/helper/constants";
import Axios from "axios";
import { MatchOdds } from "../../components";
import MatchComponent from "../../components/MathComponent";
import LiveMatchHome from "../../components/LiveMatchHome";
import AllRateSeperate from "../../components/AllRateSeperate";
import SessionBetSeperate from "../../components/sessionBetSeperate";
import BetPlaced from "../../components/BetPlaced";
import { memo } from "react";
import { setGeoLocation } from "../../newStore/reducers/auth";
import CustomLoader from "../../components/helper/CustomLoader";
import { toast } from "react-toastify";

// let sessionOffline = [];
let matchOddsCount = 0;
const Home = ({ setVisible, visible, handleClose, selected }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fastAmount, setFastAmount] = useState({
    bookMaker: 0,
    // mannualBookMaker: 0,
    QuickBookmaker0: 0,
    QuickBookmaker1: 0,
    QuickBookmaker2: 0,
    sessionOdds: 0,
  });

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const {
    allBetRates,
    allSessionBets,
    sessionExposure,
    selectedMatch,
    manualBookmaker,
    sessionOffline,
    selectedSessionBettings,
    quickSession,
    refreshForBets,
  } = useSelector((state) => state?.matchDetails);
  const [IObets, setIObtes] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const id = location?.state?.matchId;
  // const [matchDetail, setMatchDetail] = useState();
  const [marketId, setMarketId] = useState("");
  const [eventId, setEventId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [currentMatch, setCurrentMatch] = useState([]);

  const [bookMakerRateLive] = useState(currentMatch?.bookMakerRateLive);
  const { socketMicro } = useContext(SocketContext);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  // const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [LSelectedSessionBetting, setLSelectedSessionBetting] = useState([]);
  const [localQuickSession, setLocalQuickSession] = useState([]);
  const [liveScoreData, setLiveScoreData] = useState();
  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const { axios } = setRole();
  const [matchId] = useState(id || sessionStorage.getItem("matchId"));

  const [localSessionExposer, setLocalSessionExposure] = useState(0);
  // const [sessionLock, setSessionLock] = useState(false);
  const { geoLocation } = useSelector((state) => state.auth);
  const [sessionOff, setSessionOff] = useState([]);
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
    try {
      if (geoLocation === null) {
        FetchIpAddress().then((res) => {
          dispatch(setGeoLocation(res));
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      if (allBetRates) {
        setIObtes(allBetRates);
      }
      if (allSessionBets) {
        setSessionBets(allSessionBets);
      }
      if (selectedMatch) {
        setCurrentMatch((prev) => {
          const updatedMatch = { ...prev, ...selectedMatch };
          if (JSON.stringify(updatedMatch) !== JSON.stringify(prev)) {
            return updatedMatch;
          }
          return prev;
        });
      }

      // if (manualBookmaker) {
      //   setManualBookmakerData(manualBookmaker);
      // }
      if (sessionOffline) {
        setSessionOff(sessionOffline);
      }

      if (selectedSessionBettings) {
        setLSelectedSessionBetting(selectedSessionBettings);
      }

      if (quickSession) {
        setLocalQuickSession(quickSession);
      }
      setLocalSessionExposure(sessionExposure);
    } catch (e) {
      console.log(e);
    }
  }, [
    allBetRates,
    allSessionBets,
    sessionExposure,
    selectedMatch,
    manualBookmaker,
    sessionOffline,
    selectedSessionBettings,
    quickSession,
  ]);

  const handleSession = (val) => {
    try {
      if (val === null || matchId !== checkMctchId) {
        return;
      }
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
          setLSelectedSessionBetting((prev) => {
            const data = prev?.map((betting) => {
              const selectedData = newVal?.find(
                (nv) => nv?.selectionId === betting?.selectionId
              );

              return {
                ...betting,
                bet_condition:
                  selectedData?.bet_condition || betting?.bet_condition,
                no_rate: selectedData?.no_rate ?? 0,
                yes_rate: selectedData?.yes_rate ?? 0,
                rate_percent:
                  selectedData?.rate_percent || betting?.rate_percent,
                suspended: selectedData?.suspended || "",
                selectionId: selectedData?.selectionId || betting?.selectionId,
              };
            });

            dispatch(setSelectedSessionBettings(data));
            return data;
          });
        }
        return currentMatch;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const debounceSession = _.debounce(handleSession, 300);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on("connect", () => {
          socketMicro.emit("init", { id: marketId });

          socketMicro.emit("score", { id: eventId });
          activateLiveMatchMarket();
          // setSessionLock(false);
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
          // setSessionLock(true);
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
          // setSessionLock(false);
        });

        socketMicro.on(`session${marketId}`, debounceSession);
        socketMicro.on(`matchOdds${marketId}`, (val) => {
          // matchodds Market live and stop disable condition
          try {
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
          } catch (e) {
            console.log(e);
          }
        });
        socketMicro.on(`bookmaker${marketId}`, (val) => {
          try {
            if (val !== null) {
              if (val.length > 0) {
                setBookmakerLive(val[0]);
              } else {
                setBookmakerLive([]);
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
        // socketMicro.on(`liveScore${eventId}`, (val) => {
        //   try {
        //     if (val !== null) {
        //       setLiveScoreData(val);
        //       if (val) {
        //         setLiveScoreData(val);
        //       } else {
        //         setLiveScoreData();
        //       }
        //     }
        //   } catch (e) {
        //     console.log(e);
        //   }
        // });
      } else {
        setMacthOddsLive([]);
        setBookmakerLive([]);
        // setSessionLock(false);
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      try {
        socketMicro?.emit("disconnect_market", {
          id: marketId,
        });
        socketMicro?.emit("leaveScore", { id: eventId });
        setMacthOddsLive([]);
        setBookmakerLive([]);
        // setSessionLock(false);
      } catch (e) {
        console.log(e);
      }
    };
  }, [socketMicro, marketId]);

  async function getAllBetsData1() {
    let payload = {
      match_id: id,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      const allrates = data?.data?.data?.filter((b) =>
        [
          "MATCH ODDS",
          "BOOKMAKER",
          "MANUAL BOOKMAKER",
          "QuickBookmaker0",
          "QuickBookmaker1",
          "QuickBookmaker2",
        ].includes(b?.marketType)
      );
      setIObtes(allrates);

      dispatch(setAllBetRate(allrates));
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
      setSessionBets(bets);
      dispatch(setAllSessionBets(bets));
      setTimeout(() => {
        dispatch(setRefreshForBets(false));
      }, 1000);
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        dispatch(setRefreshForBets(false));
      }, 1000);
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
      dispatch(setQuickBookmaker(response?.data?.bookmakers));
      dispatch(setQuickSession(quickSessionDataTemp));
      dispatch(setSelectedSessionBettings(updateLiveSesssion));
      dispatch(setManualBookmaker(matchOddsDataTemp));
      dispatch(setSessionExposure(response?.data?.sessionExposure));
      setLocalSessionExposure(response?.data?.sessionExposure);
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
      // setMatchDetail(response.data);
      // dispatch(
      //   setAllSessionBets(
      //     response?.data?.betting?.filter((v) => v?.sessionBet === true) || []
      //   )
      // );
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
    dispatch(setMatchButtonData([]));
    dispatch(setSessionButtonData([]));
    try {
      const { data } = await axios.get("/users/getButtonValues");
      if (data?.data[0]?.type === "Match") {
        const initialData = data?.data[0]?.buttons;
        const jsonObject = JSON.parse(initialData);
        const resultArray = Object.entries(jsonObject).map(
          ([lable, value]) => ({
            lable: lable,
            value: value,
          })
        );
        resultArray.sort(customSort);
        dispatch(setMatchButtonData(resultArray));
        //separate
        const initialData1 = data?.data[1]?.buttons; // Replace this with your initial data
        const jsonObject1 = JSON.parse(initialData1);
        const resultArray1 = Object.entries(jsonObject1).map(
          ([lable, value]) => ({
            lable: lable,
            value: value,
          })
        );
        resultArray1.sort(customSort);
        dispatch(setSessionButtonData(resultArray1));
      } else if (data?.data[0]?.type === "Session") {
        const initialData = data?.data[0]?.buttons; // Replace this with your initial data
        const jsonObject = JSON.parse(initialData);
        const resultArray = Object.entries(jsonObject).map(
          ([lable, value]) => ({
            lable: lable,
            value: value,
          })
        );
        resultArray.sort(customSort);
        dispatch(setSessionButtonData(resultArray));

        //separate
        const initialData1 = data?.data[1]?.buttons; // Replace this with your initial data
        const jsonObject1 = JSON.parse(initialData1);
        const resultArray1 = Object.entries(jsonObject1).map(
          ([lable, value]) => ({
            lable: lable,
            value: value,
          })
        );
        resultArray1.sort(customSort);
        dispatch(setMatchButtonData(resultArray1));
      }
      // setButtonData(resultArray);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    try {
      if (matchId) {
        getThisMatch(matchId);
      }
      // getAllBetsData();
      // getAllBetsData1();
      getButtonList();
    } catch (e) {
      console.log(e);
    }
  }, [matchId, getThisMatch, getButtonList]);

  useEffect(() => {
    if (refreshForBets) {
      getAllBetsData1();
    }
  }, [refreshForBets, getAllBetsData1]);

  const handleRateChange = async () => {
    getThisMatch(matchId);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      try {
        if (document.visibilityState === "visible") {
          // User returned to the web browser
          if (matchId) {
            // if (socket && socket.connected) {
            //   socket.emit("checkConnection");
            // }
            getThisMatch(matchId);
          }
        }
      } catch (e) {
        console.log(e);
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
        console.log(e);
      }
    };
  }, [matchId, getThisMatch]);

  // const getScoreBord = async (eventId) => {
  //   // alert(1)
  //   try {
  //     const response = await Axios.get(
  //       `https://super007.in/api/MatchOdds/score/${eventId}`
  //     );
  //     // Handle the API response here
  //     console.log("API Response:", response.data);
  //   } catch (e) {
  //     console.log("Error:", e?.message);
  //   }
  // };

  useEffect(() => {
    if (marketId) {
      const fetchMatchScore = async () => {
        try {
          const { data } = await axios.get(
            `${apiMatchScore}/score/getMatchScore/${marketId}`
          );
          setLiveScoreData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchMatchScore();

      const intervalId = setInterval(fetchMatchScore, 300);

      return () => clearInterval(intervalId);
    }
  }, [marketId]);

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
              <div style={{ width: "100%" }}>
                <MatchComponent
                  currentMatch={currentMatch}
                  liveScoreData={liveScoreData}
                />
              </div>
              <div style={{ width: "100%" }}>
                <MatchOdds
                  localQuickSession={localQuickSession}
                  LSelectedSessionBetting={LSelectedSessionBetting}
                  sessionBets={sessionBets}
                  setFastAmount={setFastAmount}
                  fastAmount={fastAmount}
                  matchOddsLive={matchOddsLive}
                  sessionExposer={localSessionExposer}
                  bookmakerLive={bookmakerLive}
                  onClick={() => handleClose(true)}
                  bookMakerRateLive={bookMakerRateLive}
                  data={currentMatch}
                  sessionOffline={sessionOff}
                  // dataProfit={currentMatchProfit}
                  allBetsData={sessionBets}
                  // manualBookmakerData={manualBookmakerData}
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
                  <SessionBetSeperate allBetsData={sessionBets} mark />
                  {IObets.length > 0 && (
                    <AllRateSeperate
                      allBetsData={IObets?.filter((v) =>
                        [
                          "MATCH ODDS",
                          "BOOKMAKER",
                          "MANUAL BOOKMAKER",
                          "QuickBookmaker0",
                          "QuickBookmaker1",
                          "QuickBookmaker2",
                        ]?.includes(v.marketType)
                      )}
                      count={
                        IObets?.filter((v) =>
                          [
                            "MATCH ODDS",
                            "BOOKMAKER",
                            "MANUAL BOOKMAKER",
                            "QuickBookmaker0",
                            "QuickBookmaker1",
                            "QuickBookmaker2",
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
                  localQuickSession={localQuickSession}
                  sessionBets={sessionBets}
                  LSelectedSessionBetting={LSelectedSessionBetting}
                  sessionExposer={localSessionExposer}
                  setFastAmount={setFastAmount}
                  fastAmount={fastAmount}
                  matchOddsLive={matchOddsLive}
                  bookmakerLive={bookmakerLive}
                  sessionOffline={sessionOff}
                  onClick={() => handleClose(true)}
                  data={currentMatch}
                  // dataProfit={currentMatchProfit}
                  allBetsData={allSessionBets}
                  // manualBookmakerData={manualBookmakerData}
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
                    [
                      "MATCH ODDS",
                      "BOOKMAKER",
                      "MANUAL BOOKMAKER",
                      "QuickBookmaker0",
                      "QuickBookmaker1",
                      "QuickBookmaker2",
                    ]?.includes(v.marketType)
                  )}
                  count={
                    IObets?.filter((v) =>
                      [
                        "MATCH ODDS",
                        "BOOKMAKER",
                        "MANUAL BOOKMAKER",
                        "QuickBookmaker0",
                        "QuickBookmaker1",
                        "QuickBookmaker2",
                      ]?.includes(v.marketType)
                    ).length
                  }
                  mark
                />
                <SessionBetSeperate allBetsData={sessionBets} mark />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(Home);
