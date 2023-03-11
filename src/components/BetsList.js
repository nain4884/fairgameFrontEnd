import { Box, Typography } from "@mui/material"
import SearchInput from "./SearchInput"
import SmallDropDown from "./smallDropDown"
const Footer = () => {
    return (
        <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: { mobile: "5px", laptop: "10px" }, justifyContent: "space-between", background: "#FAFAFA", marginX: "0.5%", marginBottom: "20px" }}>
            <Typography sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}>Showing 1 to 10</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ height: "35px", width: { mobile: "80px", laptop: "100px" }, background: "#0B4F26", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>
                    <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>Previous</Typography>
                </Box>
                <Box sx={{ height: "35px", marginX: { laptop: "10px", mobile: "5px" }, width: "40px", background: "#262626", display: "flex", borderRadius: "5px", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>1</Typography>
                </Box>
                <Box sx={{ height: "35px", width: { mobile: "80px", laptop: "100px" }, background: "#0B4F26", display: "flex", borderRadius: "5px", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>Next</Typography>
                </Box>
            </Box>
        </Box>
    )
}
const BetsList = () => {
    const data = [{
        eventType: "Cricket",
        eventName: "India Vs Pakistan",
        userName: "JohnDoe",
        team: "Pakistan",
        betType: "6 Over Pakistan",
        userRate: "66",
        amount: "1000",
        placeDate: "04-11-2022",
        matchDate: "04-11-2022",
        type: "Yes"
    }, {
        eventType: "Cricket",
        eventName: "India Vs Pakistan",
        userName: "JohnDoe9110",
        team: "India",
        betType: "Bookmaker",
        userRate: "66",
        amount: "1000",
        placeDate: "04-11-2022",
        matchDate: "04-11-2022",
        type: "Lay"
    }, {
        eventType: "Cricket",
        eventName: "India Vs Pakistan",
        userName: "JohnParker1234",
        team: "India",
        betType: "Match Odds",
        userRate: "66",
        amount: "1000",
        placeDate: "04-11-2022",
        matchDate: "04-11-2022",
        type: "Back"
    }]
    return (
        <Box sx={[{ marginX: "0.5%", minHeight: "200px", borderTopRightRadius: { mobile: "10px", laptop: '0px', tablet: '10px' }, borderTopLeftRadius: { mobile: "10px", laptop: '0px', tablet: '10px' }, border: "2px solid white" }, (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`
        })]}>
            <ListH />
            <Box sx={{ overflowX: 'scroll' }}>
                <Box sx={{ overflowX: "scroll", minWidth: '900px' }} >
                    <ListHeaderT />


                    {[...data, ...data].map((i, k) => {
                        return (
                            <Row data={i} index={k} containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />

                        )
                    })}
                </Box>
            </Box>
            <Box sx={{ width: '100%', margin: 0, position: 'absolute', left: 0, }}>
                <Footer />
            </Box>
        </Box >
    )
}

const ListH = () => {
    return (<Box display={"flex"} sx={{ justifyContent: "space-between", px: "10px", py: "6px" }}>
        <Box display={"flex"} alignItems="center">
            <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>Show</Typography>
            <SmallDropDown />
            <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>Entries</Typography>

        </Box>
        <SearchInput show={true} placeholder={"Search..."} />
    </Box>)
}

const ListHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "35px", background: "#262626", alignItems: "center", borderTop: "2px solid white", borderBottom: "2px solid white" }}>
            <Box sx={{ width: "3%", display: "flex", justifyContent: 'center', alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>No</Typography>
            </Box>
            <Box sx={{ width: "12%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Event Type</Typography>
            </Box>
            <Box sx={{ width: "15%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Event Name</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Username</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Team</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Bet Type</Typography>
            </Box>
            <Box sx={{ width: "7%", display: "flex", justifyContent: 'center', alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>User Rate</Typography>
            </Box>
            <Box sx={{ width: "8%", display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "10px" }}>Back/Lay</Typography>
                <Typography sx={{ color: "white", fontSize: "10px" }}>Yes/No</Typography>

            </Box>
            <Box sx={{ width: "8%", display: "flex", paddingLeft: '10px', alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Amount</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Place Date</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Match Date</Typography>
            </Box>
        </Box>
    )
}

const Row = ({ containerStyle, data, fContainerStyle, fTextStyle, profit, index }) => {
    let flag = index % 2 != 0
    let no = (index + 1).toString()
    return (
        <Box sx={[{ display: "flex", height: "45px", background: "#0B4F26", alignItems: "center", overflow: "hidden", borderBottom: "2px solid white" }, containerStyle]}>
            <Box sx={[{ width: "3%", justifyContent: 'center', display: "flex", alignItems: "center", height: "45px", background: 'black', borderRight: "2px solid white" }]}>
                <Typography sx={[{ fontSize: "12px", fontWeight: "600", color: 'white', textAlign: 'center' }]}>{(no > 9 ? "" : "0") + no}</Typography>
            </Box>
            <Box sx={[{ width: "12%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }, fContainerStyle]}>
                <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>{data.eventType}</Typography>
            </Box>
            <Box sx={{ width: "15%", display: "flex", paddingLeft: "10px", background: flag ? "#ECECEC" : "#FFE094", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}>{data.eventName}</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", background: flag ? "#ECECEC" : "#FFE094", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}>{"John"}</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", background: flag ? "#FFB5B5" : "#A7DCFF", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{data.team}</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", background: flag ? "#FFB5B5" : "#A7DCFF", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{data.betType}</Typography>
            </Box>
            <Box sx={{ width: "7%", display: "flex", background: flag ? "#FFB5B5" : "#A7DCFF", alignItems: "center", height: "45px", borderRight: "2px solid white", justifyContent: 'center' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{data.userRate}</Typography>
            </Box>
            <Box sx={{ width: "8%", display: "flex", justifyContent: 'center', background: flag ? "#FFB5B5" : "#A7DCFF", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{data.type}</Typography>

            </Box>
            <Box sx={{ width: "8%", display: "flex", paddingLeft: '10px', background: flag ? "#FFB5B5" : "#A7DCFF", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{data.amount}</Typography>

            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", flexDirection: 'column', justifyContent: "center", height: "45px", borderRight: "2px solid white", background: flag ? "#ECECEC" : "#FFE094" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{data.placeDate}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{"10:20 AM"}</Typography>

            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", flexDirection: 'column', justifyContent: "center", height: "45px", borderRight: "2px solid white", background: flag ? "#ECECEC" : "#FFE094" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{data.matchDate}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{"10:20 AM"}</Typography>

            </Box>


        </Box>
    )
}
export default BetsList;