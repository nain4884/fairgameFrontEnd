import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { UD } from "../../../assets";
import DropdownMenu from "./DropdownMenu";
import { useEffect } from "react";
import { useCallback } from "react";

const PlaceBetComponentWeb = ({ onClick, amount, setData, newData, width }) => {
  const [proLoss, setProfitLoss] = useState(newData?.profitLoss);

  useEffect(() => {
    setData((prev) => {
      if (Array.isArray(prev)) {
        const index = prev.findIndex((item) => item.id === newData.id);
        if (index !== -1) {
          // merge newData with the existing object
          const updatedItem = { ...prev[index], ...newData };
          const updatedArray = [...prev];
          updatedArray.splice(index, 1, updatedItem);
          return updatedArray;
        } else {
          return prev;
        }
      } else {
        // handle the case when prev is not an array
        return prev;
      }
    });

    setProfitLoss(newData?.profitLoss);
  }, [newData]);

  const handleClick = useCallback(
    (e) => {
      setData((prev) => {
        if (Array.isArray(prev)) {
          const index = prev.findIndex((item) => item.id === newData.id);
          if (index !== -1) {
            const updatedItem = { ...prev[index], ...newData };
            const updatedArray = [...prev];
            updatedArray.splice(index, 1, updatedItem);
            return updatedArray;
          } else {
            // if (prev.length < 4) {
            return [...prev, newData];
            // }
            // return prev;
          }
        } else {
          // handle the case when prev is not an array
          return prev;
        }
      });
    },
    [setData, newData]
  );

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingX: ".2vw",
          width: "10vw",
          borderRadius: "5px",
          height: "32px",
          right: "11vw",
          position: "absolute",
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
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#FF4D4D" }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#0B4F26" }}
          >
            {proLoss?.total_bet || 0}
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
            sx={{
              fontSize: { laptop: amount ? ".65vw" : ".6vw" },
              fontWeight: amount ? "bold" : "500",
              color: "white",
            }}
          >
            {" "}
            {!newData?.profitLoss?.max_loss
              ? "Profit/Loss"
              : newData?.profitLoss?.max_loss}
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PlaceBetComponentWeb;
