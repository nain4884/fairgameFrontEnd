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
  setAllBetRate,
  setManualBookmaker,
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
  const {
    allBetRates,
    allSessionBets,
    sessionExposure,
    selectedMatch,
    manualBookmaker,
  } = useSelector((state) => state?.matchDetails);
  const [IObets, setIObtes] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const id = location?.state?.matchId;
  const [matchDetail, setMatchDetail] = useState();
  const [marketId, setMarketId] = useState("");
  const [eventId, setEventId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [currentMatch, setCurrentMatch] = useState([]);

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
    if (allBetRates.length > 0) {
      setIObtes(allBetRates);
    }
    if (allSessionBets.length > 0) {
      setSessionBets(allSessionBets);
    }

    if (sessionExposure) {
      setSessionExposure(sessionExposure);
    }
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }

    if (manualBookmaker) {
      setManualBookmakerData(manualBookmaker);
    }
  }, [
    allBetRates,
    allSessionBets,
    sessionExposure,
    selectedMatch,
    manualBookmaker,
  ]);

  

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
      const allrates = data?.data?.data?.filter((b) =>
        ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(b?.marketType)
      );
      setIObtes(allrates)
     
      dispatch(setAllBetRate(allrates));
      const bets = data?.data?.data?.filter(
        (b) =>
          !["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
      );
      setSessionBets(bets) 
      dispatch(setAllSessionBets(bets));
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
      dispatch(setManualBookmaker(matchOddsDataTemp));
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
      // setMarketId(response.data.marketId);
      setEventId(response.data.EventId);
      activateLiveMatchEvent(response?.data?.EventId);
      setMatchDetail(response.data);
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
      const response = await Axios.get(`https://super007.in/api/MatchOdds/score/${eventId}`);
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
