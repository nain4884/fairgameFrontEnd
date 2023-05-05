import React, { memo, useContext, useEffect } from "react";
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
  setAllBetRate,
  setBookMakerLive,
  setMatchOddsLive,
  setSessionOddsLive,
} from "../../newStore/reducers/matchDetails";
import {
  removeSelectedMatch,
  setSelectedMatch,
} from "../../newStore/reducers/expertMatchDetails";
import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { setRole } from "../../newStore";
import BookMarketer from "./BookMarketer";
import SessionMarket from "./SessionMarket/SessionMarket";
import RunsBox from "./RunsBox";
import MatchOdds from "./MatchOdds/MatchOdds";
import DropdownMenu from "./DropdownMenu";
import { removeCurrentUser } from "../../newStore/reducers/currentUser";
import { logout } from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";

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
  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const { globalStore, setGlobalStore } = useContext(GlobalStore);

  const getSingleMatch = async (val) => {
    try {
      // dispatch(removeSelectedMatch());
      // setCurrentMatch({});
      const { data } = await axios.get(`game-match/matchDetail/${val}`);
      setCurrentMatch(data);
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
    if (socket && socket.connected && currentMatch !== null) {
      socket.onevent = async (packet) => {
        console.log(`Received event: ${packet.data[0]}`, packet.data[1]);
        if (packet.data[0] === "logoutUserForce") {
          console.log(`Received event: ${packet.data[0]}`, packet.data[1]);

          dispatch(removeCurrentUser());
          dispatch(logout({ roleType: "role3" }));
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
                rate: null,
                marketType: data?.betPlaceData?.marketType,
                amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
              };

              if (currentMatch?.id === data?.betPlaceData?.match_id) {
                setIObtes((prev) => [body, ...prev]);
              }

              // dispatch(setCurrentUser(user));
              // dispatch(setManualBookMarkerRates(manualBookmaker));
            }
          } catch (e) {
            console.log("error", e?.message);
          }
          // // dispatch(setAllBetRates(allBetRates.push(body)));
          // const manualBookmaker = {
          //   teamA: data.teamA_rate,
          //   teamB: data.teamB_rate,
          // };
          // setMatchOddsRates((prev) => ({
          //   ...prev,
          //   manualBookmaker,
          // }));
          // // dispatch(
          // //   stateActions.setMatchDetails(manualBookmaker)
          // // );
          // dispatch(
          //   stateActions.setBalance(data.newBalance, role, data.exposure)
          // );
        }

        if (packet.data[0] === "bookMakerRateLive") {
          const e = packet.data[1];
          console.log("BookMaker", e);
          if (e?.matchId === currentMatch?.id) {
            const body = {
              ...currentMatch,
              bookMakerRateLive: e?.bookMakerLive,
            };
            setCurrentMatch(body);
          }
        }
        if (packet.data[0] === "newBetAdded") {
          const value = packet.data[1];
          console.log("NewBetAdded", value);
          try {
            if (value) {
              const updatedBettings = currentMatch?.bettings?.map(
                (betting, index) => {
                  if (betting?.id === value?.id) {
                    return (betting[index] = value);
                  }
                  return betting;
                }
              );
              setCurrentMatch({ ...currentMatch, bettings: updatedBettings });
            }
          } catch (e) {
            console.log(e.message);
          }
        }
        if (packet.data[0] == "session_bet") {
          const data = packet.data[1];
          //  console.log(data,"session_bet")
          try {
            // getAllBets();
            // console.warn(data, "MATCHH_BET");
            if (data) {
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
                rate: null,
                marketType: data?.betPlaceData?.marketType,
                amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
              };

              if (currentMatch?.id === data?.betPlaceData?.match_id) {
                setIObtes((prev) => [body, ...prev]);
              }

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
  }, [socket]);

  const activateLiveMatchMarket = async (val) => {
    try {
      await Axios.get(`${microServiceApiPath}/market/${marketId}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  useEffect(() => {
    if (socketMicro && socketMicro.connected && marketId !== "") {
      socketMicro.emit("init", { id: marketId });
      activateLiveMatchMarket(marketId);

      socketMicro.on(`session${marketId}`, (val) => {
        if (state?.marketId == marketId) {
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

            const filteredNewVal = newVal?.filter((newData) => {
              const hasMatch = currentMatch.bettings.some(
                (betting) => betting.selectionId === newData.selectionId
              );

              // Return false to exclude newData from filteredNewVal if a match is found
              return !hasMatch;
            });

            // Merge the filteredNewVal with the currentMatch bettings array
            setCurrentMatch({
              ...currentMatch,
              bettings: [...data, ...filteredNewVal],
            });
          } else {
            setCurrentMatch({ ...currentMatch, bettings: newVal });
          }
        }
        // dispatch(setSessionOddsLive(updatedBettings1));
      });
      socketMicro.on(`matchOdds${marketId}`, (val) => {
        if (val.length === 0) {
          matchOddsCount += 1;
          if (matchOddsCount >= 3) {
            socketMicro.emit("disconnect_market", {
              id: marketId,
            });
            // socketMicro.disconnect();
          }
        } else {
          // dispatch(setMatchOddsLive(val[0]));
          if (marketId === val[0]?.marketId) {
            setMatchOddsLive(val[0]);
            if (val[0]?.status === "CLOSED") {
              socketMicro.emit("disconnect_market", {
                id: marketId,
              });
            }
          } else {
            setMatchOddsLive([]);
          }
        }
      });

      socketMicro.on(`bookmaker${marketId}`, (val) => {
        // dispatch(setBookMakerLive(val[0]));
        if (marketId === val[0]?.marketId) {
          setBookmakerLiveData(val[0]);
        } else {
          setBookmakerLiveData([]);
        }
      });
      return () => {
        socketMicro?.emit("disconnect_market", {
          id: marketId,
        });
        setMatchOddsLive([]);

        marketId = "";
      };
    }
  }, [socketMicro, marketId]);

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

  // const SmallBoxSeason = ({ color }) => {
  //   return (
  //     <Box
  //       sx={{
  //         width: { laptop: "70px", mobile: "17vw" },
  //         flexDirection: "column",
  //         position: "absolute",
  //         display: "flex",
  //         marginRight: "10px",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "30px",
  //         background: "white",
  //         borderRadius: "3px",
  //       }}
  //     >
  //       <Typography
  //         sx={{ fontSize: "8px", fontWeight: "bold", color: "#FF4D4D" }}
  //       >
  //         Session Bet
  //       </Typography>
  //       <Typography
  //         sx={{ fontSize: "8px", fontWeight: "bold", color: "#46e080" }}
  //       >
  //         999
  //       </Typography>
  //     </Box>
  //   );
  // };

  // const Time = () => {
  //   return (
  //     <Box sx={{ display: "flex", alignItems: "center" }}>
  //       <Typography
  //         sx={{
  //           fontSize: { mobile: "10px", laptop: "12px" },
  //           fontWeight: "bold",
  //           color: "#black",
  //           width: { mobile: "40px", laptop: "80px" },
  //         }}
  //       >
  //         5 sec Delay
  //       </Typography>
  //       <img style={{ width: "20px", height: "20px" }} src={TIME} />
  //     </Box>
  //   );
  // };

  const PlaceBetComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(0);
    };
    return (
      <>
        <Box
          onClick={(e) => handleClick(e)}
          sx={{
            background: "#0B4F26",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { laptop: "5vw", mobile: "80px" },
            borderRadius: "5px",
            height: "35px",
            left: "35px",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              background: "#FDF21A",
              borderRadius: "3px",
              width: "90%",
              height: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "10px", mobile: "8px" },
                fontWeight: "bold",
                color: "#FF4D4D",
              }}
            >
              Total Bet : <span style={{ color: "#0B4F26" }}>250</span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { laptop: "10px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              P/L
            </Typography>
          </Box>
        </Box>
        <DropdownMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </>
    );
  };

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
        {(currentMatch?.manualSessionActive ||
          currentMatch?.apiSessionActive) && (
            <Box
              sx={{
                width: { laptop: "50%", mobile: "100%", tablet: "100%" },
                flexDirection: "column",
                display: "flex",
              }}
            >
              <SessionMarket
                setCurrentMatch={setCurrentMatch}
                currentMatch={currentMatch}
                SessionMarket={SessionMarket}
              />

              <Box
                sx={{ display: "flex", flexDirection: "row", marginTop: ".25vw" }}
              >
                {data.map(() => {
                  return <RunsBox />;
                })}
              </Box>
            </Box>
          )}
        <Box
          sx={{
            width: { laptop: "50%", mobile: "100%", tablet: "100%" },
            flexDirection: "column",
            display: "flex",
          }}
        >
          {currentMatch?.apiMatchActive && (
            <MatchOdds
              matchOdds={
                currentMatch?.bettings?.filter(
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
