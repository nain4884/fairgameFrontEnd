import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";
import {
  useState,
  useEffect,
  useContext,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import React from "react";
import StyledImage from "./StyledImage";
import { LiveOff } from "../expert/assets";
import SessionResultModal from "./SessionResultModal";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { SocketContext } from "../context/socketContext";
import { setRole } from "../newStore";
import { Lock, BallStart } from "../assets";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionResults,
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../newStore/reducers/matchDetails";
import {
  setSessionAllBet,
  setSessionBetId,
  setAllEventSession,
  setSessionProfitLoss,
  setSelectedSession,
  setSessionResultRefresh,
} from "../newStore/reducers/expertMatchDetails";
import { removeCurrentUser } from "../newStore/reducers/currentUser";
import { logout } from "../newStore/reducers/auth";
import { GlobalStore } from "../context/globalStore";
import { useNavigate } from "react-router-dom";
import { removeSocket } from "./helper/removeSocket";

const IndiaPakLive = React.forwardRef(
  (
    {
      createSession,
      match,
      sessionEvent,
      proLoss1,
      setCheckBetId,
      childFunction,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const { setGlobalStore } = useContext(GlobalStore);
    const childRef = useRef(null);
    const { socket } = useContext(SocketContext);
    const { axios } = setRole();
    const dispatch = useDispatch();
    const {
      sessionAllBet,
      sessionBetId,
      allEventSession,
      currentOdd,
      sessionProfitLoss,
      selectedSession,
      sessionResultRefresh,
      declaredMatchDetail,
    } = useSelector((state) => state?.expertMatchDetails);

    const [currentOdds, setCurrentOdds] = useState(null);
    const stateDetail = {
      match_id: match?.id,
      matchType: match?.gameType,
      sessionBet: true,
      betStatus: 1,
      bet_condition: "",
      no_rate: "",
      yes_rate: "",
      y_rate_percent: "",
      n_rate_percent: "",
      l_no_rate: "",
      l_yes_rate: "",
      ly_rate_percent: "",
      ln_rate_percent: "",
      suspended: "ACTIVE",
    };
    const rates = [
      { name: "90-110", value: "90-110" },
      { name: "95-110", value: "95-110" },
      { name: "95-115", value: "95-115" },
      { name: "85-115", value: "85-115" },
      { name: "75-125", value: "75-125" },
      { name: "80-120", value: "80-120" },
      { name: "80-130", value: "80-130" },
      { name: "90-140", value: "90-140" },
      { name: "85-100", value: "85-100" },
      { name: "80-100", value: "80-100" },
      { name: "70-100", value: "70-100" },
      { name: "60-90", value: "60-90" },
      { name: "50-80", value: "50-80" },
      { name: "40-70", value: "40-70" },
      { name: "30-60", value: "30-60" },
      { name: "25-50", value: "25-50" },
      { name: "100-115", value: "100-115" },
      { name: "100-120", value: "100-120" },
      { name: "100-130", value: "100-130" },
      { name: "100-150", value: "100-150" },
      { name: "130-200", value: "130-200" },
      { name: "150-250", value: "150-250" },
      { name: "200-350", value: "200-350" },
      { name: "250-400", value: "250-400" },
    ];

    const [Detail, setDetail] = useState(stateDetail);
    const [incGap, setIncGap] = useState(1);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [betId, setBetId] = useState("");
    const [lock, setLock] = useState({
      isNo: true,
      isYes: true,
      isNoPercent: true,
      isYesPercent: true,
    });
    const [isBall, setIsBall] = useState(false);
    const [isCreateSession, setIsCreateSession] = useState(createSession);
    const [isPercent, setIsPercent] = useState("");
    const [live, setLive] = useState(true);
    const [proLoss, setProLoss] = useState(proLoss1);
    const [isDisable, setIsDisable] = useState(false);

    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      childFunction(item) {
        getManuallBookMaker(item?.bet_id?.id);
        setIsDisable(true);
      },
    }));

    useEffect(() => {
      if (sessionProfitLoss || [0, null]?.includes(sessionProfitLoss)) {
        // getSessionResult(match?.id);
        setProLoss(sessionProfitLoss);
      }
      // if ([0, null]?.includes(sessionProfitLoss)) {
      //   getSessionResult(match?.id);
      // }
      if (currentOdd) {
        setCurrentOdds(currentOdd);
      }
      if (
        selectedSession?.betStatus === 2 &&
        sessionBetId === selectedSession?.id
      ) {
        setIsDisable(true);
      }
    }, [
      sessionProfitLoss,
      sessionBetId,
      currentOdd,
      match?.id,
      selectedSession,
    ]);

    useEffect(() => {
      if (
        declaredMatchDetail?.match_id === selectedSession?.match_id &&
        declaredMatchDetail?.sessionBet === false
      ) {
        navigate("/expert/match");
      }
    }, [declaredMatchDetail]);

    // useEffect(() => {
    //   if (socket && socket.connected) {
    //     socket.onevent = async (packet) => {
    //       if (packet.data[0] === "session_bet") {
    //         const data = packet.data[1];
    //         try {
    //           setCurrentOdds({
    //             bet_id: data?.betPlaceData?.bet_id,
    //             odds: data?.betPlaceData?.odds,
    //             match_id: data?.betPlaceData?.match_id,
    //           });
    //           if (betId === data?.betPlaceData?.bet_id) {
    //             let profitLoss = data?.profitLoss;
    //             setProLoss(profitLoss);
    //             const body = {
    //               id: data?.betPlaceData?.id,
    //               isActive: true,
    //               createAt: data?.betPlaceData?.createAt,
    //               updateAt: data?.betPlaceData?.createdAt,
    //               createdBy: null,
    //               deletedAt: null,
    //               user: { userName: data?.betPlaceData?.userName },
    //               user_id: null,
    //               match_id: data?.betPlaceData?.match_id,
    //               bet_id: data?.betPlaceData?.bet_id,
    //               result: "pending",
    //               team_bet: data?.betPlaceData?.team_bet,
    //               odds: data?.betPlaceData?.odds,
    //               win_amount: null,
    //               loss_amount: null,
    //               bet_type: data?.betPlaceData?.bet_type,
    //               country: null,
    //               deleted_reason: data?.betPlaceData?.deleted_reason || null,
    //               ip_address: null,
    //               rate: data?.betPlaceData?.rate,
    //               marketType: data?.betPlaceData?.marketType,
    //               myStack: data?.betPlaceData?.myStack,
    //               amount:
    //                 data?.betPlaceData?.stack || data?.betPlaceData?.stake,
    //             };
    //             if (sessionAllBet.length === 0) {
    //               const updatedData = [body];
    //               dispatch(setSessionAllBet(updatedData));
    //             } else {
    //               const updatedData = [body, ...sessionAllBet];
    //               dispatch(setSessionAllBet(updatedData));
    //             }
    //           }
    //         } catch (err) {
    //           console.log(err?.message);
    //         }
    //       }
    //       if (packet.data[0] === "newBetAdded") {
    //         const value = packet.data[1];
    //         try {
    //           const updatedAllEventSession = allEventSession.map(
    //             (currentMatch) => {
    //               if (currentMatch.id === value?.match_id) {
    //                 const betObj = {
    //                   id: value.id,
    //                   bet_condition: value.bet_condition,
    //                 };
    //                 const newBettings = [...currentMatch.bettings, betObj];
    //                 return {
    //                   ...currentMatch,
    //                   bettings: newBettings,
    //                 };
    //               }
    //               return currentMatch;
    //             }
    //           );
    //           dispatch(setAllEventSession(updatedAllEventSession));
    //         } catch (err) {
    //           console.log(err?.message);
    //         }
    //       }
    //       if (packet.data[0] === "resultDeclareForBet") {
    //         const value = packet.data[1];

    //         try {
    //           const updatedAllEventSession = allEventSession.map(
    //             (currentMatch) => {
    //               if (currentMatch.id === value?.match_id) {
    //                 const filteredBettings = currentMatch.bettings.filter(
    //                   (bet) => bet.id !== value?.betId
    //                 );
    //                 getSessionResult(currentMatch.id);
    //                 return {
    //                   ...currentMatch,
    //                   bettings: filteredBettings,
    //                 };
    //               }
    //               return currentMatch;
    //             }
    //           );

    //           dispatch(setAllEventSession(updatedAllEventSession));
    //           setBetId(value?.betId);
    //           setCheckBetId(true);
    //           setIsCreateSession(true);
    //           dispatch(setSessionBetId(value?.betId));
    //           setVisible(false);
    //           setIsDisable(true);
    //         } catch (err) {
    //           console.log(err?.message);
    //         }
    //       }
    //       if (packet.data[0] === "sessionDeleteBet") {
    //         const value = packet.data[1];
    //         try {
    //           const updatedAllBet = sessionAllBet.map((currentMatch) => {
    //             if (currentMatch.match_id === value?.matchId) {
    //               if (value?.betPlaceData.includes(currentMatch.id)) {
    //                 return {
    //                   ...currentMatch,
    //                   deleted_reason: value?.deleted_reason,
    //                 };
    //               }
    //             }
    //             return currentMatch;
    //           });

    //           dispatch(setSessionAllBet(updatedAllBet));
    //           let profitLoss = value?.profitLoss;
    //           setProLoss(profitLoss);
    //         } catch (err) {
    //           console.log(err?.message);
    //         }
    //       }
    //       if (packet.data[0] === "updateSessionRate_user") {
    //         // match_id
    //         const value = packet.data[1];
    //         if (match?.id == value?.match_id && betId == value?.betId) {
    //           if (value.suspended == "suspended") {
    //             setLock({
    //               ...lock,
    //               isNo: true,
    //               isYes: true,
    //               isNoPercent: true,
    //               isYesPercent: true,
    //             });
    //           } else {
    //             let [firstValue, secondValue] = value.rate_percent
    //               ? value.rate_percent.split("-")
    //               : "";
    //             if (value.suspended != "Ball Started") {
    //               setDetail((prev) => ({
    //                 ...prev,
    //                 no_rate: value.no_rate,
    //                 yes_rate: value.yes_rate,
    //                 n_rate_percent: firstValue,
    //                 y_rate_percent: secondValue,
    //               }));
    //               setLock({
    //                 ...lock,
    //                 isNo: false,
    //                 isYes: false,
    //                 isNoPercent: false,
    //                 isYesPercent: false,
    //               });
    //             }
    //           }
    //         }
    //       }
    //     };
    //   }
    // }, [socket, betId, sessionAllBet, allEventSession]);

    // console.log(Detail, "details");
    useEffect(() => {
      if (sessionEvent?.id || sessionBetId) {
        if (sessionBetId) {
          getManuallBookMaker(sessionBetId);
        } else {
          getManuallBookMaker(sessionEvent?.id);
        }
      } else {
        setDetail(stateDetail);
        setLock({
          isNo: true,
          isYes: true,
          isNoPercent: true,
          isYesPercent: true,
        });
      }
      setIsCreateSession(createSession);
    }, [sessionEvent?.id]);

    useEffect(() => {
      if (match?.id && sessionResultRefresh) {
        getSessionResult(match?.id);
      }
    }, [match?.id, sessionResultRefresh]);

    const getSessionResult = async (match_id) => {
      // setProLoss(null);
      dispatch(setSessionResults([]));
      let response = await axios.get(`/game-match/getResults/${match_id}`);
      dispatch(setSessionResultRefresh(false));
      dispatch(setSessionResults(response?.data?.data || []));
    };

    async function doSubmitSessionBet(rate_percent) {
      dispatch(setSessionAllBet([]));
      var payload = {};
      if (!isBall) {
        payload = { ...Detail, rate_percent };
      } else {
        payload = {
          match_id: Detail?.match_id,
          matchType: Detail?.matchType,
          sessionBet: true,
          betStatus: 1,
          bet_condition: Detail?.bet_condition,
          no_rate: Detail?.no_rate,
          yes_rate: Detail?.yes_rate,
          y_rate_percent: Detail?.y_rate_percent,
          n_rate_percent: Detail?.n_rate_percent,
          suspended: "Ball Started",
        };
      }
      // alert(JSON.stringify(payload))
      try {
        let response = await axios.post(`/betting/addBetting`, payload);
        dispatch(setSelectedSession(response?.data?.data));
        setBetId(response?.data?.data?.id);
        setCheckBetId(true);
        setIsCreateSession(false);
        dispatch(setSessionBetId(response?.data?.data?.id));
        setLock({
          isNo: false,
          isYes: false,
          isNoPercent: false,
          isYesPercent: false,
        });
      } catch (e) {
        toast.error(e?.response?.data?.message);
        // console.log(e.response.data.message);
      }
    }

    async function getManuallBookMaker(id) {
      try {
        dispatch(setSelectedSession(null));
        let response = await axios.get(`/betting/getById/${id}`);
        let data = response?.data?.data[0];

        let [firstValue, secondValue] = data.rate_percent
          ? data.rate_percent.split("-")
          : "";

        dispatch(setSelectedSession(data));
        if (data?.betStatus === 2) {
          setIsDisable(true);
        } else {
          setIsDisable(false);
        }

        setDetail({
          ...Detail,
          no_rate: data.no_rate,
          yes_rate: data.yes_rate,
          n_rate_percent: firstValue,
          y_rate_percent: secondValue,
          bet_condition: data.bet_condition,
          l_no_rate: data.no_rate,
          l_yes_rate: data.yes_rate,
          ln_rate_percent: firstValue,
          ly_rate_percent: secondValue,
        });
        setBetId(data.id);
        setCheckBetId(true);
        getAllBetsData(data.id);
        setProLoss(data?.profitLoss);
        dispatch(setSessionProfitLoss(data?.profitLoss));
        if (data.suspended == "ACTIVE") {
          setLock({
            isNo: false,
            isYes: false,
            isNoPercent: false,
            isYesPercent: false,
          });
        } else {
          setLock({
            isNo: true,
            isYes: true,
            isNoPercent: true,
            isYesPercent: true,
          });
        }
      } catch (e) {
        console.log(e.response.data.message);
      }
    }

    async function getAllBetsData(id) {
      let payload = {
        match_id: match?.id,
        bet_id: id,
      };
      try {
        let { data } = await axios.post(`/betting/getPlacedBets`, payload);
        dispatch(setSessionAllBet(data?.data?.data || []));
      } catch (e) {
        console.log(e);
      }
    }
    const handleLive = async (status) => {
      try {
        if (status === 1) {
          setLive(true);
        } else {
          setLive(false);
        }
        const body = {
          match_id: match?.id,
          matchType: match?.gameType,
          id: betId ? betId : "",
          betStatus: status,
          sessionBet: true,
          bet_condition: Detail?.bet_condition,
        };
        const { data } = await axios.post("betting/addBetting", body);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err?.message);
      }
    };

    const handleLiveChange = (y_rate_percent, n_rate_percent) => {
      let rate_percent = n_rate_percent + "-" + y_rate_percent;
      let data = {
        match_id: match?.id,
        betId: betId,
        betStatus: 1,
        no_rate: Detail.no_rate,
        yes_rate: Detail.yes_rate,
        suspended: "ACTIVE",
        rate_percent: rate_percent,
      };

      setLock({
        ...lock,
        isNo: false,
        isYes: false,
        isNoPercent: false,
        isYesPercent: false,
      });
      setIsBall(false);
      socket.emit("updateSessionRate", data);
    };
    return (
      <Box
        sx={{
          flex: 1,
          background: "#F8C851",
          borderRadius: "5px",
          minHeight: "42vh",
          py: "25px",
          pt: "5px",
          px: "20px",
        }}
      >
        <Typography
          sx={{ color: "#0B4F26", fontSize: "20px", fontWeight: "600" }}
        >
          {match?.title ? match.title : "India vs Pakistan"}
        </Typography>
        <Box sx={{ display: "flex", marginTop: "6px" }}>
          <Box
            sx={{
              flex: 1,
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AddSession
              createSession={createSession}
              betId={betId}
              Detail={{ Detail, setDetail }}
              incGap={{ incGap, setIncGap }}
              socket={socket}
              sessionEvent={sessionEvent}
              lock={lock}
              inputRef={inputRef}
              setLock={setLock}
              isBall={{ isBall, setIsBall }}
              isCreateSession={isCreateSession}
              sessionBetId={sessionBetId}
              match={match}
              isPercent={{ isPercent, setIsPercent }}
              live={live}
              isDisable={isDisable}
            />
            <Box sx={{ mt: 2, border: "1px solid black", p: 1 }}>
              <Grid
                container
                spacing={1}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%" }}
              >
                {rates?.map((item) => (
                  <Grid item xs={2} sm={2}>
                    <Box
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(Detail);
                        if (
                          (Detail?.l_no_rate != NaN ||
                            Detail?.l_yes_rate != NaN) &&
                          Detail?.l_no_rate!=null &&
                          Detail?.l_yes_rate!=null
                        ) {
                          const [y_rate_percent, n_rate_percent] =
                            item?.value?.split("-");
                          setDetail({
                            ...Detail,

                            ly_rate_percent: y_rate_percent,
                            ln_rate_percent: n_rate_percent,
                            y_rate_percent: y_rate_percent,
                            n_rate_percent: n_rate_percent,
                          });
                          handleLiveChange(y_rate_percent, n_rate_percent);
                          if (inputRef.current) {
                            console.log("yes");
                            inputRef.current.focus();
                          }
                        }
                      }}
                      sx={{
                        width: "80px",
                        position: "relative",
                        display: "flex",
                        background:
                          Detail?.l_no_rate == NaN ||
                          Detail?.l_yes_rate == NaN ||
                          Detail?.l_no_rate==null ||
                          !Detail?.l_yes_rate==null
                            ? "#696969"
                            : "#0B4F26",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "35px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "14px",
              }}
            >
              {!isCreateSession || sessionBetId ? (
                <>
                  {isDisable && (
                    <Box
                      onClick={(e) => {
                        setVisible1(true);
                        e.stopPropagation();
                      }}
                      sx={{
                        position: "relative",
                        width: "30%",
                        display: "flex",
                        background: "#FF4D4D",
                        maxWidth: "120px",
                        marginLeft: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "35px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        Un Declare
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 999,
                          top: "40px",
                          left: 0,
                        }}
                      >
                        {visible1 && (
                          <SessionResultModal
                            newData={{
                              id: betId,
                              match_id: match?.id,
                              betStatus: 2,
                            }}
                            undeclare={true}
                            onClick={() => {
                              setVisible1(false);
                              getSessionResult(match?.id);
                            }}
                            onClickCancel={() => {
                              setVisible1(false);
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                  {!isDisable && (
                    <Box
                      onClick={(e) => {
                        setVisible(true);
                        e.stopPropagation();
                      }}
                      sx={{
                        width: "30%",
                        position: "relative",
                        display: "flex",
                        background: "#0B4F26",
                        marginLeft: "5px",
                        maxWidth: "120px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "35px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        Declare
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 999,
                          top: "40px",
                          left: 0,
                        }}
                      >
                        {visible && (
                          <SessionResultModal
                            newData={{
                              id: betId,
                              match_id: match?.id,
                              betStatus: 0,
                            }}
                            onClick={() => {
                              setVisible(false);
                              setIsDisable(true);
                              // getSessionResult(match?.id);
                            }}
                            onClickCancel={() => {
                              setVisible(false);
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                  {!isDisable && (
                    <Box
                      onClick={(e) => {
                        setVisible2(true);
                        e.stopPropagation();
                      }}
                      sx={{
                        width: "30%",
                        position: "relative",
                        display: "flex",
                        background: "#303030",
                        marginLeft: "5px",
                        justifyContent: "center",
                        maxWidth: "120px",
                        alignItems: "center",
                        height: "35px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        No Result
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 999,
                          top: "40px",
                          left: 0,
                        }}
                      >
                        {visible2 && (
                          <SessionResultModal
                            newData={{
                              id: betId,
                              match_id: match?.id,
                              betStatus: 3,
                              isNoResult: true,
                            }}
                            onClick={() => {
                              setIsDisable(true);
                              setVisible2(false);
                              getSessionResult(match?.id);
                            }}
                            onClickCancel={() => {
                              setVisible2(false);
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  onClick={(e) => {
                    doSubmitSessionBet(
                      Detail.n_rate_percent + "-" + Detail.y_rate_percent
                    );
                  }}
                  sx={{
                    width: "30%",
                    position: "relative",
                    display: "flex",
                    background: "#0B4F26",
                    marginLeft: "5px",
                    maxWidth: "120px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
                  >
                    Submit
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 999,
                      top: "40px",
                      left: 0,
                    }}
                  >
                    {visible && (
                      <SessionResultModal
                        onClick={() => {
                          setVisible(false);
                        }}
                        onClickCancel={() => {
                          setVisible(false);
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ marginLeft: "15px", width: "30%" }}>
            {!isCreateSession || sessionBetId ? (
              <RunsAmountBox
                betId={betId}
                currentOdds={currentOdds?.bet_id === betId ? currentOdds : null}
                proLoss={proLoss}
              />
            ) : (
              <Box sx={{ width: "162px", minHeight: "182px" }} />
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);
export default IndiaPakLive;

const AddSession = ({
  createSession,
  betId,
  Detail,
  sessionEvent,
  inputRef,
  incGap,
  socket,
  lock,
  setLock,
  isBall,
  isCreateSession,
  sessionBetId,
  match,
  isPercent,
  live,
  isDisable,
}) => {
  const handleKeysMatchEvents = (key, event) => {
    event.preventDefault();
    let targetValue = parseFloat(event.target.value);
    event.target.value = targetValue;
    if (key == "right") {
      incGap.setIncGap(1);
      isPercent.setIsPercent("");
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      let value =
        Detail?.Detail?.yes_rate == Detail?.Detail?.no_rate
          ? targetValue
          : targetValue + 1;
      let yesValue = Detail?.Detail?.yes_rate
        ? Detail?.Detail?.yes_rate
        : value;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: yesValue + 1,
        y_rate_percent: 100,
        n_rate_percent: 100,
        l_no_rate: value,
        l_yes_rate: yesValue + 1,
        ly_rate_percent: 100,
        ln_rate_percent: 100,
      });
    } else if (key == "left") {
      isPercent.setIsPercent("");
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      if (targetValue > 0) {
        let value = targetValue ? targetValue - 1 : 1;
        let yesValue =
          Detail?.Detail?.yes_rate == Detail?.Detail?.no_rate
            ? Detail?.Detail?.yes_rate + 1
            : Detail?.Detail?.yes_rate;
        Detail.setDetail({
          ...Detail.Detail,
          no_rate: value,
          yes_rate: yesValue - 1,
          y_rate_percent: 100,
          n_rate_percent: 100,
          l_no_rate: value,
          l_yes_rate: yesValue - 1,
          ly_rate_percent: 100,
          ln_rate_percent: 100,
        });
      }
    } else if (key == "w" || key == "up") {
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      if (targetValue > 0) {
        if (isPercent.isPercent == "percent") {
          Detail.setDetail({
            ...Detail.Detail,
            no_rate: Detail?.Detail?.no_rate,
            yes_rate: Detail?.Detail?.yes_rate,
            y_rate_percent: 100,
            y_rate_percent: Detail?.Detail?.y_rate_percent - incGap.incGap,
            n_rate_percent: Detail?.Detail?.n_rate_percent + incGap.incGap,
            l_no_rate: Detail?.Detail?.no_rate,
            l_yes_rate: Detail?.Detail?.yes_rate,
            ly_rate_percent: 100,
            ly_rate_percent: Detail?.Detail?.y_rate_percent - incGap.incGap,
            ln_rate_percent: Detail?.Detail?.n_rate_percent + incGap.incGap,
          });
        } else {
          let value = Detail?.Detail?.yes_rate
            ? Detail?.Detail?.yes_rate
            : Detail?.Detail?.no_rate;
          Detail.setDetail({
            ...Detail.Detail,
            yes_rate: value + incGap.incGap,
            l_yes_rate: value + incGap.incGap,
          });
        }
      }
    } else if (key == "z" || key == "down") {
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      if (targetValue > 0) {
        if (isPercent.isPercent == "percent") {
          Detail.setDetail({
            ...Detail.Detail,
            no_rate: Detail?.Detail?.no_rate,
            yes_rate: Detail?.Detail?.yes_rate,
            y_rate_percent: 100,
            y_rate_percent: Detail?.Detail?.y_rate_percent + incGap.incGap,
            n_rate_percent: Detail?.Detail?.n_rate_percent - incGap.incGap,
            l_no_rate: Detail?.Detail?.no_rate,
            l_yes_rate: Detail?.Detail?.yes_rate,
            ly_rate_percent: 100,
            ly_rate_percent: Detail?.Detail?.y_rate_percent + incGap.incGap,
            ln_rate_percent: Detail?.Detail?.n_rate_percent - incGap.incGap,
          });
        } else {
          if (
            Detail?.Detail?.yes_rate - incGap.incGap >
            Detail?.Detail?.no_rate
          ) {
            let value = Detail?.Detail?.yes_rate
              ? Detail?.Detail?.yes_rate
              : Detail?.Detail?.no_rate;
            Detail.setDetail({
              ...Detail.Detail,
              yes_rate: value - incGap.incGap,
              l_yes_rate: value - incGap.incGap,
            });
          }
        }
      }
    } else if (key == "shift") {
      isBall.setIsBall(true);
      if (!isCreateSession || sessionBetId) {
        socket.emit("updateSessionRate", {
          match_id: match?.id,
          betId: betId,
          suspended: "Ball Started",
        });
      }
    } else if (key == ",") {
      isPercent.setIsPercent("percent");
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      let value = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate - 1 : 0;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value,
        y_rate_percent: 90,
        n_rate_percent: 110,
        l_no_rate: value,
        l_yes_rate: value,
        ly_rate_percent: 90,
        ln_rate_percent: 110,
      });
      incGap.setIncGap(5);
    } else if (key == ".") {
      isPercent.setIsPercent("percent");
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      let value =
        Detail?.Detail?.no_rate === 0 || null
          ? 1
          : Detail?.Detail?.no_rate
          ? Detail?.Detail?.no_rate + 1
          : 0;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value,
        y_rate_percent: 90,
        n_rate_percent: 110,
        l_no_rate: value,
        l_yes_rate: value,
        ly_rate_percent: 90,
        ln_rate_percent: 110,
      });
      incGap.setIncGap(5);
    } else if (key == "esc") {
      isPercent.setIsPercent("percent");
      incGap.setIncGap(1);
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      let value = Detail?.Detail?.no_rate ? Detail?.Detail?.no_rate : 0;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value + 1,
        y_rate_percent: 100,
        n_rate_percent: 100,
        l_no_rate: value,
        l_yes_rate: value + 1,
        ly_rate_percent: 100,
        ln_rate_percent: 100,
      });
    } else if (key == "enter") {
      if (!isCreateSession || sessionBetId) {
        if (Detail?.Detail?.no_rate && Detail?.Detail?.yes_rate) {
          let rate_percent =
            Detail.Detail.n_rate_percent + "-" + Detail.Detail.y_rate_percent;
          let data = {
            match_id: match?.id,
            betId: betId,
            betStatus: 1,
            no_rate: Detail.Detail.no_rate,
            yes_rate: Detail.Detail.yes_rate,
            suspended: "ACTIVE",
            rate_percent: rate_percent,
          };
          setLock({
            ...lock,
            isNo: false,
            isYes: false,
            isNoPercent: false,
            isYesPercent: false,
          });
          isBall.setIsBall(false);
          socket.emit("updateSessionRate", data);
        }
      }
    } else if (key == "d") {
      incGap.setIncGap(1);
      isPercent.setIsPercent("");
      // handleSuspend();

      let value =
        Detail?.Detail?.yes_rate == Detail?.Detail?.no_rate
          ? targetValue
          : targetValue + 1;
      let yesValue = Detail?.Detail?.yes_rate
        ? Detail?.Detail?.yes_rate
        : value;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: yesValue + 1,
        y_rate_percent: 100,
        n_rate_percent: 100,
        l_no_rate: value,
        l_yes_rate: yesValue + 1,
        ly_rate_percent: 100,
        ln_rate_percent: 100,
      });

      // changing to live
      if (!isCreateSession || sessionBetId) {
        if (Detail?.Detail?.no_rate && Detail?.Detail?.yes_rate) {
          let rate_percent = 100 + "-" + 100;
          let data = {
            match_id: match?.id,
            betId: betId,
            betStatus: 1,
            no_rate: value,
            yes_rate: yesValue + 1,
            suspended: "ACTIVE",
            rate_percent: rate_percent,
          };
          setLock({
            ...lock,
            isNo: false,
            isYes: false,
            isNoPercent: false,
            isYesPercent: false,
          });
          isBall.setIsBall(false);
          socket.emit("updateSessionRate", data);
        }
      }
    } else if (key == "a") {
      isPercent.setIsPercent("");
      // handleSuspend();

      if (targetValue > 0) {
        let value = targetValue ? targetValue - 1 : 1;
        let yesValue =
          Detail?.Detail?.yes_rate == Detail?.Detail?.no_rate
            ? Detail?.Detail?.yes_rate + 1
            : Detail?.Detail?.yes_rate;
        Detail.setDetail({
          ...Detail.Detail,
          no_rate: value,
          yes_rate: yesValue - 1,
          y_rate_percent: 100,
          n_rate_percent: 100,
          l_no_rate: value,
          l_yes_rate: yesValue - 1,
          ly_rate_percent: 100,
          ln_rate_percent: 100,
        });

        // changing to live
        if (!isCreateSession || sessionBetId) {
          if (Detail?.Detail?.no_rate && Detail?.Detail?.yes_rate) {
            let rate_percent = 100 + "-" + 100;
            let data = {
              match_id: match?.id,
              betId: betId,
              betStatus: 1,
              no_rate: value,
              yes_rate: yesValue - 1,
              suspended: "ACTIVE",
              rate_percent: rate_percent,
            };
            setLock({
              ...lock,
              isNo: false,
              isYes: false,
              isNoPercent: false,
              isYesPercent: false,
            });
            isBall.setIsBall(false);
            socket.emit("updateSessionRate", data);
          }
        }
      }
    } else if (key == "q") {
      isPercent.setIsPercent("percent");

      let value = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate - 1 : 0;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value,
        y_rate_percent: 90,
        n_rate_percent: 110,
        l_no_rate: value,
        l_yes_rate: value,
        ly_rate_percent: 90,
        ln_rate_percent: 110,
      });
      incGap.setIncGap(5);

      if (!isCreateSession || sessionBetId) {
        if (Detail?.Detail?.no_rate && Detail?.Detail?.yes_rate) {
          let rate_percent = 110 + "-" + 90;
          let data = {
            match_id: match?.id,
            betId: betId,
            betStatus: 1,
            no_rate: value,
            yes_rate: value,
            suspended: "ACTIVE",
            rate_percent: rate_percent,
          };
          setLock({
            ...lock,
            isNo: false,
            isYes: false,
            isNoPercent: false,
            isYesPercent: false,
          });
          isBall.setIsBall(false);
          socket.emit("updateSessionRate", data);
        }
      }
    } else if (key == "e") {
      isPercent.setIsPercent("percent");

      let value =
        Detail?.Detail?.no_rate === 0 || null
          ? 1
          : Detail?.Detail?.no_rate
          ? Detail?.Detail?.no_rate + 1
          : 0;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value,
        y_rate_percent: 90,
        n_rate_percent: 110,
        l_no_rate: value,
        l_yes_rate: value,
        ly_rate_percent: 90,
        ln_rate_percent: 110,
      });
      incGap.setIncGap(5);

      if (!isCreateSession || sessionBetId) {
        if (Detail?.Detail?.no_rate && Detail?.Detail?.yes_rate) {
          let rate_percent = 110 + "-" + 90;
          let data = {
            match_id: match?.id,
            betId: betId,
            betStatus: 1,
            no_rate: value,
            yes_rate: value,
            suspended: "ACTIVE",
            rate_percent: rate_percent,
          };
          setLock({
            ...lock,
            isNo: false,
            isYes: false,
            isNoPercent: false,
            isYesPercent: false,
          });
          isBall.setIsBall(false);
          socket.emit("updateSessionRate", data);
        }
      }
    } else {
      if (Detail?.Detail?.yes_rate - incGap.incGap > Detail?.Detail?.no_rate) {
        let value = Detail?.Detail?.yes_rate
          ? Detail?.Detail?.yes_rate
          : Detail?.Detail?.no_rate;
        Detail.setDetail({
          ...Detail.Detail,
          yes_rate: value - incGap.incGap,
          l_yes_rate: value - incGap.incGap,
        });

        // live changes
        if (!isCreateSession || sessionBetId) {
          if (Detail?.Detail?.no_rate && Detail?.Detail?.yes_rate) {
            let rate_percent =
              Detail.Detail.n_rate_percent + "-" + Detail.Detail.y_rate_percent;
            let data = {
              match_id: match?.id,
              betId: betId,
              betStatus: 1,
              no_rate: Detail.Detail.no_rate,
              yes_rate: value - incGap.incGap,
              suspended: "ACTIVE",
              rate_percent: rate_percent,
            };
            setLock({
              ...lock,
              isNo: false,
              isYes: false,
              isNoPercent: false,
              isYesPercent: false,
            });
            isBall.setIsBall(false);
            socket.emit("updateSessionRate", data);
          }
        }
      }
    }
  };

  const handleChange = (event) => {
    setLock({
      ...lock,
      isNo: true,
      isYes: true,
      isNoPercent: true,
      isYesPercent: true,
    });
    handleSuspend();
    let target = event.target;
    let targetValue = parseFloat(event.target.value);
    let checkValue = parseFloat(event.target.value);
    Detail.setDetail({
      ...Detail.Detail,
      no_rate: targetValue,
      yes_rate: targetValue + 1,
      y_rate_percent: checkValue ? 100 : "",
      n_rate_percent: checkValue ? 100 : "",
      l_no_rate: targetValue,
      l_yes_rate: targetValue + 1,
      ly_rate_percent: checkValue ? 100 : "",
      ln_rate_percent: checkValue ? 100 : "",
    });
  };

  const handleSuspend = () => {
    if (!lock.isNo || !lock.isNo || !lock.isNoPercent || !lock.isYesPercent) {
      isBall.setIsBall(false);
      socket.emit("updateSessionRate", {
        match_id: match?.id,
        betId: betId,
        suspended: "suspended",
      });
    }
  };

  return (
    <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#319E5B", width: "70%", px: "5px" }}>
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
          >
            {isCreateSession ? "Add" : "Your"} Session
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#FF9292",
            width: "19.5%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
            No
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#00C0F9",
            width: "19.5%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
            Yes
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#FFFFFF", width: "40%" }}>
          <TextField
            onChange={(e) => {
              Detail.setDetail({
                ...Detail.Detail,
                bet_condition: e.target.value,
              });
            }}
            autoComplete="off"
            disabled={betId ? true : false}
            value={Detail.Detail.bet_condition}
            variant="standard"
            InputProps={{
              placeholder: "Your Bet Condition Here...",
              disableUnderline: true,
              style: {
                fontSize: "15px",
                marginLeft: "5px",
                height: "45px",
                fontWeight: "600",
                color: "black",
              },
            }}
          />
        </Box>
        <Box
          display={"flex"}
          sx={{ borderLeft: "2px solid white", width: "60%" }}
        >
          <Box sx={{ width: "40%" }}>
            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
              <Box
                sx={{
                  background: "#FFB5B5",
                  width: "50%",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <KeyboardEventHandler
                    handleKeys={[
                      "a",
                      "d",
                      "w",
                      "z",
                      "up",
                      "q",
                      "e",
                      "down",
                      "left",
                      "right",
                      "tab",
                      "shift",
                      "`",
                      ",",
                      ".",
                      "/",
                      "enter",
                      "return",
                      "esc",
                      "*",
                      "ctrl",
                      "plus",
                      "=",
                      "minus",
                    ]}
                    isDisabled={false}
                    onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                  >
                    <TextField
                      disabled={isDisable}
                      onChange={(e) => handleChange(e)}
                      type="Number"
                      autoComplete="off"
                      inputRef={inputRef}
                      value={Detail?.Detail?.l_no_rate}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: "14px",
                          marginLeft: "5px",
                          height: "45px",
                          fontWeight: "600",
                          color: "black",
                        },
                      }}
                    />
                  </KeyboardEventHandler>
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#A7DCFF",
                  width: "50%",
                  borderLeft: "2px solid white",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <TextField
                    type="Number"
                    autoComplete="off"
                    value={Detail?.Detail?.l_yes_rate}
                    variant="standard"
                    disabled={isDisable}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "14px",
                        marginLeft: "5px",
                        height: "45px",
                        fontWeight: "600",
                        color: "black",
                      },
                    }}
                  />
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
              <Box
                sx={{
                  background: "#FFB5B5",
                  width: "50%",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  {/* <KeyboardEventHandler
                    handleKeys={[
                      "a",
                      "d",
                      "w",
                      "z",
                      "q",
                      "e",
                      "up",
                      "down",
                      "left",
                      "right",
                      "tab",
                      "shift",
                      "`",
                      ",",
                      ".",
                      "/",
                      "enter",
                      "return",
                      "esc",
                      "*",
                      "ctrl",
                      "plus",
                      "=",
                      "minus",
                    ]}
                    isDisabled={false}
                    onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                  > */}
                    <TextField
                      type="Number"
                      disabled={isDisable}
                      value={
                        Detail?.Detail?.ln_rate_percent
                          ? Detail?.Detail?.ln_rate_percent
                          : ""
                      }
                      autoComplete="off"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: "14px",
                          marginLeft: "5px",
                          height: "45px",
                          fontWeight: "600",
                          color: "black",
                        },
                      }}
                    />
                  {/* </KeyboardEventHandler> */}
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#A7DCFF",
                  width: "50%",
                  borderLeft: "2px solid white",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <TextField
                    disabled={isDisable}
                    autoComplete="off"
                    type="Number"
                    value={
                      Detail.Detail.ly_rate_percent
                        ? Detail.Detail.ly_rate_percent
                        : ""
                    }
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "14px",
                        marginLeft: "5px",
                        height: "45px",
                        fontWeight: "600",
                        color: "black",
                      },
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "60%" }}>
            {!isBall?.isBall ? (
              <>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  <Box
                    sx={{
                      background: lock?.isNo ? "#FDF21A" : "#FFB5B5",
                      width: "50%",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isNo ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {Detail?.Detail?.no_rate ? Detail?.Detail?.no_rate : ""}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      background: lock?.isYes ? "#FDF21A" : "#A7DCFF",
                      width: "50%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isYes ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {Detail.Detail.yes_rate ? Detail.Detail.yes_rate : ""}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>
                </Box>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  <Box
                    sx={{
                      background: lock?.isNoPercent ? "#FDF21A" : "#FFB5B5",
                      width: "50%",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isNoPercent ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {Detail.Detail.n_rate_percent}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      background: lock?.isYesPercent ? "#FDF21A" : "#A7DCFF",
                      width: "50%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isYesPercent ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {Detail.Detail.y_rate_percent}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  borderTop: "2px solid white",
                  background: "#000",
                  width: "100%",
                  display: "flex",
                  height: "94px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={BallStart} style={{ width: "80%", height: "30%" }} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* comment */}
      {!live && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            opacity: 1,
            backdropFilter: " blur(1px)",
            "-webkit-backdrop-filter": "blur(1px)",
          }}
        >
          <StyledImage src={LiveOff} sx={{ height: "4vw", width: "4vw" }} />
        </Box>
      )}
    </Box>
  );
};

const RunsAmountBox = ({
  anchorEl,
  currentOdds,
  betId,
  open,
  handleClose,
  proLoss,
}) => {
  const theme = useTheme();

  const containerRef = useRef(null);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    const container = containerRef.current;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = element.getBoundingClientRect();
      const scrollY =
        targetRect.top -
        containerRect.top -
        containerRect.height / 2 +
        targetRect.height / 2;
      container.scrollTo({ top: scrollY, behavior: "smooth" });
    }

    // element.scrollIntoView({
    //   behavior: "smooth",
    //   block: "center",
    //   inline: "center",
    // });
    // }
  };

  useEffect(() => {
    if (currentOdds && currentOdds?.bet_id === betId) {
      setTimeout(() => {
        scrollToElement(`${betId}_${currentOdds?.odds}`);
      }, 500);
    }
  }, [currentOdds, betId]);

  return (
    <Box
      sx={{
        borderRadius: "5px",
        border: "1px solid #306A47",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box
        sx={{
          minHeight: "120px",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex", height: "30px", width: "100%" }}>
          <Box
            sx={{
              width: "35%",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}
            >
              Runs
            </Typography>
          </Box>
          <Box
            sx={{
              width: "65%",
              padding: "5px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}
            >
              Amount
            </Typography>
          </Box>
        </Box>
        <Box ref={containerRef} sx={{ maxHeight: "42vh", overflowY: "auto" }}>
          {proLoss?.betData?.length > 0
            ? proLoss?.betData?.map((v) => {
                const getColor = (value) => {
                  if (value >= 1) {
                    return "#10DC61";
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
                    id={`${betId}_${v?.odds}`}
                    key={v?.odds}
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "25px",
                      borderTop: "1px solid #306A47",
                    }}
                  >
                    <Box
                      sx={{
                        width: "35%",
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
                        width: "65%",
                        display: "flex",
                        borderLeft: `1px solid #306A47`,
                        background: getColor(v?.profit_loss),
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: "7px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "white",
                          width: "40px",
                        }}
                      >
                        {Number(v?.profit_loss) >= 0 ? (
                          <>
                            <span style={{ visibility: "hidden" }}>-</span>
                            {v?.profit_loss}
                          </>
                        ) : (
                          v?.profit_loss
                        )}
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
            : null}
        </Box>
      </Box>
    </Box>
  );
};
