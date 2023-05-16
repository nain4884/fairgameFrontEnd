import React, { useEffect } from "react";
import Divider from "../../../components/helper/Divider";
import BoxComponent from "../BoxComponent";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SmallBox from "../SmallBox";
import Result from "../Result";
import Stop from "../Stop";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ResultComponent from "../../../components/ResultComponent";
import { setRole } from "../../../newStore";
import { memo } from "react";
import { useSelector } from "react-redux";

const MatchOdds = ({
  currentMatch,
  matchOdds,
  setCurrentMatch,
  matchOddsLive,
  socket,
}) => {
  // const { matchOddsLive } = useSelector((state) => state?.matchDetails);
  const { axios } = setRole();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [visible, setVisible] = useState(false);
  const [newMatchOdds, setNewMatchOdds] = useState(matchOdds);
  const [stlive, setLive] = useState(currentMatch?.matchOddRateLive);

  const { manualBookMarkerRates } = useSelector((state) => state?.matchDetails);
  const teamRates =
    manualBookMarkerRates?.length > 0
      ? manualBookMarkerRates?.find((v) => v?.matchId === currentMatch?.id)
      : { teamA: 0, teamB: 0 };

      
  useEffect(() => {
    if (matchOdds) {
      setNewMatchOdds(matchOdds);
    }
  }, [matchOdds]);
  const activateMatchOdds = async (val, id) => {
    try {
      setLive(true);

      const { data } = await axios.post("/betting/addBetting", {
        match_id: currentMatch?.id,
        betStatus: val,
        matchType: currentMatch?.gameType,
      });

      // setCurrentMatch((currentMatch) => {
      //   const updatedBettings = [...currentMatch?.bettings]; // Create a copy of the bettings array

      //   updatedBettings.push(data); // Push the response data into the updatedBettings array

      //   return {
      //     ...currentMatch,
      //     bettings: updatedBettings,
      //   };
      // });
      // setNewMatchOdds(data?.data);
    } catch (err) {
      toast.error(err?.message);
      console.log(err?.response?.data?.message, "err");
    }
  };

  return (
    <Box
      key="odds"
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
        margin: ".5vw",
        alignSelf: {
          mobile: "center",
          tablet: "center",
          laptop: "flex-start",
          boxShadow: "0px 5px 10px #0000001A",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Match Odds
          </Typography>
          <Stop
            onClick={() => {
              if (newMatchOdds?.id) {
                setLive(false);
                socket.emit("matchOddRateLive", {
                  matchId: currentMatch?.id,
                  matchOddLive: false,
                });
              }
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
            // '#262626'
          }}
        >
          <div class="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Result
            onClick={() => {
              setVisible(true);
            }}
            invert={true}
          />
          {!stlive && (
            <SmallBox
              onClick={() => {
                if (newMatchOdds?.id) {
                  socket.emit("matchOddRateLive", {
                    matchId: currentMatch?.id,
                    matchOddLive: true,
                  });
                  setLive(true);
                } else {
                  activateMatchOdds(1, "");
                }
              }}
              title={"Go Live"}
              color={"#FF4D4D"}
            />
          )}
          {stlive && (
            <SmallBox
              onClick={() => {
                socket.emit("matchOddRateLive", {
                  matchId: currentMatch?.id,
                  matchOddLive: false,
                });
                setLive(false);
              }}
              title={"Live"}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 999,
          top: "26%",
          right: "100px",
        }}
      >
        {visible && (
          <ResultComponent
            betId={
              currentMatch?.bettings?.length > 0 &&
              currentMatch?.bettings?.filter((v) => v?.sessionBet === false)
            }
            teamA={currentMatch?.teamA}
            teamB={currentMatch?.teamB}
            tie={"Tie"}
            draw={currentMatch?.teamC ? currentMatch?.teamC  : "Draw"}
            onClick={() => {
              setVisible(false);
            }}
          />
        )}
      </Box>
      {
        <Box
          sx={{
            display: "flex",
            background: "#319E5B",
            height: "25px",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "'#319E5B'",
              height: "25px",
              width: "35%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "11px", mobile: "9px" },
                marginLeft: "7px",
              }}
            >
              MIN: {currentMatch?.betfair_match_min_bet} MAX:
              {currentMatch?.betfair_match_max_bet}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              width: { laptop: "65%", mobile: "80%" },
              justifyContent: { laptop: "center", mobile: "flex-end" },
            }}
          >
            <Box
              sx={{
                background: "#00C0F9",
                width: { laptop: "16.5%", mobile: "25%" },
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
              >
                Back
              </Typography>
            </Box>
            <Box sx={{ width: ".35%", display: "flex" }}></Box>

            <Box
              sx={{
                background: "#FF9292",
                width: { laptop: "16.5%", mobile: "25%" },
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
              >
                Lay
              </Typography>
            </Box>
          </Box>
        </Box>
      }
      <BoxComponent
        data={
          matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners[0] : []
        }
        teamImage={currentMatch?.teamA_Image}
        lock={matchOddsLive?.runners?.length > 0 ? false : true}
        name={currentMatch?.teamA}
        currentMatch={currentMatch}
        teamRates={teamRates?.teamA}
      />
      <Divider />
      <BoxComponent
        teamRates={teamRates?.teamB}
        lock={matchOddsLive?.runners?.length > 0 ? false : true}
        teamImage={currentMatch?.teamB_Image}
        data={
          matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners[1] : []
        }
        name={currentMatch?.teamB}
        currentMatch={currentMatch}
      />
      {currentMatch?.teamC && (
        <>
          <Divider />
          <BoxComponent
            lock={matchOddsLive?.runners?.length > 0 ? false : true}
            color={"#FF4D4D"}
            teamImage={null}
            data={
              matchOddsLive?.runners?.length > 0
                ? matchOddsLive?.runners[2]
                : []
            }
            name={currentMatch?.teamC}
            currentMatch={currentMatch}
          />
        </>
      )}

      {!stlive && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            height: "66%",
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        ></Box>
      )}
    </Box>
  );
};

export default memo(MatchOdds);
