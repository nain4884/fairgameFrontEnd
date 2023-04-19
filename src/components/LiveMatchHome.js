import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ArrowDown, DownArrow } from "../assets";
import { apiBasePath } from "./helper/constants";
import StyledImage from "./StyledImage";

const LiveMatchHome = ({ currentMatch }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Box
      sx={{
        minWidth: "10%",
        background: "white",
        padding: 0.2,
        marginY: { laptop: "1vh", mobile: ".2vh" },
        width: { mobile: "98%", laptop: "100%" },
      }}
    >
      <Box sx={{ background: "#F1C550" }}>
        <Box
          sx={{
            height: "35px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "5px",
            paddingRight: "0px",
            width: { mobile: "100%", laptop: "100%" },
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
            Live Match
          </Typography>

          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={DownArrow}
            style={{
              transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "16px",
              height: "16px",
              marginRight: "3px",
              marginLeft: "5px",
            }}
            alt={"Banner"}
          />
        </Box>
        {visible && currentMatch?.matchImage && (
          <StyledImage
            src={`${apiBasePath}/${currentMatch?.matchImage}`}
            sx={{
              height: "auto",
              width: { mobile: "100%", laptop: "100%", alignSelf: "center" },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default LiveMatchHome;
