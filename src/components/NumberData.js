import { Box, Typography } from '@mui/material';
import React from 'react'

const NumberData = ({
  value,
  label,
  containerStyle,
  setDefaultValue,
  getLatestBetAmount,
}) => {
  return (
    <Box
      onClick={() => {
        setDefaultValue(value);
        getLatestBetAmount(value);
      }}
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: "18%",
          background: "#0B4F26",
          border: '2px solid white'
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
export default NumberData