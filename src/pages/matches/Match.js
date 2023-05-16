import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import EventListing from '../../components/EventListing';
import MatchesComponent from '../../components/Matches/Matches';
import { HourGlass } from '../../assets';
import { memo, useEffect } from 'react';

const Match = ({selected}) => {
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const doSetId = (k) => {
      setId(k);
    };
    const doNavigateWithState = (e) => {
      navigate("/matchDetail", { state: e });
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
            <EventListing selected={selected}  />
            <div style={{ height: "1vh" }} />
            {(selected === "CRICKET" || selected === "INPLAY") && (
              <MatchesComponent
              selected={selected}
                // onClick={() => {
                //   dispatch(setActive("CRICKET"));
                //   navigate("/home",{state:id});
                // }}
                // matches={matches}
                setMatchId={setId}
                doNavigateWithState={doNavigateWithState}
              />
            )}
            {selected !== "CRICKET" && selected !== "INPLAY" && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Lottie
                  animationData={HourGlass}
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    width: "200px",
                    height: "200px",
                  }}
                />
                <Typography sx={{ color: "text.white" }}>
                  Coming Soon
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ overflowX: "hidden", minHeight: "100vh" }}>
            <EventListing selected={selected}  />
            {(selected === "CRICKET" || selected === "INPLAY") && (
              <MatchesComponent
                doNavigateWithState={doNavigateWithState}
                setMatchId={doSetId}
                selected={selected}
                macthId={id}
              />
            )}
            {selected !== "CRICKET" && selected !== "INPLAY" && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Lottie
                  animationData={HourGlass}
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    width: "200px",
                    height: "200px",
                  }}
                />
                <Typography sx={{ color: "text.white" }}>
                  Coming Soon
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </>
    );
  };
export default memo(Match)