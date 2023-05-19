import { Box, TextField, Typography, useTheme } from "@mui/material";
import { borderTop } from "@mui/system";
import { useState, useEffect, useContext } from "react";
import StyledImage from "./StyledImage";
import { LiveOff, LiveOn } from "../expert/assets";
import SessionResultModal from "./SessionResultModal";
import expertAxios from "../axios/expertAxios";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { SocketContext } from "../context/socketContext";
import { setRole } from "../newStore";

export default function IndiaPakLive({ createSession, match, showDialogModal, sessionEvent }) {
    const { axios } = setRole();
    const { socket, socketMicro } = useContext(SocketContext);
    const stateDetail = {
        match_id: match?.id,
        matchType: match?.gameType,
        sessionBet: true,
        bet_condition: '',
        no_rate: '',
        yes_rate: '',
        y_rate_percent: '',
        n_rate_percent: ''
    }
    const [Detail, setDetail] = useState(stateDetail)
    const [incGap, setIncGap] = useState(1)
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [betId, setBetId] = useState("")


    async function doSubmitSessionBet(rate_percent) {
        const payload = { ...Detail, rate_percent }
        return alert("ddd :" + betId)
        try {
            let response = await axios.post(`/betting/addBetting`, payload);
            setBetId(response?.data?.data?.id)
            // console.log("response :bbb", response)
            // alert("ddd :" + JSON.stringify(response?.data?.data?.id))
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    useEffect(() => {
        // alert(JSON.stringify(sessionEvent))
        // 2 over runs RR(PBKS vs RR)adv
        if (socket && socket.connected) {
            socket.onevent = async (packet) => {
                const data = packet.data[1];
                if (packet.data[0] === "updateSessionRate") {
                    alert("lllll")
                }

            }
        }
    }, [socket]);

    useEffect(() => {
        if (sessionEvent?.id) {
            getManuallBookMaker(sessionEvent?.id);
        }
    }, []);

    async function getManuallBookMaker(id) {
        try {
            let response = await axios.get(`/betting/getById/${id}`);
            // console.log("dddddd :", response?.data)
            let data = response?.data?.data[0]
            let [firstValue, secondValue] = data.rate_percent.split("-");
            setDetail({ ...Detail, no_rate: data.no_rate, yes_rate: data.yes_rate, n_rate_percent: firstValue, y_rate_percent: secondValue, bet_condition: data.bet_condition })
            setBetId(data.id);
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
    // async function doSubmitSessionBet(id) {
    //     const payload = {
    //         betStatus: 1,
    //         sessionBet: true,
    //         matchType: "cricket",
    //         match_id: id
    //     }
    //     try {
    //         let response = await axios.post(`/betting/addBetting`, payload);
    //         setBetId(response?.data?.data?.id)
    //         // alert("ddd :" + JSON.stringify(response?.data))
    //     } catch (e) {
    //         console.log(e.response.data.message);
    //     }
    // }

    return (
        <Box sx={{ flex: 1, background: "#F8C851", borderRadius: "5px", minHeight: "300px", py: "30px", px: "20px" }}>
            <Typography sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}>{match?.title ? match.title : 'India vs Pakistan'}</Typography>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <AddSession createSession={createSession} Detail={{ Detail, setDetail }} incGap={{ incGap, setIncGap }} socket={socket} sessionEvent={sessionEvent} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {!createSession ? <>
                            <Box sx={{ width: "30%", display: "flex", maxWidth: "120px", background: "#10DC61", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                                <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Go Live</Typography>
                                <StyledImage src={LiveOn} sx={{ marginLeft: "5px", height: "15px", width: "15px" }} />
                            </Box>
                            <Box
                                onClick={(e) => {
                                    setVisible1(true)
                                    e.stopPropagation()
                                }} sx={{ position: 'relative', width: "30%", display: "flex", background: "#FF4D4D", maxWidth: "120px", marginLeft: "5px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                                <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Un Declare</Typography>
                                <Box sx={{ position: "absolute", zIndex: 999, top: '40px', left: 0 }}>
                                    {visible1 && <SessionResultModal
                                        undeclare={true}
                                        onClick={() => {
                                            setVisible1(false)
                                        }} />}
                                </Box>
                            </Box>
                            <Box onClick={(e) => {
                                setVisible(true)
                                e.stopPropagation()
                            }} sx={{ width: "30%", position: 'relative', display: "flex", background: "#0B4F26", marginLeft: "5px", maxWidth: "120px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                                <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Declare</Typography>
                                <Box sx={{ position: "absolute", zIndex: 999, top: '40px', left: 0 }}>
                                    {visible && <SessionResultModal onClick={() => {
                                        setVisible(false)
                                    }} />}
                                </Box>
                            </Box>
                            <Box sx={{ width: "30%", display: "flex", background: "#303030", marginLeft: "5px", justifyContent: "center", maxWidth: "120px", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                                <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>No Result</Typography>
                            </Box></> :
                            <Box onClick={(e) => {
                                doSubmitSessionBet(Detail.n_rate_percent + '-' + Detail.y_rate_percent)
                            }} sx={{ width: "30%", position: 'relative', display: "flex", background: "#0B4F26", marginLeft: "5px", maxWidth: "120px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                                <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Submit</Typography>
                                <Box sx={{ position: "absolute", zIndex: 999, top: '40px', left: 0 }}>
                                    {visible && <SessionResultModal onClick={() => {
                                        setVisible(false)
                                    }} />}
                                </Box>
                            </Box>}
                    </Box>
                </Box>
                <Box sx={{ marginLeft: "15px" }}>
                    {createSession ? <Box sx={{ width: "162px", minHeight: "182px" }} /> : <RunsAmountBox />}
                </Box>
            </Box>
        </Box>
    )
}

const AddSession = ({ createSession, Detail, sessionEvent, incGap, socket }) => {


    const handleKeysMatchEvents = (key, event) => {
        // alert(key);
        // console.log('handle key event');
        event.preventDefault();
        // this.setState({ focus_team: event.target.getAttribute('id'), ERROR: false });
        let targetValue = parseFloat(event.target.value);
        event.target.value = targetValue;
        if (key == 'right') {
            // let chckValue = teamALayValue ? teamALayValue : value
            let value = targetValue ? targetValue + incGap.incGap : incGap.incGap;
            let yesValue = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : value
            Detail.setDetail({ ...Detail.Detail, no_rate: value, yes_rate: yesValue + 1, y_rate_percent: 100, n_rate_percent: 100 })

        }
        else if (key == 'left') {
            if (targetValue > 0) {
                let value = targetValue ? targetValue - incGap.incGap : incGap.incGap;
                let yesValue = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : value
                Detail.setDetail({ ...Detail.Detail, no_rate: value, yes_rate: yesValue - 1, y_rate_percent: 100, n_rate_percent: 100 })
            }
        }
        else if (key == 'up') {
            if (targetValue > 0) {
                let value = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : Detail?.Detail?.no_rate;
                // alert(value)
                Detail.setDetail({ ...Detail.Detail, yes_rate: value + incGap.incGap, y_rate_percent: 100, n_rate_percent: 100 })
            }

        }
        else if (key == 'down') {
            if (Detail?.Detail?.yes_rate - incGap.incGap > Detail?.Detail?.no_rate) {
                let value = Detail?.Detail?.yes_rate ? Detail?.Detail?.yes_rate : Detail?.Detail?.no_rate;
                Detail.setDetail({ ...Detail.Detail, yes_rate: value - incGap.incGap, y_rate_percent: 100, n_rate_percent: 100 })
            }
        }
        else if (key == 'shift') {
            // if (event.target.name === 'teamA_rate') {
            // socket.emit("teamA_Suspend", { betId: betId, teamA_suspend: 'Ball Started', })
            // // } else if (event.target.name === 'teamB_rate') {
            // socket.emit("teamB_Suspend", { betId: betId, teamB_suspend: 'Ball Started', })
            // // } else if (event.target.name === 'teamC_rate') {
            // socket.emit("teamC_Suspend", { betId: betId, teamC_suspend: 'Ball Started', })
            // }
        }
        else if (key == 'enter') {
            let rate_percent = Detail.Detail.n_rate_percent + '-' + Detail.Detail.y_rate_percent
            let data = {
                betId: sessionEvent?.id,
                no_rate: Detail.Detail.no_rate,
                yes_rate: Detail.Detail.yes_rate,
                suspended: true,
                rate_percent: rate_percent
            }
            // return alert(JSON.stringify(socket))
            // socket.emit("updateSessionRate", data)
        }

    }
    const handleChange = (event) => {
        let target = event.target;
        // let targetValue = parseFloat(event.target.value);
        let targetValue = parseFloat(event.target.value);
        // alert(targetValue)
        Detail.setDetail({ ...Detail.Detail, no_rate: targetValue, yes_rate: targetValue + 1, y_rate_percent: 100, n_rate_percent: 100 })
        // if (target.name === 'teamA_rate') {
        //     // setTeamARate(target.value)
        //     // if (target.value !== '') {
        //     //     let teamA_lay = parseInt(target.value) + 1
        //     //     // if (incGap > 0) {
        //     //     //     // teamA_lay = teamA_lay + this.state.up_keypress
        //     //     // }
        //     //     setTeamALayValue(teamA_lay);
        //     // } else {
        //     //     setTeamALayValue('');
        //     // }
        // }
    }
    return (
        <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>{createSession ? 'Add' : 'Your'} Session</Typography>
                </Box>
                <Box sx={{ background: "#FF9292", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>No</Typography>
                </Box>
                <Box sx={{ background: "#00C0F9", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>Yes</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#FFFFFF", width: "60%" }}>
                    {/* {createSession ? */}
                    <TextField
                        onChange={(e) => {
                            Detail.setDetail({ ...Detail.Detail, bet_condition: e.target.value })
                        }}
                        value={Detail.Detail.bet_condition}
                        variant="standard" InputProps={{
                            placeholder: "Your Bet Condition Here...",
                            disableUnderline: true,
                            style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                        }} />
                    {/* : 
                            <Typography sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}>{sessionEvent?.bet_condition}</Typography>} */}
                </Box>
                <Box sx={{ borderLeft: "2px solid white", width: "40%" }}>
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                        <Box sx={{ background: "#FFB5B5", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                {/* {createSession ? */}
                                <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/', 'enter', 'return', 'esc', '*', 'ctrl', "plus", "=", 'minus']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                    <TextField
                                        // onChange={(e) => {
                                        //     Detail.setDetail({ ...Detail.Detail, no_rate: e.target.value })
                                        // }}
                                        onChange={(e) => handleChange(e)}
                                        type="Number"
                                        value={Detail?.Detail?.no_rate}
                                        variant="standard"
                                        InputProps={{
                                            placeholder: "No Rate ",
                                            disableUnderline: true,
                                            style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                        }} /></KeyboardEventHandler>
                                {/* : 39} */}
                            </Typography>
                        </Box>
                        <Box sx={{ background: "#A7DCFF", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                {/* {createSession ?  */}
                                <TextField
                                    // onChange={(e) => {
                                    //     Detail.setDetail({ ...Detail.Detail, yes_rate: e.target.value })
                                    // }}
                                    type="Number"
                                    value={Detail.Detail.yes_rate}
                                    variant="standard" InputProps={{
                                        placeholder: "Yes Rate",
                                        disableUnderline: true,
                                        style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                    }} />
                                {/* : 45} */}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                        <Box sx={{ background: "#FFB5B5", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                {/* {createSession ?  */}
                                <TextField
                                    // onChange={(e) => {
                                    //     Detail.setDetail({ ...Detail.Detail, n_rate_percent: e.target.value })
                                    // }}
                                    type="Number"
                                    value={Detail.Detail.n_rate_percent}
                                    variant="standard" InputProps={{
                                        placeholder: "No %",
                                        disableUnderline: true,
                                        style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                    }} />
                                {/* : 39} */}
                            </Typography>
                        </Box>
                        <Box sx={{ background: "#A7DCFF", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                                {/* {createSession ? */}
                                <TextField
                                    // onChange={(e) => {
                                    //     Detail.setDetail({ ...Detail.Detail, y_rate_percent: e.target.value })
                                    // }}
                                    type="Number"
                                    value={Detail.Detail.y_rate_percent}
                                    variant="standard" InputProps={{
                                        placeholder: "Yes %",
                                        disableUnderline: true,
                                        style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                    }} />
                                {/* : 45} */}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* comment */}
            {/* {!createSession && <Box sx={{
                position: "absolute", width: "100%", top: "0px", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", opacity: 1,
                backdropFilter: " blur(1px)",
                "-webkit-backdrop-filter": "blur(1px)"
            }}>
                <StyledImage src={LiveOff} sx={{ height: "4vw", width: "4vw" }} />
            </Box>} */}
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