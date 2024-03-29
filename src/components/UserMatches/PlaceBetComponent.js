import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import useOuterClick from "../helper/userOuterClick";
import { useState } from "react";

const PlaceBetComponent = ({ amount, profitLoss }) => {
  const [proLoss, setProfitLoss] = useState(profitLoss?.profitLoss);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(0);
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
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        ref={innerRef}
        onClick={(e) => {
          setShow(!show);
        }}
        sx={{
          background: "#0B4F26",
          position: "absolute",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          right: { mobile: "43vw", laptop: "41vw", tablet: "41vw" },
          justifyContent: "center",
          width: { laptop: "90px", mobile: "60px", tablet: "90px" },
          borderRadius: "5px",
          height: "35px",

          zIndex: 100,
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "90%",
            height: "45%",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "10px", mobile: "8px" },
              fontWeight: "bold",
              color: "#FF4D4D",
            }}
          >
            Total Bet :{" "}
            <span style={{ color: "#0B4F26" }}>{proLoss?.total_bet || 0}</span>
          </Typography>
        </Box>
        <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: {
                laptop: !profitLoss?.profitLoss?.max_loss ? "8px" : "8px",
                tablet: "8px",
                mobile: "8px",
              },
              fontWeight: !profitLoss?.profitLoss?.max_loss ? "500" : "500",
              color: "white",
            }}
          >
            {!profitLoss?.profitLoss?.max_loss
              ? "Profit/Loss"
              : profitLoss?.profitLoss?.max_loss}
          </Typography>
        </Box>
      </Box>
      {show && (
        <DropdownMenu
          style={{ zIbnex: 10 }}
          list={proLoss?.betData}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};

export default PlaceBetComponent;
