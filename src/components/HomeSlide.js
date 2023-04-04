import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import StyledImage from "./StyledImage";
import { DropDown } from "../admin/assets";
import adminAxios from "../axios/adminAxios";
import { setRole } from "./SetRole";
export default function HomeSlide() {
    const [show, setShow] = useState(false)
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    const [userBalanceDetails, setUserBalanceDetails] = useState({
        ul_credit_refer: 0,
        master_balance: 0,
        available_balance: 0,
        dl_balance: 0,
        upper_level: 0,
        available_balance_pl: 0,
        dl_credit_refer: 0,
        dl_profit_loss: 0,
        profit_loss: 0
    })

    useEffect(() => {
        getHeaderDetail()
    }, [])

    const getHeaderDetail = async () => {
        let {axios} = setRole()
        try {
            const reponse = await axios.get(`fair-game-wallet/getUserBalanceDetails`)
            setUserBalanceDetails(reponse.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (<Box sx={{ position: "relative" }}>
        <Box sx={{ background: "#FFE094", padding: matchesMobile ? "10px" : "20px", paddingY: "12px", borderBottomLeftRadius: "5px", width: "99%", marginX: "0.5%", borderBottomRightRadius: "5px" }}>
            {show && <><Box sx={{ display: "flex", flexDirection: { laptop: "row", mobile: "column" }, justifyContent: "space-between" }}>
                <DataShow title={"Upper Level Credit Referance"} value={userBalanceDetails?.ul_credit_refer} containerStyle={{ flex: 1 }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.ul_credit_refer) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                <DataShow title={"Down level Occupy Balance"} value={userBalanceDetails?.dl_balance} containerStyle={{ flex: 1, marginTop: matchesMobile ? "10px" : "0px", marginX: matchesMobile ? "0px" : "20px" }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.dl_balance) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                <DataShow title={"Down Level Credit Referance"} value={userBalanceDetails?.dl_credit_refer} containerStyle={{ flex: 1, marginTop: matchesMobile ? "10px" : "0px" }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.dl_credit_refer) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
            </Box>
                <Box sx={{ display: "flex", marginTop: "10px", flexDirection: { laptop: "row", mobile: "column" }, justifyContent: "space-between" }}>
                    <DataShow title={"Total Master Balance"} value={userBalanceDetails?.master_balance} containerStyle={{ flex: 1 }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.master_balance) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                    <DataShow title={"Upper Level"} value={userBalanceDetails?.upper_level} containerStyle={{ flex: 1, marginTop: matchesMobile ? "10px" : "0px", marginX: matchesMobile ? "0px" : "20px" }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.upper_level) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                    <DataShow title={"Down Level Profit/Loss"} value={userBalanceDetails?.dl_profit_loss} containerStyle={{ flex: 1, marginTop: matchesMobile ? "10px" : "0px" }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.dl_profit_loss) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px", flexDirection: { laptop: "row", mobile: "column" }, justifyContent: "space-between", marginBottom: "15px" }}>
                    <DataShow title={"Available Balance"} value={userBalanceDetails?.available_balance} containerStyle={{ flex: 1 }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.available_balance) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                    <DataShow title={"Available Balance With Profit/Loss"} value={userBalanceDetails?.available_balance_pl} containerStyle={{ flex: 1, marginTop: matchesMobile ? "10px" : "0px", marginX: matchesMobile ? "0px" : "20px" }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.available_balance_pl) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                    <DataShow title={"My Profit/Loss"} value={userBalanceDetails?.profit_loss} containerStyle={{ flex: 1, marginTop: matchesMobile ? "10px" : "0px" }} valueContainerStyle={{ background: `${parseInt(userBalanceDetails?.profit_loss) >= 0 ? "#0B4F26" : "#FF4848"}` }} />
                </Box>
            </>}
        </Box>
        <Box onClick={() => {
            setShow(!show)
        }} sx={{ background: "#ffe094", justifyContent: "center", alignItems: "center", height: "40px", width: "40px", display: "flex", marginX: "auto", marginTop: "-25px", borderRadius: "25px" }}>
            <StyledImage src={DropDown} sx={{ height: "25px", width: "25px", transform: show ? "rotate(0deg)" : "rotate(180deg);" }} />
        </Box>
    </Box>
    )
}

const DataShow = ({ title, value, containerStyle, valueContainerStyle }) => {
    return (
        <Box sx={[{ display: "flex", height: "38px", backgroundColor: "white", alignItems: "center", border: "2px solid white" }, containerStyle]}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{title}</Typography>
            </Box>
            <Box sx={[{ flex: 0.5, display: "flex", alignItems: "center", justifyContent: "center", height: "35px", background: "#0B4F26" }, valueContainerStyle]}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>{value}</Typography>
            </Box>
        </Box>
    )
}