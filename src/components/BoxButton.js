import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react'

const BoxButton = ({
    title,
    containerStyle,
    icon,
    onClick,
    isSelected,
    deleteBtn,
    titleStyle,
    loading,
  }) => {
    const classes = {
      mainBox: [
        {
          background: isSelected ? "#0B4F26" : "#0B4F26",
          border:
            isSelected || deleteBtn ? "2px solid #0B4F26" : "2px solid #303030",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          height: "45px",
          cursor: "pointer",
          alignItems: "center",
          borderRadius: "5px",
          padding: "5px",
          flex: { mobile: " 0 0 43% ", laptop: "1 " },
          flex: { mobile: " 0 0 43% ", laptop: "1 " },
          maxWidth: "46% !important",
          textTransform: "capitalize",
        },
        containerStyle,
      ],
      mainBoxTypography: [
        {
          fontSize: {
            mobile: "3.5vw",
            laptop: "11px",
            tablet: "0.9vw",
            desktop2XL: "12px",
          },
          fontWeight: "600",
          color: isSelected || deleteBtn ? "white" : "white",
          textAlign: "center",
        },
        titleStyle,
      ],
    };
    return (
      <Box onClick={onClick} sx={classes.mainBox}>
        <Typography sx={classes.mainBoxTypography}>
          {loading ? (
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
          {icon}
        </Typography>
      </Box>
    );
  };
  

export default BoxButton