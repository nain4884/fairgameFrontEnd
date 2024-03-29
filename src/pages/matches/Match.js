import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchesComponent from "../../components/Matches/Matches";
import { memo } from "react";

const Match = ({ selected, setLoader, loader }) => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const doSetId = (k) => {
    setId(k);
  };
  const doNavigateWithState = (e) => {
    navigate("/matchDetail", { state: { matchId: e, activeTab: "CRICKET" } });
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
            width: "100%",
            justifyContent: "flex-start",
            overflowY: "auto",
            alignItems: "flex-start",
          }}
        >
          <div style={{ height: "1vh" }} />
          <MatchesComponent
            setLoader={setLoader}
            loader={loader}
            selected={selected}
            setMatchId={setId}
            doNavigateWithState={doNavigateWithState}
          />
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
          <MatchesComponent
            setLoader={setLoader}
            loader={loader}
            doNavigateWithState={doNavigateWithState}
            setMatchId={doSetId}
            selected={selected}
            macthId={id}
          />

        </Box>)}
    </>
  );
};
export default memo(Match);

