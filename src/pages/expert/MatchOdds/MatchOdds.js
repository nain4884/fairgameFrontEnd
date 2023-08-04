import React, { useEffect, useState } from "react";
import Divider from "../../../components/helper/Divider";
import BoxComponent from "../BoxComponent";
import { Box, Typography } from "@mui/material";
import SmallBox from "../SmallBox";
import Result from "../Result";
import Stop from "../Stop";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import ResultComponent from "../../../components/ResultComponent";
import { setRole } from "../../../newStore";
import { memo } from "react";
import { useSelector } from "react-redux";
import { ARROWUP } from "../../../assets";



const SmallBox2 = ({ valueA, valueB }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "33%",
        gap: "3px",
        margin: "0px",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: { laptop: "70px", mobile: "10vw" },
          // position: "absolute",
          flexDirection: "column",
          paddingX: "5px",
          display: "flex",
          left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "9px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {valueA < 0 ? ` ${valueA}` : `${valueA}`}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "70px", mobile: "10vw" },
          // position: "absolute",
          paddingX: "5px",
          display: "flex",
          flexDirection: "column",
          left: { mobile: "65%", laptop: "55vw", tablet: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "9px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {valueB < 0 ? ` ${valueB}` : `${valueB}`}
        </Typography>
      </Box>
    </Box>
  );
};
const MatchOdds = ({
  currentMatch,
  matchOdds,
  setCurrentMatch,
  matchOddsLive,
  socket,
}) => {
  const { axios } = setRole();
  const theme = useTheme();

  const [newMatchOdds, setNewMatchOdds] = useState(matchOdds);
  const [stlive, setLive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleImg, setVisibleImg] = useState(true);
  const { manualBookMarkerRates } = useSelector((state) => state?.matchDetails);
  const teamRates =
    manualBookMarkerRates?.length > 0
      ? manualBookMarkerRates?.find((v) => v?.matchId === currentMatch?.id)
      : { teamA: 0, teamB: 0, teamC: 0 };

  const valueA = teamRates?.teamA;
  const valueB = teamRates?.teamB;
  const bookRatioB = (() => {
    if (valueA === 0) {
      return 0;
    } else {
      const bookRatio = valueB != 0 ? valueA / valueB || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return valueB < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const bookRatioA = (() => {
    if (valueA === 0) {
      return 0;
    } else {
      const bookRatio = valueA != 0 ? valueB / valueA || 0 : 0;
      // alert(teamARates)
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      // alert(typeof teamARates < 0 ? `-${formattedRatio}` : formattedRatio)

      return valueA < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();
  useEffect(() => {
    if (matchOdds) {
      setNewMatchOdds(matchOdds);
    }
  }, [matchOdds]);
  const activateMatchOdds = async (val, id) => {
    try {
      setLive(true);

      const { data } = await axios.post("/betting/addBetting", {
        match_id: currentMatch?.id,
        betStatus: val,
        matchType: currentMatch?.gameType,
      });
      socket.emit("matchOddRateLive", {
        matchId: currentMatch?.id,
        matchOddLive: true,
      });
    } catch (err) {
      toast.error(err?.message);
      console.log(err?.response?.data?.message, "err");
    }
  };


  return (
    <>
      <Box
        key="odds"
        sx={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          width: "100%",
          marginTop: ".5vh",
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
            boxShadow: "0px 5px 10px #0000001A",
            position: "relative",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
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
              Match Odds
            </Typography>
            <Stop
              onClick={() => {
                if (newMatchOdds?.id) {
                  setLive(false);
                  socket.emit("matchOddRateLive", {
                    matchId: currentMatch?.id,
                    matchOddLive: false,
                  });
                }
              }}
            />

            <SmallBox2 valueA={bookRatioA} valueB={bookRatioB} />
          </Box>

          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div className="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Result
              width={"80px"}
              onClick={() => {
                setVisible(true);
              }}
              invert={true}
            />
            {!currentMatch?.matchOddRateLive  && (
              <SmallBox
                onClick={() => {
                  if (newMatchOdds?.id) {
                    socket.emit("matchOddRateLive", {
                      matchId: currentMatch?.id,
                      matchOddLive: true,
                    });
                    setLive(true);
                  } else {
                    activateMatchOdds(1, "");
                  }
                }}
                title={"Go Live"}
                color={"#FF4D4D"}
                customStyle={{
                  justifyContent: "center"
                }}
              />
            )}
            {currentMatch?.matchOddRateLive  && (
              <SmallBox
                onClick={() => {
                  socket.emit("matchOddRateLive", {
                    matchId: currentMatch?.id,
                    matchOddLive: false,
                  });
                  setLive(false);
                }}
                title={"Live"}
                customStyle={{
                  justifyContent: "center"
                }}

              />
            )}
            <img
              onClick={() => {
                setVisibleImg(!visibleImg);
              }}
              src={ARROWUP}
              style={{
                transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
                width: "15px",
                height: "15px",
                marginRight: "5px",
                marginLeft: "5px",
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            zIndex: 999,
            top: "26%",
            right: "100px",
          }}
        >
          {visible && (
            <ResultComponent
              betId={
                currentMatch?.bettings?.length > 0 &&
                currentMatch?.bettings?.filter((v) => v?.sessionBet === false)
              }
              teamA={currentMatch?.teamA}
              teamB={currentMatch?.teamB}
              tie={"Tie"}
              draw={currentMatch?.teamC ? currentMatch?.teamC : "Draw"}
              onClick={() => {
                setVisible(false);
              }}
            />
          )}
        </Box>

        {visibleImg && (
          <>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "35%",
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
                  MIN: {currentMatch?.betfair_match_min_bet} MAX:
                  {currentMatch?.betfair_match_max_bet}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { laptop: "65%", mobile: "80%" },
                  justifyContent: { laptop: "center", mobile: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { laptop: "16.5%", mobile: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>

                <Box
                  sx={{
                    background: "#FF9292",
                    width: { laptop: "16.5%", mobile: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Lay
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              <BoxComponent
                data={
                  matchOddsLive?.runners?.length > 0
                    ? matchOddsLive?.runners[0]
                    : []
                }
                teamImage={currentMatch?.teamA_Image}
                lock={ matchOddsLive?.runners !== undefined && matchOddsLive?.runners?.length > 0 ? false : true}
                name={currentMatch?.teamA}
                currentMatch={currentMatch}
                teamRates={teamRates?.teamA}
              />
              <Divider />
              <BoxComponent
                teamRates={teamRates?.teamB}
                lock={matchOddsLive?.runners !== undefined && matchOddsLive?.runners?.length > 0 ? false : true}
                teamImage={currentMatch?.teamB_Image}
                data={
                  matchOddsLive?.runners?.length > 0
                    ? matchOddsLive?.runners[1]
                    : []
                }
                name={currentMatch?.teamB}
                currentMatch={currentMatch}
              />
              {currentMatch?.teamC && (
                <>
                  <Divider />
                  <BoxComponent
                    teamRates={teamRates?.teamC}
                    lock={matchOddsLive?.runners !== undefined && matchOddsLive?.runners?.length > 0 ? false : true}
                    color={"#FF4D4D"}
                    teamImage={null}
                    data={
                      matchOddsLive?.runners?.length > 0
                        ? matchOddsLive?.runners[2]
                        : []
                    }
                    name={currentMatch?.teamC}
                    currentMatch={currentMatch}
                  />
                </>
              )}
              {!currentMatch?.matchOddRateLive && (
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    height: "100%",
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                  }}
                ></Box>
              )}
            </Box>

          </>
        )}
      </Box>
    </>
  );
};

export default memo(MatchOdds);
