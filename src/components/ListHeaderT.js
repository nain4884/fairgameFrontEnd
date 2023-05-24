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
            width: "11.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            User Details
          </Typography>
        </Box>
        <Box
          sx={{
            width: "10.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Credit Referance
          </Typography>
        </Box>
        <Box
          sx={{
            width: "9.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Balance
          </Typography>
        </Box>
        <Box
          sx={{
            width: "11.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Client Profit/Loss
          </Typography>
        </Box>
        <Box
          sx={{
            width: "11.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
          % Profit/Loss
          </Typography>
        </Box>
        <Box
          sx={{
            width: "9.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Exposure
          </Typography>
        </Box>
        <Box
          sx={{
            width: "9.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Available Balance
          </Typography>
        </Box>
        <Box
          sx={{
            width: "5vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Bet Lock
          </Typography>
        </Box>
        <Box
          sx={{
            width: "5vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            User Lock
          </Typography>
        </Box>
        <Box
          sx={{
            width: "8vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Exposure Limit
          </Typography>
        </Box>
        <Box
          sx={{
            width: "8vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Account Type
          </Typography>
        </Box>
      </Box>
    );
  };

  export default ListHeaderT