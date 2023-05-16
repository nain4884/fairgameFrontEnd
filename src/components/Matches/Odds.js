import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SeparateBox from "./SeparateBox";
import { TEAMLOGO, TEAMLOGO1 } from "../../assets";
import Divider from "../helper/Divider";
import { apiBasePath, microServiceApiPath } from "../helper/constants";
import MatchOdds from "../../pages/expert/MatchOdds/MatchOdds";
import { SocketContext } from "../../context/socketContext";
import Axios from "axios";
import { formatNumber } from "../helper/helper";
import moment from "moment-timezone";
let matchOddsCount = 0;
const Odds = ({ onClick, top, blur, match }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [matchOddsLive, setMatchOddsLive] = useState([]);
  const { socketMicro } = useContext(SocketContext);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(match?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const upcoming = (timeLeft?.hours || timeLeft?.days) > 1 ? false : false;

  const activateLiveMatchMarket = async () => {
    try {
      await Axios.get(`${microServiceApiPath}/market/${match?.marketId}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  useEffect(() => {
    if (socketMicro && socketMicro.connected && match?.marketId) {
      socketMicro.emit("init", { id: match?.marketId });
      activateLiveMatchMarket();
      socketMicro.on(`matchOdds${match?.marketId}`, (val) => {
        if (val.length === 0) {
          matchOddsCount += 1;
          if (matchOddsCount >= 3) {
            socketMicro.emit("disconnect_market", {
              id: match?.marketId,
            });
            // socketMicro.disconnect();
          }
        } else {
          // dispatch(setMatchOddsLive(val[0]));
          setMatchOddsLive(val[0]);
          if (val[0]?.status === "CLOSED") {
            socketMicro.emit("disconnect_market", {
              id: match?.marketId,
            });
          }
        }
      });

      return () => {
        socketMicro?.emit("disconnect_market", {
          id: match?.marketId,
        });
        setMatchOddsLive([]);
      };
    }
  }, [socketMicro, match?.marketId]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        marginY: { mobile: ".8vh", laptop: "1vh" },
        marginTop: {
          mobile: top ? "1vh" : "1.2vh",
          laptop: top ? "2vh" : "1vh",
        },
        width: { mobile: "98%", laptop: "97.8%" },
        marginX: "1vw",
        padding: 0.1,
        background: "white",
      }}
    >
      {upcoming && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            background: "rgba(0,0,0,0.5)",
            width: "100%",
            right: 0,
            height: "100%",
          }}
        ></Box>
      )}

      {upcoming && (
        <Box
          sx={{
            width: "70px",
            zIndex: 3,
            border: "1px solid white",
            height: { mobile: "20px", laptop: "13px" },
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            background: "#129FFE",
            position: "absolute",
            marginTop: -1,
            borderRadius: "3px",
            marginLeft: 1,
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
      <Box
        onClick={onClick}
        sx={{
          zIndex: 0,
          filter: blur ? "blur(0px)" : null,
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
          },
          background: "white",
          cursor: "pointer",
        }}
      >
        {!upcoming && (
          <Box
            sx={{
              width: "50px",
              border: "1px solid white",
              height: { mobile: "20px", laptop: "13px" },
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              background: "#46CF4D",
              position: "absolute",
              marginTop: -1,
              borderRadius: "3px",
              marginLeft: 1,
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
              LIVE
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            height: "38px",
            flexDirection: "row",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1.2,
              background: "#f1c550",
              alignItems: { laptop: "center", mobile: "flex-end" },
              display: "flex",
            }}
          >
            <Typography
              noWrap={true}
              sx={{
                marginBottom: "2px",
                fontSize: { laptop: "14px", mobile: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {match.teamA} vs {match.teamB}{" "}
              <span style={{ fontWeight: "500" }}>
                ({moment(match.startAt).format("LL")})
              </span>
            </Typography>{" "}
            {/* Today at 9:30 PM */}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "80%",
                marginRight: "3px",
                borderRadius: "4px",
                width: "110px",
                background: "white",
                justifyContent: "space-evenly",
                display: "flex",
                alignSelf: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#0B4F26",
                  }}
                >
                  {timeLeft?.days || 0}
                </Typography>
                <Typography
                  sx={{ fontSize: "8px", fontWeight: "400", color: "#0B4F26" }}
                >
                  Days
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#0B4F26",
                  }}
                >
                  :
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#0B4F26",
                  }}
                >
                  {timeLeft?.hours || 0}
                </Typography>
                <Typography
                  sx={{ fontSize: "8px", fontWeight: "400", color: "#0B4F26" }}
                >
                  Hrs
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#0B4F26",
                  }}
                >
                  :
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#0B4F26",
                  }}
                >
                  {timeLeft?.minutes || 0}
                </Typography>
                <Typography
                  sx={{ fontSize: "8px", fontWeight: "400", color: "#0B4F26" }}
                >
                  Min
                </Typography>
              </Box>
            </Box>
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
                MIN: {match.betfair_match_min_bet} MAX:{" "}
                {match.betfair_match_max_bet}
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
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: "40%",
              alignItems: "center",
            }}
          >
            {match?.teamA_Image !== null && (
              <img
                src={`${apiBasePath}/${match?.teamA_Image}`}
                style={{ width: "25px", height: "25px", marginLeft: "10px" }}
                alt={match?.teamA}
              />
            )}
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: "11px", tablet: "10px", mobile: "10px" },
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {match.teamA}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: { laptop: "60%", mobile: "80%" },
              justifyContent: { mobile: "flex-end", laptop: "center" },
              alignItems: "center",
            }}
          >
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToBack[2]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToBack[2]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#CEEBFF"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToBack[1]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToBack[1]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#C2E6FF"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[0]?.ex?.availableToBack?.length > 0
                  ? matchOddsLive?.runners[0]?.ex?.availableToBack[0]?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[0]?.ex?.availableToBack?.length > 0
                  ? matchOddsLive?.runners[0]?.ex?.availableToBack[0]?.size
                  : 0
              )}
              color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
            />
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[0]?.ex?.availableToLay?.length > 0
                  ? matchOddsLive?.runners[0]?.ex?.availableToLay[0]?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[0]?.ex?.availableToLay?.length > 0
                  ? matchOddsLive?.runners[0]?.ex?.availableToLay[0]?.size
                  : 0
              )}
              color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
            />
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToLay[1]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToLay[1]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#F2CBCB"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToLay[2]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[0]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[0]?.ex?.availableToLay[2]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#ECD6D6"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: "40%",
              alignItems: "center",
            }}
          >
            {match?.teamB_Image !== null && (
              <img
                src={`${apiBasePath}/${match?.teamB_Image}`}
                style={{ width: "25px", height: "25px", marginLeft: "10px" }}
                alt={match?.teamB}
              />
            )}
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: "12px", mobile: "11px" },
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {match.teamB}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: { laptop: "60%", mobile: "80%" },
              justifyContent: { mobile: "flex-end", laptop: "center" },
              alignItems: "center",
            }}
          >
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToBack[2]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToBack[2]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#CEEBFF"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToBack[1]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToBack?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToBack[1]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#C2E6FF"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[1]?.ex?.availableToBack?.length > 0
                  ? matchOddsLive?.runners[1]?.ex?.availableToBack[0]?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[1]?.ex?.availableToBack?.length > 0
                  ? matchOddsLive?.runners[1]?.ex?.availableToBack[0]?.size
                  : 0
              )}
              color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
            />
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[1]?.ex?.availableToLay?.length > 0
                  ? matchOddsLive?.runners[1]?.ex?.availableToLay[0]?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[1]?.ex?.availableToLay?.length > 0
                  ? matchOddsLive?.runners[1]?.ex?.availableToLay[0]?.size
                  : 0
              )}
              color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
            />
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToLay[1]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToLay[1]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#F2CBCB"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeparateBox
                value={
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToLay[2]?.price
                    : 0
                }
                value2={formatNumber(
                  matchOddsLive?.runners?.length &&
                    matchOddsLive?.runners[1]?.ex?.availableToLay?.length > 0
                    ? matchOddsLive?.runners[1]?.ex?.availableToLay[2]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#ECD6D6"}
              />
            )}
            <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box>
          </Box>
        </Box>
        {match.teamC && (
          <>
            <Divider />
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "white",
                  height: "40px",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontSize: { laptop: "12px", mobile: "11px" },
                    marginLeft: "7px",
                    fontWeight: "600",
                  }}
                >
                  {match.teamC}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "white",
                  height: "40px",
                  width: { laptop: "60%", mobile: "80%" },
                  justifyContent: { mobile: "flex-end", laptop: "center" },
                  alignItems: "center",
                }}
              >
                {!matchesMobile && (
                  <SeparateBox
                    value={
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[12]?.ex?.availableToBack?.length >
                        0
                        ? matchOddsLive?.runners[2]?.ex?.availableToBack[2]
                          ?.price
                        : 0
                    }
                    value2={formatNumber(
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToBack?.length >
                        0
                        ? matchOddsLive?.runners[2]?.ex?.availableToBack[2]
                          ?.size
                        : 0
                    )}
                    color={matchesMobile ? "white" : "#CEEBFF"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateBox
                    value={
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToBack?.length > 0
                        ? matchOddsLive?.runners[2]?.ex?.availableToBack[1]
                          ?.price
                        : 0
                    }
                    value2={formatNumber(
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToBack?.length >
                        0
                        ? matchOddsLive?.runners[2]?.ex?.availableToBack[1]
                          ?.size
                        : 0
                    )}
                    color={matchesMobile ? "white" : "#C2E6FF"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateBox
                  value={
                    matchOddsLive?.runners?.length &&
                      matchOddsLive?.runners[2]?.ex?.availableToBack?.length > 0
                      ? matchOddsLive?.runners[2]?.ex?.availableToBack[0]?.price
                      : 0
                  }
                  value2={formatNumber(
                    matchOddsLive?.runners?.length &&
                      matchOddsLive?.runners[2]?.ex?.availableToBack?.length > 0
                      ? matchOddsLive?.runners[2]?.ex?.availableToBack[0]?.size
                      : 0
                  )}
                  color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
                />
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateBox
                  value={
                    matchOddsLive?.runners?.length &&
                      matchOddsLive?.runners[2]?.ex?.availableToLay?.length > 0
                      ? matchOddsLive?.runners[2]?.ex?.availableToLay[0]?.price
                      : 0
                  }
                  value2={formatNumber(
                    matchOddsLive?.runners?.length &&
                      matchOddsLive?.runners[2]?.ex?.availableToLay?.length > 0
                      ? matchOddsLive?.runners[2]?.ex?.availableToLay[0]?.size
                      : 0
                  )}
                  color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
                />
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateBox
                    value={
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length > 0
                        ? matchOddsLive?.runners[2]?.ex?.availableToLay[1]
                          ?.price
                        : 0
                    }
                    value2={formatNumber(
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length >
                        0
                        ? matchOddsLive?.runners[2]?.ex?.availableToLay[1]?.size
                        : 0
                    )}
                    color={matchesMobile ? "white" : "#F2CBCB"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateBox
                    value={
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length > 0
                        ? matchOddsLive?.runners[2]?.ex?.availableToLay[2]
                          ?.price
                        : 0
                    }
                    value2={formatNumber(
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length >
                        0
                        ? matchOddsLive?.runners[2]?.ex?.availableToLay[2]?.size
                        : 0
                    )}
                    color={matchesMobile ? "white" : "#ECD6D6"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Odds;
