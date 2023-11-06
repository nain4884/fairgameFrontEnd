import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SessionResultModal from "./SessionResultModal";
import StyledImage from "./StyledImage";

export default function SessionResult({ createSession, betId, handleSession, sessionEvent }) {
    const { sessionResults } = useSelector((state) => state?.matchDetails);
    const [sessionData, setSessionData] = useState([]);
    const [visible1, setVisible1] = useState(false)
    const [selected, setSelected] = useState([]);
    const [mode, setMode] = useState("0");

    useEffect(() => {
        setSessionData(sessionResults);
        // alert(JSON.stringify(sessionEvent));
        setSelected([sessionEvent?.id]);
    }, [sessionResults]);

    const changeSelected = (index, item) => {
        // alert(item.bet_id.id)
        if (mode === "0") {
            return false;
        }
        const x = [...selected];
        const itemId = item.bet_id.id;

        if (x.includes(itemId)) {
            // If the item is already selected, do nothing
            return;
        }
        // If the item is not selected, select it
        setSelected([itemId]);
        handleSession(item);
    };

    return (
        <Box sx={{
            flex: 1, background: "#F8C851", marginTop: "5px", borderRadius: "5px",
            minHeight: "300px",
            py: "30px",
            px: "20px",
            pt: "5px"
        }}
        >
            <Typography sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}>Session Result</Typography>
            <Box sx={{ display: "flex", marginTop: "8px" }}>
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <Overs createSession={createSession} sessionData={sessionData} mode={mode} changeSelected={changeSelected} selected={selected} />
                    <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: "14px" }}>
                        <Box onClick={(e) => {
                            setMode("1")
                            // setVisible1(true)
                            // e.stopPropagation()
                        }} sx={{ position: 'relative', width: "30%", display: "flex", maxWidth: "120px", background: "#FF4D4D", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Un Declare</Typography>
                            <Box sx={{ position: "absolute", zIndex: 999, top: '40px', left: 0 }}>
                                {visible1 && sessionData.length > 0 && <SessionResultModal
                                    newData={{
                                        id: betId,
                                        match_id: sessionData[0]?.match_id, betStatus: 2
                                    }}
                                    undeclare={true}
                                    onClick={() => {
                                        setVisible1(false)
                                    }} />}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const Overs = ({ createSession, sessionData, mode, changeSelected, selected }) => {
    return (
        <Box sx={{ border: "2px solid #FFFFFF" }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>Overs</Typography>
                </Box>
                <Box sx={{ background: "#303030", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>RESULT</Typography>
                </Box>
                <Box sx={{ background: "#303030", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>PROFIT/LOSS</Typography>
                </Box>
            </Box>
            {sessionData?.length > 0 &&
                sessionData?.map((item, index) => {
                    let profit_loss = parseInt(item.profit_loss)
                    let checkSelcted = !selected.includes(item?.bet_id?.id)
                    return (
                        <Box
                            onClick={() => changeSelected(index, item)}
                            key={index} display={"flex"} sx={{ borderTop: "2px solid white", background: checkSelcted && mode == "1" ? "rgba(0,0,0,.6)" : "#FFFFFF" }}>
                            <Box sx={{ background: checkSelcted && mode == "1" ? "rgba(0,0,0,.6)" : "#FFFFFF", width: "60%" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}>{item?.bet_id?.bet_condition}</Typography>
                            </Box>
                            <Box sx={{ background: checkSelcted && mode == "1" ? "rgba(0,0,0,.6)" : "#ECECEC", width: "20%", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{item.score}</Typography>
                            </Box>
                            {
                                profit_loss > 0 ? <Box sx={{ background: checkSelcted && mode == "1" ? "rgba(0,0,0,.6)" : "#10DC61", width: "20%", borderLeft: "2px solid white", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "white" }}>{profit_loss}<StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} /></Typography>
                                </Box> :
                                    <Box sx={{ background: checkSelcted && mode == "1" ? "rgba(0,0,0,.6)" : "#FF4D4D", width: "20%", borderLeft: "2px solid white", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "white" }}>{profit_loss}<StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} /></Typography>
                                    </Box>
                            }

                        </Box>
                    );
                })}
        </Box>
    )
}


// const RunsAmountBox = ({ anchorEl, open, handleClose }) => {
//     const theme = useTheme()

//     return (
//         <Box
//             sx={{
//                 borderRadius: "5px",
//                 border: "1px solid #306A47",
//                 overflow: "hidden",
//             }}
//         >
//             <Box sx={{ minHeight: "120px", flexDirection: "column", backgroundColor: "white", display: "flex" }}>
//                 <Box sx={{ display: "flex", height: "30px" }}>
//                     <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Runs</Typography>
//                     </Box>
//                     <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Amount</Typography>
//                     </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
//                     <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>40</Typography>
//                     </Box>
//                     <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
//                         <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
//                     </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
//                     <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>41</Typography>
//                     </Box>
//                     <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
//                         <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
//                     </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
//                     <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>42</Typography>
//                     </Box>
//                     <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
//                         <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
//                     </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
//                     <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>43</Typography>
//                     </Box>
//                     <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
//                         <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
//                     </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
//                     <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>44</Typography>
//                     </Box>
//                     <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
//                         <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
//                         <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     )
// }
