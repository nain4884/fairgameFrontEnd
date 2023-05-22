import { Box, Typography } from '@mui/material';
import React from 'react'

const Result = ({ color, title, invert, onClick,width }) => {
  const boxWidth = width ? { laptop: "7vw" } : { "@media screen and (max-width: 1300px)": { width: "9vw" } };
    return (
      <Box onClick={onClick}>
        <Box
          sx={{
            width: { laptop: "80px", mobile: "12vw" },
            display: "flex",
            marginRight: "10px",
            justifyContent: "center",
            paddingX: 1,
            alignItems: "center",
            height: "30px",
            background: invert ? "white" : "#0B4F26",
            borderRadius: "3px",
            cursor: "pointer"
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "11px", mobile: "10px" },
              fontWeight: "600",
              color: invert ? "0B4F26" : "white",
            }}
          >
            {"Result"}
          </Typography>
        </Box>
      </Box>
    );
  };

export default Result