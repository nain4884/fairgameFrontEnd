import { Box, Typography } from "@mui/material";
import ProfitLossComponent from "../../components/ProfitLossComponent";
import { Background } from "../../components";
import { setRole } from "../../newStore";
import { useEffect, useState } from "react";
import constants from "../../components/helper/constants";

const ProfitLoss = () => {
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [eventData, setEventData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [betData, setBetData] = useState([]);
  const [sessionBetData, setSessionBetData] = useState([]);
  let { axios } = setRole();

  useEffect(() => {
    // alert(1)
    getEventList();
  }, [currentPage, pageCount, pageLimit]);

  async function getEventList() {
    var payload = {};
    try {
      const { data } = await axios.post(`/betting/totalProfitLoss`, payload);
      // console.log(data.data[0], 'datadatadatadata')
      setEventData(data?.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleReport = (eventType) => {
    getReport(eventType);
  };

  const getReport = async (eventType) => {
    var payload = {
      gameType: eventType,
    };
    try {
      const { data } = await axios.post(`/betting/profitLossReport`, payload);
      // console.log(data.data[0], 'datadatadatadata')l
      setReportData(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBet = (id) => {
    // alert(id)
    getBets(id);
  };

  async function getBets(id) {
    setBetData([]);
    setSessionBetData([]);
    var payload = {
      match_id: id,
    };

    try {
      const { data } = await axios.post(
        `/betting/getResultBetProfitLoss`,
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
          team_bet: v.team_bet,
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
        }))
      );

      const newRes = data?.data?.filter((v) => v.sessionBet === true);

      setSessionBetData(newRes?.map((v) => ({ ...v, bet_type: v.betType })));
    } catch (e) {
      console.log(e);
    }
  }
  return (
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
        eventData={eventData}
        reportData={reportData}
        betData={betData}
        sessionBetData={sessionBetData}
        handleReport={handleReport}
        handleBet={handleBet}
      />
    </Background>
  );
};

export default ProfitLoss;
