import { Box, TextField, Typography, useTheme } from "@mui/material";
import { borderTop } from "@mui/system";
import { useState, useEffect, useContext, useRef, useImperativeHandle, forwardRef } from "react";
import React, { } from 'react';
import StyledImage from "./StyledImage";
import { LiveOff, LiveOn } from "../expert/assets";
import SessionResultModal from "./SessionResultModal";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { SocketContext } from "../context/socketContext";
import { setRole } from "../newStore";
import { Lock, BallStart } from "../assets";
// import { GlobalStore } from "../context/globalStore";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSessionResults } from "../newStore/reducers/matchDetails";
import {
  setSessionAllBet,
  setSessionBetId,
  setAllEventSession,
} from "../newStore/reducers/expertMatchDetails";

// const IndiaPakLive = React.forwardRef(({ match }, ref) => {
//     alert(match?.id)
//     const childRef = useRef(null);

//     useImperativeHandle(ref, () => ({
//         childFunction() {
//             alert("Child function called from parent component");
//             // Perform any desired actions in the child component
//         }
//     }));

//     // Rest of the child component code

//     return (
//         <Box
//             sx={{
//                 flex: 1,
//                 background: "#F8C851",
//                 borderRadius: "5px",
//                 minHeight: "300px",
//                 py: "30px",
//                 px: "20px",
//             }}
//         >
//             {/* Child component JSX */}
//         </Box>
//     );
// });
// export default IndiaPakLive;
const IndiaPakLive = React.forwardRef(({
    createSession,
    match,
    showDialogModal,
    sessionEvent,
    betData,
    handleBetData,
    proLoss1,
    setCheckBetId,
    childFunction, }, ref) => {
    const childRef = useRef(null);
    const { socket } = useContext(SocketContext);
    const { axios } = setRole();
    const dispatch = useDispatch();
    const { sessionAllBetRates } = useSelector((state) => state?.matchDetails);
    const { sessionAllBet, sessionBetId, allEventSession } = useSelector(
        (state) => state?.expertMatchDetails
    );

  const [currentOdds, setCurrentOdds] = useState(null);
  // const { globalStore, setGlobalStore } = useContext(GlobalStore);
  // const { sessionAllBetRates } = useSelector((state) => state?.matchDetails);
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
    suspended: "ACTIVE",
  };
  const [Detail, setDetail] = useState(stateDetail);
  const [incGap, setIncGap] = useState(1);
  const [visible, setVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
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
  // alert(JSON.stringify(proLoss1))
  const [proLoss, setProLoss] = useState(proLoss1);

  // const [betData, setBetData] = useState(sessionAllBetRates);

  // alert(globalStore.isSession)
  // let temp = null;
  // if (socket && socket.connected) {
  //     console.log("socket connected", socket)
  //     socket.onevent = () => async (done) => {
  //         console.log("socket connected 11", done)
  //         temp = done.data
  //     }
  // }

    // useEffect(() => {
    //     alert(sessionBetId)
    // }, [sessionBetId]);

    useImperativeHandle(ref, () => ({
        childFunction(item) {
            // alert(JSON.stringify(item));
            getManuallBookMaker(item?.bet_id?.id);
            // alert("Child function called from parent component");
            // Perform any desired actions in the child component
        }
    }));

    // console.log('Session', temp)
    useEffect(() => {
        if (socket && socket.connected) {
            socket.onevent = async (packet) => {
                if (packet.data[0] === "session_bet") {
                    const data = packet.data[1];
                    try {
                        // alert(JSON.stringify(data?.profitLoss))
                        // alert("vvvvv: " + data?.betPlaceData?.bet_id)
                        setCurrentOdds({
                            bet_id: data?.betPlaceData?.bet_id,
                            odds: data?.betPlaceData?.odds,
                            match_id: data?.betPlaceData?.match_id,
                        });
                        if (betId === data?.betPlaceData?.bet_id) {
                            let profitLoss = data?.profitLoss;
                            setProLoss(profitLoss);
                            const body = {
                                id: data?.betPlaceData?.id,
                                isActive: true,
                                createAt: data?.betPlaceData?.createAt,
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
                                deleted_reason: data?.betPlaceData?.deleted_reason || null,
                                ip_address: null,
                                rate: data?.betPlaceData?.rate,
                                marketType: data?.betPlaceData?.marketType,
                                myStack: data?.betPlaceData?.myStack,
                                amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                            };
                            // const updatedData = [body, ...sessionAllBet]; // Combine new object with existing state data
                            // dispatch(setSessionAllBet(updatedData));
                            if (sessionAllBet.length === 0) {
                                const updatedData = [body];
                                // handleBetData(updatedData);
                                dispatch(setSessionAllBet(updatedData));
                            } else {
                                const updatedData = [body, ...sessionAllBet];
                                // handleBetData(updatedData);
                                dispatch(setSessionAllBet(updatedData));
                            }
                        }
                    } catch (err) {
                        console.log(err?.message);
                    }
                }
                if (packet.data[0] === "newBetAdded") {
                    const value = packet.data[1];
                    try {
                        const updatedAllEventSession = allEventSession.map(
                            (currentMatch) => {
                                if (currentMatch.id === value?.match_id) {
                                    const betObj = {
                                        id: value.id,
                                        bet_condition: value.bet_condition,
                                    };
                                    const newBettings = [...currentMatch.bettings, betObj];
                                    return {
                                        ...currentMatch,
                                        bettings: newBettings,
                                    };
                                }
                                return currentMatch;
                            }
                        );
                        dispatch(setAllEventSession(updatedAllEventSession));
                    } catch (err) {
                        console.log(err?.message);
                    }
                }
                if (packet.data[0] === "resultDeclareForBet") {
                  const value = packet.data[1];
        
                  try {
                    const updatedAllEventSession = allEventSession.map(
                      (currentMatch) => {
                        if (currentMatch.id === value?.match_id) {
                          const filteredBettings = currentMatch.bettings.filter(
                            (bet) => bet.id !== value?.betId
                          );
                          return {
                            ...currentMatch,
                            bettings: filteredBettings,
                          };
                        }
                        return currentMatch;
                      }
                    );
        
                    dispatch(setAllEventSession(updatedAllEventSession));
                  } catch (err) {
                    console.log(err?.message);
                  }
                }
            };
        }
    }, [socket, betId, sessionAllBet]);

    useEffect(() => {
        // alert(JSON.stringify(sessionEvent?.id))
        if (sessionEvent?.id || sessionBetId) {
            // alert(JSON.stringify(betData))
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
        getSessionResult(match?.id);
        return () => {
            dispatch(setSessionBetId(""));
        };
    }, [sessionEvent?.id]);

  const getSessionResult = async (match_id) => {
    let response = await axios.get(`/game-match/getResults/${match_id}`);
    // alert(JSON.stringify(response?.data?.data.length))
    dispatch(setSessionResults(response?.data?.data || []));
    // setSessionResults
  };

  async function doSubmitSessionBet(rate_percent) {
    dispatch(setSessionAllBet([]));
    const payload = { ...Detail, rate_percent };
    // return alert("ddd :" + betId)
    try {
      let response = await axios.post(`/betting/addBetting`, payload);
      setBetId(response?.data?.data?.id);
      setCheckBetId(true);
      setIsCreateSession(false);
      dispatch(setSessionBetId(response?.data?.data?.id));
      // setGlobalStore((prev) => ({ ...prev, isSession: false }));
      setLock({
        isNo: false,
        isYes: false,
        isNoPercent: false,
        isYesPercent: false,
      });
      // console.log("response :bbb", response)
      // alert("ddd :" + JSON.stringify(response?.data?.data?.id))
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async function getManuallBookMaker(id) {
    try {
      let response = await axios.get(`/betting/getById/${id}`);
      // console.log("dddddd :", response?.data)
      let data = response?.data?.data[0];
      // alert(JSON.stringify(data.no_rate))
      let [firstValue, secondValue] = data.rate_percent
        ? data.rate_percent.split("-")
        : "";
      setDetail({
        ...Detail,
        no_rate: data.no_rate,
        yes_rate: data.yes_rate,
        n_rate_percent: firstValue,
        y_rate_percent: secondValue,
        bet_condition: data.bet_condition,
      });
      setBetId(data.id);
      setCheckBetId(true);
      getAllBetsData(data.id);
      setProLoss(data?.profitLoss);
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
      // if (response?.data?.data?.length === 0) {
      //     doSubmitSessionBet(id);
      // } else {
      //     setBetId(response?.data?.data[0].id);
      //     setTeamARate(response?.data?.data[0].teamA_Back);
      //     setTeamALayValue(response?.data?.data[0].teamA_lay);
      //     setTeamBRate(response?.data?.data[0].teamB_Back);
      //     setTeamBLayValue(response?.data?.data[0].teamB_lay);
      //     setTeamCRate(response?.data?.data[0].teamC_Back);
      //     setTeamCLayValue(response?.data?.data[0].teamC_lay);
      // }
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async function getAllBetsData(id) {
    // alert(122)
    let payload = {
      match_id: match?.id,
      bet_id: id,
    };
    // alert(JSON.stringify(payload))
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      // setBetData(data?.data?.data || []);
      // alert(handleBetData)
      // handleBetData(data?.data?.data || [], id)
      // handleBetData(data?.data?.data || []);
      dispatch(setSessionAllBet(data?.data?.data || []));
      // setGlobalStore((prev) => ({
      //     ...prev,
      //     sessionBets: data?.data?.data || [],
      // }));
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

    return (
        <Box
            sx={{
                flex: 1,
                background: "#F8C851",
                borderRadius: "5px",
                minHeight: "300px",
                py: "30px",
                px: "20px",
            }}
        >
            <Typography
                sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}
            >
                {match?.title ? match.title : "India vs Pakistan"}
            </Typography>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "space-between",
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
                        setLock={setLock}
                        isBall={{ isBall, setIsBall }}
                        isCreateSession={isCreateSession}
                        match={match}
                        isPercent={{ isPercent, setIsPercent }}
                        live={live}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {!isCreateSession || sessionBetId ? (
                            <>
                                <Box
                                    onClick={(e) => {
                                        handleLive(live ? 0 : 1);
                                        // setLive(!live);
                                    }}
                                    sx={{
                                        width: "30%",
                                        display: "flex",
                                        maxWidth: "120px",
                                        background: live ? "#10DC61" : "#FF4D4D",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "35px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <Typography
                                        sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
                                    >
                                        {live ? "Go Live" : "Stop"}
                                    </Typography>
                                    <StyledImage
                                        src={LiveOn}
                                        sx={{ marginLeft: "5px", height: "15px", width: "15px" }}
                                    />
                                </Box>
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
                                        sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
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
                                            />
                                        )}
                                    </Box>
                                </Box>
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
                                        sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
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
                                                    getSessionResult(match?.id);
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
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
                                        sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
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
                                                }}
                                                onClick={() => {
                                                    setVisible2(false);
                                                    getSessionResult(match?.id);
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
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
});
export default IndiaPakLive;

const AddSession = ({
  createSession,
  betId,
  Detail,
  sessionEvent,
  incGap,
  socket,
  lock,
  setLock,
  isBall,
  isCreateSession,
  match,
  isPercent,
  live,
}) => {
  const handleKeysMatchEvents = (key, event) => {
    // alert(key);
    // console.log('handle key event');
    event.preventDefault();
    // this.setState({ focus_team: event.target.getAttribute('id'), ERROR: false });
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
      // let chckValue = teamALayValue ? teamALayValue : value
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
        });
      }
    } else if (key == "up") {
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
          });
        } else {
          let value = Detail?.Detail?.yes_rate
            ? Detail?.Detail?.yes_rate
            : Detail?.Detail?.no_rate;
          Detail.setDetail({
            ...Detail.Detail,
            yes_rate: value + incGap.incGap,
          });
        }
      }
    } else if (key == "down") {
      handleSuspend();
      setLock({
        ...lock,
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      // if (Detail?.Detail?.yes_rate - incGap.incGap > Detail?.Detail?.no_rate) {
      //     let value = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : Detail?.Detail?.no_rate;
      //     Detail.setDetail({ ...Detail.Detail, yes_rate: value - incGap.incGap, y_rate_percent: 100, n_rate_percent: 100 })
      // }
      if (targetValue > 0) {
        if (isPercent.isPercent == "percent") {
          Detail.setDetail({
            ...Detail.Detail,
            no_rate: Detail?.Detail?.no_rate,
            yes_rate: Detail?.Detail?.yes_rate,
            y_rate_percent: 100,
            y_rate_percent: Detail?.Detail?.y_rate_percent + incGap.incGap,
            n_rate_percent: Detail?.Detail?.n_rate_percent - incGap.incGap,
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
            });
          }
        }
      }
    } else if (key == "shift") {
      isBall.setIsBall(true);
      if (!isCreateSession) {
        socket.emit("updateSessionRate", {
          match_id: match?.id,
          betId: betId,
          suspended: "Ball Started",
        });
      }
      // if (event.target.name === 'teamA_rate') {
      // socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: 'Ball Started', })
      // // } else if (event.target.name === 'teamB_rate') {
      // socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: 'Ball Started', })
      // // } else if (event.target.name === 'teamC_rate') {
      // socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: 'Ball Started', })
      // }
    } else if (key == ",") {
      // alert(targetValue)
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
      // let yesValue = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : value
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value,
        y_rate_percent: 90,
        n_rate_percent: 110,
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
      let value = Detail?.Detail?.no_rate ? Detail?.Detail?.no_rate + 1 : 0;
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value,
        y_rate_percent: 90,
        n_rate_percent: 110,
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
      // let yesValue = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : value
      Detail.setDetail({
        ...Detail.Detail,
        no_rate: value,
        yes_rate: value + 1,
        y_rate_percent: 100,
        n_rate_percent: 100,
      });
    } else if (key == "enter") {
      if (!isCreateSession) {
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
      // setDetail({ ...Detail, no_rate: data.no_rate, yes_rate: data.yes_rate, n_rate_percent: firstValue, y_rate_percent: secondValue, bet_condition: data.bet_condition })
      // return alert(JSON.stringify(socket))
      // socket.emit("updateSessionRate", data)
    }

    // else if (key == 'backspace') {
    //     // setLock({ ...lock, isNo: true, isYes: true, isNoPercent: true, isYesPercent: true })
    // }
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
    // alert(isBall.isBall)
    let target = event.target;
    // let targetValue = parseFloat(event.target.value);
    let targetValue = parseFloat(event.target.value);
    let checkValue = parseFloat(event.target.value);
    // alert(targetValue)
    Detail.setDetail({
      ...Detail.Detail,
      no_rate: targetValue,
      yes_rate: targetValue + 1,
      y_rate_percent: checkValue ? 100 : "",
      n_rate_percent: checkValue ? 100 : "",
    });
  };

  const handleSuspend = () => {
    // alert(JSON.stringify(lock))
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
            width: "15%",
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
            width: "15%",
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
          {/* {createSession ? */}
          <TextField
            onChange={(e) => {
              Detail.setDetail({
                ...Detail.Detail,
                bet_condition: e.target.value,
              });
            }}
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
          {/* : 
                            <Typography sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}>{sessionEvent?.bet_condition}</Typography>} */}
        </Box>
        {/* <Box sx={{ borderLeft: "2px solid white", width: "60%" }}>


                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                        <Box sx={{ background: "#FFB5B5", width: "20%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus',]} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                    <TextField
                                        onChange={(e) => handleChange(e)}
                                        type="Number"
                                        value={Detail?.Detail?.no_rate}
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                            style: { fontSize: "14px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                        }} /></KeyboardEventHandler>
                            </Typography>
                        </Box>
                        <Box sx={{ background: "#A7DCFF", width: "20%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                <TextField
                                    type="Number"
                                    value={Detail.Detail.yes_rate}
                                    variant="standard" InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "14px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                    }} />
                            </Typography>
                        </Box>
                        {!isBall?.isBall ?
                            <>
                                <Box sx={{ background: lock?.isNo ? "#FDF21A" : "#FFB5B5", width: "30%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                    {!lock?.isNo ? <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}>
                                        {Detail?.Detail?.no_rate ? Detail?.Detail?.no_rate : ""}
                                    </Typography>
                                        : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                </Box>

                                <Box sx={{ background: lock?.isYes ? "#FDF21A" : "#A7DCFF", width: "30%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                    {!lock?.isYes ? <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}>
                                        {Detail.Detail.yes_rate ? Detail.Detail.yes_rate : ""}
                                    </Typography>
                                        : <img src={Lock} style={{ width: "10px", height: "15px" }} />}

                                </Box>
                            </> :
                            <Box sx={{ background: "#000", width: "60%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                <img src={BallStart} style={{ width: '60px', height: '17px' }} />
                            </Box>}

                    </Box>
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                        <Box sx={{ background: "#FFB5B5", width: "20%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus',]} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                    <TextField
                                        type="Number"
                                        value={Detail?.Detail?.n_rate_percent}
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                            style: { fontSize: "14px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                        }} /></KeyboardEventHandler>
                            </Typography>
                        </Box>
                        <Box sx={{ background: "#A7DCFF", width: "20%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                <TextField
                                    type="Number"
                                    value={Detail.Detail.y_rate_percent}
                                    variant="standard" InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "14px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                    }} />
                            </Typography>
                        </Box>
                        {!isBall?.isBall ?
                            <>
                                <Box sx={{ background: lock?.isNoPercent ? "#FDF21A" : "#FFB5B5", width: "30%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                    {!lock?.isNoPercent ? <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}>
                                        {Detail.Detail.n_rate_percent}
                                    </Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                </Box>
                                <Box sx={{ background: lock?.isYesPercent ? "#FDF21A" : "#A7DCFF", width: "30%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                    {!lock?.isYesPercent ? <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}>
                                        {Detail.Detail.y_rate_percent}
                                    </Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                </Box>
                            </> :
                            <Box sx={{ background: "#000", width: "60%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                <img src={BallStart} style={{ width: '60px', height: '17px' }} />
                            </Box>}
                    </Box>
                </Box> */}
        <Box
          display={"flex"}
          sx={{ borderLeft: "2px solid white", width: "60%" }}
        >
          <Box sx={{ width: "50%" }}>
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
                  >
                    <TextField
                      onChange={(e) => handleChange(e)}
                      type="Number"
                      value={Detail.Detail.no_rate ? Detail.Detail.no_rate : ""}
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
                    value={Detail.Detail.yes_rate ? Detail.Detail.yes_rate : ""}
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
                  >
                    <TextField
                      type="Number"
                      value={
                        Detail?.Detail?.n_rate_percent
                          ? Detail?.Detail?.n_rate_percent
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
                    value={
                      Detail.Detail.y_rate_percent
                        ? Detail.Detail.y_rate_percent
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
          <Box sx={{ width: "50%" }}>
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
                          fontSize: "14px",
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
                          fontSize: "14px",
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
                          fontSize: "14px",
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
                          fontSize: "14px",
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
    console.log(`Scroll to`, element, id);
    if (element) {
      if (element && containerRef.current) {
        containerRef.current.scrollTop =
          element.offsetTop - containerRef.current.offsetTop;
      }

      // element.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      //   inline: "center",
      // });
    }
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
        {/* <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>40</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box> */}
        <Box ref={containerRef} sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {proLoss?.betData?.length > 0
            ? proLoss?.betData?.map((v) => {
                const getColor = (value) => {
                  if (value > 1) {
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
            : null}
        </Box>
        {/* <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>41</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>42</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>43</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>44</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box> */}
      </Box>
    </Box>
  );
};
