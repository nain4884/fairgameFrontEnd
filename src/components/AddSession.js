import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { memo } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { BALLSTART } from "../expert/assets";
import BookButtton from "./BookButton";
import BookButton from "./BookButton";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { SocketContext } from "../context/socketContext";
import { setRole } from "../newStore";
import { useRef } from "react";
import { useEffect } from "react";
import { setBookMakerBetRate } from "../newStore/reducers/matchDetails";
import { BallStart, Lock } from "../assets";
import ResultComponent from "./ResultComponent";
import {
  setBookmakerTeamRates,
  setSelectedBookmaker,
  setTeamA,
  setTeamB,
  setTeamC,
  setTeamSuspended,
} from "../newStore/reducers/expertMatchDetails";

const AddSession = ({ add, match, Bid }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const {
    bookmakerTeamRates,
    teamA,
    teamB,
    teamC,
    teamBall,
    teamSuspended,
    teamBackUnlock,
  } = useSelector((state) => state?.expertMatchDetails);
  // const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);
  // console.log('match', match)
  const { socket, socketMicro } = useContext(SocketContext);

  const { axios } = setRole();
  const dispatch = useDispatch();
  const [l_teamARate, setLTeamARate] = useState();
  const [l_teamALayValue, setLTeamALayValue] = useState();
  const [l_teamBRate, setLTeamBRate] = useState();
  const [l_teamBLayValue, setLTeamBLayValue] = useState();
  const [l_teamCRate, setLTeamCRate] = useState();
  const [l_teamCLayValue, setLTeamCLayValue] = useState();
  const [incGap, setIncGap] = useState(1);
  const [pressEnter, setPressEnter] = useState(false);

  const [betId, setBetId] = useState("");
  const [isTab, setIsTab] = useState("");
  const [betStatus, setBetStatus] = useState(null);
  const innerRefTeamA = useRef();
  const innerRefTeamB = useRef();
  const innerRefTeamC = useRef();
  const [currentBookmaker, setCurrentBookmaker] = useState("");

  const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);

  //sddddddd

  const [teamRates, setTeamRates] = useState({
    teamA: bookmakerTeamRates?.teamA,
    teamB: bookmakerTeamRates?.teamB,
    teamC: bookmakerTeamRates?.teamC,
  });
  const [localBookMakerRates, setLocalBookMakerRates] = useState([]);

  const [localTeamA, setLocalTeamA] = useState({
    rate: null,
    lock: true,
    suspended: true,
    lay: null,
    back: null,
    layLock: false,
  });
  const [localTeamB, setLocalTeamB] = useState({
    rate: null,
    lock: true,
    suspended: true,
    lay: null,
    back: null,
    layLock: false,
  });
  const [localTeamC, setLocalTeamC] = useState({
    rate: null,
    lock: true,
    suspended: true,
    lay: null,
    back: null,
    layLock: false,
  });
  const [localTeamBall, setLocalTeamBall] = useState({
    isABall: false,
    isBBall: false,
    isCBall: false,
  });

  const [localTeamSuspended, setLocalTeamSuspended] = useState({
    teamA_suspend: false,
    teamB_suspend: false,
    teamC_suspend: false,
  });
  const [localTeamBackUnlock, setLocalTeamBackUnlock] = useState(true);

  useEffect(() => {
    // alert(JSON.stringify(match))
    if (Bid) {
      getManuallBookMaker(Bid);
    }
  }, [Bid]);

  useEffect(() => {
    if (bookmakerTeamRates) {
      setTeamRates({
        teamA: bookmakerTeamRates?.teamA,
        teamB: bookmakerTeamRates?.teamB,
        teamC: bookmakerTeamRates?.teamC,
      });
    }
    if (bookMakerBetRates) {
      setLocalBookMakerRates(bookMakerBetRates);
    }
    if (teamA) {
      setLocalTeamA(teamA);
    }
    if (teamB) {
      setLocalTeamB(teamB);
    }
    if (teamC) {
      setLocalTeamC(teamC);
    }
    if (teamBall) {
      setLocalTeamBall(teamBall);
    }
    if (teamSuspended) {
      setLocalTeamSuspended(teamSuspended);
    }
    if (teamBackUnlock) {
      setLocalTeamBackUnlock(teamBackUnlock);
    }
  }, [
    bookmakerTeamRates,
    bookMakerBetRates,
    teamA,
    teamB,
    teamC,
    teamBall,
    teamSuspended,
    teamBackUnlock,
  ]);

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

  async function getManuallBookMaker(id) {
    try {
      let response = await axios.get(`/betting/getBookmaker/${id}`);
      if (response?.data?.data?.length === 0) {
        doSubmitSessionBet(id);
      } else {
        setCurrentBookmaker(response?.data?.data?.marketName);
        setBetId(response?.data?.data?.bet_id);
        const body = {
          id: response?.data?.data?.id,
          betId: response?.data?.data?.bet_id,
          marketType:response?.data?.data?.marketType
        };
        dispatch(setSelectedBookmaker(body));
        // setTeamARate(response?.data?.data.teamA_Back);
        // setTeamALayValue(response?.data?.data.teamA_lay);
        // setTeamBRate(response?.data?.data.teamB_Back);
        // setTeamBLayValue(response?.data?.data.teamB_lay);
        // setTeamCRate(response?.data?.data.teamC_Back);
        // setTeamCLayValue(response?.data?.data.teamC_lay);
        setLocalTeamA((prev) => {
          const newBody = {
            ...prev,
            rate: response?.data?.data.teamA_Back,
            suspended: response?.data?.data.teamA_suspend,
            lock: response?.data?.data?.teamA_suspend,
            lay: response?.data?.data?.teamA_lay,
          };

          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = {
            ...prev,
            rate: response?.data?.data.teamB_Back,
            suspended: response?.data?.data.teamB_suspend,
            lock: response?.data?.data?.teamB_suspend,
            lay: response?.data?.data?.teamB_lay,
          };

          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLocalTeamC((prev) => {
          const newBody = {
            ...prev,
            rate: response?.data?.data.teamC_Back,
            suspended: response?.data?.data.teamC_suspend,
            lock: response?.data?.data?.teamC_suspend,
            lay: response?.data?.data?.teamC_lay,
          };

          dispatch(setTeamC(newBody));
          return newBody;
        });

        getAllBetsData(
          response?.data?.data?.bet_id,
          response?.data?.data?.match_id,
          response?.data?.data?.marketType
        );
        const newBody = {
          teamA: response?.data?.data.teamA_rate
            ? response?.data?.data.teamA_rate
            : 0,
          teamB: response?.data?.data.teamB_rate
            ? response?.data?.data.teamB_rate
            : 0,
          teamC: response?.data?.data.teamC_rate
            ? response?.data?.data.teamC_rate
            : 0,
        };
        setTeamRates(newBody);
        dispatch(setBookmakerTeamRates(newBody));

        betStatus(response?.data?.data.betStatus);
        setLocalTeamSuspended((prev) => {
          const newBody = {
            ...prev,
            teamA_suspend: response?.data?.data.teamA_suspend ? true : false,
            teamB_suspend: response?.data?.data.teamB_suspend ? true : false,
            teamC_suspend: response?.data?.data.teamC_suspend ? true : false,
          };
          dispatch(setTeamSuspended(newBody));
          return newBody;
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function doSubmitSessionBet(id) {
    const payload = {
      betStatus: 1,
      sessionBet: false,
      matchType: "cricket",
      match_id: id,
    };
    try {
      let response = await axios.post(`/betting/addBetting`, payload);
      setBetId(response?.data?.data?.id);
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async function getAllBetsData(id, matchId, marketType) {
    let payload = {
      match_id: matchId,
      bet_id: id,
      marketType,
      // id: Bid,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      dispatch(setBookMakerBetRate(data?.data?.data || []));
    } catch (e) {
      console.log(e);
    }
  }
  console.log("state", match); // useEffect(() => {
  //   if (socket && socket.connected) {
  //     socket.onevent = async (packet) => {
  //       const data = packet.data[1];
  //       if (packet.data[0] === "match_bet") {
  //         const data = packet.data[1];
  //         try {
  //           if (data?.betPlaceData?.match_id === match?.id) {
  //             setteamRates({
  //               teamA: data?.teamA_rate ? data?.teamA_rate : 0,
  //               teamB: data?.teamB_rate ? data?.teamB_rate : 0,
  //               teamC: data?.teamC_rate ? data?.teamC_rate : 0,
  //             });
  //             // dispatch(setBookMakerBetRate((prev) => [body, ...prev]));

  //             if (
  //               data &&
  //               data?.betPlaceData?.marketType == "MANUAL BOOKMAKER"
  //             ) {
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
  //                 loss_amount: null,
  //                 bet_type: data?.betPlaceData?.bet_type,
  //                 country: null,
  //                 ip_address: null,
  //                 rate: null,
  //                 deleted_reason: data?.betPlaceData?.deleted_reason || null,
  //                 userName: data?.betPlaceData?.userName,
  //                 myStack: data?.betPlaceData?.myStack,
  //                 marketType: data?.betPlaceData?.marketType,
  //                 amount:
  //                   data?.betPlaceData?.stack || data?.betPlaceData?.stake,
  //               };
  //               // dispatch(setBookmakerTeamRates(teamRates));
  //               dispatch(
  //                 setBookMakerBetRate((prev) => {
  //                   // Create a new array by adding `body` at the beginning and spreading the previous values
  //                   const newData = [body, ...prev];

  //                   // Modify the `newData` array if needed

  //                   // Return the modified `newData` array
  //                   return newData;
  //                 })
  //               );
  //             }
  //           }
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }

  //       if (packet.data[0] === "updateRate_user") {
  //         if (data?.matchId === match?.id) {
  //           if (!data?.lock) {
  //             if (data?.isTab) {
  //               setIsTeamBackUnlock(false);
  //               setTeamARate(data.teamA_Back);
  //               setTeamBRate(data.teamB_Back);
  //               setTeamCRate(data.teamC_Back);
  //             } else {
  //               setTeamBall((prevState) => ({
  //                 ...prevState,
  //                 isABall: false,
  //                 isBBall: false,
  //                 isCBall: false,
  //               }));
  //               setIsTeamALock(data?.teamA_suspend);
  //               setIsTeamBLock(data?.teamB_suspend);
  //               setIsTeamCLock(data?.teamC_suspend);

  //               setIsTeamASuspend(data?.teamA_suspend);
  //               setTeamARate(data?.teamA_Back);
  //               setTeamALayValue(data?.teamA_lay);

  //               setIsTeamBSuspend(data?.teamB_suspend);
  //               setTeamBRate(data?.teamB_Back);
  //               setTeamBLayValue(data?.teamB_lay);

  //               setIsTeamCSuspend(data.teamC_suspend);
  //               setTeamCRate(data.teamC_Back);
  //               setTeamCLayValue(data.teamC_lay);
  //             }

  //             setTeamSuspend((prevState) => ({
  //               ...prevState,
  //               teamA_suspend: data?.teamA_suspend,
  //               teamB_suspend: data?.teamB_suspend,
  //               teamC_suspend: data?.teamC_suspend,
  //             }));
  //           } else {
  //             if (data.teamA_suspend == "Ball Started") {
  //               setTeamBall((prevState) => ({
  //                 ...prevState,
  //                 isABall: true,
  //                 isBBall: true,
  //                 isCBall: true,
  //               }));
  //             } else {
  //               setIsTeamASuspend(data?.teamA_suspend);
  //               setIsTeamBSuspend(data?.teamB_suspend);
  //               setIsTeamCSuspend(data?.teamC_suspend);
  //               setIsTeamBackUnlock(true);
  //               setTeamBall((prevState) => ({
  //                 ...prevState,
  //                 isABall: false,
  //                 isBBall: false,
  //                 isCBall: false,
  //               }));
  //             }
  //             setTeamSuspend((prevState) => ({
  //               ...prevState,
  //               teamA_suspend: data?.teamA_suspend,
  //               teamB_suspend: data?.teamB_suspend,
  //               teamC_suspend: data?.teamC_suspend,
  //             }));
  //           }
  //         }
  //       }

  //       if (packet.data[0] === "matchDeleteBet") {
  //         const value = packet.data[1];
  //         try {
  //           const updatedAllBet = bookMakerBetRates.map((currentMatch) => {
  //             if (currentMatch.match_id === value?.matchId) {
  //               if (value?.betPlaceIds.includes(currentMatch.id)) {
  //                 return {
  //                   ...currentMatch,
  //                   deleted_reason: value?.deleted_reason,
  //                 };
  //               }
  //             }
  //             return currentMatch;
  //           });

  //           dispatch(setBookMakerBetRate(updatedAllBet));
  //           // setBookMakerBetRate
  //           setteamRates({
  //             teamA: value?.teamA_rate ? value?.teamA_rate : 0,
  //             teamB: value?.teamB_rate ? value?.teamB_rate : 0,
  //             teamC: value?.teamC_rate ? value?.teamC_rate : 0,
  //           });
  //         } catch (err) {
  //           console.log(err?.message);
  //         }
  //       }
  //     };
  //   }
  // }, [socket]);

  const handleSuspend = (back, lay) => {
    if (back && lay) {
      if (Math.abs(lay - back) >= 1) {
        setIncGap(2);
      }
    }
    if (
      !localTeamSuspended?.teamA_suspend ||
      !localTeamSuspended?.teamB_suspend ||
      !localTeamSuspended?.teamC_suspend
    ) {
      socket.emit("updateRate", {
        matchId: match?.id,
        betId: betId,
        id: Bid,
        teamA_lay: "",
        teamA_Back: "",
        teamA_suspend: true,
        teamB_lay: "",
        teamB_Back: "",
        teamB_suspend: true,
        teamC_lay: "",
        teamC_Back: "",
        teamC_suspend: true,
        lock: true,
        layLock: false,
      });
    }
  };

  const handleChange = (event) => {
    let target = event.target;
    handleSuspend(target.value);
    if (target.value <= 100) {
      if (target.name === "teamA_rate") {
        setLocalTeamA((prev) => {
          const newBody = { ...prev, rate: target.value };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLTeamARate(target.value);

        if (target.value !== "") {
          let teamA_lay = parseInt(target.value) + 1;

          setLTeamALayValue(teamA_lay);

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: teamA_lay };
            dispatch(setTeamA(newBody));
            return newBody;
          });
        } else {
          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });
          setLTeamALayValue("");
        }
      } else if (target.name === "teamB_rate") {
        setLocalTeamB((prev) => {
          const newBody = { ...prev, rate: target.value };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLTeamBRate(target.value);
        if (target.value !== "") {
          let teamB_lay = parseInt(target.value) + 1;
          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: teamB_lay };
            dispatch(setTeamB(newBody));
            return newBody;
          });
          setLTeamBLayValue(teamB_lay);
        } else {
          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });
          setLTeamBLayValue("");
        }
      } else if (target.name === "teamC_rate") {
        setLocalTeamC((prev) => {
          const newBody = { ...prev, rate: target.value };
          dispatch(setTeamC(newBody));
          return newBody;
        });
        setLTeamCRate(target.value);
        if (target.value !== "") {
          let teamC_lay = parseInt(target.value) + 1;
          setLocalTeamC((prev) => {
            const newBody = { ...prev, lay: teamC_lay };
            dispatch(setTeamC(newBody));
            return newBody;
          });
          setLTeamCLayValue(teamC_lay);
        } else {
          setLocalTeamC((prev) => {
            const newBody = { ...prev, lay: "" };
            dispatch(setTeamC(newBody));
            return newBody;
          });
          setLTeamCLayValue("");
        }
      }
    }
  };

  const handleFocus = (event) => {};
  const handleHunderedValue = (back, lay) => {
    // alert(back)
    if (back >= 100) {
      return true;
    }
    if (lay >= 100) {
      return true;
    }
    return false;
  };
  const handleZeroValue = (back, lay) => {
    if (back < 1) {
      return true;
    }
    if (lay < 0) {
      return true;
    }
    return false;
  };

  const handleKeysMatchEvents = (key, event) => {
    event.preventDefault();
    let targetValue = parseFloat(event.target.value);
    event.target.value = targetValue;
    // if (key == "right") {
    if (key == "d" || key == "right") {
      let value = targetValue ? targetValue + incGap : incGap;
      let chckValue = teamA?.lay ? teamA?.lay : value;
      let l_chckValue = l_teamALayValue ? l_teamALayValue : value;
      handleSuspend(targetValue, chckValue);
      setPressEnter(false);
      if (event.target.name === "teamA_rate") {
        let result = handleHunderedValue(targetValue, teamA?.lay);
        if (result) {
          return;
        }

        setLocalTeamA((prev) => {
          const newBody = { ...prev, rate: value, lay: chckValue + incGap };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLTeamARate(value);

        setLocalTeamB((prev) => {
          const newBody = { ...prev, rate: "", lay: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamALayValue(l_chckValue + incGap);
        setLTeamBRate("");
        setLTeamBLayValue("");
      }

      if (event.target.name === "teamB_rate") {
        let result = handleHunderedValue(targetValue, teamB?.lay);
        if (result) {
          return;
        }

        setLocalTeamB((prev) => {
          const newBody = { ...prev, rate: value, lay: chckValue + incGap };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamBRate(value);
        let chckValue = teamB?.lay ? teamB?.lay : value;
        let l_chckValue = l_teamBLayValue ? l_teamBLayValue : value;

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLTeamBLayValue(l_chckValue + incGap);
        setLTeamARate("");
        setLTeamALayValue("");
      }
      if (event.target.name === "teamC_rate") {
        let result = handleHunderedValue(targetValue, teamC?.lay);
        if (result) {
          return;
        }

        setLocalTeamC((prev) => {
          const newBody = { ...prev, rate: value, lay: chckValue + incGap };
          dispatch(setTeamC(newBody));
          return newBody;
        });

        setLTeamCRate(value);
        let chckValue = teamC?.lay ? teamC?.lay : value;

        let l_chckValue = l_teamCLayValue ? l_teamCLayValue : value;

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLTeamCLayValue(l_chckValue + incGap);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    }
    // if (key == "left") {
    else if (key == "a" || key == "left") {
      let value = targetValue - incGap;
      handleSuspend(targetValue, value);
      setPressEnter(false);
      if (event.target.name === "teamA_rate" && teamA?.rate > 0) {
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: teamA?.lay - incGap, rate: value };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamARate(value);
        setLTeamALayValue(l_teamALayValue - incGap);
        setLTeamBRate("");
        setLTeamBLayValue("");
      }

      if (event.target.name === "teamB_rate" && teamB?.rate > 0) {
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: teamB?.lay - incGap, rate: value };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLTeamBRate(value);
        setLTeamBLayValue(l_teamBLayValue - incGap);
        setLTeamARate("");
        setLTeamALayValue("");
      }
      if (event.target.name === "teamC_rate" && teamC?.rate > 0) {
        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: teamC?.lay - incGap, rate: value };
          dispatch(setTeamC(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLTeamCRate(value);
        setLTeamCLayValue(l_teamCLayValue - incGap);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    }
    // if (key == "up") {
    else if (key == "w" || key == "up") {
      let value = teamA?.lay ? teamA?.lay : teamA?.rate;
      let l_value = l_teamALayValue ? l_teamALayValue : l_teamARate;
      handleSuspend(targetValue, value);
      setPressEnter(false);
      if (event.target.name === "teamA_rate") {
        let result = handleHunderedValue(targetValue, teamA?.lay);
        if (result) {
          return;
        }

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: value + incGap };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = { ...prev, rate: "", lay: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamALayValue(l_value + incGap);
        setLTeamBRate("");
        setLTeamBLayValue("");
      }

      if (event.target.name === "teamB_rate") {
        let result = handleHunderedValue(targetValue, teamB?.lay);
        if (result) {
          return;
        }
        let value = teamB?.lay ? teamB?.lay : teamB?.rate;
        let l_value = l_teamBLayValue ? l_teamBLayValue : l_teamBRate;

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = {
            ...prev,

            lay: value + incGap,
          };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLTeamBLayValue(l_value + incGap);
        setLTeamARate("");
        setLTeamALayValue("");
      }
      if (event.target.name === "teamC_rate") {
        let result = handleHunderedValue(targetValue, teamC?.lay);
        if (result) {
          return;
        }
        let value = teamC?.lay ? teamC?.lay : teamC?.rate;
        let l_value = l_teamCLayValue ? l_teamCLayValue : l_teamCRate;

        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: value + incGap };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = {
            ...prev,

            lay: "",
            rate: "",
          };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLTeamCLayValue(l_value + incGap);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    }
    // if (key == "down") {
    else if (key == "z" || key == "down") {
      let value = teamA?.lay ? teamA?.lay : teamA?.rate;
      handleSuspend(targetValue, value);
      setPressEnter(false);
      if (
        event.target.name === "teamA_rate" &&
        teamA?.lay - incGap > teamA?.rate
      ) {
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: teamA?.lay - incGap };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamALayValue(l_teamALayValue - incGap);
        setLTeamBRate("");
        setLTeamBLayValue("");
      }

      if (
        event.target.name === "teamB_rate" &&
        teamB?.lay - incGap > teamB?.rate
      ) {
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: teamB?.lay - incGap };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLTeamBLayValue(l_teamBLayValue - incGap);
        setLTeamARate("");
        setLTeamALayValue("");
      }
      if (
        event.target.name === "teamC_rate" &&
        teamC?.lay - incGap > teamC?.rate
      ) {
        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: teamC?.lay - incGap };
          dispatch(setTeamC(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLTeamCLayValue(l_teamCLayValue - incGap);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    } else if (key == "`") {
      handleSuspend(targetValue, teamA?.lay ? teamA?.lay : teamA?.rate);
      if (match?.teamC) {
        if (event.target.name === "teamA_rate") {
          innerRefTeamB.current.focus();
        } else if (event.target.name === "teamB_rate") {
          innerRefTeamC.current.focus();
        } else if (event.target.name === "teamC_rate") {
          innerRefTeamA.current.focus();
        }
      } else {
        if (event.target.name === "teamA_rate") {
          innerRefTeamB.current.focus();
        } else if (event.target.name === "teamB_rate") {
          innerRefTeamA.current.focus();
        }
      }
    } else if (key == "enter" || key == "return") {
      if (isTab == "tab") {
        let data = {};
        if (match?.teamC) {
          data = {
            id: Bid,
            matchId: match?.id,
            betId: betId,
            teamA_Back: targetValue,
            teamA_lay: "", //add
            teamA_suspend: false,
            teamB_Back: targetValue,
            teamB_lay: "", //add
            teamB_suspend: false,
            teamC_Back: targetValue,
            teamC_lay: "", //add
            teamC_suspend: false,
            isTab: true,
          };
        } else {
          data = {
            id: Bid,
            matchId: match?.id,
            betId: betId,
            teamA_Back: targetValue,
            teamA_lay: "", //add
            teamA_suspend: false,
            teamB_Back: targetValue,
            teamB_lay: "", //add
            teamB_suspend: false,
            teamC_Back: "", //add
            teamC_lay: "", //add
            teamC_suspend: false,
            isTab: true,
          };
        }
        // alert(JSON.stringify(data));
        socket.emit("updateRate", data);
      } else {
        if (event.target.name === "teamA_rate") {
          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            betId: betId,
            teamA_lay: teamA?.lay,
            teamA_Back: teamA?.rate,
            teamA_suspend: false,
            teamB_lay: "",
            teamB_Back: "",
            teamB_suspend: true,
            teamC_lay: "",
            teamC_Back: "",
            teamC_suspend: true,
            layLock: false,
          });
        }
        if (event.target.name === "teamB_rate") {
          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            betId: betId,
            teamA_lay: "",
            teamA_Back: "",
            teamA_suspend: true,
            teamB_lay: teamB?.lay,
            teamB_Back: teamB?.rate,
            teamB_suspend: false,
            teamC_lay: "",
            teamC_Back: "",
            teamC_suspend: true,
            layLock: false,
          });
        }
        if (event.target.name === "teamC_rate") {
          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            betId: betId,
            teamA_lay: "",
            teamA_Back: "",
            teamA_suspend: true,
            teamB_lay: "",
            teamB_Back: "",
            teamB_suspend: true,
            teamC_lay: teamC?.lay,
            teamC_Back: teamC?.rate,
            teamC_suspend: false,
            layLock: false,
          });
        }
      }
      setIsTab("");
    } else if (key == "tab") {
      handleSuspend(targetValue, teamA?.lay ? teamA?.lay : teamA?.rate);

      setLocalTeamA((prev) => {
        const newBody = { ...prev, lay: "", rate: targetValue };
        dispatch(setTeamA(newBody));
        return newBody;
      });
      setLocalTeamB((prev) => {
        const newBody = { ...prev, lay: "", rate: targetValue };
        dispatch(setTeamB(newBody));
        return newBody;
      });

      setLocalTeamC((prev) => {
        const newBody = { ...prev, lay: "", rate: targetValue };
        dispatch(setTeamC(newBody));
        return newBody;
      });
      setLTeamARate(targetValue);
      setLTeamBRate(targetValue);
      setLTeamCRate(targetValue);
      setLTeamALayValue("");
      setLTeamBLayValue("");
      setLTeamCLayValue("");
      setIsTab("tab");
    }
    if (key == "*") {
      //lay getting undefined
      handleSuspend(targetValue, teamA?.lay ? teamA?.lay : teamA?.rate);
      if (event.target.name === "teamA_rate") {
        let value = event.target.value ? targetValue + 0.5 : 0;

        setIncGap(0.25);

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: value + 0.5, rate: value };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamARate(value);
        setLTeamALayValue(value + 0.5);
        setLTeamBRate("");
        setLTeamBLayValue("");
      } else if (event.target.name === "teamB_rate") {
        let value = event.target.value ? targetValue + 0.5 : 0;

        setIncGap(0.25);

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: value + 0.5, rate: value };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLTeamBRate(value);
        setLTeamBLayValue(value + 0.5);
        setLTeamARate("");
        setLTeamALayValue("");
      } else if (event.target.name === "teamC_rate") {
        let value = event.target.value ? targetValue + 0.5 : 0;

        setIncGap(0.25);

        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: value + 0.5, rate: value };
          dispatch(setTeamC(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamCRate(value);
        setLTeamCLayValue(value + 0.5);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    }
    if (key == "ctrl") {
      handleSuspend();
      setIncGap(1);
    }
    if (key == "esc") {
      handleSuspend();
      setIncGap(1);
      if (event.target.name === "teamA_rate") {
        let teamARateDecimal = teamA?.rate % 1; // get the decimal portion of the number
        let teamALayValueDecimal = teamA?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamARateDecimal >= 0.5) {
          value = Math.round(teamA?.rate) - 1;
        } else {
          value = Math.round(teamA?.rate);
        }
        if (teamALayValueDecimal >= 0.5) {
          layValue = Math.round(teamA?.lay);
        } else {
          layValue = Math.round(teamA?.lay);
        }

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: value + 1, rate: value };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLTeamARate(value);
        setLTeamALayValue(value + 1);
      } else if (event.target.name === "teamB_rate") {
        let teamBRateDecimal = teamB?.rate % 1; // get the decimal portion of the number
        let teamBLayValueDecimal = teamB?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamBRateDecimal >= 0.5) {
          value = Math.round(teamB?.rate) - 1;
        } else {
          value = Math.round(teamB?.rate);
        }
        if (teamBLayValueDecimal >= 0.5) {
          layValue = Math.round(teamB?.lay);
        } else {
          layValue = Math.round(teamB?.lay);
        }

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: value + 1, rate: value };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamBRate(value);
        setLTeamBLayValue(value + 1);
      } else if (event.target.name === "teamC_rate") {
        let teamCRateDecimal = teamC?.rate % 1; // get the decimal portion of the number
        let teamCLayValueDecimal = teamC?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamCRateDecimal >= 0.5) {
          value = Math.round(teamC?.rate) - 1;
        } else {
          value = Math.round(teamC?.rate);
        }
        if (teamCLayValueDecimal >= 0.5) {
          layValue = Math.round(teamC?.lay);
        } else {
          layValue = Math.round(teamC?.lay);
        }

        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: value + 1, rate: value };
          dispatch(setTeamC(newBody));
          return newBody;
        });

        setLTeamCRate(value);
        setLTeamCLayValue(value + 1);
      }
    }
    if (key == ".") {
      handleSuspend();
      setIncGap(1);
      if (event.target.name === "teamA_rate") {
        let teamARateDecimal = teamA?.rate % 1; // get the decimal portion of the number
        let teamALayValueDecimal = teamA?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamARateDecimal >= 0.5) {
          value = teamA?.rate ? Math.round(teamA?.rate) : 0;
        } else {
          value = teamA?.rate ? Math.round(teamA?.rate) : 0;
        }
        if (teamALayValueDecimal >= 0.5) {
          layValue = teamA?.lay ? Math.round(teamA?.lay) : 0;
        } else {
          layValue = teamA?.lay ? Math.round(teamA?.lay) : 0;
        }

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: value + 1.5, rate: value };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamARate(value);
        setLTeamALayValue(value + 1.5);
        setLTeamBRate("");
        setLTeamBLayValue("");
      } else if (event.target.name === "teamB_rate") {
        let teamBRateDecimal = teamB?.rate % 1; // get the decimal portion of the number
        let teamBLayValueDecimal = teamB?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamBRateDecimal >= 0.5) {
          value = teamB?.rate ? Math.round(teamB?.rate) : 0;
        } else {
          value = teamB?.rate ? Math.round(teamB?.rate) : 0;
        }
        if (teamBLayValueDecimal >= 0.5) {
          layValue = teamB?.lay ? Math.round(teamB?.lay) : 0;
        } else {
          layValue = teamB?.lay ? Math.round(teamB?.lay) : 0;
        }

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: value + 1.5, rate: value };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamBRate(value);
        setLTeamBLayValue(value + 1.5);
        setLTeamARate("");
        setLTeamALayValue("");
      } else if (event.target.name === "teamC_rate") {
        let teamCRateDecimal = teamC?.rate % 1; // get the decimal portion of the number
        let teamCLayValueDecimal = teamC?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamCRateDecimal >= 0.5) {
          value = teamC?.rate ? Math.round(teamC?.rate) : 0;
        } else {
          value = teamC?.rate ? Math.round(teamC?.rate) : 0;
        }
        if (teamCLayValueDecimal >= 0.5) {
          layValue = teamC?.lay ? Math.round(teamC?.lay) : 0;
        } else {
          layValue = teamC?.lay ? Math.round(teamC?.lay) : 0;
        }

        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: value + 1.5, rate: value };
          dispatch(setTeamC(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamCRate(value);
        setLTeamCLayValue(value + 1.5);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    }
    if (key == ",") {
      //team.lay recieving null
      handleSuspend();
      setIncGap(1);
      if (event.target.name === "teamA_rate") {
        if (teamA?.rate > 0.5) {
          let teamARateDecimal = teamA?.rate % 1; // get the decimal portion of the number
          let teamALayValueDecimal = teamA?.lay % 1; // get the decimal portion of the number
          let value;
          let layValue;
          if (teamARateDecimal >= 0.5) {
            value = Math.round(teamA?.rate) - 1;
          } else {
            value = Math.round(teamA?.rate);
          }
          if (teamALayValueDecimal >= 0.5) {
            layValue = Math.round(teamA?.lay);
          } else {
            layValue = Math.round(teamA?.lay);
          }

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: value + 1, rate: value - 0.5 };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamARate(value - 0.5);
          setLTeamALayValue(value + 1);

          setLTeamBRate("");
          setLTeamBLayValue("");
        }
      } else if (event.target.name === "teamB_rate") {
        if (teamB?.rate > 0.5) {
          let teamBRateDecimal = teamB?.rate % 1; // get the decimal portion of the number
          let teamBLayValueDecimal = teamB?.lay % 1; // get the decimal portion of the number
          let value;
          let layValue;
          if (teamBRateDecimal >= 0.5) {
            value = Math.round(teamB?.rate) - 1;
          } else {
            value = Math.round(teamB?.rate);
          }
          if (teamBLayValueDecimal >= 0.5) {
            layValue = Math.round(teamB?.rate);
          } else {
            layValue = Math.round(teamB?.rate);
          }

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: value + 1, rate: value - 0.5 };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLTeamBRate(value - 0.5);
          setLTeamBLayValue(value + 1);

          setLTeamARate("");
          setLTeamALayValue("");
        }
      } else if (event.target.name === "teamC_rate") {
        if (teamC?.rate > 0.5) {
          let teamCRateDecimal = teamC?.rate % 1; // get the decimal portion of the number
          let teamCLayValueDecimal = teamC?.lay % 1; // get the decimal portion of the number
          let value;
          let layValue;
          if (teamCRateDecimal >= 0.5) {
            value = Math.round(teamC?.rate) - 1;
          } else {
            value = Math.round(teamC?.rate);
          }
          if (teamCLayValueDecimal >= 0.5) {
            layValue = Math.round(teamC?.lay);
          } else {
            layValue = Math.round(teamC?.lay);
          }

          setLocalTeamC((prev) => {
            const newBody = { ...prev, lay: value + 1, rate: value - 0.5 };
            dispatch(setTeamC(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamCRate(value - 0.5);
          setLTeamCLayValue(value + 1);

          setLTeamARate("");
          setLTeamALayValue("");
          setLTeamBRate("");
          setLTeamBLayValue("");
        }
      }
    }
    if (key == "shift") {
      socket.emit("updateRate", {
        matchId: match?.id,
        id: Bid,
        betId: betId,
        teamA_lay: "",
        teamA_Back: "",
        teamA_suspend: "Ball Started",
        teamB_lay: "",
        teamB_Back: "",
        teamB_suspend: "Ball Started",
        teamC_lay: "",
        teamC_Back: "",
        teamC_suspend: "Ball Started",
        lock: true,
        layLock: false,
      });
    }
    if (key == "plus") {
      handleSuspend(targetValue, teamA?.lay ? teamA?.lay : teamA?.rate);
      if (incGap != 5) {
        setIncGap(1);
        if (event.target.name === "teamA_rate") {
          let result = handleHunderedValue(targetValue, teamA?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = teamA?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamARateDecimal >= 0.5) {
            value = parseFloat(event.target.value) + 1;
          } else {
            value = parseFloat(event.target.value) + 0.5;
          }

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: value + 1, rate: value };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });
          setLTeamARate(value);
          setLTeamALayValue(value + 1);
          setLTeamBRate("");
          setLTeamBLayValue("");
        } else if (event.target.name === "teamB_rate") {
          let result = handleHunderedValue(targetValue, teamB?.lay);
          if (result) {
            return;
          }
          let teamBRateDecimal = teamB?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamBRateDecimal >= 0.5) {
            value = parseFloat(event.target.value) + 1;
          } else {
            value = parseFloat(event.target.value) + 0.5;
          }

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: value + 1, rate: value };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLTeamBRate(value);
          setLTeamBLayValue(value + 1);
          setLTeamARate("");
          setLTeamALayValue("");
        } else if (event.target.name === "teamC_rate") {
          let result = handleHunderedValue(targetValue, teamC?.lay);
          if (result) {
            return;
          }
          let teamCRateDecimal = teamC?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamCRateDecimal >= 0.5) {
            value = parseFloat(event.target.value) + 1;
          } else {
            value = parseFloat(event.target.value) + 0.5;
          }

          setLocalTeamC((prev) => {
            const newBody = { ...prev, lay: value + 1, rate: value };
            dispatch(setTeamC(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamCRate(value);
          setLTeamCLayValue(value + 1);
          setLTeamARate("");
          setLTeamALayValue("");
          setLTeamBRate("");
          setLTeamBLayValue("");
        }
      } else {
        if (event.target.name === "teamA_rate") {
          let value = Math.round(teamA?.rate) + incGap;

          setLocalTeamA((prev) => {
            const newBody = {
              ...prev,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 1,
            };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamARate(value ? value : 1);
          setLTeamALayValue(value ? value + incGap : incGap);
          setLTeamBRate("");
          setLTeamBLayValue("");
        } else if (event.target.name === "teamB_rate") {
          let value = Math.round(teamB?.rate) + incGap;

          setLocalTeamB((prev) => {
            const newBody = {
              ...prev,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 1,
            };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });
          setLTeamBRate(value ? value : 1);
          setLTeamBLayValue(value ? value + incGap : incGap);
          setLTeamARate("");
          setLTeamALayValue("");
        } else if (event.target.name === "teamC_rate") {
          let value = Math.round(teamC?.rate) + incGap;

          setLocalTeamC((prev) => {
            const newBody = {
              ...prev,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 1,
            };
            dispatch(setTeamC(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });
          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamCRate(value ? value : 1);
          setLTeamCLayValue(value ? value + incGap : incGap);
          setLTeamARate("");
          setLTeamALayValue("");
          setLTeamBRate("");
          setLTeamBLayValue("");
        }
      }
    }
    if (key == "minus") {
      handleSuspend(targetValue, teamA?.lay ? teamA?.lay : teamA?.rate);
      if (incGap != 5) {
        setIncGap(1);
        if (event.target.name === "teamA_rate") {
          let result = handleZeroValue(targetValue, teamA?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = teamA?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamARateDecimal >= 0.5) {
            value = parseFloat(event.target.value) - 1;
          } else {
            value = parseFloat(event.target.value) - 0.5;
          }

          setLocalTeamA((prev) => {
            const newBody = { ...prev, rate: value, lay: value + 1 };
            dispatch(setTeamA(newBody));
            return newBody;
          });
          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamARate(value);
          setLTeamALayValue(value + 1);
          setLTeamBRate("");
          setLTeamBLayValue("");
        } else if (event.target.name === "teamB_rate") {
          let result = handleZeroValue(targetValue, teamB?.lay);
          if (result) {
            return;
          }
          let teamBRateDecimal = teamB?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamBRateDecimal >= 0.5) {
            value = parseFloat(event.target.value) - 1;
          } else {
            value = parseFloat(event.target.value) - 0.5;
          }

          setLocalTeamB((prev) => {
            const newBody = { ...prev, rate: value, lay: value + 1 };
            dispatch(setTeamB(newBody));
            return newBody;
          });
          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLTeamBRate(value);
          setLTeamBLayValue(value + 1);
          setLTeamARate("");
          setLTeamALayValue("");
        } else if (event.target.name === "teamC_rate") {
          let result = handleZeroValue(targetValue, teamC?.lay);
          if (result) {
            return;
          }
          let teamCRateDecimal = teamC?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamCRateDecimal >= 0.5) {
            value = parseFloat(event.target.value) - 1;
          } else {
            value = parseFloat(event.target.value) - 0.5;
          }

          setLocalTeamC((prev) => {
            const newBody = { ...prev, rate: value, lay: value + 1 };
            dispatch(setTeamC(newBody));
            return newBody;
          });
          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamCRate(value);
          setLTeamCLayValue(value + 1);
          setLTeamARate("");
          setLTeamALayValue("");
          setLTeamBRate("");
          setLTeamBLayValue("");
        }
      } else {
        if (event.target.name === "teamA_rate" && event.target.value >= 5) {
          let result = handleZeroValue(targetValue, teamA?.lay);
          if (result) {
            return;
          }
          let value = Math.round(teamA?.rate) - incGap;

          setLocalTeamA((prev) => {
            const newBody = {
              ...prev,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 0,
            };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamARate(value ? value : 0);
          setLTeamALayValue(value ? value + incGap : incGap);
          setLTeamBRate("");
          setLTeamBLayValue("");
        } else if (
          event.target.name === "teamB_rate" &&
          event.target.value >= 5
        ) {
          let result = handleZeroValue(targetValue, teamB?.lay);
          if (result) {
            return;
          }
          let value = Math.round(teamB?.rate) - incGap;

          setLocalTeamB((prev) => {
            const newBody = {
              ...prev,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 0,
            };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });

          setLTeamBRate(value ? value : 0);
          setLTeamBLayValue(value ? value + incGap : incGap);

          setLTeamARate("");
          setLTeamALayValue("");
        } else if (
          event.target.name === "teamC_rate" &&
          event.target.value >= 5
        ) {
          let result = handleZeroValue(targetValue, teamC?.lay);
          if (result) {
            return;
          }
          let value = Math.round(teamC?.rate) - incGap;

          setLocalTeamC((prev) => {
            const newBody = {
              ...prev,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 0,
            };
            dispatch(setTeamC(newBody));
            return newBody;
          });

          setLocalTeamA((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamA(newBody));
            return newBody;
          });
          setLocalTeamB((prev) => {
            const newBody = { ...prev, lay: "", rate: "" };
            dispatch(setTeamB(newBody));
            return newBody;
          });

          setLTeamCRate(value ? value : 0);
          setLTeamCLayValue(value ? value + incGap : incGap);

          setLTeamARate("");
          setLTeamALayValue("");
          setLTeamBRate("");
          setLTeamBLayValue("");
        }
      }
    }
    if (key == "/") {
      handleSuspend();
      setIncGap(5);
      if (event.target.name === "teamA_rate") {
        let value = event.target.value ? targetValue : 0;

        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: value + 5, rate: value };
          dispatch(setTeamA(newBody));
          return newBody;
        });
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamARate(value);
        setLTeamALayValue(value + 5);
        setLTeamBRate("");
        setLTeamBLayValue("");
      } else if (event.target.name === "teamB_rate") {
        let value = event.target.value ? targetValue : 0;
        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: value + 5, rate: value };
          dispatch(setTeamB(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLTeamBRate(value);
        setLTeamBLayValue(value + 5);
        setLTeamARate("");
        setLTeamALayValue("");
      } else if (event.target.name === "teamC_rate") {
        let value = event.target.value ? targetValue : 0;

        setLocalTeamC((prev) => {
          const newBody = { ...prev, lay: value + 5, rate: value };
          dispatch(setTeamC(newBody));
          return newBody;
        });
        setLocalTeamA((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamA(newBody));
          return newBody;
        });

        setLocalTeamB((prev) => {
          const newBody = { ...prev, lay: "", rate: "" };
          dispatch(setTeamB(newBody));
          return newBody;
        });

        setLTeamCRate(value);
        setLTeamCLayValue(value + 5);
        setLTeamARate("");
        setLTeamALayValue("");
        setLTeamBRate("");
        setLTeamBLayValue("");
      }
    }
  };

  console.log(isTab, "isTab");

  return (
    <>
      <style jsx="true" scoped>
        {`
          .InputChild input {
            text-align: center;
          }
        `}
      </style>
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
          paddingX: 0.2,
          paddingTop: 0.2,
          background: "white",
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
            {currentBookmaker}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <BookButton rate={bookRatioA(teamRates?.teamA, teamRates?.teamB)} />
          <BookButton rate={bookRatioB(teamRates?.teamA, teamRates?.teamB)} />
        </Box>
      </Box>
      <Box sx={{ border: "2px solid #FFFFFF" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}></Box>
          <Box
            sx={{
              background: "#00C0F9",
              width: "20%",
              borderLeft: "2px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
              Back
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#FF9292",
              width: "20%",
              borderLeft: "2px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
              Lay
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{ background: "#FFFFFF", width: "60%", position: "relative" }}
          >
            {!add && (
              <Box
                sx={{
                  width: "35%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  left: "30%",
                  top: "1px",
                  background: "black",
                }}
              >
                <img
                  src={BALLSTART}
                  style={{
                    width: "80%",
                    height: "30%",
                    position: "absolute",
                    zIndex: 3,
                  }}
                />
              </Box>
            )}
            <Box
              sx={{
                borderWidth: 0,
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                width: "100%",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
              >
                {match?.teamA}
              </Typography>
              <Box
                sx={{
                  width: "180px",
                  // my: "5px",
                  marginRight: "15px",
                  border: "1px solid #2626264D",
                  borderRadius: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "50px",
                  background: "#F6F6F6",
                  borderRadius: "7px",
                  zIndex: 100,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: teamRates?.teamA <= 0 ? "#FF4D4D" : "#46e080",
                  }}
                >
                  {teamRates?.teamA}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "30%",
                  borderTop: "1px solid white",
                }}
              >
                <KeyboardEventHandler
                  handleKeys={[
                    "d",
                    "a",
                    "w",
                    "z",
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
                    className="InputChild"
                    onChange={handleChange}
                    name={"teamA_rate"}
                    inputRef={innerRefTeamA}
                    onFocus={() => handleFocus(innerRefTeamA)}
                    type="number"
                    variant="standard"
                    value={l_teamARate}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        height: "55px",
                        width: "98%",
                        background: "#F6F6F6",
                        // border: '1px solid #2626264D',
                        // borderRadius: '4px',
                        // border: "0.5px solid white",
                        alignSelf: "flex-end",
                        textAlign: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        color: "#319E5B",
                        fontWeight: "600",
                        backgroundColor: "#A7DCFF",
                      },
                    }}
                  />
                </KeyboardEventHandler>
                <TextField
                  className="InputChild"
                  disabled
                  // onChange={(e) => handleChange(e)}
                  variant="standard"
                  value={l_teamALayValue}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      height: "55px",
                      width: "97%",
                      background: "#F6F6F6",
                      // border: '1px solid #2626264D',
                      // borderRadius: '4px',
                      // border: "0.5px solid white",
                      alignSelf: "flex-end",
                      textAlign: "center",
                      alignItems: "center",
                      paddingX: "2px",
                      color: "#319E5B",
                      fontWeight: "600",
                      backgroundColor: "#FFB5B5",
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                border: ".2px solid #2626264D",
                borderBottomWidth: 0,
                alignItems: "center",
                display: "flex",
                paddingLeft: "10px",
                borderRightWidth: 0,
                paddingLeft: "10px",
                borderLeftWidth: 0,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
              >
                {match?.teamB}
              </Typography>
              <Box
                sx={{
                  width: "180px",
                  marginRight: "15px",
                  border: "1px solid #2626264D",
                  borderRadius: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "50px",
                  background: "#F6F6F6",
                  borderRadius: "7px",
                  zIndex: 100,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: teamRates?.teamB <= 0 ? "#FF4D4D" : "#319E5B",
                  }}
                >
                  {teamRates?.teamB}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "30%",
                  borderTop: "2px solid white",
                }}
              >
                <KeyboardEventHandler
                  handleKeys={[
                    "d",
                    "a",
                    "w",
                    "z",
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
                    className="InputChild"
                    variant="standard"
                    value={l_teamBRate}
                    onChange={handleChange}
                    name={"teamB_rate"}
                    inputRef={innerRefTeamB}
                    type="number"
                    onFocus={() => handleFocus(innerRefTeamB)}
                    // onChange={(i) => setValue2(i.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        height: "55px",
                        width: "98%",
                        background: "#F6F6F6",
                        // border: '1px solid #2626264D',
                        // borderRadius: '4px',
                        // border: "0.5px solid white",
                        alignSelf: "flex-end",
                        textAlign: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        color: "#319E5B",
                        fontWeight: "600",
                        backgroundColor: "#A7DCFF",
                      },
                    }}
                  />
                </KeyboardEventHandler>
                <TextField
                  className="InputChild"
                  variant="standard"
                  disabled
                  value={l_teamBLayValue}
                  // onChange={(i) => setTeamBLayValue(i.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      height: "55px",
                      width: "97%",
                      background: "#F6F6F6",
                      // border: '1px solid #2626264D',
                      // borderRadius: '4px',
                      // border: "0.5px solid white",
                      alignSelf: "flex-end",
                      textAlign: "center",
                      alignItems: "center",
                      paddingX: "2px",
                      color: "#319E5B",
                      fontWeight: "600",
                      backgroundColor: "#FFB5B5",
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>
            {match?.teamC && (
              <Box
                sx={{
                  border: ".2px solid #2626264D",
                  borderBottomWidth: 0,
                  alignItems: "center",
                  display: "flex",
                  paddingLeft: "10px",
                  borderRightWidth: 0,
                  paddingLeft: "10px",
                  borderLeftWidth: 0,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
                >
                  {match?.teamC}
                </Typography>
                <Box
                  sx={{
                    width: "180px",
                    marginRight: "15px",
                    border: "1px solid #2626264D",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "55px",
                    background: "#F6F6F6",
                    borderRadius: "7px",
                    zIndex: 100,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: teamRates?.teamC <= 0 ? "#FF4D4D" : "#46e080",
                    }}
                  >
                    {teamRates?.teamC}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "30%",
                    borderTop: "2px solid white",
                  }}
                >
                  <KeyboardEventHandler
                    handleKeys={[
                      "d",
                      "a",
                      "w",
                      "z",
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
                      className="InputChild"
                      variant="standard"
                      value={l_teamCRate}
                      onChange={handleChange}
                      name={"teamC_rate"}
                      inputRef={innerRefTeamC}
                      type="number"
                      onFocus={() => handleFocus(innerRefTeamC)}
                      // onChange={(i) => setValue2(i.target.value)}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          height: "55px",
                          width: "98%",
                          background: "#F6F6F6",
                          alignSelf: "flex-end",
                          textAlign: "center",
                          alignItems: "center",
                          paddingX: "2px",
                          color: "#319E5B",
                          fontWeight: "600",
                          backgroundColor: "#A7DCFF",
                        },
                      }}
                    />
                  </KeyboardEventHandler>
                  <TextField
                    className="InputChild"
                    variant="standard"
                    disabled
                    value={l_teamCLayValue}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        height: "55px",
                        width: "97%",
                        background: "#F6F6F6",
                        // border: '1px solid #2626264D',
                        // borderRadius: '4px',
                        // border: "0.5px solid white",
                        alignSelf: "flex-end",
                        textAlign: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        color: "#319E5B",
                        fontWeight: "600",
                        backgroundColor: "#FFB5B5",
                        textAlign: "center",
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ borderLeft: "2px solid white", width: "40%" }}>
            {localTeamBall?.isABall ? (
              <Box
                sx={{
                  borderTop: "2px solid white",
                  background: "rgba(0,0,0,1)",
                  height: match?.teamC ? "170px" : "112px",
                  right: 0,
                  // position: "absolute",
                  width: "100%",
                  // width: { laptop: "50%", mobile: "40.5%" },
                  justifyContent: { mobile: "center", laptop: "center" },
                  alignItems: "center",
                  display: "flex",
                  color: "#fff",
                }}
              >
                <img
                  src={BallStart}
                  style={{ width: "90px", height: "27px" }}
                />
              </Box>
            ) : (
              <>
                {/* {!teamBall?.isABall ?  */}
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  {!localTeamBackUnlock ? (
                    <Box
                      sx={{
                        background: localTeamBackUnlock ? "#FDF21A" : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localTeamBackUnlock ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localTeamBackUnlock ? 0 : teamA?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background: teamA?.suspended ? "#FDF21A" : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!teamA?.suspended ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {teamA?.suspended ? 0 : teamA?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                  {teamA?.layLock ? (
                    <Box
                      sx={{
                        background: teamA?.lay === null ? "#FDF21A" : "#FFB5B5",
                        width: "50%",
                        borderLeft: "2px solid white",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {teamA?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {teamA?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background:
                          teamA?.suspended || teamA?.lay === null
                            ? "#FDF21A"
                            : "#FFB5B5",
                        width: "50%",
                        borderLeft: "2px solid white",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!teamA?.suspended && teamA?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {teamA?.suspended ? 0 : teamA?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  {!localTeamBackUnlock ? (
                    <Box
                      sx={{
                        background: localTeamBackUnlock ? "#FDF21A" : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localTeamBackUnlock ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localTeamBackUnlock ? 0 : teamB?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background: teamB?.suspended ? "#FDF21A" : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!teamB?.suspended ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {teamB?.suspended ? 0 : teamB?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                  {teamB?.layLock ? (
                    <Box
                      sx={{
                        background: teamB?.lay === null ? "#FDF21A" : "#FFB5B5",
                        width: "50%",
                        borderLeft: "2px solid white",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {teamB?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {teamB?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background:
                          teamB?.suspended || teamB?.lay === null
                            ? "#FDF21A"
                            : "#FFB5B5",
                        width: "50%",
                        borderLeft: "2px solid white",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!teamB?.suspended && teamB?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {teamB?.suspended ? 0 : teamB?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
                {match?.teamC && (
                  <>
                    {/* {!teamBall?.isCBall ?  */}
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                      {!localTeamBackUnlock ? (
                        <Box
                          sx={{
                            background: localTeamBackUnlock
                              ? "#FDF21A"
                              : "#A7DCFF",
                            width: "50%",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!localTeamBackUnlock ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localTeamBackUnlock ? 0 : teamC?.rate}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: teamC?.suspended
                              ? "#FDF21A"
                              : "#A7DCFF",
                            width: "50%",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!teamC?.suspended ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {teamC?.suspended ? 0 : teamC?.rate}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      )}
                      {teamC?.layLock ? (
                        <Box
                          sx={{
                            background:
                              teamC?.lay === null ? "#FDF21A" : "#FFB5B5",
                            width: "50%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {teamC?.lay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {teamC?.lay}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background:
                              teamC?.suspended || teamC?.lay === null
                                ? "#FDF21A"
                                : "#FFB5B5",
                            width: "50%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!teamC?.suspended && teamC?.lay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {teamC?.suspended ? 0 : teamC?.lay}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          zIndex: 2,
          position: "relative",
          justifyContent: "center",
          width: "100%",
          marginTop: "2%",
          alignSelf: "center",
        }}
      >
        <Box sx={{ width: "2%" }}></Box>
        {betStatus === 2 ? (
          <Box
            onClick={(e) => {
              setVisible1(true);
              setVisible(false);
              e.stopPropagation();
            }}
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              background: "#FF4D4D",
              maxWidth: "150px",
              marginLeft: "5px",
              justifyContent: "center",
              alignItems: "center",
              height: "45px",
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
                left: "-120%",
              }}
            >
              {visible1 && (
                <ResultComponent
                  onClick={() => {
                    setVisible1(false);
                  }}
                  betId={[{ match_id: match?.id, id: betId }]}
                  teamA={match?.teamA}
                  teamB={match?.teamB}
                  tie={"Tie"}
                  draw={match?.teamC ? match?.teamC : ""}
                  betStatus={betStatus}
                />
              )}
            </Box>
          </Box>
        ) : (
          /* <Box sx={{ width: '2%' }} ></Box> */

          <Box
            onClick={(e) => {
              setVisible(true);
              setVisible1(false);
              e.stopPropagation();
            }}
            sx={{
              width: "100%",
              position: "relative",
              display: "flex",
              background: "white",
              marginLeft: "5px",
              maxWidth: "150px",
              justifyContent: "center",
              alignItems: "center",
              height: "45px",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{ color: "#0B4F26", fontWeight: "500", fontSize: "12px" }}
            >
              Declare
            </Typography>
            <Box
              sx={{
                position: "absolute",
                zIndex: 999,
                top: "40px",
                right: 0,
              }}
            >
              {visible && (
                <ResultComponent
                  onClick={() => {
                    setVisible(false);
                  }}
                  betId={[{ match_id: match?.id, id: betId }]}
                  teamA={match?.teamA}
                  teamB={match?.teamB}
                  tie={"Tie"}
                  draw={match?.teamC ? match?.teamC : ""}
                  betStatus={betStatus}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default memo(AddSession);
