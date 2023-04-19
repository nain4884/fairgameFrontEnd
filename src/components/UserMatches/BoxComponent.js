import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MoneyBox from "./MoneyBox";
import SeprateBox from "./SeprateBox";
import { INDIA, PAKISTAN } from "../../assets";
import Divider from "../helper/Divider";
import { formatNumber } from "../helper/helper";
import SeperateBox from "../../pages/expert/SeperateBox";

const BoxComponent = ({
  name,
  color,
  data,
  team,
  typeOfBet,
  align,
  rate,
  allRates,
  lock,
  newData,
  suspendedData,
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
            <></>
          ) : (
            // <img
            //   src={name == "INDIA" ? INDIA : PAKISTAN}
            //   style={{
            //     width: "22px",
            //     height: "25px",
            //     marginLeft: "10px",
            //     backgroundSize: "contains",
            //   }}
            //   alt="draw"
            // />
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
      {!["ACTIVE", "", undefined].includes(status) ? (
        <Box
          sx={{
            background: "rgba(0,0,0,1)",
            height: "40px",
            width: { laptop: "65%", mobile: "80%" },
            justifyContent: { mobile: "flex-end", laptop: "center" },
            alignItems: "center",
            display: "flex",
          }}
        >
          {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
          <h2>{status}</h2>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: { laptop: "65%", mobile: "80%" },
              justifyContent: { mobile: "flex-end", laptop: "center" },
              alignItems: "center",
            }}
          >
            {!matchesMobile && (
              <SeperateBox
                align={align}
                lock={lock}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.price
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#CEEBFF"}
              />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <SeperateBox
                align={align}
                lock={lock}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.price
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.size
                    : 0
                )}
                color={matchesMobile ? "white" : "#C2E6FF"}
              />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              align={align}
              value={
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.price
                  : 0
              }
              lock={lock}
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.size
                  : 0
              )}
              color={matchesMobile ? "white" : "#A7DCFF"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              align={align}
              value={
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.price
                  : 0
              }
              lock={lock}
              value2={formatNumber(
                ex?.availableToLay?.length > 0 ? ex?.availableToLay[0]?.size : 0
              )}
              color={matchesMobile ? "white" : "#FFB5B5"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              back={true}
              align={align}
              lock={lock}
              value={
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[1]?.price
                  : 0
              }
              value2={formatNumber(
                ex?.availableToLay?.length > 0 ? ex?.availableToLay[1]?.size : 0
              )}
              color={"#F2CBCB"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              align={align}
              value={
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[2]?.price
                  : 0
              }
              lock={lock}
              value2={formatNumber(
                ex?.availableToLay?.length > 0 ? ex?.availableToLay[2]?.size : 0
              )}
              color={"#ECD6D6"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BoxComponent;
