import { Box, Typography } from "@mui/material";

const CusButton = ({ title, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          cursor: "pointer",
          height: "35px",
          minWidth: "100px",
          marginLeft: "10px",
          borderRadius: "5px",
          background: "#0B4F26",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "13px" }}>{title}</Typography>
      </Box>
    );
  };

  export default CusButton;