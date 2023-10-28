import { Box } from "@mui/material";
import Back from '../../expert/assets/back.webp'
export default function Background({ children }) {
    return (
        <Box sx={{ minHeight: "100vh", padding: '1%', width: "100%", backgroundImage: `url(${Back})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
            {children}
        </Box>
    )
}