import { memo } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import moment from "moment";
import { StyledImage } from ".";
import { ArrowDown } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import SessionBetSeperate from "./sessionBetSeperate";
import ChildUserList from "./ChildUserList";
import { useState } from "react";
import { setRole } from "../newStore";
import AllRateSeperate from "./AllRateSeperate";
import ModalMUI from "@mui/material/Modal";
import SessionComponentMatches from "./SessionComponentMatches";

const AllUserListSeparate = ({
  item,
  index,
  getBetReport,
  showListOfUsers,
  sessionBetData,
  selectedId,
  matchId,
  bet1Data,
  activeUser,
  sessionBets,
  user,
  userId,
}) => {
  const theme = useTheme();
  let { axios } = setRole();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [showSessionResultList, setShowSessionResultList] = useState(false);
  const [showChildUserList, setShowChildUserList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [betData, setBetData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [showBets, setShowBets] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showSessionBets, setShowSessionBets] = useState(false);
  const [childUserReport, setChildUserReport] = useState(null);

  const [showSubUsers, setSubSusers] = useState({
    value: false,
    id: "",
    role: item?.role,
  });

  const getBetAndSessionData = async () => {
    try {
      let payload = {
        gameType: item?.eventType,
        userId: item?.userId,
        // matchId: matchId,
        match_id: matchId,
      };
      let payload2 = {
        gameType: item?.eventType,
        userId: item?.userId,
        match_id: matchId,
        sessionBet: true,
      };
      const resp = await axios.post(`/betting/getResultBetProfitLoss`, payload);

      const resp2 = await axios.post(
        `/betting/getResultBetProfitLoss`,
        payload2
      );
      const newData = resp?.data?.data?.filter((v) => v.sessionBet !== true);
      const newData1 = resp2?.data?.data?.filter((v) => v.sessionBet === true);

      setBetData(
        newData?.map((v) => ({
          id: v.id,
          isActive: true,
          createAt: v.createAt,
          updateAt: v.createAt,
          createdBy: null,
          deletedAt: null,
          user_id: null,
          match_id: v.match_id,
          bet_id: v.bet_id,
          result: "pending",
          team_bet: v.team_bet || v.teamBet,
          odds: v.odds,
          win_amount: null,
          loss_amount: null,
          bet_type: v.betType,
          country: null,
          ip_address: null,
          rate: null,
          marketType: v.marketType,
          myProfitLoss: v.myProfitLoss,
          amount: v.amount,
          deleted_reason: v.deleted_reason,
          username: v.username,
        }))
      );
      setSessionData(
        newData1?.map((v) => ({
          id: v.id,
          isActive: true,
          createAt: v.createAt,
          updateAt: v.createAt,
          createdBy: null,
          deletedAt: null,
          user_id: null,
          match_id: v.match_id,
          bet_id: v.bet_id,
          result: "pending",
          team_bet: v.team_bet || v.teamBet,
          odds: v.odds,
          win_amount: null,
          loss_amount: null,
          bet_type: v.betType,
          country: null,
          ip_address: null,
          rate: null,
          marketType: v.marketType,
          myProfitLoss: v.myProfitLoss,
          amount: v.amount,
          deleted_reason: v.deleted_reason,
          username: v.username,
        }))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getChildUserReport = async () => {
    try {
      const { eventType, userId } = item;
      const payload = {
        gameType: eventType,
        userId,
        match_id: matchId,
      };
      const { data } = await axios.post(`/betting/profitLossReport`, payload);
      setChildUserReport(data?.data[0][0]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "45px",
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { mobile: "10%", laptop: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {"0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { mobile: "65%", laptop: "80%", tablet: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: { laptop: "center", mobile: "flex-end" },
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "0px", mobile: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          >
            ({moment(item?.betDate).format("DD-MM-YYYY")})
          </Typography>

          <Box
            onClick={(e) => {
              e.stopPropagation();
              setShowModal((prev) => !prev);
              getChildUserReport();
            }}
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "10px", laptop: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.userName}
            </Typography>
          </Box>
          {item?.role !== "user" && (
            <StyledImage
              onClick={() => {
                if (!["user"].includes(item?.role)) {
                  if (
                    showSubUsers?.value &&
                    showSubUsers?.id === item?.userId
                  ) {
                    setSubSusers({
                      ...showSubUsers,
                      value: false,
                      id: "",
                    });
                    setShowChildUserList(false);
                  } else {
                    setSubSusers({
                      ...showSubUsers,
                      value: true,
                      id: item?.userId,
                    });
                    setShowChildUserList(true);
                  }
                } else {
                  if (showSessionResultList) {
                    setShowSessionResultList((prev) => !prev);
                  } else {
                    getBetAndSessionData();
                    setShowSessionResultList(true);
                  }
                }
              }}
              src={ArrowDown}
              sx={{
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform:
                  showSubUsers?.id === item?.userId && showChildUserList
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            background: "#27AC1E",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "12px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Profit
            </Typography>
            <StyledImage
              src={ARROWUP}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss >= 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#E32A2A",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "12px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Loss
            </Typography>
            <StyledImage
              src={ARROWDOWN}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss < 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ModalMUI
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              alignSelf: "center",
              width: { mobile: "90%", laptop: "90%" },
            }}
          >
            <>
              <Box
                sx={[
                  {
                    width: { mobile: "96%", laptop: "100%", tablet: "100%" },
                    // marginX: "0.5%",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    borderRadius: "10px",
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    overflow: "hidden",
                    border: "2px solid white",
                  },
                  (theme) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`,
                  }),
                ]}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      px: "10px",
                      py: "6px",
                      backgroundColor: "#F8C851",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems="center"
                      sx={{ alignItems: "center" }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            mobile: "14px",
                            laptop: "18px",
                            tablet: "18px",
                          },
                          color: "#000",
                          marginRight: {
                            mobile: "10px",
                            laptop: "20px",
                            tablet: "20px",
                          },
                        }}
                      >
                        Profit/Loss Per User
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowModal((prev) => !prev);
                        setShowBets(false);
                        setShowSessionBets(false);
                        setShowSessions(false);
                      }}
                    >
                      &times;
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50px",
                      background: "white",
                      display: "flex",
                      padding: 0.1,
                    }}
                  >
                    <Box
                      sx={{
                        width: { mobile: "40%", laptop: "60%" },
                        position: "relative",
                        height: "100%",
                        paddingY: "4px",
                        alignItems: { laptop: "center", mobile: "center" },
                        display: "flex",
                        paddingX: "10px",
                        background: "#0B4F26",
                        marginLeft: 0.1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        // onClick={() => {
                        //   setShowModal((prev) => !prev);
                        // }}
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          marginTop: { mobile: "5px", laptop: "0" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { mobile: "10px", laptop: "15px" },
                            color: "white",
                            fontWeight: "600",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineClamp: 2,
                          }}
                        >
                          {item?.userName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        if (showBets) {
                          setShowBets((prev) => !prev);
                        } else {
                          if (showSessions) {
                            setShowSessions(false);
                          }
                          setShowBets((prev) => !prev);
                          getBetReport({
                            eventType: item?.eventType,
                            match_id: matchId,
                            userId: item?.userId,
                            type: "all_bet",
                            betId: "",
                            sessionBet: false,
                          });
                        }
                        // }
                      }}
                      sx={{
                        background:
                          childUserReport?.rateProfitLoss > 0
                            ? "#27AC1E"
                            : "#E32A2A",
                        paddingX: "2px",
                        width: { mobile: "25%", laptop: "30%" },
                        height: "100%",
                        marginLeft: 0.1,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { laptop: "12px", mobile: "8px" },
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          Rate Profit/Loss
                        </Typography>
                        <StyledImage
                          src={
                            childUserReport?.rateProfitLoss > 0
                              ? ARROWUP
                              : ARROWDOWN
                          }
                          sx={{
                            width: { laptop: "25px", mobile: "15px" },
                            height: { laptop: "12px", mobile: "8px" },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { mobile: "10px", laptop: "14px" },
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          {childUserReport?.rateProfitLoss ? (
                            Number(childUserReport?.rateProfitLoss) >= 0 ? (
                              <>
                                <span style={{ visibility: "hidden" }}>-</span>
                                {Number(
                                  childUserReport?.rateProfitLoss
                                ).toFixed(2)}
                              </>
                            ) : (
                              Number(childUserReport?.rateProfitLoss).toFixed(2)
                            )
                          ) : (
                            0.0
                          )}
                        </Typography>
                        <StyledImage
                          src={ArrowDown}
                          sx={{
                            width: { laptop: "20px", mobile: "10px" },
                            height: { laptop: "10px", mobile: "6px" },
                            transform:
                              showSubUsers?.id === item?.userId &&
                              selectedId?.type === "all_bet" &&
                              showBets
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        if (showSessions) {
                          setShowSessions((prev) => !prev);
                        } else {
                          if (showBets) {
                            setShowBets(false);
                          }
                          if (showSessionBets) {
                            setShowSessionBets(false);
                          }
                          setShowSessions((prev) => !prev);
                          getBetReport({
                            eventType: item?.eventType,
                            match_id: matchId,
                            userId: item?.userId,
                            type: "session_bet",
                            betId: "",
                            sessionBet: false,
                          });
                        }
                        // }
                      }}
                      sx={{
                        background:
                          childUserReport?.sessionProfitLoss > 0
                            ? "#27AC1E"
                            : "#E32A2A",
                        paddingX: "2px",
                        width: { mobile: "25%", laptop: "30%" },
                        height: "100%",
                        marginLeft: 0.1,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { laptop: "12px", mobile: "8px" },
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          Session Profit/Loss
                        </Typography>
                        <StyledImage
                          src={
                            childUserReport?.sessionProfitLoss > 0
                              ? ARROWUP
                              : ARROWDOWN
                          }
                          sx={{
                            width: { laptop: "25px", mobile: "15px" },
                            height: { laptop: "12px", mobile: "8px" },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { mobile: "10px", laptop: "14px" },
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          {childUserReport?.rateProfitLoss ? (
                            Number(childUserReport?.sessionProfitLoss) >= 0 ? (
                              <>
                                <span style={{ visibility: "hidden" }}>-</span>
                                {Number(
                                  childUserReport?.sessionProfitLoss
                                ).toFixed(2)}
                              </>
                            ) : (
                              Number(
                                childUserReport?.sessionProfitLoss
                              ).toFixed(2)
                            )
                          ) : (
                            0.0
                          )}
                        </Typography>
                        <StyledImage
                          src={ArrowDown}
                          sx={{
                            width: { laptop: "20px", mobile: "10px" },
                            height: { laptop: "10px", mobile: "6px" },
                            transform:
                              showSubUsers?.id === item?.userId &&
                              selectedId?.type === "session_bet" &&
                              showSessions
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* {selectedId?.id === item?.matchId && ( */}
                  <>
                    {showBets && (
                      <>
                        <Box
                          sx={{
                            width: { mobile: "100%", laptop: "100%" },
                            marginTop: { mobile: ".25vh" },
                            // marginLeft: { laptop: "4%" },
                            display: "flex",
                            flexDirection: { laptop: "row", mobile: "column" },
                          }}
                        >
                          <AllRateSeperate
                            betHistory={false}
                            count={bet1Data?.length}
                            allBetsData={bet1Data}
                            profit
                          />
                        </Box>
                        <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>
                      </>
                    )}
                    {showSessions && (
                      <Box
                        sx={{
                          width: { mobile: "100%", laptop: "100%" },
                          marginTop: { mobile: ".25vh" },
                          // marginLeft: { laptop: "4%" },
                          display: "flex",
                          flexDirection: { laptop: "row", mobile: "column" },
                        }}
                      >
                        <Box
                          Box
                          sx={{ width: "100%", display: "flex", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: {
                                mobile: "100%",
                                laptop: "50%",
                                tablet: "100%",
                              },
                              maxHeight: "51vh",
                              overflow: "hidden",
                              overflowY: "auto",
                              marginY: { mobile: ".2vh", laptop: "1vh" },
                              padding: 0.2,
                            }}
                          >
                            {sessionBets?.length > 0 &&
                              sessionBets?.map((item1, index) => {
                                return (
                                  <SessionComponentMatches
                                    key={index}
                                    item={item1}
                                    index={index + 1}
                                    userId={item?.userId}
                                    showSessionBets={showSessionBets}
                                    setShowSessionBets={setShowSessionBets}
                                    getBetReport={getBetReport}
                                    selectedId={selectedId}
                                    sessionBetData={sessionBetData}
                                  />
                                );
                              })}
                          </Box>
                          {selectedId?.betId !== "" &&
                            !matchesMobile &&
                            showSessionBets && (
                              <Box
                                sx={{
                                  width: {
                                    mobile: "100%",
                                    laptop: "49%",
                                    tablet: "100%",
                                  },
                                }}
                              >
                                <SessionBetSeperate
                                  betHistory={false}
                                  allBetsData={sessionBetData}
                                  profit
                                  isArrow={true}
                                />
                              </Box>
                            )}
                        </Box>
                      </Box>
                    )}
                  </>
                  {/* )} */}
                </Box>
              </Box>
            </>
          </Box>
        </Box>
      </ModalMUI>
      {showSubUsers?.value && (
        <>
          <Box
            sx={{
              width: { mobile: "100%", laptop: "99%" },
              marginTop: { mobile: ".25vh" },
              marginLeft: { laptop: "1%" },
              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
            }}
          >
            <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                  // maxHeight: "51vh",
                  overflow: "hidden",
                  // overflowY: "auto",
                  marginY: { mobile: ".2vh", laptop: "1vh" },
                  padding: 0.2,
                }}
              >
                <ChildUserList
                  id={showSubUsers?.id}
                  show={showSubUsers?.value}
                  setShow={showSubUsers}
                  matchId={matchId}
                  bet1Data={bet1Data}
                  role={showSubUsers?.role}
                  getBetReport={getBetReport}
                  sessionBetData={sessionBetData}
                  sessionBets={sessionBets}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}

      {showSessionResultList && item?.role === "user" && (
        <Box
          sx={{
            width: { mobile: "100%", laptop: "99%" },
            marginTop: { mobile: ".25vh" },
            marginLeft: { laptop: "1%" },
            display: "flex",
            flexDirection: { laptop: "row", mobile: "column" },
          }}
        >
          <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <Box
              sx={{
                width: { mobile: "50%", laptop: "50%", tablet: "50%" },
                maxHeight: "51vh",
                overflow: "hidden",
                // overflowY: "auto",
                marginY: { mobile: ".2vh", laptop: "1vh" },
                padding: 0.2,
              }}
            >
              <AllRateSeperate
                betHistory={false}
                allBetsData={betData}
                profit
                isArrow={true}
              />
            </Box>
            <Box
              sx={{
                width: { mobile: "50%", laptop: "50%", tablet: "50%" },
                maxHeight: "51vh",
                overflow: "hidden",
                // overflowY: "auto",
                marginY: { mobile: ".2vh", laptop: "1vh" },
                padding: 0.2,
              }}
            >
              <SessionBetSeperate
                betHistory={false}
                allBetsData={sessionData}
                profit
                isArrow={true}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(AllUserListSeparate);
