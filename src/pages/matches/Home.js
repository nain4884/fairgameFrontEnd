import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigation } from "react-router-dom";
import { SocketContext } from "../../context/socketContext";
import { setRole } from "../../newStore";
import { useEffect } from "react";
import { setCurrentUser } from "../../newStore/reducers/currentUser";
import {
  setAllBetRate,
  setAllSessionBets,
  setManualBookMarkerRates,
  setSelectedMatch,
  setSessionRates,
} from "../../newStore/reducers/matchDetails";
import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { MatchOdds } from "../../components";
import MatchComponent from "../../components/MathComponent";
import LiveMatchHome from "../../components/LiveMatchHome";
import AllRateSeperate from "../../components/AllRateSeperate";
import SessionBetSeperate from "../../components/sessionBetSeperate";
import Lottie from "lottie-react";
import { HourGlass } from "../../assets";
import BetPlaced from "../../components/BetPlaced";
import EventListing from "../../components/EventListing";
import { memo } from "react";

let session = [];
let matchOddsCount = 0;
const Home = ({ activeTab, setSelected, setVisible, visible, handleClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [sessionbets, setSessionBets] = useState([]);
  const { allBetRates, allSessionBets } = useSelector(
    (state) => state?.matchDetails
  );
  const [IObets, setIObtes] = useState(allBetRates);
  const id = location.state;
  const [matchDetail, setMatchDetail] = useState();
  const [matchOddsData, setMatchOddsData] = useState([]);
  const [matchSessionData, setMatchSessionData] = useState([]);
  const [allBetsData, setAllBetsData] = useState([]);
  const [marketId, setMarketId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { selectedMatch } = useSelector((state) => state?.matchDetails);
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);
  const [bookMakerRateLive, setBookMakerLive] = useState(
    currentMatch?.bookMakerRateLive
  );
  // const [liveSssionOdd,setLiveSessionOdd] = useState(currentMatch?.)
  const { socket, socketMicro } = useContext(SocketContext);

  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [isHandled, setIsHandled] = useState(false);
  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const { axios, role } = setRole();
  var matchId = id;

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newMessage", (value) => {
        console.log(value);
      });
      socket.on("session_bet", (data) => {
        // console.warn("SESSION Response", data?.betPlaceData);
        const user = {
          ...currentUser,
          current_balance: data.newBalance,
          exposure: data.exposure,
        };
        // alert(JSON.stringify(data?.betPlaceData))
        // console.warn("data?.betPlaceData :", data?.betPlaceData)
        session = [...allSessionBets];
        session.unshift(data?.betPlaceData);
        dispatch(setCurrentUser(user));
        dispatch(setAllSessionBets(session));
        dispatch(setSessionRates(data?.profitLoss));
      });

      socket.on("match_bet", (data) => {
        if (!isHandled) {
          setIsHandled(true);
          try {
            // console.warn(data, "check rates");
            // getAllBets();
            // console.log(data, "MATCHH_BET", data?.betPlaceData?.match_id, id);
            if (data) {
              const user = {
                ...currentUser,
                current_balance: data.newBalance,
                exposure: data.exposure,
              };
              const manualBookmaker = {
                teamA: data.teamA_rate,
                teamB: data.teamB_rate,
              };
              const body = {
                id: data?.betPlaceData?.id,
                isActive: true,
                createAt: data?.betPlaceData?.createdAt,
                updateAt: data?.betPlaceData?.createdAt,
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
                marketType: data?.betPlaceData?.marketType,
                amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
              };

              if (data?.betPlaceData?.match_id === id) {
                setIObtes((prev) => [body, ...prev]);
              }

              dispatch(setCurrentUser(user));
              dispatch(setManualBookMarkerRates(manualBookmaker));
            }
          } catch (e) {
            console.log("error", e?.message);
          } finally {
            setIsHandled(false);
          }
        }
      });

      socket.on("newBetAdded", (value) => {
        matchId = value?.match_id;
        try {
          setCurrentMatch((currentMatch) => {
            if (currentMatch.matchId !== value.matchId) {
              // If the new bet doesn't belong to the current match, return the current state
              return currentMatch;
            }

            // Update the bettings array in the current match object
            const updatedBettings = currentMatch.bettings.map((betting) => {
              if (betting.id === value.id && value.sessionBet) {
                // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                return {
                  ...betting,
                  ...value,
                };
              } else if (
                betting.id === value.id &&
                value.sessionBet === false
              ) {
                return {
                  ...betting,
                  ...value,
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
      });

      socket.on("bookMakerRateLive", (value) => {
        // Bookmaker Market live and stop disable condition

        console.log("value qqqq:", value);
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
      });
    }
    // if (socket && !socket.connected) {
    //   alert("Socket is not connected. Reconnecting...");
    //   socket.connect();
    // }
  }, [socket]);
  useEffect(() => {
    if (socketMicro && socketMicro.connected && marketId) {
      socketMicro.emit("init", { id: marketId });
      activateLiveMatchMarket();
      // socketMicro.on("bookMakerRateLive", (e) => {
      //   console.log("BookMaker", e);
      // });

      socketMicro.on(`session${marketId}`, (val) => {
        if (val !== null && matchId == checkMctchId) {
          const updatedBettings1 = currentMatch?.matchSessionData?.map(
            (betting) => {
              const selectedData = val.find(
                (data) => data?.SelectionId === betting?.selectionId
              );
              if (selectedData) {
                return {
                  ...betting,
                  bet_condition: selectedData?.RunnerName,
                  no_rate: selectedData?.LayPrice1,
                  yes_rate: selectedData?.BackPrice1,
                  rate_percent: `${selectedData?.LaySize1}-${selectedData?.BackSize1}`,
                  suspended: selectedData?.GameStatus,
                  selectionId: selectedData?.SelectionId,
                };
              }
              return betting;
            }
          );
          dispatch(
            setSelectedMatch({
              ...currentMatch,
              matchSessionData: updatedBettings1,
            })
          );
          setCurrentMatch((prev) => ({
            ...prev,
            matchSessionData: updatedBettings1,
          }));
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
              // socketMicro.disconnect();
            }
          } else {
            if (marketId === val[0]?.marketId) {
              // dispatch(setMatchOddsLive(val[0]));
              setMacthOddsLive(val[0]);
              if (val[0]?.status === "CLOSED") {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
              }
            }
          }
        }
      });
      socketMicro.on(`bookmaker${marketId}`, (val) => {
        if (val !== null) {
          if (marketId === val[0]?.marketId) {
            // dispatch(setBookMakerLive(val[0]));
            setBookmakerLive(val[0]);
          }
        }
      });
    }

    return () => {
      socketMicro?.emit("disconnect_market", {
        id: marketId,
      });
    };
  }, [socketMicro, marketId]);

  async function getAllBetsData1() {
    let payload = {
      match_id: id,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      // console.log(data,"Before");
      // const rates=data?.data[0]?.sort((a, b) => b.id - a.id)
      // console.log(rates,"Rates");
      setIObtes(data?.data[0]);
      // alert(data?.data[0].length)
      dispatch(setAllBetRate(data?.data[0]));
      var filteredData = data?.data?.[0]?.filter(
        (item) => item.bet_type == "yes" || item.bet_type == "no"
      );
      // alert(filteredData.length)
      dispatch(setAllSessionBets(filteredData)); // duplicate bets related issue
      // console.log(data,"after");
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

  async function getThisMatch(id) {
    // alert(1111)
    try {
      const response = await axios.get(`/game-match/matchDetail/${id}`);

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
          teamA: response.data.teamA_rate ? response.data.teamA_rate : 0,
          teamB: response.data.teamB_rate ? response.data.teamB_rate : 0,
        })
      );
      // setCurrentMatch(response.data);
      // setMatchOddsData(matchOddsDataTemp);

      // setMatchSessionData(matchSessionDataTemp);

      // dispatch(
      // console.warn("response.dat :",response.data)
      setMarketId(response.data.marketId);
      setMatchDetail(response.data);

      response.data.bettings?.forEach((element) => {
        if (element.sessionBet) {
          setSessionBets((prev) => {
            if (!prev.some((bet) => bet.id === element.id)) {
              return [...prev, element];
            }
            return prev;
          });
        } else {
          // setAllBetRates((prev) => {
          //   if (!prev.some((bet) => bet.id === element.id)) {
          //     return [...prev, element];
          //   }
          //   return prev;
          // });
        }
      });
      // console.log(response.data, "sda");
    } catch (e) {
      console.log("response", e.response.data);
    }
  }
  async function getAllBetsData() {
    try {
      let response = await axios.get(
        `/game-match/getAllMatch?bets=1&field=id,marketId`
      );
      setAllBetsData(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (id) {
      getThisMatch(id);
    }
    getAllBetsData();
    getAllBetsData1();
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <EventListing setSelected={setSelected} selected={activeTab} />
      <BetPlaced visible={visible} setVisible={setVisible} />
      {matchesMobile && (activeTab == "CRICKET" || activeTab == "INPLAY") && (
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "100%" }}>
            <MatchOdds
              matchOddsLive={matchOddsLive}
              bookmakerLive={bookmakerLive}
              onClick={() => handleClose(true)}
              bookMakerRateLive={bookMakerRateLive}
              data={currentMatch}
              allBetsData={allSessionBets}
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
                <SessionBetSeperate allBetsData={allSessionBets} mark />
              )}
              {allBetsData.length > 0 && (
                <AllRateSeperate
                  allBetsData={IObets?.filter((v) =>
                    ["MATCH ODDS"].includes(v.marketType)
                  )}
                  mark
                />
              )}
            </Box>
            <LiveMatchHome />
          </Box>
        </div>
      )}
      {!matchesMobile && (activeTab == "CRICKET" || activeTab == "INPLAY") && (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
            }}
          >
            <MatchOdds
              matchOddsLive={matchOddsLive}
              bookmakerLive={bookmakerLive}
              onClick={() => handleClose(true)}
              data={currentMatch}
              allBetsData={allSessionBets}
            />
          </Box>
          <Box sx={{ width: "30%", paddingRight: "1%" }}>
            <MatchComponent currentMatch={currentMatch} />{" "}
            {/** Live scoreBoard */}
            <LiveMatchHome currentMatch={currentMatch} /> {/* Poster */}
            <AllRateSeperate
              allBetsData={IObets?.filter((v) =>
                ["MATCH ODDS", "BOOKMAKER"]?.includes(v.marketType)
              )}
              mark
            />
            {(matchDetail?.manualSessionActive ||
              matchDetail?.apiSessionActive) && (
              <SessionBetSeperate allBetsData={allSessionBets} mark />
            )}
          </Box>
        </Box>
      )}
      {activeTab != "CRICKET" && activeTab != "INPLAY" && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Lottie
            animationData={HourGlass}
            style={{
              display: "flex",
              alignSelf: "center",
              width: "200px",
              height: "200px",
            }}
          />
          <Typography sx={{ color: "text.white" }}>Coming Soon</Typography>
        </Box>
      )}
    </Box>
  );
};

export default memo(Home);
