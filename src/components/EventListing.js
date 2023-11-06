import { Box } from "@mui/system";
import { useState } from "react";
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
  Slot,
  SNOOKER,
  Tennis,
} from "../assets";
import "./index.css";
import EventComponent from "./EventComponent";
const EventListing = ({ selected, top }) => {
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
      url: "matches",
    },
    {
      title: "TENNIS",
      image: Tennis,
      url: "matches",
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
    </>
  );
};

export default EventListing;
