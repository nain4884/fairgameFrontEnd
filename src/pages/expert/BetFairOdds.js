import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Background from "./Background";
import MatchListComp from "./Home1";
import { DailogModal } from "../../components";
import { useContext } from "react";
import { SocketContext } from "../../context/socketContext";
import { GlobalStore } from "../../context/globalStore";
import { useEffect } from "react";
import { memo } from "react";
function BetFairOdds() {
  return (
    <Background>
      <MatchListComp />
      <DailogModal />
    </Background>
  );
}

export default memo(BetFairOdds);
