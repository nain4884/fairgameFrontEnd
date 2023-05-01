import { Box, Typography } from '@mui/material';
import React from 'react'
import { BroadCast_ } from '../../expert/assets';
import { Button } from "@mui/material";

const Stop = ({ color, title, onClick }) => {
    return (
      <>
      {/* <Box
        onClick={onClick}
        sx={{
          width: { laptop: "90px", mobile: "17vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
          cursor: "pointer"
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: "11px", mobile: "10px" },
            fontWeight: "600",
            color: color ? "white" : "white",
          }}
        >
          {"Stop 1"}
        </Typography>
        <img
          src={BroadCast_}
          style={{ height: "15px", width: "20px", backgroundSize: "contains" }}
        />
      </Box> */}
      <Button
        onClick={onClick}
        sx={{
          width: { laptop: "90px", mobile: "17vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
          cursor: "pointer"
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: "11px", mobile: "10px" },
            fontWeight: "600",
            color: color ? "white" : "white",
          }}
        >
          {"Stop"}
        </Typography>
        <img
          src={BroadCast_}
          style={{ height: "15px", width: "20px", backgroundSize: "contains" }}
        />
      </Button>
      </>
    );
  };
export default Stop