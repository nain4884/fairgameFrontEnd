import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ProfitLossComponent from "../../components/ProfitLoss";
import { ARROWDOWN, ARROWUP } from "../../admin/assets";
import { Background, Header } from "../../components";
import GeneralReportList from "../../components/GeneralReportList";
import YellowHeaderProfitLoss from "../../components/YellowHeaderProfitLoss";
import constants from "../../components/helper/constants";
import { setRole } from "../../newStore";
import CustomLoader from "../../components/helper/CustomLoader";

const ProfitLoss = () => {
  const ExtraHeader = () => {
    return (
      <Box sx={{ marginY: "1.5vh" }}>
        <Typography
          sx={{
            color: "white",
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "500",
            marginBottom: "1vh",
          }}
        >
          Profit/Loss for Event Type
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              paddingLeft: "10px",
              background: "#27AC1E",
              alignItems: "center",
              height: "45px",
              marginX: 2,
              marginLeft: 0.9,
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
            >
              Cricket : 4,02,000,000,0
            </Typography>
            <img
              src={ARROWUP}
              style={{ marginLeft: "5px", width: "20px", height: "10px" }}
            />
          </Box>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              paddingLeft: "10px",
              background: "#E32A2A",
              alignItems: "center",
              height: "45px",
              marginRight: 2,
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
            >
              Football : 4,02,000,000,0
            </Typography>
            <img
              src={ARROWDOWN}
              style={{ marginLeft: "5px", width: "20px", height: "10px" }}
            />
          </Box>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              paddingLeft: "10px",
              background: "#27AC1E",
              alignItems: "center",
              height: "45px",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
            >
              Tennis : 4,02,000,000,0
            </Typography>
            <img
              src={ARROWUP}
              style={{ marginLeft: "5px", width: "20px", height: "10px" }}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [eventData, setEventData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [betData, setBetData] = useState([]);
  const [sessionBetData, setSessionBetData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // alert(1)
    getEventList();
  }, [currentPage, pageCount, pageLimit]);

  async function getEventList() {
    var payload = {};
    let { axios } = setRole();
    try {
      setLoading(true);
      const { data } = await axios.post(`/betting/totalProfitLoss`, payload);
      // console.log(data.data[0], 'datadatadatadata')
      setEventData(data?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
    let { axios } = setRole();
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
    let { axios } = setRole();
    try {
      const { data } = await axios.post(
        `/betting/getResultBetProfitLoss`,
        payload
      );
      setBetData(data?.data?.filter((v) => v.sessionBet !== true));
      setSessionBetData(data?.data?.filter((v) => v.sessionBet === true));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Background>
      {/* <Header /> */}
      {loading ? (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader text="" />
        </Box>
      ) : (
        <>
          <YellowHeaderProfitLoss />
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              marginLeft: "1%",
              fontWeight: "600",
              marginY: "0.5%",
              alignSelf: "start",
            }}
          >
            Profit/Loss for Event Type
          </Typography>

          <Box sx={{ width: "99%", marginX: ".5%" }}>
            <ProfitLossComponent
              loading
              eventData={eventData}
              reportData={reportData}
              betData={betData}
              sessionBetData={sessionBetData}
              handleReport={handleReport}
              handleBet={handleBet}
            />
          </Box>
        </>
      )}

      {/* <ExtraHeader /> */}
      {/* <ProfitLossList /> */}
    </Background>
  );
};
export default ProfitLoss;
