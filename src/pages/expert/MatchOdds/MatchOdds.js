import React from "react";
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

const MatchOdds = ({ currentMatch, setCurrentMatch, matchOddsLive }) => {
  // const { matchOddsLive } = useSelector((state) => state?.matchDetails);
  const { axios } = setRole();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [visible, setVisible] = useState(false);
  const matchOdds = currentMatch?.bettings?.filter(
    (v) => v?.sessionBet === false
  )[0];
  const [stlive, setLive] = useState(
    currentMatch?.bettings?.length === 0 ||
      matchOdds === undefined ||
      matchOdds?.betStatus === 0
      ? false
      : true
  );

  const activateMatchOdds = async (val, id) => {
    try {
      if (val === 0) {
        setLive(false);
      } else {
        setLive(true);
      }
      const { data } = await axios.post("/betting/addBetting", {
        match_id: currentMatch?.id,
        betStatus: val,
        matchType: currentMatch?.gameType,
        id: id,
      });

      if (data?.data?.id && id !== "") {
        const updatedBettings = currentMatch?.bettings?.map((betting) => {
          if (betting?.id === data?.data?.id) {
            // If the betting's ID matches the given `id`, update the `betStatus` value
            return {
              ...betting,
              betStatus: val,
            };
          }
          // Otherwise, return the original betting object
          return betting;
        });
        setCurrentMatch((prevState) => ({
          ...prevState,
          bettings: updatedBettings,
        }));
      } else {
        const updatedBettings = currentMatch?.bettings?.map((betting) => {
          return {
            ...betting,
            betStatus: val,
          };
        });
        setCurrentMatch((prevState) => ({
          ...prevState,
          bettings: updatedBettings,
        }));
      }
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
        marginY: { laptop: ".5vh" },
        width: { laptop: "99%" },
        marginX: ".5vw",
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
              setLive(false);
              activateMatchOdds(0, matchOdds?.id);
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
                if (currentMatch?.bettings.length > 0) {
                  activateMatchOdds(1, matchOdds?.id);
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
                activateMatchOdds(0, matchOdds?.id);
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
          top: "40px",
          right: "100px",
        }}
      >
        {visible && (
          <ResultComponent
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
        lock={matchOddsLive?.runners?.length > 0 ? false : true}
        color={"#46e080"}
        name={currentMatch?.teamA}
      />
      <Divider />
      <BoxComponent
        lock={matchOddsLive?.runners?.length > 0 ? false : true}
        color={"#FF4D4D"}
        data={
          matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners[1] : []
        }
        name={currentMatch?.teamB}
      />
      {/* <Divider />
        <BoxComponent color={"#FF4D4D"} name={"DRAW"} /> */}
      {!stlive && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            height: "57%",
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        ></Box>
      )}
    </Box>
  );
};

export default memo(MatchOdds);
