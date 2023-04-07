import { Box, TextField, Typography, useTheme } from "@mui/material";
import { borderTop } from "@mui/system";
import { useState } from "react";
import StyledImage from "./StyledImage";
import { LiveOff, LiveOn } from "../expert/assets";
import SessionResultModal from "./SessionResultModal";
import expertAxios from "../axios/expertAxios";

export default function IndiaPakLive({ createSession, match, showDialogModal, sessionEvent }) {

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
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    async function doSubmitSessionBet(rate_percent) {
        const payload = { ...Detail, rate_percent }
        try {
            const { data } = await expertAxios.post(`/betting/addBetting`, payload);
            if (data.message) {
                showDialogModal(true, true, data.message, 'match')
                console.log(data)
            }
        } catch (e) {
            console.log(e)
            if (e.response.data.message) {
                showDialogModal(true, false, e.response.data.message, 'match')
            }
        }
    }

    return (
        <Box sx={{ flex: 1, background: "#F8C851", borderRadius: "5px", minHeight: "300px", py: "30px", px: "20px" }}>
            <Typography sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}>{match?.title ? match.title : 'India vs Pakistan'}</Typography>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <AddSession createSession={createSession} Detail={{ Detail, setDetail }} sessionEvent={sessionEvent} />
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

const AddSession = ({ createSession, Detail, sessionEvent }) => {
    return (
        <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>{createSession? 'Add' : 'Your'} Session</Typography>
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
                    {createSession ?
                        <TextField
                            onChange={(e) => {
                                Detail.setDetail({ ...Detail.Detail, bet_condition: e.target.value })
                            }}
                            variant="standard" InputProps={{
                                placeholder: "Your Bet Condition Here...",
                                disableUnderline: true,
                                style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                            }} /> : <Typography sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}>{sessionEvent?.bet_condition}</Typography>}
                </Box>
                <Box sx={{ borderLeft: "2px solid white", width: "40%" }}>
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                        <Box sx={{ background: "#FFB5B5", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{createSession ? <TextField
                                onChange={(e) => {
                                    Detail.setDetail({ ...Detail.Detail, no_rate: e.target.value })
                                }}
                                type="Number"
                                variant="standard" InputProps={{
                                    placeholder: "No Rate",
                                    disableUnderline: true,
                                    style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                }} /> : 39}</Typography>
                        </Box>
                        <Box sx={{ background: "#A7DCFF", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{createSession ? <TextField
                                onChange={(e) => {
                                    Detail.setDetail({ ...Detail.Detail, yes_rate: e.target.value })
                                }}
                                type="Number"
                                variant="standard" InputProps={{
                                    placeholder: "Yes Rate",
                                    disableUnderline: true,
                                    style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                }} /> : 45}</Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                        <Box sx={{ background: "#FFB5B5", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{createSession ? <TextField
                                onChange={(e) => {
                                    Detail.setDetail({ ...Detail.Detail, n_rate_percent: e.target.value })
                                }}
                                type="Number"
                                variant="standard" InputProps={{
                                    placeholder: "No %",
                                    disableUnderline: true,
                                    style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                }} /> : 39}</Typography>
                        </Box>
                        <Box sx={{ background: "#A7DCFF", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{createSession ? <TextField
                                onChange={(e) => {
                                    Detail.setDetail({ ...Detail.Detail, y_rate_percent: e.target.value })
                                }}
                                type="Number"
                                variant="standard" InputProps={{
                                    placeholder: "Yes %",
                                    disableUnderline: true,
                                    style: { fontSize: "15px", marginLeft: "5px", height: "45px", fontWeight: "600", color: "black" }
                                }} /> : 45}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {!createSession && <Box sx={{
                position: "absolute", width: "100%", top: "0px", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", opacity: 1,
                backdropFilter: " blur(1px)",
                "-webkit-backdrop-filter": "blur(1px)"
            }}>
                <StyledImage src={LiveOff} sx={{ height: "4vw", width: "4vw" }} />
            </Box>}
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