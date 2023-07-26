import { Box, Typography } from "@mui/material";
import React from "react";

const SmallBoxSeason = ({ color, allBetsData, sessionBets, totalAmount }) => {
  function countObjectsWithNullDeletedReason(array) {
    let count = 0;
    for (const obj of array) {
      if (obj?.deleted_reason === null) {
        count++;
      }
    }
    return count;
  }
  
  // Call the function and get the count
  const countNullDeletedReason = countObjectsWithNullDeletedReason(sessionBets);
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
          sx={{ fontSize: { mobile: "10px", tablet: "10px", laptop: "12px" }, fontWeight: "bold", color: "#319E5B" }}
        >
          {sessionBets?.length < 10 ? 0 : ""}{countNullDeletedReason || 0}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "70px", mobile: "50px", tablet: "70px" },
          flexDirection: "column",
          // position: "absolute",
          display: "flex",
          left: { mobile: "60%", laptop: "55vw", tablet: "65%" },
          justifyContent: "space-around",
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
            fontSize: { mobile: "10px", tablet: "10px", laptop: "12px" },
            fontWeight: "bold",
            color: "#FF4D4D",
            lineHeight: '1.5',
          }}
        >
          {totalAmount > 0 ? `-` + totalAmount : totalAmount == undefined ? 0 : totalAmount}
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallBoxSeason;
