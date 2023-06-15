import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'

const MoneyBox = ({ color, rates }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      sx={{
        width: "80px",
        marginRight: "15px",
        border: "1px solid #2626264D",
        borderRadius: "5px",
        justifyContent: "center",
        // position: matchesMobile ? "relative" : "relative",
        // right: matchesMobile ? "7px" : "7px",
        alignItems: "center",
        display: "flex",
        height: "25px",
        background: "#F6F6F6",
        borderRadius: "7px",
        zIndex: 100,
      }}
    >
      <Typography sx={{ fontSize: "9px", fontWeight: "bold", color: color }}>
        {rates}
      </Typography>
    </Box>
  );
};
export default MoneyBox