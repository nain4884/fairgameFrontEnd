import React from "react";

import { Box } from "@mui/material";

import "../../index.css";

import { useSelector } from "react-redux";

import Odds from "./Odds";

import SessionMarket from "./SessionOdds/SessionMarket";
import { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";

// const BookMarketer = ({ manual, data }) => {
//   const theme = useTheme();
//   const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         backgroundColor: "white",
//         padding: 0.2,
//         flexDirection: "column",
//         marginY: { mobile: ".2vh", laptop: ".5vh" },
//         width: { mobile: "98%", laptop: "97%" },
//         marginX: "1vw",
//         alignSelf: { mobile: "center", tablet: "center", laptop: "flex-start" },
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           height: 38,
//           flexDirection: "row",
//           width: "99.7%",
//           alignSelf: "center",
//         }}
//       >
//         <Box
//           sx={{
//             flex: 1,
//             background: "#f1c550",
//             alignItems: "center",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
//               fontWeight: "bold",
//               marginLeft: "7px",
//             }}
//           >
//             {manual && "Manual"} Bookmaker Market
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             flex: 0.1,
//             background: "#262626",
//             // '#262626'
//           }}
//         >
//           <div class="slanted"></div>
//         </Box>
//         <Box
//           sx={{
//             flex: 1,
//             background: "#262626",
//             // '#262626' ,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//           }}
//         >
//           <SmallBox color={"#FF4D4D"} />
//           <Typography
//             sx={{
//               color: "white",
//               width: "60px",
//               fontSize: { laptop: "9px", tablet: "9px", mobile: "7px" },
//               fontWeight: "500",
//               flexWrap: "wrap",
//             }}
//           >
//             Maximum Bet{" "}
//             {manual
//               ? data?.bookmaker_manual_max_bet
//               : data?.betfair_bookmaker_max_bet}
//           </Typography>
//           <img
//             src={Info}
//             style={{
//               width: "15px",
//               height: "15px",
//               marginRight: "5px",
//               marginLeft: "5px",
//             }}
//           />
//         </Box>
//       </Box>
//       {
//         <Box
//           sx={{
//             display: "flex",
//             background: "#319E5B",
//             height: "25px",
//             width: "99.7%",
//             alignSelf: "center",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               background: "'#319E5B'",
//               height: "25px",
//               width: "40%",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "white",
//                 fontSize: { laptop: "11px", mobile: "9px" },
//                 marginLeft: "7px",
//               }}
//             >
//               MIN: 4000 MAX:4500
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               background: "#319E5B",
//               height: "25px",
//               width: { laptop: "60%", mobile: "80%" },
//               justifyContent: { laptop: "center", mobile: "flex-end" },
//             }}
//           >
//             <Box
//               sx={{
//                 background: "#00C0F9",
//                 width: { laptop: "16.5%", mobile: "25%" },
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
//               >
//                 Back
//               </Typography>
//             </Box>
//             <Box sx={{ width: ".35%", display: "flex" }}></Box>
//             <Box
//               sx={{
//                 background: "#FF9292",
//                 width: { laptop: "16.5%", mobile: "25%" },
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
//               >
//                 Lay
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       }
//       <Box sx={{ position: "relative" }}>
//         <BoxComponent color={"#46e080"} name={data.teamA} />
//         <Divider />
//         <BoxComponent color={"#FF4D4D"} name={data.teamB} align="end" />
//         {!matchesMobile && (
//           <Box
//             sx={{
//               background: "rgba(0,0,0,1)",
//               width: "60%",
//               marginLeft: "40%",
//               height: "82px",
//               position: "absolute",
//               top: ".1px",
//               alignItems: "center",
//               justifyContent: "center",
//               display: "flex",
//             }}
//           >
//             <img src={BallStart} style={{ width: "113px", height: "32px" }} />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };
const MatchOdds = ({
  data,
  matchOddsLive,
  bookmakerLive,
  sessionOddsLive,
  allBetsData,
  dataProfit,
  sessionBets,
}) => {
  const { manualBookMarkerRates } = useSelector((state) => state?.matchDetails);
  const [matchOddsData, setMatchOddsData] = useState([]);
  const [bookMakerRateLive, setBookMakerRateLive] = useState(false);

  useEffect(() => {
    if (data) {
      const matchOdds = data?.bettings?.filter(
        (element) => element.sessionBet === false
      );
      setMatchOddsData(matchOdds);
      setBookMakerRateLive(data?.bookMakerRateLive);
    }
  }, [data]);

  const teamRates =manualBookMarkerRates?.length>0 ? manualBookMarkerRates?.find(
    (v) => v?.matchId === data?.id
  ) : { teamA: 0, teamB: 0 };
  // { console.warn("dataProfit :", dataProfit) }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* {data?.apiBookMakerActive && <BookMarketer data={data} />}
      {data?.manualBookMakerActive && (
        <BookMarketer manual={true} data={data} />
      )} */}

      {data?.apiMatchActive && (
        <Odds
          showDely={true}
          showBox={
            matchOddsData?.length > 0 && matchOddsData[0]?.betStatus === 0 || data?.bettings?.length === 0
              ? true
              : false
          }
          newData={data}
          data={
            matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
          }
          lock={
            matchOddsData?.length > 0 && matchOddsData[0]?.betStatus === 0
              ? true
              : false
          }
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          min={data?.betfair_match_min_bet || 0}
          max={data?.betfair_match_max_bet || 0}
          title={"Match Odds"}
          typeOfBet={"MATCH ODDS"}
        />
      )}

      {data?.apiBookMakerActive && (
        <Odds
          showBox={!bookMakerRateLive}
          newData={data}
          showDely={true}
          lock={
            data?.bookmakerLive?.length > 0 &&
            data?.bookmakerLive[0]?.betStatus === 0
              ? true
              : false
          }
          data={
            bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
          }
          // suspended={false}
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          min={data?.betfair_bookmaker_min_bet || 0}
          max={data?.betfair_bookmaker_max_bet || 0}
          title={"Bookmaker Market "}
          isRound={false}
          typeOfBet={"BOOKMAKER"}
        />
      )}

      {/* Manual Bookmaker */}
      {data?.manualBookMakerActive && (
        <Odds
          newData={data}
          lock={false}
          showDely={false}
          suspended={false}
          data={data}
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          min={data?.bookmaker_manual_min_bet || 0}
          max={data?.bookmaker_manual_max_bet || 0}
          title={"Manual Bookmaker"}
          typeOfBet={"MANUAL BOOKMAKER"}
        />
      )}

      {/*`${match.bettings[0].teamA_Back ? match.bettings[0].teamA_Back - 2 : 50 - 2}`*/}

      {(data?.apiSessionActive || data?.manualSessionActive) && (
        <SessionMarket
          sessionBets={sessionBets}
          data={sessionOddsLive}
          newData={data}
          // dataProfit={dataProfit}
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          allBetsData={allBetsData}
        />
      )}
    </Box>
  );
};

export default memo(MatchOdds);
