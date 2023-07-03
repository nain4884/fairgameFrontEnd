import { Box } from "@mui/material";
import React from "react";
import EventListing from "./EventListing";
import Background from "../pages/expert/Background";

const EmptyComponent = ({ selected, setLoader, admin, loader }) => {
  return <>{!admin ? <Box></Box> : <Background></Background>}</>;
};
export default EmptyComponent;
