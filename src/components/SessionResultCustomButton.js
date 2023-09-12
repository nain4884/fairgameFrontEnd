import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";

const CustomButton = ({ id, title, color, loading, onClick, session }) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      sx={{
        width: session ? "40%" : "100%",
        cursor: "pointer",
        height: session ? "28px" : "30px",
        marginTop: session ? 0 : "-14px",
        borderRadius: "5px",
        background: color,
        "&:hover": { backgroundColor: color },
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textTransform: "none"
      }}
    >
      <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "white" }}>
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
    </Button>
  );
};
export default memo(CustomButton);
