import { Box, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { DownGIcon, DownIcon, Excel, LockIcon, Pdf, UnLockIcon } from "../admin/assets"
import SearchInput from "./SearchInput"
import StyledImage from "./StyledImage"
import UserDetailModal from "./UserDetailModal"

const AccountList = () => {
    const matchesBreakPoint = useMediaQuery("(max-width:1137px)")

    return (
        <>
            <Box sx={[{ marginX: "0.5%", minHeight: "200px", borderRadius: "10px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", overflow: "hidden", border: "2px solid white" }, (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`
            })]}>
                <ListH />
                <Box sx={{ overflowX: "auto" }}>
                    <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
                        <ListHeaderT />
                        <ListSubHeaderT />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                        <Row containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                        <Row containerStyle={{ background: "#ECECEC", borderBottom: "0px" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                    </Box>
                </Box>
            </Box>

            <Footer />
        </>
    )
}

const Footer = () => {
    return (
        <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: { mobile: "5px", laptop: "10px" }, justifyContent: "space-between", background: "#FAFAFA", marginTop: "5px", marginX: "0.5%", marginBottom: "20px" }}>
            <Typography sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}>Showing 1 to 50</Typography>
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
    return (<Box display={"flex"} sx={{ justifyContent: "space-between", px: "10px", py: "10px" }}>
        <Box display={"flex"} alignItems="center">
            <Box sx={{ background: "white", height: "30px", borderRadius: "5px", width: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Excel} sx={{ height: "25px" }} />
            </Box>
            <Box sx={{ background: "white", marginLeft: "10px", height: "30px", borderRadius: "5px", width: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Pdf} sx={{ height: "25px" }} />
            </Box>
        </Box>
        <SearchInput placeholder={"Search User..."} />
    </Box>)
}

const ListHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "35px", background: "#262626", alignItems: "center", borderTop: "2px solid white", borderBottom: "2px solid white" }}>
            <Box sx={{ width: "11%", display: "flex", minWidth: "140px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>User Details</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "110px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Credit Referance</Typography>
            </Box>
            <Box sx={{ width: "9%", display: "flex", minWidth: "110px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Balance</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", minWidth: "140px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Client Profit/Loss</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "100px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Exposure</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "100px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Available Balance</Typography>
            </Box>
            <Box sx={{ width: "5%", display: "flex", minWidth: "100px", justifyContent: "center", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Bet Lock</Typography>
            </Box>
            <Box sx={{ width: "5%", display: "flex", minWidth: "100px", justifyContent: "center", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>User Lock</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "100px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Exposure Limit</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "100px", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Account Type</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "100px", paddingLeft: "10px", alignItems: "center", height: "35px" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Casino Total</Typography>
            </Box>
        </Box>
    )
}


const ListSubHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "45px", minWidth: "100px", background: "#0B4F26", alignItems: "center", borderBottom: "2px solid white", overflow: "hidden" }}>
            <Box sx={{ width: "11%", display: "flex", minWidth: "140px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}></Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", minWidth: "110px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "9%", display: "flex", paddingLeft: "10px", alignItems: "center", minWidth: "110px", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", background: "#27AC1E", alignItems: "center", minWidth: "140px", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>4,02,000,000,0</Typography>
                <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
            </Box>
            <Box sx={{ width: "10%", display: "flex", minWidth: "100px", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", minWidth: "100px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "5%", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100px", height: "45px", borderRight: "2px solid white" }}>
            </Box>
            <Box sx={{ width: "5%", display: "flex", justifyContent: "center", alignItems: "center", height: "45px", minWidth: "100px", borderRight: "2px solid white" }}>
            </Box>
            <Box sx={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", height: "45px", minWidth: "100px", borderRight: "2px solid white" }}>
            </Box>
            <Box sx={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", height: "45px", minWidth: "100px", borderRight: "2px solid white" }}>
            </Box>
            <Box sx={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100px", height: "45px" }}>
            </Box>
        </Box>
    )
}

const Row = ({ containerStyle, fContainerStyle, fTextStyle, profit }) => {
    const dispatch = useDispatch()
    const [showUserModal, setShowUserModal] = useState(false)
    return (
        <>
            <Box sx={[{ display: "flex", height: "45px", background: "#0B4F26", alignItems: "center", overflow: "hidden", borderBottom: "2px solid white" }, containerStyle]}>
                <Box onClick={() => {
                    // dispatch(setModalOpen(true))
                    setShowUserModal(!showUserModal)
                }} sx={[{ width: "11%", display: "flex", paddingX: "10px", minWidth: "140px", justifyContent: "space-between", alignItems: "center", height: "45px", borderRight: "2px solid white" }, fContainerStyle]}>
                    <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>CHD9101012301</Typography>
                    <StyledImage src={profit ? DownIcon : DownGIcon} style={{ height: "10px", width: "15px" }} />
                </Box>
                <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", alignItems: "center", minWidth: "110px", height: "45px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
                </Box>
                <Box sx={{ width: "9%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", minWidth: "110px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
                </Box>
                <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", minWidth: "140px", background: profit ? "#27AC1E" : "#E32A2A", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>4,02,000,000,0</Typography>
                    <StyledImage src={profit ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"} sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                </Box>
                <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", minWidth: "100px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
                </Box>
                <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", alignItems: "center", minWidth: "100px", height: "45px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
                </Box>
                <Box sx={{ width: "5%", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100px", height: "45px", borderRight: "2px solid white" }}>
                    <StyledImage src={UnLockIcon} sx={{ height: "20px", width: "20px", fill: "#27AC1E" }} />
                </Box>
                <Box sx={{ width: "5%", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100px", height: "45px", borderRight: "2px solid white" }}>
                    <StyledImage src={LockIcon} sx={{ height: "20px", width: "20px", fill: "#27AC1E" }} />
                </Box>
                <Box sx={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", height: "45px", minWidth: "100px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
                </Box>
                <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", minWidth: "100px", borderRight: "2px solid white" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>SUPER MASTER</Typography>
                </Box>
                <Box sx={{ width: "10%", display: "flex", paddingLeft: "10px", alignItems: "center", minWidth: "100px", height: "45px" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>0</Typography>
                </Box>
            </Box>
            {showUserModal && <UserDetailModal setShowUserModal={setShowUserModal} backgroundColor={containerStyle?.background} />}
        </>
    )
}
export default AccountList