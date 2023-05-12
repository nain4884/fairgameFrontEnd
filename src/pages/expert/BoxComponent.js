import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import SeperateBox from "./SeperateBox";
import MoneyBox from "./MoneyBox";
import { INDIA, PAKISTAN } from "../../assets";
import { useTheme } from "@emotion/react";
import { formatNumber } from "../../components/helper/helper";
import { apiBasePath } from "../../components/helper/constants";
const BoxComponent = ({
  name,
  data,
  teamImage,
  currentMatch,
  color,
  align,
  lock,
  teamRates,
  livestatus,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { ex, status } = data;
  console.log('livestaus', livestatus)
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
          width: "35%",
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
              src={`${apiBasePath}/${teamImage}`}
              style={{
                width: "22px",
                height: "25px",
                marginLeft: "10px",
                backgroundSize: "contains",
              }}
            />
            <Box
              sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
            ></Box>
          )} */}
          {teamImage !== null && (
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
            </>
          )}
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "12px", mobile: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            {name}
          </Typography>
        </Box>
        {name != "DRAW" && <MoneyBox value={teamRates} />}
      </Box>

      {!["ACTIVE", "", undefined, null].includes(status) || livestatus ? (
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
          <h4 style={{ textTransform: "uppercase" }}>
            {livestatus ? "SUSPENDED" : status}
          </h4>
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
                currentMatch={currentMatch}
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
                currentMatch={currentMatch}
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
              currentMatch={currentMatch}
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
              currentMatch={currentMatch}
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
              currentMatch={currentMatch}
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
              currentMatch={currentMatch}
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
