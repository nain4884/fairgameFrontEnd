import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomHeader, MatchOdds, SideBar } from "../../components";
import EventListing from "../../components/EventListing";
import MatchesComponent from "../../components/Matches";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HourGlass } from "../../assets";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../store/betPlace";
export default function Matches() {
    const [drawer, setDrawer] = useState(false)
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    const [selected, setSelected] = useState("CRICKET")
    const activeTab = useSelector(state => state.betplace)?.activeTab
    // useEffect(() => {
    //     setSelected(activeTab)
    // }, [activeTab])
    return (
        <div style={{ height: "100vh", display: 'flex', flexDirection: 'column' }} >
            <CustomHeader />
            <Box flex={1} sx={[{ flex: 1, display: 'flex', minHeight: matchesMobile ? '100vh' : "80%", }, (theme) => ({
                backgroundImage: `${theme.palette.primary.homeBodyGradient}`
            })]} >
                <SideBar />
                {!matchesMobile && <Box sx={{ display: 'flex', overflowX: "hidden", flexDirection: 'column', flex: 1, justifyContent: 'flex-start', overflowY: "auto", alignItems: 'flex-start' }}>
                    <EventListing selected={activeTab} setSelected={setSelected} />
                    <div style={{ height: "1vh" }} />
                    {(activeTab == "CRICKET" || activeTab == "INPLAY") && <MatchesComponent onClick={() => {
                        dispatch(setActive("CRICKET"))
                        navigate('/home')
                    }} />}
                    {(activeTab != "CRICKET" && activeTab != "INPLAY") &&
                        <Box style={{ display: "flex", justifyContent: "center", width: "100%", flex: 1, alignItems: "center", flexDirection: "column" }}>
                            <Lottie animationData={HourGlass} style={{ display: "flex", alignSelf: "center", width: "200px", height: "200px" }} />
                            <Typography sx={{ color: "text.white" }}>Coming Soon</Typography>
                        </Box>
                    }
                </Box>}
                {matchesMobile && <Box sx={{ overflowX: "hidden", minHeight: "100vh" }}>
                    <EventListing selected={activeTab} setSelected={setSelected} />
                    {/* <div style={{ height: "1vh" }} /> */}
                    {(activeTab == "CRICKET" || activeTab == "INPLAY") && <MatchesComponent onClick={() => navigate('/home')} />}
                    {(activeTab != "CRICKET" && activeTab != "INPLAY") &&
                        <Box style={{ display: "flex", justifyContent: "center", width: "100%", flex: 1, alignItems: "center", flexDirection: "column" }}>
                            <Lottie animationData={HourGlass} style={{ display: "flex", alignSelf: "center", width: "200px", height: "200px" }} />
                            <Typography sx={{ color: "text.white" }}>Coming Soon</Typography>
                        </Box>
                    }
                </Box>}
            </Box>

        </div>
    );
}