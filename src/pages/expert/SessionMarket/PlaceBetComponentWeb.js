import React, { memo, useCallback } from "react";
import DropdownMenu from "../DropdownMenu";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import useOuterClick from "../../../components/helper/userOuterClick";
import { UD } from "../../../assets";

const PlaceBetComponentWeb = ({ amount, setData, newData }) => {
  const [proLoss, setProfitLoss] = useState(newData?.profitLoss);
  const [anchorEl, setAnchorEl] = useState(null);
 
  const [show, setShow] = useState(false);
  const innerRef = useOuterClick((ev) => {
    setShow(false);
  });



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
          top: "4px",
          '@media screen and (max-width: 1300px)': {
            width: '9vw',
          },
          width: { laptop: "7vw" },
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
            width: "100%",
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
              fontSize: { laptop: "8px" },
              fontWeight: "bold",
              textAlign: "center",
              color: "#FF4D4D",
              lineHeight: "1"
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
            paddingX: "2px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: amount ? "10px" : "10px" },
              fontWeight: amount ? "bold" : "500",
              color: "white",
            }}
          >
           
           {!newData?.profitLoss?.max_loss ? "Profit/Loss" : newData?.profitLoss?.max_loss }
  
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

export default memo(PlaceBetComponentWeb);
