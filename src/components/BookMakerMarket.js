import { Box, Typography, useTheme } from "@mui/material";

export default function BetMakerMarketComponent({ add }) {
    return (
        <Box sx={{ flex: 1, background: "white", borderRadius: "5px", minHeight: "640px", border: "2px solid white" }}>
            <Box sx={[{ height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }, (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`
            })]}>
                <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600" }}>Bookmaker Bets</Typography>
                <Box sx={{ height: "45px", width: "100px", background: "white", borderRadius: "5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ color: "red", fontWeight: "700" }}>All Bets</Typography>
                    <Typography sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}>999</Typography>

                </Box>
            </Box>
            <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                <Header />
                {!add && <>
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
                </>}
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

const Row = ({ yes, index }) => {
    return (
        <Box sx={{ display: "flex", height: "50px", borderTop: "2px solid white" }}>
            <Box sx={{ background: "black", width: "10%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "18px" }}>{"0" + index}</Typography>
            </Box>
            <Box sx={{ background: "#F8C851", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>INDIA</Typography>
            </Box>
            <Box sx={{ background: yes ? "#B3E0FF" : "#FFB5B5", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "800", color: "black", fontSize: "18px" }}>40</Typography>
            </Box>
            <Box sx={{ background: yes ? "#B3E0FF" : "#FFB5B5", width: "15%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "800", fontSize: "18px", color: "black", }}>{yes ? "Back" : "Lay"}</Typography>
            </Box>
            <Box sx={{ background: yes ? "#B3E0FF" : "#FFB5B5", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>100000000</Typography>
            </Box>
            <Box sx={{ background: "#0B4F26", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "white", }}>100000000</Typography>
            </Box>
            <Box sx={{ background: "#FFE6A9", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>03:23 AM</Typography>
            </Box>
        </Box>
    )
}
