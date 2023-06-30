import { Box } from "@mui/material";
import React from "react";
import EventListing from "./EventListing";
import Background from "../pages/expert/Background";

const EmptyComponent = ({ selected, setLoader, admin, loader }) => {
  return (
    <>
      {!admin ? (
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
      ) : (
        <Background></Background>
      )}
    </>
  );
};
export default EmptyComponent;
