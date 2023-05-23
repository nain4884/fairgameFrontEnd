import { Box, Typography } from "@mui/material";

const SmallBoxSeason = ({ color ,total }) => {
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
        sx={{ fontSize: "12px", fontWeight: "bold", color: "#FF4D4D" }}
      >
        Session Bets
      </Typography>
      <Typography
        sx={{ fontSize: "10px", fontWeight: "bold", color: "#0B4F26" }}
      >
        {total}
      </Typography>
    </Box>
  );
};
export default SmallBoxSeason;
