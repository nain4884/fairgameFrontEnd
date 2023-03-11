import { Box, Typography } from "@mui/material"
import SearchInput from "./SearchInput"
import { Excel, LockIcon, Pdf, UnLockIcon } from "../assets"
import SmallDropDown from "./smallDropDown"

const AccountStatementList = () => {
    const Footer = () => {
        return (
            <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: { mobile: "5px", laptop: "10px" }, justifyContent: "space-between", background: "#FAFAFA", }}>
                <Typography sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}>Showing 1 to 6</Typography>
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
    return (
        <Box sx={[{ marginX: "0.5%", minHeight: "200px", borderRadius: "2px", border: "2px solid white", borderTopRightRadius: { mobile: "10px", laptop: '0px', tablet: '10px' }, borderTopLeftRadius: { mobile: "10px", laptop: '0px', tablet: '10px' } }, (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`
        })]}>
            <ListH />
            <Box sx={{ overflowX: 'scroll' }}>
                <Box sx={{ overflowX: 'scroll', minWidth: '900px' }}>
                    <ListHeaderT />

                    <Row index={1} containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                    <Row index={2} containerStyle={{ background: "#FFE094" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                    <Row index={3} containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                    <Row index={4} containerStyle={{ background: "#FFE094" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                    <Row index={5} containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                    <Row index={6} containerStyle={{ background: "#FFE094" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                    <Row index={7} containerStyle={{ background: "#FFE094" }} profit={true} fContainerStyle={{ background: "#0B4F26" }} fTextStyle={{ color: "white" }} />
                    <Row index={8} containerStyle={{ background: "#FFE094" }} profit={false} fContainerStyle={{ background: "#F8C851" }} fTextStyle={{ color: "#0B4F26" }} />
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

const ListH = () => {
    return (<Box display={"flex"} sx={{ justifyContent: "space-between", px: "10px", py: "6px" }}>
        <Box display={"flex"} alignItems="center">
            <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>Show</Typography>
            <SmallDropDown />
            <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>Entries</Typography>

        </Box>
        <SearchInput placeholder={"Search..."} />
    </Box>)
}

const ListHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "35px", background: "#262626", alignItems: "center", borderTop: "2px solid white", borderBottom: "2px solid white" }}>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Date</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Credit</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Debit</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Closing</Typography>
            </Box>
            <Box sx={{ width: "36%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Description</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", justifyContent: 'center', alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>From</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", justifyContent: "center", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>To</Typography>
            </Box>
        </Box>
    )
}




const Row = ({ containerStyle, fContainerStyle, fTextStyle, profit, index }) => {
    return (
        <Box sx={[{ display: "flex", height: "45px", background: "#0B4F26", alignItems: "center", overflow: "hidden", borderBottom: "2px solid white" }, containerStyle]}>
            <Box sx={[{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }, fContainerStyle]}>
                <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>03-11-2022</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", background: "#27AC1E", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>4,02,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: { laptop: "10px", mobile: "5px" }, background: "#E32A2A", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>4,02,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>1,00,000,000,0</Typography>
            </Box>
            <Box sx={{ width: "36%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", justifyContent: 'center', background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>Admin</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", justifyContent: "center", alignItems: "center", height: "45px", borderRight: "2px solid white", background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>Nika 20</Typography>

            </Box>


        </Box>
    )
}
export default AccountStatementList;