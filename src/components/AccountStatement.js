import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Excel, Pdf } from "../admin/assets"
import SearchInput from "../components/SearchInput"
import StyledImage from "./StyledImage"
import { useEffect } from "react"
const AccountStatementList = () => {
    const theme = useTheme()
    const matchesBreakPoint = useMediaQuery("(max-width:1137px)")

    return (
        <>
            <Box sx={[{ marginX: "0.5%", minHeight: "200px", borderRadius: "px", border: "2px solid white" }, (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`
            })]}>
                <ListH />
                <Box sx={{ overflowX: "auto" }}>
                    <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
                        <ListHeaderT />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}


const Footer = () => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: { mobile: "5px", laptop: "10px" }, justifyContent: "space-between", background: "#FAFAFA", marginTop: "5px", marginX: "0.5%", marginBottom: "20px" }}>
            <Typography sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}>Showing 1 to 6 of 10 entries</Typography>
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

const ListH = () => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (<Box display={"flex"} sx={{ justifyContent: "space-between", px: "10px", py: "10px" }}>
        <Box display={"flex"} alignItems="center">
            <Box sx={{ background: "white", height: "30px", borderRadius: "5px", width: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Excel} sx={{ height: "25px" }} />
            </Box>
            <Box sx={{ background: "white", marginLeft: "10px", height: "30px", borderRadius: "5px", width: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Pdf} sx={{ height: "25px" }} />
            </Box>
        </Box>
        {/* <SearchInput inputContainerStyle={matchesMobile ? { width: "50%" } : {}} showTextInput={matchesMobile?true:false} placeholder={"Search User..."} /> */}
    </Box>)
}

const ListHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "35px", background: "#262626", alignItems: "center", borderTop: "2px solid white", minWidth: "200px", borderBottom: "2px solid white" }}>
            <Box sx={{ width: "11%", minWidth: "100px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Date</Typography>
            </Box>
            <Box sx={{ width: "11%", minWidth: "130px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Credit</Typography>
            </Box>
            <Box sx={{ width: "11%", minWidth: "130px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Debit</Typography>
            </Box>
            <Box sx={{ width: "10%", minWidth: "130px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Closing</Typography>
            </Box>
            <Box sx={{ width: "40%", minWidth: "400px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Description</Typography>
            </Box>
            <Box sx={{ width: "10%", minWidth: "130px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>From</Typography>
            </Box>
            <Box sx={{ width: "10%", minWidth: "100px", display: "flex", justifyContent: "center", alignItems: "center", height: "35px" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>To</Typography>
            </Box>
        </Box>
    )
}




const Row = ({ containerStyle, fContainerStyle, fTextStyle, profit }) => {
    return (
        <Box sx={[{ display: "flex", height: "45px", background: "#0B4F26", alignItems: "center", borderBottom: "2px solid white" }, containerStyle]}>
            <Box sx={[{ width: "11%", minWidth: "100px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "43px", borderRight: "2px solid white" }, fContainerStyle]}>
                <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>03-11-2022</Typography>
            </Box>
            <Box sx={{ width: "11%", minWidth: "130px", display: "flex", paddingLeft: "10px", background: "#27AC1E", alignItems: "center", height: "43px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>4,02,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "11%", minWidth: "130px", display: "flex", paddingLeft: "10px", background: "#E32A2A", alignItems: "center", height: "43px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>4,02,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "10%", minWidth: "130px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "40%", minWidth: "400px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</Typography>
            </Box>
            <Box sx={{ width: "10%", minWidth: "130px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", justifyContent: 'center' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>Admin</Typography>
            </Box>
            <Box sx={{ width: "10%", minWidth: "100px", display: "flex", justifyContent: "center", alignItems: "center", height: "45px" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>User</Typography>

            </Box>
        </Box>
    )
}
export default AccountStatementList;