import { Box, useMediaQuery, useTheme } from "@mui/material";
import { loginBackground, loginBackground1, loginBackground2 ,MobileBackground} from "../assets";
import Carousel from 'react-bootstrap/Carousel';

function BackgroundCarousel() {
    const theme=useTheme()
    let matchesMobile=useMediaQuery(theme.breakpoints.down("tablet"))
    return (
        <Box style={{ height: "100vh", width: "100vw", position: "absolute", zIndex: 0, top: 0, left: 0 }}>
            <Carousel pause={false} controls={false} indicators={false} interval={4000}>
                <Carousel.Item >
                    <Box style={{ height: "100vh", width: "100vw", backgroundImage: `url(${matchesMobile?MobileBackground:loginBackground})`, backgroundRepeat: "no-repeat", backgroundSize: "100vw 100vh" }} />
                </Carousel.Item>
            </Carousel>
        </Box>
    );
}




export default BackgroundCarousel