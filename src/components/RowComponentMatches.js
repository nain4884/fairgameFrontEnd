import { memo } from "react";
import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import moment from "moment";
import { StyledImage } from ".";
import { ArrowDown } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import SessionComponentMatches from "./SessionComponentMatches";
import SessionBetSeperate from "./sessionBetSeperate";
import AllRateSeperate from "./AllRateSeperate";
import AllUserListSeparate from "./AllUserListSeparate";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RowComponentMatches = ({
  item,
  index,
  selectedId,
  betData,
  sessionBetData,
  sessionBets,
  getBetReport,
  user,
  userProfitLoss,
  getUserProfitLoss,
}) => {
  const [showBets, setShowBets] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showSessionBets, setShowSessionBets] = useState(false);
  const [showListOfUsers, setShowListOfUsers] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const [activeUser, setActiveUser] = useState(auth);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  useEffect(() => {
    if (auth) {
      setActiveUser(auth?.user);
    }
  }, [auth]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          if (!Object.keys(activeUser).length) {
            if (selectedId?.id === item?.matchId) {
              setShowListOfUsers((prev) => !prev);
            } else {
              setShowListOfUsers(true);
              getUserProfitLoss(item?.matchId);
              getBetReport({
                eventType: item?.eventType,
                match_id: item?.matchId,
                type: "",
                betId: "",
                sessionBet: false,
              });
            }
          }
        }}
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
          {user === "admin" && (
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform:
                  selectedId?.id === item?.matchId && showListOfUsers
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
          {/* <StyledImage
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
            /> */}
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            // if (selectedId.type === "all_bet") {
            //   setSelectedId((prev) => ({
            //     ...prev,
            //     type: "",
            //     betId: "",
            //     sessionBet: false,
            //   }));
            // } else {
            if (
              selectedId?.id === item?.matchId &&
              selectedId?.type === "all_bet"
            ) {
              setShowBets((prev) => !prev);
            } else {
              setShowBets(true);
              getBetReport({
                eventType: item?.eventType,
                match_id: item?.matchId,
                type: "all_bet",
                betId: "",
                sessionBet: false,
              });
            }
            // }
          }}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform:
                  selectedId?.id === item?.matchId &&
                  selectedId?.type === "all_bet" &&
                  showBets
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            // if (selectedId?.type === "session_bet") {
            //   setSelectedId((prev) => ({
            //     ...prev,
            //     type: "",

            //     betId: "",
            //     sessionBet: false,
            //   }));
            // } else {
            if (
              selectedId?.id === item?.matchId &&
              selectedId?.type === "session_bet"
            ) {
              setShowSessions((prev) => !prev);
            } else {
              setShowSessions(true);
              getBetReport({
                eventType: item?.eventType,
                match_id: item?.matchId,
                type: "session_bet",
                betId: "",
                sessionBet: false,
              });
            }
            // }
          }}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform:
                  selectedId?.id === item?.matchId &&
                  selectedId?.type === "session_bet" &&
                  showSessions
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
      </Box>
      {selectedId?.id === item?.matchId && (
        <>
          {showListOfUsers && (
            <>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "99%" },
                  marginTop: { mobile: ".25vh" },
                  marginLeft: { laptop: "1%" },
                  display: "flex",
                  flexDirection: { laptop: "row", mobile: "column" },
                }}
              >
                <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                      // maxHeight: "51vh",
                      overflow: "hidden",
                      // overflowY: "auto",
                      marginY: { mobile: ".2vh", laptop: "1vh" },
                      padding: 0.2,
                    }}
                  >
                    {userProfitLoss?.length > 0 &&
                      userProfitLoss?.map((profitLoss, index) => {
                        return (
                          <AllUserListSeparate
                            key={index}
                            item={profitLoss}
                            index={index + 1}
                            matchId={item?.matchId}
                            userId={item?.userId}
                            showListOfUsers={showListOfUsers}
                            getBetReport={getBetReport}
                            sessionBetData={sessionBetData}
                            sessionBets={sessionBets}
                            user={user}
                          />
                        );
                      })}
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {selectedId?.type === "all_bet" && showBets && (
            <>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "96%" },
                  marginTop: { mobile: ".25vh" },
                  marginLeft: { laptop: "4%" },
                  display: "flex",
                  flexDirection: { laptop: "row", mobile: "column" },
                }}
              >
                <AllRateSeperate
                  betHistory={false}
                  count={betData?.length}
                  allBetsData={betData}
                  profit
                />
              </Box>
              <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>
            </>
          )}
          {selectedId?.type === "session_bet" && showSessions && (
            <Box
              sx={{
                width: { mobile: "100%", laptop: "96%" },
                marginTop: { mobile: ".25vh" },
                marginLeft: { laptop: "4%" },
                display: "flex",
                flexDirection: { laptop: "row", mobile: "column" },
              }}
            >
              <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
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
                        <SessionComponentMatches
                          key={index}
                          item={item}
                          index={index + 1}
                          showSessionBets={showSessionBets}
                          setShowSessionBets={setShowSessionBets}
                          getBetReport={getBetReport}
                          selectedId={selectedId}
                          sessionBetData={sessionBetData}
                        />
                      );
                    })}
                </Box>
                {selectedId?.betId !== "" &&
                  !matchesMobile &&
                  showSessionBets && (
                    <Box
                      sx={{
                        width: {
                          mobile: "100%",
                          laptop: "49%",
                          tablet: "100%",
                        },
                      }}
                    >
                      <SessionBetSeperate
                        betHistory={false}
                        allBetsData={sessionBetData}
                        profit
                        isArrow={true}
                      />
                    </Box>
                  )}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(RowComponentMatches);
