import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SeparateBox from "./SeparateBox";
import { TEAMLOGO, TEAMLOGO1 } from "../../assets";
import Divider from "../helper/Divider";
import constants, {
  apiBasePath,
  microServiceApiPath,
} from "../helper/constants";
import MatchOdds from "../../pages/expert/MatchOdds/MatchOdds";
import { SocketContext } from "../../context/socketContext";
import Axios from "axios";
import { formatNumber } from "../helper/helper";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../../newStore/reducers/matchDetails";
import { logout } from "../../newStore/reducers/auth";
import { GlobalStore } from "../../context/globalStore";
import { setRole } from "../../newStore";
import { removeSocket } from "../helper/removeSocket";
let matchOddsCount = 0;
const Odds = ({ onClick, top, blur, match }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [matchOddsLive, setMatchOddsLive] = useState([]);
  const { socketMicro, socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const { axios } = setRole();

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
        days: ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2),
        hours: ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(
          -2
        ),
        minutes: ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2),
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2),
      };
    }

    return timeLeft;
  }

  const upcoming =
    (!isNaN(parseInt(timeLeft?.hours, 10)) &&
      parseInt(timeLeft?.hours, 10) === 0) ||
    (!isNaN(parseInt(timeLeft?.days, 10)) &&
      parseInt(timeLeft?.days, 10) === 0) ||
    (!isNaN(parseInt(timeLeft?.minutes, 10)) &&
      parseInt(timeLeft?.minutes, 10) <= constants.timeRemaining);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.onevent = async (packet) => {
        if (packet.data[0] === "logoutUserForce") {
          dispatch(removeCurrentUser());
          dispatch(removeManualBookMarkerRates());
          dispatch(removeSelectedMatch());
          dispatch(logout({ roleType: "role4" }));
          setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
          // await axios.get("auth/logout");
          removeSocket();

          socket.disconnect();
          socketMicro.disconnect();
        }
        if (packet.data[0] === "userBalanceUpdate") {
          const data = packet.data[1];
          const user = {
            ...currentUser,
            current_balance: data?.currentBalacne,
          };
          dispatch(setCurrentUser(user));

          //currentBalacne
        }
      };
    }
  }, [socket]);

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
    <>
      <style jsx scoped>
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
            top: 0;
            left: 0;
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
        `}
      </style>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginY: { mobile: ".8vh", laptop: "3px" },
          marginTop: {
            mobile: top ? "10px" : "1.2vh",
            laptop: top ? "10px" : "1vh",
          },
          width: { mobile: "98%", laptop: "97.8%" },
          marginX: "1vw",
          padding: 0.1,
          background: "white",
        }}
      >
        {upcoming && (
          <Box
           onClick={onClick}
            sx={{
              position: "absolute",
              cursor: "pointer",
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
              className="liveAnimation"
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
              <Box className="wave"> </Box>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: { laptop: "10px", mobile: "10px" },
                  fontWeight: "600",
                  color: "white",
                  // border: '1px solid linear-gradient(90deg, rgba(233,254,234,1) 1%, rgba(206,255,209,1) 100%)'
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
                overflow: "hidden",
                alignItems: { laptop: "center", mobile: "flex-end" },
                display: "flex",
              }}
            >
              <Typography
                noWrap={true}
                sx={{
                  overflow: "hidden",
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
              <div className="slanted"></div>
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
                    sx={{
                      fontSize: "8px",
                      fontWeight: "400",
                      color: "#0B4F26",
                    }}
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
                    sx={{
                      fontSize: "8px",
                      fontWeight: "400",
                      color: "#0B4F26",
                    }}
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
                    sx={{
                      fontSize: "8px",
                      fontWeight: "400",
                      color: "#0B4F26",
                    }}
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
                {match.teamA} 4645
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
                        matchOddsLive?.runners[12]?.ex?.availableToBack
                          ?.length > 0
                          ? matchOddsLive?.runners[2]?.ex?.availableToBack[2]
                              ?.price
                          : 0
                      }
                      value2={formatNumber(
                        matchOddsLive?.runners?.length &&
                          matchOddsLive?.runners[2]?.ex?.availableToBack
                            ?.length > 0
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
                        matchOddsLive?.runners[2]?.ex?.availableToBack?.length >
                          0
                          ? matchOddsLive?.runners[2]?.ex?.availableToBack[1]
                              ?.price
                          : 0
                      }
                      value2={formatNumber(
                        matchOddsLive?.runners?.length &&
                          matchOddsLive?.runners[2]?.ex?.availableToBack
                            ?.length > 0
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
                        ? matchOddsLive?.runners[2]?.ex?.availableToBack[0]
                            ?.price
                        : 0
                    }
                    value2={formatNumber(
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToBack?.length >
                          0
                        ? matchOddsLive?.runners[2]?.ex?.availableToBack[0]
                            ?.size
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
                        ? matchOddsLive?.runners[2]?.ex?.availableToLay[0]
                            ?.price
                        : 0
                    }
                    value2={formatNumber(
                      matchOddsLive?.runners?.length &&
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length >
                          0
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
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length >
                          0
                          ? matchOddsLive?.runners[2]?.ex?.availableToLay[1]
                              ?.price
                          : 0
                      }
                      value2={formatNumber(
                        matchOddsLive?.runners?.length &&
                          matchOddsLive?.runners[2]?.ex?.availableToLay
                            ?.length > 0
                          ? matchOddsLive?.runners[2]?.ex?.availableToLay[1]
                              ?.size
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
                        matchOddsLive?.runners[2]?.ex?.availableToLay?.length >
                          0
                          ? matchOddsLive?.runners[2]?.ex?.availableToLay[2]
                              ?.price
                          : 0
                      }
                      value2={formatNumber(
                        matchOddsLive?.runners?.length &&
                          matchOddsLive?.runners[2]?.ex?.availableToLay
                            ?.length > 0
                          ? matchOddsLive?.runners[2]?.ex?.availableToLay[2]
                              ?.size
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
    </>
  );
};

export default Odds;
