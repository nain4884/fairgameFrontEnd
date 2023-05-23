import { Box, Typography, useMediaQuery } from "@mui/material";
import Divider from "../../../components/helper/Divider";
import BoxComponent from "./BoxComponent";
import SmallBox from "./SmallBox";
import { useState } from "react";
import { useTheme } from "@emotion/react";

const BookMarketer = ({ currentMatch }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [showUnlock, setShowUnlock] = useState(false);
  const [locked, setLocked] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: "10px",
        width: "100%",
        alignSelf: { mobile: "center", tablet: "center", laptop: "flex-start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Bookmaker Market
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div class="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SmallBox color={"#FF4D4D"} />
        </Box>
      </Box>
      <Divider />
      {
        <Box
          sx={{
            display: "flex",
            background: "#319E5B",
            height: "25px",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "'#319E5B'",
              height: "25px",
              width: "40%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "11px", mobile: "9px" },
                marginLeft: "7px",
              }}
            >
              MIN: {currentMatch?.betfair_bookmaker_min_bet} MAX:{currentMatch?.betfair_bookmaker_max_bet}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              width: { laptop: "60%", mobile: "80%" },
              justifyContent: { laptop: "flex-end", mobile: "flex-end" },
            }}
          >
            <Box
              sx={{
                background: "#00C0F9",
                width: { laptop: "5vw", mobile: "25%" },
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
              >
                Back
              </Typography>
            </Box>
            <Box
              sx={{ width: "3px", display: "flex", background: "white" }}
            ></Box>
            <Box
              sx={{
                background: "#FF9292",
                width: { laptop: "5vw", mobile: "25%" },
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
              >
                Lay
              </Typography>
            </Box>
          </Box>
        </Box>
      }
      <Box sx={{ position: "relative", width: "99.8%" }}>
        <BoxComponent
          color={"#46e080"}
          teamImage={currentMatch?.teamA_Image}
          name={currentMatch?.teamA}
        />
        <Divider />
        <BoxComponent
          color={"#FF4D4D"}
          lock={true}
          teamImage={currentMatch?.teamB_Image}
          name={currentMatch?.teamB}
          align="end"
        />
      </Box>
    </Box>
  );
};

export default BookMarketer;
