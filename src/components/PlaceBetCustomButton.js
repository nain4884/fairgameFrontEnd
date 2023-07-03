import { Box, Typography } from '@mui/material';
import React from 'react'
import { memo } from 'react';


const PlaceBetCustomButton = ({ color, title, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: { laptop: "150px", mobile: "130px" },
          height: { laptop: "35px", mobile: "38px" },
          borderRadius: { mobile: "7px", laptop: "5px" },
          border: "2px solid white",
          alignItems: "center",
          justifyContent: "center",
          background: color,
          display: "flex",
        }}
      >
        <Typography
          sx={{ color: "white", fontWeight: "500", fontSize: "13px" }}
        >
          {title}
        </Typography>
      </Box>
    );
  };


export default memo(PlaceBetCustomButton)