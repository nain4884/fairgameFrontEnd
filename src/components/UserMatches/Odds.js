import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import BoxComponent from "./BoxComponent";
import Divider from "../helper/Divider";
import { BallStart, Info, TIME } from "../../assets";

const SmallBox = ({ color ,value}) => {
  return (
    <Box
      sx={{
        width: { laptop: "70px", mobile: "17vw" },
        position: "absolute",
        display: "flex",
        left: { mobile: "56.5%", laptop: "49vw", tablet: "49%" },
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        background: "white",
        borderRadius: "7px",
      }}
    >
      <Typography
        sx={{
          fontSize: { laptop: "12px", mobile: "10px" },
          fontWeight: "bold",
          color: value > 1  ? `#46e080` : `#FF9292`,
        }}
      >
        {value > 1  ? `+Book ${value}` : `-Book ${value * -1}`}
      </Typography>
    </Box>
  );
};

const Time = () => {
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
        5 sec Delay
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
  showDely,
  suspended,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const bookRatio=Math.round(teamARates/teamBRates * 100) / 100 || 0;
  
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
          {showDely && <Time />}
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
          <SmallBox  value={bookRatio}  />
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
      {data?.matchOddsData && !suspended && (
        <>
          <BoxComponent
            time={true}
            lock={lock}
            color={"#46e080"}
            allRates={{teamA:teamARates,teamB:teamBRates}}
            rate={teamARates}        
            name={`${data?.teamA}`}
            data={data}
            team={"teamA"}
            typeOfBet={"Match"}
          />
          <Divider />
          <BoxComponent
            time={true}
            lock={lock}
            color={"#FF4D4D"}
            name={`${data?.teamB}`}
            data={data}
            rate={teamBRates}
            allRates={{teamA:teamARates,teamB:teamBRates}}
            team={"teamB"}
            typeOfBet={"Match"}
          />
          <Divider />
        </>
      )}
      {data?.teamC && !suspended && (
        <BoxComponent
          time={true}
          color={"#F8C851"}
          name={"DRAW"}
          data={data}
          team={"draw"}
        />
      )}

      {suspended && (
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
      )}
    </Box>
  );
};
export default Odds;
