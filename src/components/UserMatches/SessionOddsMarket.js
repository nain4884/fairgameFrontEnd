import React from 'react'
import Divider from '../helper/Divider';
import { Box, Typography } from '@mui/material';

const SessionOddsMarket = ({ data }) => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginY: { mobile: ".2vh", laptop: ".5vh" },
          width: { mobile: "98%", laptop: "97%" },
          marginX: "1vw",
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
              Session Odds
            </Typography>
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
            <SmallBoxSeason />
            <Typography
              sx={{
                color: "white",
                width: "60px",
                fontSize: { laptop: "9px", tablet: "9px", mobile: "7px" },
                fontWeight: "500",
                flexWrap: "wrap",
              }}
            >
              Maximum Bet {data?.betfair_session_max_bet}
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
        <Box sx={{ width: "100%" }}>
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
                  MIN: 4000 MAX:4500
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
                    NO
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
                    YES
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
          {data.matchSessionData.length > 0 &&
            data.matchSessionData.map((element) => {
              return (
                <>
                  <SeasonMarketBox typeOfBet={"Session"} data={element} />
                  <Divider />
                </>
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export default SessionOddsMarket