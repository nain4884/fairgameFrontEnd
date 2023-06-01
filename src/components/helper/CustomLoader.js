import Lottie from "lottie-react";
import React from "react";
import { HourGlass } from "../../assets";
import { Box, Typography } from "@mui/material";

const CustomLoader = ({ text }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie
        animationData={HourGlass}
        style={{
          display: "flex",
          alignSelf: "center",
          width: "200px",
          height: "200px",
        }}
      />
      <Typography sx={{ color: "text.white" }}>{text}</Typography>
    </Box>
  );
};

export default CustomLoader;
