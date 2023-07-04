import React, { useCallback, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import SessionMarketBox from "./SessionMarketBoxLive";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SessionMarketBoxLive from "./SessionMarketBoxLive";
import { setRole } from "../../../../newStore";
import Divider from "../../../../components/helper/Divider";
import {  ARROWUP } from "../../../../assets";
const SessionMarketLive = ({
  currentMatch,
  liveOnly,
  setCurrentMatch,
  setLocalState,
  hideResult,
  setLiveData,
  stopAllHide,
  title,
  hideTotalBet,
  sessionData,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [stop, setStop] = useState(true);
  const dispatch = useDispatch();
  const { axios } = setRole();
  const [matchSessionData, setMatchSessionData] = useState(sessionData);
  useEffect(() => {
    setMatchSessionData(sessionData);
  }, [sessionData]);
  // const updateSessionData = useCallback(
  //   (updatedData) => {
  //     setMatchSessionData((prevData) => {
  //       return prevData?.map((item) => {
  //         if (item.id === updatedData.id) {
  //           return {
  //             ...item,
  //             betStatus: 2,
  //             suspended: "Result Declared",
  //           };
  //         } else {
  //           return item;
  //         }
  //       });
  //     });
  //   },
  //   [setMatchSessionData]
  // );
  const [visible, setVisible] = useState(true);

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
          {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} />
           */}
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
          {/* <SmallBoxSeason /> */}
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
                cursor: 'pointer'
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
                paddingRight: "17px",
                width: { laptop: "60%", mobile: "80%" },
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  background: "#FF9292",
                  width: "28%",
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
                  width: "28%",
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
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {matchSessionData?.length > 0 &&
            matchSessionData?.map((match, index) => (
              <Box key={index}>
                <SessionMarketBoxLive
                  liveOnly={liveOnly}
                  hideResult={hideResult}
                  hideTotalBet={hideTotalBet}
                  // updateSessionData={updateSessionData}
                  setMatchSessionData={setMatchSessionData}
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

export default memo(SessionMarketLive);
