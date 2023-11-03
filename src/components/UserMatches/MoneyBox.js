import { Box, Typography } from '@mui/material';
import React from 'react';

const MoneyBox = ({ color, rates }) => {
  return (
    <Box
      sx={{
        width: "90px",
        marginRight: "15px",
        border: "1px solid #2626264D",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "25px",
        background: "#F6F6F6",
        borderRadius: "7px",
        zIndex: 100,
      }}
    >
      <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: color }}>
        {rates}
      </Typography>
    </Box>
  );
};
export default MoneyBox