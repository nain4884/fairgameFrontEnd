import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import StyledImage from "./StyledImage";
import { DropDown } from "../admin/assets";
export default function HomeSlide() {
    const [show, setShow] = useState(false)
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    return (<Box sx={{ position: "relative" }}>
        <Box sx={{ background: "#FFE094", padding: matchesMobile?"10px":"20px",paddingY:"12px", borderBottomLeftRadius: "5px", width: "99%", marginX: "0.5%", borderBottomRightRadius: "5px" }}>
            {show && <><Box sx={{ display: "flex",flexDirection:{laptop:"row",mobile:"column"}, justifyContent: "space-between" }}>
                <DataShow title={"Upper Level Credit Referance"} value="2,07,000,000" containerStyle={{ flex: 1 }} />
                <DataShow title={"Down level Occupy Balance"} value="1,00,000,000,00" containerStyle={{ flex: 1,marginTop:matchesMobile?"10px":"0px", marginX: matchesMobile?"0px":"20px" }} />
                <DataShow title={"Down Level Credit Referance"} value="1,00,000,000,00" containerStyle={{ flex: 1 ,marginTop:matchesMobile?"10px":"0px"}} />
            </Box>
                <Box sx={{ display: "flex", marginTop: "10px",flexDirection:{laptop:"row",mobile:"column"}, justifyContent: "space-between" }}>
                    <DataShow title={"Total Master Balance"} value="2,05,067,211" containerStyle={{ flex: 1 }} />
                    <DataShow title={"Upper Level"} value="1,00,000,000,00" containerStyle={{ flex: 1,marginTop:matchesMobile?"10px":"0px", marginX: matchesMobile?"0px":"20px" }} />
                    <DataShow title={"Down Level Profit/Loss"} value="1,00,000,000,00" containerStyle={{ flex: 1 ,marginTop:matchesMobile?"10px":"0px"}} />
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px",flexDirection:{laptop:"row",mobile:"column"}, justifyContent: "space-between", marginBottom: "15px" }}>
                    <DataShow title={"Available Balance"} value="-2,35,929,480" containerStyle={{ flex: 1 }} valueContainerStyle={{ background: "#FF4848" }} />
                    <DataShow title={"Available Balance With Profit/Loss"} value="1,00,000,000,00" containerStyle={{ flex: 1,marginTop:matchesMobile?"10px":"0px", marginX: matchesMobile?"0px":"20px" }} />
                    <DataShow title={"My Profit/Loss"} value="1,00,000,000,00" containerStyle={{ flex: 1,marginTop:matchesMobile?"10px":"0px" }} />
                </Box>
            </>}
        </Box>
        <Box onClick={() => {
            setShow(!show)
        }} sx={{ background: "#ffe094", justifyContent: "center", alignItems: "center", height: "40px", width: "40px", display: "flex", marginX: "auto",marginTop:"-25px", borderRadius: "25px" }}>
            <StyledImage src={DropDown} sx={{ height: "25px", width: "25px", transform: show?"rotate(0deg)":"rotate(180deg);" }} />
        </Box>
    </Box>
    )
}

const DataShow = ({ title, value, containerStyle, valueContainerStyle }) => {
    return (
        <Box sx={[{ display: "flex", height: "38px", backgroundColor: "white", alignItems: "center" ,border:"2px solid white"}, containerStyle]}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{title}</Typography>
            </Box>
            <Box sx={[{ flex: 0.5, display: "flex", alignItems: "center", justifyContent: "center", height: "35px",  background: "#0B4F26" }, valueContainerStyle]}>
                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}>{value}</Typography>
            </Box>
        </Box>
    )
}