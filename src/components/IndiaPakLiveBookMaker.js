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
        // const [isABall, setIsABall] = useState(false)
        // const [isBBall, setIsBBall] = useState(false)
        // const [isCBall, setIsCBall] = useState(false)
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
        // const [isCall, setIsCall] = useState(false)
        const [betId, setBetId] = useState("")
        const [isTab, setIsTab] = useState("")
        // const [isTeamCDisabled, setIsTeamCDisabled] = useState(true)
        const innerRefTeamA = useRef();
        const innerRefTeamB = useRef();
        const innerRefTeamC = useRef();

        const [teamRates, setteamRates] = useState({
            teamA: bookmakerTeamRates?.teamA,
            teamB: bookmakerTeamRates?.teamB,
            teamC: bookmakerTeamRates?.teamC
        })

        useEffect(() => {
            // alert(JSON.stringify(bookmakerTeamRates))
            getManuallBookMaker(match?.id);
            // console.log("match :", JSON.stringify(match));
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
                    // alert(id)
                    getAllBetsData(response?.data?.data[0].id, id);
                    setteamRates({
                        teamA: response?.data?.data[0].teamA_rate ? response?.data?.data[0].teamA_rate : 0,
                        teamB: response?.data?.data[0].teamB_rate ? response?.data?.data[0].teamB_rate : 0,
                        teamC: response?.data?.data[0].teamC_rate ? response?.data?.data[0].teamC_rate : 0
                    })
                    // dispatch(setBookmakerTeamRates({
                    //     teamA: response?.data?.data[0].teamA_rate ? response?.data?.data[0].teamA_rate : 0,
                    //     teamB: response?.data?.data[0].teamB_rate ? response?.data?.data[0].teamB_rate : 0,
                    //     teamC: response?.data?.data[0].teamC_rate ? response?.data?.data[0].teamC_rate : 0
                    // }));
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
                // alert("ddd :" + JSON.stringify(response?.data?.data?.id))
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

        async function getAllBetsData(id, matchId) {
            // alert(122)
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
                            // console.warn(data, "check rates");
                            // getAllBets();
                            // console.log(data, "MATCHH_BET", data?.betPlaceData?.match_id, id);
                            if (data) {
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
                                if (data?.betPlaceData?.match_id === match?.id) {
                                    setteamRates({
                                        teamA: data?.teamA_rate ? data?.teamA_rate : 0,
                                        teamB: data?.teamB_rate ? data?.teamB_rate : 0,
                                        teamC: data?.teamC_rate ? data?.teamC_rate : 0
                                    })
                                    // dispatch(setBookMakerBetRate((prev) => [body, ...prev]));
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
                    // if (packet.data[0] === "teamA_suspend_user") {
                    //     if (data.teamA_suspend == 'Ball Started') {
                    //         // setIsABall(true)
                    //         setTeamBall((prevState) => ({
                    //             ...prevState,
                    //             isABall: true,
                    //             isBBall: true,
                    //             isCBall: true,
                    //         }));
                    //     } else {
                    //         setIsTeamASuspend(data.teamA_suspend);
                    //         setIsTeamBackUnlock(true);
                    //         // setIsABall(false);
                    //         setTeamBall((prevState) => ({
                    //             ...prevState,
                    //             isABall: false,
                    //             isBBall: false,
                    //             isCBall: false,
                    //         }));
                    //     }
                    //     setTeamSuspend((prevState) => ({
                    //         ...prevState,
                    //         teamA_suspend: true,
                    //     }));

                    // }
                    // if (packet.data[0] === "teamB_suspend_user") {
                    //     if (data.teamB_suspend == 'Ball Started') {
                    //         // setIsBBall(true)
                    //         setTeamBall((prevState) => ({
                    //             ...prevState,
                    //             isABall: true,
                    //             isBBall: true,
                    //             isCBall: true,
                    //         }));
                    //     } else {
                    //         setIsTeamBSuspend(data.teamB_suspend);
                    //         setIsTeamBackUnlock(true);
                    //         // setIsBBall(false);
                    //         setTeamBall((prevState) => ({
                    //             ...prevState,
                    //             isABall: false,
                    //             isBBall: false,
                    //             isCBall: false,
                    //         }));
                    //     }
                    //     setTeamSuspend((prevState) => ({
                    //         ...prevState,
                    //         teamB_suspend: true,
                    //     }));
                    // }
                    // if (packet.data[0] === "teamC_suspend_user") {
                    //     if (data.teamC_suspend == 'Ball Started') {
                    //         // setIsCBall(true)
                    //         setTeamBall((prevState) => ({
                    //             ...prevState,
                    //             isABall: true,
                    //             isBBall: true,
                    //             isCBall: true,
                    //         }));
                    //     } else {
                    //         setIsTeamCSuspend(data.teamC_suspend);
                    //         setIsTeamBackUnlock(true);
                    //         // setIsCBall(false);
                    //         setTeamBall((prevState) => ({
                    //             ...prevState,
                    //             isABall: false,
                    //             isBBall: false,
                    //             isCBall: false,
                    //         }));
                    //         // alert("teamB_suspend_user")
                    //     }
                    //     setTeamSuspend((prevState) => ({
                    //         ...prevState,
                    //         teamC_suspend: true,
                    //     }));
                    // }

                    // if (packet.data[0] === "teamA_rate_user") {
                    //     setIsTeamALock(data.teamA_suspend);
                    //     setTeamARate(data.teamA_Back);
                    //     setTeamALayValue(data.teamA_lay);
                    //     setIsTeamASuspend(data.teamA_suspend);
                    //     // setIsABall(false);
                    //     setTeamBall((prevState) => ({
                    //         ...prevState,
                    //         isABall: false,
                    //         isBBall: false,
                    //         isCBall: false,
                    //     }));
                    //     setTeamSuspend((prevState) => ({
                    //         ...prevState,
                    //         teamA_suspend: false,
                    //     }));
                    // }
                    // if (packet.data[0] === "teamB_rate_user") {
                    //     // if (teamBLayValue) {
                    //     setIsTeamBLock(data?.teamB_suspend);
                    //     setTeamBRate(data?.teamB_Back);
                    //     setTeamBLayValue(data?.teamB_lay);
                    //     setIsTeamBSuspend(data?.teamB_suspend);
                    //     // } 
                    //     // else {
                    //     // setIsTeamBackUnlock(false);
                    //     // }
                    //     // setIsBBall(false);
                    //     setTeamBall((prevState) => ({
                    //         ...prevState,
                    //         isABall: false,
                    //         isBBall: false,
                    //         isCBall: false,
                    //     }));
                    //     setTeamSuspend((prevState) => ({
                    //         ...prevState,
                    //         teamB_suspend: false,
                    //     }))
                    // }
                    // if (packet.data[0] === "teamC_rate_user") {
                    //     setIsTeamCLock(data.teamC_suspend);
                    //     setTeamCRate(data.teamC_Back);
                    //     setTeamCLayValue(data.teamC_lay);
                    //     setIsTeamCSuspend(data.teamC_suspend);
                    //     // setIsTeamBackUnlock(false);
                    //     // setIsCBall(false);
                    //     setTeamBall((prevState) => ({
                    //         ...prevState,
                    //         isABall: false,
                    //         isBBall: false,
                    //         isCBall: false,
                    //     }));
                    //     setTeamSuspend((prevState) => ({
                    //         ...prevState,
                    //         teamC_suspend: false,
                    //     }))
                    // }
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
                                    // setIsABall(true)
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
                                    // setIsABall(false);
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
                        // alert(1)
                    }

                }
            }
        }, [socket]);

        const handleSuspend = () => {
            // alert(JSON.stringify(teamSuspend))
            // if (match?.teamC) {
            //     // if (!teamSuspend.teamA_suspend) {
            //     //     // socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, })
            //     // }
            //     // if (!teamSuspend.teamB_suspend) {
            //     //     socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, });
            //     // }
            //     // if (!teamSuspend.teamC_suspend) {
            //     //     socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: true, });
            //     // }
            //     if (!teamSuspend.teamA_suspend) {
            //         socket.emit("updateRate", {
            //             betId: betId,
            //             teamA_lay: "",
            //             teamA_Back: "",
            //             teamA_suspend: true,
            //             teamB_lay: "",
            //             teamB_Back: "",
            //             teamB_suspend: true,
            //             teamC_lay: "",
            //             teamC_Back: "",
            //             teamC_suspend: true,
            //             lock: true
            //         });
            //     }
            // } else {
            //     // if (!teamSuspend.teamA_suspend) {
            //     //     socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, });
            //     // }
            //     // if (!teamSuspend.teamB_suspend) {
            //     //     socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, });
            //     // }
            //     socket.emit("updateRate", {
            //         betId: betId,
            //         teamA_lay: 0,
            //         teamA_Back: 0,
            //         teamA_suspend: true,
            //         teamB_lay: 0,
            //         teamB_Back: 0,
            //         teamB_suspend: true,
            //         lock: true
            //     });
            // }
            // alert(JSON.stringify(teamSuspend))
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
                    if (target.value !== '') {
                        let teamA_lay = parseInt(target.value) + 1
                        // if (incGap > 0) {
                        //     // teamA_lay = teamA_lay + this.state.up_keypress
                        // }
                        setTeamALayValue(teamA_lay);
                    } else {
                        setTeamALayValue('');
                    }
                }
                else if (target.name === 'teamB_rate') {
                    setTeamBRate(target.value)
                    if (target.value !== '') {
                        let teamB_lay = parseInt(target.value) + 1
                        // if (incGap > 0) {
                        //     // teamB_lay = teamB_lay + this.state.up_keypress
                        // }
                        setTeamBLayValue(teamB_lay);
                    } else {
                        setTeamBLayValue('');
                    }
                }
                else if (target.name === 'teamC_rate') {
                    setTeamCRate(target.value)
                    if (target.value !== '') {
                        let teamC_lay = parseInt(target.value) + 1
                        // if (incGap > 0) {
                        //     // teamB_lay = teamB_lay + this.state.up_keypress
                        // }
                        setTeamCLayValue(teamC_lay);
                    } else {
                        setTeamCLayValue('');
                    }
                }
            }
        }

        const handleFocus = (event) => {
            // if (event.current.name === 'teamA_rate') {
            //     // alert(1)
            //     setTeamBRate('');
            //     setTeamBLayValue('')
            // } else if (event.current.name === 'teamB_rate') {
            //     setTeamARate('');
            //     setTeamALayValue('')
            // }
            // alert(event.current.name)
            // console.log(event.current.name)
            // if (match?.teamC) {
            //     // if (event.current.name === 'teamA_rate') {
            //     // } else if (event.current.name === 'teamB_rate') {
            //     // } else if (event.current.name === 'teamC_rate') {
            //     socket.emit("teamC_Suspend", {
            //         betId: match?.id,
            //         teamC_suspend: true,
            //     });
            //     // }
            // } else {
            //     // if (event.current.name === 'teamA_rate') {
            //     // } else if (event.current.name === 'teamB_rate') {
            //     // }
            // }
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
            // alert(back)
            if (back < 1) {
                return true;
            }
            if (lay < 0) {
                return true;
            }
            return false;
        }

        const handleKeysMatchEvents = (key, event) => {

            // alert(key);
            // console.log('handle key event');
            event.preventDefault();
            // this.setState({ focus_team: event.target.getAttribute('id'), ERROR: false });
            let targetValue = parseFloat(event.target.value);
            event.target.value = targetValue;
            // alert(targetValue)
            if (key == 'right') {
                handleSuspend();
                // let value = targetValue + 1
                let value = targetValue ? targetValue + incGap : incGap
                setPressEnter(false);
                if (event.target.name === 'teamA_rate') {
                    let result = handleHunderedValue(targetValue, teamALayValue);
                    if (result) {
                        return;
                    }
                    // alert(teamARate)
                    setTeamARate(value);
                    // setTeamALayValue(teamALayValue + 1);
                    let chckValue = teamALayValue ? teamALayValue : value
                    // setTeamALayValue(teamALayValue + incGap);
                    setTeamALayValue(chckValue + incGap);
                    setTeamBRate('');
                    setTeamBLayValue('');
                }

                if (event.target.name === 'teamB_rate') {
                    let result = handleHunderedValue(targetValue, teamBLayValue);
                    if (result) {
                        return;
                    }
                    // this.setState({ teamB_rate: value, ERROR: false });
                    setTeamBRate(value);
                    let chckValue = teamBLayValue ? teamBLayValue : value
                    setTeamBLayValue(chckValue + incGap);
                    // setTeamBLayValue(teamBLayValue + incGap);
                    setTeamARate('');
                    // setTeamALayValue(teamALayValue + 1);
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
                    // setTeamBLayValue(teamBLayValue + incGap);
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');
                }
                // event.target.value = value
            }
            else if (key == 'left') {
                handleSuspend();
                // let value = targetValue - 1
                let value = targetValue - incGap
                setPressEnter(false);
                // if (event.target.name === 'teamA_rate' && teamALayValue - incGap > teamARate && teamARate > 0) {
                if (event.target.name === 'teamA_rate' && teamARate > 0) {
                    setTeamARate(value);
                    setTeamALayValue(teamALayValue - incGap);
                    setTeamBRate('');
                    setTeamBLayValue('')
                }

                // if (event.target.name === 'teamB_rate' && teamBLayValue - incGap > teamBRate && teamBRate > 0) {
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

                // event.target.value = value
            }
            else if (key == 'up') {
                handleSuspend();
                setPressEnter(false);
                // let upkey = this.state.up_keypress;
                // upkey = upkey + 1
                // let lay_value = targetValue + upkey + 1
                if (event.target.name === 'teamA_rate') {
                    let result = handleHunderedValue(targetValue, teamALayValue);
                    if (result) {
                        return;
                    }
                    // alert(teamALayValue)
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
                    // this.setState({ teamB_rate: value, ERROR: false });
                    let value = teamBLayValue ? teamBLayValue : teamBRate
                    setTeamBLayValue(value + incGap)
                    // setTeamBLayValue(teamBLayValue + incGap)
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
                    // setTeamBLayValue(teamBLayValue + incGap)
                    setTeamARate('');
                    setTeamALayValue('');
                    setTeamBRate('');
                    setTeamBLayValue('');
                }
            }
            else if (key == 'down') {
                handleSuspend();
                setPressEnter(false);
                // if (event.target.name === 'teamA_rate' && teamALayValue - incGap > teamARate) {
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
                // alert(event.target.name)
                // console.log("gggggg :", event.target.name);
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
                        // socket.emit("teamA_rate", {
                        //     betId: betId,
                        //     teamA_lay: teamALayValue,
                        //     teamA_Back: teamARate,
                        //     teamA_suspend: false,
                        // });
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
                        // socket.emit("teamB_rate", {
                        //     betId: betId,
                        //     teamB_lay: teamBLayValue,
                        //     teamB_Back: teamBRate,
                        //     teamB_suspend: false,
                        // });
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
                        // socket.emit("teamC_rate", {
                        //     betId: betId,
                        //     teamC_lay: teamCLayValue,
                        //     teamC_Back: teamCRate,
                        //     teamC_suspend: false,
                        // });
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
                // if (event.target.name === 'teamA_rate') {
                setTeamARate(targetValue);
                setTeamBRate(targetValue);
                setTeamCRate(targetValue);
                setTeamALayValue('');
                setTeamBLayValue('');
                setTeamCLayValue('');
                setIsTab("tab");
                // let data = {};
                // if (match?.teamC) {
                //     data = {
                //         betId: betId,
                //         teamA_Back: targetValue,
                //         teamA_suspend: false,
                //         teamB_Back: targetValue,
                //         teamB_suspend: false,
                //         teamC_Back: targetValue,
                //         teamC_suspend: false
                //     }
                // } else {
                //     data = {
                //         betId: betId,
                //         teamA_Back: targetValue,
                //         teamALayValue: "",
                //         teamA_suspend: false,
                //         teamB_Back: targetValue,
                //         teamBLayValue: "",
                //         teamB_suspend: false,
                //         teamC_Back: "",
                //         teamCLayValue: "",
                //     }
                // }

                // socket.emit("updateRate", data);
                // }
                // setTeamARate(targetValue);
                // setTeamBRate(targetValue);
                // setTeamALayValue('');
                // setTeamBLayValue('');
            }
            if (key == '*') {
                handleSuspend();
                // alert(1)
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
                // this.setState({ lay_5: 1, ERROR: false });
            }
            if (key == 'ctrl') {
                handleSuspend();
                // let value = event.target.value ? targetValue - 0.5 : -0.5;
                // setTeamARate(value);
                // setTeamALayValue(value - 0.5);
                setIncGap(1)
                // event.target.value = parseFloat(targetValue) - 0.5
                // this.setState({ back_5: 1, ERROR: false });
            }
            // if (key == 'control') {
            //     setIncGap(1)
            // }
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
                    // let value = Math.round(teamARate);
                    // let layValue = Math.round(teamALayValue);
                    setTeamARate(value);
                    setTeamALayValue(value + 1);
                } else if (event.target.name === 'teamB_rate') {
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
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
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
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
                    // let value = Math.round(teamARate);
                    // let layValue = Math.round(teamALayValue);
                    setTeamARate(value);
                    // alert(value)
                    // setTeamALayValue(value > 1 ? layValue + 0.5 : layValue + 1.5);
                    setTeamALayValue(value + 1.5);
                    setTeamBRate('');
                    setTeamBLayValue('')
                } else if (event.target.name === 'teamB_rate') {
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
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
                    // setTeamBLayValue(value > 1 ? layValue + 0.5 : layValue + 1.5);
                } else if (event.target.name === 'teamC_rate') {
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
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
                    // setTeamBLayValue(value > 1 ? layValue + 0.5 : layValue + 1.5);
                }

            }
            if (key == ',') {
                handleSuspend();
                // let value = event.target.value ? targetValue - 0.5 : -0.5;
                // setTeamARate(value);
                // setTeamALayValue(value - 0.5);
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
                        // let value = Math.round(teamARate);
                        // let layValue = Math.round(teamALayValue);
                        // alert(value)
                        setTeamARate(value - 0.5);
                        setTeamALayValue(value + 1);

                        setTeamBRate('');
                        setTeamBLayValue('')
                    }
                } else if (event.target.name === 'teamB_rate') {
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
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
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
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
                // if (event.target.name === 'teamA_rate') {
                // socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: 'Ball Started', })
                // // } else if (event.target.name === 'teamB_rate') {
                // socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: 'Ball Started', })
                // // } else if (event.target.name === 'teamC_rate') {
                // socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: 'Ball Started', })
                // }
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
                        // alert(targetValue)
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
                // alert(event.target.value)
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
                // this.setState({ lay_5: 1, ERROR: false });
            }

            // teamA_suspended = 'ball started '
            // console.log('event :', event)
            // console.warn('event :', event)
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
                            {/* <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>Add Session</Typography> */}
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
                                        width: "230px",
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
                                            value={teamARate}
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
                                                    paddingX: '5px',
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
                                        value={teamALayValue}
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
                                        width: "230px",
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
                                            value={teamBRate}
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
                                                    paddingX: '5px',
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
                                        value={teamBLayValue}
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
                                        width: "230px",
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
                                            value={teamCRate}
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
                                                    paddingX: '5px',
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
                                        value={teamCLayValue}
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
                                            {/* <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}ww</Typography> */}
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
                                    {/* :
                                    <Box
                                        sx={{
                                            borderTop: "2px solid white",
                                            background: "rgba(0,0,0,1)",
                                            height: "45px",
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
                                    </Box>} */}

                                    {/* {!teamBall?.isBBall ? */}
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
                                    {/* :
                                    <Box
                                        sx={{
                                            borderTop: "2px solid white",
                                            background: "rgba(0,0,0,1)",
                                            height: "45px",
                                            right: 0,
                                            // position: "absolute",
                                            width: "100%",
                                            // width: { laptop: "50%", mobile: "40.5%" },
                                            justifyContent: { mobile: "center", laptop: "center" },
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <img src={BallStart} style={{ width: '60px', height: '17px' }} />
                                    </Box>} */}
                                    {match?.teamC &&
                                        <>
                                            {/* {!teamBall?.isCBall ?  */}
                                            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                                                {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "56px", justifyContent: "center", alignItems: "center" }}>
                                                    {/* <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}ww</Typography> */}
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
                                            {/* :
                                            <Box
                                                sx={{
                                                    borderTop: "2px solid white",
                                                    background: "rgba(0,0,0,1)",
                                                    height: "45px",
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
                                            </Box>} */}
                                        </>
                                    }
                                </>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", zIndex: 2, position: 'relative', justifyContent: "center", width: '100%', marginTop: '2%', alignSelf: 'center' }}>
                    {/* <Box sx={{ width: "30%", display: "flex", maxWidth: "120px", background: "#10DC61", justifyContent: 'space-between', paddingX: '10px', alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Live</Typography>
                            <img style={{ width: '23px', height: '18px', marginLeft: '5px' }} src={BroadCast} />
                        </Box> */}
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
                                // betId={
                                //     currentMatch?.bettings?.length > 0 &&
                                //     currentMatch?.bettings?.filter((v) => v?.sessionBet === false)
                                // }
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
                {/* <Typography
                    sx={{
                        color: "#FF4D4D",
                        fontSize: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Book
                </Typography> */}
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
            <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600", zIndex: 2, position: 'relative' }}>{match?.title}</Typography>
            <Box sx={{ display: "flex", marginTop: "2px", flexDirection: 'column' }}>
                {/* <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '100%', alignSelf: 'center', paddingX: .2, paddingTop: .2, background: 'white' }}>
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
                        <BookButton rate={bookRatioA(bookmakerTeamRates?.teamA, bookmakerTeamRates?.teamB)} />
                        <BookButton rate={bookRatioB(bookmakerTeamRates?.teamA, bookmakerTeamRates?.teamB)} />
                    </Box>
                </Box > */}
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <AddSession />
                    {/* <Box sx={{ display: "flex", zIndex: 2, position: 'relative', justifyContent: "center", width: '100%', marginTop: '5%', alignSelf: 'center' }}>
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
                                    // betId={betId}
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
                                    // betId={betId}
                                    teamA={match?.teamA}
                                    teamB={match?.teamB}
                                    tie={"Tie"}
                                    draw={match?.teamC ? match?.teamC : ""}
                                />}
                            </Box>
                        </Box>
                    </Box> */}
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