import { Box } from "@mui/system";
import { useState } from "react";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
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
  getListOfUser,
  setCurrentPage,
  visible,
  setVisible,
  sessionBets,
}) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });
  const [event, setEvent] = useState("");

  console.log(selectedId, "selectedId");

  const getHandleReport = (eventType) => {
    setEvent(eventType);
    if (visible) {
      setSelectedId({
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      });
    }
    if (!visible) {
      setSelectedId({
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      });
      handleReport(eventType, currentPage);
    }

    setVisible(!visible);
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
      id: value?.match_id || value?.matchid,
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
            show={visible}
          />
        );
      })}
      <Box>
        {visible &&
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
      {visible && (
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
