import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import StyledImage from "./StyledImage";
import { ArrowDown, Cricket } from "../assets/index";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import BetHistory from "./BetHistory";
import SessionBetSeperate from "./sessionBetSeperate";
import SessionBetHistory from "./SessionBetHistory";
import moment from "moment";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { setProfitLossReportPage } from "../newStore/reducers/adminMatches";
import { useTheme } from "@emotion/react";

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

  const [show, setShow] = useState(false);
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

  const RowHeader = ({ item, index }) => {
    return (
      <Box
        key={index}
        onClick={() => {
          getHandleReport(item?.eventType);
        }}
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
            width: { mobile: "40%", laptop: "80%" },
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
            sx={{ fontSize: "15px", color: "black", fontWeight: "700" }}
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
            width: { mobile: "25%", laptop: "20%" },
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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "16px", mobile: "12px" },
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "16px", mobile: "12px" },
                fontWeight: "700",
                color: "white",
              }}
            >
              {Number(item.totalLoss) >= 0 ? (
                <>
                  <span style={{ visibility: "hidden" }}>-</span>
                  {Number(item.totalLoss).toFixed(2)}
                </>
              ) : (
                Number(item.totalLoss).toFixed(2)
              )}
              {/* {Number(item?.totalLoss).toFixed(2)} */}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
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
              fontSize: { laptop: "16px", mobile: "12px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            Total Bet
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: { laptop: "16px", mobile: "12px" },
                fontWeight: "700",
                color: "white",
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
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Box key={index} sx={{ width: "100%" }}>
        <Box
          // onClick={() => {
          //     // setShow(!show)
          // }}
          sx={{
            width: "100%",
            height: "45px",
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
              {"0" + index}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { mobile: "40%", laptop: "80%" },
              position: "relative",
              height: "100%",
              paddingY: "4px",
              alignItems: { laptop: "center", mobile: "flex-end" },
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
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "10px", laptop: "15px" },
                  color: "white",
                  fontWeight: "700",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineClamp: 2,
                }}
              >
                {item?.eventName}
              </Typography>
              <Typography
                sx={{
                  fontSize: { laptop: "10px", mobile: "0" },
                  color: "white",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                ({moment(item?.matchDate).format("DD-MM-YYYY")})
              </Typography>
            </Box>
          </Box>
          <Box
            onClick={() => {
              // if (selectedId.type === "all_bet") {
              //   setSelectedId((prev) => ({
              //     ...prev,
              //     type: "",
              //     betId: "",
              //     sessionBet: false,
              //   }));
              // } else {
              getBetReport({
                eventType: item?.eventType,
                match_id: item?.matchId,
                type: "all_bet",
                betId: "",
                sessionBet: false,
              });
              // }
            }}
            sx={{
              background: item.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
              paddingX: "2px",
              width: { mobile: "25%", laptop: "20%" },
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
              >
                {Number(item.rateProfitLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {Number(item.rateProfitLoss).toFixed(2)}
                  </>
                ) : (
                  Number(item.rateProfitLoss).toFixed(2)
                )}
              </Typography>
              <StyledImage
                src={ArrowDown}
                sx={{
                  width: { laptop: "20px", mobile: "10px" },
                  height: { laptop: "10px", mobile: "6px" },
                  transform:
                    selectedId?.id === item?.matchId &&
                    selectedId?.type === "all_bet"
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              />
            </Box>
          </Box>
          <Box
            onClick={() => {
              // if (selectedId?.type === "session_bet") {
              //   setSelectedId((prev) => ({
              //     ...prev,
              //     type: "",

              //     betId: "",
              //     sessionBet: false,
              //   }));
              // } else {
              getBetReport({
                eventType: item?.eventType,
                match_id: item?.matchId,
                type: "session_bet",
                betId: "",
                sessionBet: false,
              });
              // }
            }}
            sx={{
              background: item.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
              paddingX: "2px",
              width: { mobile: "25%", laptop: "20%" },
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
              >
                {Number(item.sessionProfitLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {Number(item.sessionProfitLoss).toFixed(2)}
                  </>
                ) : (
                  Number(item.sessionProfitLoss).toFixed(2)
                )}
                {/* {Number(item.sessionProfitLoss).toFixed(2)} */}
              </Typography>
              <StyledImage
                src={ArrowDown}
                sx={{
                  width: { laptop: "20px", mobile: "10px" },
                  height: { laptop: "10px", mobile: "6px" },
                  transform:
                    selectedId?.id === item?.matchId &&
                    selectedId?.type === "session_bet"
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              />
            </Box>
          </Box>
        </Box>
        {selectedId?.id === item?.matchId && (
          <Box
            sx={{
              width: { mobile: "100%", laptop: "100%" },
              marginTop: { mobile: ".25vh" },
              // marginLeft: { laptop: "4%" },

              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
            }}
          >
            {selectedId?.type === "all_bet" && (
              <BetHistory betHistory={true} betData={betData} admin profit />
            )}

            <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>

            {selectedId?.type === "session_bet" && (
              <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: { mobile: "100%", laptop: "50%", tablet: "100%" },
                    maxHeight: "51vh",
                    overflow: "hidden",
                    overflowY: "auto",
                    marginY: { mobile: ".2vh", laptop: "1vh" },
                    padding: 0.2,
                  }}
                >
                  {sessionBets?.length > 0 &&
                    sessionBets?.map((item, index) => {
                      return (
                        <SessionComponent
                          key={index}
                          item={item}
                          index={index + 1}
                        />
                      );
                    })}
                </Box>

                {selectedId?.betId !== "" && !matchesMobile && (
                  <Box
                    sx={{
                      width: { mobile: "100%", laptop: "49%", tablet: "100%" },
                    }}
                  >
                    <SessionBetHistory
                      mark
                      mark2
                      betHistory={true}
                      betData={sessionBetData}
                      admin
                      profit
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  const SessionComponent = ({ item, index }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Box key={index} sx={{ width: "100%" }}>
        <Box
          onClick={() => {
            // if (selectedId?.type === "session_bet" && selectedId?.sessionBet) {
            //   setSelectedId((prev) => ({
            //     ...prev,
            //     betId: "",
            //     sessionBet: false,
            //   }));
            // } else {
            getBetReport({
              eventType: item?.eventType,
              match_id: item?.matchid,
              type: "session_bet",
              betId: item?.betid,
              sessionBet: true,
            });
            // }
          }}
          sx={{
            width: "100%",
            height: "45px",
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
              {"0" + index}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { mobile: "65%", laptop: "80%", tablet: "65%" },
              position: "relative",
              height: "100%",
              paddingY: "4px",
              alignItems: { laptop: "center", mobile: "flex-end" },
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
              ({moment(item?.betDate).format("DD-MM-YYYY")})
            </Typography>

            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "10px", laptop: "15px" },
                  color: "white",
                  fontWeight: "700",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineClamp: 2,
                }}
              >
                {item?.betting_bet_condition}
              </Typography>
              <Typography
                sx={{
                  fontSize: { laptop: "10px", mobile: "0" },
                  color: "white",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                ({moment(item?.betDate).format("DD-MM-YYYY")})
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              background: item?.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
              paddingX: "2px",
              width: { mobile: "25%", laptop: "20%" },
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: { laptop: "12px", mobile: "8px" },
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Profit/Loss
              </Typography>
              <StyledImage
                src={item.sessionProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                sx={{
                  width: { laptop: "25px", mobile: "15px" },
                  height: { laptop: "12px", mobile: "8px" },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
              >
                {Number(item.sessionProfitLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {Number(item.sessionProfitLoss).toFixed(2)}
                  </>
                ) : (
                  Number(item.sessionProfitLoss).toFixed(2)
                )}
                {/* {Number(item.sessionProfitLoss).toFixed(2)} */}
              </Typography>
              <StyledImage
                src={ArrowDown}
                sx={{
                  width: { laptop: "20px", mobile: "10px" },
                  height: { laptop: "10px", mobile: "6px" },
                  transform:
                    selectedId?.betId === item?.betid
                      ? "rotate(90deg)"
                      : "rotate(270deg)",
                }}
              />
            </Box>
          </Box>
        </Box>
        {selectedId?.betId === item?.betid && matchesMobile && (
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <SessionBetHistory
              mark
              mark2
              betHistory={true}
              betData={sessionBetData}
              admin
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
