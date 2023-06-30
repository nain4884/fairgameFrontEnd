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
  MYACCOUNT,
  Play,
  SETTINGS,
  Slot,
  SNOOKER,
  Tennis,
} from "../assets";
import { setActive } from "../store/betPlace";
import "./index.css";
import { useNavigate } from "react-router-dom";
import EventComponent from "./EventComponent";
import DropdownMenu1 from "./CommonMasterAdminLayout/MenuBar";
const EventListing = ({ selected ,top}) => {
  const [anchor, setAnchor] = useState(null);
  const data = [
    {
      title: "INPLAY",
      image: Play,
      url: "inplay",
    },
    {
      title: "MY ACCOUNT",
      image: MYACCOUNT,
      url: "my-account",
    },
    {
      title: "CRICKET",
      image: Cricket,
      url: "matches",
    },
    {
      title: "LIVE CASINO",
      image: Slot,
      url: "comingsoon",
    },
    {
      title: "LIVE CARD",
      image: Card,
      url: "comingsoon",
    },
    {
      title: "SOCCER",
      image: Football,
      url: "comingsoon",
    },
    {
      title: "TENNIS",
      image: Tennis,
      url: "comingsoon",
    },
    {
      title: "ICE HOCKEY",
      image: Hockey,
      url: "comingsoon",
    },
    {
      title: "SNOOKER",
      image: SNOOKER,
      url: "comingsoon",
    },
    {
      title: "GOLF",
      image: GOLF,
      url: "comingsoon",
    },
    {
      title: "CHESS",
      image: CHESS,
      url: "comingsoon",
    },
    {
      title: "BASKETBALL",
      image: BASKETBALL,
      url: "comingsoon",
    },
  ];

  return (
    <>
      <Box
        sx={[
          {
            width: { mobile: "98%", laptop: "98%" },
            msOverflowStyle: "none",
            overflowY: "hidden",
            minHeight: { mobile: 80, laptop: 80 },
            // marginLeft: { mobile: "0", laptop: ".5vw" },
            overflowX: "auto",
            marginTop: "1vh",
            marginX: "1vh",
            alignSelf: { mobile: "center", laptop: "flex-start" },
            display: "flex",
          },
        ]}
      >
        {data?.map((i, idx) => {
          return (
            <EventComponent
              key={idx}
              data={i}
              selected={selected}
              setAnchor={setAnchor}
            />
          );
        })}
      </Box>
      {/* <DropdownMenu1
        open={Boolean(anchor)}
        anchorEl={anchor}
        title={"My Account"}
        activeTab={"MY ACCOUNT"}
        menutItems1={menutItems1}
        top={top}
        // setShow={setShow}
        handleClose={() => {
          setAnchor(null);
        }}
      /> */}
    </>
  );
};

export default EventListing;
