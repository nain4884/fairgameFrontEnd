import { Box, Typography, useTheme } from "@mui/material";

import "./index.css";

import { memo } from "react";
import AddSession from "./AddSession";

const IndiaPakLiveBookMaker = ({ add, match }) => {
  return (
    <Box
      sx={{
        flex: 1,
        background: "#0B4F26",
        borderRadius: "5px",
        position: "relative",
        minHeight: "300px",
        py: "20px",
        px: "10px",
        pt: "5px",
      }}
    >
      {!add && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            position: "absolute",
            left: "0px",
            top: 0,
            zIndex: 1,
          }}
        ></Box>
      )}
      <Typography
        sx={{
          color: "white",
          fontSize: "20px",
          fontWeight: "600",
          zIndex: 2,
          position: "relative",
        }}
      >
        {match?.title}
      </Typography>
      <Box sx={{ display: "flex", marginTop: "2px", flexDirection: "column" }}>
        <Box
          sx={{
            flex: 1,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AddSession add={add} match={match} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(IndiaPakLiveBookMaker);
