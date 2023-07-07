import { Box, Typography } from "@mui/material";

const ListHeaderT = () => {
    return (
      <Box
        sx={{
          width: '100%',
          display: "flex",
          height: "30px",
          background: "#262626",
          alignItems: "center",
          borderTop: "2px solid white",
          borderBottom: "2px solid white",
        }}
      >
        <Box
          sx={{
            width: {laptop:"11.5vw",tablet:"20.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, }}>
            User Details
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"10.5vw",tablet:"10.5vw",mobile:"26.5vw"},          
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
            Credit Referance
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
            Balance
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"11.5vw",tablet:"11.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1'}}>
            Client Profit/Loss
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"11.5vw",tablet:"11.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
          % Profit/Loss
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
            Commission
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
            Exposure
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px", lineHeight: "1.1" } }}>
            Available Balance
          </Typography>
        </Box>
        <Box
          sx={{
           width: {laptop:"5vw",tablet:"5vw",mobile:"14vw"},
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
            Bet Lock
          </Typography>
        </Box>
        <Box
          sx={{
           width: {laptop:"5vw",tablet:"5vw",mobile:"14vw"},
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "11.5px", mobile: "9px" }, lineHeight: '1' }}>
            User Lock
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"8vw",tablet:"8vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1' }}>
            Exposure Limit
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"10vw",tablet:"10vw",mobile:"26.5vw"},
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1"
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "9px" }, lineHeight: '1.1'  }}>
            Account Type
          </Typography>
        </Box>
      </Box>
    );
  };

  export default ListHeaderT