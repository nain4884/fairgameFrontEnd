import React, { useEffect } from "react";
import Divider from "../../helper/Divider";
import SessionMarketBox from "./SessionMarketBox";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { FASTTIME, HourGlass, Info } from "../../../assets";
import { useTheme } from "@emotion/react";
import SmallBoxSeason from "../SmallBoxSeason";
import { memo } from "react";
import { useState } from "react";
import FastTimePlaceBet from "../../FastImePlaceBet";
import FastTime from "../../FastTime";
import { currencyFormatter, formatNumber } from "../../helper/helper";
import Lottie from "lottie-react";
const SessionMarket = ({
  data,
  newData,
  showFast,
  teamARates,
  teamBRates,
  teamCRates,
  allBetsData,
  sessionExposer,
  dataProfit,
  sessionBets,
  sessionOffline,
  setFastAmount,
  fastAmount,
  session,
}) => {
  const theme = useTheme();
  const [showFastTimeBox, setShowFastTimeBox] = useState(false);
  const [fastBetLoading, setFastBetLoading] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const matchSessionData = newData?.bettings?.filter(
    (element) => element.sessionBet === true
  );

  return (
    <>
      <Box
        id={"test"}
        sx={{
          display: "flex",
          position: "relative",
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
                width: "100%",
                fontSize: { laptop: "13px", tablet: "12px", mobile: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              Session Odds
            </Typography>
            {showFast && (
              <FastTime
                session={session}
                setFastAmount={setFastAmount}
                setShowFastTimeBox={setShowFastTimeBox}
                data={fastAmount ? currencyFormatter(fastAmount) : ""}
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
            <div class="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: {
                mobile: "flex-end",
                laptop: "center",
                tablet: "flex-end",
              },
            }}
          >
            {/* {console.warn("newData11 ",newData)} */}
            <SmallBoxSeason
              allBetsData={allBetsData}
              sessionBets={sessionBets}
              totalAmount={sessionExposer}
            />
            {/* <Typography
              sx={{
                color: "white",
                width: { mobile: "40px", tablet: "100px", laptop: "100px" },
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
            /> */}
          </Box>
        </Box>
        {showFastTimeBox && (
          <Box>
            <FastTimePlaceBet
              session={session}
              setFastAmount={setFastAmount}
              selectedFastAmount={fastAmount}
              setShowFastTimeBox={setShowFastTimeBox}
            />
          </Box>
        )}
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
                  gap: { mobile: "0px", laptop: "1px", tablet: "1px" },
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
          {fastBetLoading && (
            <Box
              sx={{
                position: "absolute",
                height: "84%",
                top: "16%",
                width: "100%",
                display: "flex",
                zIndex: "999",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0, 0, 0, .5)",
              }}
            >
              <Lottie
                animationData={HourGlass}
                style={{
                  display: "flex",
                  alignSelf: "center",
                  width: "50px",
                  height: "50px",
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
              maxHeight: "387px",
              overflowY: "auto",
            }}
          >
            {matchSessionData?.length > 0 &&
              matchSessionData?.reverse()?.map((element) => {
                return (
                  <Box
                    key={element?.id}
                    sx={{
                      width: "100%",
                      display: sessionOffline?.includes(element.id)
                        ? "none"
                        : "block",
                    }}
                  >
                    <SessionMarketBox
                      typeOfBet={"Session"}
                      setFastBetLoading={setFastBetLoading}
                      data={element}
                      sessionMain={session}
                      selectedFastAmount={fastAmount}
                      setFastAmount={setFastAmount}
                      mainData={data}
                      newData={newData}
                      allRates={{
                        teamA: teamARates,
                        teamB: teamBRates,
                        teamC: teamCRates,
                      }}
                    />
                    <Divider />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
      {/* <Pagination className="whiteTextPagination d-flex justify-content-center" count={pageCount} color="primary" onChange={callPage} /> */}
    </>
  );
};

export default memo(SessionMarket);
