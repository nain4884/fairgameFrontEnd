import { Box, Typography, useMediaQuery } from "@mui/material";
import SeasonMarketBox from "./SeasonMarketBox";
import Divider from "../../../components/helper/Divider";
import SmallBoxSeason from "./SmallBoxSeason";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import RunsBox from "../../expert/RunsBox";
import UnlockComponent from "../../../components/UnlockComponent";
import { LOCKED, LOCKOPEN } from "../../../admin/assets";
import { ARROWUP } from "../../../assets";

const SessionMarket = ({
  currentMatch,
  sessionOffline,
  sessionBets,
  currentOdds,
  blockMatch,
  showUnlock,
  locked,
  handleBlock,
  handleHide,
  handleShowLock,
  selft,
  popData,
  title,
  min,
  max,
  sessionExposer
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [matchSessionData, setMatchSessionData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prev) => {
      const updatedArray = prev?.filter((v) => v?.id !== popData);
      return updatedArray;
    });
  }, [popData]);


  const totalSessionBet = currentMatch?.bettings?.reduce((total, betting) => {
    if (betting?.sessionBet && betting?.betStatus===1 && betting?.profitLoss && betting?.profitLoss?.total_bet) {
      return total + betting?.profitLoss?.total_bet;
    }
    return total;
  }, 0);

  useEffect(() => {
    if (currentMatch?.bettings?.length > 0) {
      const sessionData =
        currentMatch?.bettings?.length > 0
          ? currentMatch?.bettings?.filter(
            (element) => {
              if (currentMatch?.apiSessionActive && title === "Session Market") {
                return element?.sessionBet === true && element?.selectionId !== null; // Show elements where selectionId is not null when apiSessionActive is true
              }

              if (currentMatch?.manualSessionActive && title === "Quick Session Market") {
                return element?.sessionBet === true && element?.selectionId === null; // Show elements where selectionId is null when manualSessionActive is true
              }

              return false; // Default case: no active session types
            }
          )
          : 0;

      setMatchSessionData(sessionData.reverse());
    }
  }, [currentMatch]);

  const onSubmit = (value) => {
    handleBlock(value, !locked, "SESSION");
  };

  const [visible, setVisible] = useState(true);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginBottom: "3px",
          width: "100%",
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
                fontSize: {
                  laptop: "13px",
                  tablet: "12px",
                  mobile: matchesMobile ? "12px" : "12px",
                },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {blockMatch && (
              <img
                onClick={() =>
                  selft || selft == undefined
                    ? handleShowLock(true, "SESSION")
                    : ""
                }
                src={locked ? LOCKED : LOCKOPEN}
                style={{ width: "14px", height: "20px" }}
              />
            )}
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
            <Box sx={{ gap: "4px", display: "flex" }}>
              <SmallBoxSeason total={totalSessionBet || 0} />
              {/* static code */}
              <Box
                sx={{
                  width: { laptop: "72px", mobile: "50px" },
                  flexDirection: "column",
                  // position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                  background: "white",
                  borderRadius: "3px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { mobile: "8px", laptop: "8px" },
                    fontWeight: "bold",
                    color: "#FF4D4D",
                  }}
                >
                  Amount
                </Typography>
                <Typography
                  sx={{
                    fontSize: { mobile: "14px", laptop: "14px" },
                    fontWeight: "bold",
                    color: "#0B4F26",
                    lineHeight: 1,
                  }}
                >
                  { !isNaN(sessionExposer) ?  Number(sessionExposer).toFixed(2) : "" }
                </Typography>
              </Box>
            </Box>
            <img
              onClick={() => {
                setVisible(!visible);
              }}
              src={ARROWUP}
              style={{
                transform: visible ? "rotate(180deg)" : "rotate(0deg)",
                width: "15px",
                height: "15px",
                marginRight: "5px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        {visible && (
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
                    MIN: {min} MAX:
                    {max}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    background: "#319E5B",
                    height: "25px",
                    width: { laptop: "60%", mobile: "81%" },
                    justifyContent: { laptop: "flex-end", mobile: "flex-end" },
                  }}
                >
                  <Box
                    sx={{
                      background: "#FF9292",
                      width: { laptop: "5.02vw", mobile: "30.06%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
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
                      width: { laptop: "5.05vw", mobile: "30%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      YES
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
            {locked && (
              <Box
                sx={{
                  position: "absolute",
                  height: "86%",
                  top: "14%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .6)",
                }}
              >
                <Box
                  sx={{
                    width: { mobile: "60%", laptop: "20%", tablet: "60%" },
                  }}
                ></Box>
                <Box
                  sx={{
                    width: { mobile: "40%", laptop: "60%", tablet: "40%" },
                    gap: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={LOCKED} style={{ width: "35px", height: "40px" }} />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      margin: "20px 0px 0px -25px",
                      fontSize: "20px",
                      color: "#FFF",
                    }}
                  >
                    {" "}
                    Locked{" "}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "160px",
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
                        display: element?.betStatus===0
                          ? "none"
                          : "block",
                      }}
                    >
                      <SeasonMarketBox
                        newData={element}
                        setMatchSessionData={setMatchSessionData}
                        index={index}
                        // setData={setData}
                        setData={setData}
                      />
                      <Divider />
                    </Box>
                  );
                })}
            </Box>
            {showUnlock && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  background: "transparent",
                  alignSelf: "center",
                  position: "absolute",
                  marginTop: "38px",
                  left: "20%",
                  zIndex: 999,
                }}
              >
                <UnlockComponent
                  unlock={locked}
                  title={(locked ? "Unlock " : "Lock ") + "Session Market"}
                  handleHide={handleHide}
                  onSubmit={onSubmit}
                />
              </Box>
            )}
          </Box>
        )}
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
            overflow: "auto",
            marginTop: ".25vw",
          }}
        >
          {data?.map((v) => {
            console.log(
              "currentOdds?.bet_id === v?.id ? currentOdds : null",
              v
            );
            return (
              <RunsBox
                currentOdds={currentOdds?.bet_id === v?.id ? currentOdds : null}
                key={v?.id}
                item={v}
                // setData={setData}
                setData={setData}
              // popData={popData}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default SessionMarket;
