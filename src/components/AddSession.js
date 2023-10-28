import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { memo } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { BALLSTART } from "../expert/assets";
import BookButtton from "./BookButton";
import BookButton from "./BookButton";
import { useLocation, useNavigate } from "react-router-dom";
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
  setQuickBookmaker,
  setSelectedBookmaker,
} from "../newStore/reducers/expertMatchDetails";

const AddSession = ({ add, match, Bid }) => {
  console.log("matchmatch", match);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const {
    bookmakerTeamRates,
    quickBookmaker,
    selectedBookmaker,
    declaredMatchDetail,
  } = useSelector((state) => state?.expertMatchDetails);
  // const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);
  // console.log('match', match)
  const { socket, socketMicro } = useContext(SocketContext);

  const { axios } = setRole();
  const dispatch = useDispatch();
  const [lQuickBookMaker, setLQuickBookMaker] = useState({
    l_teamARate: "",
    l_teamALayValue: "",
    l_teamBRate: "",
    l_teamBLayValue: "",
    l_teamCRate: "",
    l_teamCLayValue: "",
  });
  const [incGap, setIncGap] = useState(1);
  const navigate = useNavigate();
  const [pressEnter, setPressEnter] = useState(false);

  const [isTab, setIsTab] = useState("");
  const innerRefTeamA = useRef();
  const innerRefTeamB = useRef();
  const innerRefTeamC = useRef();
  const [localQuickBookmaker, setLocalQuickBookmaker] = useState({
    teamA: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamB: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamC: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamBall: {
      isABall: false,
      isBBall: false,
      isCBall: false,
    },
    teamSuspended: {
      teamA_suspend: true,
      teamB_suspend: true,
      teamC_suspend: true,
    },
    teamBackUnlock: true,
  });

  const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);

  //sddddddd

  const [teamRates, setTeamRates] = useState({
    teamA: bookmakerTeamRates?.teamA,
    teamB: bookmakerTeamRates?.teamB,
    teamC: bookmakerTeamRates?.teamC,
  });
  const [localBookMakerRates, setLocalBookMakerRates] = useState([]);
  const [localSelectedBookmaker, setLocalSelectedBookmaker] = useState(null);

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
    if (quickBookmaker) {
      setLocalQuickBookmaker(quickBookmaker);
    }

    if (selectedBookmaker) {
      setLocalSelectedBookmaker(selectedBookmaker);
    }
  }, [
    bookmakerTeamRates,
    bookMakerBetRates,
    quickBookmaker,
    selectedBookmaker,
  ]);

  useEffect(() => {
    if (
      declaredMatchDetail?.match_id === selectedBookmaker?.matchId &&
      declaredMatchDetail?.sessionBet === false
    ) {
      navigate("/expert/match");
    }
  }, [declaredMatchDetail]);

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
        const body = {
          matchId: response?.data?.data?.match_id,
          id: response?.data?.data?.id,
          betId: response?.data?.data?.bet_id,
          marketType: response?.data?.data?.marketType,
          marketName: response?.data?.data?.marketName,
          betStatus: response?.data?.data.betStatus,
        };
        setLocalSelectedBookmaker(body);
        dispatch(setSelectedBookmaker(body));
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              rate: response?.data?.data.teamA_Back,
              lock: response?.data?.data?.teamA_suspend,
              suspended: response?.data?.data.teamA_suspend,
              lay: response?.data?.data?.teamA_lay,
            },
            teamB: {
              rate: response?.data?.data.teamB_Back,
              lock: response?.data?.data.teamB_suspend,
              suspended: response?.data?.data.teamB_suspend,
              lay: response?.data?.data?.teamB_lay,
            },
            teamC: {
              rate: response?.data?.data.teamC_Back,
              lock: response?.data?.data.teamC_suspend,
              suspended: response?.data?.data.teamC_suspend,
              lay: response?.data?.data?.teamC_lay,
            },
            teamSuspended: {
              teamA_suspend: response?.data?.data.teamA_suspend ? true : false,
              teamB_suspend: response?.data?.data.teamB_suspend ? true : false,
              teamC_suspend: response?.data?.data.teamC_suspend ? true : false,
            },
          };

          setLQuickBookMaker((prev) => {
            const newBody = {
              ...prev,
              l_teamARate: response?.data?.data.teamA_Back ?? "",
              l_teamALayValue: response?.data?.data?.teamA_lay ?? "",
              l_teamBRate: response?.data?.data.teamA_Back ?? "",
              l_teamBLayValue: response?.data?.data.teamA_Back ?? "",
              l_teamCRate: response?.data?.data.teamA_Back ?? "",
              l_teamCLayValue: response?.data?.data.teamA_Back ?? "",
            };
          });
          dispatch(setQuickBookmaker(newBody));
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
      const body = {
        match_id: response?.data?.match_id,
        id: response?.data?.data?.id,
        betId: response?.data?.data?.bet_id,
        marketType: response?.data?.data?.marketType,
        marketName: response?.data?.data?.marketName,
        betStatus: response?.data?.data.betStatus,
      };
      setLocalSelectedBookmaker(body);
      dispatch(setSelectedBookmaker(body));
      // setBetId(response?.data?.data?.id);
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

  const handleGap = (back, lay) => {
    if (incGap < 1) {
    } else {
      if (back <= 1 || lay > 98) {
        setIncGap(1);
      } else if (back && lay) {
        if (Math.abs(lay - back) > 5 && lay <= 96) {
          setIncGap(4);
        } else if (Math.abs(lay - back) > 2 && lay <= 98) {
          setIncGap(2);
        } else if (Math.abs(lay - back) == 2) {
          setIncGap(1);
        }
      }
    }
  };

  const handleSuspend = (back, lay) => {
    if (incGap < 1) {
    } else {
      if (back <= 1 || lay > 98) {
        setIncGap(1);
      } else if (back && lay) {
        if (Math.abs(lay - back) > 5 && lay <= 96) {
          setIncGap(4);
        } else if (Math.abs(lay - back) > 2 && lay <= 98) {
          setIncGap(2);
        } else if (Math.abs(lay - back) == 2) {
          setIncGap(1);
        }
      }
    }
    if (
      !localQuickBookmaker?.teamSuspended?.teamA_suspend ||
      !localQuickBookmaker?.teamSuspended?.teamB_suspend ||
      !localQuickBookmaker?.teamSuspended?.teamC_suspend
    ) {
      socket.emit("updateRate", {
        matchId: match?.id,
        betId: localSelectedBookmaker?.betId,
        id: Bid,
        teamA: match?.teamA,
        teamB: match?.teamB,
        teamC: match?.teamC,
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
        isSingle: true,
      });
    }
  };

  const handleChange = (event) => {
    setIsTab("");
    // handleSuspend();
    // if(event.target.value >=100){
    //   return
    // }
    let target = event.target;

    if (target.value < 100) {
      if (target.name === "teamA_rate") {
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: target.value },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: target?.value,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });

        if (target.value !== "") {
          let teamA_lay = parseInt(target.value) + 1;
          handleSuspend(target.value, teamA_lay);

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamALayValue: teamA_lay,
            };
          });

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: teamA_lay },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
        } else {
          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamALayValue: "",
            };
          });
        }
      } else if (target.name === "teamB_rate") {
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamB: { ...prev?.teamB, rate: target.value },
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamBRate: target.value,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
        if (target.value !== "") {
          let teamB_lay = parseInt(target.value) + 1;
          handleSuspend(target.value, teamB_lay);

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamB: { ...prev?.teamB, lay: teamB_lay },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamBLayValue: teamB_lay,
            };
          });
        } else {
          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamB: { ...prev?.teamB, lay: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamBLayValue: "",
            };
          });
        }
      } else if (target.name === "teamC_rate") {
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamC: { ...prev?.teamC, rate: target.value },
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamCRate: target.value,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
          };
        });
        if (target.value !== "") {
          let teamC_lay = parseInt(target.value) + 1;
          handleSuspend(target.value, teamC_lay);
          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamC: { ...prev?.teamC, lay: teamC_lay },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamCLayValue: teamC_lay,
            };
          });
        } else {
          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamC: { ...prev?.teamC, lay: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamCLayValue: "",
            };
          });
        }
      }
    }
  };

  const handleFocus = (event) => {};
  const handleHunderedValue = (back, lay) => {
    // alert(back)
    if (back >= 98.5) {
      return true;
    }
    if (lay >= 99.5) {
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
    if (key == "right") {
      handleSuspend();
      setIsTab("");
      let value = targetValue ? targetValue + incGap : incGap;
      setPressEnter(false);
      if (event.target.name === "teamA_rate") {
        let result = handleHunderedValue(
          targetValue,
          localQuickBookmaker?.teamA?.lay
        );
        if (result) {
          return;
        }

        let chckValue = localQuickBookmaker?.teamA?.lay
          ? localQuickBookmaker?.teamA?.lay
          : value;
        let l_chckValue = lQuickBookMaker?.l_teamALayValue
          ? lQuickBookMaker?.l_teamALayValue
          : value;
        handleSuspend(targetValue + incGap, l_chckValue + incGap);
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: value, lay: chckValue + incGap },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: l_chckValue + incGap,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (event.target.name === "teamB_rate") {
        let result = handleHunderedValue(
          targetValue,
          localQuickBookmaker?.teamB?.lay
        );
        if (result) {
          return;
        }

        let chckValue = localQuickBookmaker?.teamB?.lay
          ? localQuickBookmaker?.teamB?.lay
          : value;
        let l_chckValue = lQuickBookMaker?.l_teamBLayValue
          ? lQuickBookMaker?.l_teamBLayValue
          : value;
        handleSuspend(targetValue + incGap, l_chckValue + incGap);
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: value, lay: chckValue + incGap },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: l_chckValue + incGap,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (event.target.name === "teamC_rate") {
        let result = handleHunderedValue(
          targetValue,
          localQuickBookmaker?.teamC?.lay
        );
        if (result) {
          return;
        }
        let chckValue = localQuickBookmaker?.teamC?.lay
          ? localQuickBookmaker?.teamC?.lay
          : value;

        let l_chckValue = lQuickBookMaker?.l_teamCLayValue
          ? lQuickBookMaker?.l_teamCLayValue
          : value;
        handleSuspend(targetValue + incGap, l_chckValue + incGap);

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: value, lay: chckValue + incGap },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: l_chckValue + incGap,
          };
        });
      }
    } else if (key == "left") {
      handleSuspend();
      setIsTab("");
      let value = targetValue - incGap;
      if (value < 0) {
        return;
      }
      setPressEnter(false);
      if (
        event.target.name === "teamA_rate" &&
        lQuickBookMaker?.l_teamARate > 0
      ) {
        handleSuspend(
          targetValue - incGap,
          lQuickBookMaker?.l_teamALayValue - incGap
        );
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              rate: value,
              lay: localQuickBookmaker?.teamA?.lay
                ? localQuickBookmaker?.teamA?.lay - incGap
                : localQuickBookmaker?.teamA?.rate,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: lQuickBookMaker?.l_teamALayValue
              ? lQuickBookMaker?.l_teamALayValue - incGap
              : lQuickBookMaker?.l_teamARate,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (
        event.target.name === "teamB_rate" &&
        lQuickBookMaker?.l_teamBRate > 0
      ) {
        handleSuspend(
          targetValue - incGap,
          lQuickBookMaker?.l_teamBLayValue - incGap
        );
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: {
              ...prev?.teamB,
              rate: value,
              lay: localQuickBookmaker?.teamB?.lay
                ? localQuickBookmaker?.teamB?.lay - incGap
                : localQuickBookmaker?.teamB?.rate,
            },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: lQuickBookMaker?.l_teamBLayValue
              ? lQuickBookMaker?.l_teamBLayValue - incGap
              : lQuickBookMaker?.l_teamBRate,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (
        event.target.name === "teamC_rate" &&
        lQuickBookMaker?.l_teamBRate > 0
      ) {
        handleSuspend(
          targetValue - incGap,
          lQuickBookMaker?.l_teamCLayValue - incGap
        );
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: {
              ...prev?.teamC,
              rate: value,
              lay: localQuickBookmaker?.teamC?.lay
                ? localQuickBookmaker?.teamC?.lay - incGap
                : localQuickBookmaker?.teamC?.rate,
            },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: lQuickBookMaker?.l_teamCLayValue
              ? lQuickBookMaker?.l_teamCLayValue - incGap
              : lQuickBookMaker?.l_teamCRate,
          };
        });
      }
    } else if (key == "up") {
      handleSuspend();
      if (isTab == "tab") {
        setIsTab("");
      }
      setPressEnter(false);
      if (event.target.name === "teamA_rate") {
        let result = handleHunderedValue(
          targetValue,
          lQuickBookMaker?.l_teamALayValue
        );
        if (result) {
          return;
        }
        let value = localQuickBookmaker?.teamA?.lay
          ? localQuickBookmaker?.teamA?.lay
          : localQuickBookmaker?.teamA?.rate;
        let l_value = lQuickBookMaker?.l_teamALayValue
          ? lQuickBookMaker?.l_teamALayValue
          : lQuickBookMaker?.l_teamARate;
        handleSuspend(targetValue, l_value + 1);

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay:
                incGap < 1
                  ? value + incGap
                  : value === 0
                  ? 1
                  : value
                  ? value + 1
                  : NaN,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue:
              incGap < 1
                ? l_value + incGap
                : l_value === 0
                ? 1
                : l_value
                ? l_value + 1
                : NaN,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (event.target.name === "teamB_rate") {
        let result = handleHunderedValue(
          targetValue,
          lQuickBookMaker?.l_teamBLayValue
        );
        if (result) {
          return;
        }
        let value = localQuickBookmaker?.teamB?.lay
          ? localQuickBookmaker?.teamB?.lay
          : localQuickBookmaker?.teamB?.rate;
        let l_value = lQuickBookMaker?.l_teamBLayValue
          ? lQuickBookMaker?.l_teamBLayValue
          : lQuickBookMaker?.l_teamBRate;
        handleSuspend(targetValue, l_value + 1);
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: {
              ...prev?.teamB,
              lay:
                incGap < 1
                  ? value + incGap
                  : value === 0
                  ? 1
                  : value
                  ? value + 1
                  : NaN,
            },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBLayValue:
              incGap < 1
                ? l_value + incGap
                : l_value === 0
                ? 1
                : l_value
                ? l_value + 1
                : NaN,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (event.target.name === "teamC_rate") {
        let result = handleHunderedValue(
          targetValue,
          lQuickBookMaker?.l_teamCLayValue
        );
        if (result) {
          return;
        }
        let value = localQuickBookmaker?.teamC?.lay
          ? localQuickBookmaker?.teamC?.lay
          : localQuickBookmaker?.teamC?.rate;
        let l_value = lQuickBookMaker?.l_teamCLayValue
          ? lQuickBookMaker?.l_teamCLayValue
          : lQuickBookMaker?.l_teamCRate;
        handleSuspend(targetValue, l_value + 1);

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: {
              ...prev?.teamC,
              lay:
                incGap < 1
                  ? value + incGap
                  : value === 0
                  ? 1
                  : value
                  ? value + 1
                  : NaN,
            },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCLayValue:
              incGap < 1
                ? l_value + incGap
                : l_value === 0
                ? 1
                : l_value
                ? l_value + 1
                : NaN,
          };
        });
      }
    } else if (key == "down") {
      handleSuspend();
      setPressEnter(false);
      setIsTab("");
      if (
        (event.target.name === "teamA_rate" &&
          lQuickBookMaker?.l_teamALayValue - 1 >
            lQuickBookMaker?.l_teamARate) ||
        lQuickBookMaker?.l_teamALayValue - incGap > lQuickBookMaker?.l_teamARate
      ) {
        handleSuspend(
          lQuickBookMaker?.l_teamARate,
          lQuickBookMaker?.l_teamALayValue - 1
        );
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: localQuickBookmaker?.teamA?.lay
                ? localQuickBookmaker?.teamA?.lay - 1
                : localQuickBookmaker?.teamA?.rate,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue:
              incGap < 1
                ? lQuickBookMaker?.l_teamALayValue - incGap
                : lQuickBookMaker?.l_teamALayValue
                ? lQuickBookMaker?.l_teamALayValue - 1
                : lQuickBookMaker?.l_teamARate,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (
        (event.target.name === "teamB_rate" &&
          lQuickBookMaker?.l_teamBLayValue - 1 >
            lQuickBookMaker?.l_teamBRate) ||
        lQuickBookMaker?.l_teamBLayValue - incGap > lQuickBookMaker?.l_teamBRate
      ) {
        handleSuspend(
          lQuickBookMaker?.l_teamBRate,
          lQuickBookMaker?.l_teamBLayValue - 1
        );
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: {
              ...prev?.teamB,
              lay: localQuickBookmaker?.teamB?.lay
                ? localQuickBookmaker?.teamB?.lay - 1
                : localQuickBookmaker?.teamB?.rate,
            },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue: "",
            l_teamARate: "",
            l_teamBLayValue:
              incGap < 1
                ? lQuickBookMaker?.l_teamBLayValue - incGap
                : lQuickBookMaker?.l_teamBLayValue
                ? lQuickBookMaker?.l_teamBLayValue - 1
                : lQuickBookMaker?.l_teamBRate,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (
        (event.target.name === "teamC_rate" &&
          lQuickBookMaker?.l_teamCLayValue - 1 >
            lQuickBookMaker?.l_teamCRate) ||
        lQuickBookMaker?.l_teamCLayValue - incGap > lQuickBookMaker?.l_teamCRate
      ) {
        handleSuspend(
          lQuickBookMaker?.l_teamCRate,
          lQuickBookMaker?.l_teamCLayValue - 1
        );
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: {
              ...prev?.teamC,
              lay: localQuickBookmaker?.teamC?.lay
                ? localQuickBookmaker?.teamC?.lay - 1
                : localQuickBookmaker?.teamC?.rate,
            },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue: "",
            l_teamARate: "",
            l_teamBLayValue: "",
            l_teamBRate: "",
            l_teamCLayValue:
              incGap < 1
                ? lQuickBookMaker?.l_teamCLayValue - incGap
                : lQuickBookMaker?.l_teamCLayValue
                ? lQuickBookMaker?.l_teamCLayValue - 1
                : lQuickBookMaker?.l_teamCRate,
          };
        });
      }
    } else if (key == "d") {
      setIsTab("");
      let value = targetValue ? targetValue + incGap : incGap;
      setPressEnter(false);
      if (event.target.name === "teamA_rate") {
        let result = handleHunderedValue(
          targetValue,
          localQuickBookmaker?.teamA?.lay
        );
        if (result) {
          return;
        }

        let chckValue = localQuickBookmaker?.teamA?.lay
          ? localQuickBookmaker?.teamA?.lay
          : value;
        let l_chckValue = lQuickBookMaker?.l_teamALayValue
          ? lQuickBookMaker?.l_teamALayValue
          : value;
        handleGap(targetValue + incGap, l_chckValue + incGap);
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamA_lay: l_chckValue + incGap,
          teamA_Back: value,
          teamA_suspend: false,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: value, lay: chckValue + incGap },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: l_chckValue + incGap,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (event.target.name === "teamB_rate") {
        let result = handleHunderedValue(
          targetValue,
          localQuickBookmaker?.teamB?.lay
        );
        if (result) {
          return;
        }

        let chckValue = localQuickBookmaker?.teamB?.lay
          ? localQuickBookmaker?.teamB?.lay
          : value;
        let l_chckValue = lQuickBookMaker?.l_teamBLayValue
          ? lQuickBookMaker?.l_teamBLayValue
          : value;
        handleGap(targetValue + incGap, l_chckValue + incGap);
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamB_lay: l_chckValue + incGap,
          teamB_Back: value,
          teamB_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: value, lay: chckValue + incGap },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: l_chckValue + incGap,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (event.target.name === "teamC_rate") {
        let result = handleHunderedValue(
          targetValue,
          localQuickBookmaker?.teamC?.lay
        );
        if (result) {
          return;
        }
        let chckValue = localQuickBookmaker?.teamC?.lay
          ? localQuickBookmaker?.teamC?.lay
          : value;

        let l_chckValue = lQuickBookMaker?.l_teamCLayValue
          ? lQuickBookMaker?.l_teamCLayValue
          : value;
        handleGap(targetValue + incGap, l_chckValue + incGap);
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamC_lay: l_chckValue + incGap,
          teamC_Back: value,
          teamC_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: value, lay: chckValue + incGap },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: l_chckValue + incGap,
          };
        });
      }
    } else if (key == "a") {
      setIsTab("");
      let value = targetValue - incGap;
      if (value < 0) {
        return;
      }
      setPressEnter(false);
      if (
        event.target.name === "teamA_rate" &&
        lQuickBookMaker?.l_teamARate > 0
      ) {
        handleGap(
          targetValue - incGap,
          lQuickBookMaker?.l_teamALayValue - incGap
        );
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamA_lay: lQuickBookMaker?.l_teamALayValue
            ? lQuickBookMaker?.l_teamALayValue - incGap
            : lQuickBookMaker?.l_teamARate,
          teamA_Back: value,
          teamA_suspend: false,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              rate: value,
              lay: localQuickBookmaker?.teamA?.lay
                ? localQuickBookmaker?.teamA?.lay - incGap
                : localQuickBookmaker?.teamA?.rate,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });
        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: lQuickBookMaker?.l_teamALayValue
              ? lQuickBookMaker?.l_teamALayValue - incGap
              : lQuickBookMaker?.l_teamARate,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (
        event.target.name === "teamB_rate" &&
        lQuickBookMaker?.l_teamBRate > 0
      ) {
        handleGap(
          targetValue - incGap,
          lQuickBookMaker?.l_teamBLayValue - incGap
        );
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamB_lay: lQuickBookMaker?.l_teamBLayValue
            ? lQuickBookMaker?.l_teamBLayValue - incGap
            : lQuickBookMaker?.l_teamBRate,
          teamB_Back: value,
          teamB_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: {
              ...prev?.teamB,
              rate: value,
              lay: localQuickBookmaker?.teamB?.lay
                ? localQuickBookmaker?.teamB?.lay - incGap
                : localQuickBookmaker?.teamB?.rate,
            },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: lQuickBookMaker?.l_teamBLayValue
              ? lQuickBookMaker?.l_teamBLayValue - incGap
              : lQuickBookMaker?.l_teamBRate,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (
        event.target.name === "teamC_rate" &&
        lQuickBookMaker?.l_teamBRate > 0
      ) {
        handleGap(
          targetValue - incGap,
          lQuickBookMaker?.l_teamCLayValue - incGap
        );
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamC_lay: lQuickBookMaker?.l_teamCLayValue
            ? lQuickBookMaker?.l_teamCLayValue - incGap
            : lQuickBookMaker?.l_teamCRate,
          teamC_Back: value,
          teamC_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: {
              ...prev?.teamC,
              rate: value,
              lay: localQuickBookmaker?.teamC?.lay
                ? localQuickBookmaker?.teamC?.lay - incGap
                : localQuickBookmaker?.teamC?.rate,
            },
          };
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: lQuickBookMaker?.l_teamCLayValue
              ? lQuickBookMaker?.l_teamCLayValue - incGap
              : lQuickBookMaker?.l_teamCRate,
          };
        });
      }
    } else if (key == "w") {
      if (isTab == "tab") {
        setIsTab("");
      }
      setPressEnter(false);
      if (event.target.name === "teamA_rate") {
        let result = handleHunderedValue(
          targetValue,
          lQuickBookMaker?.l_teamALayValue
        );
        if (result) {
          return;
        }
        let value = localQuickBookmaker?.teamA?.lay
          ? localQuickBookmaker?.teamA?.lay
          : localQuickBookmaker?.teamA?.rate;
        let l_value = lQuickBookMaker?.l_teamALayValue
          ? lQuickBookMaker?.l_teamALayValue
          : lQuickBookMaker?.l_teamARate;
        handleGap(targetValue, l_value + 1);
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamA_lay:
            incGap < 1
              ? l_value + incGap
              : l_value === 0
              ? 1
              : l_value
              ? l_value + 1
              : NaN,
          teamA_Back: lQuickBookMaker?.l_teamARate,
          teamA_suspend: false,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay:
                incGap < 1
                  ? value + incGap
                  : value === 0
                  ? 1
                  : value
                  ? value + 1
                  : NaN,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue:
              incGap < 1
                ? l_value + incGap
                : l_value === 0
                ? 1
                : l_value
                ? l_value + 1
                : NaN,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (event.target.name === "teamB_rate") {
        let result = handleHunderedValue(
          targetValue,
          lQuickBookMaker?.l_teamBLayValue
        );
        if (result) {
          return;
        }
        let value = localQuickBookmaker?.teamB?.lay
          ? localQuickBookmaker?.teamB?.lay
          : localQuickBookmaker?.teamB?.rate;
        let l_value = lQuickBookMaker?.l_teamBLayValue
          ? lQuickBookMaker?.l_teamBLayValue
          : lQuickBookMaker?.l_teamBRate;
        handleGap(targetValue, l_value + 1);
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamB_lay:
            incGap < 1
              ? l_value + incGap
              : l_value === 0
              ? 1
              : l_value
              ? l_value + 1
              : NaN,
          teamB_Back: lQuickBookMaker?.l_teamBRate,
          teamB_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: {
              ...prev?.teamB,
              lay:
                incGap < 1
                  ? value + incGap
                  : value === 0
                  ? 1
                  : value
                  ? value + 1
                  : NaN,
            },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBLayValue:
              incGap < 1
                ? l_value + incGap
                : l_value === 0
                ? 1
                : l_value
                ? l_value + 1
                : NaN,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (event.target.name === "teamC_rate") {
        let result = handleHunderedValue(
          targetValue,
          lQuickBookMaker?.l_teamCLayValue
        );
        if (result) {
          return;
        }
        let value = localQuickBookmaker?.teamC?.lay
          ? localQuickBookmaker?.teamC?.lay
          : localQuickBookmaker?.teamC?.rate;
        let l_value = lQuickBookMaker?.l_teamCLayValue
          ? lQuickBookMaker?.l_teamCLayValue
          : lQuickBookMaker?.l_teamCRate;
        handleGap(targetValue, l_value + 1);
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamC_lay:
            incGap < 1
              ? l_value + incGap
              : l_value === 0
              ? 1
              : l_value
              ? l_value + 1
              : NaN,
          teamC_Back: lQuickBookMaker?.l_teamCRate,
          teamC_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: {
              ...prev?.teamC,
              lay:
                incGap < 1
                  ? value + incGap
                  : value === 0
                  ? 1
                  : value
                  ? value + 1
                  : NaN,
            },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCLayValue:
              incGap < 1
                ? l_value + incGap
                : l_value === 0
                ? 1
                : l_value
                ? l_value + 1
                : NaN,
          };
        });
      }
    } else if (key == "z") {
      setPressEnter(false);
      setIsTab("");
      if (
        (event.target.name === "teamA_rate" &&
          lQuickBookMaker?.l_teamALayValue - 1 >
            lQuickBookMaker?.l_teamARate) ||
        lQuickBookMaker?.l_teamALayValue - incGap > lQuickBookMaker?.l_teamARate
      ) {
        handleGap(
          lQuickBookMaker?.l_teamARate,
          lQuickBookMaker?.l_teamALayValue - 1
        );
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamA_lay: lQuickBookMaker?.l_teamALayValue
            ? lQuickBookMaker?.l_teamALayValue - 1
            : lQuickBookMaker?.l_teamALayValue,
          teamA_Back: lQuickBookMaker?.l_teamARate,
          teamA_suspend: false,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: localQuickBookmaker?.teamA?.lay
                ? localQuickBookmaker?.teamA?.lay - 1
                : localQuickBookmaker?.teamA?.rate,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue:
              incGap < 1
                ? lQuickBookMaker?.l_teamALayValue - incGap
                : lQuickBookMaker?.l_teamALayValue
                ? lQuickBookMaker?.l_teamALayValue - 1
                : lQuickBookMaker?.l_teamARate,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }

      if (
        (event.target.name === "teamB_rate" &&
          lQuickBookMaker?.l_teamBLayValue - 1 >
            lQuickBookMaker?.l_teamBRate) ||
        lQuickBookMaker?.l_teamBLayValue - incGap > lQuickBookMaker?.l_teamBRate
      ) {
        handleGap(
          lQuickBookMaker?.l_teamBRate,
          lQuickBookMaker?.l_teamBLayValue - 1
        );
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamB_lay: lQuickBookMaker?.l_teamBLayValue
            ? lQuickBookMaker?.l_teamBLayValue - 1
            : lQuickBookMaker?.l_teamBRate,
          teamB_Back: lQuickBookMaker?.l_teamBRate,
          teamB_suspend: false,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: {
              ...prev?.teamB,
              lay: localQuickBookmaker?.teamB?.lay
                ? localQuickBookmaker?.teamB?.lay - 1
                : localQuickBookmaker?.teamB?.rate,
            },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue: "",
            l_teamARate: "",
            l_teamBLayValue:
              incGap < 1
                ? lQuickBookMaker?.l_teamBLayValue - incGap
                : lQuickBookMaker?.l_teamBLayValue
                ? lQuickBookMaker?.l_teamBLayValue - 1
                : lQuickBookMaker?.l_teamBRate,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      }
      if (
        (event.target.name === "teamC_rate" &&
          lQuickBookMaker?.l_teamCLayValue - 1 >
            lQuickBookMaker?.l_teamCRate) ||
        lQuickBookMaker?.l_teamCLayValue - incGap > lQuickBookMaker?.l_teamCRate
      ) {
        handleGap(
          lQuickBookMaker?.l_teamCRate,
          lQuickBookMaker?.l_teamCLayValue - 1
        );
        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamC_lay: lQuickBookMaker?.l_teamCLayValue
            ? lQuickBookMaker?.l_teamCLayValue - 1
            : lQuickBookMaker?.l_teamCRate,
          teamC_Back: lQuickBookMaker?.l_teamCRate,
          teamC_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          layLock: false,
          isSingle: true,
        });
        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: {
              ...prev?.teamC,
              lay: localQuickBookmaker?.teamC?.lay
                ? localQuickBookmaker?.teamC?.lay - 1
                : localQuickBookmaker?.teamC?.rate,
            },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamALayValue: "",
            l_teamARate: "",
            l_teamBLayValue: "",
            l_teamBRate: "",
            l_teamCLayValue:
              incGap < 1
                ? lQuickBookMaker?.l_teamCLayValue - incGap
                : lQuickBookMaker?.l_teamCLayValue
                ? lQuickBookMaker?.l_teamCLayValue - 1
                : lQuickBookMaker?.l_teamCRate,
          };
        });
      }
    } else if (key == "`") {
      handleSuspend();
      setIsTab("");
      if (match?.teamC) {
        if (event.target.name === "teamA_rate") {
          innerRefTeamB.current.focus();
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        } else if (event.target.name === "teamB_rate") {
          innerRefTeamC.current.focus();
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: "",
              l_teamBLayValue: "",
            };
          });
        } else if (event.target.name === "teamC_rate") {
          innerRefTeamA.current.focus();
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        }
      } else {
        if (event.target.name === "teamA_rate") {
          innerRefTeamB.current.focus();
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamBRate: "",
              l_teamARate: "",
              l_teamALayValue: "",
            };
          });
        } else if (event.target.name === "teamB_rate") {
          innerRefTeamA.current.focus();
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamBRate: "",
              l_teamBLayValue: "",
            };
          });
        }
      }
    } else if (key == "enter" || key == "return") {
      if (isTab == "tab") {
        handleSuspend();
        let data = {};
        if (match?.teamC) {
          data = {
            id: Bid,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            matchId: match?.id,
            betId: localSelectedBookmaker?.betId,
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
            isSingle: false,
          };
        } else {
          data = {
            id: Bid,
            matchId: match?.id,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            betId: localSelectedBookmaker?.betId,
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
            isSingle: false,
          };
        }
        // alert(JSON.stringify(data));
        socket.emit("updateRate", data);
      } else {
        if (event.target.name === "teamA_rate") {
          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            betId: localSelectedBookmaker?.betId,
            teamA_lay: lQuickBookMaker?.l_teamALayValue,
            teamA_Back: lQuickBookMaker?.l_teamARate,
            teamA_suspend:
              [null, ""].includes(lQuickBookMaker?.l_teamALayValue) ||
              [null, ""].includes(lQuickBookMaker?.l_teamARate)
                ? true
                : false,
            teamB_lay: "",
            teamB_Back: "",
            teamB_suspend: true,
            teamC_lay: "",
            teamC_Back: "",
            teamC_suspend: true,
            layLock: false,
            isSingle: true,
          });
        }
        if (event.target.name === "teamB_rate") {
          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            betId: localSelectedBookmaker?.betId,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            teamA_lay: "",
            teamA_Back: "",
            teamA_suspend: true,
            teamB_lay: lQuickBookMaker?.l_teamBLayValue,
            teamB_Back: lQuickBookMaker?.l_teamBRate,
            teamB_suspend:
              [null, ""].includes(lQuickBookMaker?.l_teamBLayValue) ||
              [null, ""].includes(lQuickBookMaker?.l_teamBRate)
                ? true
                : false,
            teamC_lay: "",
            teamC_Back: "",
            teamC_suspend: true,
            layLock: false,
            isSingle: true,
          });
        }
        if (event.target.name === "teamC_rate") {
          socket.emit("updateRate", {
            matchId: match?.id,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            id: Bid,
            betId: localSelectedBookmaker?.betId,
            teamA_lay: "",
            teamA_Back: "",
            teamA_suspend: true,
            teamB_lay: "",
            teamB_Back: "",
            teamB_suspend: true,
            teamC_lay: lQuickBookMaker?.l_teamCLayValue,
            teamC_Back: lQuickBookMaker?.l_teamCRate,
            teamC_suspend:
              [null, ""].includes(lQuickBookMaker?.l_teamCLayValue) ||
              [null, ""].includes(lQuickBookMaker?.l_teamCRate)
                ? true
                : false,
            layLock: false,
            isSingle: true,
          });
        }
      }
      // setIsTab("");
    } else if (key == "tab") {
      // handleSuspend();
      setLocalQuickBookmaker((prev) => {
        const newBody = {
          ...prev,
          teamA: { ...prev?.teamA, lay: "", rate: targetValue },
          teamB: { ...prev?.teamB, lay: "", rate: targetValue },
          teamC: { ...prev?.teamC, lay: "", rate: targetValue },
        };
        // dispatch(setQuickBookmaker(newBody));
        return newBody;
      });

      setLQuickBookMaker((prev) => {
        return {
          ...prev,
          l_teamARate: targetValue,
          l_teamBRate: targetValue,
          l_teamCRate: targetValue,
          l_teamALayValue: "",
          l_teamBLayValue: "",
          l_teamCLayValue: "",
        };
      });

      socket.emit("updateRate", {
        matchId: match?.id,
        id: Bid,
        teamA: match?.teamA,
        teamB: match?.teamB,
        teamC: match?.teamC,
        betId: localSelectedBookmaker?.betId,
        teamA_lay: "",
        teamA_Back: targetValue,
        teamA_suspend: false,
        teamB_lay: "",
        teamB_Back: targetValue,
        teamB_suspend: false,
        teamC_lay: "",
        teamC_Back: targetValue,
        teamC_suspend: false,
        layLock: false,
        isSingle: true,
      });

      setIsTab("tab");
    }
    if (key == "*" || key == "l") {
      handleSuspend();
      setIsTab("");
      if (event.target.name === "teamA_rate") {
        let value = event.target.value ? targetValue + 0.5 : 0;

        setIncGap(0.25);

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: value + 0.5, rate: value },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: value + 0.5,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      } else if (event.target.name === "teamB_rate") {
        let value = event.target.value ? targetValue + 0.5 : 0;

        setIncGap(0.25);

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, lay: value + 0.5, rate: value },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: value + 0.5,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      } else if (event.target.name === "teamC_rate") {
        let value = event.target.value ? targetValue + 0.5 : 0;

        setIncGap(0.25);

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, lay: value + 0.5, rate: value },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: value + 0.5,
          };
        });
      }
    }
    if (key == "ctrl") {
      handleSuspend();
      setIncGap(1);
      setIsTab("");
    }
    if (key == "esc") {
      handleSuspend();
      setIncGap(1);
      setIsTab("");
      if (event.target.name === "teamA_rate") {
        let teamARateDecimal = lQuickBookMaker?.l_teamARate % 1; // get the decimal portion of the number
        let teamALayValueDecimal = lQuickBookMaker?.l_teamALayValue % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamARateDecimal >= 0.5) {
          value = Math.round(lQuickBookMaker?.l_teamARate) - 1;
        } else {
          value = Math.round(lQuickBookMaker?.l_teamARate);
        }
        if (teamALayValueDecimal >= 0.5) {
          layValue = Math.round(lQuickBookMaker?.l_teamALayValue);
        } else {
          layValue = Math.round(lQuickBookMaker?.l_teamALayValue);
        }

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: value + 1, rate: value },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: value + 1,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCLayValue: "",
            l_teamCRate: "",
          };
        });
      } else if (event.target.name === "teamB_rate") {
        let teamBRateDecimal = lQuickBookMaker?.l_teamBRate % 1; // get the decimal portion of the number
        let teamBLayValueDecimal = lQuickBookMaker?.l_teamBLayValue % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamBRateDecimal >= 0.5) {
          value = Math.round(lQuickBookMaker?.l_teamBRate) - 1;
        } else {
          value = Math.round(lQuickBookMaker?.l_teamBRate);
        }
        if (teamBLayValueDecimal >= 0.5) {
          layValue = Math.round(lQuickBookMaker?.l_teamBLayValue);
        } else {
          layValue = Math.round(lQuickBookMaker?.l_teamBLayValue);
        }

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
            teamB: { ...prev?.teamB, lay: value + 1, rate: value },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamBRate: value,
            l_teamBLayValue: value + 1,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamCLayValue: "",
            l_teamCRate: "",
          };
        });
      } else if (event.target.name === "teamC_rate") {
        let teamCRateDecimal = lQuickBookMaker?.l_teamCRate % 1; // get the decimal portion of the number
        let teamCLayValueDecimal = lQuickBookMaker?.l_teamCLayValue % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamCRateDecimal >= 0.5) {
          value = Math.round(lQuickBookMaker?.l_teamCRate) - 1;
        } else {
          value = Math.round(lQuickBookMaker?.l_teamCRate);
        }
        if (teamCLayValueDecimal >= 0.5) {
          layValue = Math.round(lQuickBookMaker?.l_teamCLayValue);
        } else {
          layValue = Math.round(lQuickBookMaker?.l_teamCLayValue);
        }

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamC: { ...prev?.teamC, lay: value + 1, rate: value },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamA: { ...prev?.teamA, lay: "", rate: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamCRate: value,
            l_teamCLayValue: value + 1,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamALayValue: "",
            l_teamARate: "",
          };
        });
      }
    }
    if (key == ".") {
      if (isTab == "tab") {
        handleSuspend();
        setIsTab("");
      }
      setIncGap(1);
      if (event.target.name === "teamA_rate") {
        // alert(checkLayValue)
        let teamARateDecimal = localQuickBookmaker?.teamA?.rate
          ? localQuickBookmaker?.teamA?.rate
          : targetValue % 1; // get the decimal portion of the number
        let teamALayValueDecimal = localQuickBookmaker?.teamA?.lay
          ? localQuickBookmaker?.teamA?.lay
          : targetValue % 1; // get the decimal portion of the number
        let value;
        let layValue;
        // alert(teamARateDecimal)
        if (teamARateDecimal >= 0.5) {
          value = localQuickBookmaker?.teamA?.rate
            ? Math.round(localQuickBookmaker?.teamA?.rate)
            : targetValue
            ? targetValue
            : 0;
        } else {
          value = localQuickBookmaker?.teamA?.rate
            ? Math.round(localQuickBookmaker?.teamA?.rate)
            : targetValue
            ? targetValue
            : 0;
        }
        if (teamALayValueDecimal >= 0.5) {
          layValue = localQuickBookmaker?.teamA?.lay
            ? Math.round(localQuickBookmaker?.teamA?.lay)
            : targetValue
            ? targetValue
            : 0;
        } else {
          layValue = localQuickBookmaker?.teamA?.lay
            ? Math.round(localQuickBookmaker?.teamA?.lay)
            : targetValue
            ? targetValue
            : 0;
        }

        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamA_lay: value + 1.5,
          teamA_Back: value,
          teamA_suspend: false,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: value + 1.5, rate: value },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: value + 1.5,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      } else if (event.target.name === "teamB_rate") {
        let teamBRateDecimal = localQuickBookmaker?.teamB?.rate % 1; // get the decimal portion of the number
        let teamBLayValueDecimal = localQuickBookmaker?.teamB?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamBRateDecimal >= 0.5) {
          value = localQuickBookmaker?.teamB?.rate
            ? Math.round(localQuickBookmaker?.teamB?.rate)
            : targetValue
            ? targetValue
            : 0;
        } else {
          value = localQuickBookmaker?.teamB?.rate
            ? Math.round(localQuickBookmaker?.teamB?.rate)
            : targetValue
            ? targetValue
            : 0;
        }
        if (teamBLayValueDecimal >= 0.5) {
          layValue = localQuickBookmaker?.teamB?.lay
            ? Math.round(localQuickBookmaker?.teamB?.lay)
            : targetValue
            ? targetValue
            : 0;
        } else {
          layValue = localQuickBookmaker?.teamB?.lay
            ? Math.round(localQuickBookmaker?.teamB?.lay)
            : targetValue
            ? targetValue
            : 0;
        }

        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamB_lay: value + 1.5,
          teamB_Back: value,
          teamB_suspend: false,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          teamC_lay: "",
          teamC_Back: "",
          teamC_suspend: true,
          layLock: false,
          isSingle: true,
        });

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, lay: value + 1.5, rate: value },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: value + 1.5,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      } else if (event.target.name === "teamC_rate") {
        let teamCRateDecimal = localQuickBookmaker?.teamC?.rate % 1; // get the decimal portion of the number
        let teamCLayValueDecimal = localQuickBookmaker?.teamC?.lay % 1; // get the decimal portion of the number
        let value;
        let layValue;
        if (teamCRateDecimal >= 0.5) {
          value = localQuickBookmaker?.teamC?.rate
            ? Math.round(localQuickBookmaker?.teamC?.rate)
            : targetValue
            ? targetValue
            : 0;
        } else {
          value = localQuickBookmaker?.teamC?.rate
            ? Math.round(localQuickBookmaker?.teamC?.rate)
            : targetValue
            ? targetValue
            : 0;
        }
        if (teamCLayValueDecimal >= 0.5) {
          layValue = localQuickBookmaker?.teamC?.lay
            ? Math.round(localQuickBookmaker?.teamC?.lay)
            : targetValue
            ? targetValue
            : 0;
        } else {
          layValue = localQuickBookmaker?.teamC?.lay
            ? Math.round(localQuickBookmaker?.teamC?.lay)
            : targetValue
            ? targetValue
            : 0;
        }

        socket.emit("updateRate", {
          matchId: match?.id,
          id: Bid,
          teamA: match?.teamA,
          teamB: match?.teamB,
          teamC: match?.teamC,
          betId: localSelectedBookmaker?.betId,
          teamC_lay: value + 1.5,
          teamC_Back: value,
          teamC_suspend: false,
          teamB_lay: "",
          teamB_Back: "",
          teamB_suspend: true,
          teamA_lay: "",
          teamA_Back: "",
          teamA_suspend: true,
          layLock: false,
          isSingle: true,
        });

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, lay: value + 1.5, rate: value },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: value + 1.5,
          };
        });
      }
    }
    if (key == ",") {
      if (isTab == "tab") {
        handleSuspend();
        setIsTab("");
      }
      setIncGap(1);
      if (event.target.name === "teamA_rate") {
        if (localQuickBookmaker?.teamA?.rate > 0.5 || targetValue > 0.5) {
          let teamARateDecimal = localQuickBookmaker?.teamA?.rate % 1; // get the decimal portion of the number
          let teamALayValueDecimal = localQuickBookmaker?.teamA?.lay % 1; // get the decimal portion of the number
          let value;
          let layValue;
          if (teamARateDecimal >= 0.5) {
            value = localQuickBookmaker?.teamA?.rate
              ? Math.round(localQuickBookmaker?.teamA?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          } else {
            value = localQuickBookmaker?.teamA?.rate
              ? Math.round(localQuickBookmaker?.teamA?.rate)
              : targetValue
              ? targetValue
              : 0;
          }
          if (teamALayValueDecimal >= 0.5) {
            layValue = localQuickBookmaker?.teamA?.rate
              ? Math.round(localQuickBookmaker?.teamA?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          } else {
            layValue = localQuickBookmaker?.teamA?.rate
              ? Math.round(localQuickBookmaker?.teamA?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          }

          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            betId: localSelectedBookmaker?.betId,
            teamC_lay: "",
            teamC_Back: "",
            teamC_suspend: true,
            teamB_lay: "",
            teamB_Back: "",
            teamB_suspend: true,
            teamA_lay: value + 1,
            teamA_Back: value - 0.5,
            teamA_suspend: false,
            layLock: false,
            isSingle: true,
          });

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: value + 1, rate: value - 0.5 },
              teamB: { ...prev?.teamB, rate: "", lay: "" },
              teamC: { ...prev?.teamC, lay: "", rate: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });
          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: value - 0.5,
              l_teamALayValue: value + 1,
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        }
      } else if (event.target.name === "teamB_rate") {
        if (localQuickBookmaker?.teamB?.rate > 0.5 || targetValue > 0.5) {
          let teamBRateDecimal = localQuickBookmaker?.teamB?.rate % 1; // get the decimal portion of the number
          let teamBLayValueDecimal = localQuickBookmaker?.teamB?.lay % 1; // get the decimal portion of the number
          let value;
          let layValue;
          if (teamBRateDecimal >= 0.5) {
            // value = Math.round(localQuickBookmaker?.teamB?.rate) - 1;
            value = localQuickBookmaker?.teamB?.rate
              ? Math.round(localQuickBookmaker?.teamB?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          } else {
            // value = Math.round(localQuickBookmaker?.teamB?.rate);
            value = localQuickBookmaker?.teamB?.rate
              ? Math.round(localQuickBookmaker?.teamB?.rate)
              : targetValue
              ? targetValue
              : 0;
          }

          if (teamBLayValueDecimal >= 0.5) {
            // layValue = Math.round(localQuickBookmaker?.teamB?.rate);
            layValue = localQuickBookmaker?.teamB?.rate
              ? Math.round(localQuickBookmaker?.teamB?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          } else {
            // layValue = Math.round(localQuickBookmaker?.teamB?.rate);
            layValue = localQuickBookmaker?.teamB?.rate
              ? Math.round(localQuickBookmaker?.teamB?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          }

          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            betId: localSelectedBookmaker?.betId,
            teamC_lay: "",
            teamC_Back: "",
            teamC_suspend: true,
            teamA_lay: "",
            teamA_Back: "",
            teamA_suspend: true,
            teamB_lay: value + 1,
            teamB_Back: value - 0.5,
            teamB_suspend: false,
            layLock: false,
            isSingle: true,
          });

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: "", rate: "" },
              teamB: { ...prev?.teamB, lay: value + 1, rate: value - 0.5 },
              teamC: { ...prev?.teamC, lay: "", rate: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: value - 0.5,
              l_teamBLayValue: value + 1,
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        }
      } else if (event.target.name === "teamC_rate") {
        if (localQuickBookmaker?.teamC?.rate > 0.5 || targetValue > 0.5) {
          let teamCRateDecimal = localQuickBookmaker?.teamC?.rate % 1; // get the decimal portion of the number
          let teamCLayValueDecimal = localQuickBookmaker?.teamC?.lay % 1; // get the decimal portion of the number
          let value;
          let layValue;

          if (teamCRateDecimal >= 0.5) {
            // value = Math.round(localQuickBookmaker?.teamC?.rate) - 1;
            value = localQuickBookmaker?.teamC?.rate
              ? Math.round(localQuickBookmaker?.teamC?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          } else {
            // value = Math.round(localQuickBookmaker?.teamC?.rate);
            value = localQuickBookmaker?.teamC?.rate
              ? Math.round(localQuickBookmaker?.teamC?.rate)
              : targetValue
              ? targetValue
              : 0;
          }

          if (teamCLayValueDecimal >= 0.5) {
            // layValue = Math.round(localQuickBookmaker?.teamC?.lay);
            layValue = localQuickBookmaker?.teamC?.rate
              ? Math.round(localQuickBookmaker?.teamC?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          } else {
            // layValue = Math.round(localQuickBookmaker?.teamC?.lay);
            layValue = localQuickBookmaker?.teamC?.rate
              ? Math.round(localQuickBookmaker?.teamC?.rate) //
              : targetValue
              ? targetValue //
              : 0;
          }

          socket.emit("updateRate", {
            matchId: match?.id,
            id: Bid,
            teamA: match?.teamA,
            teamB: match?.teamB,
            teamC: match?.teamC,
            betId: localSelectedBookmaker?.betId,
            teamB_lay: "",
            teamB_Back: "",
            teamB_suspend: true,
            teamA_lay: "",
            teamA_Back: "",
            teamA_suspend: true,
            teamC_lay: value + 1,
            teamC_Back: value - 0.5,
            teamC_suspend: false,
            layLock: false,
            isSingle: true,
          });

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, rate: "", lay: "" },
              teamB: { ...prev?.teamB, rate: "", lay: "" },
              teamC: { ...prev?.teamC, lay: value + 1, rate: value - 0.5 },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: value - 0.5,
              l_teamCLayValue: value + 1,
            };
          });
        }
      }
    }
    if (key == "shift") {
      socket.emit("updateRate", {
        matchId: match?.id,
        id: Bid,
        betId: localSelectedBookmaker?.betId,
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
    // if (key == "plus") {
    //   if (isTab == "tab") {
    //     handleSuspend();
    //     setIsTab("");
    //   }
    //   if (incGap != 5) {
    //     setIncGap(1);
    //     if (event.target.name === "teamA_rate") {
    //       let result = handleHunderedValue(
    //         targetValue,
    //         localQuickBookmaker?.teamA?.lay
    //       );
    //       if (result) {
    //         return;
    //       }
    //       let teamARateDecimal = localQuickBookmaker?.teamA?.rate % 1; // get the decimal portion of the number
    //       let value;
    //       if (teamARateDecimal >= 0.5) {
    //         value = parseFloat(event.target.value) + 1;
    //       } else {
    //         value = parseFloat(event.target.value) + 0.5;
    //       }

    //       if (!value) {
    //         return;
    //       }

    //       socket.emit("updateRate", {
    //         matchId: match?.id,
    //         id: Bid,
    //         teamA: match?.teamA,
    //         teamB: match?.teamB,
    //         teamC: match?.teamC,
    //         betId: localSelectedBookmaker?.betId,
    //         teamA_lay: value + 1,
    //         teamA_Back: value,
    //         teamA_suspend: false,
    //         teamB_lay: "",
    //         teamB_Back: "",
    //         teamB_suspend: true,
    //         teamC_lay: "",
    //         teamC_Back: "",
    //         teamC_suspend: true,
    //         layLock: false,
    //         isSingle: true,
    //       });
    //       setLocalQuickBookmaker((prev) => {
    //         const newBody = {
    //           ...prev,
    //           teamA: { ...prev?.teamA, lay: value + 1, rate: value },
    //           teamB: { ...prev?.teamB, rate: "", lay: "" },
    //           teamC: { ...prev?.teamC, lay: "", rate: "" },
    //         };
    //         // dispatch(setQuickBookmaker(newBody));
    //         return newBody;
    //       });

    //       setLQuickBookMaker((prev) => {
    //         return {
    //           ...prev,
    //           l_teamARate: value,
    //           l_teamALayValue: value + 1,
    //           l_teamBRate: "",
    //           l_teamBLayValue: "",
    //           l_teamCRate: "",
    //           l_teamCLayValue: "",
    //         };
    //       });
    //     } else if (event.target.name === "teamB_rate") {
    //       let result = handleHunderedValue(
    //         targetValue,
    //         localQuickBookmaker?.teamB?.lay
    //       );
    //       if (result) {
    //         return;
    //       }
    //       let teamBRateDecimal = localQuickBookmaker?.teamB?.rate % 1; // get the decimal portion of the number
    //       let value;
    //       if (teamBRateDecimal >= 0.5) {
    //         value = parseFloat(event.target.value) + 1;
    //       } else {
    //         value = parseFloat(event.target.value) + 0.5;
    //       }

    //       if (!value) {
    //         return;
    //       }

    //       socket.emit("updateRate", {
    //         matchId: match?.id,
    //         id: Bid,
    //         teamA: match?.teamA,
    //         teamB: match?.teamB,
    //         teamC: match?.teamC,
    //         betId: localSelectedBookmaker?.betId,
    //         teamB_lay: value + 1,
    //         teamB_Back: value,
    //         teamB_suspend: false,
    //         teamA_lay: "",
    //         teamA_Back: "",
    //         teamA_suspend: true,
    //         teamC_lay: "",
    //         teamC_Back: "",
    //         teamC_suspend: true,
    //         layLock: false,
    //         isSingle: true,
    //       });
    //       setLocalQuickBookmaker((prev) => {
    //         const newBody = {
    //           ...prev,
    //           teamA: { ...prev?.teamA, lay: "", rate: "" },
    //           teamB: { ...prev?.teamB, lay: value + 1, rate: value },
    //           teamC: { ...prev?.teamC, lay: "", rate: "" },
    //         };
    //         // dispatch(setQuickBookmaker(newBody));
    //         return newBody;
    //       });

    //       setLQuickBookMaker((prev) => {
    //         return {
    //           ...prev,
    //           l_teamARate: "",
    //           l_teamALayValue: "",
    //           l_teamBRate: value,
    //           l_teamBLayValue: value + 1,
    //           l_teamCRate: "",
    //           l_teamCLayValue: "",
    //         };
    //       });
    //     } else if (event.target.name === "teamC_rate") {
    //       let result = handleHunderedValue(
    //         targetValue,
    //         localQuickBookmaker?.teamC?.lay
    //       );
    //       if (result) {
    //         return;
    //       }
    //       let teamCRateDecimal = localQuickBookmaker?.teamC?.rate % 1; // get the decimal portion of the number
    //       let value;
    //       if (teamCRateDecimal >= 0.5) {
    //         value = parseFloat(event.target.value) + 1;
    //       } else {
    //         value = parseFloat(event.target.value) + 0.5;
    //       }

    //       if (!value || value + 1 > 99.5) {
    //         return;
    //       }
    //       socket.emit("updateRate", {
    //         matchId: match?.id,
    //         id: Bid,
    //         teamA: match?.teamA,
    //         teamB: match?.teamB,
    //         teamC: match?.teamC,
    //         betId: localSelectedBookmaker?.betId,
    //         teamC_lay: value + 1,
    //         teamC_Back: value,
    //         teamC_suspend: false,
    //         teamA_lay: "",
    //         teamA_Back: "",
    //         teamA_suspend: true,
    //         teamB_lay: "",
    //         teamB_Back: "",
    //         teamB_suspend: true,
    //         layLock: false,
    //         isSingle: true,
    //       });

    //       setLocalQuickBookmaker((prev) => {
    //         const newBody = {
    //           ...prev,
    //           teamA: { ...prev?.teamA, lay: "", rate: "" },
    //           teamB: { ...prev?.teamB, lay: "", rate: "" },
    //           teamC: { ...prev?.teamC, lay: value + 1, rate: value },
    //         };
    //         // dispatch(setQuickBookmaker(newBody));
    //         return newBody;
    //       });

    //       setLQuickBookMaker((prev) => {
    //         return {
    //           ...prev,
    //           l_teamARate: "",
    //           l_teamALayValue: "",
    //           l_teamBRate: "",
    //           l_teamBLayValue: "",
    //           l_teamCRate: value,
    //           l_teamCLayValue: value + 1,
    //         };
    //       });
    //     }
    //   } else {
    //     if (event.target.name === "teamA_rate") {
    //       let value = Math.round(localQuickBookmaker?.teamA?.rate) + incGap;

    //       setLocalQuickBookmaker((prev) => {
    //         const newBody = {
    //           ...prev,
    //           teamA: {
    //             ...prev?.teamA,
    //             lay: value ? value + incGap : incGap,
    //             rate: value ? value : 1,
    //           },
    //           teamB: { ...prev?.teamB, rate: "", lay: "" },
    //           teamC: { ...prev?.teamC, rate: "", lay: "" },
    //         };
    //         // dispatch(setQuickBookmaker(newBody));
    //         return newBody;
    //       });

    //       setLQuickBookMaker((prev) => {
    //         return {
    //           ...prev,
    //           l_teamARate: value ? value : 1,
    //           l_teamALayValue: value ? value + incGap : incGap,
    //           l_teamBRate: "",
    //           l_teamBLayValue: "",
    //           l_teamCRate: "",
    //           l_teamCLayValue: "",
    //         };
    //       });
    //     } else if (event.target.name === "teamB_rate") {
    //       let value = Math.round(localQuickBookmaker?.teamB?.rate) + incGap;

    //       setLocalQuickBookmaker((prev) => {
    //         const newBody = {
    //           ...prev,
    //           teamA: { ...prev?.teamA, rate: "", lay: "" },
    //           teamB: {
    //             ...prev?.teamB,
    //             lay: value ? value + incGap : incGap,
    //             rate: value ? value : 1,
    //           },
    //           teamC: { ...prev?.teamC, rate: "", lay: "" },
    //         };
    //         // dispatch(setQuickBookmaker(newBody));
    //         return newBody;
    //       });

    //       setLQuickBookMaker((prev) => {
    //         return {
    //           ...prev,
    //           l_teamARate: "",
    //           l_teamALayValue: "",
    //           l_teamBRate: value ? value : 1,
    //           l_teamBLayValue: value ? value + incGap : incGap,
    //           l_teamCRate: "",
    //           l_teamCLayValue: "",
    //         };
    //       });
    //     } else if (event.target.name === "teamC_rate") {
    //       let value = Math.round(localQuickBookmaker?.teamC?.rate) + incGap;

    //       setLocalQuickBookmaker((prev) => {
    //         const newBody = {
    //           ...prev,
    //           teamA: { ...prev?.teamA, rate: "", lay: "" },
    //           teamB: { ...prev?.teamB, rate: "", lay: "" },
    //           teamC: {
    //             ...prev?.teamC,
    //             lay: value ? value + incGap : incGap,
    //             rate: value ? value : 1,
    //           },
    //         };
    //         // dispatch(setQuickBookmaker(newBody));
    //         return newBody;
    //       });

    //       setLQuickBookMaker((prev) => {
    //         return {
    //           ...prev,
    //           l_teamARate: "",
    //           l_teamALayValue: "",
    //           l_teamBRate: "",
    //           l_teamBLayValue: "",
    //           l_teamCRate: value ? value : 1,
    //           l_teamCLayValue: value ? value + incGap : incGap,
    //         };
    //       });
    //     }
    //   }
    // }
    if (key == "minus") {
      // if (targetValue === null || "" || NaN) {
      //   return;
      // }
      handleSuspend();
      if (isTab == "tab") {
        setIsTab("");
      }
      if (incGap != 5) {
        setIncGap(0.5);
        if (event.target.name === "teamA_rate") {
          let result = handleZeroValue(
            targetValue,
            localQuickBookmaker?.teamA?.lay
          );
          if (result) {
            return;
          }
          let teamARateDecimal = localQuickBookmaker?.teamA?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamARateDecimal >= 0.5) {
            value = parseFloat(event.target.value) - 1;
          } else {
            value = parseFloat(event.target.value) - 0.5;
          }

          if (!value) {
            return;
          }

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, rate: value, lay: value + 1 },
              teamB: { ...prev?.teamB, lay: "", rate: "" },
              teamC: { ...prev?.teamC, lay: "", rate: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: value ? value : "",
              l_teamALayValue: value ? value + 1 : "",
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        } else if (event.target.name === "teamB_rate") {
          let result = handleZeroValue(
            targetValue,
            localQuickBookmaker?.teamB?.lay
          );
          if (result) {
            return;
          }
          let teamBRateDecimal = localQuickBookmaker?.teamB?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamBRateDecimal >= 0.5) {
            value = parseFloat(event.target.value) - 1;
          } else {
            value = parseFloat(event.target.value) - 0.5;
          }

          if (!value) {
            return;
          }

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: "", rate: "" },
              teamB: { ...prev?.teamB, rate: value, lay: value + 1 },
              teamC: { ...prev?.teamC, lay: "", rate: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: value,
              l_teamBLayValue: value + 1,
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        } else if (event.target.name === "teamC_rate") {
          let result = handleZeroValue(
            targetValue,
            localQuickBookmaker?.teamC?.lay
          );
          if (result) {
            return;
          }
          let teamCRateDecimal = localQuickBookmaker?.teamC?.rate % 1; // get the decimal portion of the number
          let value;
          if (teamCRateDecimal >= 0.5) {
            value = parseFloat(event.target.value) - 1;
          } else {
            value = parseFloat(event.target.value) - 0.5;
          }

          if (!value) {
            return;
          }

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: "", rate: "" },
              teamB: { ...prev?.teamB, lay: "", rate: "" },
              teamC: { ...prev?.teamC, rate: value, lay: value + 1 },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: value,
              l_teamCLayValue: value + 1,
            };
          });
        }
      } else {
        if (event.target.name === "teamA_rate" && event.target.value >= 5) {
          let result = handleZeroValue(
            targetValue,
            localQuickBookmaker?.teamA?.lay
          );
          if (result) {
            return;
          }
          let value = Math.round(localQuickBookmaker?.teamA?.rate) - incGap;

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: {
                ...prev?.teamA,
                lay: value ? value + incGap : incGap,
                rate: value ? value : 0,
              },
              teamB: { ...prev?.teamB, lay: "", rate: "" },
              teamC: { ...prev?.teamC, lay: "", rate: "" },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: value ? value : 0,
              l_teamALayValue: value ? value + incGap : incGap,
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        } else if (
          event.target.name === "teamB_rate" &&
          event.target.value >= 5
        ) {
          let result = handleZeroValue(
            targetValue,
            localQuickBookmaker?.teamB?.lay
          );
          if (result) {
            return;
          }
          let value = Math.round(localQuickBookmaker?.teamB?.rate) - incGap;

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: "", rate: "" },
              teamB: {
                ...prev?.teamB,
                lay: value ? value + incGap : incGap,
                rate: value ? value : 0,
                teamC: { ...prev?.teamC, lay: "", rate: "" },
              },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: value ? value : 0,
              l_teamBLayValue: value ? value + incGap : incGap,
              l_teamCRate: "",
              l_teamCLayValue: "",
            };
          });
        } else if (
          event.target.name === "teamC_rate" &&
          event.target.value >= 5
        ) {
          let result = handleZeroValue(
            targetValue,
            localQuickBookmaker?.teamC?.lay
          );
          if (result) {
            return;
          }
          let value = Math.round(localQuickBookmaker?.teamC?.rate) - incGap;

          setLocalQuickBookmaker((prev) => {
            const newBody = {
              ...prev,
              teamA: { ...prev?.teamA, lay: "", rate: "" },
              teamB: { ...prev?.teamB, lay: "", rate: "" },
              teamC: {
                ...prev?.teamC,
                lay: value ? value + incGap : incGap,
                rate: value ? value : 0,
              },
            };
            // dispatch(setQuickBookmaker(newBody));
            return newBody;
          });

          setLQuickBookMaker((prev) => {
            return {
              ...prev,
              l_teamARate: "",
              l_teamALayValue: "",
              l_teamBRate: "",
              l_teamBLayValue: "",
              l_teamCRate: value ? value : 0,
              l_teamCLayValue: value ? value + incGap : incGap,
            };
          });
        }
      }
    }
    if (key == "/") {
      handleSuspend();
      setIncGap(5);
      setIsTab("");
      if (event.target.name === "teamA_rate") {
        let value = event.target.value ? targetValue : 0;

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: value + 5, rate: value },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: value,
            l_teamALayValue: value + 5,
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      } else if (event.target.name === "teamB_rate") {
        let value = event.target.value ? targetValue : 0;

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: "", rate: "" },
            teamB: { ...prev?.teamB, lay: value + 5, rate: value },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: value,
            l_teamBLayValue: value + 5,
            l_teamCRate: "",
            l_teamCLayValue: "",
          };
        });
      } else if (event.target.name === "teamC_rate") {
        let value = event.target.value ? targetValue : 0;

        setLocalQuickBookmaker((prev) => {
          const newBody = {
            ...prev,
            teamA: { ...prev?.teamA, lay: "", rate: "" },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: value + 5, rate: value },
          };
          // dispatch(setQuickBookmaker(newBody));
          return newBody;
        });

        setLQuickBookMaker((prev) => {
          return {
            ...prev,
            l_teamARate: "",
            l_teamALayValue: "",
            l_teamBRate: "",
            l_teamBLayValue: "",
            l_teamCRate: value,
            l_teamCLayValue: value + 5,
          };
        });
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
            {localSelectedBookmaker?.marketName}
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
                    "l",
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
                    // fullWidth
                    value={lQuickBookMaker?.l_teamARate}
                    InputProps={{
                      disableUnderline: true,
                      // inputProps: { min: "0", max: "100" },
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
                  // fullWidth
                  className="InputChild"
                  disabled
                  // onChange={(e) => handleChange(e)}
                  variant="standard"
                  value={lQuickBookMaker?.l_teamALayValue}
                  InputProps={{
                    disableUnderline: true,
                    // inputProps: { min: "0", max: "100" },
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
                    "l",
                  ]}
                  isDisabled={false}
                  onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                >
                  <TextField
                    // fullWidth
                    className="InputChild"
                    variant="standard"
                    value={lQuickBookMaker?.l_teamBRate}
                    onChange={handleChange}
                    name={"teamB_rate"}
                    inputRef={innerRefTeamB}
                    type="number"
                    onFocus={() => handleFocus(innerRefTeamB)}
                    // onChange={(i) => setValue2(i.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      // inputProps: { min: "0", max: "100" },
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
                  // fullWidth
                  value={lQuickBookMaker?.l_teamBLayValue}
                  // onChange={(i) => setTeamBLayValue(i.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    // inputProps: { min: "0", max: "100" },
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
                      "l",
                    ]}
                    isDisabled={false}
                    onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                  >
                    <TextField
                      className="InputChild"
                      variant="standard"
                      value={lQuickBookMaker?.l_teamCRate}
                      onChange={handleChange}
                      name={"teamC_rate"}
                      inputRef={innerRefTeamC}
                      type="number"
                      // fullWidth
                      onFocus={() => handleFocus(innerRefTeamC)}
                      // onChange={(i) => setValue2(i.target.value)}
                      InputProps={{
                        disableUnderline: true,
                        // inputProps: { min: "0", max: "100" },
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
                    value={lQuickBookMaker?.l_teamCLayValue}
                    InputProps={{
                      disableUnderline: true,
                      // inputProps: { min: "0", max: "100" },
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
            {localQuickBookmaker?.teamBall?.isABall ? (
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
                  {!localQuickBookmaker?.teamBackUnlock ? (
                    <Box
                      sx={{
                        background: localQuickBookmaker?.teamBackUnlock
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamBackUnlock ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamBackUnlock
                            ? 0
                            : localQuickBookmaker?.teamA?.rate}
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
                        background: localQuickBookmaker?.teamA?.suspended
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamA?.suspended ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.suspended
                            ? 0
                            : localQuickBookmaker?.teamA?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                  {localQuickBookmaker?.teamA?.layLock ? (
                    <Box
                      sx={{
                        background:
                          localQuickBookmaker?.teamA?.lay === null
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
                      {localQuickBookmaker?.teamA?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.lay}
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
                          localQuickBookmaker?.teamA?.suspended ||
                          localQuickBookmaker?.teamA?.lay === null
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
                      {!localQuickBookmaker?.teamA?.suspended &&
                      localQuickBookmaker?.teamA?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.suspended
                            ? 0
                            : localQuickBookmaker?.teamA?.lay}
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
                  {!localQuickBookmaker?.teamBackUnlock ? (
                    <Box
                      sx={{
                        background: localQuickBookmaker?.teamBackUnlock
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamBackUnlock ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamBackUnlock
                            ? 0
                            : localQuickBookmaker?.teamB?.rate}
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
                        background: localQuickBookmaker?.teamB?.suspended
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamB?.suspended ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.suspended
                            ? 0
                            : localQuickBookmaker?.teamB?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                  {localQuickBookmaker?.teamB?.layLock ? (
                    <Box
                      sx={{
                        background:
                          localQuickBookmaker?.teamB?.lay === null
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
                      {localQuickBookmaker?.teamB?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.lay}
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
                          localQuickBookmaker?.teamB?.suspended ||
                          localQuickBookmaker?.teamB?.lay === null
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
                      {!localQuickBookmaker?.teamB?.suspended &&
                      localQuickBookmaker?.teamB?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.suspended
                            ? 0
                            : localQuickBookmaker?.teamB?.lay}
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
                      {!localQuickBookmaker?.teamBackUnlock ? (
                        <Box
                          sx={{
                            background: localQuickBookmaker?.teamBackUnlock
                              ? "#FDF21A"
                              : "#A7DCFF",
                            width: "50%",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!localQuickBookmaker?.teamBackUnlock ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamBackUnlock
                                ? 0
                                : localQuickBookmaker?.teamC?.rate}
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
                            background: localQuickBookmaker?.teamC?.suspended
                              ? "#FDF21A"
                              : "#A7DCFF",
                            width: "50%",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!localQuickBookmaker?.teamC?.suspended ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamC?.suspended
                                ? 0
                                : localQuickBookmaker?.teamC?.rate}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      )}
                      {localQuickBookmaker?.teamC?.layLock ? (
                        <Box
                          sx={{
                            background:
                              localQuickBookmaker?.teamC?.lay === null
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
                          {localQuickBookmaker?.teamC?.lay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamC?.lay}
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
                              localQuickBookmaker?.teamC?.suspended ||
                              localQuickBookmaker?.teamC?.lay === null
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
                          {!localQuickBookmaker?.teamC?.suspended &&
                          localQuickBookmaker?.teamC?.lay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamC?.suspended
                                ? 0
                                : localQuickBookmaker?.teamC?.lay}
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
        {localSelectedBookmaker?.betStatus === 2 ? (
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
                  betId={[
                    { match_id: match?.id, id: localSelectedBookmaker?.betId },
                  ]}
                  teamA={match?.teamA}
                  teamB={match?.teamB}
                  tie={"Tie"}
                  draw={match?.teamC ? match?.teamC : ""}
                  betStatus={localSelectedBookmaker?.betStatus}
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
                  betId={[
                    { match_id: match?.id, id: localSelectedBookmaker?.betId },
                  ]}
                  teamA={match?.teamA}
                  teamB={match?.teamB}
                  tie={"Tie"}
                  draw={match?.teamC ? match?.teamC : ""}
                  betStatus={localSelectedBookmaker?.betStatus}
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
