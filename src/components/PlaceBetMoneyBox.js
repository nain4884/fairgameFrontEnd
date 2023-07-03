import { Box, Typography } from "@mui/material";
import React from "react";
import StyledImage from "./StyledImage";

const PlaceBetMoneyBox = ({ color, trendingDown, rate, trendingUp }) => {
  return (
    <Box
      sx={{
        width: { mobile: "70px", tablet: "100px", laptop: "100px" },
        height: "25px",
        alignItems: "center",
        justifyContent: "center",
        background: color,
        borderRadius: "4px",
        display: "flex",
      }}
    >
      <Typography
        sx={{
          fontSize: { mobile: "10px", tablet: "13px", laptop: "13px" },
          fontWeight: "700",
          color: "white",
        }}
      >
        {rate}
      </Typography>
      {trendingUp && (
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
          sx={{
            height: "20px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "20px",
          }}
        />
      )}
      {trendingDown && (
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
          sx={{
            height: "20px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "20px",
          }}
        />
      )}
    </Box>
  );
};

export default PlaceBetMoneyBox;
