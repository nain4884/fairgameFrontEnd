import { Box, Typography } from '@mui/material';
import React from 'react'
import { BroadCast } from '../../expert/assets';
import { Button } from "@mui/material";

const SmallBox = ({ color, title, width, textSize, onClick, hide, customStyle }) => {
  return (
    <>
      <Box
        onClick={onClick}
        sx={[{
          width: { laptop: width ? width : "80px", mobile: width },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: "25px",
          background: color ? color : "#46e080",
          borderRadius: "3px",
          cursor: "pointer",
        },
        customStyle
      ]}
      >
        <Typography
          sx={{
            fontSize: { laptop: textSize ? textSize : "11px", mobile: "10px" },
            fontWeight: "600",
            color: color !== "#FFF" && "white",
            lineHeight: 1
          }}
        >
          {title}
        </Typography>
        {hide && <img src={BroadCast} style={{ height: "15px", width: "15px" }} />}
      </Box>
      {/* <Button
        onClick={onClick}
        sx={{
          width: { laptop: width ? width : "80px", mobile: "12vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: "30px",
          background: color ? color : "#46e080",
          borderRadius: "3px",
          cursor: "pointer",
          '&:hover': {
            backgroundColor: color ? color : "#46e080",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: textSize ? textSize : "11px", mobile: "10px" },
            fontWeight: "600",
            color: color ? "white" : "white",
          }}
        >
          {title}
        </Typography>
        <img src={BroadCast} style={{ height: "15px", width: "15px" }} />
      </Button> */}
    </>
  );
};

export default SmallBox