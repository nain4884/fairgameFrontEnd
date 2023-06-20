import { Box, Typography } from "@mui/material";

const CustomBox = ({ title, onClick, bg }) => {
    return (
      <Box onClick={onClick} sx={{ position: "relative" }}>
        <Box
          sx={{
            width: { mobile: "100px", laptop: "140px", tablet: "140px" },
            height: "35px",
            justifyContent: "center",
            border: "2px solid white",
            alignItems: "center",
            background: bg ? bg : "#F8C851",
            borderRadius: "5px",
            display: "flex",
            cursor: "pointer",
            color: bg && "white",
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "10px", laptop: "14px", tablet: "14px" },
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    );
  };

  export default CustomBox;