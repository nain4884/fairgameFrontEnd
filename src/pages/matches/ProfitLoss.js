import { Box, Typography } from "@mui/material";
import ProfitLossComponent from "../../components/ProfitLossComponent";
import { Background } from "../../components";
import { setRole } from "../../newStore";
import { useEffect, useState } from "react";
import constants from "../../components/helper/constants";
import EventListing from "../../components/EventListing";
import YellowHeaderProfitLoss from "../../components/YellowHeaderProfitLoss";
import moment from "moment";

const ProfitLoss = ({ selected, visible }) => {
  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [eventData, setEventData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [betData, setBetData] = useState([]);
  const [sessionBetData, setSessionBetData] = useState([]);
  let { axios } = setRole();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sessionBets, setSessionBet] = useState([]);
  useEffect(() => {
    // alert(1)
    getEventList();
  }, [, pageCount, pageLimit]);

  async function getEventList() {
    var payload = {};
    if (startDate) {
      payload.from = moment(startDate).format("YYYY-MM-DD");
    }
    if (endDate) {
      payload.to = moment(endDate).format("YYYY-MM-DD");
    }
    try {
      const { data } = await axios.post(`/betting/totalProfitLoss`, payload);
      // console.log(data.data[0], 'datadatadatadata')
      setEventData(data?.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleReport = (eventType, pageno) => {
    getReport(eventType, pageno);
  };

  const getReport = async (eventType, pageno) => {
    var payload = {
      skip: pageno,
      limit: pageLimit,
      gameType: eventType,
    };
    if (startDate) {
      payload.from = moment(startDate).format("YYYY-MM-DD");
    }
    if (endDate) {
      payload.to = moment(endDate).format("YYYY-MM-DD");
    }
    try {
      const { data } = await axios.post(`/betting/profitLossReport`, payload);
      // console.log(data.data[0], 'datadatadatadata')l
      setReportData(data?.data[0]);
      setPageCount(
        Math.ceil(parseInt(data?.data?.[1] ? data.data?.[1] : 1) / pageLimit)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleBet = (value) => {
    // alert(id)
    getBets(value);
  };

  async function getBets(value) {
    setBetData([]);
    setSessionBetData([]);
    var payload = {
      [value?.type === "session_bet" && value?.betId==='' ? "matchId" : "match_id"]: value?.match_id,
      gameType: value?.eventType,
    };
    if (value?.betId !== "") {
      payload.bet_id = value?.betId;
      payload.sessionBet = true;
    }
    if (startDate) {
      payload.from = moment(startDate).format("YYYY-MM-DD");
    }
    if (endDate) {
      payload.to = moment(endDate).format("YYYY-MM-DD");
    }
    try {
      const { data } = await axios.post(
        `/betting/${
          value?.type === "session_bet" && value?.betId==='' 
            ? "sessionProfitLossReport"
            : "getResultBetProfitLoss"
        }`,
        payload
      );
      const newData = data?.data?.filter((v) => v.sessionBet !== true);

      setBetData(
        newData?.map((v) => ({
          id: v.id,
          isActive: true,
          createAt: v.createAt,
          updateAt: v.createAt,
          createdBy: null,
          deletedAt: null,
          user_id: null,
          match_id: v.match_id,
          bet_id: v.bet_id,
          result: "pending",
          team_bet: v.team_bet || v.teamBet,
          odds: v.odds,
          win_amount: null,
          loss_amount: null,
          bet_type: v.betType,
          country: null,
          ip_address: null,
          rate: null,
          marketType: v.marketType,
          myProfitLoss: v.myProfitLoss,
          amount: v.amount,
          deleted_reason:v.deleted_reason
        }))
      );

      if (value?.type === "session_bet" && value.betId === "") {
        setSessionBet(data?.data[0]);
      } else {
        const newRes = data?.data?.filter((v) => v.sessionBet === true);

        setSessionBetData(newRes?.map((v) => ({ ...v, bet_type: v.betType })));
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleClick = (e) => {
    try {
      // setVisible(false)

      getEventList();
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  return (
    <Box sx={{ width: "100%", paddingX: "1vw" }}>
      {visible ? (
        <>
          <YellowHeaderProfitLoss
            title="PROFIT/LOSS"
            type="user"
            onClick={handleClick}
            setEndDate={setEndDate}
            endDate={endDate}
            startDate={startDate}
            setStartDate={setStartDate}
          />
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "2px", mobile: "6px" },
              marginTop: "10px",
              marginBottom: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"PROFIT/LOSS REPORT"}
          </Typography>
          <ProfitLossComponent
            sessionBets={sessionBets}
            eventData={eventData}
            reportData={reportData}
            betData={betData}
            sessionBetData={sessionBetData}
            handleReport={handleReport}
            pageCount={pageCount}
            handleBet={handleBet}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Background>
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "2px", mobile: "6px" },
              marginTop: "10px",
              marginBottom: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"PROFIT/LOSS REPORT"}
          </Typography>
          <ProfitLossComponent
            sessionBets={sessionBets}
            eventData={eventData}
            reportData={reportData}
            betData={betData}
            sessionBetData={sessionBetData}
            handleReport={handleReport}
            handleBet={handleBet}
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
          />
        </Background>
      )}
    </Box>
  );
};

export default ProfitLoss;
