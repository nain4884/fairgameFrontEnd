import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const SmallBoxSeason = ({ color, total }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      sx={{
        width: { laptop: "85px", mobile: "17vw" },
        flexDirection: "column",
        position: "absolute",
        display: "flex",
        marginRight: "5px",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        background: "white",
        borderRadius: "3px",
      }}
    >
      <Typography
        sx={{ fontSize: matchesMobile ? "8px" : "12px", fontWeight: "bold", color: "#FF4D4D" }}
      >
        Session Bets
      </Typography>
      <Typography
        sx={{ fontSize: matchesMobile ? "8px" : "10px", fontWeight: "bold", color: "#0B4F26" }}
      >
        {total}
      </Typography>
    </Box>
  );
};
export default SmallBoxSeason;
