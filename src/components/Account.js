import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginY: "10px",
        marginTop: "-5px",
        marginX: "1%",
      }}
    >
      <Typography sx={{ color: "white", fontSize: "18px", fontWeight: "600", marginLeft: { laptop: "0.5%", mobile: "0.5%" }, }}>
        Account List
      </Typography>
      <Box
        onClick={() => {
          navigate(`/${window.location.pathname.split("/")[1].trim()}/add_account`);
        }}
        sx={{
          background: "#F8C851",
          borderRadius: "5px",
          height: "35px",
          border: "2px solid white",
          display: "flex",
          width: "150px",
          justifyContent: "center",
          alignItems: "center",
          paddingX: "5px",
          cursor: "pointer",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          Add Account
        </Typography>
      </Box>
    </Box>
  );
};

export default Account;
