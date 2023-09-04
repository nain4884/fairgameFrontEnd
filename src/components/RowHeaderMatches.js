import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { StyledImage } from ".";
import { ArrowDown, Cricket } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";

const RowHeaderMatches = ({ item, index, getHandleReport, show }) => {
  return (
    <Box
      onClick={() => getHandleReport(item?.eventType)}
      sx={{
        width: "100%",
        height: { laptop: "60px", mobile: "50px" },
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
          background: "#F8C851",
        }}
      >
        <StyledImage
          src={Cricket}
          sx={{ width: { laptop: "35px", mobile: "25px" } }}
        />
      </Box>
      <Box
        sx={{
          width: { mobile: "40%", laptop: "60%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          marginLeft: 0.1,
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
        >
          {item?.eventType}
        </Typography>
        <StyledImage
          src={ArrowDown}
          sx={{
            width: { laptop: "20px", mobile: "10px" },
            transform: show ? "rotate(180deg)" : "rotate(0deg)",
            height: { laptop: "10px", mobile: "6px" },
          }}
        />
      </Box>
      <Box
        sx={{
          background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
          paddingX: "2px",
          width: { mobile: "25%", laptop: "30%" },
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
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "14px", mobile: "12px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            {item?.totalLoss > 0 ? "Profit" : "Loss"}
          </Typography>
          <StyledImage
            src={item?.totalLoss > 0 ? ARROWUP : ARROWDOWN}
            sx={{
              width: { laptop: "25px", mobile: "15px" },
              height: { laptop: "12px", mobile: "8px" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: { laptop: "14px", mobile: "10px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            {Number(item?.totalLoss) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {Number(item?.totalLoss).toFixed(2)}
              </>
            ) : (
              Number(item?.totalLoss).toFixed(2)
            )}{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#0B4F26",
          paddingX: "2px",
          width: { mobile: "25%", laptop: "30%" },
          height: "100%",
          marginLeft: 0.1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: "14px", mobile: "12px" },
            fontWeight: "700",
            color: "white",
          }}
        >
          Total Bet
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: { laptop: "14px", mobile: "10px" },
              fontWeight: "700",
              color: "white",
              textAlign: "center",
            }}
          >
            {item?.totalBet}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(RowHeaderMatches);
