import { Box, Typography } from "@mui/material";

const Account = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginY: "0.5%",
      }}
    >
      <Typography sx={{ color: "white", fontSize: "16px", fontWeight: "600", marginLeft: { laptop: "0.5%", mobile: "0.5%" }, }}>
        Account List
      </Typography>
    </Box>
  );
};

export default Account;
