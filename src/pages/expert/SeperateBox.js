import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import { Popover } from "react-tiny-popover";
import { useDispatch } from 'react-redux';
import { setColorValue } from '../../store/selectedColorBox';
import { Lock } from '../../assets';

const SeperateBox = ({ color, empty, value, width, currentMatch, value2, lock, session, back }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const dispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        align={matchesMobile ? "end" : "center"}
        positions={["bottom"]} // preferred positions by priority
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
            background: lock || [0,"0"].includes(value) ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: { mobile: "30%", laptop: width ? width : "50%" },
            height: "94%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!empty && !lock && ![0,"0"].includes(value) && (
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
                  fontSize: { laptop: "9px", mobile: "9px" },
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
          {lock && [0,"0"].includes(value) && <img src={Lock} style={{ width: "10px", height: "15px" }} />}
        </Box>
      </Popover>
    </>
  );
};


export default SeperateBox