import React from "react";
import Divider from "../../helper/Divider";
import SessionMarketBox from "./SessionMarketBox";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Info } from "../../../assets";
import { useTheme } from "@emotion/react";
import SmallBoxSeason from "../SmallBoxSeason";
import { memo } from "react";

const SessionMarket = ({ data, newData, teamARates, teamBRates }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

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
              Maximum Bet {newData?.betfair_session_max_bet}
            </Typography>
            <img
              alt="sd"
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
                  MIN:{newData?.manaual_session_min_bet} MAX:
                  {newData?.manaual_session_max_bet}
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
                    NO
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>
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
                    YES
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
          {newData?.matchSessionData?.length > 0 &&
            newData?.matchSessionData?.map((element) => {
              return (
                <Box key={element?.id} sx={{ width: "100%" }}>
                  <SessionMarketBox
                    typeOfBet={"Session"}
                    data={element}
                    mainData={data}
                    newData={newData}
                    allRates={{ teamA: teamARates, teamB: teamBRates }}
                  />
                  <Divider />
                </Box>
              );
            })}
        </Box>
      </Box>
      {/* <Pagination className="whiteTextPagination d-flex justify-content-center" count={pageCount} color="primary" onChange={callPage} /> */}
    </>
  );
};

export default memo(SessionMarket);
