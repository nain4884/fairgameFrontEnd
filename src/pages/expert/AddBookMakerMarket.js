import Header from './Header'
import Background from './Background'
import { Box } from "@mui/material";
import IndiaPakLiveBookMaker from "../../components/IndiaPakLiveBookMaker";
import BetMakerMarket from '../../components/BookMakerMarket';
export default function AddBookMakerMarket() {
    return (
        <Background>
            <Header />
            <Box display="flex">
                <Box flex={1} sx={{ margin: "10px" }}>
                    <IndiaPakLiveBookMaker add={true} />

                </Box>
                <Box sx={{ margin: "10px", flex: 1, marginLeft: "0px" }}>
                    <BetMakerMarket add={true} />
                </Box>
            </Box>
        </Background>
    )
}