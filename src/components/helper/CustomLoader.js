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
        height: "74%",
        // height: { mobile: "74%", tablet: "74%" },
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          animationData={HourGlass}
          style={{
            display: "flex",
            alignSelf: "center",
            width: 100,
            height: 100,
          }}
        />
      </Box>
      <Typography sx={{ color: "text.white" }}>{text}</Typography>
    </Box>
  );
};

export default CustomLoader;
