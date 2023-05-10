import { Box, Typography } from "@mui/material";
import React from "react";

const SmallBoxSeason = ({ color, allBetsData }) => {
  return (
    <Box sx={{ marginTop: "-3vh" }}>
      <Box
        sx={{
          width: { laptop: "70px", mobile: "10vw" },
          flexDirection: "column",
          position: "absolute",
          display: "flex",
          left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{ fontSize: "8px", fontWeight: "bold", color: "#FF4D4D" }}
        >
          Session Bet
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: "bold", color: "#46e080" }}
        >
          {allBetsData?.length || 0}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "70px", mobile: "10vw" },
          flexDirection: "column",
          position: "absolute",
          display: "flex",
          left: { mobile: "65%", laptop: "55vw", tablet: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{ fontSize: "8px", fontWeight: "bold", color: "#FF4D4D" }}
        >
          Total Amount
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: "bold", color: "#46e080" }}
        >
          {allBetsData?.length || 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallBoxSeason;
