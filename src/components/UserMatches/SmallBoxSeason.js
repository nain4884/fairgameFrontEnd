import { Box, Typography } from "@mui/material";
import React from "react";

const SmallBoxSeason = ({ color, allBetsData, sessionBets, totalAmount }) => {
  // const totalAmount = sessionBets?.reduce((acc, obj) => acc + obj?.amount || Number(obj?.stake), 0);

  return (
    <Box
      sx={{
        marginLeft: { mobile: 0, laptop: "-15px", tablet: 0 },
        justifyContent: {
          mobile: "center",
          laptop: "center",
          tablet: "center",
        },
        display: "flex",
        width: { mobile: "85%", laptop: "80%", tablet: "85%" },
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { laptop: "70px", mobile: "50px", tablet: "70px" },
          flexDirection: "column",
          // position: "absolute",
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
          sx={{
            fontSize: { laptop: "8px", mobile: "7px", tablet: "8px" },
            fontWeight: "bold",
            color: "#FF4D4D",
          }}
        >
          Session Bet
        </Typography>
        <Typography
          sx={{ fontSize: { mobile: "12px", tablet: "12px", laptop: "12px" }, fontWeight: "bold", color: "#319E5B" }}
        >
          {sessionBets?.length || 0}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "70px", mobile: "50px", tablet: "70px" },
          flexDirection: "column",
          // position: "absolute",
          display: "flex",
          left: { mobile: "60%", laptop: "55vw", tablet: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "7px", tablet: "8px", laptop: "8px" },
            fontWeight: "bold",
            color: "#FF4D4D",
            textAlign: 'center',
            lineHeight: '1'
          }}
        >
          Total Amount
        </Typography>
        <Typography
          sx={{
            fontSize: { mobile: "12px", tablet: "12px", laptop: "12px" },
            fontWeight: "bold",
            color: "#FF4D4D",
          }}
        >
          {totalAmount > 0 ? `-`+totalAmount : totalAmount}
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallBoxSeason;
