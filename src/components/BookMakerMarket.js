import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/socketContext";

export default function BetMakerMarketComponent({ add }) {
    const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);
    const [betData, setBetData] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        setBetData(bookMakerBetRates);
    }, [bookMakerBetRates]);

    useEffect(() => {
        if (socket && socket.connected) {
            // socket.onevent = async (packet) => {
            //     if (packet.data[0] === "session_bet") {
            //         const data = packet.data[1];
            //         try {
            //             // let profitLoss = data?.profitLoss;
            //             // setProLoss(profitLoss);
            //         } catch (err) {
            //             console.log(err?.message);
            //         }

            //     }
            // }
        }
    }, [socket]);

    return (
        <Box sx={{ flex: 1, background: "white", borderRadius: "5px", minHeight: "640px", border: "2px solid white" }}>
            <Box sx={[{ height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }, (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`
            })]}>
                <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600" }}>Bookmaker Bets</Typography>
                <Box sx={{ height: "45px", width: "100px", background: "white", borderRadius: "5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ color: "red", fontWeight: "700" }}>All Bets</Typography>
                    <Typography sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}>{bookMakerBetRates?.length}</Typography>

                </Box>
            </Box>
            <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                <Header />
                {betData?.length > 0 &&
                    betData?.map((i, k) => {
                        const num = betData?.length - k
                        return (
                            <Row index={num} values={i} />
                        );
                    })}
                {/* {!add && <>
                    <Row index={1} yes={true} />
                    <Row index={2} />
                    <Row index={3} yes={true} />
                    <Row index={4} />
                    <Row yes={true} index={5} />
                    <Row index={6} />
                    <Row yes={true} index={7} />
                    <Row index={8} />
                    <Row yes={true} index={9} />
                    <Row index={10} />
                    <Row yes={true} index={11} />
                    <Row index={12} />
                    <Row yes={true} index={13} />
                </>} */}
            </Box>
        </Box>
    )
}

const Header = () => {
    return (
        <Box sx={{ display: "flex", height: "35px" }}>
            <Box sx={{ background: "#262626", width: "10%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>No.</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>Team</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", color: "white", fontSize: "12px" }}>Odds</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "15%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Back/Lay</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Stake</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>My Stake</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Time</Typography>
            </Box>
        </Box>
    )
}

const Row = ({ index, values }) => {
    const getTime = (date) => {
        const now = new Date(date);
        const timeString = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return timeString;
    };
    return (
        <Box sx={{ display: "flex", height: "40px", borderTop: "2px solid white" }}>
            <Box sx={{ background: "black", width: "10%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "14px", }}>{"0" + index}</Typography>
            </Box>
            <Box sx={{ background: "#F8C851", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "14px", lineHeight: 1 }}>{values.team_bet}</Typography>
            </Box>
            <Box sx={{ background: values.bet_type == "back" ? "#B3E0FF" : "#FFB5B5", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}>{values.odds}</Typography>
            </Box>
            <Box sx={{ background: values.bet_type == "back" ? "#B3E0FF" : "#FFB5B5", width: "15%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>{values.bet_type == "back" ? "Back" : "Lay"}</Typography>
            </Box>
            <Box sx={{ background: values.bet_type == "back" ? "#B3E0FF" : "#FFB5B5", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>{values.amount || values.stake}</Typography>
            </Box>
            <Box sx={{ background: "#0B4F26", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "white", }}>{values.myStack}</Typography>
            </Box>
            <Box sx={{ background: "#FFE6A9", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>{getTime(values.createAt)}</Typography>
            </Box>
        </Box>
    )
}
