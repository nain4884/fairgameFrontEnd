import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  CustomHeader,
  DailogModal,
  MatchOdds,
  SideBar,
} from "../../components";
import EventListing from "../../components/EventListing";
import MatchesComponent from "../../components/Matches/Matches";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { HourGlass } from "../../assets";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../store/betPlace";
import BetPlaced from "../../components/BetPlaced";
import SessionBetSeperate from "../../components/sessionBetSeperate";
import AllRateSeperate from "../../components/AllRateSeperate";
import LiveMatchHome from "../../components/LiveMatchHome";
import MatchComponent from "../../components/MathComponent";
import AccountStatementList from "../../components/AccountStatementList";
import YellowHeader from "../../components/yellowheader";
import ProfitLossComponent from "../../components/ProfitLossComponent";
import { ChangePassword } from "../../components/ChangePassword";
import ManualBookMakerMarket from "../../components/ManualBookMakerMarket";
import axios from "../../axios/axios";
import { microServiceApiPath } from "../../components/helper/constants";
import { AuthContext } from "../../Authprovider";
import { SocketContext } from "../../context/socketContext";
import { setRole } from "../../components/helper/SetRole";
import { stateActions } from "../../store/stateActions";
import {
  setAddBetRates,
  setManualBookMarkerRates,
  setAllSessionBets,
  setAllBetRate,
  setSessionRates,
} from "../../newStore/reducers/matchDetails";
import userAxios from "../../axios/userAxios";
import { setCurrentUser } from "../../newStore/reducers/currentUser";

let session = [];
let bets = [];

export default function Matches() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("CRICKET");
  const [open, handleClose] = useState(false);
  const [flag, setFlag] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { activeTab } = useSelector((state) => state.betPlace);
  const { tokenUser } = useContext(AuthContext);
  useEffect(() => {
    if (tokenUser != localStorage.getItem("JWTuser")) {
      window.location.reload();
    }
  }, []);
  useEffect(() => {
    if (flag) {
      navigate("/matches");
    } else {
      setFlag(true);
    }
  }, [activeTab]);
  console.log(activeTab, "activeTab");

  const Matches = () => {
    const [id, setId] = useState("");
    const doSetId = (k) => {
      setId(k);
    };
    const doNavigateWithState = (e) => {
      navigate("/matchDetail", { state: e });
    };
    return (
      <>
        {!matchesMobile ? (
          <Box
            sx={{
              display: "flex",
              overflowX: "hidden",
              flexDirection: "column",
              flex: 1,
              justifyContent: "flex-start",
              overflowY: "auto",
              alignItems: "flex-start",
            }}
          >
            <EventListing selected={activeTab} setSelected={setSelected} />
            <div style={{ height: "1vh" }} />
            {(activeTab == "CRICKET" || activeTab == "INPLAY") && (
              <MatchesComponent
                // onClick={() => {
                //   dispatch(setActive("CRICKET"));
                //   navigate("/home",{state:id});
                // }}
                // matches={matches}
                setMatchId={setId}
                doNavigateWithState={doNavigateWithState}
              />
            )}
            {activeTab != "CRICKET" && activeTab != "INPLAY" && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Lottie
                  animationData={HourGlass}
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    width: "200px",
                    height: "200px",
                  }}
                />
                <Typography sx={{ color: "text.white" }}>
                  Coming Soon
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ overflowX: "hidden", minHeight: "100vh" }}>
            <EventListing selected={activeTab} setSelected={setSelected} />
            {(activeTab == "CRICKET" || activeTab == "INPLAY") && (
              <MatchesComponent
                doNavigateWithState={doNavigateWithState}
                setMatchId={doSetId}
                macthId={id}
              />
            )}
            {activeTab != "CRICKET" && activeTab != "INPLAY" && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Lottie
                  animationData={HourGlass}
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    width: "200px",
                    height: "200px",
                  }}
                />
                <Typography sx={{ color: "text.white" }}>
                  Coming Soon
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </>
    );
  };

  const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [sessionbets, setSessionBets] = useState([]);
    const { allBetRates, allSessionBets } = useSelector(
      (state) => state?.matchDetails
    );
    const [IObets, setIObtes] = useState(allBetRates);
    // const [allBetRates, setAllBetRates] = useState([]);
    const id = location.state;
    const [matchDetail, setMatchDetail] = useState();
    const [matchOddsData, setMatchOddsData] = useState([]);
    const [matchSessionData, setMatchSessionData] = useState([]);
    const [allBetsData, setAllBetsData] = useState([]);
    const [marketId, setMarketId] = useState("");
    const { currentUser } = useSelector((state) => state?.currentUser);

    const [matchOddsRates, setMatchOddsRates] = useState({
      matchOddsRates: {
        teamA: "1000000",
        teamB: "-1000000",
      },
      bookmakerMarket: {
        teamA: "1000000",
        teamB: "-1000000",
      },
      manualBookmaker: {
        teamA: "1000000",
        teamB: "-1000000",
      },
    });
    const { socket } = useContext(SocketContext);

    const { axios, role } = setRole();
    
    useEffect(() => {
      if (socket && socket.connected) {
        console.log("Connected", socket);
        socket.on("newMessage", (value) => {
          console.log(value);
        });
        socket.on("session_bet", (data) => {
          console.log("SESSION Response", data);
          const user = {
            ...currentUser,
            current_balance: data.newBalance,
            exposure: data.exposure,
          };

          session = [...allSessionBets];
          session.unshift(data?.betPlaceData);
          //  console.log(session,"SDsdsdasdsa")
          dispatch(setCurrentUser(user));
          dispatch(setAllSessionBets(session));
          dispatch(setSessionRates(data?.profitLoss));
        });
        socket.on("match_bet", (data) => {
          try {
            // getAllBets();
            console.log(data, "MATCHH_BET",data?.betPlaceData?.match_id ,id);
            if (data) {
              const user = {
                ...currentUser,
                current_balance: data.newBalance,
                exposure: data.exposure,
              };
              const manualBookmaker = {
                teamA: data.teamA_rate,
                teamB: data.teamB_rate,
              };
              const body = {
                id: data?.betPlaceData?.id,
                isActive: true,
                createAt: data?.betPlaceData?.createdAt,
                updateAt: data?.betPlaceData?.createdAt,
                createdBy: null,
                deletedAt: null,
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

              if (data?.betPlaceData?.match_id === id) {
                setIObtes((prev) => [body, ...prev]);
              }

              dispatch(setCurrentUser(user));
              dispatch(setManualBookMarkerRates(manualBookmaker));
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
      }
    }, [socket]);

    async function getThisMatch(id) {
      try {
        let matchOddsDataTemp = [];
        let matchSessionDataTemp = [];
        const response = await axios.get(`/game-match/matchDetail/${id}`);
        response.data?.bettings?.forEach((element) => {
          if (element.sessionBet === false || element.sessionBet === 0) {
            matchOddsDataTemp.push(element);
          } else {
            matchSessionDataTemp.push(element);
          }
        });
        setMatchOddsData(matchOddsDataTemp);
        setMatchSessionData(matchSessionDataTemp);
        setMarketId(response.data.marketId);
        setMatchDetail(response.data);

        response.data.bettings?.forEach((element) => {
          if (element.sessionBet) {
            setSessionBets((prev) => {
              if (!prev.some((bet) => bet.id === element.id)) {
                return [...prev, element];
              }
              return prev;
            });
          } else {
            // setAllBetRates((prev) => {
            //   if (!prev.some((bet) => bet.id === element.id)) {
            //     return [...prev, element];
            //   }
            //   return prev;
            // });
          }
        });
        // console.log(response.data, "sda");
      } catch (e) {
        console.log("response", e.response.data);
      }
    }

    async function getAllBetsData() {
      try {
        let response = await axios.get(
          `/game-match/getAllMatch?bets=1&field=id,marketId`
        );
        setAllBetsData(response.data[0]);
      } catch (e) {
        console.log(e);
      }
    }
    useEffect(() => {
      const matchDetails = window.localStorage.getItem("manual_bookmaker");
      if (matchDetails != null) {
        console.log(matchDetails);
        // setMatchOddsRates(matchDetails)
      }
      getThisMatch(id);
      getAllBetsData();
      // const newSocket = io.connect(`${microServiceApiPath}`, { trasports: ['websocket'] });
      // setSocket(newSocket)
      // newSocket.emit("init", { id: marketId })
      // newSocket.on("marketRate", (data) => {
      //   console.log("marketRate Response", data);
      // })
      // return () => newSocket.off();
    }, [marketId]);

    return (
      <Box
        sx={{
          display: "flex",
          overflowX: "hidden",
          flexDirection: "column",
          flex: 1,
          justifyContent: "flex-start",
          overflowY: "auto",
          alignItems: "flex-start",
        }}
      >
        <EventListing setSelected={setSelected} selected={activeTab} />
        <BetPlaced visible={visible} setVisible={setVisible} />
        {matchesMobile && (activeTab == "CRICKET" || activeTab == "INPLAY") && (
          <div
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <MatchOdds
                matchOddsRates={matchOddsRates}
                onClick={() => handleClose(true)}
                data={{ ...matchDetail, matchOddsData, matchSessionData }}
              />
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "98%",
                }}
              >
                {matchDetail?.manualSessionActive && (
                  <SessionBetSeperate allBetsData={allSessionBets} mark />
                )}
                {allBetsData.length > 0 && (
                  <AllRateSeperate
                    allBetsData={IObets?.filter((v) =>
                      ["MATCH ODDS"].includes(v.marketType)
                    )}
                    mark
                  />
                )}
              </Box>
              <LiveMatchHome />
            </Box>
          </div>
        )}
        {!matchesMobile &&
          (activeTab == "CRICKET" || activeTab == "INPLAY") && (
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <MatchOdds
                  matchOddsRates={matchOddsRates}
                  onClick={() => handleClose(true)}
                  data={{ ...matchDetail, matchOddsData, matchSessionData }}
                />
              </Box>
              <Box sx={{ width: "30%", paddingRight: "1%" }}>
                <MatchComponent /> {/** Live scoreBoard */}
                <LiveMatchHome /> {/* Poster */}
                <AllRateSeperate
                  allBetsData={IObets?.filter((v) =>
                    ["MATCH ODDS"]?.includes(v.marketType)
                  )}
                  mark
                />
                {matchDetail?.manualSessionActive && (
                  <SessionBetSeperate allBetsData={allSessionBets} mark />
                )}
              </Box>
            </Box>
          )}
        {activeTab != "CRICKET" && activeTab != "INPLAY" && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Lottie
              animationData={HourGlass}
              style={{
                display: "flex",
                alignSelf: "center",
                width: "200px",
                height: "200px",
              }}
            />
            <Typography sx={{ color: "text.white" }}>Coming Soon</Typography>
          </Box>
        )}
      </Box>
    );
  };
  const ChangeButtonValue = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex" },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <Box
            sx={{
              width: { mobile: "96vw", laptop: "35vw", tablet: "35vw" },
              minWidth: { laptop: "450px", tablet: "450px", mobile: "0px" },
              marginTop: "10px",
              marginX: { mobile: "2vw", laptop: "5vw" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "18px", mobile: "20px" },
                fontWeight: "700",
              }}
            >
              Change Button Values
            </Typography>
            <Box
              sx={{
                width: "100%",
                minHeight: "200px",
                background: "#F8C851",
                borderRadius: "5px",
                padding: "20px",
                marginTop: "10px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Price Lable
                  </Typography>
                  {[
                    "100",
                    "5000",
                    "10000",
                    "25000",
                    "50000",
                    "100000",
                    "200000",
                    "500000",
                  ].map((x) => {
                    return <ValButton value={x} />;
                  })}
                </Box>
                <Box sx={{ flex: 1, marginLeft: "10px" }}>
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Price Value
                  </Typography>
                  {[
                    "100",
                    "5000",
                    "10000",
                    "25000",
                    "50000",
                    "100000",
                    "200000",
                    "500000",
                  ].map((x) => {
                    return <ValButton value={x} />;
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  marginTop: "50px",
                  marginBottom: "40px",
                  width: "80%",
                  background: "#0B4F26",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
                  color={"white"}
                >
                  Update
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const AccountStatement = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              paddingX: "5px",
            },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <YellowHeader />
          <AccountStatementList />
        </Box>
      </>
    );
  };

  const BetHistory = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex", minHeight: "100vh" },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
              flexDirection: "column",
            }),
          ]}
        >
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "5px", mobile: "3px" },
              marginTop: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"BET HISTORY"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "99%",
                display: "flex",
                flexDirection: { laptop: "row", mobile: "column" },
              }}
            >
              <AllRateSeperate mark2 mark />
              <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>
              <SessionBetSeperate mark />
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const ProfitLoss = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex", minHeight: "100vh" },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
              flexDirection: "column",
              paddingX: "1vw",
            }),
          ]}
        >
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "2px", mobile: "6px" },
              marginTop: "10px",
              marginBottom: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"PROFIT/LOSS REPORT"}
          </Typography>
          <ProfitLossComponent />
        </Box>
      </>
    );
  };

  const Rules = () => {
    const ListHeader = () => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "25px",
            background: "white",
            display: "flex",
            padding: "1px",
          }}
        >
          <Box
            sx={{
              width: { laptop: "3%", mobile: "6%" },
              height: "100%",
              background: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
            >
              No.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "97%", mobile: "94%" },
              height: "100%",
              background: "black",
              display: "flex",
              marginLeft: "1px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                color: "white",
                fontSize: "10px",
                paddingLeft: "5px",
              }}
            >
              Description
            </Typography>
          </Box>
        </Box>
      );
    };
    const RowComponent = ({ index }) => {
      let flag = index % 2 != 0;
      return (
        <Box
          sx={{
            width: "100%",
            height: "35px",
            background: "white",
            display: "flex",
            padding: "1px",
            paddingTop: "0px",
          }}
        >
          <Box
            sx={{
              width: { laptop: "3%", mobile: "6%" },
              height: "100%",
              background: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
            >
              {index + 1}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "97%", mobile: "94%" },
              height: "100%",
              background: flag ? "#ECECEC" : "#FFE094",
              display: "flex",
              marginLeft: "1px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                color: "black",
                fontSize: { laptop: "10px", mobile: "8px" },
                paddingLeft: "5px",
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </Typography>
          </Box>
        </Box>
      );
    };
    return (
      <>
        <CustomHeader />

        <Box
          flex={1}
          sx={[
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              paddingX: "5px",
            },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "2px", mobile: "3px" },
              marginTop: "10px",
              marginBottom: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"RULES"}
          </Typography>
          <ListHeader />
          {["", "", "", ""].map((value, index) => {
            return <RowComponent index={index} />;
          })}{" "}
        </Box>
      </>
    );
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {window.location.pathname === "/change_password" ? (
        <ChangePassword />
      ) : window.location.pathname === "/change_button_value" ? (
        <ChangeButtonValue />
      ) : window.location.pathname === "/account_statement" ? (
        <AccountStatement />
      ) : window.location.pathname === "/bet_history" ? (
        <BetHistory /> //profit_loss
      ) : window.location.pathname === "/profit_loss" ? (
        <ProfitLoss />
      ) : window.location.pathname === "/rules" ? (
        <Rules />
      ) : (
        <>
          <CustomHeader />
          <Box
            flex={1}
            sx={[
              { flex: 1, display: "flex" },
              (theme) => ({
                backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
              }),
            ]}
          >
            <SideBar />
            {window.location.pathname === "/matches" && <Matches />}
            {window.location.pathname === "/matchDetail" && <Home />}
          </Box>
        </>
      )}
      {/* <DailogModal /> */}
    </div>
  );
}

const ValButton = ({ value }) => {
  return (
    <Box
      sx={{
        background: "white",
        height: "40px",
        marginTop: "5px",
        border: "2px solid #DEDEDE",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        px: "5px",
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
        {value}
      </Typography>
    </Box>
  );
};
