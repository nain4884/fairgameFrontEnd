import { Box, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";

const MatchOddsResultCustomButton = ({
  title,
  color,
  id,
  loading,
  onClick,
  customStyle
}) => {
  return (
    <Box
      onClick={onClick}
      sx={[
        {
        width: "45%",
        height: "40px",
        borderRadius: "5px",
        background: color,
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        },
        customStyle
      ]}
    >
      <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "white" }}>
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

export default memo(MatchOddsResultCustomButton);
