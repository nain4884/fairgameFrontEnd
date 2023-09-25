import React, {
  memo,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
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
import { StyledImage } from "../../components";
import { Popover } from "react-tiny-popover";
import { BACKIMAGE, LOCKED, LOCKOPEN } from "../../admin/assets";
import LiveMatchComponent from "../../components/LiveMatchComponent";
import LiveMatchAdmin from "../../components/LiveMatchAdmin";
import AllBets from "../../components/AllBets";
import { Background, Header as CHeader } from "../../components/index";
import UnlockComponent from "../../components/UnlockComponent";
import { useLocation } from "react-router-dom";
import { setRole } from "../../newStore";
import {
  apiBasePath,
  microServiceApiPath,
} from "../../components/helper/constants";
import { formatNumber } from "../../components/helper/helper";
import Odds from "./matches/Odds";
import SessionMarket from "./matches/SessionMarket";
import BookMarketer from "./matches/BookMaketer";
import FullAllBets from "../../components/FullAllBets";
import { SocketContext } from "../../context/socketContext";
import LiveMatchHome from "../../components/LiveMatchHome";
import MatchComponent from "../../components/MathComponent";
import Axios from "axios";

let matchOddsCount = 0;
let sessionOffline = [];
const SeperateBox = ({ color, empty, value, value2, lock, session, back }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const dispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        align={matchesMobile ? "end" : "center"}
        positions={["bottom"]} // preferred positions by priority
        onClickOutside={() => setIsPopoverOpen(false)}
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

export const MatchScreen = ({
  submit,
  showLock,
  currentMatch,
  sessionBets,
}) => {
  const [data, setData] = useState([]);

  const Divider = () => {
    return (
      <Box
        sx={{ width: "100%", background: "rgba(211,211,211)", height: "1.5px" }}
      ></Box>
    );
  };
  const BoxComponent = ({ name, teamImage, rates, color, align, submit }) => {
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
            width: "40%",
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
            {teamImage !== null && (
              <img
                src={`${apiBasePath}/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
            )}
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: "14px", mobile: "13px" },
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              {name}
            </Typography>
          </Box>
          <MoneyBox color={color} rates={rates} />
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
            <SeperateBox
              lock={submit}
              align={align}
              value={"1.71"}
              value2={" $23000"}
              color={matchesMobile ? "white" : "#CEEBFF"}
            />
          )}
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeperateBox
              lock={submit}
              align={align}
              value={"1.71"}
              value2={" $23000"}
              color={matchesMobile ? "white" : "#C2E6FF"}
            />
          )}
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            lock={submit}
            align={align}
            value={"1.71"}
            value2={" $23000"}
            color={matchesMobile ? "white" : "#A7DCFF"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            lock={submit}
            align={align}
            value={"1.72"}
            value2={" $23000"}
            color={matchesMobile ? "white" : "#FFB5B5"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            lock={submit}
            back={true}
            align={align}
            value={"1.72"}
            value2={" $23000"}
            color={"#F2CBCB"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            lock={submit}
            align={align}
            value={"1.72"}
            value2={" $23000"}
            color={"#ECD6D6"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
    );
  };
  const SmallBox = ({ color, valueA, valueB }) => {
    return (
      <Box
        sx={{
          marginLeft: { mobile: "34px", laptop: "12px", tablet: "12px" },
          display: "flex",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            width: { laptop: "70px", mobile: "50px", tablet: "70px" },
            // position: "absolute",
            flexDirection: "column",
            paddingX: "5px",
            display: "flex",
            left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            background: "white",
            borderRadius: "3px",
          }}
        >
          <Typography
            sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold" }}
          >
            {" "}
            Book{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              color: valueA < 0 ? `#FF9292` : `#46e080`,
            }}
          >
            {" "}
            {valueA < 0 ? ` ${valueA}` : `${valueA}`}{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "70px", mobile: "50px", tablet: "70px" },
            // position: "absolute",
            paddingX: "5px",
            display: "flex",
            flexDirection: "column",
            left: { mobile: "65%", laptop: "55vw", tablet: "65%" },
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            background: "white",
            borderRadius: "3px",
          }}
        >
          <Typography
            sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold" }}
          >
            {" "}
            Book{" "}
          </Typography>

          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              color: valueB < 0 ? `#FF9292` : `#46e080`,
            }}
          >
            {" "}
            {valueB < 0 ? ` ${valueB}` : `${valueB}`}{" "}
          </Typography>
        </Box>
      </Box>
    );
  };
  const SmallBoxSeason = ({ color }) => {
    return (
      <Box
        sx={{
          width: { laptop: "85px", mobile: "17vw" },
          flexDirection: "column",
          position: "absolute",
          display: "flex",
          marginRight: "5px",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "bold", color: "#FF4D4D" }}
        >
          Session Bets
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: "bold", color: "#0B4F26" }}
        >
          999
        </Typography>
      </Box>
    );
  };
  const MoneyBox = ({ color, rates }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Box
        sx={{
          width: "80px",
          borderRadius: "5px",
          justifyContent: "center",
          position: matchesMobile ? "absolute" : "relative",
          right: matchesMobile ? "-90%" : "20px",
          alignItems: "center",
          display: "flex",
          height: "25px",
          borderRadius: "7px",
        }}
      >
        <Typography sx={{ fontSize: "13px", fontWeight: "bold", color: color }}>
          {rates}
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
  const Odds1 = ({ submit, currentMatch }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [showUnlock, setShowUnlock] = useState(false);
    const [locked, setLocked] = useState(false);

    const bookRatioB = (teamARates, teamBRates) => {
      const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
    };

    const bookRatioA = (teamARates, teamBRates) => {
      const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
    };
    return (
      <Box
        key="odds"
        sx={{
          position: "relative",
          display: "flex",
          backgroundColor: "white",
          padding: 0.2,
          flexDirection: "column",
          marginTop: ".5vh",
          width: { laptop: "99%" },
          marginX: ".5vw",
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
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
            {!submit && (
              <img
                onClick={() => {
                  setShowUnlock(true);
                }}
                src={locked ? LOCKED : LOCKOPEN}
                style={{ width: "14px", height: "20px" }}
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
              justifyContent: "flex-end",
            }}
          >
            <SmallBox
              valueA={bookRatioA(
                currentMatch?.teamA_rate,
                currentMatch?.teamB_rate
              )}
              valueB={bookRatioB(
                currentMatch?.teamA_rate,
                currentMatch?.teamB_rate
              )}
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
                MIN: {currentMatch?.betfair_match_min_bet} MAX:{" "}
                {currentMatch?.betfair_match_max_bet}
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
        <Box sx={{ position: "relative" }}>
          <BoxComponent
            color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#46e080"}
            name={currentMatch?.teamA}
            teamImage={currentMatch?.teamA_Image}
            rates={currentMatch?.teamA_rate ? currentMatch?.teamA_rate : 0}
          />
          <Divider />
          <BoxComponent
            color={currentMatch?.teamB_rate <= 0 ? "#FF4D4D" : "#46e080"}
            name={currentMatch?.teamB}
            teamImage={currentMatch?.teamB_Image}
            rates={currentMatch?.teamB_rate ? currentMatch?.teamB_rate : 0}
          />
          {currentMatch?.teamC && (
            <BoxComponent
              color={currentMatch?.teamC_rate <= 0 ? "#FF4D4D" : "#46e080"}
              name={currentMatch?.teamC}
              teamImage={
                currentMatch?.teamC_Image ? currentMatch?.teamC_Image : null
              }
              rates={currentMatch?.teamC_rate ? currentMatch?.teamC_rate : 0}
              align="end"
            />
          )}
          {locked && (
            <Box
              sx={{
                background: "rgba(0,0,0,.5)",
                width: "100%",
                height: "105px",
                position: "absolute",
                top: "-24px",
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  alignSelf: "flex-end",
                  height: "105px",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img src={LOCKED} style={{ width: "35px", height: "40px" }} />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    marginLeft: "-25px",
                    fontSize: "20px",
                    marginTop: "20px",
                  }}
                >
                  Locked
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        {showUnlock && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              background: "transparent",
              alignSelf: "center",
              position: "absolute",
              marginTop: "38px",
              left: "20%",
            }}
          >
            <UnlockComponent
              unlock={locked}
              title={(locked ? "Unlock " : "Lock ") + "Match Odds Market"}
              onSubmit={(i) => {
                if (i) {
                  setLocked(!locked);
                }
                setShowUnlock(false);
              }}
            />
          </Box>
        )}
      </Box>
    );
  };
  const SeasonMarketBox = ({ index, newData, setData }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <div>
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
              width: "40%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: "11px", tablet: "10px", mobile: "8px" },
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {newData?.bet_condition}
            </Typography>
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
            {false && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeperateBox color={"white"} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeperateBox color={"white"} />
              </>
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox color={"white"} />

            <SeperateBox
              session={true}
              back={true}
              //  value={"37"}
              // value2={"100"}
              // lock={index == 2}
              color={"#F6D0CB"}
              value={newData?.no_rate}
              value2={formatNumber(newData?.rate_percent?.split("-")[0])}
              lock={newData?.suspended === "suspended"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              session={true}
              color={"#B3E0FF"}
              value={newData?.yes_rate}
              value2={formatNumber(newData?.rate_percent?.split("-")[1])}
              lock={newData?.suspended === "suspended"}
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
            {index == 1 && (
              <Box
                sx={{
                  width: "33.5%",
                  marginLeft: "-2px",
                  display: "flex",
                  position: "absolute",
                  height: "100%",
                  background: "rgba(0,0,0,1)",
                  justifyContent: "center ",
                  alignItems: "center",
                }}
              >
                <img
                  src={BallStart}
                  style={{ width: "60px", height: "17px" }}
                />
              </Box>
            )}
            {
              <PlaceBetComponentWeb
                newData={newData}
                setData={setData}
                amount={index == 2}
                onClick={() => {
                  if (data.includes(index)) {
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
            width: { laptop: "90px", mobile: "80px" },
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
              Profit/Loss
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
  const PlaceBetComponentWeb = ({
    onClick,
    amount,
    setData,
    newData,
    width,
  }) => {
    const [proLoss, setProfitLoss] = useState(newData?.profitLoss);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = useCallback(
      (e) => {
        setData((prev) => {
          if (Array.isArray(prev)) {
            const index = prev.findIndex((item) => item.id === newData.id);
            if (index !== -1) {
              const updatedItem = { ...prev[index], ...newData };
              const updatedArray = [...prev];
              updatedArray.splice(index, 1, updatedItem);
              return updatedArray;
            } else {
              // if (prev.length < 4) {
              return [...prev, newData];
              // }
              // return prev;
            }
          } else {
            // handle the case when prev is not an array
            return prev;
          }
        });
      },
      [setData, newData]
    );

    return (
      <>
        <Box
          // onClick={onClick}
          onClick={handleClick}
          sx={{
            background: "#0B4F26",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            paddingX: ".2vw",
            width: "10vw",
            borderRadius: "5px",
            height: "32px",
            right: "8px",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              background: "#FDF21A",
              borderRadius: "3px",
              width: "45%",
              height: "85%",
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
              {proLoss?.total_bet || 0}
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
              sx={{
                fontSize: { laptop: amount ? ".65vw" : ".6vw" },
                fontWeight: amount ? "bold" : "500",
                color: "white",
              }}
            >
              {/* {!amount ? "Profit/Loss" : "-10,000,00"} */}{" "}
              {!newData?.profitLoss?.max_loss
                ? "Profit/Loss"
                : newData?.profitLoss?.max_loss}
            </Typography>
            <img
              src={UD}
              style={{ width: "12px", height: "12px", marginLeft: "5px" }}
            />
          </Box>
        </Box>
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
  const SessionMarket1 = ({ submit, currentMatch, sessionBets }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [showUnlock, setShowUnlock] = useState(false);
    const [locked, setLocked] = useState(false);

    const [matchSessionData, setMatchSessionData] = useState([]);

    useEffect(() => {
      if (currentMatch?.bettings?.length > 0) {
        const sessionData =
          currentMatch?.bettings?.length > 0
            ? currentMatch?.bettings?.filter(
                (element) => element?.sessionBet && element?.id
              )
            : 0;
        setMatchSessionData(sessionData.reverse());
      }
    }, [currentMatch]);

    return (
      <Box
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginTop: submit ? "10px" : ".25vh",
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
            {!submit && (
              <img
                onClick={() => {
                  setShowUnlock(true);
                }}
                src={locked ? LOCKED : LOCKOPEN}
                style={{ width: "14px", height: "20px" }}
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
              justifyContent: "flex-end",
            }}
          >
            <SmallBoxSeason submit={submit} />
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
                    BACK
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
                    LAY
                  </Typography>
                </Box>

                {/* <Box sx={{background:'#FF9292',width:{laptop:"16.5%",mobile:"25%"},height:'100%',display:'flex',justifyContent:"center",alignItems:"center"}}>
                                </Box> */}
              </Box>
            </Box>
          }

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "200px",
              width: "100%",
              position: "relative",
            }}
          >
            {matchSessionData?.length > 0 &&
              matchSessionData?.map((element, index) => {
                return (
                  <Box
                    key={element?.id}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <SeasonMarketBox
                      newData={element}
                      setMatchSessionData={setMatchSessionData}
                      index={index}
                      setData={setData}
                    />
                    {/* <Divider /> */}
                  </Box>
                );
              })}
            {locked && (
              <Box
                sx={{
                  background: "rgba(0,0,0,.5)",
                  width: "80%",
                  height: "100%",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    alignSelf: "flex-end",
                    height: "100%",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <img src={LOCKED} style={{ width: "35px", height: "40px" }} />

                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "600",
                      marginLeft: "-25px",
                      fontSize: "20px",
                      marginTop: "20px",
                    }}
                  >
                    Locked
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        {showUnlock && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              background: "transparent",
              alignSelf: "center",
              position: "absolute",
              marginTop: "38px",
              left: "20%",
            }}
          >
            <UnlockComponent
              unlock={locked}
              title={(locked ? "Unlock " : "Lock ") + "Session Market"}
              onSubmit={(i) => {
                if (i) {
                  setLocked(!locked);
                }
                setShowUnlock(false);
              }}
            />
          </Box>
        )}
      </Box>
    );
  };
  const BookMarketer1 = ({ submit, currentMatch }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [showUnlock, setShowUnlock] = useState(false);
    const [locked, setLocked] = useState(false);

    const bookRatioB = (teamARates, teamBRates) => {
      const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
    };

    const bookRatioA = (teamARates, teamBRates) => {
      const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
    };

    return (
      <Box
        sx={{
          display: "flex",
          position: "relative",
          backgroundColor: "white",
          padding: 0.2,
          flexDirection: "column",
          marginTop: submit ? "10px" : ".25vh",
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
              Bookmaker Market
            </Typography>
            {!submit && (
              <img
                onClick={() => {
                  setShowUnlock(true);
                }}
                src={locked ? LOCKED : LOCKOPEN}
                style={{ width: "14px", height: "20px" }}
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
              justifyContent: "flex-end",
            }}
          >
            <SmallBox
              color={"#FF4D4D"}
              valueA={bookRatioA(
                currentMatch?.teamA_rate,
                currentMatch?.teamB_rate
              )}
              valueB={bookRatioB(
                currentMatch?.teamA_rate,
                currentMatch?.teamB_rate
              )}
            />
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
                MIN: {currentMatch?.betfair_bookmaker_min_bet} MAX:
                {currentMatch?.betfair_bookmaker_max_bet}
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
        <Box sx={{ position: "relative" }}>
          <BoxComponent
            submit={submit}
            color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#46e080"}
            name={currentMatch?.teamA}
            teamImage={currentMatch?.teamA_Image}
            rates={currentMatch?.teamA_rate ? currentMatch?.teamA_rate : 0}
          />
          <Divider />
          <BoxComponent
            submit={submit}
            color={currentMatch?.teamB_rate <= 0 ? "#FF4D4D" : "#46e080"}
            name={currentMatch?.teamB}
            teamImage={currentMatch?.teamB_Image}
            rates={currentMatch?.teamB_rate ? currentMatch?.teamB_rate : 0}
            align="end"
          />
          {currentMatch?.teamC && (
            <BoxComponent
              color={currentMatch?.teamC_rate <= 0 ? "#FF4D4D" : "#46e080"}
              name={currentMatch?.teamC}
              teamImage={
                currentMatch?.teamC_Image ? currentMatch?.teamC_Image : null
              }
              rates={currentMatch?.teamC_rate ? currentMatch?.teamC_rate : 0}
              align="end"
            />
          )}
          {locked && (
            <Box
              sx={{
                background: "rgba(0,0,0,.5)",
                width: "100%",
                height: "105px",
                position: "absolute",
                top: "-24px",
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  alignSelf: "flex-end",
                  height: "105px",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img src={LOCKED} style={{ width: "35px", height: "40px" }} />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    marginLeft: "-25px",
                    fontSize: "20px",
                    marginTop: "20px",
                  }}
                >
                  Locked
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        {showUnlock && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              background: "transparent",
              alignSelf: "center",
              position: "absolute",
              marginTop: "38px",
              left: "20%",
            }}
          >
            <UnlockComponent
              unlock={locked}
              title={(locked ? "Unlock " : "Lock ") + "Bookmaker Market"}
              onSubmit={(i) => {
                if (i) {
                  setLocked(!locked);
                }
                setShowUnlock(false);
              }}
            />
          </Box>
        )}
      </Box>
    );
  };
  const RunsBox = ({ margin }) => {
    return (
      <Box
        sx={{
          minHeight: "100px",
          flexDirection: "column",
          borderRadius: "5px",
          overflow: "hidden",
          border: "1px solid #0B4F26 ",
          marginLeft: margin ? "10px" : "0px",
          backgroundColor: "white",
          display: "flex",
          width: "25%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "25px",
            width: "100%",
            background: "#0B4F26",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", color: "white", fontWeight: "600" }}
          >
            6 Over runs INDIA
          </Typography>
        </Box>
        <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
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
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        marginTop: "2px",
      }}
    >
      <Box sx={{ width: "60%", flexDirection: "column", display: "flex" }}>
        <Odds1 submit={submit} currentMatch={currentMatch} />
        <BookMarketer1 submit={submit} currentMatch={currentMatch} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "0.75%",
            marginTop: "10px",
          }}
        >
          {data.map((x, i) => {
            return <RunsBox key={i} margin={i != 0} />;
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: submit ? "38.83%" : "39.5%",
          marginLeft: submit ? "10px" : "0px",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <LiveMatchComponent submit={submit} />
        <LiveMatchAdmin submit={submit} />
        <AllBets tag={submit} submit={submit} />
      </Box>
    </Box>
  );
};
const NewMatchScreen = () => {
  const location = useLocation();
  const matchId = location?.state?.matchId;
  const { socket, socketMicro } = useContext(SocketContext);
  const { axios } = setRole();
  const [currentMatch, setCurrentMatch] = useState(null);
  const [sessionBets, setSessionBets] = useState([]);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [IOSinglebets, setSingleIObtes] = useState([]);
  const [mode, setMode] = useState(false);
  const [marketId, setMarketId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [sessionLock, setSessionLock] = useState(false);
  const [isHandled, setIsHandled] = useState(false);
  const [isMatchLock, setIsMatchLock] = useState(false);
  const [isBookmakerLock, setIsBookmakerLock] = useState(false);
  const [isManualLock, setIsManualLock] = useState(false);
  const [isQuickSessionLock, setIsQuickSessionLock] = useState(false);
  const [isSessionLock, setIsSessionLock] = useState(false);
  const [liveScoreData, setLiveScoreData] = useState();
  const [eventId, setEventId] = useState("");
  // useEffect(() => {
  //   if (socket && socket.connected) {
  //     socket.on("newMessage", (value) => {
  //       console.log(value);
  //     });

  //     socket.onevent = async (packet) => {
  //       if (packet.data[0] === "updateMatchActiveStatus") {
  //         const value = packet.data[1];
  //         setCurrentMatch((currentMatch) => {
  //           if (currentMatch?.id === value?.matchId) {
  //             return {
  //               ...currentMatch,
  //               apiBookMakerActive: value?.apiBookMakerActive,
  //               apiMatchActive: value?.apiMatchActive,
  //               apiSessionActive: value?.apiSessionActive,
  //               manualBookMakerActive: value?.manualBookMakerActive,
  //               manualSessionActive: value?.manualSessionActive,
  //             };
  //           }
  //           return currentMatch;
  //         });
  //       }

  //       // manual bookmaker
  //       if (packet.data[0] === "teamA_rate_user") {
  //         const value = packet.data[1];
  //         try {
  //           setManualBookmakerData((currentMatches) => {
  //             if (currentMatches[0]?.id != value.betId) {
  //               return currentMatches;
  //             }

  //             // Update the match object at the specified index
  //             const updatedMatch = {
  //               ...currentMatches[0],
  //               teamA_Back: value?.teamA_Back, // Update the teamA_Back value
  //               teamA_lay: value?.teamA_lay, // Update the teamA_lay value
  //               teamA_suspend:
  //                 value?.teamA_suspend == false ? null : "suspended", // Update the teamA_susp
  //               teamA_Ball: null,
  //               teamB_Ball: null,
  //               teamC_Ball: null,
  //             };

  //             // Create a new array with the updated match object
  //             const updatedMatches = [
  //               ...currentMatches.slice(0, 0),
  //               updatedMatch,
  //               ...currentMatches.slice(0 + 1),
  //             ];

  //             // Return the new array as the updated state
  //             return updatedMatches;
  //           });

  //           console.log("manualBookmakerData 222:", manualBookmakerData);
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "teamB_rate_user") {
  //         const value = packet.data[1];
  //         try {
  //           setManualBookmakerData((currentMatches) => {
  //             if (currentMatches[0]?.id != value.betId) {
  //               return currentMatches;
  //             }

  //             // Update the match object at the specified index
  //             const updatedMatch = {
  //               ...currentMatches[0],
  //               teamB_Back: value?.teamB_Back, // Update the teamA_Back value
  //               teamB_lay: value?.teamB_lay, // Update the teamA_lay value
  //               teamB_suspend:
  //                 value?.teamB_suspend == false ? null : "suspended", // Update the teamA_susp
  //               teamA_Ball: null,
  //               teamB_Ball: null,
  //               teamC_Ball: null,
  //             };

  //             // Create a new array with the updated match object
  //             const updatedMatches = [
  //               ...currentMatches.slice(0, 0),
  //               updatedMatch,
  //               ...currentMatches.slice(0 + 1),
  //             ];

  //             // Return the new array as the updated state
  //             return updatedMatches;
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "teamC_rate_user") {
  //         const value = packet.data[1];
  //         try {
  //           setManualBookmakerData((currentMatches) => {
  //             if (currentMatches[0]?.id != value.betId) {
  //               return currentMatches;
  //             }

  //             // Update the match object at the specified index
  //             const updatedMatch = {
  //               ...currentMatches[0],
  //               teamC_Back: value?.teamC_Back, // Update the teamA_Back value
  //               teamC_lay: value?.teamC_lay, // Update the teamA_lay value
  //               teamC_suspend:
  //                 value?.teamC_suspend == false ? null : "suspended", // Update the teamA_susp
  //               teamA_Ball: null,
  //               teamB_Ball: null,
  //               teamC_Ball: null,
  //             };

  //             // Create a new array with the updated match object
  //             const updatedMatches = [
  //               ...currentMatches.slice(0, 0),
  //               updatedMatch,
  //               ...currentMatches.slice(0 + 1),
  //             ];

  //             // Return the new array as the updated state
  //             return updatedMatches;
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "updateRate_user") {
  //         const value = packet.data[1];
  //         try {
  //           setManualBookmakerData((currentMatches) => {
  //             if (currentMatches[0]?.id != value.betId) {
  //               return currentMatches;
  //             }
  //             const updatedMatch = {
  //               ...currentMatches[0],
  //               teamA_Back: value?.teamA_Back,
  //               teamA_lay: "",
  //               teamB_Back: value?.teamB_Back,
  //               teamB_lay: "",
  //               teamC_Back: value?.teamC_Back,
  //               teamC_lay: "",
  //               // teamA_suspend: "live",
  //               teamA_suspend: null, // Update the teamA_susp
  //               teamB_suspend: null, // Update the teamA_susp
  //               teamC_suspend: null, // Update the teamA_susp
  //               // teamB_suspend: "live",
  //               // teamC_suspend: "live",
  //             };

  //             // Create a new array with the updated match object
  //             const updatedMatches = [
  //               ...currentMatches.slice(0, 0),
  //               updatedMatch,
  //               ...currentMatches.slice(0 + 1),
  //             ];

  //             // Return the new array as the updated state
  //             return updatedMatches;
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //       if (packet.data[0] === "teamA_suspend_user") {
  //         const value = packet.data[1];
  //         if (value.teamA_suspend == "Ball Started") {
  //           try {
  //             setManualBookmakerData((currentMatches) => {
  //               // alert(JSON.stringify(currentMatches))
  //               if (currentMatches[0]?.id != value.betId) {
  //                 return currentMatches;
  //               }
  //               const updatedMatch = {
  //                 ...currentMatches[0],
  //                 teamA_suspend: "suspended",
  //                 teamA_Ball: "ball",
  //                 teamB_Ball: "ball",
  //                 teamC_Ball: "ball",
  //               };
  //               const updatedMatches = [
  //                 ...currentMatches.slice(0, 0),
  //                 updatedMatch,
  //                 ...currentMatches.slice(0 + 1),
  //               ];
  //               return updatedMatches;
  //             });
  //           } catch (err) {
  //             console.log(err?.message);
  //           }
  //         } else {
  //           try {
  //             setManualBookmakerData((currentMatches) => {
  //               // alert(JSON.stringify(currentMatches[0]));
  //               if (currentMatches[0]?.id != value.betId) {
  //                 return currentMatches;
  //               }
  //               const updatedMatch = {
  //                 ...currentMatches[0],
  //                 teamA_suspend: "suspended",
  //                 teamA_Ball: null,
  //                 teamB_Ball: null,
  //                 teamC_Ball: null,
  //               };
  //               const updatedMatches = [
  //                 ...currentMatches.slice(0, 0),
  //                 updatedMatch,
  //                 ...currentMatches.slice(0 + 1),
  //               ];
  //               return updatedMatches;
  //             });
  //           } catch (err) {
  //             console.log(err?.message);
  //           }
  //         }
  //       }
  //       if (packet.data[0] === "teamB_suspend_user") {
  //         const value = packet.data[1];
  //         if (value.teamB_suspend == "Ball Started") {
  //           try {
  //             setManualBookmakerData((currentMatches) => {
  //               if (currentMatches[0]?.id != value.betId) {
  //                 return currentMatches;
  //               }

  //               const updatedMatch = {
  //                 ...currentMatches[0],
  //                 teamB_suspend: "suspended",
  //                 teamA_Ball: "ball",
  //                 teamB_Ball: "ball",
  //                 teamC_Ball: "ball",
  //               };
  //               const updatedMatches = [
  //                 ...currentMatches.slice(0, 0),
  //                 updatedMatch,
  //                 ...currentMatches.slice(0 + 1),
  //               ];
  //               return updatedMatches;
  //             });
  //           } catch (err) {
  //             console.log(err?.message);
  //           }
  //         } else {
  //           try {
  //             setManualBookmakerData((currentMatches) => {
  //               if (currentMatches[0]?.id != value.betId) {
  //                 return currentMatches;
  //               }
  //               const updatedMatch = {
  //                 ...currentMatches[0],
  //                 teamB_suspend: "suspended",
  //                 teamA_Ball: null,
  //                 teamB_Ball: null,
  //                 teamC_Ball: null,
  //               };
  //               const updatedMatches = [
  //                 ...currentMatches.slice(0, 0),
  //                 updatedMatch,
  //                 ...currentMatches.slice(0 + 1),
  //               ];
  //               return updatedMatches;
  //             });
  //           } catch (err) {
  //             console.log(err?.message);
  //           }
  //         }
  //       }
  //       if (packet.data[0] === "teamC_suspend_user") {
  //         const value = packet.data[1];
  //         if (value.teamC_suspend == "Ball Started") {
  //           try {
  //             setManualBookmakerData((currentMatches) => {
  //               if (currentMatches[0]?.id != value.betId) {
  //                 return currentMatches;
  //               }
  //               const updatedMatch = {
  //                 ...currentMatches[0],
  //                 teamC_suspend: "suspended",
  //                 teamA_Ball: "ball",
  //                 teamB_Ball: "ball",
  //                 teamC_Ball: "ball",
  //               };
  //               const updatedMatches = [
  //                 ...currentMatches.slice(0, 0),
  //                 updatedMatch,
  //                 ...currentMatches.slice(0 + 1),
  //               ];
  //               return updatedMatches;
  //             });
  //           } catch (err) {
  //             console.log(err?.message);
  //           }
  //         } else {
  //           try {
  //             setManualBookmakerData((currentMatches) => {
  //               if (currentMatches[0]?.id != value.betId) {
  //                 return currentMatches;
  //               }
  //               const updatedMatch = {
  //                 ...currentMatches[0],
  //                 teamC_suspend: "suspended",
  //                 teamA_Ball: null,
  //                 teamB_Ball: null,
  //                 teamC_Ball: null,
  //               };
  //               const updatedMatches = [
  //                 ...currentMatches.slice(0, 0),
  //                 updatedMatch,
  //                 ...currentMatches.slice(0 + 1),
  //               ];
  //               return updatedMatches;
  //             });
  //           } catch (err) {
  //             console.log(err?.message);
  //           }
  //         }
  //       }

  //       if (packet.data[0] === "updateSessionRate_user") {
  //         const value = packet.data[1];
  //         try {
  //           setCurrentMatch((currentMatch) => {
  //             if (currentMatch?.id !== value?.match_id) {
  //               // If the new bet doesn't belong to the current match, return the current state
  //               return currentMatch;
  //             }
  //             // Update the bettings array in the current match object
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting.id === value.betId) {
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               } else if (
  //                 betting?.id === value?.betId &&
  //                 value.sessionBet === false
  //               ) {
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               }
  //               return betting;
  //             });
  //             var newUpdatedValue = updatedBettings;
  //             const bettingsIds = updatedBettings?.map(
  //               (betting) => betting?.id
  //             );
  //             if (!bettingsIds?.includes(value.betId)) {
  //               newUpdatedValue = [...newUpdatedValue, value];
  //             }

  //             // Return the updated current match object
  //             return {
  //               ...currentMatch,
  //               bettings: newUpdatedValue,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "newBetAdded") {
  //         const value = packet.data[1];
  //         // matchId = value?.match_id;
  //         try {
  //           setCurrentMatch((currentMatch) => {
  //             if (currentMatch?.id !== value?.match_id) {
  //               // If the new bet doesn't belong to the current match, return the current state
  //               return currentMatch;
  //             }

  //             // Update the bettings array in the current match object
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting.id === value.id && value.sessionBet) {
  //                 // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               } else if (
  //                 betting?.id === value?.id &&
  //                 value.sessionBet === false
  //               ) {
  //                 return {
  //                   ...betting,
  //                   ...value,
  //                 };
  //               }
  //               return betting;
  //             });
  //             var newUpdatedValue = updatedBettings;
  //             const bettingsIds = updatedBettings?.map(
  //               (betting) => betting?.id
  //             );

  //             if (!bettingsIds?.includes(value.id)) {
  //               // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

  //               newUpdatedValue = [...newUpdatedValue, value];
  //             } else {
  //               if (
  //                 sessionOffline.includes(value.id) &&
  //                 value.betStatus === 1
  //               ) {
  //                 const newres = sessionOffline.filter((id) => id !== value.id);
  //                 sessionOffline = newres;
  //               }
  //               if (value?.betStatus === 0) {
  //                 sessionOffline.push(value.id);
  //               }
  //             }

  //             // Return the updated current match object
  //             return {
  //               ...currentMatch,
  //               bettings: newUpdatedValue,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "matchOddRateLive") {
  //         // Bookmaker Market live and stop disable condition
  //         const value = packet.data[1];
  //         setCurrentMatch((prev) => {
  //           if (prev?.id === value?.matchId) {
  //             return {
  //               ...prev,
  //               matchOddRateLive: value?.matchOddLive,
  //             };
  //           }
  //           return prev;
  //         });
  //       }
  //       if (packet.data[0] === "bookMakerRateLive") {
  //         // Bookmaker Market live and stop disable condition
  //         const value = packet.data[1];
  //         setCurrentMatch((prev) => {
  //           if (prev?.id === value?.matchId) {
  //             return {
  //               ...prev,
  //               bookMakerRateLive: value?.bookMakerLive,
  //             };
  //           }
  //           return prev;
  //         });
  //       }

  //       if (packet.data[0] === "session_bet") {
  //         const data = packet.data[1];
  //         try {
  //           // setSessionExposure(data?.sessionExposure);
  //           setCurrentMatch((currentMatch) => {
  //             const updatedBettings = currentMatch?.bettings?.map((betting) => {
  //               if (betting?.id === data?.betPlaceData?.bet_id) {
  //                 // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
  //                 let profitLoss = data?.profitLoss;
  //                 return {
  //                   ...betting,
  //                   profitLoss: profitLoss,
  //                 };
  //               }
  //               return betting;
  //             });
  //             // Return the updated current match object
  //             return {
  //               ...currentMatch,
  //               bettings: updatedBettings,
  //             };
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }

  //         setSingleIObtes((prev) => {
  //           const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
  //           return [
  //             {
  //               ...data.betPlaceData,
  //               deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //             },
  //             ...updatedPrev,
  //           ];
  //         });
  //         setSessionBets((prev) => {
  //           const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
  //           return [
  //             {
  //               ...data.betPlaceData,
  //               deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //             },
  //             ...updatedPrev,
  //           ];
  //         });
  //       }

  //       if (packet.data[0] === "match_bet") {
  //         const data = packet.data[1];
  //         if (!isHandled) {
  //           setIsHandled(true);
  //           try {
  //             if (data) {
  //               const body = {
  //                 id: data?.betPlaceData?.id,
  //                 isActive: true,
  //                 createAt: data?.betPlaceData?.createAt,
  //                 updateAt: data?.betPlaceData?.createAt,
  //                 createdBy: null,
  //                 deletedAt: null,
  //                 user_id: null,
  //                 match_id: data?.betPlaceData?.match_id,
  //                 bet_id: data?.betPlaceData?.bet_id,
  //                 result: "pending",
  //                 team_bet: data?.betPlaceData?.team_bet,
  //                 odds: data?.betPlaceData?.odds,
  //                 win_amount: null,
  //                 deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //                 loss_amount: null,
  //                 bet_type: data?.betPlaceData?.bet_type,
  //                 myStack: data?.betPlaceData?.myStack,
  //                 userName: data?.betPlaceData?.userName,
  //                 country: null,
  //                 ip_address: null,
  //                 rate: null,
  //                 marketType: data?.betPlaceData?.marketType,
  //                 amount:
  //                   data?.betPlaceData?.stack || data?.betPlaceData?.stake,
  //               };
  //               setSingleIObtes((prev) => [body, ...prev]);
  //               setCurrentMatch((prev) => {
  //                 if (prev?.id === data?.betPlaceData?.match_id) {
  //                   return {
  //                     ...prev,
  //                     teamA_rate: data?.teamA_rate,
  //                     teamB_rate: data?.teamB_rate,
  //                     teamC_rate: data?.teamC_rate,
  //                   };
  //                 }
  //                 return prev;
  //               });
  //             }
  //           } catch (e) {
  //             console.log("error", e?.message);
  //           } finally {
  //             setIsHandled(false);
  //           }
  //         }
  //       }
  //       if (packet.data[0] === "marketBlock") {
  //         const value = packet.data[1];
  //         setCurrentMatch((currentMatch) => {
  //           if (currentMatch?.id !== value?.match_id) {
  //             // If the new bet doesn't belong to the current match, return the current state
  //             return currentMatch;
  //           }

  //           // Update the block value of BOOKMAKER
  //           var updatedBlockMarket = {};
  //           if (value?.marketType == "MATCH ODDS") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               MATCH_ODDS: {
  //                 ...currentMatch.blockMarket.MATCH_ODDS,
  //                 block: value?.marketLock,
  //               },
  //             };
  //           } else if (value?.marketType == "MANUAL BOOKMAKER") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               MANUALBOOKMAKER: {
  //                 ...currentMatch.blockMarket.MANUALBOOKMAKER,
  //                 block: value?.marketLock,
  //               },
  //             };
  //           } else if (value?.marketType == "BOOKMAKER") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               BOOKMAKER: {
  //                 ...currentMatch.blockMarket.BOOKMAKER,
  //                 block: value?.marketLock,
  //               },
  //             };
  //           } else if (value?.marketType == "SESSION") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               SESSION: {
  //                 ...currentMatch.blockMarket.SESSION,
  //                 block: value?.marketLock,
  //               },
  //             };
  //           }

  //           // Return the updated current match object
  //           return {
  //             ...currentMatch,
  //             blockMarket: updatedBlockMarket,
  //           };
  //         });
  //       }
  //       if (packet.data[0] === "changeOwnerForBlock") {
  //         const value = packet.data[1];
  //         // alert(value?.marketLock)
  //         setCurrentMatch((currentMatch) => {
  //           if (currentMatch?.id !== value?.match_id) {
  //             // If the new bet doesn't belong to the current match, return the current state
  //             return currentMatch;
  //           }

  //           // Update the block value of BOOKMAKER
  //           var updatedBlockMarket = {};
  //           if (value?.marketType == "MATCH ODDS") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               MATCH_ODDS: {
  //                 ...currentMatch.blockMarket.MATCH_ODDS,
  //                 // block: value?.marketLock,
  //                 self: value?.marketLock ? false : true,
  //               },
  //             };
  //           } else if (value?.marketType == "MANUAL BOOKMAKER") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               MANUALBOOKMAKER: {
  //                 ...currentMatch.blockMarket.MANUALBOOKMAKER,
  //                 // block: value?.marketLock,
  //                 self: value?.marketLock ? false : true,
  //               },
  //             };
  //           } else if (value?.marketType == "BOOKMAKER") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               BOOKMAKER: {
  //                 ...currentMatch.blockMarket.BOOKMAKER,
  //                 // block: value?.marketLock,
  //                 self: value?.marketLock ? false : true,
  //               },
  //             };
  //           } else if (value?.marketType == "SESSION") {
  //             updatedBlockMarket = {
  //               ...currentMatch.blockMarket,
  //               SESSION: {
  //                 ...currentMatch.blockMarket.SESSION,
  //                 // block: value?.marketLock,
  //                 self: value?.marketLock ? false : true,
  //               },
  //             };
  //           }

  //           // Return the updated current match object
  //           return {
  //             ...currentMatch,
  //             blockMarket: updatedBlockMarket,
  //           };
  //         });
  //       }
  //     };
  //   }
  // }, [socket]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on("connect", () => {
          socketMicro.emit("init", { id: marketId });
          socketMicro.emit("score", { id: eventId });
          // activateLiveMatchMarket();
          setSessionLock(false);
        });
        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here

          setMacthOddsLive([]);
          setBookmakerLive([]);
          setSessionLock(true);
          console.log("WebSocket connection failed:", event);
        });
        socketMicro.emit("init", { id: marketId });
        setInterval(() => {
          socketMicro.emit("init", { id: marketId });
        }, 3000);

        socketMicro.emit("score", { id: eventId });

        socketMicro.on("reconnect", () => {
          socketMicro.emit("init", { id: marketId });
          socketMicro.emit("score", { id: eventId });
          // activateLiveMatchMarket();
          setSessionLock(false);
        });

        socketMicro.on(`session${marketId}`, (val) => {
          if (val !== null && matchId === matchId) {
            var newVal = val?.map((v) => ({
              bet_condition: v?.RunnerName,
              betStatus: 0,
              sessionBet: true,
              no_rate: v?.LayPrice1,
              yes_rate: v?.BackPrice1,
              rate_percent: `${v?.LaySize1}-${v?.BackSize1}`,
              suspended: v?.GameStatus,
              selectionId: v?.SelectionId,
            }));

            setCurrentMatch((currentMatch) => {
              if (currentMatch?.bettings?.length > 0) {
                const data = currentMatch?.bettings?.map((betting) => {
                  var selectedData = newVal?.find(
                    (data) => data?.selectionId === betting?.selectionId
                  );
                  if (selectedData !== undefined) {
                    return {
                      ...betting,
                      bet_condition: selectedData?.bet_condition,
                      no_rate: selectedData?.no_rate,
                      yes_rate: selectedData?.yes_rate,
                      rate_percent: selectedData?.rate_percent,
                      suspended: selectedData?.suspended,
                      selectionId: selectedData?.selectionId,
                    };
                  }
                  return betting;
                });

                // Merge the filteredNewVal with the currentMatch bettings array

                return {
                  ...currentMatch,
                  bettings: data,
                };
              }
              return currentMatch;
            });
          }

          // dispatch(setSessionOddsLive(body));
        });
        socketMicro.on(`matchOdds${marketId}`, (val) => {
          // matchodds Market live and stop disable condition
          if (val !== null) {
            if (val.length === 0) {
              matchOddsCount += 1;
              if (matchOddsCount >= 3) {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            } else {
              setMacthOddsLive(val[0]);
              if (val[0]?.status === "CLOSED") {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            }
          }
        });
        socketMicro.on(`bookmaker${marketId}`, (val) => {
          if (val !== null) {
            if (val.length > 0) {
              setBookmakerLive(val[0]);
            } else {
              setBookmakerLive([]);
            }
          }
        });
        socketMicro.on(`liveScore${eventId}`, (val) => {
          if (val !== null) {
            setLiveScoreData(val);
            if (val) {
              setLiveScoreData(val);
            } else {
              setLiveScoreData();
            }
          }
        });
      } else {
        setMacthOddsLive([]);
        setBookmakerLive([]);
        setSessionLock(false);
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      socketMicro?.emit("disconnect_market", {
        id: marketId,
      });
      setMacthOddsLive([]);
      setBookmakerLive([]);
      setSessionLock(false);
    };
  }, [socketMicro, marketId]);

  useEffect(() => {
    getSingleMatch(matchId);
    getAllBetsData(matchId);
    // }
  }, []);
  const getSingleMatch = async (val) => {
    try {
      const data = await axios.get(`/game-match/matchDetail/${val}`);
      console.log("yayy", data);
      let matchOddsDataTemp = data.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );

      setManualBookmakerData(matchOddsDataTemp);
      setCurrentMatch({
        ...data.data,
      });
      setEventId(data?.data?.EventId);
      activateLiveMatchEvent(data?.data?.EventId);
      setMarketId(data.data.marketId);
    } catch (e) {
      console.log(e?.message, "message");
    }
  };

  const activateLiveMatchEvent = async (eventId) => {
    try {
      await Axios.get(`${microServiceApiPath}/event/${eventId}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };
  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      setSingleIObtes(data?.data?.data);
      const bets = data?.data?.data?.filter(
        (b) =>
          ![
            "MATCH ODDS",
            "BOOKMAKER",
            "MANUAL BOOKMAKER",
            "QuickBookmaker0",
            "QuickBookmaker1",
            "QuickBookmaker2",
          ].includes(b?.marketType)
      );
      setSessionBets(bets || []);
    } catch (e) {
      console.log(e);
    }
  }

  const handleBlock = async (value, locked, typeOfBet) => {
    try {
      let type = typeOfBet.toUpperCase();
      let payload = {
        match_id: matchId,
        marketType: type,
        marketLock: locked,
        adminTransPassword: value,
      };
      let response = await axios.post(`/game-match/blockMatchMarket`, payload);
      if (typeOfBet == "Match Odds") {
        setCurrentMatch((prevState) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            MATCH_ODDS: {
              ...prevState.blockMarket.MATCH_ODDS,
              block: locked,
            },
          },
        }));
        setIsMatchLock(false);
      } else if (typeOfBet == "MANUAL BOOKMAKER") {
        setCurrentMatch((prevState) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            MANUALBOOKMAKER: {
              ...prevState.blockMarket.MANUALBOOKMAKER,
              block: locked,
            },
          },
        }));
        setIsManualLock(false);
      } else if (typeOfBet == "BOOKMAKER") {
        setCurrentMatch((prevState) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            BOOKMAKER: {
              ...prevState.blockMarket.BOOKMAKER,
              block: locked,
            },
          },
        }));
        setIsBookmakerLock(false);
      } else if (typeOfBet == "SESSION") {
        setCurrentMatch((prevState) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            SESSION: {
              ...prevState.blockMarket.SESSION,
              block: locked,
            },
          },
        }));
        setIsSessionLock(false);
        setIsQuickSessionLock(false);
      }
    } catch (e) {
      console.log(e?.message, "message");
    }
  };

  const handleShowLock = async (value, type) => {
    if (type === "Match Odds") {
      setIsMatchLock(true);
    } else if (type === "Quick Bookmaker") {
      setIsManualLock(true);
    } else if (type === "BOOKMAKER") {
      setIsBookmakerLock(true);
    } else if (type === "Session Market") {
      setIsSessionLock(true);
    } else if (type === "Quick Session Market") {
      setIsQuickSessionLock(true);
    }
  };
  const handleHide = async () => {
    setIsMatchLock(false);
    setIsManualLock(false);
    setIsBookmakerLock(false);
    setIsSessionLock(false);
    setIsQuickSessionLock(false);
  };

  return (
    <Background>
      <Box sx={{ paddingLeft: "0.7% " }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "700",
            paddingTop: "2%",
            alignSelf: "start",
          }}
        >
          {currentMatch?.teamA} V/S {currentMatch?.teamB}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "column-reverse", laptop: "row" },
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          {currentMatch?.apiMatchActive && (
            <Odds
              currentMatch={currentMatch}
              matchOddsLive={matchOddsLive}
              data={
                matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
              }
              typeOfBet={"Match Odds"}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.MATCH_ODDS?.block}
              selft={currentMatch?.blockMarket?.MATCH_ODDS?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isMatchLock}
            />
          )}
          {currentMatch?.manualBookMakerActive && (
            <Odds
              currentMatch={currentMatch}
              data={currentMatch}
              manualBookmakerData={manualBookmakerData}
              typeOfBet={"Quick Bookmaker"}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.MANUALBOOKMAKER?.block}
              selft={currentMatch?.blockMarket?.MANUALBOOKMAKER?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              mShowUnlock={isManualLock}
            />
          )}
          {currentMatch?.apiBookMakerActive && (
            <BookMarketer
              currentMatch={currentMatch}
              data={
                bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
              }
              blockMatch={true}
              locked={currentMatch?.blockMarket?.BOOKMAKER?.block}
              selft={currentMatch?.blockMarket?.BOOKMAKER?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isBookmakerLock}
            />
          )}

          {currentMatch?.manualSessionActive && (
            <SessionMarket
              title={"Quick Session Market"}
              currentMatch={currentMatch}
              sessionBets={sessionBets}
              data={[]}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.SESSION?.block}
              selft={currentMatch?.blockMarket?.SESSION?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isQuickSessionLock}
              max={currentMatch?.manaual_session_max_bet}
              min={currentMatch?.manaual_session_min_bet}
              // sessionOffline={sessionOffline}
            />
          )}
          {currentMatch?.apiSessionActive && (
            <SessionMarket
              title={"Session Market"}
              currentMatch={currentMatch}
              sessionBets={sessionBets}
              data={[]}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.SESSION?.block}
              selft={currentMatch?.blockMarket?.SESSION?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isSessionLock}
              max={currentMatch?.betfair_session_max_bet}
              min={currentMatch?.betfair_session_min_bet}
              // sessionOffline={sessionOffline}
            />
          )}
        </Box>
        <Box sx={{ width: "20px" }} />
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          <MatchComponent
            currentMatch={currentMatch}
            liveScoreData={liveScoreData}
            submit={true}
          />

          <LiveMatchHome currentMatch={currentMatch} submit={true} />
          <FullAllBets IObets={IOSinglebets} mode={mode} tag={false} />
        </Box>
      </Box>
    </Background>
  );
};

export default memo(NewMatchScreen);
