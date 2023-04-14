import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MoneyBox from "./MoneyBox";
import SeprateBox from "./SeprateBox";
import { INDIA, PAKISTAN } from "../../assets";
import Divider from "../helper/Divider";

const BoxComponent = ({
  name,
  color,
  data,
  team,
  typeOfBet,
  rate,
  allRates,
  lock,
  newData
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  let backValue,
    layValue,
    suspended = null;


  // console.log(data?.matchOddsData?.[0],"SDDDDDDDDDD")
  if (team === "teamA") {
    backValue = data?.availableToBack;
    layValue = data?.availableToLay;
    suspended =false

  }
  if (team === "teamB") {
    backValue = data?.availableToBack;
    layValue = data?.availableToLay;
    suspended =false
     
  }
  // if (team === "draw") {
  //   backValue = data?.matchOddsData?.[0]?.teamC_Back;
  //   layValue = data?.matchOddsData?.[0]?.teamC_lay;
  //   suspended =
  //     data?.matchOddsData?.[0]?.teamA_suspend !== null
  //       ? data?.matchOddsData?.[0]?.teamC_suspend
  //       : data?.matchOddsData?.[0]?.teamC_suspend;
  // }
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: "40%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          {name != "DRAW" ? (
            <img
              src={name == "INDIA" ? INDIA : PAKISTAN}
              style={{
                width: "22px",
                height: "25px",
                marginLeft: "10px",
                backgroundSize: "contains",
              }}
              alt="draw"
            />
          ) : (
            <Box
              sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
            ></Box>
          )}
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "14px", mobile: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            {name}
          </Typography>
        </Box>
        <MoneyBox color={color} rates={rate} />
      </Box>
      {backValue?.length > 0 && layValue?.length > 0  ? (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { laptop: "60%", mobile: "80%" },
            justifyContent: { mobile: "flex-end", laptop: "center" },
            alignItems: "center",
          }}
        >
          {!matchesMobile && (
            <SeprateBox
              lock={lock}
              rates={allRates}
              value={backValue[2]?.price}
              value2={backValue[0]?.size}
              color={matchesMobile ? "white" : "#CEEBFF"}
              type={{ color: "#A7DCFF", type: "BL" }}
              name={name}
              data={data}
              typeOfBet={typeOfBet}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeprateBox
              lock={lock}
              rates={allRates}
              value={backValue[1]?.price}
              value2={backValue[0]?.size}
              color={matchesMobile ? "white" : "#C2E6FF"}
              type={{ color: "#A7DCFF", type: "BL" }}
              name={name}
              data={data}
              typeOfBet={typeOfBet}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>

          <SeprateBox
            lock={lock}
            rates={allRates}
            value={backValue[0]?.price}
            value2={backValue[0]?.size}
            color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
            type={{ color: "#A7DCFF", type: "BL" }}
            name={name}
            data={data}
            typeOfBet={typeOfBet}
          />

          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>

          <SeprateBox
            lock={lock}
            rates={allRates}
            value={layValue[0]?.price}
            value2={layValue[0]?.size}
            color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
            type={{ color: "#FFB5B5", type: "BL" }}
            name={name}
            data={data}
            typeOfBet={typeOfBet}
          />
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeprateBox
              rates={allRates}
              lock={lock}
              value={layValue[1]?.price}
              value2={layValue[1]?.size}
              color={matchesMobile ? "white" : "#F2CBCB"}
              type={{ color: "#FFB5B5", type: "BL" }}
              name={name}
              data={data}
              typeOfBet={typeOfBet}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeprateBox
              rates={allRates}
              lock={lock}
              value={layValue[2]?.price}
              value2={layValue[1]?.size}
              color={matchesMobile ? "white" : "#ECD6D6"}
              type={{ color: "#FFB5B5", type: "BL" }}
              name={name}
              data={data}
              typeOfBet={typeOfBet}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      ) : (
        <>
          {suspended !== null && !lock ? (
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                width: "60%",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
              <h2>{suspended}</h2>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: { laptop: "60%", mobile: "80%" },
                justifyContent: { mobile: "flex-end", laptop: "center" },
                alignItems: "center",
              }}
            >
              {!matchesMobile && (
                <SeprateBox
                  rates={allRates}
                  value={0}
                  lock={lock}
                  value2={"  "}
                  color={matchesMobile ? "white" : "#CEEBFF"}
                  type={{ color: "#A7DCFF", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeprateBox
                  rates={allRates}
                  value={0}
                  lock={lock}
                  value2={"  "}
                  color={matchesMobile ? "white" : "#C2E6FF"}
                  type={{ color: "#A7DCFF", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              <SeprateBox
                rates={allRates}
                lock={lock}
                value={0}
                value2={"  "}
                color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
                type={{ color: "#A7DCFF", type: "BL" }}
                name={name}
                data={data}
                typeOfBet={typeOfBet}
              />
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              <SeprateBox
                rates={allRates}
                lock={lock}
                value={0}
                value2={"  "}
                color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
                type={{ color: "#FFB5B5", type: "BL" }}
                name={name}
                data={data}
                typeOfBet={typeOfBet}
              />
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeprateBox
                  rates={allRates}
                  value={0}
                  lock={lock}
                  value2={"  "}
                  color={matchesMobile ? "white" : "#F2CBCB"}
                  type={{ color: "#FFB5B5", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeprateBox
                  rates={allRates}
                  value={0}
                  lock={lock}
                  value2={"  "}
                  color={matchesMobile ? "white" : "#ECD6D6"}
                  type={{ color: "#FFB5B5", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BoxComponent;
