import React, { useCallback, useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import {
  Typography,
  useMediaQuery,
  Box,
  Menu,
  MenuItem,
  Pagination,
} from "@mui/material";
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
} from "../../assets";
import "../../index.css";
import PlaceBet from "../PlaceBet";
import { useDispatch, useSelector } from "react-redux";
import { setColorValue } from "../../store/selectedColorBox";
import { useState } from "react";
import StyledImage from "../StyledImage";
import { setAnchor } from "../../store/betPlace";
import { Popover } from "react-tiny-popover";
import BetPlaced from "../BetPlaced";
import Modal from "../Modal";
import { setDailogData } from "../../store/dailogModal";
import { useNavigate } from "react-router-dom";
import useOuterClick from "../helper/userOuterClick";
import SeprateBox from "./SeprateBox";
import MoneyBox from "./MoneyBox";
import Divider from "../helper/Divider";
import Odds from "./Odds";
import { setRole } from "../../newStore";
const { axios } = setRole();

const ITEM_HEIGHT = 36;
const MOBILE_ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;
const MENU_ITEMS = 3;

const SmallBoxSeason = ({ color }) => {
  return (
    <Box
      sx={{
        width: { laptop: "70px", mobile: "17vw" },
        flexDirection: "column",
        position: "absolute",
        display: "flex",
        left: { mobile: "56.5%", laptop: "49vw", tablet: "49%" },
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

const SeasonMarketBox = ({ index, typeOfBet, data, mainData, allRates }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
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
          {data.bet_condition}
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
        <SeprateBox po={1} color={"white"} />
        {matchesMobile && (
          <PlaceBetComponent
            amount={index == 2}
            profitLoss={data?.profitLoss}
          />
        )}
        {false && (
          <>
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeprateBox po={2} color={"white"} rates={allRates} />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeprateBox po={3} color={"white"} rates={allRates} />
          </>
        )}
        <Box sx={{ width: ".45%", display: "flex", background: "pink" }}></Box>
        <SeprateBox po={6} color={"white"} />
        <SeprateBox
          po={2}
          rates={allRates}
          session={true}
          value={data.no_rate}
          value2={data.rate_percent}
          lock={index == 2}
          color={"#F6D0CB"}
          type={{ color: "#FFB5B5", type: "YN" }}
          typeOfBet={typeOfBet}
          data={data}
          mainData={mainData}
        />
        <Box sx={{ width: ".45%", display: "flex", background: "pink" }}></Box>
        <SeprateBox
          po={1}
          rates={allRates}
          session={true}
          back={true}
          value={data.yes_rate}
          value2={data.rate_percent}
          lock={index == 2}
          color={"#B3E0FF"}
          type={{ color: "#A7DCFF", type: "YN" }}
          typeOfBet={typeOfBet}
          data={data}
          mainData={mainData}
        />
        <Box sx={{ width: ".45%", display: "flex", background: "pink" }}></Box>
        {!matchesMobile && (
          <>
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeprateBox color={"white"} rates={allRates} />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeprateBox color={"white"} rates={allRates} />
          </>
        )}
        {!matchesMobile && (
          <PlaceBetComponentWeb
            amount={index == 2}
            profitLoss={data?.profitLoss}
          />
        )}
      </Box>
    </Box>
  );
};
const PlaceBetComponent = ({ amount, profitLoss }) => {
  const { sessionRates } = useSelector((state) => state?.matchDetails);
  const [proLoss, setProfitLoss] = useState(profitLoss);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(0);
  };
  const [show, setShow] = React.useState(false);
  const innerRef = useOuterClick((ev) => {
    setShow(false);
  });

  useEffect(() => {
    if (sessionRates) {
      setProfitLoss(sessionRates);
    }
  }, [sessionRates]);

  console.log(profitLoss, sessionRates, "profitLoss>>>");

  return (
    <Box sx={{ marginTop: "-8.4vw" }}>
      <Box
        ref={innerRef}
        onClick={(e) => {
          setShow(!show);
        }}
        sx={{
          background: "#0B4F26",
          position: "relative",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { laptop: "90px", mobile: "80px" },
          borderRadius: "5px",
          height: "35px",
          left: "35px",
          position: "absolute",
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "90%",
            height: "45%",
            zIndex: 40,
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
            Total Bet :{" "}
            <span style={{ color: "#0B4F26" }}>{proLoss?.total_bet || 0}</span>
          </Typography>
        </Box>
        <Box sx={{ zIndex: 100 }}>
          <Typography
            sx={{
              fontSize: { laptop: "10px", mobile: amount ? "10px" : "8px" },
              fontWeight: amount ? "bold" : "500",
              color: "white",
            }}
          >
            {amount ? "-10,000,000" : "Profit/Loss"}
          </Typography>
        </Box>
      </Box>
      {show && (
        <DropdownMenu
          style={{ zIbnex: 10 }}
          list={proLoss?.betData}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};
const PlaceBetComponentWeb = ({ amount, profitLoss }) => {
  const { sessionRates } = useSelector((state) => state?.matchDetails);
  const [proLoss, setProfitLoss] = useState(profitLoss);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [show, setShow] = React.useState(false);
  const innerRef = useOuterClick((ev) => {
    setShow(false);
  });

  useEffect(() => {
    if (sessionRates) {
      setProfitLoss(sessionRates);
    }
  }, [sessionRates]);
  console.log(sessionRates, "sessionRatess");
  return (
    <>
      <Box
        onClick={(e) => setShow(!show)}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingX: ".2vw",
          width: { laptop: "10vw" },
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
            sx={{
              fontSize: { laptop: ".5vw" },
              fontWeight: "bold",
              color: "#FF4D4D",
            }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{
              fontSize: { laptop: ".5vw" },
              fontWeight: "bold",
              color: "#0B4F26",
            }}
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
            {amount ? "-100,000,00" : "Profit/Loss"}
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </Box>
        {show && (
          <DropdownMenu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            list={proLoss?.betData}
            handleClose={handleClose}
          />
        )}
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
const DropdownMenu = ({ anchorEl, open, handleClose, list }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <Box
      sx={{
        borderRadius: "5px",
        border: "1px solid #306A47",
        zIndex: 1001,
        overflow: "hidden",
        top: "35px",
        left: matchesMobile ? "-13%" : "0%",
        position: "absolute",
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
        <Box sx={{ maxHeight: "200px", overflowY: "scroll" }}>
          {list?.length > 0 ? (
            list?.map((v) => {
              const getColor = (value) => {
                if (value > 1) {
                  return "#306A47";
                } else if (value === v?.profit_loss && value > 1) {
                  return "#F8C851";
                } else {
                  return "#DC3545";
                }
              };
              const getSVG = (value) => {
                if (value > 1) {
                  return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                } else if (value === v?.profit_loss && value > 1) {
                  return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                } else {
                  return "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg";
                }
              };
              return (
                <Box
                  key={v?.odds}
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
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {v?.odds}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "90px",
                      display: "flex",
                      borderLeft: `1px solid #306A47`,
                      background: getColor(v?.profit_loss),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "white",
                      }}
                    >
                      {v?.profit_loss}
                    </Typography>
                    <StyledImage
                      src={getSVG(v?.profit_loss)}
                      sx={{
                        height: "15px",
                        marginLeft: "5px",
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                        width: "15px",
                      }}
                    />
                  </Box>
                </Box>
              );
            })
          ) : (
            <>
              {" "}
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
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
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
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
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
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
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
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
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
                    4,02,350f
                  </Typography>
                  <StyledImage
                    src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                    sx={{
                      height: "15px",
                      marginLeft: "5px",
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
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
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      width: "15px",
                    }}
                  />
                </Box>
              </Box>{" "}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const SessionMarket = ({ data, teamARates, teamBRates }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  // const [matchData, setMatchData] = useState([])
  // const [pageCount, setPageCount] = useState(10)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageLimit, setPageLimit] = useState(5)

  // useEffect(() => {
  //     getAllMatch()
  // }, [currentPage, pageCount])

  // async function getAllMatch() {
  //     try {
  //         // let { data } = await axios.get(`/game-match/getAllMatch?bets=1&pageNo=${currentPage}&pageLimit=${pageLimit}`);
  //         if(data.length > 0) {
  //             setMatchData(data)
  //             setPageCount(Math.ceil(parseInt(data[1]) / pageLimit));
  //         }
  //     } catch (e) {
  //         console.log(e)
  //     }
  // }

  // function callPage(e) {
  //     setCurrentPage(parseInt(e.target.outerText))
  // }

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
                  MIN:{data?.manaual_session_min_bet} MAX:
                  {data?.manaual_session_max_bet}
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
                  <SeasonMarketBox
                    typeOfBet={"Session"}
                    data={element}
                    mainData={data}
                    allRates={{ teamA: teamARates, teamB: teamBRates }}
                  />
                  <Divider />
                </>
              );
            })}
          {/* <SeasonMarketBox index={1} typeOfBet={"Session"} data={data} />
                <Divider />
                <SeasonMarketBox typeOfBet={"Session"} data={data} />
                <Divider />
                <SeasonMarketBox typeOfBet={"Session"} data={data} />
                <Divider />
                <SeasonMarketBox index={2} typeOfBet={"Session"} data={data} />
                <Divider />
                <SeasonMarketBox typeOfBet={"Session"} data={data} />
                <Divider />
                <SeasonMarketBox typeOfBet={"Session"} data={data} />
                <Divider />
                <SeasonMarketBox typeOfBet={"Session"} data={data} />
                <Divider /> */}
        </Box>
      </Box>
      {/* <Pagination className="whiteTextPagination d-flex justify-content-center" count={pageCount} color="primary" onChange={callPage} /> */}
    </>
  );
};

// const BookMarketer = ({ manual, data }) => {
//   const theme = useTheme();
//   const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         backgroundColor: "white",
//         padding: 0.2,
//         flexDirection: "column",
//         marginY: { mobile: ".2vh", laptop: ".5vh" },
//         width: { mobile: "98%", laptop: "97%" },
//         marginX: "1vw",
//         alignSelf: { mobile: "center", tablet: "center", laptop: "flex-start" },
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           height: 38,
//           flexDirection: "row",
//           width: "99.7%",
//           alignSelf: "center",
//         }}
//       >
//         <Box
//           sx={{
//             flex: 1,
//             background: "#f1c550",
//             alignItems: "center",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
//               fontWeight: "bold",
//               marginLeft: "7px",
//             }}
//           >
//             {manual && "Manual"} Bookmaker Market
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             flex: 0.1,
//             background: "#262626",
//             // '#262626'
//           }}
//         >
//           <div class="slanted"></div>
//         </Box>
//         <Box
//           sx={{
//             flex: 1,
//             background: "#262626",
//             // '#262626' ,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//           }}
//         >
//           <SmallBox color={"#FF4D4D"} />
//           <Typography
//             sx={{
//               color: "white",
//               width: "60px",
//               fontSize: { laptop: "9px", tablet: "9px", mobile: "7px" },
//               fontWeight: "500",
//               flexWrap: "wrap",
//             }}
//           >
//             Maximum Bet{" "}
//             {manual
//               ? data?.bookmaker_manual_max_bet
//               : data?.betfair_bookmaker_max_bet}
//           </Typography>
//           <img
//             src={Info}
//             style={{
//               width: "15px",
//               height: "15px",
//               marginRight: "5px",
//               marginLeft: "5px",
//             }}
//           />
//         </Box>
//       </Box>
//       {
//         <Box
//           sx={{
//             display: "flex",
//             background: "#319E5B",
//             height: "25px",
//             width: "99.7%",
//             alignSelf: "center",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               background: "'#319E5B'",
//               height: "25px",
//               width: "40%",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "white",
//                 fontSize: { laptop: "11px", mobile: "9px" },
//                 marginLeft: "7px",
//               }}
//             >
//               MIN: 4000 MAX:4500
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               background: "#319E5B",
//               height: "25px",
//               width: { laptop: "60%", mobile: "80%" },
//               justifyContent: { laptop: "center", mobile: "flex-end" },
//             }}
//           >
//             <Box
//               sx={{
//                 background: "#00C0F9",
//                 width: { laptop: "16.5%", mobile: "25%" },
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
//               >
//                 Back
//               </Typography>
//             </Box>
//             <Box sx={{ width: ".35%", display: "flex" }}></Box>
//             <Box
//               sx={{
//                 background: "#FF9292",
//                 width: { laptop: "16.5%", mobile: "25%" },
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
//               >
//                 Lay
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       }
//       <Box sx={{ position: "relative" }}>
//         <BoxComponent color={"#46e080"} name={data.teamA} />
//         <Divider />
//         <BoxComponent color={"#FF4D4D"} name={data.teamB} align="end" />
//         {!matchesMobile && (
//           <Box
//             sx={{
//               background: "rgba(0,0,0,1)",
//               width: "60%",
//               marginLeft: "40%",
//               height: "82px",
//               position: "absolute",
//               top: ".1px",
//               alignItems: "center",
//               justifyContent: "center",
//               display: "flex",
//             }}
//           >
//             <img src={BallStart} style={{ width: "113px", height: "32px" }} />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };
const MatchOdds = ({ data }) => {
  const { manualBookMarkerRates, matchOddsLive, bookmakerLive } = useSelector(
    (state) => state?.matchDetails
  );


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* {data?.apiBookMakerActive && <BookMarketer data={data} />}
      {data?.manualBookMakerActive && (
        <BookMarketer manual={true} data={data} />
      )} */}

      {data?.apiMatchActive && (
        <Odds
          showDely={true}
          newData={data}
          data={matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []}
          lock={
            data?.matchOddsData?.length > 0 &&
            data?.matchOddsData[0]?.betStatus === 1
              ? false
              : true
          }
          suspended={false}
          teamARates={manualBookMarkerRates?.teamA}
          teamBRates={manualBookMarkerRates?.teamB}
          min={data?.betfair_match_min_bet || 0}
          max={data?.betfair_match_max_bet || 0}
          title={"Match Odds"}
        />
      )}

      {data?.apiBookMakerActive && (
        <Odds
          newData={data}
          showDely={true}
          lock={!data?.bookMakerRateLive}
          data={bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []}
          suspended={false}
          teamARates={manualBookMarkerRates?.teamA}
          teamBRates={manualBookMarkerRates?.teamB}
          min={data?.betfair_bookmaker_min_bet || 0}
          max={data?.betfair_bookmaker_max_bet || 0}
          title={"Bookmaker Market "}
        />
      )}

      {/* Manual Bookmaker */}
      {data?.manualBookMakerActive && (
        <Odds 
          newData={data}
          lock={false}
          showDely={false}
          suspended={false}
          data={data}
          teamARates={manualBookMarkerRates?.teamA}
          teamBRates={manualBookMarkerRates?.teamB}
          min={data?.bookmaker_manual_min_bet || 0}
          max={data?.bookmaker_manual_max_bet || 0}
          title={"Manual Bookmaker"}
        />
      )}

      {/*`${match.bettings[0].teamA_Back ? match.bettings[0].teamA_Back - 2 : 50 - 2}`*/}

      {(data?.apiSessionActive || data.manualSessionActive) && (
        <SessionMarket
          data={data}
          teamARates={manualBookMarkerRates?.teamA}
          teamBRates={manualBookMarkerRates?.teamB}
        />
      )}
    </Box>
  );
};

export default MatchOdds;
