import { Box } from "@mui/material";
import React from "react";
import EventListing from "./EventListing";

const EmptyComponent = ({ selected, setLoader, loader }) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <EventListing selected={selected} />
    </Box>
  );
};
export default EmptyComponent;
