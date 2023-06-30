import Lottie from "lottie-react";
import React from "react";
import { HourGlass } from "../../assets";
import { Box, Typography } from "@mui/material";
import "./styles.css";
const SmallCustomLoader = ({ text, height, width }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",

        flex: 1,
      }}
    >
      <div className="small-loading-wrap">
        <div className="small-loading">
          <div></div>
          <div></div>
        </div>
      </div>
      <Typography sx={{ marginTop: "-40px" }}>{text}</Typography>

      {/* <Typography sx={{ color: "text.white" }}>{text}</Typography> */}
    </Box>
  );
};

export default SmallCustomLoader;
