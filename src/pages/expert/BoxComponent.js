import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import SeperateBox from './SeperateBox';
import MoneyBox from './MoneyBox';
import { INDIA, PAKISTAN } from '../../assets';
import { useTheme } from '@emotion/react';
const BoxComponent = ({ name, data, color, align, lock }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
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
            {name != "DRAW" ? (
              <img
                src={name == "INDIA" ? INDIA : PAKISTAN}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
              />
            ) : (
              <Box
                sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
              ></Box>
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
          {name != "DRAW" && <MoneyBox color={color} />}
        </Box>
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
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[0]?.price
                  : 0
              }
              value2={
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[0]?.size
                  : 0
              }
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
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[1]?.price
                  : 0
              }
              value2={
                data?.availableToBack?.length > 0
                  ? data?.availableToBack[1]?.size
                  : 0
              }
              color={matchesMobile ? "white" : "#C2E6FF"}
            />
          )}
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            align={align}
            value={
              data?.availableToBack?.length > 0
                ? data?.availableToBack[2]?.price
                : 0
            }
            lock={lock}
            value2={
              data?.availableToBack?.length > 0
                ? data?.availableToBack[2]?.size
                : 0
            }
            color={matchesMobile ? "white" : "#A7DCFF"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            align={align}
            value={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[0]?.price
                : 0
            }
            lock={lock}
            value2={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[0]?.size
                : 0
            }
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
              data?.availableToLay?.length > 0
                ? data?.availableToLay[1]?.price
                : 0
            }
            value2={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[1]?.size
                : 0
            }
            color={"#F2CBCB"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            align={align}
            value={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[2]?.price
                : 0
            }
            lock={lock}
            value2={
              data?.availableToLay?.length > 0
                ? data?.availableToLay[2]?.size
                : 0
            }
            color={"#ECD6D6"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
    );
  };
export default BoxComponent