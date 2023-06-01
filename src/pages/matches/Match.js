import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import EventListing from "../../components/EventListing";
import MatchesComponent from "../../components/Matches/Matches";
import { HourGlass } from "../../assets";
import { memo, useEffect } from "react";
import CustomLoader from "../../components/helper/CustomLoader";

const Match = ({ selected, setLoader, loader }) => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const doSetId = (k) => {
    setId(k);
  };
  const doNavigateWithState = (e) => {
    navigate("/matchDetail", { state: e });
    sessionStorage.setItem("matchId", e);
  };

  return (
    <>
      {!matchesMobile ? (
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
          <div style={{ height: "1vh" }} />
          {selected === "CRICKET" || selected === "INPLAY" ? (
            <MatchesComponent
              setLoader={setLoader}
              loader={loader}
              selected={selected}
              // onClick={() => {
              //   dispatch(setActive("CRICKET"));
              //   navigate("/home",{state:id});
              // }}
              // matches={matches}
              setMatchId={setId}
              doNavigateWithState={doNavigateWithState}
            />
          ) : (
            <CustomLoader text={"Coming Soon"} />
          )}
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh" }}>
          <EventListing selected={selected} />
          {selected === "CRICKET" || selected === "INPLAY" ? (
            <MatchesComponent
              setLoader={setLoader}
              loader={loader}
              doNavigateWithState={doNavigateWithState}
              setMatchId={doSetId}
              selected={selected}
              macthId={id}
            />
          ) : (
            <CustomLoader text={"Coming Soon"} />
          )}
        </Box>
      )}
    </>
  );
};
export default memo(Match);
