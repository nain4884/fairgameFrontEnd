import { memo } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import moment from "moment";
import { StyledImage } from ".";
import { ArrowDown } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import SessionBetSeperate from "./sessionBetSeperate";
import { useState } from "react";

const ChildUserList = ({ item, index, selectedId, sessionBetData }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [showSessionList, setShowSessionList] = useState(false);

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        onClick={() => {
          setShowSessionList((prev) => !prev);
        }}
        sx={{
          width: "100%",
          height: "45px",
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { mobile: "10%", laptop: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {"0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { mobile: "65%", laptop: "80%", tablet: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: { laptop: "center", mobile: "flex-end" },
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "0px", mobile: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          >
            ({moment(item?.betDate).format("DD-MM-YYYY")})
          </Typography>

          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "10px", laptop: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.userName}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            background: "#27AC1E",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "12px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Profit
            </Typography>
            <StyledImage
              src={ARROWUP}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss >= 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#E32A2A",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "12px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Loss
            </Typography>
            <StyledImage
              src={ARROWDOWN}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss < 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      {showSessionList && item?.role === "user" && (
        <Box
          sx={{
            width: { mobile: "100%", laptop: "96%" },
            marginTop: { mobile: ".25vh" },
            marginLeft: { laptop: "4%" },
            display: "flex",
            flexDirection: { laptop: "row", mobile: "column" },
          }}
        >
          <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <Box
              sx={{
                width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                maxHeight: "51vh",
                overflow: "hidden",
                // overflowY: "auto",
                marginY: { mobile: ".2vh", laptop: "1vh" },
                padding: 0.2,
              }}
            >
              <SessionBetSeperate
                betHistory={false}
                allBetsData={sessionBetData}
                profit
                isArrow={true}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(ChildUserList);
