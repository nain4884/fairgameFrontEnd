import { IndiaPakLive, SessionResult, BetLive } from "../../components";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Header from './Header'
import Background from './Background'
export default function Live() {
    const location = useLocation()
    return (
        <Background>
            <Header />
            <Box display="flex">
                <Box flex={1} sx={{ margin: "10px" }}>
                    <IndiaPakLive createSession={location?.state?.createSession} match={location?.state?.match} />
                    <SessionResult createSession={location?.state?.createSession} />
                </Box>
                <Box sx={{ margin: "10px", flex: 1, marginLeft: "0px" }}>
                    <BetLive createSession={location?.state?.createSession} />
                </Box>
            </Box>
        </Background>
    )
}