import { Box, Typography } from "@mui/material";
import { ARROWUP, CHECK } from "../admin/assets";
import StyledImage from "./StyledImage";
import { useLocation, useNavigate } from "react-router-dom";
import { memo } from "react";

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
    const StockBox = ({ team, value, up }) => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "10px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "13px", laptop: "14px" },
              fontWeight: "700",
            }}
          >
            {team}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: { mobile: "13px", laptop: "16px" },
                marginRight: "5px",
                fontWeight: "700",
              }}
            >
              {value}
            </Typography>
            {(up == true || up == false) && (
              <StyledImage
                src={
                  up
                    ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                    : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                }
                sx={{
                  height: "25px",
                  marginLeft: "5px",
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  width: "25px",
                }}
              />
            )}
            {!team && (
              <img style={{ width: "20px", height: "12px" }} src={ARROWUP} />
            )}
          </Box>
        </Box>
      );
    };
  
    return (
      <Box
        onClick={() => {
          if (mode == "0") {
            navigate(`/${pathname.split("/")[1]}/matches`, {
              state: { submit: true, matchId: data?.id },
            });
          }
          setSelected();
        }}
        sx={{
          cursor: "pointer",
          width: "99%",
          display: "flex",
          position: "relative",
          marginY: "6px",
          alignSelf: "center",
          justifyContent: "space-evenly",
          height: "55px",
          flexDirection: { mobile: "column", laptop: "row" },
          marginX: ".5%",
        }}
      >
        <Box
          sx={{
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
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "8px", mobile: "8px" },
              color: "white",
              fontStyle: "italic",
            }}
          >
            LIVE NOW
          </Typography>
        </Box>
        {mode == "1" && (
          <Box
            sx={{
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1.5px solid white",
              background: !selected ? "#46CF4D" : "rgba(0,0,0,.5)",
            }}
          >
            <img src={CHECK} style={{ width: "40px", height: "40px" }} />
          </Box>
        )}
        <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
          <Box
            sx={{
              background: "#F8C851",
              paddingY: { mobile: 0.5, laptop: 0 },
              width: { mobile: "99%", laptop: "45%" },
              height: "100%",
              display: "flex",
              alignItems: "center",
              marginX: "2px",
              border: "1.5px solid white",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "16px", mobile: "17px" },
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              {team} Vs {team_2}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "55%",
              alignSelf: "center",
              display: "flex",
              height: "100%",
              marginTop: { mobile: "2px", laptop: 0 },
            }}
          >
            <Box
              sx={{
                background: data?.teamA_rate >= 0 ? "#27AC1E" : "#E32A2A",
                width: "34%",
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
                width: "33%",
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
                width: "33%",
                height: "100%",
                border: "1.5px solid white",
              }}
            >
              <StockBox value={data?.totalPlacedBet} team={"Total Bet"} />
            </Box>
          </Box>
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
    );
  };

  export default memo(LiveMarketComponent)