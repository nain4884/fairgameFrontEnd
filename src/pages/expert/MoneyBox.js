import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { ArrowDownRed, ArrowUpGreen } from "../../expert/assets";

const MoneyBox = ({ color, value }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      sx={{
        width: "80px",
        borderRadius: "5px",
        justifyContent: "center",
        position: matchesMobile ? "absolute" : "relative",
        right: matchesMobile ? "-90%" : "10px",
        alignItems: "center",
        display: "flex",
        height: "25px",
        borderRadius: "7px",
      }}
    >
      <Typography
        sx={{
          fontSize: ".8vw",
          fontWeight: "bold",
          color: Number(value) > 0 ? "#46e080" : "#FF4D4D",
        }}
      >
        {value === 0 ? "" : value}
      </Typography>
      {value ? (
        <img
          src={Number(value) > 0 ? ArrowUpGreen : ArrowDownRed}
          style={{ width: "12px", height: "10px" }}
        />
      ) : ""}
    </Box>
  );
};

export default MoneyBox;
