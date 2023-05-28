import { Box, Typography, useMediaQuery } from "@mui/material";
import Divider from "../../../components/helper/Divider";
import BoxComponent from "./BoxComponent";
import ManualBoxComponent from "./ManualBoxComponent";
import SmallBox from "./SmallBox";
import { useTheme } from "@emotion/react";

const Odds = ({ currentMatch, data, typeOfBet, manualBookmakerData }) => {
  const theme = useTheme();
  // console.log("currentMatch 22222", data);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const bookRatioB = (teamARates, teamBRates) => {
    const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
  };


  const bookRatioA = (teamARates, teamBRates) => {
    const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
  };
  // data = { data?.length > 0 ? data[1] : []
  // lock = { ex?.availableToBack?.length > 0 ? false : true
  const handleLock = (data) => {
    // console.log('data ddd :', data);
    // if (data?.length > 0) {
    return data?.ex?.availableToBack?.length > 0 ? false : true
    // }
    // return true;
  }

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
        marginTop: typeOfBet == "MANUAL BOOKMAKER" ? "0" : "10px",
        marginBottom: typeOfBet == "MANUAL BOOKMAKER" ? "10px" : "0",
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
            {typeOfBet}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div class="slanted"></div>
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
          <SmallBox valueA={bookRatioA(currentMatch?.teamA_rate, currentMatch?.teamB_rate)} valueB={bookRatioB(currentMatch?.teamA_rate, currentMatch?.teamB_rate)} />
        </Box>
      </Box>
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
            MIN:{currentMatch?.betfair_match_min_bet} MAX:
            {currentMatch?.betfair_match_max_bet}
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
              width: { laptop: "5vw", mobile: "20%" },
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
              width: { laptop: "5vw", mobile: "20%" },
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
        {typeOfBet == "MANUAL BOOKMAKER" ?
          <>
            <ManualBoxComponent
              teamImage={currentMatch?.teamA_Image}
              // color={"#46e080"}
              name={currentMatch?.teamA}
              rates={currentMatch?.teamA_rate}
              color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#46e080"}
              data={data?.length > 0 ? data[0] : []}
              lock={handleLock(data?.length > 0 ? data[0] : [])}
              // manualBookmakerData
              matchOddsData={{
                back: manualBookmakerData?.[0]?.teamA_Back,
                lay: manualBookmakerData?.[0]?.teamA_lay
              }}
            />
            <Divider />
            <ManualBoxComponent
              teamImage={currentMatch?.teamA_Image}
              // color={"#46e080"}
              name={currentMatch?.teamA}
              rates={currentMatch?.teamA_rate}
              color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#46e080"}
              data={data?.length > 0 ? data[0] : []}
              lock={handleLock(data?.length > 0 ? data[0] : [])}
              matchOddsData={{
                back: manualBookmakerData?.[0]?.teamA_Back,
                lay: manualBookmakerData?.[0]?.teamA_lay
              }}
            />
          </>
          :
          <>
            <BoxComponent
              teamImage={currentMatch?.teamA_Image}
              // color={"#46e080"}
              name={currentMatch?.teamA}
              rates={currentMatch?.teamA_rate}
              color={currentMatch?.teamA_rate <= 0 ? "#FF4D4D" : "#46e080"}
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
              color={currentMatch?.teamB_rate <= 0 ? "#FF4D4D" : "#46e080"}
              name={currentMatch?.teamB}
              rates={currentMatch?.teamB_rate}
              data={data?.length > 0 ? data[1] : []}
              lock={handleLock(data?.length > 0 ? data[1] : [])}
              align="end"
            />
          </>
        }
      </Box>
    </Box>
  );
};

export default Odds;
