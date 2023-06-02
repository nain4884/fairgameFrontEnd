import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import BoxComponent from "./BoxComponent";
import ManualBoxComponent from "./ManualBoxComponent";
import Divider from "../helper/Divider";
import { BallStart, FASTTIME, HourGlass, Info, TIME } from "../../assets";
import { memo } from "react";
import FastTimePlaceBet from "../FastImePlaceBet";
import LiveMarket from "../CommonMasterAdminLayout/LiveMarket";
import FastTime from "../FastTime";
import { currencyFormatter, formatNumber } from "../helper/helper";
import PlaceBet from "../PlaceBet";
import { toast } from "react-toastify";
import OddsPlaceBet from "../OddsPlaceBet";
import { setRole } from "../../newStore";
import { useDispatch } from "react-redux";
import { setDailogData } from "../../store/dailogModal";
import Lottie from "lottie-react";

const SmallBox = ({ valueA, valueB }) => {
  return (
    <Box
      sx={{
        marginLeft: { mobile: 0, laptop: "-26%", tablet: 0 },
        justifyContent: {
          mobile: "center",
          laptop: "center",
          tablet: "center",
        },
        display: "flex",
        width: { mobile: "85%", laptop: "80%", tablet: "85%" },
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { laptop: "70px", mobile: "50px", tablet: "70px" },
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
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: "bold",
            color: valueA < 0 ? `#FF9292` : `#46e080`,
          }}
        >
          {valueA < 0 ? ` ${valueA}` : `${valueA}`}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "70px", mobile: "50px", tablet: "70px" },
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
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>

        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: "bold",
            color: valueB < 0 ? `#FF9292` : `#46e080`,
          }}
        >
          {valueB < 0 ? ` ${valueB}` : `${valueB}`}
        </Typography>
      </Box>
    </Box>
  );
};

const Time = (data) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: { mobile: "10px", laptop: "12px" },
          fontWeight: "bold",
          color: "#black",
          width: { mobile: "40px", laptop: "80px" },
        }}
      >
        {data.time} sec Delay
      </Typography>
      <img style={{ width: "20px", height: "20px" }} src={TIME} />
    </Box>
  );
};

const Odds = ({
  data,
  teamARates,
  teamBRates,
  teamCRates,
  title,
  min,
  max,
  lock,
  showBox,
  showDely,
  suspended,
  newData,
  isRound,
  typeOfBet,
  session,
  matchOddsData,
  setFastAmount,
  fastAmount,
  showFast,
}) => {
  // alert(teamCRates)
  // console.log("matchOddsData 11:", matchOddsData);
  const theme = useTheme();
  const [showFastTimeBox, setShowFastTimeBox] = useState(false);
  const [placeBetData, setPlaceBetData] = useState(null);
  const [fastRate, setFastRate] = useState(null);
  const [fastBetLoading, setFastBetLoading] = useState(false);

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const bookRatioB = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const bookRatioA = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
      // alert(teamARates)
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      // alert(typeof teamARates < 0 ? `-${formattedRatio}` : formattedRatio)

      return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();
  console.log("fastRate", fastRate);

  return (
    <>
      <Box
        key="odds"
        sx={{
          position: "relative",
          display: "flex",
          backgroundColor: "white",
          padding: 0.2,
          flexDirection: "column",
          marginY: { mobile: ".2vh", laptop: ".5vh" },
          width: { mobile: "98%", laptop: "97%" },
          marginX: "1vw",
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
                width: "100%",
                fontSize: { laptop: "13px", tablet: "12px", mobile: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {showDely && typeOfBet === "MATCH ODDS" && (
              <Time time={newData.delaySecond ? newData?.delaySecond : 0} />
            )}
            {showFast && (
              <FastTime
                session={session}
                setPlaceBetData={setPlaceBetData}
                setFastAmount={setFastAmount}
                setShowFastTimeBox={setShowFastTimeBox}
                data={fastAmount ? currencyFormatter(fastAmount) : ""}
              />
            )}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div class="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: {
                mobile: "flex-end",
                laptop: "center",
                tablet: "flex-end",
              },
            }}
          >
            <SmallBox valueA={bookRatioA} valueB={bookRatioB} />
            {/* <Typography
            sx={{
              color: "white",
              width: {mobile:"40px",tablet:"100px",laptop:"100px"},

              fontSize: { laptop: "9px", mobile: "7px" },
              fontWeight: "500",
              flexWrap: "wrap",
            }}
          >
            Maximum Bet {max}
          </Typography>
          <img
            src={Info}
            style={{
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          /> */}
          </Box>
        </Box>
        {showFastTimeBox && (
          <Box>
            <FastTimePlaceBet
              session={session}
              setFastAmount={setFastAmount}
              selectedFastAmount={fastAmount}
              setShowFastTimeBox={setShowFastTimeBox}
            />
          </Box>
        )}
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
              MIN: {min} MAX:{max}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              gap: { mobile: "0px", laptop: "1px", tablet: "1px" },
              width: { laptop: "60%", mobile: "80%" },
              justifyContent: { laptop: "center", mobile: "flex-end" },
            }}
          >
            <Box
              sx={{
                background: "#00C0F9",
                width: { laptop: "16.5%", mobile: "30%" },
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
                width: { laptop: "16.5%", mobile: "30%" },
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
        {fastBetLoading && (
          <Box
            sx={{
              position: "absolute",
              height: "65%",
              top: "35%",
              width: "100%",
              display: "flex",
              zIndex: "999",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, .5)",
            }}
          >
            <Lottie
              animationData={HourGlass}
              style={{
                display: "flex",
                alignSelf: "center",
                width: "50px",
                height: "50px",
              }}
            />
          </Box>
        )}

        {typeOfBet == "MANUAL BOOKMAKER" ? (
          <>
            <ManualBoxComponent
              setFastBetLoading={setFastBetLoading}
              placeBetData={placeBetData}
              setFastRate={(val) => setFastRate(val)}
              fastRate={fastRate}
              setPlaceBetData={setPlaceBetData}
              setFastAmount={setFastAmount}
              time={true}
              sessionMain={session}
              fromOdds={true}
              showBox={showBox}
              selectedFastAmount={fastAmount}
              livestatus={
                matchOddsData?.[0]?.teamA_suspend === "suspended" ? true : false
              }
              ballStatus={
                matchOddsData?.[0]?.teamA_Ball === "ball" ? true : false
              }
              teamImage={newData?.teamA_Image}
              newData={newData}
              color={teamARates <= 0 ? "#FF4D4D" : "#46e080"}
              allRates={{
                teamA: teamARates,
                teamB: teamBRates,
                teamC: teamCRates,
              }}
              rate={teamARates}
              name={newData?.teamA}
              data={data?.length > 0 ? data[0] : []}
              team={"teamA"}
              suspendedData={data[0]?.status}
              typeOfBet={typeOfBet}
              isRound={isRound}
              matchOddsData={{
                back: matchOddsData?.[0]?.teamA_Back,
                lay: matchOddsData?.[0]?.teamA_lay,
              }}
              isBall={true}
            />
            <Divider />
            <ManualBoxComponent
            setFastBetLoading={setFastBetLoading}
              placeBetData={placeBetData}
              setFastRate={(val) => setFastRate(val)}
              fastRate={fastRate}
              setPlaceBetData={setPlaceBetData}
              sessionMain={session}
              setFastAmount={setFastAmount}
              teamImage={newData?.teamB_Image}
              time={true}
              fromOdds={true}
              showBox={showBox}
              newData={newData}
              selectedFastAmount={fastAmount}
              // livestatus={newData?.status === "SUSPENDED" ? true : false}
              livestatus={
                matchOddsData?.[0]?.teamB_suspend === "suspended" ? true : false
              }
              ballStatus={
                matchOddsData?.[0]?.teamB_Ball === "ball" ? true : false
              }
              color={teamBRates <= 0 ? "#FF4D4D" : "#46e080"}
              name={newData?.teamB}
              data={data?.length > 0 ? data[1] : []}
              suspendedData={data[1]?.status}
              rate={teamBRates}
              allRates={{
                teamA: teamARates,
                teamB: teamBRates,
                teamC: teamCRates,
              }}
              team={"teamB"}
              typeOfBet={typeOfBet}
              isRound={isRound}
              matchOddsData={{
                back: matchOddsData?.[0]?.teamB_Back,
                lay: matchOddsData?.[0]?.teamB_lay,
              }}
              isBall={false}
            />
            {newData?.teamC && (
              <>
                <Divider />
                <ManualBoxComponent
                setFastBetLoading={setFastBetLoading}
                  placeBetData={placeBetData}
                  setFastRate={(val) => setFastRate(val)}
                  fastRate={fastRate}
                  setPlaceBetData={setPlaceBetData}
                  sessionMain={session}
                  setFastAmount={setFastAmount}
                  teamImage={null}
                  selectedFastAmount={fastAmount}
                  fromOdds={true}
                  time={true}
                  // livestatus={newData?.status === "SUSPENDED" ? true : false}
                  livestatus={
                    matchOddsData?.[0]?.teamC_suspend === "suspended"
                      ? true
                      : false
                  }
                  ballStatus={
                    matchOddsData?.[0]?.teamC_Ball === "ball" ? true : false
                  }
                  showBox={showBox}
                  newData={newData}
                  // color={"#FF4D4D"}
                  color={teamCRates <= 0 ? "#FF4D4D" : "#46e080"}
                  name={newData?.teamC}
                  data={data?.length > 0 ? data[2] : []}
                  suspendedData={data[2]?.status}
                  rate={teamCRates}
                  allRates={{
                    teamA: teamARates,
                    teamB: teamBRates,
                    teamC: teamCRates,
                  }}
                  team={"teamC"}
                  typeOfBet={typeOfBet}
                  isRound={isRound}
                  matchOddsData={{
                    back: matchOddsData?.[0]?.teamC_Back,
                    lay: matchOddsData?.[0]?.teamC_lay,
                  }}
                  isBall={false}
                />
              </>
            )}
          </>
        ) : (
          <>
            <BoxComponent
            setFastBetLoading={setFastBetLoading}
              placeBetData={placeBetData}
              setFastRate={(val) => setFastRate(val)}
              fastRate={fastRate}
              setPlaceBetData={setPlaceBetData}
              sessionMain={session}
              setFastAmount={setFastAmount}
              time={true}
              fromOdds={true}
              selectedFastAmount={fastAmount}
              showBox={showBox}
              livestatus={newData?.status === "SUSPENDED" ? true : false}
              teamImage={newData?.teamA_Image}
              newData={newData}
              // lock={data?.length > 0 ? false : true}
              color={teamARates <= 0 ? "#FF4D4D" : "#46e080"}
              allRates={{
                teamA: teamARates,
                teamB: teamBRates,
                teamC: teamCRates,
              }}
              rate={teamARates}
              name={newData?.teamA}
              data={data?.length > 0 ? data[0] : []}
              team={"teamA"}
              suspendedData={data[0]?.status}
              typeOfBet={typeOfBet}
              isRound={isRound}
            />
            <Divider />
            {/* {console.log("newData :",newData)} */}
            <BoxComponent
            setFastBetLoading={setFastBetLoading}
              placeBetData={placeBetData}
              setFastRate={(val) => {
                setFastRate(val);
              }}
              fastRate={fastRate}
              setPlaceBetData={setPlaceBetData}
              sessionMain={session}
              setFastAmount={setFastAmount}
              teamImage={newData?.teamB_Image}
              time={true}
              showBox={showBox}
              fromOdds={true}
              selectedFastAmount={fastAmount}
              newData={newData}
              livestatus={newData?.status === "SUSPENDED" ? true : false}
              // lock={data?.length > 0 ? false : true}
              color={teamBRates <= 0 ? "#FF4D4D" : "#46e080"}
              name={newData?.teamB}
              data={data?.length > 0 ? data[1] : []}
              suspendedData={data[1]?.status}
              rate={teamBRates}
              allRates={{
                teamA: teamARates,
                teamB: teamBRates,
                teamC: teamCRates,
              }}
              team={"teamB"}
              typeOfBet={typeOfBet}
              isRound={isRound}
            />
            {newData?.teamC && (
              <>
                <Divider />
                <BoxComponent
                setFastBetLoading={setFastBetLoading}
                  placeBetData={placeBetData}
                  setFastRate={(val) => setFastRate(val)}
                  fastRate={fastRate}
                  setPlaceBetData={setPlaceBetData}
                  sessionMain={session}
                  setFastAmount={setFastAmount}
                  fromOdds={true}
                  teamImage={null}
                  selectedFastAmount={fastAmount}
                  time={true}
                  livestatus={newData?.status === "SUSPENDED" ? true : false}
                  showBox={showBox}
                  newData={newData}
                  // lock={data?.length > 0 ? false : true}
                  color={"#FF4D4D"}
                  name={newData?.teamC}
                  data={data?.length > 0 ? data[2] : []}
                  suspendedData={data[2]?.status}
                  rate={teamCRates}
                  allRates={{
                    teamA: teamARates,
                    teamB: teamBRates,
                    teamC: teamCRates,
                  }}
                  team={"teamC"}
                  typeOfBet={typeOfBet}
                  isRound={isRound}
                />
              </>
            )}
          </>
        )}
      </Box>
      {placeBetData && (
        <Box
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { mobile: 0, laptop: "40%", tablet: 0 },
            }}
          ></Box>
          <Box sx={{ width: { mobile: "98%", laptop: "58%", tablet: "98%" } }}>
            <OddsPlaceBet
              setPlaceBetData={setPlaceBetData}
              placeBetData={placeBetData}
              handleClose={() => setPlaceBetData(null)}
              name={placeBetData?.name}
              setFastRate={setFastRate}
              fastRate={fastRate}
              rates={placeBetData?.rates}
              season={session}
              back={placeBetData?.back}
              currentMatch={placeBetData?.currentMatch}
              isBack={placeBetData?.isBack}
              selectedValue={placeBetData?.selectedValue}
              type={placeBetData?.type}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default memo(Odds);
