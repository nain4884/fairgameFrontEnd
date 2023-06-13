import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  BASKETBALL,
  Card,
  CHESS,
  Cricket,
  Football,
  GOLF,
  Hockey,
  Play,
  Slot,
  SNOOKER,
  Tennis,
} from "../assets";
import { setActive } from "../store/betPlace";
import "./index.css";
import { useNavigate } from "react-router-dom";
import EventComponent from "./EventComponent";
const EventListing = ({ selected }) => {
  const data = [
    {
      title: "INPLAY",
      image: Play,
    },
    {
      title: "LIVE CASINO",
      image: Slot,
    },
    {
      title: "LIVE CARD",
      image: Card,
    },
    {
      title: "CRICKET",
      image: Cricket,
    },
    {
      title: "SOCCER",
      image: Football,
    },
    {
      title: "TENNIS",
      image: Tennis,
    },
    {
      title: "ICE HOCKEY",
      image: Hockey,
    },
    {
      title: "SNOOKER",
      image: SNOOKER,
    },
    {
      title: "GOLF",
      image: GOLF,
    },
    {
      title: "CHESS",
      image: CHESS,
    },
    {
      title: "BASKETBALL",
      image: BASKETBALL,
    },
  ];

  return (
    <Box
      sx={[
        {
          width: { mobile: "98%", laptop: "100%" },
          msOverflowStyle: "none",
          overflowY: "hidden",
          minHeight: { mobile: 80, laptop: 80 },
          marginLeft: { mobile: "0", laptop: ".5vw" },
          overflowX: "auto",
          marginTop: "1vh",
          alignSelf: { mobile: "center", laptop: "flex-start" },
          display: "flex",
        },
      ]}
    >
      {data?.map((i,idx) => {
        return <EventComponent key={idx} data={i} selected={selected} />;
      })}
    </Box>
  );
};

export default EventListing;
