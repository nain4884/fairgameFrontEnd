import { Box, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";

const CustomButton = ({ id, title, color, loading, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: "100%",
          cursor: "pointer",
          height: "30px",
          marginTop: "-14px",
          borderRadius: "5px",
          background: color,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "500", color: "white" }}
        >
          {loading?.id === id ? (
            <CircularProgress
              sx={{
                color: "#FFF",
              }}
              size={20}
              thickness={4}
              value={60}
            />
          ) : (
            title
          )}
        </Typography>
      </Box>
    );
  };
export default memo(CustomButton)