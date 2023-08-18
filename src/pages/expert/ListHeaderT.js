import { Box, Typography } from "@mui/material";

const ListHeaderT = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: "100px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Sr No.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Title</Typography>
      </Box>
    </Box>
  );
};

export default ListHeaderT;
