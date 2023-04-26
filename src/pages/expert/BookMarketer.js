import React from "react";
import { memo } from "react";
import Divider from "../../components/helper/Divider";
import BoxComponent from "./BoxComponent";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SmallBox from "./SmallBox";
import Stop from "./Stop";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useSelector } from "react-redux";

const BookMarketer = ({ currentMatch, socket,liveData }) => {
  // const { bookmakerLive } = useSelector((state) => state?.matchDetails);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [live, setLive] = useState(currentMatch?.bookMakerRateLive);
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 10px #0000001A",
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
        margin: ".5vw",
        alignSelf: {
          mobile: "center",
          tablet: "center",
          laptop: "flex-start",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
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
            Bookmaker Market
          </Typography>
          {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} /> */}
          <Stop
            onClick={() => {
              setLive(false);
              socket.emit("bookMakerRateLive", {
                matchId: currentMatch?.id,
                bookMakerLive: false,
              });
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
          {/* { <SmallBox title={'Live'} />} */}
          {!live ? (
            <SmallBox
              onClick={() => {
                setLive(true);
                socket.emit("bookMakerRateLive", {
                  matchId: currentMatch?.id,
                  bookMakerLive: true,
                });
              }}
              width={"80px"}
              title={"Go Live"}
              color={"#FF4D4D"}
            />
          ) : (
            <SmallBox
              onClick={() => {
                setLive(false);
                socket.emit("bookMakerRateLive", {
                  matchId: currentMatch?.id,
                  bookMakerLive: false,
                });
              }}
              width={"80px"}
              title={"Live"}
            />
          )}
        </Box>
      </Box>
      <Divider />
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
              MIN: {currentMatch?.betfair_bookmaker_min_bet} MAX:{" "}
              {currentMatch?.betfair_bookmaker_max_bet}
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
      <Box sx={{ position: "relative" }}>
        <BoxComponent
         teamImage={currentMatch?.teamA_Image}
          data={
            liveData?.runners?.length > 0
              ? liveData?.runners[0]
              : []
          }
          lock={liveData?.runners?.length > 0 ? false : true}
          color={"#46e080"}
          name={currentMatch?.teamA}
        />
        <Divider />
        <BoxComponent
          color={"#FF4D4D"}
          teamImage={currentMatch?.teamB_Image}
          lock={liveData?.runners?.length > 0 ? false : true}
          name={currentMatch?.teamB}
          data={
            liveData?.runners?.length > 0
              ? liveData?.runners[1]
              : []
          }
          align="end"
        />
        {currentMatch?.teamC &&
        <>
        <Divider />
        <BoxComponent
          color={"#FF4D4D"}
          teamImage={null}
          lock={liveData?.runners?.length > 0 ? false : true}
          name={currentMatch?.teamC}
          data={
            liveData?.runners?.length > 0
              ? liveData?.runners[2]
              : []
          }
          align="end"
        />
        </>
        }
       
         <Divider />
        {!live && (
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              height: "100%",
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          ></Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(BookMarketer);
