import { Box, Typography } from "@mui/material";
import { ARROWUP, CHECK } from "../admin/assets";
import StyledImage from "./StyledImage";
import { useLocation, useNavigate } from "react-router-dom";
import { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const LiveMarketComponent = ({
  team,
  team_2,
  selected,
  mode,
  setSelected,
  data,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(data?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days:
          ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) || 0,
        hours:
          ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2) ||
          0,
        minutes:
          ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || 0,
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || 0,
      };
    } else {
      timeLeft = {
        days: "00",
        hours: "00",
        minutes: "00",
      };
    }

    return timeLeft;
  }

  const upcoming =
    Number(timeLeft.days) === 0 &&
    Number(timeLeft.hours) === 0 &&
    Number(timeLeft.minutes) <= 59;
  const StockBox = ({ team, value, up }) => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: { mobile: mode == "1" ? "2px" : 0, laptop: "10px" },

          padding: { mobile: "3px", tablet: "5px", laptop: "5px" },
          paddingTop: { mobile: "1px", tablet: "5px", laptop: "5px" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', marginRight: { mobile: "0", tablet: "0", laptop: "10px" } ,minHeight: "24px" }}>
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "9px", tablet: "12px", laptop: "14px" },
              fontWeight: "700",

              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {team}
          </Typography>
          {(up == true || up == false) && (
            <StyledImage
              src={
                up
                  ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                  : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
              }
              sx={{
                height: { mobile: "17px", laptop: "25px" },
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: { mobile: "17px", laptop: "25px" },
              }}
            />
          )}
        </Box>
        <Typography
          sx={{
            color: "white",
            fontSize: { mobile: "13px", laptop: "16px" },
            marginRight: { mobile: "0", laptop: "5px" },
            fontWeight: "700",
            display: "inline",
            textAlign: { mobile: "center", laptop: "center" },
          }}
        >
          {value}
        </Typography>

        {!team && (
          <img alt="arrow" style={{ width: "20px", height: "12px" }} src={ARROWUP} />
        )}
      </Box>
    );
  };

  return (
    <>
      <style jsx="true" scoped>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }

          .liveAnimation {
            overflow: hidden;
            background: linear-gradient(
              315deg,
              rgb(117 255 0) 3%,
              rgb(177 60 206) 38%,
              rgb(255 0 233) 68%,
              rgba(255, 25, 25, 1) 98%
            );
            animation: gradient 5s ease infinite;
            background-size: 400% 400%;
            background-attachment: fixed;
            position: absolute;
            top: -10px;
            left: -1px;
            width: 60px;
          }
          .wave {
            border-radius: 1000% 1000% 0 0;

            height: 12em;
            animation: wave 10s -3s linear infinite;
            transform: translate3d(0, 0, 0);
            opacity: 0.8;
            bottom: 0;
            left: 0;
            z-index: -1;
            background: linear-gradient(
              315deg,
              rgba(101, 0, 94, 1) 3%,
              rgba(60, 132, 206, 1) 38%,
              rgba(48, 238, 226, 1) 68%,
              rgba(255, 25, 25, 1) 98%
            );
          }
          @keyframes wave {
            2% {
              transform: translateX(1);
            }

            25% {
              transform: translateX(-25%);
            }

            50% {
              transform: translateX(-50%);
            }

            75% {
              transform: translateX(-25%);
            }

            100% {
              transform: translateX(1);
            }
          }
          @media only screen and (max-width: 575px) {
            .liveAnimation {
              top: -10px;
              left: -1px;
              height: 18px;
            }
          }
        `}
      </style>
      <Box
        onClick={() => {
          if (mode == "0") {
            sessionStorage.setItem("matchId", data?.id)
            navigate(`/${pathname.split("/")[1]}/matches`, {
              state: { submit: true, matchId: data?.id, activeTab: "Analysis" },
            });
          }
          sessionStorage.removeItem("matchId")
          setSelected();
        }}
        sx={{
          cursor: "pointer",
          width: "99%",
          display: "flex",
          position: "relative",
          margin: { mobile: "4px", tablet: "6px", laptop: "6px 0" },
          alignSelf: "center",
          justifyContent: "space-evenly",
          height: "55px",
          flexDirection: { mobile: "column", laptop: "row" },
          marginX: ".5%",
        }}
      >
        <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
          {mode == "1" && (
            <Box
              sx={{
                // position: { mobile: "absolute", laptop: "relative" },
                // left: { mobile: "2px", laptop: 0 },
                // zIndex: 1,
                width: "55px",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1.5px solid white",
                background: !selected ? "#46CF4D" : "rgba(0,0,0,.5)",
              }}
            >
              <img alt="check" src={CHECK} style={{ width: "40px", height: "40px" }} />
            </Box>
          )}
          <Box
            sx={{
              position: "relative",
              background: "#F8C851",
              paddingY: { mobile: 0.5, laptop: 0 },
              width: { mobile: "36%", laptop: "45%" },
              height: "100%",
              display: "flex",
              alignItems: "center",
              marginX: "2px",
              border: "1.5px solid white",
              minHeight: "30px"
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "16px", mobile: "10px" },
                fontWeight: "bold",
                marginLeft: "5px",

                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                
              }}
            >
              {team} Vs {team_2}
            </Typography>
          {upcoming &&   <Box
              className="liveAnimation"
              sx={{
                backgroundSize: "400% 400%",
                position: "absolute",
                zIndex: 11,
                width: "50px",
                height: "15px",
                top: "-8px",
                left: mode == "1" ? "65px" : "10px",
                background: "#46CF4D",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid white",
                borderRadius: "3px",
              }}
            >
              <Box className="wave"> </Box>
              <Typography
                sx={{
                  fontSize: { laptop: "10px", mobile: "10px" },
                  color: "white",
                  fontStyle: "italic",
                  
                }}
              >
              LIVE NOW
              </Typography>
            </Box>}

            {!upcoming && (
          <Box
          
            sx={{
           
              position: "absolute",
                zIndex: 11,
                width: "70px",
                height: "15px",
                top: "-10px",
          
                left:"-1px",
                background: "#129FFE",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid white",
                borderRadius: "3px",
            }}
          >
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: { laptop: "10px", mobile: "10px" },
                fontWeight: "600",
                color: "white",
              }}
            >
              UPCOMING
            </Typography>
          </Box>
        )}
          </Box>
          <Box
            sx={{
              width: "64%",
              alignSelf: "center",
              display: "flex",
              height: "100%",
            }}
          >
            <Box
              sx={{
                background: data?.teamA_rate >= 0 ? "#27AC1E" : "#E32A2A",
                width: "38%",
                height: "100%",
                border: "1.5px solid white",
              }}
            >
              <StockBox
                value={data?.teamA_rate ? data?.teamA_rate : 0}
                up={data?.teamA_rate >= 0 ? true : false}
                team={team}
              />
            </Box>
            <Box
              sx={{
                background: data?.teamB_rate >= 0 ? "#27AC1E" : "#E32A2A",
                width: "38%",
                height: "100%",
                marginX: "2px",
                border: "1.5px solid white",
              }}
            >
              <StockBox
                value={data?.teamB_rate ? data?.teamB_rate : 0}
                up={data?.teamB_rate >= 0 ? true : false}
                team={team_2}
              />
            </Box>
            <Box
              sx={{
                background: "#0B4F26",
                width: "23%",
                height: "100%",
                border: "1.5px solid white",
              }}
            >
              <StockBox
                value={
                  data?.totalPlacedBet < 10 && data?.totalPlacedBet > 0
                    ? "0" + data?.totalPlacedBet
                    : data?.totalPlacedBet
                }
                team={"Total Bet"}
              />
            </Box>
          </Box>
          {!upcoming && (
            <Box
              sx={{
                width: "99.67%",
                marginRight: ".1%",
                height: "94%",
                marginTop: "1.5px",
                background: "rgba(0,0,0,.6)",
                position: "absolute",
                right: 0,
              }}
            ></Box>
          )}
          {selected && mode == "1" && (
            <Box
              sx={{
                width: "99.67%",
                marginRight: ".1%",
                height: "94%",
                marginTop: "1.5px",
                background: "rgba(0,0,0,.6)",
                position: "absolute",
                right: 0,
              }}
            ></Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default memo(LiveMarketComponent);
