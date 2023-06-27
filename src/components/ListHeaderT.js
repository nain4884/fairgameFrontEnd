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
            width: {laptop:"11.5vw",tablet:"20.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" }, }}>
            User Details
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"10.5vw",tablet:"10.5vw",mobile:"24vw"},
          
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" }, lineHeight: '1.1' }}>
            Credit Referance
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
            Balance
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"11.5vw",tablet:"11.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" }, lineHeight: '1.1'}}>
            Client Profit/Loss
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"11.5vw",tablet:"11.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
          % Profit/Loss
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
            Commission
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
            Exposure
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"9.5vw",tablet:"9.5vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px", lineHeight: "1.1" } }}>
            Available Balance
          </Typography>
        </Box>
        <Box
          sx={{
           width: {laptop:"5vw",tablet:"5vw",mobile:"24vw"},
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
            Bet Lock
          </Typography>
        </Box>
        <Box
          sx={{
           width: {laptop:"5vw",tablet:"5vw",mobile:"24vw"},
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
            User Lock
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"8vw",tablet:"8vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" } }}>
            Exposure Limit
          </Typography>
        </Box>
        <Box
          sx={{
            width: {laptop:"10vw",tablet:"10vw",mobile:"24vw"},
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: { laptop: "12px", mobile: "10px" }  }}>
            Account Type
          </Typography>
        </Box>
      </Box>
    );
  };

  export default ListHeaderT