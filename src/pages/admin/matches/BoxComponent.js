import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery, Box } from "@mui/material";
import { StyledImage } from "../../../components";
import { LockSolid } from "../../../admin/assets";
import SeperateBox from "./SeperateBox";
import MoneyBox from "./MoneyBox";
import { apiBasePath } from "../../../components/helper/constants";
import { formatNumber } from "../../../components/helper/helper";

const BoxComponent = ({ name, color, align, lock, teamImage, rates, data }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { ex, status } = data ?? {};
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
          width: { mobile: "40%", laptop: "40%" },
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
              fontSize: { laptop: "14px", mobile: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "88px"
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
      {!["ACTIVE", "", undefined, null].includes(status) ?
        <Box
          sx={{
            // background: "rgba(0,0,0,1)",
            height: "40px",
            display: "flex",
            width: { laptop: "60%", mobile: "80%" },
            // // width: { mobile: "60%", laptop: "10.2vw" },
            justifyContent: { mobile: "flex-end", laptop: "flex-end" },
            alignItems: "center",
          }}
        >
          <MoneyBox color={color} rates={rates} />
          <Box
            sx={{
              // background: "rgba(0,0,0,1)",
              height: "40px",
              display: "flex",
              width: { mobile: "39vw", laptop: "10.17vw", desktop: '10.17vw', desktop2XL: '10.12vw' },
              justifyContent: { mobile: "flex-end", laptop: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                height: "40px",
                display: "flex",
                // width: { mobile: "100%", laptop: "10.2vw" },
                width: { mobile: "39vw", laptop: "10.17vw", desktop: '10.17vw', desktop2XL: '10.12vw' },
                justifyContent: { mobile: "flex-end", laptop: "flex-end" },
                alignItems: "center",
              }}
            >
              <Typography style={{ fontSize: { mobile: "12px", laptop: "22px" }, textTransform: "uppercase", width: "100%", textAlign: "center", color: "white", fontWeight: "400" }}>
                suspended
              </Typography>
            </Box>
          </Box>
        </Box> :
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { laptop: "60%", mobile: "80%" },
            justifyContent: { mobile: "flex-end", laptop: "flex-end" },
            alignItems: "center",
          }}
        >
          <MoneyBox color={color} rates={rates} />

          {ex?.availableToBack?.length > 0 ?
            <SeperateBox
              align={align}
              value={
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.price
                  : 0
              }
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.size
                  : 0, false
              )}
              color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
            /> :
            <Box
              sx={{
                height: "94%",
                background: "#FDF21A",
                border: "1px solid #2626264D",
                // width: "5vw",
                width: { mobile: "30%", laptop: "5vw" },
                // width: { laptop: "60%", mobile: "80%" },
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <StyledImage
                src={LockSolid}
                sx={{ height: "20px", width: "20px" }}
              />
            </Box>
          }


          <Box sx={{ width: "3px", display: "flex", background: "pink" }}></Box>
          {/* {!lock ? */}
          {ex?.availableToLay?.length > 0 ?
            <SeperateBox
              align={align}
              value={ex?.availableToLay?.length > 0
                ? ex?.availableToLay[0]?.price
                : 0
              }
              value2={formatNumber(
                ex?.availableToLay?.length > 0 ? ex?.availableToLay[0]?.size : 0, false
              )}
              color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
            /> :
            <Box
              sx={{
                height: "94%",
                background: "#FDF21A",
                border: "1px solid #2626264D",
                width: { mobile: "30%", laptop: "5vw" },
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <StyledImage
                src={LockSolid}
                sx={{ height: "20px", width: "20px" }}
              />
            </Box>
          }

        </Box>
      }
    </Box>
  );
};

export default BoxComponent;
