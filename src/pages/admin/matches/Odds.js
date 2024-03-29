import { Box, Typography, useMediaQuery } from "@mui/material";
import Divider from "../../../components/helper/Divider";
import BoxComponent from "./BoxComponent";
import ManualBoxComponent from "./ManualBoxComponent";
import SmallBox from "./SmallBox";
import { useTheme } from "@emotion/react";
import UnlockComponent from "../../../components/UnlockComponent";
import { BACKIMAGE, LOCKED, LOCKOPEN } from "../../../admin/assets";
import { ARROWUP } from "../../../assets";
import { useState } from "react";

const Odds = ({
  currentMatch,
  data,
  minBet,
  maxBet,
  typeOfBet,
  showUnlock,
  mShowUnlock,
  locked,
  blockMatch,
  handleBlock,
  handleHide,
  handleShowLock,
  selft,
  session
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const bookRatioB = (teamARates, teamBRates) => {
    const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const [visible, setVisible] = useState(true);

  const bookRatioA = (teamARates, teamBRates) => {
    const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
  };
  const handleLock = (data) => {
    return data?.ex?.availableToBack?.length > 0 ? false : true;
  };

  const onSubmit = (value) => {
    handleBlock(value, !locked, typeOfBet);
  };

  console.log("data", typeOfBet);

  return (
    <Box
      key="odds"
      sx={{
        position: "relative",
        display: "flex",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        width: "100%",
        marginTop: typeOfBet == "Quick Bookmaker" ? "0" : "3px",
        marginBottom: typeOfBet == "Quick Bookmaker" ? "3px" : "0",
        alignSelf: {
          mobile: "center",
          tablet: "center",
          laptop: "flex-start",
          position: "relative",
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
            {typeOfBet === "MANUAL BOOKMAKER" ? "QUICK BOOKMAKER" : typeOfBet}
          </Typography>
          {blockMatch && (
            <img
              onClick={() =>
                selft || selft == undefined
                  ? handleShowLock(true, typeOfBet)
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
            justifyContent: { laptop: "flex-end", mobile: "flex-end" },
            paddingRight: { laptop: "0", mobile: "0" },
          }}
        >
          <SmallBox
            valueA={bookRatioA(
              currentMatch?.teamA_rate,
              currentMatch?.teamB_rate
            )}
            valueB={bookRatioB(
              currentMatch?.teamA_rate,
              currentMatch?.teamB_rate
            )}
          />
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
        <>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              borderTop: "2px solid white",
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
                MIN:{minBet} MAX: {maxBet}
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
                  background: "#00C0F9",
                  border: "1px solid #2626264D",
                  width: { laptop: "5vw", mobile: "30%" },
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
              <Box
                sx={{ width: "3px", display: "flex", background: "white" }}
              ></Box>
              <Box
                sx={{
                  background: "#FF9292",
                  border: "1px solid #2626264D",
                  width: { laptop: "5vw", mobile: "30%" },
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
              <Box
                sx={{ width: ".7px", display: "flex", background: "white" }}
              ></Box>
            </Box>
          </Box>
          <Box sx={{ position: "relative", width: "99.8%", background: "red" }}>
            {session === "manualBookMaker" ? (
              <>
                <ManualBoxComponent
                  teamImage={currentMatch?.teamA_Image}
                  // color={"#46e080"}
                  name={currentMatch?.teamA}
                  rates={
                    currentMatch?.teamA_rate ? currentMatch?.teamA_rate : 0
                  }
                  color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#319E5B"}
                  data={data?.length > 0 ? data[0] : []}
                  lock={false}
                  // manualBookmakerData
                  matchOddsData={{
                    back: data?.teamA_Back,
                    lay: data?.teamA_lay,
                  }}
                  ballStatus={data?.teamA_Ball === "ball" ? true : false}
                  status={data?.teamA_suspend ? true : false}
                  isTeamC={currentMatch?.teamC}
                  // livestatus={
                  //   matchOddsData?.[0]?.teamA_suspend === "suspended"
                  //     ? true
                  //     : false
                  // }
                  // ballStatus={
                  //   matchOddsData?.[0]?.teamC_Ball === "ball" ? true : false
                  // }
                />
                <Divider />
                <ManualBoxComponent
                  teamImage={currentMatch?.teamA_Image}
                  // color={"#46e080"}
                  name={currentMatch?.teamB}
                  rates={
                    currentMatch?.teamB_rate ? currentMatch?.teamB_rate : 0
                  }
                  color={currentMatch?.teamB_rate <= 0 ? "#FF4D4D" : "#319E5B"}
                  data={data?.length > 0 ? data[1] : []}
                  lock={false}
                  matchOddsData={{
                    back: data?.teamB_Back,
                    lay: data?.teamB_lay,
                  }}
                  ballStatus={data?.teamB_Ball === "ball" ? true : false}
                  status={data?.teamB_suspend ? true : false}
                  isTeamC={currentMatch?.teamC}
                />
                {currentMatch?.teamC ? (
                  <>
                    <Divider />
                    <ManualBoxComponent
                      teamImage={
                        currentMatch?.teamC_Image
                          ? currentMatch?.teamC_Image
                          : null
                      }
                      // color={"#46e080"}
                      name={currentMatch?.teamC}
                      rates={
                        currentMatch?.teamC_rate ? currentMatch?.teamC_rate : 0
                      }
                      color={
                        currentMatch?.teamC_rate <= 0 ? "#FF4D4D" : "#319E5B"
                      }
                      data={data?.length > 0 ? data[2] : []}
                      lock={false}
                      matchOddsData={{
                        back: data?.teamC_Back,
                        lay: data?.teamC_lay,
                      }}
                      ballStatus={data?.teamC_Ball === "ball" ? true : false}
                      status={data?.teamC_suspend ? true : false}
                      isTeamC={currentMatch?.teamC}
                    />
                  </>
                ) : null}
                {locked && (
                  <Box
                    sx={{
                      background: "rgba(0,0,0,.5)",
                      width: "100%",
                      height: currentMatch?.teamC ? "150px" : "105px",
                      position: "absolute",
                      top: "-24px",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        alignSelf: "flex-end",
                        height: currentMatch?.teamC ? "150px" : "105px",
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        src={LOCKED}
                        style={{ width: "35px", height: "40px" }}
                      />

                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          marginLeft: "-25px",
                          fontSize: "20px",
                          marginTop: "20px",
                        }}
                      >
                        Locked
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <>
                <BoxComponent
                  teamImage={currentMatch?.teamA_Image}
                  // color={"#46e080"}
                  name={currentMatch?.teamA}
                  rates={
                    currentMatch?.teamA_rate ? currentMatch?.teamA_rate : 0
                  }
                  color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#319E5B"}
                  // data={data}
                  data={data?.length > 0 ? data[0] : []}
                  lock={handleLock(data?.length > 0 ? data[0] : [])}
                  // name1={currentMatch?.teamA}
                  // teamARates={teamRates?.teamA}
                  // teamBRates={teamRates?.teamB}
                />
                <Divider />
                <BoxComponent
                  teamImage={currentMatch?.teamB_Image}
                  // color={"#FF4D4D"}
                  color={currentMatch?.teamB_rate <= 0 ? "#FF4D4D" : "#319E5B"}
                  name={currentMatch?.teamB}
                  rates={
                    currentMatch?.teamB_rate ? currentMatch?.teamB_rate : 0
                  }
                  data={data?.length > 0 ? data[1] : []}
                  lock={handleLock(data?.length > 0 ? data[1] : [])}
                  align="end"
                />
                {currentMatch?.teamC ? (
                  <>
                    <Divider />
                    <BoxComponent
                      teamImage={
                        currentMatch?.teamC_Image
                          ? currentMatch?.teamC_Image
                          : null
                      }
                      // color={"#FF4D4D"}
                      color={
                        currentMatch?.teamC_rate <= 0 ? "#FF4D4D" : "#46e080"
                      }
                      name={currentMatch?.teamC}
                      rates={
                        currentMatch?.teamC_rate ? currentMatch?.teamC_rate : 0
                      }
                      data={data?.length > 0 ? data[2] : []}
                      lock={handleLock(data?.length > 0 ? data[2] : [])}
                      align="end"
                    />
                  </>
                ) : null}
                {locked && (
                  <Box
                    sx={{
                      background: "rgba(0,0,0,.5)",
                      width: "100%",
                      height: currentMatch?.teamC ? "150px" : "105px",
                      position: "absolute",
                      top: "-24px",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        alignSelf: "flex-end",
                        height: currentMatch?.teamC ? "150px" : "105px",
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        src={LOCKED}
                        style={{ width: "35px", height: "40px" }}
                      />

                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          marginLeft: "-25px",
                          fontSize: "20px",
                          marginTop: "20px",
                        }}
                      >
                        Locked
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </>
      )}
      {mShowUnlock && (
        <Box
          sx={{
            position: "absolute",
            width: {mobile: "90%", laptop: "100%"},
            background: "transparent",
            alignSelf: "center",
            position: "absolute",
            marginTop: "38px",
            left: {mobile: "10%", laptop: "20%"},
            zIndex: 999,
          }}
        >
          <UnlockComponent
            unlock={locked}
            title={(locked ? "Unlock " : "Lock ") + "Manual Bookmaker Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
            // onSubmit={(i) => {
            //   if (i) {
            //     setLocked(!locked)
            //   }
            //   setShowUnlock(false)
            // }}
          />
        </Box>
      )}

      {showUnlock && (
        <Box
          sx={{
            position: "absolute",
            width: {mobile: "90%", laptop: "100%"},
            background: "transparent",
            alignSelf: "center",
            position: "absolute",
            marginTop: "38px",
            left: {mobile: "10%", laptop: "20%"},
            zIndex: 999,
          }}
        >
          <UnlockComponent
            unlock={locked}
            title={(locked ? "Unlock " : "Lock ") + typeOfBet + " Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default Odds;
