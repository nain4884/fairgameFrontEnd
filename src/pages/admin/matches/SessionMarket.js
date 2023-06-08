import { Box, Typography, useMediaQuery } from "@mui/material";
import SeasonMarketBox from "./SeasonMarketBox";
import Divider from "../../../components/helper/Divider";
import SmallBoxSeason from "./SmallBoxSeason";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import RunsBox from "../../expert/RunsBox";

const SessionMarket = ({ currentMatch, sessionOffline }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [showUnlock, setShowUnlock] = useState(false);
  const [locked, setLocked] = useState(false);
  const [matchSessionData, setMatchSessionData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentMatch?.bettings?.length > 0) {
      const sessionData =
        currentMatch?.bettings?.length > 0
          ? currentMatch?.bettings?.filter(
            (element) => element?.sessionBet && element?.id
          )
          : 0;
      setMatchSessionData(sessionData.reverse());
    }
  }, [currentMatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginBottom: "10px",
          width: { laptop: "100%" },
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              Session Odds
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <SmallBoxSeason total={matchSessionData?.length || 0} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "99.7%",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { laptop: "11px", mobile: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  MIN: {currentMatch?.betfair_session_min_bet} MAX:
                  {currentMatch?.betfair_session_max_bet}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { laptop: "60%", mobile: "80%" },
                  justifyContent: { laptop: "flex-end", mobile: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { laptop: "5vw", mobile: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    NO
                  </Typography>
                </Box>
                <Box
                  sx={{ width: "3px", display: "flex", background: "white" }}
                ></Box>
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { laptop: "5vw", mobile: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    YES
                  </Typography>
                </Box>
              </Box>
            </Box>
          }

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "200px",
              width: "100%",
              position: "relative",
            }}
          >
            {matchSessionData?.length > 0 &&
              // matchSessionData?.reverse()?.map((element, index) => {
              matchSessionData?.map((element, index) => {
                return (
                  <Box
                    key={element?.id}
                    sx={{
                      width: "100%",
                      display: sessionOffline?.includes(element.id)
                        ? "none"
                        : "block",
                    }}
                  >
                    <SeasonMarketBox
                      newData={element}
                      setMatchSessionData={setMatchSessionData}
                      index={index}
                      setData={setData}
                    />
                    <Divider />
                  </Box>
                );
              })}
            {/* {matchSessionData?.length > 0 &&
              matchSessionData?.map((match, index) => (
                <Box key={index}
                  sx={{
                    // display: sessionOffline?.includes(element.id)
                    //   ? "none"
                    //   : "block",
                  }}
                >
                  <SeasonMarketBox
                    newData={match}
                    setMatchSessionData={setMatchSessionData}
                    index={index}
                    setData={setData}
                  />

                  <Divider />
                </Box>
              ))} */}
          </Box>
        </Box>
        {/* {showUnlock && <Box sx={{ position: 'absolute', width: '100%', background: 'transparent', alignSelf: 'center', position: 'absolute', marginTop: '38px', left: '20%' }}>
                <UnlockComponent
                    unlock={locked}
                    title={(locked ? "Unlock " : "Lock ") + "Session Market"} onSubmit={(i) => {
                        if (i) {
                            setLocked(!locked)
                        }
                        setShowUnlock(false)
                    }} />
            </Box>} */}
      </Box>
      {data?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1px",
            // height: "524px",
            height: "360",
            overflow: "scroll",
            marginTop: ".25vw",
          }}
        >
          {data?.map((v) => {
            return <RunsBox key={v?.id} item={v} setData={setData} />;
          })}
        </Box>
      )}
    </>
  );
};

export default SessionMarket;
