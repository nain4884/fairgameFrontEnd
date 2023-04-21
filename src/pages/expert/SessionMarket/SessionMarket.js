import React from "react";
import Divider from "../../../components/helper/Divider";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Stop from "../Stop";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import SessionMarketBox from "./SessionMarketBox";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSelectedMatch } from "../../../newStore/reducers/matchDetails";
import { setRole } from "../../../newStore";
const SessionMarket = ({ currentMatch, setCurrentMatch }) => {
  const { sessionOddsLive } = useSelector((state) => state?.matchDetails);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [live, setLive] = useState(true);
  const dispatch = useDispatch();
  const { axios } = setRole();
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

  const handleLive = async () => {
    try {
      const bettingsToUpdate = currentMatch?.bettings?.filter(
        (v) => v?.sessionBet === true && v.id
      );

      const addBettingPromises = bettingsToUpdate?.map(async (betting) => {
        const body = {
          match_id: currentMatch?.id,
          matchType: currentMatch?.gameType,
          id: betting?.id ? betting?.id : "",
          selectionId: betting?.selectionId,
          betStatus: 0,
          sessionBet: true,
          bet_condition: betting?.bet_condition,
          no_rate: betting?.no_rate,
          yes_rate: betting?.yes_rate,
          rate_percent: betting?.rate_percent,
          suspended: betting?.suspended,
        };

        const { data } = await axios.post("betting/addBetting", body);
        return data.data;
      });

      const bettingsData = await Promise.all(addBettingPromises);
      console.log(bettingsData, "bettingsData");

      // const updatedBettingsWithIds = currentMatch?.bettings?.map((betting) => {
      //   if (betting?.id && bettingsData.some((d) => d?.id === betting?.id)) {
      //     return {
      //       ...betting,
      //       betStatus: 0,
      //       suspended: betting?.suspended
      //     };
      //   }
      //   return betting;
      // });

      // setCurrentMatch((prevState) => ({
      //   ...prevState,
      //   bettings: updatedBettingsWithIds,
      // }));
      // dispatch(
      //   setSelectedMatch({
      //     ...currentMatch,
      //     bettings: updatedBettingsWithIds,
      //   })
      // );
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err?.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { laptop: ".5vh" },
        width: "100%",
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
          <Stop
            onClick={() => {
              setLive(false);
              handleLive();
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
                width: { laptop: "67%", mobile: "80%" },
                justifyContent: { laptop: "center", mobile: "flex-end" },
              }}
            >
              <Box
                sx={{
                  background: "#FF9292",
                  width: { laptop: "15.5%", mobile: "26.5%" },
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
              <Box sx={{ width: ".45%", display: "flex" }}></Box>
              <Box
                sx={{
                  background: "#00C0F9",
                  width: { laptop: "15.5%", mobile: "26.5%" },
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
          {currentMatch?.bettings?.length > 0 &&
            currentMatch?.bettings
              ?.filter((v) => v?.sessionBet === true)
              ?.map((match, index) => (
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
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SessionMarket);
