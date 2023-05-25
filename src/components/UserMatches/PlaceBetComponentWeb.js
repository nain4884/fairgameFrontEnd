import React from "react";
import DropdownMenu from "./DropdownMenu";
import { UD } from "../../assets";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import useOuterClick from "../helper/userOuterClick";
import { useState } from "react";
import { useSelector } from "react-redux";

const PlaceBetComponentWeb = ({ amount, profitLoss }) => {
  const [proLoss, setProfitLoss] = useState(profitLoss?.profitLoss);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [show, setShow] = React.useState(false);
  const innerRef = useOuterClick((ev) => {
    setShow(false);
  });

  
  useEffect(() => {
    if (profitLoss) {
      setProfitLoss(profitLoss?.profitLoss);
    }
  }, [profitLoss]);
  return (
    <>
      <Box
        onClick={(e) => setShow(!show)}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingX: ".2vw",
          top:"3px",
          width: { laptop: "10vw" },
          borderRadius: "5px",
          height: "32px",
          right: "8px",
          position: "absolute",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "45%",
            height: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: ".5vw" },
              fontWeight: "bold",
              color: "#FF4D4D",
            }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{
              fontSize: { laptop: ".5vw" },
              fontWeight: "bold",
              color: "#0B4F26",
            }}
          >
            {proLoss?.total_bet || 0}
            {/* {profitLoss?.total_bet || 0} */}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop:!profitLoss?.profitLoss?.max_loss ? ".65vw" : ".65vw" },
              fontWeight: !profitLoss?.profitLoss?.max_loss ? "bold" : "bold",
              color: "white",
            }}
          >
            {!profitLoss?.profitLoss?.max_loss ? "Profit/Loss" : profitLoss?.profitLoss?.max_loss }
       
      
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </Box>
        {show && (
          <DropdownMenu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            list={proLoss?.betData}
            // list={profitLoss?.betData}
            handleClose={handleClose}
          />
        )}
      </Box>
    </>
  );
};

export default PlaceBetComponentWeb;
