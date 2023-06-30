import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const SmallBoxSeason = ({ color, total }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      sx={{
        width: { laptop: "72px", mobile: "50px" },
        flexDirection: "column",
        // position: "absolute",
        display: "flex",
        // marginRight: "5px",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        background: "white",
        borderRadius: "3px",
      }}
    >
      <Typography
        sx={{ fontSize: matchesMobile ? "8px" : "8px", fontWeight: "bold", color: "#FF4D4D" }}
      >
        S Bets
      </Typography>
      <Typography
        sx={{ fontSize: matchesMobile ? "14px" : "14px", fontWeight: "bold", color: "#0B4F26", lineHeight: 1 }}
      >
        {total}
      </Typography>
    </Box>
  );
};
export default SmallBoxSeason;
