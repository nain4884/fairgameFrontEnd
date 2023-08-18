import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { StyledImage } from ".";
import { ArrowDown, Cricket } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import AllRateSeperate from "./AllRateSeperate";
import SessionBetSeperate from "./sessionBetSeperate";
import moment from "moment";
import Footer from "./Footer";

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
}) => {
  const [visible, setVisible] = useState(false);

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [event, setEvent] = useState("");
  const getHandleReport = (eventType) => {
    setEvent(eventType);
    if (!visible) {
      handleReport(eventType, currentPage);
    }
    setVisible(!visible);
  };

  function callPage(val) {
    // setCurrentPage(setProfitLossReportPage(parseInt(val)));
    setCurrentPage(parseInt(val));

    handleReport(event, parseInt(val));
  }

  const getBetReport = (id) => {
    // if (!show) {
    // }
    if (selectedId !== "") {
      setSelectedId("");
    } else {
      handleBet(id);
      setShow(!show);
      setSelectedId(id);
    }
  };

  const RowHeader = ({ item, index }) => {
    return (
      <Box
        onClick={() => getHandleReport(item?.eventType)}
        sx={{
          width: "100%",
          height: { laptop: "60px", mobile: "50px" },
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { mobile: "10%", laptop: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#F8C851",
          }}
        >
          <StyledImage
            src={Cricket}
            sx={{ width: { laptop: "35px", mobile: "25px" } }}
          />
        </Box>
        <Box
          sx={{
            width: { mobile: "40%", laptop: "60%" },
            height: "100%",
            alignItems: "center",
            display: "flex",
            paddingX: "10px",
            background: "#F8C851",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
          >
            {item?.eventType}
          </Typography>
          <StyledImage
            src={ArrowDown}
            sx={{
              width: { laptop: "20px", mobile: "10px" },
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              height: { laptop: "10px", mobile: "6px" },
            }}
          />
        </Box>
        <Box
          sx={{
            background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "30%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "14px", mobile: "12px" },
                fontWeight: "700",
                color: "white",
              }}
            >
              {item?.totalLoss > 0 ? "Profit" : "Loss"}
            </Typography>
            <StyledImage
              src={item?.totalLoss > 0 ? ARROWUP : ARROWDOWN}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: { laptop: "14px", mobile: "10px" },
                fontWeight: "700",
                color: "white",
              }}
            >
              {Number(item?.totalLoss) >= 0 ? (
                <>
                  <span style={{ visibility: "hidden" }}>-</span>
                  {Number(item?.totalLoss).toFixed(2)}
                </>
              ) : (
                Number(item?.totalLoss).toFixed(2)
              )}{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "30%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "14px", mobile: "12px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            Total Bet
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: { laptop: "14px", mobile: "10px" },
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              {item?.totalBet}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  const RowComponent = ({ item, index }) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Box
          onClick={() => getBetReport(item?.matchId)}
          sx={{
            width: "100%",
            height: "50px",
            background: "white",
            display: "flex",
            padding: 0.1,
          }}
        >
          <Box
            sx={{
              width: { mobile: "10%", laptop: "5%" },
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              background: "black",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
            >
              {0 + index}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { mobile: "40%", laptop: "60%" },
              position: "relative",
              height: "100%",
              paddingY: "4px",
              alignItems: { laptop: "center", mobile: "center" },
              display: "flex",
              paddingX: "10px",
              background: "#0B4F26",
              marginLeft: 0.1,
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "0px", mobile: "10px" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "500",
                position: "absolute",
                top: 0,
                right: 5,
              }}
            >
              ({moment(item?.matchDate).format("DD-MM-YYYY")})
            </Typography>

            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginTop: { mobile: "5px", laptop: "0" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "10px", laptop: "15px" },
                  color: "white",
                  fontWeight: "600",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineClamp: 2,
                }}
              >
                {item.eventName}
              </Typography>
              <Typography
                sx={{
                  fontSize: { laptop: "10px", mobile: "0" },
                  color: "white",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                ({moment(item.matchDate).format("DD-MM-YYYY")})
              </Typography>
            </Box>
            <StyledImage
              src={ArrowDown}
              sx={{
                marginTop: { mobile: "5px", laptop: "0" },
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform:
                  selectedId === item?.matchId
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
          <Box
            sx={{
              background: item.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
              paddingX: "2px",
              width: { mobile: "25%", laptop: "30%" },
              height: "100%",
              marginLeft: 0.1,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: { laptop: "12px", mobile: "8px" },
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Rate Profit/Loss
              </Typography>
              <StyledImage
                src={item.rateProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                sx={{
                  width: { laptop: "25px", mobile: "15px" },
                  height: { laptop: "12px", mobile: "8px" },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: { mobile: "10px", laptop: "14px" },
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {" "}
                {Number(item?.rateProfitLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {Number(item?.rateProfitLoss).toFixed(2)}
                  </>
                ) : (
                  Number(item?.rateProfitLoss).toFixed(2)
                )}{" "}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              background: item.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
              paddingX: "2px",
              width: { mobile: "25%", laptop: "30%" },
              height: "100%",
              marginLeft: 0.1,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: { laptop: "12px", mobile: "8px" },
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Session Profit/Loss
              </Typography>
              <StyledImage
                src={item.sessionProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                sx={{
                  width: { laptop: "25px", mobile: "15px" },
                  height: { laptop: "12px", mobile: "8px" },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: { mobile: "10px", laptop: "14px" },
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {Number(item?.sessionProfitLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {Number(item?.sessionProfitLoss).toFixed(2)}
                  </>
                ) : (
                  Number(item?.sessionProfitLoss).toFixed(2)
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        {selectedId === item?.matchId && (
          <Box
            sx={{
              width: { mobile: "100%", laptop: "96%" },
              marginTop: { mobile: ".25vh" },
              marginLeft: { laptop: "4%" },
              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
            }}
          >
            <SessionBetSeperate
              betHistory={true}
              allBetsData={sessionBetData}
              profit
              isArrow={true}
            />
            <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>
            <AllRateSeperate
              betHistory={true}
              count={betData?.length}
              allBetsData={betData}
              profit
            />
          </Box>
        )}
      </Box>
    );
  };
  return (
    <Box>
      {eventData.map((item, index) => {
        return <RowHeader key={index} item={item} index={index} />;
      })}

      <Box>
        {visible &&
          reportData.map((item, index) => {
            return <RowComponent key={index} item={item} index={index + 1} />;
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
