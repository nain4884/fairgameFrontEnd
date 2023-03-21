import { Box, useMediaQuery, useTheme } from "@mui/material";
import { LoginBg } from "../expert/assets";

export default function AuthBackground() {
    const theme = useTheme()
    return (
        <Box style={{ height: "100vh", width: "100vw", position: "absolute", zIndex: 0, top: 0, left: 0 }}>
            <Box style={{ height: "100vh", width: "100vw", backgroundImage: `url(${LoginBg})`, backgroundRepeat: "no-repeat", backgroundSize: "100vw 100vh" }} />
        </Box>
    );
}