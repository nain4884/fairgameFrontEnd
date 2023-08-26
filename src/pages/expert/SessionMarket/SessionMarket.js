import React, { useEffect } from "react";
import Divider from "../../../components/helper/Divider";
import { Box, Typography } from "@mui/material";
import Stop from "../Stop";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import SessionMarketBox from "./SessionMarketBox";
import { memo } from "react";
import { toast } from "react-toastify";
import { setRole } from "../../../newStore";
import { ARROWUP } from "../../../assets";
import { customSort } from "../../../components/helper/util";
const SessionMarket = ({
  currentMatch,
  liveOnly,
  setCurrentMatch,
  setLocalState,
  hideResult,
  stopAllHide,
  title,
  hideTotalBet,
  sessionData,
  setIObtes,
  setData,
  setLocalSessionExpertOdds,
}) => {
  const theme = useTheme();
  const [stop, setStop] = useState(true);
  const { axios } = setRole();

  const [visible, setVisible] = useState(true);

  const handleLive = async () => {
    try {
      const bettingsToUpdate = sessionData?.filter(
        (v) => v?.sessionBet === true && v?.id && v?.betStatus === 1
      );

      const promises = bettingsToUpdate?.map(async (betting) => {
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
        return data?.data;
      });

      const results = await Promise.all(promises);
      setLocalSessionExpertOdds((prev) => {
        const updatedBettings = prev?.map((betting) => {
          const updatedBetting = results?.find(
            (result) =>
              (betting.selectionId &&
                betting.selectionId === result.selectionId) ||
              (betting.id && betting.id === result.id)
          );

          return updatedBetting ? updatedBetting : betting;
        });
        return updatedBettings;
      });
      setStop(false);
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
            {title} 
          </Typography>
          {!stopAllHide && (
            <Stop
              onClick={() => {
                setStop(false);
                handleLive();
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
            // '#262626'
          }}
        >
          <div className="slanted"></div>
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
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
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
                  width: "60%",
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
                  // marginLeft: "0vw",
                  width: { laptop: "40%", mobile: "80%", marginLeft: "8px" },
                  justifyContent: { laptop: "flex-start", mobile: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { laptop: "22%", mobile: "26.5%" },
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
                    width: { laptop: "21.9%", mobile: "26.5%" },
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
              height: "auto",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {console.log("matchSessionData", sessionData)}
            {sessionData?.length > 0 &&
              sessionData?.map((match, index) => (
                <Box
                  key={index}
                  //  ref={messageRef}
                >
                  <SessionMarketBox
                    liveOnly={liveOnly}
                    setIObtes={setIObtes}
                    setData={setData}
                    hideResult={hideResult}
                    hideTotalBet={hideTotalBet}
                    // updateSessionData={updateSessionData}
                    setMatchSessionData={setLocalSessionExpertOdds}
                    setLocalState={(val) => setLocalState(val)}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                    newData={match}
                    setStop={setStop}
                    stop={stop}
                    index={index}
                  />
                  <Divider />
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(SessionMarket);
