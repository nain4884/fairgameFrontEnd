import Lottie from "lottie-react";
import React from "react";

import { Box, Typography } from "@mui/material";
import { HourGlass } from "../assets";
import { useTheme } from "@emotion/react";

const NavigateLoader = ({ text }) => {
  const theme = useTheme();
  return (
    <Box
      sx={[
        { flex: 1, display: "flex" },
        (theme) => ({
          backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
        }),
      ]}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        height: "100vh",
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

export default NavigateLoader;
