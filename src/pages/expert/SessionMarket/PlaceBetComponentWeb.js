import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import DropdownMenu from "../DropdownMenu";
import { UD } from "../../../assets";

const PlaceBetComponentWeb = ({ onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingX: ".2vw",
          width: "7vw",
          borderRadius: "5px",
          height: "30px",
          right: "8px",
          position: "absolute",
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "65%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#FF4D4D" }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#0B4F26" }}
          >
            250
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
          >
            P/L
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "3px" }}
          />
        </Box>
      </Box>
      <DropdownMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
};

export default PlaceBetComponentWeb;
