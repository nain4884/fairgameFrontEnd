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
import { useLocation } from "react-router-dom";
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

let matchOddsCount = 0;

const MatchScreen = () => {
  const [data, setData] = useState([]);
  const { socket, socketMicro } = useContext(SocketContext);
  const { state } = useLocation();

  const { axios } = setRole();
  const dispatch = useDispatch();
  const { allBetRates } = useSelector((state) => state?.matchDetails);
  const { selectedMatch } = useSelector((state) => state?.expertMatchDetails);
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);
  const [IObets, setIObtes] = useState(allBetRates);

  const getSingleMatch = async (val) => {
    try {
      dispatch(removeSelectedMatch());
      const { data } = await axios.get(`game-match/matchDetail/${val}`);
      setCurrentMatch(data);
      dispatch(setSelectedMatch(data));
    } catch (e) {
      console.log(e?.message, "message");
    }
  };
  useEffect(() => {
    if (state?.id) {
      getSingleMatch(state.id);
      getAllBetsData(state?.id);
    }
  }, []);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newBetAdded", (value) => {
        console.log(value, "newBetAdded");

        const updatedBettings = currentMatch?.bettings?.map(
          (betting, index) => {
            if (betting?.id === value?.id) {
              return (betting[index] = value);
            }
            return betting;
          }
        );
        setCurrentMatch({ ...currentMatch, bettings: updatedBettings });
      });
      socket.on("session_bet", (data) => {
        console.log("SESSION Response", data);

        //  console.log(session,"SDsdsdasdsa")
        // dispatch(setCurrentUser(user));
        // dispatch(setAllSessionBets(session));
        // dispatch(setSessionRates(data?.profitLoss))
      });
      socket.on("match_bet", (data) => {
        try {
          // getAllBets();
          console.log(data, "MATCHH_BET");
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
      });

      socket.on("bookMakerRateLive", (e) => {
        console.log("BookMaker", e);
        if (e?.matchId === currentMatch?.id) {
          const body = { ...currentMatch, bookMakerRateLive: e?.bookMakerLive };
          setCurrentMatch(body);
        }
      });
      // socket.emit("init", { id: currentMatch?.marketId });
    }
  }, [socket]);

  const activateLiveMatchMarket = async () => {
    try {
      await Axios.get(
        `${microServiceApiPath}/market/${currentMatch?.marketId}`
      );
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  useEffect(() => {
    if (socketMicro && socketMicro.connected && currentMatch?.marketId) {
      socketMicro.emit("init", { id: currentMatch?.marketId });
      activateLiveMatchMarket();

      socketMicro.on(`session${currentMatch?.marketId}`, (val) => {
        // console.log("val", val);

        // const body = val?.map((e) => ({
        //   bet_condition: e?.RunnerName,
        //   betStatus: 0,
        //   no_rate: e?.LayPrice1,
        //   yes_rate: e?.BackPrice1,
        //   rate_percent: e?.LaySize1,
        //   suspended: e?.GameStatus,
        //   selectionId: e?.SelectionId,
        // }));

        const updatedBettings1 = currentMatch?.map((betting) => {
          const selectedData = val.find(
            (data) => data?.SelectionId === betting?.selectionId
          );
          if (selectedData) {
            return {
              ...betting,
              bet_condition: selectedData?.RunnerName,
              betStatus: 0,
              no_rate: selectedData?.LayPrice1,
              yes_rate: selectedData?.BackPrice1,
              rate_percent: selectedData?.LaySize1,
              suspended: selectedData?.GameStatus,
              selectionId: selectedData?.SelectionId,
            };
          }
          return { ...betting, ...val };
        });

        dispatch(setSessionOddsLive(updatedBettings1));
      });
      socketMicro.on(`matchOdds${currentMatch?.marketId}`, (val) => {
        if (val.length === 0) {
          matchOddsCount += 1;
          if (matchOddsCount >= 3) {
            socketMicro.emit("disconnect_market", {
              id: currentMatch?.marketId,
            });
            socketMicro.disconnect();
          }
        } else {
          dispatch(setMatchOddsLive(val[0]));
        }
      });
      socketMicro.on(`bookmaker${currentMatch?.marketId}`, (val) => {
        dispatch(setBookMakerLive(val[0]));
      });
    }
  }, [socketMicro, currentMatch?.marketId]);
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
          display: "flex",
          alignSelf: "center",
          borderRadius: "10px",
          flexDirection: "row",
          width: "99%",
          marginX: ".5%",
          height: "100%",
          marginTop: "5px",
          background: "white",
          padding: 1,
        }}
      >
        {(currentMatch?.manualSessionActive ||
          currentMatch?.apiSessionActive) && (
          <Box sx={{ width: "50%", flexDirection: "column", display: "flex" }}>
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
        <Box sx={{ width: "50%", flexDirection: "column", display: "flex" }}>
          {currentMatch?.apiMatchActive && (
            <MatchOdds
              currentMatch={currentMatch}
              setCurrentMatch={setCurrentMatch}
            />
          )}
          {currentMatch?.apiBookMakerActive && (
            <BookMarketer socket={socket} currentMatch={currentMatch} />
          )}
          <AllBets allBetRates={IObets} />
        </Box>
      </Box>
    </Background>
  );
};

export default memo(MatchScreen);
