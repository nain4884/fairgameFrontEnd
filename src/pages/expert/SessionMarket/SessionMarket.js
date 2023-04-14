import React from "react";
import Divider from "../../../components/helper/Divider";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Stop from "../Stop";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import SessionMarketBox from "./SessionMarketBox";
import { memo } from "react";
import { useSelector } from "react-redux";
const SessionMarket = ({ currentMatch, setCurrentMatch }) => {
  const { sessionOddsLive } = useSelector((state) => state?.matchDetails);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [live, setLive] = useState(true);

  // var sessionMatch = currentMatch?.bettings?.filter(
  //   (v) => v?.sessionBet === true
  // );

  // const activateSessionLive = async (val, id) => {
  //   try {
  //     const data = await axios.post("/betting/addBetting", {
  //       match_id: currentMatch?.id,
  //       sessionBet: val,
  //       matchType: currentMatch?.gameType,
  //       id: id,
  //     });
  //   } catch (err) {
  //     toast.error(err.response.data.message);

  //     console.log(err?.response?.data?.message, "err");
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        flexDirection: "column",
        marginY: { laptop: ".5vh" },
        width: { laptop: "99%" },
        alignSelf: {
          mobile: "center",
          tablet: "center",
          laptop: "flex-start",
          boxShadow: "0px 5px 10px #0000001A",
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
            Session Market
          </Typography>
          {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} />
           */}
          <Stop onClick={() => setLive(false)} />
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
          {/* <SmallBoxSeason /> */}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                width: "50%",
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
                MIN: {currentMatch?.betfair_session_min_bet} MAX:
                {currentMatch?.betfair_session_max_bet}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { laptop: "60%", mobile: "80%" },
                justifyContent: { laptop: "center", mobile: "flex-end" },
              }}
            >
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
                  No
                </Typography>
              </Box>
              <Box sx={{ width: ".35%", display: "flex" }}></Box>
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
                  Yes
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            position: "relative",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {sessionOddsLive?.length >0 && sessionOddsLive?.map((match, index) => (
            <Box key={index}>
              <SessionMarketBox
                currentMatch={currentMatch}
                setCurrentMatch={setCurrentMatch}
                newData={match}
                liveUser={live}
                index={index}
              />
              <Divider />
            </Box>
          ))}
          {/* <SeasonMarketBox liveUser={live} index={1} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={2} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={3} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={4} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={5} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={6} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={7} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={7} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={7} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SessionMarket);
