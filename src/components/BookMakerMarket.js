import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function BetMakerMarketComponent({ add, match }) {
    const { bookMakerBetRates } = useSelector((state) => state?.matchDetails);
    const [betData, setBetData] = useState([]);

    useEffect(() => {
        setBetData(bookMakerBetRates);
    }, [bookMakerBetRates]);

    return (
        <Box sx={{ flex: 1, background: "white", borderRadius: "5px", minHeight: "75vh", border: "2px solid white", }}>
            <Box sx={[{ height: "42px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#F8C851" },
            ]}>
                <Typography sx={{ color: "#000000", fontSize: "20px", fontWeight: "600" }}>Bookmaker Bets</Typography>
                <Box sx={{ height: "35px", width: "100px", background: "white", borderRadius: "5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ color: "red", fontWeight: "700", fontSize: "14px" }}>All Bets</Typography>
                    <Typography sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}>{betData?.length}</Typography>

                </Box>
            </Box>
            <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                <Header />
                <Box
                    className="myScroll"
                    sx={{
                        maxHeight: "75vh", overflow: "hidden", overflowY: "auto"
                    }}>
                    {betData?.length > 0 &&
                        betData?.map((i, k) => {
                            const num = betData?.length - k
                            return (
                                <Row index={num} values={i} />
                            );
                        })}
                </Box>
            </Box>
        </Box>
    )
}

const Header = () => {
    return (
        <Box sx={{ display: "flex", height: "35px" }}>
            <Box sx={{ background: "#262626", width: "6%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>No.</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>User</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>Team</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "10%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", color: "white", fontSize: "12px" }}>Odds</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "14%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Time</Typography>
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
        <div style={{ display: "flex", position: "relative" }}>
            <Box sx={{ display: "flex", height: "40px", borderTop: "2px solid white", width: "100%" }}>
                <Box sx={{ background: "black", width: "6%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px", }}>{index < 100 ? "0" + index : + index}</Typography>
                </Box>
                <Box sx={{ background: "#0B4F26", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "white", }}>{values?.user?.userName || values?.userName}</Typography>
                </Box>
                <Box sx={{ background: "#F8C851", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "black", fontWeight: "600", fontSize: "14px", lineHeight: 1 }}>{values.team_bet}</Typography>
                </Box>
                <Box sx={{ background: values.bet_type == "back" ? "#B3E0FF" : "#FFB5B5", width: "10%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: 'relative', }}>
                    <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}>{values.odds}</Typography>
                </Box>
                <Box sx={{ background: values.bet_type == "back" ? "#B3E0FF" : "#FFB5B5", width: "14%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: 'relative', }}>
                    <Typography sx={{ fontWeight: "600", fontSize: { mobile: "6px", laptop: "14px" }, color: "black", position: 'inhert', top: 5, right: 5 }} >{getTime(values.createAt)}</Typography>
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
            </Box>
            {values?.deleted_reason && (
                <Box
                    sx={{
                        background: "rgba(0,0,0,0.5)",
                        width: "100%",
                        height: "40px",
                        position: "absolute",
                        display: "flex",
                    }}
                >
                    <Box sx={{ flex: 1, display: "flex" }}>
                        <Box sx={{ width: "34%", height: "30px" }}></Box>
                        <Box
                            sx={{
                                width: "66%",
                                height: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            {
                                <Typography
                                    sx={{
                                        fontSize: "10px",
                                        fontWeight: "700",
                                        color: "white",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Bet{" "}
                                    <span style={{ color: "#e41b23" }}>deleted</span>{" "}
                                    due to {values?.deleted_reason}
                                </Typography>
                            }
                        </Box>
                    </Box>
                </Box>
            )}
        </div>
    )
}
