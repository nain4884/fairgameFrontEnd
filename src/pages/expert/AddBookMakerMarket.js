import Header from './Header'
import Background from './Background'
import { Box } from "@mui/material";
import IndiaPakLiveBookMaker from "../../components/IndiaPakLiveBookMaker";
import BetMakerMarket from '../../components/BookMakerMarket';
import { useLocation } from 'react-router-dom';
export default function AddBookMakerMarket() {
    const location = useLocation()
    return (
        <Background>
            {/* <Header /> */}
            <Box display="flex">
                <Box flex={1} sx={{ margin: "10px", marginTop: 0 }}>
                    <IndiaPakLiveBookMaker add={true} match={location?.state?.match} />
                </Box>
                <Box sx={{ margin: "10px", marginTop: 0, flex: 1, marginLeft: "0px" }}>
                    <BetMakerMarket add={true} match={location?.state?.match} />
                </Box>
            </Box>
        </Background>
    )
}