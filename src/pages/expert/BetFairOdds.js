import { Box, Typography } from "@mui/material";
import Header from './Header'
import Background from './Background'
import { MatchListComp } from "./Home1";
import { DailogModal } from "../../components";

import { memo } from "react";
 function BetFairOdds() {

  
  
    return (
        <Background>
            <Header />
            {/* <Box sx={{ background: "white", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", width: "45%", marginX: "auto", marginTop: '15vh', minHeight: "45vh" }}>
                <Typography sx={{ fontSize: "3vw", color: "#0B4F26", fontWeight: "bold" }}>No Match Added</Typography>
            </Box> */}
            <MatchListComp />
            <DailogModal />
        </Background>
    )
}

export default memo(BetFairOdds)