import React, { useEffect } from "react";
import Divider from "../../helper/Divider";
import SessionMarketBox from "./SessionMarketBox";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { FASTTIME, HourGlass, Info, ARROWUP } from "../../../assets";

import { useTheme } from "@emotion/react";
import SmallBoxSeason from "../SmallBoxSeason";
import { memo } from "react";
import { useState } from "react";
import FastTimePlaceBet from "../../FastImePlaceBet";
import FastTime from "../../FastTime";
import { currencyFormatter, formatNumber } from "../../helper/helper";
import Lottie from "lottie-react";
import { LockIcon } from "../../../admin/assets";
import SmallCustomLoader from "../../helper/SmallCustomLoader";
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
  betLock,
  upcoming,
  handleRateChange,
  title,
  max,
  min,
  typeOfBet
}) => {
  const theme = useTheme();
  const [showFastTimeBox, setShowFastTimeBox] = useState(false);
  const [fastBetLoading, setFastBetLoading] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const matchSessionData = newData?.bettings?.filter((element) => {
    if (newData.apiSessionActive && title === "Session Market") {
      return element.sessionBet === true && element.selectionId !== null; // Show elements where selectionId is not null when apiSessionActive is true
    }

    if (newData.manualSessionActive && title === "Quick Session Market") {
      return element.sessionBet === true && element.selectionId === null; // Show elements where selectionId is null when manualSessionActive is true
    }

    return false; // Default case: no active session types
  });
  const [visible, setVisible] = useState(true);

  console.log(sessionOffline,'sessionOffline')
  return (
    <>
      <Box
        id={"test"}
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: "1px",
          flexDirection: "column",
          marginY: { mobile: "2px", laptop: ".5vh" },
          marginTop: { mobile: "0" },
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
            width: "99.9%",
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
                fontSize: { laptop: "13px", tablet: "10px", mobile: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
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
            <div className="slanted"></div>
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
            <Box
              className="arrowUpCollaps"
              sx={{
                flex: 1,
                background: { laptop: "#262626", mobile: "none" },
                position: { laptop: "static", mobile: "absolute" },
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
        {visible && (
          <Box sx={{ width: "100%", position: "relative" }}>
            {
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { laptop: "100%", mobile: "99.9%" },
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
                    MIN:{min} MAX:
                    {max}
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
                      width: { laptop: "16%", mobile: "30%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      borderLeft: {
                        laptop: "0 solid #319e5b",
                        mobile: "1px solid #319e5b",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      NO
                    </Typography>
                  </Box>
                  <Box sx={{ width: ".35%", display: "flex" }}></Box>
                  <Box
                    sx={{
                      background: "#00C0F9",
                      width: { laptop: "16.5%", mobile: "29.9%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: {
                        laptop: " 4px solid #319e5b;",
                        mobile: "0 solid #319e5b",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      YES
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
            {betLock && (
              <Box
                sx={{
                  position: "absolute",
                  height: "86%",
                  top: "14%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .6)",
                }}
              >
                <Box
                  sx={{
                    width: { mobile: "60%", laptop: "40%", tablet: "60%" },
                  }}
                ></Box>
                <Box
                  sx={{
                    width: { mobile: "40%", laptop: "60%", tablet: "40%" },
                    gap: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "35px", height: "40px" }}
                    src={LockIcon}
                  />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      margin: "20px 0px 0px -25px",
                      fontSize: "20px",
                      color: "#FFF",
                    }}
                  >
                    Locked
                  </Typography>
                </Box>
              </Box>
            )}

            {upcoming && matchSessionData?.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  height: "90%",
                  // top: "29%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .5)",
                }}
              ></Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                position: "relative",
                maxHeight: "387px",
                overflowY: "visible",
              }}
            >
              {matchSessionData?.length > 0 &&
                matchSessionData?.reverse()?.map((element) => {
                  return (
                    <Box
                      key={element?.id}
                      sx={{
                        width: "100%",
                        display: element?.betStatus === 2
                          ? "none"
                          : "block",
                      }}
                    >
                      <SessionMarketBox
                        closeModal={sessionOffline?.includes(element.id)}
                        typeOfBet={typeOfBet}
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
                        handleRateChange={handleRateChange}
                      />
                      <Divider />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        )}
      </Box>

      <style jsx="true" scope="true">
        {`
          @media only screen and (max-width: 600px) {
            body .arrowUpCollaps img {
              width: 14px !important;
              height: 14px !important;
              margin-right: 3px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default memo(SessionMarket);
