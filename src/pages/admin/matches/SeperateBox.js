import { Box, Typography, useMediaQuery } from "@mui/material";
import { setColorValue } from "../../../store/selectedColorBox";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { Popover } from "react-tiny-popover";
import { Lock } from "../../../assets";

const SeperateBox = ({ color, empty, value, value2, lock, session, back }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const dispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        align={matchesMobile ? "end" : "center"}
        positions={["bottom"]}
        onClickOutside={() => setIsPopoverOpen(false)}
      >
        <Box
          onClick={(e) => {
            if (lock || color == "white") {
              return null;
            }
            setIsPopoverOpen(!isPopoverOpen);
            dispatch(setColorValue(color));
          }}
          sx={{
            background: lock ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: { mobile: "30%", laptop: "5vw" },
            height: "94%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!empty && !lock && (
            <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: color == "white" ? "white" : "black",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {value}
              </Typography>
              <Typography
                sx={{
                  fontSize: {laptop: "10px", mobile: "9px"},
                  marginTop: -0.4,
                  color: color == "white" ? "white" : "black",
                  textAlign: "center",
                  fontWeight: "600"
                }}
              >
                {value2}
              </Typography>
            </Box>
          )}
          {lock && <img src={Lock} style={{ width: "10px", height: "15px" }} />}
        </Box>
      </Popover>
    </>
  );
};

export default SeperateBox;
