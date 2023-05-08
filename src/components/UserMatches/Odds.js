import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import BoxComponent from "./BoxComponent";
import Divider from "../helper/Divider";
import { BallStart, Info, TIME } from "../../assets";
import { memo } from "react";

const SmallBox = ({ valueA, valueB }) => {
  return (
    <Box
      sx={{
        width: "max-content",
        position: "absolute",
        paddingX: "5px",
        display: "flex",
        left: { mobile: "60%", laptop: "49vw", tablet: "60%" },
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "30px",
        background: "white",
        borderRadius: "7px",
      }}
    >
      <Typography
        sx={{
          fontSize: { laptop: "12px", mobile: "10px" },
          fontWeight: "bold",
        }}
      >
        Book
      </Typography>
      <Typography
        sx={{
          fontSize: { laptop: "12px", mobile: "10px" },
          fontWeight: "bold",
          color: valueA <0 ?  `#FF9292` : `#46e080`,
        }}
      >
        {valueA<0 ? ` ${valueA}` : `${valueA }`}
      </Typography>
      <Typography
        sx={{
          fontSize: { laptop: "12px", mobile: "10px" },
          fontWeight: "bold",
          color: valueB<0  ?  `#FF9292` : `#46e080`,
        }}
      >
        {valueB<0  ? ` ${valueB}` : `${valueB}`}
      </Typography>
    </Box>
  );
};

const Time = (data) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: { mobile: "10px", laptop: "12px" },
          fontWeight: "bold",
          color: "#black",
          width: { mobile: "40px", laptop: "80px" },
        }}
      >
        {data.time} sec Delay
      </Typography>
      <img style={{ width: "20px", height: "20px" }} src={TIME} />
    </Box>
  );
};

const Odds = ({
  data,
  teamARates,
  teamBRates,
  title,
  min,
  max,
  lock,
  showBox,
  showDely,
  suspended,
  newData,
  isRound,
  typeOfBet,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const bookRatioA =
   ( teamBRates !== 0
      ?  (teamARates / teamBRates)|| 0
      : 0).toFixed(2)

  const bookRatioB =
    (teamARates !== 0
      ? (teamBRates / teamARates) || 0
      : 0).toFixed(2)



  return (
    <Box
      key="odds"
      sx={{
        display: "flex",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: { mobile: ".2vh", laptop: ".5vh" },
        width: { mobile: "98%", laptop: "97%" },
        marginX: "1vw",
        alignSelf: { mobile: "center", tablet: "center", laptop: "flex-start" },
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
          {showDely && typeOfBet === "MATCH ODDS" && (
            <Time time={newData.delaySecond ? newData?.delaySecond : 0} />
          )}
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
          <SmallBox valueA={bookRatioA} valueB={bookRatioB} />
          <Typography
            sx={{
              color: "white",
              width: "60px",
              fontSize: { laptop: "9px", mobile: "7px" },
              fontWeight: "500",
              flexWrap: "wrap",
            }}
          >
            Maximum Bet {max}
          </Typography>
          <img
            src={Info}
            style={{
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          />
        </Box>
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
              width: "40%",
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
              MIN: {min} MAX:{max}
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
                background: "#00C0F9",
                width: { laptop: "16.5%", mobile: "30%" },
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
                width: { laptop: "16.5%", mobile: "30%" },
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
        time={true}
        showBox={showBox}
        teamImage={newData?.teamA_Image}
        newData={newData}
        // lock={data?.length > 0 ? false : true}
        color={teamARates <= 0 ? "#FF4D4D" : "#46e080"}
        allRates={{ teamA: teamARates, teamB: teamBRates }}
        rate={teamARates}
        name={newData?.teamA}
        data={data?.length > 0 ? data[0] : []}
        team={"teamA"}
        suspendedData={data[0]?.status}
        typeOfBet={typeOfBet}
        isRound={isRound}
      />
      <Divider />
      {/* {console.log("newData :",newData)} */}
      <BoxComponent
        teamImage={newData?.teamB_Image}
        time={true}
        showBox={showBox}
        newData={newData}
        // lock={data?.length > 0 ? false : true}
        color={teamBRates <= 0 ? "#FF4D4D" : "#46e080"}
        name={newData?.teamB}
        data={data?.length > 0 ? data[1] : []}
        suspendedData={data[1]?.status}
        rate={teamBRates}
        allRates={{ teamA: teamARates, teamB: teamBRates }}
        team={"teamB"}
        typeOfBet={typeOfBet}
        isRound={isRound}
      />
      {newData?.teamC && (
        <>
          <Divider />
          <BoxComponent
            teamImage={null}
            time={true}
            showBox={showBox}
            newData={newData}
            // lock={data?.length > 0 ? false : true}
            color={"#FF4D4D"}
            name={newData?.teamC}
            data={data?.length > 0 ? data[2] : []}
            suspendedData={data[2]?.status}
            rate={0}
            allRates={{ teamA: teamARates, teamB: teamBRates }}
            team={"teamC"}
            typeOfBet={typeOfBet}
            isRound={isRound}
          />
        </>
      )}

      {/* {data?.teamC && !suspended && (
        <BoxComponent
          time={true}
          color={"#F8C851"}
          name={"DRAW"}
          data={data}
          team={"draw"}
        />
      )} */}

      {/* {suspended && (
        <Box sx={{ position: "relative" }}>
          <BoxComponent
           rate={teamARates}
            color={"#46e080"}
            name={`${data?.teamA?.toUpperCase()}`}
          />
          <Divider />
          <BoxComponent
           rate={teamBRates}
            color={"#FF4D4D"}
            name={`${data?.teamB?.toUpperCase()}`}
            align="end"
          />

          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              width: "60%",
              marginLeft: "40%",
              height: "82px",
              position: "absolute",
              top: ".1px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img src={BallStart} style={{ width: "113px", height: "32px" }} />
          </Box>
        </Box>
      )} */}
    </Box>
  );
};
export default memo(Odds);
