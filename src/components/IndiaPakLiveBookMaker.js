import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useState, useRef, useContext, useEffect } from "react";
import StyledImage from "./StyledImage";
import ResultComponent from "./ResultComponent";
import './index.css'
import { BALLSTART, BroadCast } from "../expert/assets";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Lock, BallStart } from '../assets';
import { SocketContext } from "../context/socketContext";
import { setRole } from "../newStore";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookMakerBetRate } from "../newStore/reducers/matchDetails";
import { setBookmakerTeamRates } from "../newStore/reducers/expertMatchDetails";



export default function IndiaPakLiveBookMaker({ add, match }) {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    const { bookmakerTeamRates } = useSelector((state) => state?.expertMatchDetails);
    // const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);
    // console.log('match', match)
    const { socket, socketMicro } = useContext(SocketContext);

    const { axios } = setRole();
    const dispatch = useDispatch();


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

    const AddSession = () => {
        const location = useLocation();
        const [teamARate, setTeamARate] = useState()
        const [teamALayValue, setTeamALayValue] = useState()
        const [teamBRate, setTeamBRate] = useState()
        const [teamBLayValue, setTeamBLayValue] = useState()
        const [teamCRate, setTeamCRate] = useState()
        const [teamCLayValue, setTeamCLayValue] = useState()
        const [l_teamARate, setLTeamARate] = useState()
        const [l_teamALayValue, setLTeamALayValue] = useState()
        const [l_teamBRate, setLTeamBRate] = useState()
        const [l_teamBLayValue, setLTeamBLayValue] = useState()
        const [l_teamCRate, setLTeamCRate] = useState()
        const [l_teamCLayValue, setLTeamCLayValue] = useState()
        const [incGap, setIncGap] = useState(1)
        const [pressEnter, setPressEnter] = useState(false)
        const [isTeamALock, setIsTeamALock] = useState(true)
        const [isTeamBLock, setIsTeamBLock] = useState(true)
        const [isTeamCLock, setIsTeamCLock] = useState(true)
        const [isTeamASuspend, setIsTeamASuspend] = useState(true)
        const [isTeamBSuspend, setIsTeamBSuspend] = useState(true)
        const [isTeamCSuspend, setIsTeamCSuspend] = useState(true)
        const [isTeamBackUnlock, setIsTeamBackUnlock] = useState(true)
        const [teamBall, setTeamBall] = useState({
            isABall: false,
            isBBall: false,
            isCBall: false,
        })
        const [teamSuspend, setTeamSuspend] = useState({
            teamA_suspend: false,
            teamB_suspend: false,
            teamC_suspend: false,
        })
        const [betId, setBetId] = useState("")
        const [isTab, setIsTab] = useState("")
        const innerRefTeamA = useRef();
        const innerRefTeamB = useRef();
        const innerRefTeamC = useRef();

        const [teamRates, setteamRates] = useState({
            teamA: bookmakerTeamRates?.teamA,
            teamB: bookmakerTeamRates?.teamB,
            teamC: bookmakerTeamRates?.teamC
        })
        const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);

        useEffect(() => {
            // alert(JSON.stringify(match))
            getManuallBookMaker(match?.id);
        }, []);

        async function getManuallBookMaker(id) {
            try {
                let response = await axios.get(`/betting/getManuallBookMaker/${id}`);
                if (response?.data?.data?.length === 0) {
                    doSubmitSessionBet(id);
                } else {
                    setBetId(response?.data?.data[0].id);
                    setTeamARate(response?.data?.data[0].teamA_Back);
                    setTeamALayValue(response?.data?.data[0].teamA_lay);
                    setTeamBRate(response?.data?.data[0].teamB_Back);
                    setTeamBLayValue(response?.data?.data[0].teamB_lay);
                    setTeamCRate(response?.data?.data[0].teamC_Back);
                    setTeamCLayValue(response?.data?.data[0].teamC_lay);


                    setLTeamARate(response?.data?.data[0].teamA_Back);
                    setLTeamALayValue(response?.data?.data[0].teamA_lay);
                    setLTeamBRate(response?.data?.data[0].teamB_Back);
                    setLTeamBLayValue(response?.data?.data[0].teamB_lay);
                    setLTeamCRate(response?.data?.data[0].teamC_Back);
                    setLTeamCLayValue(response?.data?.data[0].teamC_lay);
                    // alert(id)
                    getAllBetsData(response?.data?.data[0].id, id);
                    setteamRates({
                        teamA: response?.data?.data[0].teamA_rate ? response?.data?.data[0].teamA_rate : 0,
                        teamB: response?.data?.data[0].teamB_rate ? response?.data?.data[0].teamB_rate : 0,
                        teamC: response?.data?.data[0].teamC_rate ? response?.data?.data[0].teamC_rate : 0
                    })
                    setIsTeamASuspend(response?.data?.data[0].teamA_suspend ? true : false);
                    setIsTeamBSuspend(response?.data?.data[0].teamB_suspend ? true : false);
                    setIsTeamCSuspend(response?.data?.data[0].teamC_suspend ? true : false);
                }
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

        async function doSubmitSessionBet(id) {
            const payload = {
                betStatus: 1,
                sessionBet: false,
                matchType: "cricket",
                match_id: id
            }
            try {
                let response = await axios.post(`/betting/addBetting`, payload);
                setBetId(response?.data?.data?.id)
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

        async function getAllBetsData(id, matchId) {
            let payload = {
                match_id: matchId,
                bet_id: id,
                marketType: "MANUAL BOOKMAKER"
            };
            try {
                let { data } = await axios.post(`/betting/getPlacedBets`, payload);
                dispatch(setBookMakerBetRate(data?.data?.data || []));
            } catch (e) {
                console.log(e);
            }
        }

        useEffect(() => {
            if (socket && socket.connected) {
                socket.onevent = async (packet) => {
                    const data = packet.data[1];
                    if (packet.data[0] === "match_bet") {
                        const data = packet.data[1];
                        try {

                            if (data?.betPlaceData?.match_id === match?.id) {
                                setteamRates({
                                    teamA: data?.teamA_rate ? data?.teamA_rate : 0,
                                    teamB: data?.teamB_rate ? data?.teamB_rate : 0,
                                    teamC: data?.teamC_rate ? data?.teamC_rate : 0
                                })
                                // dispatch(setBookMakerBetRate((prev) => [body, ...prev]));

                                if (data && data?.betPlaceData?.marketType == "MANUAL BOOKMAKER") {
                                    const body = {
                                        id: data?.betPlaceData?.id,
                                        isActive: true,
                                        createAt: data?.betPlaceData?.createAt,
                                        updateAt: data?.betPlaceData?.createAt,
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
                                        deleted_reason: data?.betPlaceData?.deleted_reason || null,
                                        userName: data?.betPlaceData?.userName,
                                        myStack: data?.betPlaceData?.myStack,
                                        marketType: data?.betPlaceData?.marketType,
                                        amount:
                                            data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                                    };
                                    // dispatch(setBookmakerTeamRates(teamRates));
                                    dispatch(setBookMakerBetRate((prev) => {
                                        // Create a new array by adding `body` at the beginning and spreading the previous values
                                        const newData = [body, ...prev];

                                        // Modify the `newData` array if needed

                                        // Return the modified `newData` array
                                        return newData;
                                    }));
                                }

                            }
                        } catch (err) {
                            console.log(err?.message);
                        }

                    }

                    if (packet.data[0] === "updateRate_user") {
                        if (data?.matchId === match?.id) {
                            if (!data?.lock) {
                                if (data?.isTab) {
                                    setIsTeamBackUnlock(false);
                                    setTeamARate(data.teamA_Back);
                                    setTeamBRate(data.teamB_Back);
                                    setTeamCRate(data.teamC_Back);


                                } else {
                                    setTeamBall((prevState) => ({
                                        ...prevState,
                                        isABall: false,
                                        isBBall: false,
                                        isCBall: false,
                                    }));
                                    setIsTeamALock(data?.teamA_suspend);
                                    setIsTeamBLock(data?.teamB_suspend);
                                    setIsTeamCLock(data?.teamC_suspend);

                                    setIsTeamASuspend(data?.teamA_suspend);
                                    setTeamARate(data?.teamA_Back);
                                    setTeamALayValue(data?.teamA_lay);

                                    setIsTeamBSuspend(data?.teamB_suspend);
                                    setTeamBRate(data?.teamB_Back);
                                    setTeamBLayValue(data?.teamB_lay);

                                    setIsTeamCSuspend(data.teamC_suspend);
                                    setTeamCRate(data.teamC_Back);
                                    setTeamCLayValue(data.teamC_lay);
                                }

                                setTeamSuspend((prevState) => ({
                                    ...prevState,
                                    teamA_suspend: data?.teamA_suspend,
                                    teamB_suspend: data?.teamB_suspend,
                                    teamC_suspend: data?.teamC_suspend,
                                }));
                            } else {
                                if (data.teamA_suspend == 'Ball Started') {
                                    setTeamBall((prevState) => ({
                                        ...prevState,
                                        isABall: true,
                                        isBBall: true,
                                        isCBall: true,
                                    }));
                                } else {
                                    setIsTeamASuspend(data?.teamA_suspend);
                                    setIsTeamBSuspend(data?.teamB_suspend);
                                    setIsTeamCSuspend(data?.teamC_suspend);
                                    setIsTeamBackUnlock(true);
                                    setTeamBall((prevState) => ({
                                        ...prevState,
                                        isABall: false,
                                        isBBall: false,
                                        isCBall: false,
                                    }));
                                }
                                setTeamSuspend((prevState) => ({
                                    ...prevState,
                                    teamA_suspend: data?.teamA_suspend,
                                    teamB_suspend: data?.teamB_suspend,
                                    teamC_suspend: data?.teamC_suspend,
                                }));
                            }
                        }
                    }

                    if (packet.data[0] === "matchDeleteBet") {
                        const value = packet.data[1];
                        try {
                            const updatedAllBet = bookMakerBetRates.map((currentMatch) => {
                                if (currentMatch.match_id === value?.matchId) {
                                    if (value?.betPlaceIds.includes(currentMatch.id)) {
                                        return {
                                            ...currentMatch,
                                            deleted_reason: value?.deleted_reason,
                                        };
                                    }
                                }
                                return currentMatch;
                            });

                            dispatch(setBookMakerBetRate(updatedAllBet));
                            // setBookMakerBetRate
                            setteamRates({
                                teamA: value?.teamA_rate ? value?.teamA_rate : 0,
                                teamB: value?.teamB_rate ? value?.teamB_rate : 0,
                                teamC: value?.teamC_rate ? value?.teamC_rate : 0
                            })

                        } catch (err) {
                            console.log(err?.message);
                        }
                    }

                }
            }
        }, [socket]);

        const handleSuspend = () => {

            if (!teamSuspend.teamA_suspend || !teamSuspend.teamB_suspend || !teamSuspend.teamC_suspend) {
                socket.emit("updateRate", {
                    matchId: match?.id,
                    betId: betId,
                    teamA_lay: "",
                    teamA_Back: "",
                    teamA_suspend: true,
                    teamB_lay: "",
                    teamB_Back: "",
                    teamB_suspend: true,
                    teamC_lay: "",
                    teamC_Back: "",
                    teamC_suspend: true,
                    lock: true
                });
            }
        }

        const handleChange = (event) => {
            handleSuspend();
            let target = event.target;
            if (target.value <= 100) {
                if (target.name === 'teamA_rate') {

                    setTeamARate(target.value)
                    setLTeamARate(target.value)
                    if (target.value !== '') {
                        let teamA_lay = parseInt(target.value) + 1
                        setTeamALayValue(teamA_lay);
                        setLTeamALayValue(teamA_lay);
                    } else {
                        setTeamALayValue('');
                        setLTeamALayValue('');
                    }
                }
                else if (target.name === 'teamB_rate') {
                    setTeamBRate(target.value)
                    setLTeamBRate(target.value)
                    if (target.value !== '') {
                        let teamB_lay = parseInt(target.value) + 1
                        setTeamBLayValue(teamB_lay);
                        setLTeamBLayValue(teamB_lay);
                    } else {
                        setTeamBLayValue('');
                        setLTeamBLayValue('');
                    }
                }
                else if (target.name === 'teamC_rate') {
                    setTeamCRate(target.value)
                    setLTeamCRate(target.value)
                    if (target.value !== '') {
                        let teamC_lay = parseInt(target.value) + 1
                        setTeamCLayValue(teamC_lay);
                        setLTeamCLayValue(teamC_lay);
                    } else {
                        setTeamCLayValue('');
                        setLTeamCLayValue('');
                    }
                }
            }
        }

        const handleFocus = (event) => {
        }
        const handleHunderedValue = (back, lay) => {
            // alert(back)
            if (back >= 100) {
                return true;
            }
            if (lay >= 100) {
                return true;
            }
            return false;
        }
        const handleZeroValue = (back, lay) => {
            if (back < 1) {
                return true;
            }
            if (lay < 0) {
                return true;
            }
            return false;
        }

        const handleKeysMatchEvents = (key, event) => {
            event.preventDefault();
            let targetValue = parseFloat(event.target.value);
            event.target.value = targetValue;
            if (key == 'right') {
                handleSuspend();
                let value = targetValue ? targetValue + incGap : incGap
                setPressEnter(false);
                if (event.target.name === 'teamA_rate') {
                    let result = handleHunderedValue(targetValue, teamALayValue);
                    if (result) {
                        return;
                    }
                    setTeamARate(value);
                    setLTeamARate(value);
                    let chckValue = teamALayValue ? teamALayValue : value
                    let l_chckValue = l_teamALayValue ? l_teamALayValue : value
                    setTeamALayValue(chckValue + incGap);
                    setTeamBRate('');
                    setTeamBLayValue('');
                    setLTeamALayValue(l_chckValue + incGap);
                    setLTeamBRate('');
                    setLTeamBLayValue('');
                }

                if (event.target.name === 'teamB_rate') {
                    let result = handleHunderedValue(targetValue, teamBLayValue);
                    if (result) {
                        return;
                    }
                    setTeamBRate(value);
                    setLTeamBRate(value);
                    let chckValue = teamBLayValue ? teamBLayValue : value
                    let l_chckValue = l_teamBLayValue ? l_teamBLayValue : value
                    setTeamBLayValue(chckValue + incGap);
                    setTeamARate('');
                    setTeamALayValue('');
                    setLTeamBLayValue(l_chckValue + incGap);
                    setLTeamARate('');
                    setLTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate') {
                    let result = handleHunderedValue(targetValue, teamCLayValue);
                    if (result) {
                        return;
                    }
                    setTeamCRate(value);
                    setLTeamCRate(value);
                    let chckValue = teamCLayValue ? teamCLayValue : value

                    let l_chckValue = l_teamCLayValue ? l_teamCLayValue : value
                    setTeamCLayValue(chckValue + incGap);
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');

                    setLTeamCLayValue(l_chckValue + incGap);
                    setLTeamARate('');
                    setLTeamALayValue('');
                    setLTeamBRate('');
                    setLTeamBLayValue('');
                }
            }
            else if (key == 'left') {
                handleSuspend();
                let value = targetValue - incGap
                setPressEnter(false);
                if (event.target.name === 'teamA_rate' && teamARate > 0) {
                    setTeamARate(value);
                    setTeamALayValue(teamALayValue - incGap);
                    setTeamBRate('');
                    setTeamBLayValue('')

                    setLTeamARate(value);
                    setLTeamALayValue(l_teamALayValue - incGap);
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                }

                if (event.target.name === 'teamB_rate' && teamBRate > 0) {
                    setTeamBRate(value);
                    setTeamBLayValue(teamBLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');

                    setLTeamBRate(value);
                    setLTeamBLayValue(l_teamBLayValue - incGap)
                    setLTeamARate('');
                    setLTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate' && teamCRate > 0) {
                    setTeamCRate(value);
                    setTeamCLayValue(teamCLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');

                    setLTeamCRate(value);
                    setLTeamCLayValue(l_teamCLayValue - incGap)
                    setLTeamARate('');
                    setLTeamALayValue('');
                    setLTeamBRate('');
                    setLTeamBLayValue('');
                }

            }
            else if (key == 'up') {
                handleSuspend();
                setPressEnter(false);
                if (event.target.name === 'teamA_rate') {
                    let result = handleHunderedValue(targetValue, teamALayValue);
                    if (result) {
                        return;
                    }
                    let value = teamALayValue ? teamALayValue : teamARate
                    let l_value = l_teamALayValue ? l_teamALayValue : l_teamARate
                    setTeamALayValue(value + incGap);
                    setTeamBRate('');
                    setTeamBLayValue('')

                    setLTeamALayValue(l_value + incGap);
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                }

                if (event.target.name === 'teamB_rate') {
                    let result = handleHunderedValue(targetValue, teamBLayValue);
                    if (result) {
                        return;
                    }
                    let value = teamBLayValue ? teamBLayValue : teamBRate
                    let l_value = l_teamBLayValue ? l_teamBLayValue : l_teamBRate
                    setTeamBLayValue(value + incGap)
                    setTeamARate('');
                    setTeamALayValue('');

                    setLTeamBLayValue(l_value + incGap)
                    setLTeamARate('');
                    setLTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate') {
                    let result = handleHunderedValue(targetValue, teamCLayValue);
                    if (result) {
                        return;
                    }
                    let value = teamCLayValue ? teamCLayValue : teamCRate
                    let l_value = l_teamCLayValue ? l_teamCLayValue : l_teamCRate
                    setTeamCLayValue(value + incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');

                    setLTeamCLayValue(l_value + incGap)
                    setLTeamARate('');
                    setLTeamALayValue('');
                    setLTeamBRate('');
                    setLTeamBLayValue('');
                }
            }
            else if (key == 'down') {
                handleSuspend();
                setPressEnter(false);
                if (event.target.name === 'teamA_rate' && teamALayValue - incGap > teamARate) {
                    setTeamALayValue(teamALayValue - incGap);
                    setTeamBRate('');
                    setTeamBLayValue('')
                    setLTeamALayValue(l_teamALayValue - incGap);
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                }

                if (event.target.name === 'teamB_rate' && teamBLayValue - incGap > teamBRate) {
                    setTeamBLayValue(teamBLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');

                    setLTeamBLayValue(l_teamBLayValue - incGap)
                    setLTeamARate('');
                    setLTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate' && teamCLayValue - incGap > teamCRate) {
                    setTeamCLayValue(teamCLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');

                    setLTeamCLayValue(l_teamCLayValue - incGap)
                    setLTeamARate('');
                    setLTeamALayValue('');
                    setLTeamBRate('');
                    setLTeamBLayValue('');
                }
            }
            else if (key == '`') {
                handleSuspend();
                if (match?.teamC) {
                    if (event.target.name === 'teamA_rate') {
                        innerRefTeamB.current.focus();
                    } else if (event.target.name === 'teamB_rate') {
                        innerRefTeamC.current.focus();
                    } else if (event.target.name === 'teamC_rate') {
                        innerRefTeamA.current.focus();
                    }
                } else {
                    if (event.target.name === 'teamA_rate') {
                        innerRefTeamB.current.focus();
                    } else if (event.target.name === 'teamB_rate') {
                        innerRefTeamA.current.focus();
                    }
                }
            }
            else if (key == 'enter' || key == 'return') {
                if (isTab == "tab") {
                    let data = {};
                    if (match?.teamC) {
                        data = {
                            matchId: match?.id,
                            betId: betId,
                            teamA_Back: targetValue,
                            teamALayValue: "",//add
                            teamA_suspend: false,
                            teamB_Back: targetValue,
                            teamBLayValue: "",//add
                            teamB_suspend: false,
                            teamC_Back: targetValue,
                            teamCLayValue: "",//add
                            teamC_suspend: false,
                            isTab: true,
                        }
                    } else {
                        data = {
                            matchId: match?.id,
                            betId: betId,
                            teamA_Back: targetValue,
                            teamALayValue: "",//add
                            teamA_suspend: false,
                            teamB_Back: targetValue,
                            teamBLayValue: "",//add
                            teamB_suspend: false,
                            teamC_Back: "",//add
                            teamCLayValue: "",//add
                            teamC_suspend: false,
                            isTab: true,
                        }
                    }
                    // alert(JSON.stringify(data));
                    socket.emit("updateRate", data);
                } else {
                    if (event.target.name === 'teamA_rate') {
                        socket.emit("updateRate", {
                            matchId: match?.id,
                            betId: betId,
                            teamA_lay: teamALayValue,
                            teamA_Back: teamARate,
                            teamA_suspend: false,
                            teamB_lay: "",
                            teamB_Back: "",
                            teamB_suspend: true,
                            teamC_lay: "",
                            teamC_Back: "",
                            teamC_suspend: true,
                        });
                    }
                    if (event.target.name === 'teamB_rate') {
                        socket.emit("updateRate", {
                            matchId: match?.id,
                            betId: betId,
                            teamA_lay: "",
                            teamA_Back: "",
                            teamA_suspend: true,
                            teamB_lay: teamBLayValue,
                            teamB_Back: teamBRate,
                            teamB_suspend: false,
                            teamC_lay: "",
                            teamC_Back: "",
                            teamC_suspend: true,
                        });
                    }
                    if (event.target.name === 'teamC_rate') {
                        socket.emit("updateRate", {
                            matchId: match?.id,
                            betId: betId,
                            teamA_lay: "",
                            teamA_Back: "",
                            teamA_suspend: true,
                            teamB_lay: "",
                            teamB_Back: "",
                            teamB_suspend: true,
                            teamC_lay: teamCLayValue,
                            teamC_Back: teamCRate,
                            teamC_suspend: false,
                        });
                    }
                }
                setIsTab("");
            }
            else if (key == 'tab') {
                handleSuspend();
                setTeamARate(targetValue);
                setTeamBRate(targetValue);
                setTeamCRate(targetValue);
                setTeamALayValue('');
                setTeamBLayValue('');
                setTeamCLayValue('');

                setLTeamARate(targetValue);
                setLTeamBRate(targetValue);
                setLTeamCRate(targetValue);
                setLTeamALayValue('');
                setLTeamBLayValue('');
                setLTeamCLayValue('');
                setIsTab("tab");

            }
            if (key == '*') {
                handleSuspend();
                if (event.target.name === 'teamA_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamARate(value);
                    setTeamALayValue(value + 0.5);
                    setIncGap(0.25)
                    setTeamBRate('');
                    setTeamBLayValue('')

                    setLTeamARate(value);
                    setLTeamALayValue(value + 0.5);
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                } else if (event.target.name === 'teamB_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamBRate(value);
                    setTeamBLayValue(value + 0.5);
                    setIncGap(0.25)
                    setTeamARate('');
                    setTeamALayValue('')

                    setLTeamBRate(value);
                    setLTeamBLayValue(value + 0.5);
                    setLTeamARate('');
                    setLTeamALayValue('')
                } else if (event.target.name === 'teamC_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamCRate(value);
                    setTeamCLayValue(value + 0.5);
                    setIncGap(0.25)
                    setTeamARate('');
                    setTeamALayValue('')
                    setTeamBRate('');
                    setTeamBLayValue('')

                    setLTeamCRate(value);
                    setLTeamCLayValue(value + 0.5);
                    setLTeamARate('');
                    setLTeamALayValue('')
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                }
            }
            if (key == 'ctrl') {
                handleSuspend();
                setIncGap(1)
            }
            if (key == 'esc') {
                handleSuspend();
                setIncGap(1)
                if (event.target.name === 'teamA_rate') {
                    let teamARateDecimal = teamARate % 1; // get the decimal portion of the number
                    let teamALayValueDecimal = teamALayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamARateDecimal >= 0.5) {
                        value = Math.round(teamARate) - 1;
                    } else {
                        value = Math.round(teamARate);
                    }
                    if (teamALayValueDecimal >= 0.5) {
                        layValue = Math.round(teamALayValue)
                    } else {
                        layValue = Math.round(teamALayValue);
                    }
                    setTeamARate(value);
                    setTeamALayValue(value + 1);

                    setLTeamARate(value);
                    setLTeamALayValue(value + 1);
                } else if (event.target.name === 'teamB_rate') {
                    let teamBRateDecimal = teamBRate % 1; // get the decimal portion of the number
                    let teamBLayValueDecimal = teamBLayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamBRateDecimal >= 0.5) {
                        value = Math.round(teamBRate) - 1;
                    } else {
                        value = Math.round(teamBRate);
                    }
                    if (teamBLayValueDecimal >= 0.5) {
                        layValue = Math.round(teamBLayValue)
                    } else {
                        layValue = Math.round(teamBLayValue);
                    }
                    setTeamBRate(value);
                    setTeamBLayValue(value + 1);

                    setLTeamBRate(value);
                    setLTeamBLayValue(value + 1);
                } else if (event.target.name === 'teamC_rate') {
                    let teamCRateDecimal = teamCRate % 1; // get the decimal portion of the number
                    let teamCLayValueDecimal = teamCLayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamCRateDecimal >= 0.5) {
                        value = Math.round(teamCRate) - 1;
                    } else {
                        value = Math.round(teamCRate);
                    }
                    if (teamCLayValueDecimal >= 0.5) {
                        layValue = Math.round(teamCLayValue)
                    } else {
                        layValue = Math.round(teamCLayValue);
                    }
                    setTeamCRate(value);
                    setTeamCLayValue(value + 1);

                    setLTeamCRate(value);
                    setLTeamCLayValue(value + 1);
                }
            }
            if (key == '.') {
                handleSuspend();
                setIncGap(1)
                if (event.target.name === 'teamA_rate') {
                    let teamARateDecimal = teamARate % 1; // get the decimal portion of the number
                    let teamALayValueDecimal = teamALayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamARateDecimal >= 0.5) {
                        value = teamARate ? Math.round(teamARate) : 0;
                    } else {
                        value = teamARate ? Math.round(teamARate) : 0;
                    }
                    if (teamALayValueDecimal >= 0.5) {
                        layValue = teamALayValue ? Math.round(teamALayValue) : 0
                    } else {
                        layValue = teamALayValue ? Math.round(teamALayValue) : 0;
                    }
                    setTeamARate(value);
                    setTeamALayValue(value + 1.5);
                    setTeamBRate('');
                    setTeamBLayValue('')


                    setLTeamARate(value);
                    setLTeamALayValue(value + 1.5);
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                } else if (event.target.name === 'teamB_rate') {
                    let teamBRateDecimal = teamBRate % 1; // get the decimal portion of the number
                    let teamBLayValueDecimal = teamBLayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamBRateDecimal >= 0.5) {
                        value = teamBRate ? Math.round(teamBRate) : 0;
                    } else {
                        value = teamBRate ? Math.round(teamBRate) : 0;
                    }
                    if (teamBLayValueDecimal >= 0.5) {
                        layValue = teamBLayValue ? Math.round(teamBLayValue) : 0
                    } else {
                        layValue = teamBLayValue ? Math.round(teamBLayValue) : 0;
                    }
                    setTeamBRate(value);
                    setTeamBLayValue(value + 1.5);
                    setTeamARate('');
                    setTeamALayValue('')

                    setLTeamBRate(value);
                    setLTeamBLayValue(value + 1.5);
                    setLTeamARate('');
                    setLTeamALayValue('')
                } else if (event.target.name === 'teamC_rate') {
                    let teamCRateDecimal = teamCRate % 1; // get the decimal portion of the number
                    let teamCLayValueDecimal = teamCLayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamCRateDecimal >= 0.5) {
                        value = teamCRate ? Math.round(teamCRate) : 0;
                    } else {
                        value = teamCRate ? Math.round(teamCRate) : 0;
                    }
                    if (teamCLayValueDecimal >= 0.5) {
                        layValue = teamCLayValue ? Math.round(teamCLayValue) : 0
                    } else {
                        layValue = teamCLayValue ? Math.round(teamCLayValue) : 0;
                    }
                    setTeamCRate(value);
                    setTeamCLayValue(value + 1.5);
                    setTeamARate('');
                    setTeamALayValue('')
                    setTeamBRate('');
                    setTeamBLayValue('')

                    setLTeamCRate(value);
                    setLTeamCLayValue(value + 1.5);
                    setLTeamARate('');
                    setLTeamALayValue('')
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                }

            }
            if (key == ',') {
                handleSuspend();
                setIncGap(1)
                if (event.target.name === 'teamA_rate') {
                    if (teamARate > 0.5) {
                        let teamARateDecimal = teamARate % 1; // get the decimal portion of the number
                        let teamALayValueDecimal = teamALayValue % 1; // get the decimal portion of the number
                        let value;
                        let layValue;
                        if (teamARateDecimal >= 0.5) {
                            value = Math.round(teamARate) - 1;
                        } else {
                            value = Math.round(teamARate);
                        }
                        if (teamALayValueDecimal >= 0.5) {
                            layValue = Math.round(teamALayValue)
                        } else {
                            layValue = Math.round(teamALayValue);
                        }
                        setTeamARate(value - 0.5);
                        setTeamALayValue(value + 1);

                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamARate(value - 0.5);
                        setLTeamALayValue(value + 1);

                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    }
                } else if (event.target.name === 'teamB_rate') {
                    if (teamBRate > 0.5) {
                        let teamBRateDecimal = teamBRate % 1; // get the decimal portion of the number
                        let teamBLayValueDecimal = teamBLayValue % 1; // get the decimal portion of the number
                        let value;
                        let layValue;
                        if (teamBRateDecimal >= 0.5) {
                            value = Math.round(teamBRate) - 1;
                        } else {
                            value = Math.round(teamBRate);
                        }
                        if (teamBLayValueDecimal >= 0.5) {
                            layValue = Math.round(teamBLayValue)
                        } else {
                            layValue = Math.round(teamBLayValue);
                        }
                        setTeamBRate(value - 0.5);
                        setTeamBLayValue(value + 1);

                        setTeamARate('');
                        setTeamALayValue('')

                        setLTeamBRate(value - 0.5);
                        setLTeamBLayValue(value + 1);

                        setLTeamARate('');
                        setLTeamALayValue('')
                    }
                } else if (event.target.name === 'teamC_rate') {
                    if (teamCRate > 0.5) {
                        let teamCRateDecimal = teamCRate % 1; // get the decimal portion of the number
                        let teamCLayValueDecimal = teamCLayValue % 1; // get the decimal portion of the number
                        let value;
                        let layValue;
                        if (teamCRateDecimal >= 0.5) {
                            value = Math.round(teamCRate) - 1;
                        } else {
                            value = Math.round(teamCRate);
                        }
                        if (teamCLayValueDecimal >= 0.5) {
                            layValue = Math.round(teamCLayValue)
                        } else {
                            layValue = Math.round(teamCLayValue);
                        }
                        setTeamCRate(value - 0.5);
                        setTeamCLayValue(value + 1);

                        setTeamARate('');
                        setTeamALayValue('');
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamCRate(value - 0.5);
                        setLTeamCLayValue(value + 1);

                        setLTeamARate('');
                        setLTeamALayValue('');
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    }
                }
            }
            if (key == 'shift') {
                socket.emit("updateRate", {
                    matchId: match?.id,
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
                    lock: true
                });
            }
            if (key == 'plus') {
                handleSuspend();
                if (incGap != 5) {
                    setIncGap(1)
                    if (event.target.name === 'teamA_rate') {
                        let result = handleHunderedValue(targetValue, teamALayValue);
                        if (result) {
                            return;
                        }
                        let teamARateDecimal = teamARate % 1; // get the decimal portion of the number
                        let value;
                        if (teamARateDecimal >= 0.5) {
                            value = parseFloat(event.target.value) + 1;
                        } else {
                            value = parseFloat(event.target.value) + 0.50;
                        }
                        setTeamARate(value);
                        setTeamALayValue(value + 1);
                        setTeamBRate('');
                        setTeamBLayValue('')
                        setLTeamARate(value);
                        setLTeamALayValue(value + 1);
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    } else if (event.target.name === 'teamB_rate') {
                        let result = handleHunderedValue(targetValue, teamBLayValue);
                        if (result) {
                            return;
                        }
                        let teamBRateDecimal = teamBRate % 1; // get the decimal portion of the number
                        let value;
                        if (teamBRateDecimal >= 0.5) {
                            value = parseFloat(event.target.value) + 1;
                        } else {
                            value = parseFloat(event.target.value) + 0.50;
                        }
                        setTeamBRate(value);
                        setTeamBLayValue(value + 1);
                        setTeamARate('');
                        setTeamALayValue('')

                        setLTeamBRate(value);
                        setLTeamBLayValue(value + 1);
                        setLTeamARate('');
                        setLTeamALayValue('')
                    } else if (event.target.name === 'teamC_rate') {
                        let result = handleHunderedValue(targetValue, teamCLayValue);
                        if (result) {
                            return;
                        }
                        let teamCRateDecimal = teamCRate % 1; // get the decimal portion of the number
                        let value;
                        if (teamCRateDecimal >= 0.5) {
                            value = parseFloat(event.target.value) + 1;
                        } else {
                            value = parseFloat(event.target.value) + 0.50;
                        }
                        setTeamCRate(value);
                        setTeamCLayValue(value + 1);
                        setTeamARate('');
                        setTeamALayValue('')
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamCRate(value);
                        setLTeamCLayValue(value + 1);
                        setLTeamARate('');
                        setLTeamALayValue('')
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    }
                } else {
                    if (event.target.name === 'teamA_rate') {
                        let value = Math.round(teamARate) + incGap;
                        setTeamARate(value ? value : 1);
                        setTeamALayValue(value ? value + incGap : incGap);
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamARate(value ? value : 1);
                        setLTeamALayValue(value ? value + incGap : incGap);
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    } else if (event.target.name === 'teamB_rate') {
                        let value = Math.round(teamBRate) + incGap;
                        setTeamBRate(value ? value : 1);
                        setTeamBLayValue(value ? value + incGap : incGap);
                        setTeamARate('');
                        setTeamALayValue('')


                        setLTeamBRate(value ? value : 1);
                        setLTeamBLayValue(value ? value + incGap : incGap);
                        setLTeamARate('');
                        setLTeamALayValue('')
                    } else if (event.target.name === 'teamC_rate') {
                        let value = Math.round(teamCRate) + incGap;
                        setTeamCRate(value ? value : 1);
                        setTeamCLayValue(value ? value + incGap : incGap);
                        setTeamARate('');
                        setTeamALayValue('')
                        setTeamBRate('');
                        setTeamBLayValue('')


                        setLTeamCRate(value ? value : 1);
                        setLTeamCLayValue(value ? value + incGap : incGap);
                        setLTeamARate('');
                        setLTeamALayValue('')
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    }
                }
            }
            if (key == 'minus') {
                handleSuspend();
                if (incGap != 5) {
                    setIncGap(1)
                    if (event.target.name === 'teamA_rate') {
                        let result = handleZeroValue(targetValue, teamALayValue);
                        if (result) {
                            return;
                        }
                        let teamARateDecimal = teamARate % 1; // get the decimal portion of the number
                        let value;
                        if (teamARateDecimal >= 0.5) {
                            value = parseFloat(event.target.value) - 1;
                        } else {
                            value = parseFloat(event.target.value) - 0.50;
                        }
                        setTeamARate(value);
                        setTeamALayValue(value + 1);
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamARate(value);
                        setLTeamALayValue(value + 1);
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    } else if (event.target.name === 'teamB_rate') {
                        let result = handleZeroValue(targetValue, teamBLayValue);
                        if (result) {
                            return;
                        }
                        let teamBRateDecimal = teamBRate % 1; // get the decimal portion of the number
                        let value;
                        if (teamBRateDecimal >= 0.5) {
                            value = parseFloat(event.target.value) - 1;
                        } else {
                            value = parseFloat(event.target.value) - 0.50;
                        }
                        setTeamBRate(value);
                        setTeamBLayValue(value + 1);
                        setTeamARate('');
                        setTeamALayValue('')

                        setLTeamBRate(value);
                        setLTeamBLayValue(value + 1);
                        setLTeamARate('');
                        setLTeamALayValue('')
                    } else if (event.target.name === 'teamC_rate') {
                        let result = handleZeroValue(targetValue, teamCLayValue);
                        if (result) {
                            return;
                        }
                        let teamCRateDecimal = teamCRate % 1; // get the decimal portion of the number
                        let value;
                        if (teamCRateDecimal >= 0.5) {
                            value = parseFloat(event.target.value) - 1;
                        } else {
                            value = parseFloat(event.target.value) - 0.50;
                        }
                        setTeamCRate(value);
                        setTeamCLayValue(value + 1);
                        setTeamARate('');
                        setTeamALayValue('')
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamCRate(value);
                        setLTeamCLayValue(value + 1);
                        setLTeamARate('');
                        setLTeamALayValue('')
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    }
                } else {
                    if (event.target.name === 'teamA_rate' && event.target.value >= 5) {
                        let result = handleZeroValue(targetValue, teamALayValue);
                        if (result) {
                            return;
                        }
                        let value = Math.round(teamARate) - incGap;
                        setTeamARate(value ? value : 0);
                        setTeamALayValue(value ? value + incGap : incGap);
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamARate(value ? value : 0);
                        setLTeamALayValue(value ? value + incGap : incGap);
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    } else if (event.target.name === 'teamB_rate' && event.target.value >= 5) {
                        let result = handleZeroValue(targetValue, teamBLayValue);
                        if (result) {
                            return;
                        }
                        let value = Math.round(teamBRate) - incGap;
                        setTeamBRate(value ? value : 0);
                        setTeamBLayValue(value ? value + incGap : incGap);

                        setTeamARate('');
                        setTeamALayValue('')

                        setLTeamBRate(value ? value : 0);
                        setLTeamBLayValue(value ? value + incGap : incGap);

                        setLTeamARate('');
                        setLTeamALayValue('')
                    } else if (event.target.name === 'teamC_rate' && event.target.value >= 5) {
                        let result = handleZeroValue(targetValue, teamCLayValue);
                        if (result) {
                            return;
                        }
                        let value = Math.round(teamCRate) - incGap;
                        setTeamCRate(value ? value : 0);
                        setTeamCLayValue(value ? value + incGap : incGap);

                        setTeamARate('');
                        setTeamALayValue('');
                        setTeamBRate('');
                        setTeamBLayValue('')

                        setLTeamCRate(value ? value : 0);
                        setLTeamCLayValue(value ? value + incGap : incGap);

                        setLTeamARate('');
                        setLTeamALayValue('');
                        setLTeamBRate('');
                        setLTeamBLayValue('')
                    }
                }
            }
            if (key == '/') {
                handleSuspend();
                setIncGap(5);
                if (event.target.name === 'teamA_rate') {
                    let value = event.target.value ? targetValue : 0;
                    setTeamARate(value);
                    setTeamALayValue(value + 5);
                    setTeamBRate('');
                    setTeamBLayValue('')

                    setLTeamARate(value);
                    setLTeamALayValue(value + 5);
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                } else if (event.target.name === 'teamB_rate') {
                    let value = event.target.value ? targetValue : 0;
                    setTeamBRate(value);
                    setTeamBLayValue(value + 5);
                    setTeamARate('');
                    setTeamALayValue('')

                    setLTeamBRate(value);
                    setLTeamBLayValue(value + 5);
                    setLTeamARate('');
                    setLTeamALayValue('')
                } else if (event.target.name === 'teamC_rate') {
                    let value = event.target.value ? targetValue : 0;
                    setTeamCRate(value);
                    setTeamCLayValue(value + 5);
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('')


                    setLTeamCRate(value);
                    setLTeamCLayValue(value + 5);
                    setLTeamARate('');
                    setLTeamALayValue('');
                    setLTeamBRate('');
                    setLTeamBLayValue('')
                }
            }
        }

        return (
            <>
                <style jsx scoped>
                    {`
                
                    .InputChild input{
                        text-align: center;
                    }
                `}
                </style>
                <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '100%', alignSelf: 'center', paddingX: .2, paddingTop: .2, background: 'white' }}>
                    <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Bookmaker Market</Typography>
                    </Box>
                    <Box sx={{
                        flex: .1, background: '#262626'
                    }}>
                        <div className="slanted"></div>
                    </Box>
                    <Box sx={{
                        flex: 1, background: '#262626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <BookButton rate={bookRatioA(teamRates?.teamA, teamRates?.teamB)} />
                        <BookButton rate={bookRatioB(teamRates?.teamA, teamRates?.teamB)} />
                    </Box>
                </Box >
                <Box sx={{ border: "2px solid #FFFFFF" }}>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                        </Box>
                        <Box sx={{ background: "#00C0F9", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>Back</Typography>
                        </Box>
                        <Box sx={{ background: "#FF9292", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>Lay</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ background: "#FFFFFF", width: "60%", position: 'relative' }}>
                            {!add && <Box sx={{ width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '30%', top: '1px', background: 'black' }} >
                                <img src={BALLSTART} style={{ width: '80%', height: '30%', position: 'absolute', zIndex: 3 }} />
                            </Box>}
                            <Box sx={{ borderWidth: 0, justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', paddingLeft: '10px', }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%", }}>{match?.teamA}</Typography>
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
                                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: teamRates?.teamA <= 0 ? "#FF4D4D" : "#46e080" }}>
                                        {teamRates?.teamA}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: '30%', borderTop: "1px solid white" }}>
                                    <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                        <TextField
                                            className="InputChild"
                                            onChange={
                                                (e) => handleChange(e)
                                                // (i) => setValue1(i.target.value)
                                            }
                                            name={"teamA_rate"}
                                            inputRef={innerRefTeamA}
                                            onFocus={() => handleFocus(innerRefTeamA)}
                                            type="number"
                                            variant="standard"
                                            value={l_teamARate}
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: {
                                                    height: '55px', width: '98%',
                                                    background: '#F6F6F6',
                                                    // border: '1px solid #2626264D',
                                                    // borderRadius: '4px',
                                                    // border: "0.5px solid white",
                                                    alignSelf: 'flex-end',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    paddingX: '2px',
                                                    color: "#319E5B",
                                                    fontWeight: '600',
                                                    backgroundColor: '#A7DCFF',
                                                }
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
                                                height: '55px', width: '97%',
                                                background: '#F6F6F6',
                                                // border: '1px solid #2626264D',
                                                // borderRadius: '4px',
                                                // border: "0.5px solid white",
                                                alignSelf: 'flex-end',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                paddingX: '2px',
                                                color: "#319E5B",
                                                fontWeight: '600',
                                                backgroundColor: '#FFB5B5',
                                                textAlign: 'center'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ border: '.2px solid #2626264D', borderBottomWidth: 0, alignItems: 'center', display: 'flex', paddingLeft: '10px', borderRightWidth: 0, paddingLeft: '10px', borderLeftWidth: 0, width: '100%', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%" }}>{match?.teamB}</Typography>
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
                                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: teamRates?.teamB <= 0 ? "#FF4D4D" : "#319E5B" }}>
                                        {teamRates?.teamB}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: '30%', borderTop: "2px solid white" }}>
                                    <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                        <TextField
                                            className="InputChild"
                                            variant="standard"
                                            value={l_teamBRate}
                                            onChange={(e) => handleChange(e)}
                                            name={"teamB_rate"}
                                            inputRef={innerRefTeamB}
                                            type="number"
                                            onFocus={() => handleFocus(innerRefTeamB)}
                                            // onChange={(i) => setValue2(i.target.value)}
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: {
                                                    height: '55px', width: '98%',
                                                    background: '#F6F6F6',
                                                    // border: '1px solid #2626264D',
                                                    // borderRadius: '4px',
                                                    // border: "0.5px solid white",
                                                    alignSelf: 'flex-end',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    paddingX: '2px',
                                                    color: "#319E5B",
                                                    fontWeight: '600',
                                                    backgroundColor: '#A7DCFF',
                                                }
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
                                                height: '55px', width: '97%',
                                                background: '#F6F6F6',
                                                // border: '1px solid #2626264D',
                                                // borderRadius: '4px',
                                                // border: "0.5px solid white",
                                                alignSelf: 'flex-end',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                paddingX: '2px',
                                                color: "#319E5B",
                                                fontWeight: '600',
                                                backgroundColor: '#FFB5B5',
                                                textAlign: 'center'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                            {match?.teamC && <Box sx={{ border: '.2px solid #2626264D', borderBottomWidth: 0, alignItems: 'center', display: 'flex', paddingLeft: '10px', borderRightWidth: 0, paddingLeft: '10px', borderLeftWidth: 0, width: '100%', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%" }}>{match?.teamC}</Typography>
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
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: teamRates?.teamC <= 0 ? "#FF4D4D" : "#46e080" }}>
                                        {teamRates?.teamC}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: '30%', borderTop: "2px solid white" }}>
                                    <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                        <TextField
                                            className="InputChild"
                                            variant="standard"
                                            value={l_teamCRate}
                                            onChange={(e) => handleChange(e)}
                                            name={"teamC_rate"}
                                            inputRef={innerRefTeamC}
                                            type="number"
                                            onFocus={() => handleFocus(innerRefTeamC)}
                                            // onChange={(i) => setValue2(i.target.value)}
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: {
                                                    height: '55px', width: '98%',
                                                    background: '#F6F6F6',
                                                    alignSelf: 'flex-end',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    paddingX: '2px',
                                                    color: "#319E5B",
                                                    fontWeight: '600',
                                                    backgroundColor: '#A7DCFF',
                                                }
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
                                                height: '55px', width: '97%',
                                                background: '#F6F6F6',
                                                // border: '1px solid #2626264D',
                                                // borderRadius: '4px',
                                                // border: "0.5px solid white",
                                                alignSelf: 'flex-end',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                paddingX: '2px',
                                                color: "#319E5B",
                                                fontWeight: '600',
                                                backgroundColor: '#FFB5B5',
                                                textAlign: 'center'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>}
                        </Box>

                        <Box sx={{ borderLeft: "2px solid white", width: "40%" }}>
                            {teamBall?.isABall ? <Box
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
                                    color: "#fff"
                                }}
                            >
                                <img src={BallStart} style={{ width: '90px', height: '27px' }} />
                            </Box> :
                                <>
                                    {/* {!teamBall?.isABall ?  */}
                                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                        {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "55px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBackUnlock ?
                                                <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamBackUnlock ? 0 : teamARate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box> :
                                            <Box sx={{ background: isTeamASuspend ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "55px", justifyContent: "center", alignItems: "center" }}>
                                                {!isTeamASuspend ?
                                                    <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamASuspend ? 0 : teamARate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                            </Box>}
                                        <Box sx={{ background: isTeamASuspend ? "#FDF21A" : '#FFB5B5', width: "50%", borderLeft: "2px solid white", display: "flex", height: "55px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamASuspend ? <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamASuspend ? 0 : teamALayValue}</Typography> :
                                                <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box>
                                    </Box>
                                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                        {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "55px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBackUnlock ? <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamBackUnlock ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box> : <Box sx={{ background: isTeamBSuspend ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "55px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamBSuspend ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box>}
                                        <Box sx={{ background: isTeamBSuspend ? "#FDF21A" : "#FFB5B5", width: "50%", borderLeft: "2px solid white", display: "flex", height: "55px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamBSuspend ? 0 : teamBLayValue}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box>

                                    </Box>
                                    {match?.teamC &&
                                        <>
                                            {/* {!teamBall?.isCBall ?  */}
                                            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                                {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "56px", justifyContent: "center", alignItems: "center" }}>
                                                    {!isTeamBackUnlock ?
                                                        <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamBackUnlock ? 0 : teamCRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                                </Box> :
                                                    <Box sx={{ background: isTeamCSuspend ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "56px", justifyContent: "center", alignItems: "center" }}>
                                                        {!isTeamCSuspend ?
                                                            <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamCSuspend ? 0 : teamCRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                                    </Box>}
                                                <Box sx={{ background: isTeamCSuspend ? "#FDF21A" : '#FFB5B5', width: "50%", borderLeft: "2px solid white", display: "flex", height: "56px", justifyContent: "center", alignItems: "center" }}>
                                                    {!isTeamCSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "22px" }}>{isTeamCSuspend ? 0 : teamCLayValue}</Typography> :
                                                        <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                                </Box>
                                            </Box>
                                        </>
                                    }
                                </>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", zIndex: 2, position: 'relative', justifyContent: "center", width: '100%', marginTop: '2%', alignSelf: 'center' }}>
                    <Box sx={{ width: '2%' }} ></Box>
                    <Box
                        onClick={(e) => {
                            setVisible1(true)
                            setVisible(false)
                            e.stopPropagation()
                        }} sx={{ position: 'relative', width: "100%", display: "flex", background: "#FF4D4D", maxWidth: "150px", marginLeft: "5px", justifyContent: "center", alignItems: "center", height: "45px", borderRadius: "5px" }}>
                        <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Un Declare</Typography>
                        <Box sx={{ position: "absolute", zIndex: 999, top: '40px', left: '-120%' }}>
                            {visible1 && <ResultComponent

                                onClick={() => {
                                    setVisible1(false)
                                }}
                                betId={
                                    [{ match_id: match?.id, id: betId }]
                                }
                                teamA={match?.teamA}
                                teamB={match?.teamB}
                                tie={"Tie"}
                                draw={match?.teamC ? match?.teamC : ""}
                            />}
                        </Box>
                    </Box>
                    <Box sx={{ width: '2%' }} ></Box>

                    <Box onClick={(e) => {
                        setVisible(true)
                        setVisible1(false)
                        e.stopPropagation()
                    }} sx={{ width: "100%", position: 'relative', display: "flex", background: "white", marginLeft: "5px", maxWidth: "150px", justifyContent: "center", alignItems: "center", height: "45px", borderRadius: "5px" }}>
                        <Typography sx={{ color: "#0B4F26", fontWeight: "500", fontSize: "12px" }}>Declare</Typography>
                        <Box sx={{ position: "absolute", zIndex: 999, top: '40px', right: 0 }}>
                            {visible && <ResultComponent onClick={() => {
                                setVisible(false)
                            }}
                                betId={
                                    [{ match_id: match?.id, id: betId }]
                                }
                                teamA={match?.teamA}
                                teamB={match?.teamB}
                                tie={"Tie"}
                                draw={match?.teamC ? match?.teamC : ""}
                            />}
                        </Box>
                    </Box>
                </Box>
            </>
        )
    }
    const BookButton = ({ rate }) => {
        // alert(match)
        return (
            <Box
                sx={{
                    width: { laptop: "40%", mobile: "50px", tablet: "40%" },
                    // position: "absolute",
                    marginRight: '5px',
                    flexDirection: "column",
                    paddingX: "5px",
                    display: "flex",
                    left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    background: "white",
                    borderRadius: "3px",
                    border: "2px solid transparent"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: rate < 0 ? `#FF4D4D` : `#319E5B`,
                    }}
                >
                    {rate < 0 ? ` ${rate}` : `${rate}`}
                </Typography>
            </Box>
        )
    }
    return (
        <Box sx={{ flex: 1, background: "#0B4F26", borderRadius: "5px", position: 'relative', minHeight: "300px", py: "20px", px: "10px", pt: "5px" }}>
            {!add && <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', position: 'absolute', left: '0px', top: 0, zIndex: 1 }} ></Box>}
            <Typography sx={{ color: "white", fontSize: "20px", fontWeight: "600", zIndex: 2, position: 'relative' }}>{match?.title}</Typography>
            <Box sx={{ display: "flex", marginTop: "2px", flexDirection: 'column' }}>
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <AddSession />

                </Box>
            </Box>
        </Box>
    )
}



const RunsAmountBox = ({ anchorEl, open, handleClose }) => {
    const theme = useTheme()

    return (
        <>

            <Box
                sx={{
                    borderRadius: "5px",
                    border: "1px solid #306A47",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ minHeight: "120px", flexDirection: "column", backgroundColor: "white", display: "flex" }}>
                    <Box sx={{ display: "flex", height: "30px" }}>
                        <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Runs</Typography>
                        </Box>
                        <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Amount</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>40</Typography>
                        </Box>
                        <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
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
                    </Box>
                </Box>
            </Box>
        </>
    )
}