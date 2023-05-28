import { useEffect } from "react"
import { Typography, Box } from "@mui/material";
import "../../components/index.css";
import { Background } from "../../components/index";
import AllBets from "../../components/AllBets";
import { useLocation } from "react-router-dom";
import Odds from "./matches/Odds";
import BookMarketer from "./matches/BookMaketer";
import SessionMarket from "./matches/SessionMarket";
import { setRole } from "../../newStore";

const MatchSubmit = ({ }) => {
  const { axios } = setRole();
  const location = useLocation();
  const matchIds = location?.state?.matchIds;
  // matchIds
  useEffect(() => {
    if (matchIds !== undefined) {
      getThisMatch(matchIds);
      // getAllBetsData(matchId)
    }
  }, [matchIds]);

  async function getThisMatch() {
    let payload = {
      idArray: matchIds,
    }
    try {
      let response = await axios.post(`/game-match/multipleMatchDetail`, payload);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );

      // setManualBookmakerData(matchOddsDataTemp);

      //   setSessionExposure(response?.data?.sessionExposure);
      // setCurrentMatch({
      //   ...response.data,
      // });

      // dispatch(
      //   setSelectedMatch({
      //     ...response.data,
      //   })
      // );

      // setMarketId(response.data.marketId);
      // setMatchDetail(response.data);
    } catch (e) {
      console.log("response", e.response.data);
    }
  }

  return (
    <Background>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              paddingTop: "0.7%",
              alignSelf: "start",
            }}
          >
            INDIA V/S PAKISTAN
          </Typography>
          <Odds />
          <BookMarketer />
          <SessionMarket />
          <AllBets tag={true} />
        </Box>
        <Box sx={{ width: "10px" }} />
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              paddingTop: "0.7%",
              alignSelf: "start",
            }}
          >
            INDIA V/S PAKISTAN
          </Typography>
          <Odds />
          <BookMarketer />
          <SessionMarket />
          <AllBets tag={true} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        {location?.state?.match >= 3 && (
          <Box
            sx={{
              flex: 0.5,
              flexDirection: "column",
              minHeight: "100px",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                fontWeight: "700",
                paddingTop: "0.7%",
                alignSelf: "start",
              }}
            >
              INDIA V/S PAKISTAN
            </Typography>
            <Odds />
            <BookMarketer />
            <SessionMarket />
            <AllBets tag={true} />
          </Box>
        )}
        <Box sx={{ width: "10px" }} />
        {location?.state?.match == 4 && (
          <Box
            sx={{
              flex: 0.5,
              flexDirection: "column",
              display: "flex",
              minHeight: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                fontWeight: "700",
                paddingTop: "0.7%",
                alignSelf: "start",
              }}
            >
              INDIA V/S PAKISTAN
            </Typography>
            <Odds />
            <BookMarketer />
            <SessionMarket />
            <AllBets tag={true} />
          </Box>
        )}
      </Box>
    </Background>
  );
};

export default MatchSubmit;
