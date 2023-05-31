import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MoneyBox from "./MoneyBox";
import SeprateBox from "./SeprateBox";
import { INDIA, PAKISTAN } from "../../assets";
import Divider from "../helper/Divider";
import { formatNumber } from "../helper/helper";
import SeperateBox from "../../pages/expert/SeperateBox";
import { apiBasePath } from "../helper/constants";

const BoxComponent = ({
  name,
  color,
  data,
  team,
  typeOfBet,
  align,
  selectedFastAmount,
  rate,
  allRates,
  lock,
  teamImage,
  newData,
  suspendedData,
  showBox,
  livestatus,
  isRound,
  fromOdds
  
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { ex, status } = data;

  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        position: "relative",
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
          width:{mobile:"60%",laptop:"40%"},
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
          {/* {name != "DRAW" ? (
            <></>
          ) : (
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
            <Box
              sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
            ></Box>
          )} */}

          {teamImage != null && (
            <>
              <img
                src={`${apiBasePath}/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
              <Box
                sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
              ></Box>
            </>
          )}
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "14px", mobile: "10px" },
              fontWeight: "600",
              marginLeft: "10px",
              marginRight: "10px",
        
              width:{mobile:"113px",table:"100%",laptop:"100%"}
            }}
          >
            {name}
          </Typography>
        </Box>
        <MoneyBox color={color} rates={rate} />
      </Box>
      {showBox && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            height: "40px",
            position: "absolute",
            right: 0,
            zIndex: 10,
            width: { laptop: "60%", mobile: "40%" },
            justifyContent: { mobile: "flex-end", laptop: "center" },
            alignItems: "center",
            display: "flex",
          }}
        ></Box>
      )}
      {!["ACTIVE", "", undefined, null].includes(status) || newData?.bettings?.length === 0 || livestatus ? (
        <Box
          sx={{
            background: "rgba(0,0,0,1)",
            height: "40px",
            width: { laptop: "60%", mobile: "40.5%" },
            justifyContent: { mobile: "center", laptop: "center" },
            alignItems: "center",
            display: "flex",
          }}
        >
          {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
          <Typography style={{  fontSize: { mobile: "12px", laptop: "22px" },textTransform: "uppercase" ,width:"100%",textAlign:"center",color:"white" ,fontWeight:"600"}}>{newData?.bettings?.length === 0 || livestatus ? "suspended" : status}</Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: { laptop: "60%", mobile: "40.5%" },
              justifyContent: { mobile: "flex-end", laptop: "center" },
              alignItems: "center",
              position: "relative",
            }}
          >
            {!matchesMobile && (
              <SeprateBox
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
                back={true}
                currentMatch={newData}
                lock={  ex?.availableToBack?.length > 0 ? false : true}
                rates={allRates}
                value={
                  isRound ? Math.round(ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.price
                    : 0) : ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.price
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.size
                    : 0, isRound
                )}
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
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
                back={true}
                currentMatch={newData}
                lock={  ex?.availableToBack?.length > 0 ? false : true}
                rates={allRates}
                value={
                  isRound ? Math.round(ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.price
                    : 0) : ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.price
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.size
                    : 0, isRound
                )}
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
              back={true}
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
              currentMatch={newData}
              lock={  ex?.availableToBack?.length > 0 ? false : true}
              rates={allRates}
              value={
                isRound ? Math.round(ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.price
                  : 0) : ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.price
                  : 0
              }
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.size
                  : 0, isRound
              )}
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
            selectedFastAmount={selectedFastAmount}
              back={true}
              fromOdds={fromOdds}
              currentMatch={newData}
              lock={  ex?.availableToLay?.length > 0 ? false : true}
              rates={allRates}
              value={
                isRound ? Math.round(ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.price
                  : 0) : ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.price
                  : 0
              }
              value2={formatNumber(
                ex?.availableToLay?.length > 0 ? ex?.availableToLay[0]?.size : 0, isRound
              )}
              color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
              type={{ color: "#FFB5B5", type: "BL" }}
              name={name}
              data={data}
              typeOfBet={typeOfBet}
            />
            {/* <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box> */}
            {!matchesMobile && (
              <SeprateBox
              selectedFastAmount={selectedFastAmount}
                back={true}
                fromOdds={fromOdds}
                currentMatch={newData}
                rates={allRates}
                lock={  ex?.availableToLay?.length > 0 ? false : true}
                value={
                  isRound ? Math.round(ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[1]?.price
                    : 0) : ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[1]?.price
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[1]?.size
                    : 0, isRound
                )}
                color={matchesMobile ? "white" : "#F2CBCB"}
                type={{ color: "#FFB5B5", type: "BL" }}
                name={name}
                data={data}
                typeOfBet={typeOfBet}
              />
            )}
            {/* <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box> */}
            {!matchesMobile && (
              <SeprateBox
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
                back={true}
                currentMatch={newData}
                rates={allRates}
                lock={  ex?.availableToLay?.length > 0 ? false : true}
                value={isRound ? Math.round(ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[2]?.price
                  : 0) : ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[2]?.price
                  : 0
                }
                value2={formatNumber(
                  ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[2]?.size
                    : 0, isRound
                )}
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
        </>
      )}
    </Box>
  );
};

export default BoxComponent;
