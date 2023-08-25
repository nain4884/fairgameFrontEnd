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
import moment from "moment";

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

  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [eventData, setEventData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [betData, setBetData] = useState([]);
  const [sessionBetData, setSessionBetData] = useState([]);
  const [allClinets, setAllCliets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { profitLossReportPage } = useSelector((state) => state?.adminMatches);
  useEffect(() => {
    // alert(1)
    getEventList();
  }, [pageCount, pageLimit]);
  useEffect(() => {
    getAllClients();
  }, []);

  // useEffect(() => {
  //   if (profitLossReportPage) {
  //     setCurrentPage(profitLossReportPage);
  //   }
  // }, [profitLossReportPage]);

  async function getEventList() {
    var payload = {};
    if (search?.id) {
      payload.userId = search?.id;
    }
    if (startDate) {
      payload.from = moment(startDate).format("YYYY-MM-DD");
    }
    if (endDate) {
      payload.to = moment(endDate).format("YYYY-MM-DD");
    }
    let { axios } = setRole();
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
      gameType: eventType,
      skip: pageno,
      limit: pageLimit,
    };
    if (search?.id) {
      payload.userId = search?.id;
    }
    if (startDate && search?.id) {
      payload.from = moment(startDate).format("YYYY-MM-DD");
    }
    if (endDate && search?.id) {
      payload.to = moment(endDate).format("YYYY-MM-DD");
    }
    let { axios } = setRole();
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
    if (search?.id) {
      payload.userId = search?.id;
    }
    if (startDate && search?.id) {
      payload.from = moment(startDate).format("YYYY-MM-DD");
    }
    if (endDate && search?.id) {
      payload.to = moment(endDate).format("YYYY-MM-DD");
    }
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

  async function getAllClients() {
    setBetData([]);
    setSessionBetData([]);

    let { axios } = setRole();
    try {
      const { data } = await axios.get(`/users/getAllClients`);
      if (data.data.length > 0) {
        setAllCliets(data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleClick = (e) => {
    try {
      getEventList();
    } catch (e) {
      console.log("error", e?.message);
    }
  };
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
          <YellowHeaderProfitLoss
            onClick={handleClick}
            clientData={allClinets}
            setSearch={setSearch}
            search={search}
            setEndDate={setEndDate}
            endDate={endDate}
            startDate={startDate}
            setStartDate={setStartDate}
          />
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
              // loading
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
          </Box>
        </>
      )}

      {/* <ExtraHeader /> */}
      {/* <ProfitLossList /> */}
    </Background>
  );
};
export default ProfitLoss;
