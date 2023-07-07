import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { ArrowDownRed, ArrowUpGreen } from "../../expert/assets";

const MoneyBox = ({ color, value }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  console.log(value, "value")
  return (
    <>
    <Box
      sx={{
        width: "270px",
        borderRadius: "5px",
        justifyContent: "center",
        position: matchesMobile ? "absolute" : "relative",
        right: matchesMobile ? "-90%" : "10px",
        alignItems: "center",
        display: "flex",
        height: "35px",
        borderRadius: "7px",
        border:  value === 0 ? "0" : "1px solid #ddd" 
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          color: Number(value) > 0 ? "#319E5B" : "#FF4D4D",
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
    </>
  );
};

export default MoneyBox;
