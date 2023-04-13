import React, { useContext, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery, Box, Menu, MenuItem } from "@mui/material";
import {
  BallStart,
  Header,
  INDIA,
  Info,
  Lock,
  Logout,
  PAKISTAN,
  TIME,
  UD,
} from "../../assets/index";
import "../../components/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setColorValue } from "../../store/selectedColorBox";
import { useState } from "react";
import { StyledImage } from "../../components";
import { Popover } from "react-tiny-popover";
import {
  ARROWDOWN,
  ArrowDownRed,
  ArrowUpGreen,
  BACKIMAGE,
  BroadCast,
  BroadCast_,
  DropDown,
  LOCKED,
  LOCKOPEN,
} from "../../expert/assets";
import AllBets from "../../components/AllBets";
import { Background, CustomHeader as CHeader } from "../../components/index";
import ResultComponent from "../../components/ResultComponent";
import SessionResultModal from "../../components/SessionResultModal";
import AddNotificationModal from "../../components/AddNotificationModal";
import CustomHeader from "./Header";
import { SocketContext } from "../../context/socketContext";
import { useLocation } from "react-router-dom";
import {
  setAllBetRate,
  setBookMakerLive,
  setManualBookMarkerRates,
  setMatchOdds,
  setMatchOddsLive,
  setSessionOddsLive,
} from "../../newStore/reducers/matchDetails";
import {
  removeSelectedMatch,
  setSelectedMatch,
} from "../../newStore/reducers/expertMatchDetails";
import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";

let matchOddsCount = 0;

const SeperateBox = ({ color, empty, value, value2, lock, session, back }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const dispatch = useDispatch();
  // const anchor=useSelector(state=>state.betplace)?.anchor
  const [anchor, setAnchor] = React.useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [canceled, setCanceled] = React.useState(false);
  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        align={matchesMobile ? "end" : "center"}
        positions={["bottom"]} // preferred positions by priority
        onClickOutside={() => setIsPopoverOpen(false)}
        // content={<PlaceBet onSubmit={() => {
        //     setVisible(true)
        //     setCanceled(false)
        // }}
        //     onCancel={() => {
        //         setVisible(true)
        //         setCanceled(true)
        //     }}

        //     handleClose={() => {
        //         setIsPopoverOpen(false)
        //     }}
        //     season={session}
        //     back={back}
        // />}
      >
        <Box
          onClick={(e) => {
            if (lock || color == "white") {
              return null;
            }
            setIsPopoverOpen(!isPopoverOpen);
            dispatch(setColorValue(color));
          }}
          sx={{
            background: lock ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: { mobile: "30%", laptop: "20%" },
            height: "94%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!empty && !lock && (
            <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: color == "white" ? "white" : "black",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "8px",
                  marginTop: -0.4,
                  color: color == "white" ? "white" : "black",
                  textAlign: "center",
                }}
              >
                {value2}
              </Typography>
            </Box>
          )}
          {lock && <img src={Lock} style={{ width: "10px", height: "15px" }} />}
        </Box>
      </Popover>
    </>
  );
};

const MatchScreen = ({}) => {
  const [data, setData] = useState([]);
  const { socket, socketMicro } = useContext(SocketContext);
  const { state } = useLocation();

  const { axios } = setRole();
  const dispatch = useDispatch();
  const { allBetRates, matchOddsLive, bookmakerLive, sessionOddsLive } =
    useSelector((state) => state?.matchDetails);
  const { allMatch, selectedMatch } = useSelector(
    (state) => state?.expertMatchDetails
  );
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);
  console.log("allMatch", currentMatch);
  const [IObets, setIObtes] = useState(allBetRates);

  const getSingleMatch = async (val) => {
    try {
      dispatch(removeSelectedMatch());
      const { data } = await axios.get(`game-match/matchDetail/${val}`);
      setCurrentMatch(data);
      dispatch(setSelectedMatch(data));
    } catch (e) {
      console.log(e?.message, "message");
    }
  };
  useEffect(() => {
    if (state?.id) {
      getSingleMatch(state.id);
    }
  }, [state]);

  useEffect(() => {
    if (socket && socket.connected) {
      console.log("Connected", socket);
      socket.on("newMessage", (value) => {
        console.log(value);
      });
      socket.on("session_bet", (data) => {
        console.log("SESSION Response", data);

        //  console.log(session,"SDsdsdasdsa")
        // dispatch(setCurrentUser(user));
        // dispatch(setAllSessionBets(session));
        // dispatch(setSessionRates(data?.profitLoss))
      });
      socket.on("match_bet", (data) => {
        try {
          // getAllBets();
          console.log(data, "MATCHH_BET");
          if (data) {
            const body = {
              id: data?.betPlaceData?.id,
              isActive: true,
              createAt: data?.betPlaceData?.createdAt,
              updateAt: data?.betPlaceData?.createdAt,
              createdBy: null,
              deletedAt: null,
              user: { userName: data?.betPlaceData?.userName },
              user_id: null,
              match_id: data?.betPlaceData?.match_id,
              bet_id: data?.betPlaceData?.bet_id,
              result: "pending",
              team_bet: data?.betPlaceData?.team_bet,
              odds: data?.betPlaceData?.odds,
              win_amount: null,
              loss_amount: null,
              bet_type: data?.betPlaceData?.bet_type,
              country: null,
              ip_address: null,
              rate: null,
              marketType: data?.betPlaceData?.marketType,
              amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
            };

            if (currentMatch?.id === data?.betPlaceData?.match_id) {
              setIObtes((prev) => [body, ...prev]);
            }

            // dispatch(setCurrentUser(user));
            // dispatch(setManualBookMarkerRates(manualBookmaker));
          }
        } catch (e) {
          console.log("error", e?.message);
        }
        // // dispatch(setAllBetRates(allBetRates.push(body)));
        // const manualBookmaker = {
        //   teamA: data.teamA_rate,
        //   teamB: data.teamB_rate,
        // };
        // setMatchOddsRates((prev) => ({
        //   ...prev,
        //   manualBookmaker,
        // }));
        // // dispatch(
        // //   stateActions.setMatchDetails(manualBookmaker)
        // // );
        // dispatch(
        //   stateActions.setBalance(data.newBalance, role, data.exposure)
        // );
      });

      socket.on("bookMakerRateLive", (e) => {
        console.log("BookMaker", e);
        if (e?.matchId === currentMatch?.id) {
          const body = { ...currentMatch, bookMakerRateLive: e?.bookMakerLive };
          setCurrentMatch(body);
        }
      });
      // socket.emit("init", { id: currentMatch?.marketId });
    }
  }, [socket]);

  const activateLiveMatchMarket = async () => {
    try {
      await Axios.get(
        `${microServiceApiPath}/market/${currentMatch?.marketId}`
      );
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  useEffect(() => {
    if (socketMicro && socketMicro.connected && currentMatch?.marketId) {
      socketMicro.emit("init", { id: currentMatch?.marketId });
      activateLiveMatchMarket();
      // socketMicro.on("bookMakerRateLive", (e) => {
      //   console.log("BookMaker", e);
      // });
      socketMicro.on(`session${currentMatch?.marketId}`, (val) => {
        // console.log("val", val);
        dispatch(setSessionOddsLive(val[0]));
      });
      socketMicro.on(`matchOdds${currentMatch?.marketId}`, (val) => {
        if (val.length === 0) {
          matchOddsCount += 1;
          if (matchOddsCount >= 3) {
            socketMicro.emit("disconnect_market", {
              id: currentMatch?.marketId,
            });
            socketMicro.disconnect();
          }
        } else {
          dispatch(setMatchOddsLive(val[0]));
        }
      });
      socketMicro.on(`bookmaker${currentMatch?.marketId}`, (val) => {
        dispatch(setBookMakerLive(val[0]));
      });
    }
  }, [socketMicro, currentMatch]);

  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      setIObtes(data?.data[0]);
      dispatch(setAllBetRate(data?.data[0]));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (state?.id) {
      getAllBetsData(state?.id);
    }
  }, [state?.id]);

  const Divider = () => {
    return (
      <Box
        sx={{ width: "100%", background: "rgba(211,211,211)", height: ".5px" }}
      ></Box>
    );
  };

  const BoxComponent = ({ name, data, color, align, lock }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "40px",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            position: "relative",
            height: "40px",
            width: "35%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            {name != "DRAW" ? (
              <img
                src={name == "INDIA" ? INDIA : PAKISTAN}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
              />
            ) : (
              <Box
                sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
              ></Box>
            )}
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: "12px", mobile: "13px" },
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              {name}
            </Typography>
          </Box>
          {name != "DRAW" && <MoneyBox color={color} />}
        </Box>
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { laptop: "65%", mobile: "80%" },
            justifyContent: { mobile: "flex-end", laptop: "center" },
            alignItems: "center",
          }}
        >
          {!matchesMobile && (
            <SeperateBox
              align={align}
              lock={lock}
              value={
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[0]?.price
                  : 0
              }
              value2={
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[0]?.size
                  : 0
              }
              color={matchesMobile ? "white" : "#CEEBFF"}
            />
          )}
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeperateBox
              align={align}
              lock={lock}
              value={
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[1]?.price
                  : 0
              }
              value2={
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[1]?.size
                  : 0
              }
              color={matchesMobile ? "white" : "#C2E6FF"}
            />
          )}
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            align={align}
            value={
              data?.availableToBack?.length > 0
                ? data?.availableToBack[2]?.price
                : 0
            }
            lock={lock}
            value2={
              data?.availableToBack?.length > 0
                ? data?.availableToBack[2]?.size
                : 0
            }
            color={matchesMobile ? "white" : "#A7DCFF"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            align={align}
            value={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[0]?.price
                : 0
            }
            lock={lock}
            value2={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[0]?.size
                : 0
            }
            color={matchesMobile ? "white" : "#FFB5B5"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            back={true}
            align={align}
            lock={lock}
            value={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[1]?.price
                : 0
            }
            value2={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[1]?.size
                : 0
            }
            color={"#F2CBCB"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            align={align}
            value={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[2]?.price
                : 0
            }
            lock={lock}
            value2={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[2]?.size
                : 0
            }
            color={"#ECD6D6"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
    );
  };
  const SmallBox = ({ color, title, width, textSize, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: { laptop: width ? width : "80px", mobile: "17vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: "30px",
          background: color ? color : "#46e080",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: textSize ? textSize : "11px", mobile: "10px" },
            fontWeight: "600",
            color: color ? "white" : "white",
          }}
        >
          {title}
        </Typography>
        <img src={BroadCast} style={{ height: "15px", width: "15px" }} />
      </Box>
    );
  };
  const Stop = ({ color, title, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: { laptop: "90px", mobile: "17vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: "11px", mobile: "10px" },
            fontWeight: "600",
            color: color ? "white" : "white",
          }}
        >
          {"Stop"}
        </Typography>
        <img
          src={BroadCast_}
          style={{ height: "15px", width: "20px", backgroundSize: "contains" }}
        />
      </Box>
    );
  };
  const Result = ({ color, title, invert, onClick }) => {
    return (
      <Box onClick={onClick}>
        <Box
          sx={{
            width: { laptop: "90px", mobile: "17vw" },
            display: "flex",
            marginRight: "10px",
            justifyContent: "center",
            paddingX: 1,
            alignItems: "center",
            height: "30px",
            background: invert ? "white" : "#0B4F26",
            borderRadius: "3px",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "11px", mobile: "10px" },
              fontWeight: "600",
              color: invert ? "0B4F26" : "white",
            }}
          >
            {"Result"}
          </Typography>
        </Box>
      </Box>
    );
  };
  const SmallBoxSeason = ({ color }) => {
    return (
      <Box
        sx={{
          width: { laptop: "70px", mobile: "17vw" },
          flexDirection: "column",
          position: "absolute",
          display: "flex",
          marginRight: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{ fontSize: "8px", fontWeight: "bold", color: "#FF4D4D" }}
        >
          Session Bet
        </Typography>
        <Typography
          sx={{ fontSize: "8px", fontWeight: "bold", color: "#46e080" }}
        >
          999
        </Typography>
      </Box>
    );
  };
  const MoneyBox = ({ color }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Box
        sx={{
          width: "80px",
          borderRadius: "5px",
          justifyContent: "center",
          position: matchesMobile ? "absolute" : "relative",
          right: matchesMobile ? "-90%" : "10px",
          alignItems: "center",
          display: "flex",
          height: "25px",
          borderRadius: "7px",
        }}
      >
        <Typography sx={{ fontSize: ".8vw", fontWeight: "bold", color: color }}>
          40,000,000
        </Typography>
        {color != "#46e080" && (
          <img src={ArrowDownRed} style={{ width: "12px", height: "10px" }} />
        )}
        {color == "#46e080" && (
          <img src={ArrowUpGreen} style={{ width: "12px", height: "10px" }} />
        )}
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

  const Odds = ({ currentMatch, setCurrentMatch, matchOddsLive }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [visible, setVisible] = useState(false);
    const [ stlive, setLive] = useState( currentMatch?.bettings[0]?.betStatus === 0 ? true : false);
    
    const activateMatchOdds = async (val, id) => {
      try {
        if(val){
          setLive(true)
        }
        else {
          setLive(false)
        }
        const { data } = await axios.post("/betting/addBetting", {
          match_id: currentMatch?.id,
          betStatus: val,
          matchType: currentMatch?.gameType,
          id: id,
        });

        // setCurrentMatch((prev) => ({
        //   .,
        //   betStatus: data?.data?.betStatus,
        // }));
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err?.response?.data?.message, "err");
      }
    };

    return (
      <Box
        key="odds"
        sx={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          marginY: { laptop: ".5vh" },
          width: { laptop: "99%" },
          marginX: ".5vw",
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
            boxShadow: "0px 5px 10px #0000001A",
            position: "relative",
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
              Match Odds
            </Typography>
            <Stop
              onClick={() => {
                setLive(true);
                activateMatchOdds(0, currentMatch?.bettings[0]?.id);
              }}
            />
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
            <Result
              onClick={() => {
                setVisible(true);
              }}
              invert={true}
            />
            {stlive && (
              <SmallBox
                onClick={() => {
                  setLive(false);
                  if (currentMatch?.bettings.length > 0) {
                    activateMatchOdds(1, currentMatch?.bettings[0]?.id);
                  } else {
                    activateMatchOdds(1, "");
                  }
                }}
                title={"Go Live"}
                color={"#FF4D4D"}
              />
            )}
            {!stlive && (
              <SmallBox
                onClick={() => {
                  setLive(true);
                  activateMatchOdds(0, currentMatch?.bettings[0]?.id);
                }}
                title={"Live"}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            zIndex: 999,
            top: "40px",
            right: "100px",
          }}
        >
          {visible && (
            <ResultComponent
              onClick={() => {
                setVisible(false);
              }}
            />
          )}
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
                width: "35%",
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
                MIN: {currentMatch?.betfair_match_min_bet} MAX:
                {currentMatch?.betfair_match_max_bet}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { laptop: "65%", mobile: "80%" },
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
        <BoxComponent
          data={
            matchOddsLive?.runners?.length > 0
              ? matchOddsLive?.runners[0]?.ex
              : []
          }
          lock={currentMatch?.bettings[0]?.betStatus === 0 ? true : false}
          color={"#46e080"}
          name={currentMatch?.teamA}
        />
        <Divider />
        <BoxComponent
          lock={currentMatch?.bettings[0]?.betStatus === 0 ? true : false}
          color={"#FF4D4D"}
          data={
            matchOddsLive?.runners?.length > 0
              ? matchOddsLive?.runners[1]?.ex
              : []
          }
          name={currentMatch?.teamB}
        />
        {/* <Divider />
        <BoxComponent color={"#FF4D4D"} name={"DRAW"} /> */}
        {stlive && (
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              height: "57%",
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          ></Box>
        )}
      </Box>
    );
  };
  const SeasonMarketBox = ({ index, liveUser, newData }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [visible, setVisible] = useState(false);
    const [live, setLive] = useState(true);
    useEffect(() => {
      if (!live) {
        setLive(true);
      } else {
        setLive(true);
      }
    }, [liveUser]);

    const handleLive = async (status) => {
      try {
        const body = {
          match_id: currentMatch?.id,
          matchType: currentMatch?.gameType,
          id: newData?.id,
          betStatus: status,
          // "teamA_lay": 18,
          // "teamB_lay": 15,
          // "teamA_Back": 10,
          // "teamB_Back": 4,
          // "drawRate": 10
        };
        await axios.post("betting/addBetting", body);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err?.message);
      }
    };

    return (
      <div style={{ position: "relative" }}>
        {live && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              background: "rgba(0,0,0,0.4)",
              zIndex: 2,
            }}
          ></Box>
        )}
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "38px",
              width: "25%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: ".7vw", tablet: "10px", mobile: "8px" },
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {newData?.bet_condition}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: { laptop: "13vw" },
                display: "flex",
                zIndex: 100,
              }}
            >
              {live && (
                <SmallBox
                  onClick={(e) => {
                    e.preventDefault();
                    setLive(!live);
                    handleLive(1);
                  }}
                  textSize={"8px"}
                  width={"80px"}
                  title={"Go Live"}
                  color={"#FF4D4D"}
                />
              )}
              {!live && (
                <SmallBox
                  onClick={(e) => {
                    e.preventDefault();
                    setLive(!live);
                    handleLive(0);
                  }}
                  textSize={"8px"}
                  width={"80px"}
                  title={"Live"}
                />
              )}
              <Result
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(true);
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "38px",
              width: { laptop: "60%", mobile: "80%" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SeperateBox color={"white"} />
            {/* {matchesMobile && <PlaceBetComponent />} */}

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox color={"white"} />

            <SeperateBox
              session={true}
              back={true}
              value={newData?.no_rate}
              value2={newData?.rate_percent}
              lock={index == 2}
              color={"#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              session={true}
              value={newData?.yes_rate}
              value2={newData?.rate_percent}
              lock={index == 2}
              color={"#B3E0FF"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeperateBox color={"white"} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeperateBox color={"white"} />
              </>
            )}
            {/* {
                            index != 1 && index !== 2 &&
                            <Box sx={{
                                width: '100%', marginLeft: '-2px', display: 'flex', position: 'absolute', height: '100%', background: 'rgba(0,0,0,1)', justifyContent: 'center ', alignItems: 'center'
                            }}>
                                <img src={BallStart} style={{ width: '60px', height: '19px' }} />
                            </Box>
                        } */}
            {
              <PlaceBetComponentWeb
                onClick={() => {
                  if (data?.includes(index)) {
                    let x = [...data];
                    x.splice(x.indexOf(index), 1);
                    setData([...x]);
                  } else {
                    if (data.length < 4) {
                      let x = [...data];
                      setData([...x, index]);
                    }
                  }
                }}
              />
            }
            {visible && (
              <Box sx={{ position: "absolute", zIndex: 105, top: "100%" }}>
                <SessionResultModal
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Divider></Divider>
      </div>
    );
  };
  const PlaceBetComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(0);
    };
    return (
      <>
        <Box
          onClick={(e) => handleClick(e)}
          sx={{
            background: "#0B4F26",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { laptop: "5vw", mobile: "80px" },
            borderRadius: "5px",
            height: "35px",
            left: "35px",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              background: "#FDF21A",
              borderRadius: "3px",
              width: "90%",
              height: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "10px", mobile: "8px" },
                fontWeight: "bold",
                color: "#FF4D4D",
              }}
            >
              Total Bet : <span style={{ color: "#0B4F26" }}>250</span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { laptop: "10px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              P/L
            </Typography>
          </Box>
        </Box>
        <DropdownMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </>
    );
  };
  const PlaceBetComponentWeb = ({ onClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Box
          onClick={onClick}
          sx={{
            background: "#0B4F26",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            paddingX: ".2vw",
            width: "7vw",
            borderRadius: "5px",
            height: "30px",
            right: "8px",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              background: "#FDF21A",
              borderRadius: "3px",
              width: "65%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#FF4D4D" }}
            >
              Total Bet
            </Typography>
            <Typography
              sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#0B4F26" }}
            >
              250
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              P/L
            </Typography>
            <img
              src={UD}
              style={{ width: "12px", height: "12px", marginLeft: "3px" }}
            />
          </Box>
        </Box>
        <DropdownMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </>
    );
  };
  const menutItems = [
    { title: "Account Statement" },
    { title: "Profile Loss Report" },
    { title: "Bet History" },
    { title: "Unsetteled Bet" },
    { title: "Casino Report History" },
    { title: "Set Button Values" },
    { title: "Security Auth Verfication" },
    { title: "Change Password" },
  ];
  const DropdownMenu = ({ anchorEl, open, handleClose }) => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            paddingY: "0px",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: "5px",
            border: "1px solid #306A47",
          },
        }}
      >
        <Box
          sx={{
            minHeight: "100px",
            flexDirection: "column",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <Box sx={{ display: "flex", height: "25px" }}>
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                Runs
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90px",
                display: "flex",
                borderLeft: "1px solid #306A47",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                Amount
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "25px",
              borderTop: "1px solid #306A47",
            }}
          >
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                40
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90px",
                display: "flex",
                borderLeft: "1px solid #306A47",
                background: "#10DC61",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#306A47",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                4,02,350
              </Typography>
              <StyledImage
                src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                sx={{
                  height: "15px",
                  marginLeft: "5px",
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  width: "15px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "25px",
              borderTop: "1px solid #306A47",
            }}
          >
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                41
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90px",
                display: "flex",
                borderLeft: "1px solid #306A47",
                background: "#10DC61",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#306A47",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                4,02,350
              </Typography>
              <StyledImage
                src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                sx={{
                  height: "15px",
                  marginLeft: "5px",
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  width: "15px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "25px",
              borderTop: "1px solid #306A47",
            }}
          >
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                42
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90px",
                display: "flex",
                borderLeft: "1px solid #306A47",
                background: "#F8C851",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#306A47",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                4,02,350
              </Typography>
              <StyledImage
                src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                sx={{
                  height: "15px",
                  marginLeft: "5px",
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  width: "15px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "25px",
              borderTop: "1px solid #306A47",
            }}
          >
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                43
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90px",
                display: "flex",
                borderLeft: "1px solid #306A47",
                background: "#F8C851",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#306A47",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                4,02,350
              </Typography>
              <StyledImage
                src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                sx={{
                  height: "15px",
                  marginLeft: "5px",
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  width: "15px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "25px",
              borderTop: "1px solid #306A47",
            }}
          >
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
              >
                44
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90px",
                display: "flex",
                borderLeft: "1px solid #306A47",
                background: "#DC3545",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#306A47",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                4,02,350
              </Typography>
              <StyledImage
                src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                sx={{
                  height: "15px",
                  marginLeft: "5px",
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  width: "15px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Menu>
    );
  };
  const SessionMarket = ({ currentMatch }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [live, setLive] = useState(true);

    var sessionMatch = currentMatch?.bettings?.filter(
      (v) => v?.sessionBet === true
    );

    const activateSessionLive = async (val, id) => {
      try {
        const data = await axios.post("/betting/addBetting", {
          match_id: currentMatch?.id,
          sessionBet: val,
          matchType: currentMatch?.gameType,
          id: id,
        });
      } catch (err) {
        toast.error(err.response.data.message);

        console.log(err?.response?.data?.message, "err");
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          background: "white",
          flexDirection: "column",
          marginY: { laptop: ".5vh" },
          width: { laptop: "99%" },
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
            boxShadow: "0px 5px 10px #0000001A",
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
              Session Market
            </Typography>
            {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} />
             */}
            <Stop onClick={() => setLive(!live)} />
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
            {/* <SmallBoxSeason /> */}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                  width: "50%",
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
                  MIN: {currentMatch?.betfair_session_min_bet} MAX:
                  {currentMatch?.betfair_session_max_bet}
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
                    No
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
                    Yes
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
            }}
          >
            {sessionMatch?.map((match, index) => (
              <>
                <SeasonMarketBox
                  newData={match}
                  liveUser={live}
                  index={index}
                />
                <Divider />
              </>
            ))}
            {/* <SeasonMarketBox liveUser={live} index={1} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={2} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={3} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={4} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={5} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={6} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={7} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={7} />
            <Divider />
            <SeasonMarketBox liveUser={live} index={7} /> */}
          </Box>
        </Box>
      </Box>
    );
  };
  const BookMarketer = ({ currentMatch, bookmakerLive }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [live, setLive] = useState(false);

    useEffect(() => {
      if (currentMatch?.bookMakerRateLive) {
        setLive(true);
      } else {
        setLive(false);
      }
    }, [currentMatch?.bookMakerRateLive]);
    return (
      <Box
        sx={{
          boxShadow: "0px 5px 10px #0000001A",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          marginY: { laptop: ".25vh" },
          width: { laptop: "99%" },
          marginX: ".5vw",
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
            width: "100%",
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
              Bookmaker Market
            </Typography>
            {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} /> */}
            <Stop
              onClick={() => {
                setLive(false);
                socket.emit("bookMakerRateLive", {
                  matchId: currentMatch?.id,
                  bookMakerLive: false,
                });
              }}
            />
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
            {/* { <SmallBox title={'Live'} />} */}
            {!currentMatch?.bookMakerRateLive ? (
              <SmallBox
                onClick={() => {
                  setLive(true);
                  socket.emit("bookMakerRateLive", {
                    matchId: currentMatch?.id,
                    bookMakerLive: true,
                  });
                }}
                width={"80px"}
                title={"Go Live"}
                color={"#FF4D4D"}
              />
            ) : (
              <SmallBox
                onClick={() => {
                  setLive(false);
                  socket.emit("bookMakerRateLive", {
                    matchId: currentMatch?.id,
                    bookMakerLive: false,
                  });
                }}
                width={"80px"}
                title={"Live"}
              />
            )}
          </Box>
        </Box>
        <Divider />
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
                width: "35%",
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
                MIN: {currentMatch?.betfair_bookmaker_min_bet} MAX:{" "}
                {currentMatch?.betfair_bookmaker_max_bet}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { laptop: "65%", mobile: "80%" },
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
        <Box sx={{ position: "relative" }}>
          <BoxComponent
            data={
              bookmakerLive?.runners?.length > 0
                ? bookmakerLive?.runners[0]?.ex
                : []
            }
            lock={!currentMatch?.bookMakerRateLive}
            color={"#46e080"}
            name={currentMatch?.teamA}
          />
          <Divider />
          <BoxComponent
            color={"#FF4D4D"}
            lock={!currentMatch?.bookMakerRateLive}
            name={currentMatch?.teamB}
            data={
              bookmakerLive?.runners?.length > 0
                ? bookmakerLive?.runners[1]?.ex
                : []
            }
            align="end"
          />
          {!currentMatch?.bookMakerRateLive && (
            <Box
              sx={{
                width: "100%",
                position: "absolute",
                height: "100%",
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
              }}
            ></Box>
          )}
        </Box>
      </Box>
    );
  };
  const RunsBox = () => {
    return (
      <Box
        sx={{
          minHeight: "100px",
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "white",
          display: "flex",
          width: "25%",
          marginX: ".5vw",
          border: "3px solid #0B4F26",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "20px",
            background: "#0B4F26",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "8px", color: "white", fontWeight: "600" }}
          >
            6 Over runs INDIA
          </Typography>
        </Box>
        <Box sx={{ display: "flex", height: "25px" }}>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              Runs
            </Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              Amount
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              40
            </Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#10DC61",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              41
            </Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#10DC61",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              42
            </Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#F8C851",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              43
            </Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#F8C851",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              44
            </Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#DC3545",
              justifyContent: "center",
              alignItems: "center",
              borderBottomRightRadius: "7px",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <Background>
      {/* <CHeader /> */}
      <CustomHeader />
      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          borderRadius: "10px",
          flexDirection: "row",
          width: "99%",
          marginX: ".5%",
          height: "100%",
          marginTop: "5px",
          background: "white",
          padding: 1,
        }}
      >
        {(currentMatch?.manualSessionActive ||
          currentMatch?.apiSessionActive) && (
          <Box sx={{ width: "50%", flexDirection: "column", display: "flex" }}>
            <SessionMarket currentMatch={currentMatch} />

            <Box
              sx={{ display: "flex", flexDirection: "row", marginTop: ".25vw" }}
            >
              {data.map(() => {
                return <RunsBox />;
              })}
            </Box>
          </Box>
        )}
        <Box sx={{ width: "50%", flexDirection: "column", display: "flex" }}>
          {currentMatch?.apiMatchActive && (
            <Odds
              currentMatch={currentMatch}
              setCurrentMatch={setCurrentMatch}
              matchOddsLive={matchOddsLive}
            />
          )}
          {currentMatch?.apiBookMakerActive && (
            <BookMarketer
              currentMatch={currentMatch}
              bookmakerLive={bookmakerLive}
            />
          )}
          <AllBets allBetRates={IObets} />
        </Box>
      </Box>
    </Background>
  );
};

export default MatchScreen;
