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


export default function IndiaPakLiveBookMaker({ add, match }) {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    // console.log('match', match)
    const { socket, socketMicro } = useContext(SocketContext);

    const { axios } = setRole();

    const AddSession = () => {
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
        const [isABall, setIsABall] = useState(false)
        const [isBBall, setIsBBall] = useState(false)
        const [isCBall, setIsCBall] = useState(false)
        const [betId, setBetId] = useState("")
        // const [isTeamCDisabled, setIsTeamCDisabled] = useState(true)
        const innerRefTeamA = useRef();
        const innerRefTeamB = useRef();
        const innerRefTeamC = useRef();
        // const id = location.state.match.id;

        useEffect(() => {
            // alert(JSON.stringify(location.state.match))
            getManuallBookMaker(match?.id);
        }, []);

        async function getManuallBookMaker(id) {
            try {
                let response = await axios.get(`/betting/getManuallBookMaker/${id}`);
                console.log("response?.data?.data 111:", response?.data?.data)
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
                }
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

        async function doSubmitSessionBet(id) {
            const payload = {
                betStatus: 1,
                sessionBet: true,
                matchType: "cricket",
                match_id: id
            }
            try {
                let response = await axios.post(`/betting/addBetting`, payload);
                setBetId(response?.data?.data[0].id)
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

        useEffect(() => {
            if (socket && socket.connected) {
                socket.onevent = async (packet) => {
                    const data = packet.data[1];
                    console.log("check data : ", data)
                    if (packet.data[0] === "teamA_suspend_user") {
                        // console.log("suspend")
                        // console.log("teamA_suspend_use : ", data);
                        if (data.teamA_suspend == 'Ball Started') {
                            setIsABall(true)
                        } else {
                            setIsTeamASuspend(data.teamA_suspend);
                            // setIsTeamBSuspend(data.teamA_suspend);//aaa
                            setIsTeamBackUnlock(true);
                            setIsABall(false);
                        }

                    }
                    if (packet.data[0] === "teamB_suspend_user") {
                        if (data.teamB_suspend == 'Ball Started') {
                            setIsBBall(true)
                        } else {
                            setIsTeamBSuspend(data.teamB_suspend);
                            // setIsTeamASuspend(data.teamB_suspend);//aaa
                            setIsTeamBackUnlock(true);
                            setIsBBall(false);
                            // alert("teamB_suspend_user")
                        }
                    }
                    if (packet.data[0] === "teamC_suspend_user") {
                        if (data.teamC_suspend == 'Ball Started') {
                            setIsCBall(true)
                        } else {
                            setIsTeamCSuspend(data.teamC_suspend);
                            setIsTeamBackUnlock(true);
                            setIsCBall(false);
                            // alert("teamB_suspend_user")
                        }
                    }

                    if (packet.data[0] === "teamA_rate_user") {
                        // console.log("teamA_rate_use : ", data)
                        // alert(teamALayValue)
                        // if (teamALayValue) {
                        setIsTeamALock(data.teamA_suspend);
                        setTeamARate(data.teamA_Back);
                        setTeamALayValue(data.teamA_lay);
                        setIsTeamASuspend(data.teamA_suspend);
                        // } else {
                        //     alert(1)
                        // setIsTeamBackUnlock(false);
                        // }
                        setIsABall(false);
                    }
                    if (packet.data[0] === "teamB_rate_user") {
                        // if (teamBLayValue) {
                        setIsTeamBLock(data?.teamB_suspend);
                        setTeamBRate(data?.teamB_Back);
                        setTeamBLayValue(data?.teamB_lay);
                        setIsTeamBSuspend(data?.teamB_suspend);
                        // } 
                        // else {
                        // setIsTeamBackUnlock(false);
                        // }
                        setIsBBall(false);
                    }
                    if (packet.data[0] === "teamC_rate_user") {
                        setIsTeamCLock(data.teamC_suspend);
                        setTeamCRate(data.teamC_Back);
                        setTeamCLayValue(data.teamC_lay);
                        setIsTeamCSuspend(data.teamC_suspend);
                        // setIsTeamBackUnlock(false);
                        setIsCBall(false);
                    }
                    if (packet.data[0] === "updateRate_user") {
                        // setIsTeamCLock(data.teamC_suspend);
                        // setTeamCRate(data.teamC_Back);
                        // setTeamCLayValue(data.teamC_lay);
                        // setIsTeamCSuspend(data.teamC_suspend);
                        if (match?.teamC) {
                            setIsTeamBackUnlock(false);
                            setTeamARate(data.teamA_Back);
                            setTeamBRate(data.teamB_Back);
                            setTeamCRate(data.teamC_Back);

                        } else {
                            // console.log("data ww :", data);
                            setIsTeamBackUnlock(false);
                            setTeamARate(data.teamA_Back);
                            setTeamBRate(data.teamB_Back);
                        }
                        // alert(1)
                    }

                }
            }
        }, [socket]);

        const handleSuspend = () => {
            if (match?.teamC) {
                socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, })
                socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, });
                socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: true, });
            } else {
                socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, });
                socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, });
            }
        }

        const handleChange = (event) => {
            let target = event.target;
            // alert(event.target.name)
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
                setTeamBRate(target.value)
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

        const handleFocus = (event) => {
            // alert(event.current.name)
            // console.log(event.current.name)
            // if (match?.teamC) {
            //     // if (event.current.name === 'teamA_rate') {
            //     socket.emit("teamA_Suspend", {
            //         betId: match?.id,
            //         teamA_suspend: true,
            //     })
            //     // } else if (event.current.name === 'teamB_rate') {
            //     socket.emit("teamB_Suspend", {
            //         betId: match?.id,
            //         teamB_suspend: true,
            //     });
            //     // } else if (event.current.name === 'teamC_rate') {
            //     socket.emit("teamC_Suspend", {
            //         betId: match?.id,
            //         teamC_suspend: true,
            //     });
            //     // }
            // } else {
            //     // if (event.current.name === 'teamA_rate') {
            //     socket.emit("teamA_Suspend", {
            //         betId: match?.id,
            //         teamA_suspend: true,
            //     });
            //     // } else if (event.current.name === 'teamB_rate') {
            //     socket.emit("teamB_Suspend", {
            //         betId: match?.id,
            //         teamB_suspend: true,
            //     });
            //     // }
            // }
        }
        const handleKeysMatchEvents = (key, event) => {
            // alert(key);
            // console.log('handle key event');
            event.preventDefault();
            // this.setState({ focus_team: event.target.getAttribute('id'), ERROR: false });
            let targetValue = parseFloat(event.target.value);
            event.target.value = targetValue;
            if (key == 'right') {
                handleSuspend();
                // let value = targetValue + 1
                let value = targetValue ? targetValue + incGap : incGap
                console.log("value :", value)
                setPressEnter(false);
                if (event.target.name === 'teamA_rate') {
                    // alert(teamARate)
                    socket.emit("teamA_Suspend", {
                        betId: betId,
                        teamA_suspend: true,
                    })
                    setTeamARate(value);
                    // setTeamALayValue(teamALayValue + 1);
                    setTeamALayValue(teamALayValue + incGap);
                }

                if (event.target.name === 'teamB_rate') {
                    // this.setState({ teamB_rate: value, ERROR: false });
                    socket.emit("teamB_Suspend", {
                        betId: match?.id,
                        teamB_suspend: true,
                    })
                    setTeamBRate(value);
                    setTeamBLayValue(teamBLayValue + incGap);
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
                    socket.emit("teamA_Suspend", {
                        betId: betId,
                        teamA_suspend: true,
                    })
                    setTeamARate(value);
                    setTeamALayValue(teamALayValue - incGap);
                }

                // if (event.target.name === 'teamB_rate' && teamBLayValue - incGap > teamBRate && teamBRate > 0) {
                if (event.target.name === 'teamB_rate' && teamBRate > 0) {
                    socket.emit("teamB_Suspend", {
                        betId: betId,
                        teamB_suspend: true,
                    })
                    setTeamBRate(value);
                    setTeamBLayValue(teamBLayValue - incGap)
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
                    socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, })
                    setTeamALayValue(teamALayValue + incGap);
                }

                if (event.target.name === 'teamB_rate') {
                    // this.setState({ teamB_rate: value, ERROR: false });
                    socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, })
                    setTeamBLayValue(teamBLayValue + incGap)
                }
            }
            else if (key == 'down') {
                handleSuspend();
                setPressEnter(false);
                // if (event.target.name === 'teamA_rate' && teamALayValue - incGap > teamARate) {
                if (event.target.name === 'teamA_rate' && teamALayValue - incGap > teamARate) {
                    setTeamALayValue(teamALayValue - incGap);
                    socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: true, })
                }

                if (event.target.name === 'teamB_rate' && teamBLayValue - incGap > teamBRate) {
                    socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: true, })
                    setTeamBLayValue(teamBLayValue - incGap)
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
                // alert("press enter");
                // setPressEnter(true);
                // setIsTeamASuspend(data.teamA_suspend);
                // alert(event.target.name)
                if (event.target.name === 'teamA_rate') {
                    socket.emit("teamA_rate", {
                        betId: betId,
                        teamA_lay: teamALayValue,
                        teamA_Back: teamARate,
                        teamA_suspend: false,
                    });
                }
                if (event.target.name === 'teamB_rate') {
                    socket.emit("teamB_rate", {
                        betId: betId,
                        teamB_lay: teamBLayValue,
                        teamB_Back: teamBRate,
                        teamB_suspend: false,
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
            else if (key == 'tab') {
                // if (event.target.name === 'teamA_rate') {
                setTeamARate(targetValue);
                setTeamBRate(targetValue);
                setTeamALayValue('');
                setTeamBLayValue('');
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
                // }
                // setTeamARate(targetValue);
                // setTeamBRate(targetValue);
                // setTeamALayValue('');
                // setTeamBLayValue('');
            }
            // if (key == ',') {
            //     // setIncGap(0.25)
            //     if (event.target.name === 'teamA_rate') {
            //         // let value = event.target.value ? targetValue + 0.25 : 0;
            //         // alert(value)
            //         // setTeamARate(value);
            //         // setTeamALayValue(value + 0.50);
            //         // setIncGap(0.25)
            //     } else if (event.target.name === 'teamB_rate') {
            //         // let value = event.target.value ? targetValue + 0.25 : 0;
            //         // setTeamBRate(value);
            //         // setTeamBLayValue(value + 0.50);
            //         // setIncGap(0.25)
            //     }
            // }
            // if (key == '.') {
            //     if (event.target.name === 'teamA_rate') {
            //         let value = event.target.value ? targetValue + 0.5 : 0;
            //         setTeamARate(value);
            //         setTeamALayValue(value + 0.5);
            //         setIncGap(0.25)
            //     } else if (event.target.name === 'teamB_rate') {
            //         let value = event.target.value ? targetValue + 0.5 : 0;
            //         setTeamBRate(value);
            //         setTeamBLayValue(value + 0.5);
            //         setIncGap(0.25)
            //     }
            //     // this.setState({ lay_5: 1, ERROR: false });
            // }
            if (key == '*') {
                handleSuspend();
                // alert(1)
                if (event.target.name === 'teamA_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamARate(value);
                    setTeamALayValue(value + 0.5);
                    setIncGap(0.25)
                } else if (event.target.name === 'teamB_rate') {
                    let value = event.target.value ? targetValue + 0.5 : 0;
                    setTeamBRate(value);
                    setTeamBLayValue(value + 0.5);
                    setIncGap(0.25)
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
                }
            }
            if (key == '.') {
                handleSuspend();
                setIncGap(1)
                // if (event.target.name === 'teamA_rate') {
                //     let value = event.target.value ? targetValue + 0.5 : 0;
                //     setTeamARate(value);
                //     setTeamALayValue(value + 0.5);
                //     setIncGap(0.25)
                // } else if (event.target.name === 'teamB_rate') {
                //     let value = event.target.value ? targetValue + 0.5 : 0;
                //     setTeamBRate(value);
                //     setTeamBLayValue(value + 0.5);
                //     setIncGap(0.25)
                // }
                if (event.target.name === 'teamA_rate') {
                    let teamARateDecimal = teamARate % 1; // get the decimal portion of the number
                    let teamALayValueDecimal = teamALayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamARateDecimal >= 0.5) {
                        value = teamARate ? Math.round(teamARate) - 1 : 0;
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
                    // alert(value)
                    setTeamARate(value);
                    setTeamALayValue(value > 1 ? layValue + 0.5 : layValue + 1.5);
                } else if (event.target.name === 'teamB_rate') {
                    // let value = Math.round(teamBRate);
                    // let layValue = Math.round(teamBLayValue);
                    let teamBRateDecimal = teamBRate % 1; // get the decimal portion of the number
                    let teamBLayValueDecimal = teamBLayValue % 1; // get the decimal portion of the number
                    let value;
                    let layValue;
                    if (teamBRateDecimal >= 0.5) {
                        value = teamBRate ? Math.round(teamBRate) - 1 : 0;
                    } else {
                        value = teamBRate ? Math.round(teamBRate) : 0;
                    }
                    if (teamBLayValueDecimal >= 0.5) {
                        layValue = teamBLayValue ? Math.round(teamBLayValue) : 0
                    } else {
                        layValue = teamBLayValue ? Math.round(teamBLayValue) : 0;
                    }
                    setTeamBRate(value);
                    setTeamBLayValue(value > 1 ? layValue + 0.5 : layValue + 1.5);
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
                        setTeamARate(value - 0.5);
                        setTeamALayValue(layValue - 1);
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
                        setTeamBLayValue(layValue - 1);
                    }
                }
            }
            if (key == 'shift') {
                if (event.target.name === 'teamA_rate') {
                    socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: 'Ball Started', })
                } else if (event.target.name === 'teamB_rate') {
                    socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: 'Ball Started', })
                } else if (event.target.name === 'teamC_rate') {
                    socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: 'Ball Started', })
                }
            }
            // teamA_suspended = 'ball started '
            // console.log('event :', event)
            // console.warn('event :', event)
        }

        return (
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
                        <Box sx={{ borderWidth: 0, justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', paddingLeft: '10px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%", }}>{match?.teamA}</Typography>
                            <Box sx={{ display: "flex", width: '30%', borderTop: "1px solid white" }}>
                                <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                    <TextField
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
                                                height: '45px', width: '98%',
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
                                    disabled
                                    // onChange={(e) => handleChange(e)}
                                    variant="standard"
                                    value={teamALayValue}
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
                                            paddingX: '10px',
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
                            <Box sx={{ display: "flex", width: '30%', borderTop: "2px solid white" }}>
                                <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                    <TextField
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
                                                height: '45px', width: '98%',
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
                                    variant="standard"
                                    disabled
                                    value={teamBLayValue}
                                    // onChange={(i) => setTeamBLayValue(i.target.value)}
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
                                            paddingX: '10px',
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
                            <Box sx={{ display: "flex", width: '30%', borderTop: "2px solid white" }}>
                                <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                    <TextField
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
                                            // border: '1px solid #2626264D',
                                            // borderRadius: '4px',
                                            // border: "0.5px solid white",
                                            alignSelf: 'flex-end',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            paddingX: '10px',
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
                        {!isABall ? <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                            {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? '#FDF21A' : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                {/* <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}ww</Typography> */}
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
                        </Box> :
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
                            </Box>}
                        {!isBBall ? <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                            {!isTeamBackUnlock ? <Box sx={{ background: isTeamBackUnlock ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                {!isTeamBackUnlock ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBackUnlock ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                            </Box> : <Box sx={{ background: isTeamBSuspend ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                {!isTeamBSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBSuspend ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                            </Box>}
                            <Box sx={{ background: isTeamBSuspend ? "#FDF21A" : "#FFB5B5", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                {!isTeamBSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamBSuspend ? 0 : teamBLayValue}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                            </Box>

                        </Box> :
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
                            </Box>}

                        {match?.teamC && <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                            <Box sx={{ background: isTeamCSuspend ? "#FDF21A" : "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                {!isTeamCSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamCSuspend ? 0 : teamBRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                            </Box>
                            <Box sx={{ background: isTeamCSuspend ? "#FDF21A" : "#FFB5B5", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                {!isTeamCSuspend ? <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{isTeamCSuspend ? 0 : teamCRate}</Typography> : <img src={Lock} style={{ width: "10px", height: "15px" }} />}
                            </Box>
                        </Box>}
                        {isCBall && <Box
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
                        </Box>}
                    </Box>
                </Box>
            </Box>
        )
    }
    const BookButton = () => {
        return (
            <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90px', height: '30px', background: 'white', marginRight: '2px', borderRadius: '2px' }}
            >
                <Typography sx={{ color: "#FF4D4D", fontSize: '12px', fontWeight: '600' }}>-Book 60</Typography>
            </Box>
        )
    }
    return (
        <Box sx={{ flex: 1, background: "#0B4F26", borderRadius: "5px", position: 'relative', minHeight: "300px", py: "20px", px: "10px" }}>
            {!add && <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', position: 'absolute', left: '0px', top: 0, zIndex: 1 }} ></Box>}
            <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600", zIndex: 2, position: 'relative' }}>{match?.title}</Typography>
            <Box sx={{ display: "flex", marginTop: "20px", flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '100%', alignSelf: 'center', paddingX: .2, paddingTop: .2, background: 'white' }}>
                    <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Bookmaker Market</Typography>
                    </Box>
                    <Box sx={{
                        flex: .1, background: '#262626'
                        // '#262626' 
                    }}>
                        <div class="slanted"></div>
                    </Box>
                    <Box sx={{
                        flex: 1, background: '#262626',
                        // '#262626' ,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <BookButton />
                    </Box>
                </Box >
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <AddSession />
                    <Box sx={{ display: "flex", zIndex: 2, position: 'relative', justifyContent: "center", width: '100%', marginTop: '5%', alignSelf: 'center' }}>
                        <Box sx={{ width: "30%", display: "flex", maxWidth: "120px", background: "#10DC61", justifyContent: 'space-between', paddingX: '10px', alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Live</Typography>
                            <img style={{ width: '23px', height: '18px', marginLeft: '5px' }} src={BroadCast} />
                        </Box>
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
                                    }} />}
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
                                }} />}
                            </Box>
                        </Box>
                    </Box>
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