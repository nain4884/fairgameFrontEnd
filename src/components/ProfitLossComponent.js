import { Box } from "@mui/system";
import { useState } from "react";
import Footer from "./Footer";
import RowComponentMatches from "./RowComponentMatches";
import RowHeaderMatches from "./RowHeaderMatches";

const ProfitLossComponent = ({
  eventData,
  reportData,
  betData,
  sessionBetData,
  handleReport,
  handleBet,
  currentPage,
  pageCount,
  setCurrentPage,
  sessionBets,
  setShow,
  show,
}) => {
  console.log(sessionBets, "setSessionBet");
  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });
  console.log(selectedId, "selectedId");
  const [event, setEvent] = useState("");
  const getHandleReport = (eventType) => {
    setEvent(eventType);
    if (show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    if (!show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      handleReport(eventType, currentPage);
    }
    setShow(!show);
  };

  function callPage(val) {
    // setCurrentPage(setProfitLossReportPage(parseInt(val)));
    setCurrentPage(parseInt(val));

    handleReport(event, parseInt(val));
  }

  const getBetReport = (value) => {
    // if (selectedId?.id === value?.match_id) {
    //   handleBet(value);
    //   // setShow(false);
    //   // setSelectedId({ type: "", id: "", betId: "", sessionBet:false });
    // } else {
    setSelectedId({
      type: value?.type,
      id: value?.match_id,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
    handleBet(value);

    // }
  };

  return (
    <Box>
      {eventData.map((item, index) => {
        return (
          <RowHeaderMatches
            key={index}
            item={item}
            index={index}
            getHandleReport={getHandleReport}
            show={show}
          />
        );
      })}

      <Box>
        {show &&
          reportData.map((item, index) => {
            return (
              <RowComponentMatches
                key={index}
                item={item}
                index={index + 1}
                selectedId={selectedId}
                betData={betData}
                sessionBetData={sessionBetData}
                sessionBets={sessionBets}
                getBetReport={getBetReport}
              />
            );
          })}
      </Box>

      {show && (
        <Footer
          getListOfUser={() => handleReport(event)}
          currentPage={currentPage}
          pages={pageCount}
          callPage={callPage}
        />
      )}
    </Box>
  );
};
export default ProfitLossComponent;
