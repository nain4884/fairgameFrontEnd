import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useState, useRef, useContext, useEffect } from "react";
import StyledImage from "./StyledImage";
import ResultComponent from "./ResultComponent";
import './index.css'
import { BALLSTART } from "../expert/assets";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Lock, BallStart } from '../assets';
import { SocketContext } from "../context/socketContext";
import { setRole } from "../newStore";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookMakerBetRate } from "../newStore/reducers/matchDetails";

export default function IndiaPakLiveBookMaker({ add, match }) {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    const { bookmakerTeamRates } = useSelector((state) => state?.expertMatchDetails);
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
        // const id = location.state.match.id;
        const location = useLocation();
        const [teamARate, setTeamARate] = useState()
        const [teamALayValue, setTeamALayValue] = useState()
        const [teamBRate, setTeamBRate] = useState()
        const [teamBLayValue, setTeamBLayValue] = useState()
        const [teamCRate, setTeamCRate] = useState()
        const [teamCLayValue, setTeamCLayValue] = useState()
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

        useEffect(() => {
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
                    getAllBetsData(response?.data?.data[0].id, id);
                    setteamRates({
                        teamA: response?.data?.data[0].teamA_rate ? response?.data?.data[0].teamA_rate : 0,
                        teamB: response?.data?.data[0].teamB_rate ? response?.data?.data[0].teamB_rate : 0,
                        teamC: response?.data?.data[0].teamC_rate ? response?.data?.data[0].teamC_rate : 0
                    })
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

        // useEffect(() => {
        //     if (socket && socket.connected) {
        //         socket.onevent = async (packet) => {
        //             const data = packet.data[1];
        //             if (packet.data[0] === "match_bet") {
        //                 const data = packet.data[1];
        //                 try {
        //                     if (data) {
        //                         const body = {
        //                             id: data?.betPlaceData?.id,
        //                             isActive: true,
        //                             createAt: data?.betPlaceData?.createAt,
        //                             updateAt: data?.betPlaceData?.createAt,
        //                             createdBy: null,
        //                             deletedAt: null,
        //                             user_id: null,
        //                             match_id: data?.betPlaceData?.match_id,
        //                             bet_id: data?.betPlaceData?.bet_id,
        //                             result: "pending",
        //                             team_bet: data?.betPlaceData?.team_bet,
        //                             odds: data?.betPlaceData?.odds,
        //                             win_amount: null,
        //                             loss_amount: null,
        //                             bet_type: data?.betPlaceData?.bet_type,
        //                             country: null,
        //                             ip_address: null,
        //                             rate: null,
        //                             deleted_reason: data?.betPlaceData?.deleted_reason || null,
        //                             userName: data?.betPlaceData?.userName,
        //                             myStack: data?.betPlaceData?.myStack,
        //                             marketType: data?.betPlaceData?.marketType,
        //                             amount:
        //                                 data?.betPlaceData?.stack || data?.betPlaceData?.stake,
        //                         };
        //                         if (data?.betPlaceData?.match_id === match?.id) {
        //                             setteamRates({
        //                                 teamA: data?.teamA_rate ? data?.teamA_rate : 0,
        //                                 teamB: data?.teamB_rate ? data?.teamB_rate : 0,
        //                                 teamC: data?.teamC_rate ? data?.teamC_rate : 0
        //                             })
        //                             dispatch(setBookMakerBetRate((prev) => {
        //                                 // Create a new array by adding `body` at the beginning and spreading the previous values
        //                                 const newData = [body, ...prev];

        //                                 // Modify the `newData` array if needed

        //                                 // Return the modified `newData` array
        //                                 return newData;
        //                             }));
        //                         }
        //                     }
        //                 } catch (err) {
        //                     console.log(err?.message);
        //                 }

        //             }
        //             if (packet.data[0] === "teamA_suspend_user") {
        //                 if (data.teamA_suspend == 'Ball Started') {
        //                     setTeamBall((prevState) => ({
        //                         ...prevState,
        //                         isABall: true,
        //                         isBBall: true,
        //                         isCBall: true,
        //                     }));
        //                 } else {
        //                     setIsTeamASuspend(data.teamA_suspend);
        //                     setIsTeamBackUnlock(true);
        //                     setTeamBall((prevState) => ({
        //                         ...prevState,
        //                         isABall: false,
        //                         isBBall: false,
        //                         isCBall: false,
        //                     }));
        //                 }
        //                 setTeamSuspend((prevState) => ({
        //                     ...prevState,
        //                     teamA_suspend: true,
        //                 }));

        //             }
        //             if (packet.data[0] === "teamB_suspend_user") {
        //                 if (data.teamB_suspend == 'Ball Started') {
        //                     // setIsBBall(true)
        //                     setTeamBall((prevState) => ({
        //                         ...prevState,
        //                         isABall: true,
        //                         isBBall: true,
        //                         isCBall: true,
        //                     }));
        //                 } else {
        //                     setIsTeamBSuspend(data.teamB_suspend);
        //                     setIsTeamBackUnlock(true);
        //                     // setIsBBall(false);
        //                     setTeamBall((prevState) => ({
        //                         ...prevState,
        //                         isABall: false,
        //                         isBBall: false,
        //                         isCBall: false,
        //                     }));
        //                 }
        //                 setTeamSuspend((prevState) => ({
        //                     ...prevState,
        //                     teamB_suspend: true,
        //                 }));
        //             }
        //             if (packet.data[0] === "teamC_suspend_user") {
        //                 if (data.teamC_suspend == 'Ball Started') {
        //                     // setIsCBall(true)
        //                     setTeamBall((prevState) => ({
        //                         ...prevState,
        //                         isABall: true,
        //                         isBBall: true,
        //                         isCBall: true,
        //                     }));
        //                 } else {
        //                     setIsTeamCSuspend(data.teamC_suspend);
        //                     setIsTeamBackUnlock(true);
        //                     setTeamBall((prevState) => ({
        //                         ...prevState,
        //                         isABall: false,
        //                         isBBall: false,
        //                         isCBall: false,
        //                     }));
        //                 }
        //                 setTeamSuspend((prevState) => ({
        //                     ...prevState,
        //                     teamC_suspend: true,
        //                 }));
        //             }

        //             if (packet.data[0] === "teamA_rate_user") {
        //                 setIsTeamALock(data.teamA_suspend);
        //                 setTeamARate(data.teamA_Back);
        //                 setTeamALayValue(data.teamA_lay);
        //                 setIsTeamASuspend(data.teamA_suspend);
        //                 setTeamBall((prevState) => ({
        //                     ...prevState,
        //                     isABall: false,
        //                     isBBall: false,
        //                     isCBall: false,
        //                 }));
        //                 setTeamSuspend((prevState) => ({
        //                     ...prevState,
        //                     teamA_suspend: false,
        //                 }));
        //             }
        //             if (packet.data[0] === "teamB_rate_user") {
        //                 setIsTeamBLock(data?.teamB_suspend);
        //                 setTeamBRate(data?.teamB_Back);
        //                 setTeamBLayValue(data?.teamB_lay);
        //                 setIsTeamBSuspend(data?.teamB_suspend);
        //                 setTeamBall((prevState) => ({
        //                     ...prevState,
        //                     isABall: false,
        //                     isBBall: false,
        //                     isCBall: false,
        //                 }));
        //                 setTeamSuspend((prevState) => ({
        //                     ...prevState,
        //                     teamB_suspend: false,
        //                 }))
        //             }
        //             if (packet.data[0] === "teamC_rate_user") {
        //                 setIsTeamCLock(data.teamC_suspend);
        //                 setTeamCRate(data.teamC_Back);
        //                 setTeamCLayValue(data.teamC_lay);
        //                 setIsTeamCSuspend(data.teamC_suspend);
        //                 setTeamBall((prevState) => ({
        //                     ...prevState,
        //                     isABall: false,
        //                     isBBall: false,
        //                     isCBall: false,
        //                 }));
        //                 setTeamSuspend((prevState) => ({
        //                     ...prevState,
        //                     teamC_suspend: false,
        //                 }))
        //             }
        //             if (packet.data[0] === "updateRate_user") {
        //                 if (match?.teamC) {
        //                     setIsTeamBackUnlock(false);
        //                     setTeamARate(data.teamA_Back);
        //                     setTeamBRate(data.teamB_Back);
        //                     setTeamCRate(data.teamC_Back);
        //                     setTeamSuspend((prevState) => ({
        //                         ...prevState,
        //                         teamA_suspend: false,
        //                         teamB_suspend: false,
        //                         teamC_suspend: false,
        //                     }))

        //                 } else {
        //                     setIsTeamBackUnlock(false);
        //                     setTeamARate(data.teamA_Back);
        //                     setTeamBRate(data.teamB_Back);
        //                     setTeamSuspend((prevState) => ({
        //                         ...prevState,
        //                         teamA_suspend: false,
        //                         teamB_suspend: false,
        //                     }))
        //                 }
        //                 setTeamBall((prevState) => ({
        //                     ...prevState,
        //                     isABall: false,
        //                     isBBall: false,
        //                     isCBall: false,
        //                 }));
        //             }

        //         }
        //     }
        // }, [socket]);

        const handleSuspend = () => {
            if (match?.teamC) {
                if (!teamSuspend.teamA_suspend) {
                    socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, })
                }
                if (!teamSuspend.teamB_suspend) {
                    socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, });
                }
                if (!teamSuspend.teamC_suspend) {
                    socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: true, });
                }
            } else {
                if (!teamSuspend.teamA_suspend) {
                    socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, });
                }
                if (!teamSuspend.teamB_suspend) {
                    socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, });
                }
            }
        }

        const handleChange = (event) => {
            handleSuspend();
            let target = event.target;
            if (target.value <= 100) {
                if (target.name === 'teamA_rate') {
                    setTeamARate(target.value)
                    if (target.value !== '') {
                        let teamA_lay = parseInt(target.value) + 1
                        setTeamALayValue(teamA_lay);
                    } else {
                        setTeamALayValue('');
                    }
                }
                else if (target.name === 'teamB_rate') {
                    setTeamBRate(target.value)
                    if (target.value !== '') {
                        let teamB_lay = parseInt(target.value) + 1
                        setTeamBLayValue(teamB_lay);
                    } else {
                        setTeamBLayValue('');
                    }
                }
                else if (target.name === 'teamC_rate') {
                    setTeamCRate(target.value)
                    if (target.value !== '') {
                        let teamC_lay = parseInt(target.value) + 1
                        setTeamCLayValue(teamC_lay);
                    } else {
                        setTeamCLayValue('');
                    }
                }
            }
        }

        const handleFocus = (event) => {
        }
        const handleHunderedValue = (back, lay) => {
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
                    let chckValue = teamALayValue ? teamALayValue : value
                    setTeamALayValue(chckValue + incGap);
                    setTeamBRate('');
                    setTeamBLayValue('');
                }

                if (event.target.name === 'teamB_rate') {
                    let result = handleHunderedValue(targetValue, teamBLayValue);
                    if (result) {
                        return;
                    }
                    setTeamBRate(value);
                    let chckValue = teamBLayValue ? teamBLayValue : value
                    setTeamBLayValue(chckValue + incGap);
                    setTeamARate('');
                    setTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate') {
                    let result = handleHunderedValue(targetValue, teamCLayValue);
                    if (result) {
                        return;
                    }
                    setTeamCRate(value);
                    let chckValue = teamCLayValue ? teamCLayValue : value
                    setTeamCLayValue(chckValue + incGap);
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');
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
                }

                if (event.target.name === 'teamB_rate' && teamBRate > 0) {
                    setTeamBRate(value);
                    setTeamBLayValue(teamBLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate' && teamCRate > 0) {
                    setTeamCRate(value);
                    setTeamCLayValue(teamCLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');
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
                    setTeamALayValue(value + incGap);
                    setTeamBRate('');
                    setTeamBLayValue('')
                }

                if (event.target.name === 'teamB_rate') {
                    let result = handleHunderedValue(targetValue, teamBLayValue);
                    if (result) {
                        return;
                    }
                    let value = teamBLayValue ? teamBLayValue : teamBRate
                    setTeamBLayValue(value + incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate') {
                    let result = handleHunderedValue(targetValue, teamCLayValue);
                    if (result) {
                        return;
                    }
                    let value = teamCLayValue ? teamCLayValue : teamCRate
                    setTeamCLayValue(value + incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');
                }
            }
            else if (key == 'down') {
                handleSuspend();
                setPressEnter(false);
                if (event.target.name === 'teamA_rate' && teamALayValue - incGap > teamARate) {
                    setTeamALayValue(teamALayValue - incGap);
                    setTeamBRate('');
                    setTeamBLayValue('')
                }

                if (event.target.name === 'teamB_rate' && teamBLayValue - incGap > teamBRate) {
                    setTeamBLayValue(teamBLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                }
                if (event.target.name === 'teamC_rate' && teamCLayValue - incGap > teamCRate) {
                    setTeamCLayValue(teamCLayValue - incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');
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
                            betId: betId,
                            teamA_Back: targetValue,
                            teamA_suspend: false,
                            teamB_Back: targetValue,
                            teamB_suspend: false,
                            teamC_Back: targetValue,
                            teamC_suspend: false
                        }
                    } else {
                        data = {
                            betId: betId,
                            teamA_Back: targetValue,
                            teamALayValue: "",
                            teamA_suspend: false,
                            teamB_Back: targetValue,
                            teamBLayValue: "",
                            teamB_suspend: false,
                            teamC_Back: "",
                            teamCLayValue: "",
                        }
                    }
                    socket.emit("updateRate", data);
                } else {
                    if (event.target.name === 'teamA_rate') {
                        socket.emit("updateRate", {
                            betId: betId,
                            teamA_lay: teamALayValue,
                            teamA_Back: teamARate,
                            teamA_suspend: false,
                            teamB_lay: 0,
                            teamB_Back: 0,
                            teamB_suspend: true,
                            teamC_lay: 0,
                            teamC_Back: 0,
                            teamC_suspend: true,
                        });
                    }
                    if (event.target.name === 'teamB_rate') {
                        socket.emit("updateRate", {
                            betId: betId,
                            teamA_lay: teamALayValue,
                            teamA_Back: teamARate,
                            teamA_suspend: false,
                            teamB_lay: 0,
                            teamB_Back: 0,
                            teamB_suspend: true,
                            teamC_lay: 0,
                            teamC_Back: 0,
                            teamC_suspend: true,
                        });
                    }
                    if (event.target.name === 'teamC_rate') {
                        socket.emit("teamC_rate", {
                            betId: betId,
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
                } else if (event.target.name === 'teamB_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamBRate(value);
                    setTeamBLayValue(value + 0.5);
                    setIncGap(0.25)
                    setTeamARate('');
                    setTeamALayValue('')
                } else if (event.target.name === 'teamC_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamCRate(value);
                    setTeamCLayValue(value + 0.5);
                    setIncGap(0.25)
                    setTeamARate('');
                    setTeamALayValue('')
                    setTeamBRate('');
                    setTeamBLayValue('')
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
                    }
                }
            }
            if (key == 'shift') {
                socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: 'Ball Started', })
                socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: 'Ball Started', })
                socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: 'Ball Started', })
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
                    }
                } else {
                    if (event.target.name === 'teamA_rate') {
                        let value = Math.round(teamARate) + incGap;
                        // alert(value)
                        setTeamARate(value ? value : 1);
                        setTeamALayValue(value ? value + incGap : incGap);
                        setTeamBRate('');
                        setTeamBLayValue('')
                    } else if (event.target.name === 'teamB_rate') {
                        let value = Math.round(teamBRate) + incGap;
                        setTeamBRate(value ? value : 1);
                        setTeamBLayValue(value ? value + incGap : incGap);
                        setTeamARate('');
                        setTeamALayValue('')
                    } else if (event.target.name === 'teamC_rate') {
                        let value = Math.round(teamCRate) + incGap;
                        setTeamCRate(value ? value : 1);
                        setTeamCLayValue(value ? value + incGap : incGap);
                        setTeamARate('');
                        setTeamALayValue('')
                        setTeamBRate('');
                        setTeamBLayValue('')
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
                } else if (event.target.name === 'teamB_rate') {
                    let value = event.target.value ? targetValue : 0;
                    setTeamBRate(value);
                    setTeamBLayValue(value + 5);
                    setTeamARate('');
                    setTeamALayValue('')
                } else if (event.target.name === 'teamC_rate') {
                    let value = event.target.value ? targetValue : 0;
                    setTeamCRate(value);
                    setTeamCLayValue(value + 5);
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('')
                }
            }

        }

        return (
            <>
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
                            <Box sx={{ borderWidth: 0, justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', paddingLeft: '10px' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%", }}>{match?.teamA}</Typography>
                                <Box
                                    sx={{
                                        width: "80px",
                                        marginRight: "15px",
                                        border: "1px solid #2626264D",
                                        borderRadius: "5px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                        height: "25px",
                                        background: "#F6F6F6",
                                        borderRadius: "7px",
                                        zIndex: 100,
                                    }}
                                >
                                    <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: teamRates?.teamA <= 0 ? "#FF4D4D" : "#46e080" }}>
                                        {teamRates?.teamA}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: '30%', borderTop: "1px solid white" }}>
                                    <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                        <TextField
                                            onChange={
                                                (e) => handleChange(e)
                                            }
                                            name={"teamA_rate"}
                                            inputRef={innerRefTeamA}
                                            onFocus={() => handleFocus(innerRefTeamA)}
                                            type="number"
                                            variant="standard"
                                            value={teamARate}
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: {
                                                    height: '45px', width: '98%',
                                                    background: '#F6F6F6',
                                                    alignSelf: 'flex-end',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    paddingX: '5px',
                                                    color: "#319E5B",
                                                    fontWeight: '600',
                                                    backgroundColor: '#A7DCFF',
                                                }
                                            }}
                                        />
                                    </KeyboardEventHandler>
                                    <TextField
                                        disabled
                                        variant="standard"
                                        value={teamALayValue}
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                height: '45px', width: '97%',
                                                background: '#F6F6F6',
                                                alignSelf: 'flex-end',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                paddingX: '5px',
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
                                        width: "80px",
                                        marginRight: "15px",
                                        border: "1px solid #2626264D",
                                        borderRadius: "5px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                        height: "25px",
                                        background: "#F6F6F6",
                                        borderRadius: "7px",
                                        zIndex: 100,
                                    }}
                                >
                                    <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: teamRates?.teamB <= 0 ? "#FF4D4D" : "#46e080" }}>
                                        {teamRates?.teamB}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: '30%', borderTop: "2px solid white" }}>
                                    <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                        <TextField
                                            variant="standard"
                                            value={teamBRate}
                                            onChange={(e) => handleChange(e)}
                                            name={"teamB_rate"}
                                            inputRef={innerRefTeamB}
                                            type="number"
                                            onFocus={() => handleFocus(innerRefTeamB)}
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: {
                                                    height: '45px', width: '98%',
                                                    background: '#F6F6F6',
                                                    alignSelf: 'flex-end',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    paddingX: '5px',
                                                    color: "#319E5B",
                                                    fontWeight: '600',
                                                    backgroundColor: '#A7DCFF',
                                                }
                                            }}
                                        />
                                    </KeyboardEventHandler>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={teamBLayValue}
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                height: '45px', width: '97%',
                                                background: '#F6F6F6',
                                                alignSelf: 'flex-end',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                paddingX: '5px',
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
                                        width: "80px",
                                        marginRight: "15px",
                                        border: "1px solid #2626264D",
                                        borderRadius: "5px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                        height: "25px",
                                        background: "#F6F6F6",
                                        borderRadius: "7px",
                                        zIndex: 100,
                                    }}
                                >
                                    <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: teamRates?.teamC <= 0 ? "#FF4D4D" : "#46e080" }}>
                                        {teamRates?.teamC}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: '30%', borderTop: "2px solid white" }}>
                                    <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                        <TextField
                                            variant="standard"
                                            value={teamCRate}
                                            onChange={(e) => handleChange(e)}
                                            name={"teamC_rate"}
                                            inputRef={innerRefTeamC}
                                            type="number"
                                            onFocus={() => handleFocus(innerRefTeamC)}
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: {
                                                    height: '45px', width: '98%',
                                                    background: '#F6F6F6',
                                                    alignSelf: 'flex-end',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    paddingX: '5px',
                                                    color: "#319E5B",
                                                    fontWeight: '600',
                                                    backgroundColor: '#A7DCFF',
                                                }
                                            }}
                                        />
                                    </KeyboardEventHandler>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={teamCLayValue}
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                height: '45px', width: '97%',
                                                background: '#F6F6F6',
                                                // border: '1px solid #2626264D',
                                                // borderRadius: '4px',
                                                // border: "0.5px solid white",
                                                alignSelf: 'flex-end',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                paddingX: '5px',
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
                                    height: match?.teamC ? "140px" : "92px",
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
                                <img src={BallStart} style={{ width: '60px', height: '17px' }} />
                            </Box> :
                                <>
                                    {/* {!teamBall?.isABall ?  */}
                                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                        {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBackUnlock ?
                                                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBackUnlock ? 0 : teamARate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box> :
                                            <Box sx={{ background: isTeamASuspend ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                                {!isTeamASuspend ?
                                                    <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamASuspend ? 0 : teamARate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                            </Box>}
                                        <Box sx={{ background: isTeamASuspend ? "#FDF21A" : '#FFB5B5', width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamASuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamASuspend ? 0 : teamALayValue}</Typography> :
                                                <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box>
                                    </Box>
                                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                        {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBackUnlock ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBackUnlock ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box> : <Box sx={{ background: isTeamBSuspend ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBSuspend ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box>}
                                        <Box sx={{ background: isTeamBSuspend ? "#FDF21A" : "#FFB5B5", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                            {!isTeamBSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBSuspend ? 0 : teamBLayValue}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                        </Box>

                                    </Box>

                                    {match?.teamC &&
                                        <>
                                            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                                {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                                    {!isTeamBackUnlock ?
                                                        <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBackUnlock ? 0 : teamCRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                                </Box> :
                                                    <Box sx={{ background: isTeamCSuspend ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                                        {!isTeamCSuspend ?
                                                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamCSuspend ? 0 : teamCRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                                    </Box>}
                                                <Box sx={{ background: isTeamCSuspend ? "#FDF21A" : '#FFB5B5', width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                                    {!isTeamCSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamCSuspend ? 0 : teamCLayValue}</Typography> :
                                                        <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                                                </Box>
                                            </Box>

                                        </>
                                    }
                                </>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", zIndex: 2, position: 'relative', justifyContent: "center", width: '100%', marginTop: '5%', alignSelf: 'center' }}>
                    <Box sx={{ width: '2%' }} ></Box>
                    <Box
                        onClick={(e) => {
                            setVisible1(true)
                            setVisible(false)
                            e.stopPropagation()
                        }} sx={{ position: 'relative', width: "30%", display: "flex", background: "#FF4D4D", maxWidth: "120px", marginLeft: "5px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
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
                    }} sx={{ width: "30%", position: 'relative', display: "flex", background: "white", marginLeft: "5px", maxWidth: "120px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
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
        return (
            <Box
                sx={{
                    width: { laptop: "70px", mobile: "50px", tablet: "70px" },
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
                }}
            >
                <Typography
                    sx={{
                        color: "#FF4D4D",
                        fontSize: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Book
                </Typography>
                <Typography
                    sx={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: rate < 0 ? `#FF9292` : `#46e080`,
                    }}
                >
                    {rate < 0 ? ` ${rate}` : `${rate}`}
                </Typography>
            </Box>
        )
    }
    return (
        <Box sx={{ flex: 1, background: "#0B4F26", borderRadius: "5px", position: 'relative', minHeight: "300px", py: "20px", px: "10px" }}>
            {!add && <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', position: 'absolute', left: '0px', top: 0, zIndex: 1 }} ></Box>}
            <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600", zIndex: 2, position: 'relative' }}>{match?.title}</Typography>
            <Box sx={{ display: "flex", marginTop: "20px", flexDirection: 'column' }}>

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
    )
}