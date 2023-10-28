import { TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../components/index.css";
import { toast } from "react-toastify";
import { currencyFormatter } from "./helper/helper";
import { setRole } from "../newStore";
import NotificationModal from "./NotificationModal";
const FastTimePlaceBet = ({
  session,
  setFastAmount,
  selectedValue,
  setShowFastTimeBox,
  fromOdds,
  selectedFastAmount,
  typeOfBet,
  matchOddsData,
  data,
}) => {
  const { axios } = setRole();
  const { geoLocation } = useSelector((state) => state.auth);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const [canceled, setCanceled] = useState({
    value: false,
    msg: "",
    loading: false,
    type: false,
  });

  const { matchButtonData, sessionButtonData } = useSelector(
    (state) => state?.matchDetails
  );
  const [matchButtonList, setMatchButtonList] = useState(matchButtonData);
  const [sessionButtonList, setSessionButtonList] = useState(sessionButtonData);

  const myDivRef = useRef(null);

  useEffect(() => {
    if (!fromOdds) {
      // scrollToBottom();
      scrollToFullDiv();
      setMatchButtonList(matchButtonData);
      setSessionButtonList(sessionButtonData);
    }
  }, [selectedValue, fromOdds]);

  const [ip, setIP] = useState(geoLocation);
  useEffect(() => {
    if (geoLocation) {
      setIP(geoLocation);
    }
  }, [geoLocation]);

  const scrollToFullDiv = () => {
    if (myDivRef.current) {
      const { scrollTop, offsetHeight, scrollHeight } = myDivRef.current;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition < scrollHeight) {
        myDivRef.current.scrollTop = scrollHeight;
      }
    }
  };

  const handleAmountClick = async (payload, session, odds, teamSuspend) => {
    if ([null, 0, "", "0"].includes(odds) || odds <= 0) {
      setCanceled({
        value: true,
        msg: "Market Suspended",
        loading: false,
        type: false,
      });
      setTimeout(() => {
        setCanceled({
          value: false,
          msg: "",
          loading: false,
          type: false,
        });
      }, 1500);
      return;
    }
    try {
      setCanceled({
        value: true,
        msg: "Rate changed",
        loading: true,
        type: false,
      });
      let newPayload = {
        ...payload,
        country: ip?.country_name || null,
        ip_address: ip?.IPv4 || null,
      };
      let response = await axios.post(`/betting/placeBet`, newPayload);
      console.log("responseresponse", response);
      setCanceled({
        value: true,
        msg: response?.data?.message,
        loading: false,
        type: true,
      });
      setTimeout(() => {
        setCanceled({
          value: false,
          msg: "",
          loading: false,
          type: false,
        });
      }, 1500);
    } catch (e) {
      console.log(e);
      setCanceled({
        value: true,
        msg: e.response.data.message,
        loading: false,
        type: false,
      });
      setTimeout(() => {
        setCanceled({
          value: false,
          msg: "",
          loading: false,
          type: false,
        });
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      if (session === "sessionOdds") {
        setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
      } else if (session === "manualBookMaker") {
        setFastAmount((prev) => ({ ...prev, [typeOfBet]: 0 }));
      } else if (session === "bookmaker") {
        setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
      }
    } else {
      if (Number(value) <= 500000) {
        if (session === "sessionOdds") {
          setFastAmount((prev) => ({ ...prev, sessionOdds: Number(value) }));
        } else if (session === "manualBookMaker") {
          setFastAmount((prev) => ({
            ...prev,
            [typeOfBet]: Number(value),
          }));
        } else if (session === "bookmaker") {
          setFastAmount((prev) => ({ ...prev, bookMaker: Number(value) }));
        }
      } else {
        toast.warning(
          `Value must be between less then 500000
          `
        );
      }
    }
  };

  console.log("matchOddsData", matchOddsData?.isSingle);

  return (
    <>
      {session === "manualBookMaker" && (
        <Box
          // ref={refs}
          ref={myDivRef}
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              border: "1px solid white",
              borderRadius: "5px",
              gap: 1,
              overflow: "hidden",
              width: "100%",
            },
          ]}
        >
          <Box
            sx={{
              background: "#F8C851",
              width: { mobile: "100%", laptop: "100%" },
              overflow: "hidden",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            {matchesMobile && (
              <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
            )}
            {
              <>
                {/* {matchOddsData?.isSingle === false || matchOddsData?.teamB_suspend !== "suspended" ? ( */}
                {matchOddsData?.isSingle === false ||
                (matchOddsData.teamA_suspend === null &&
                  matchOddsData.teamB_suspend === null) ? (
                  // ||
                  //   ((matchOddsData?.teamA_suspend === null || false) &&
                  //     (matchOddsData?.teamB_suspend === null || false))
                  <>
                    <Box
                      sx={{
                        // display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        width: { laptop: "49.1%", mobile: "48%" },
                        flex: "0 0 auto",
                        border: "1px solid #cc9f30",
                        padding: "0.5rem",
                        gap: { mobile: "3px", laptop: 1, tablet: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          ml: "6px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          {matchOddsData?.teamA}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          marginX: "2px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          gap: { mobile: "3px", laptop: 1, tablet: 1 },
                        }}
                      >
                        {matchButtonList.length > 0 &&
                          matchButtonList?.map((v, index) => (
                            <NumberData
                              key={index}
                              containerStyle={{
                                marginLeft: "2px",
                                flex: 1,
                                background:
                                  selectedFastAmount === v && "#FF4949",
                                borderRadius: "5px",
                                border: "2px solid white",
                              }}
                              value={v.value}
                              lable={v.lable}
                              type={"back"}
                              session={session}
                              betOnTeam={matchOddsData?.teamA}
                              teamSuspend={matchOddsData?.teamA_suspend}
                              odds={matchOddsData?.teamA_Back}
                              typeOfBet={typeOfBet}
                              placeIndex={
                                matchOddsData?.marketType === "QuickBookmaker0"
                                  ? 0
                                  : matchOddsData?.marketType ===
                                    "QuickBookmaker1"
                                  ? 1
                                  : 2
                              }
                              backgroundColor={"#A7DCFF"}
                              matchOddsData={matchOddsData}
                              handleAmountClick={handleAmountClick}
                            />
                          ))}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        // display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        width: { laptop: "49.1%", mobile: "48%" },
                        flex: "0 0 auto",
                        border: "1px solid #cc9f30",
                        padding: "0.5rem",
                        gap: { mobile: "3px", laptop: 1, tablet: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          ml: "6px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          {matchOddsData?.teamB}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          marginX: "2px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          gap: { mobile: "3px", laptop: 1, tablet: 1 },
                        }}
                      >
                        {matchButtonList.length > 0 &&
                          matchButtonList?.map((v, index) => (
                            <NumberData
                              key={index}
                              containerStyle={{
                                marginLeft: "2px",
                                flex: 1,
                                background:
                                  selectedFastAmount === v && "#FF4949",
                                borderRadius: "5px",
                                border: "2px solid white",
                              }}
                              value={v.value}
                              lable={v.lable}
                              type={"back"}
                              session={session}
                              betOnTeam={matchOddsData?.teamB}
                              teamSuspend={matchOddsData?.teamB_suspend}
                              odds={matchOddsData?.teamB_Back}
                              typeOfBet={typeOfBet}
                              placeIndex={
                                matchOddsData?.marketType === "QuickBookmaker0"
                                  ? 0
                                  : matchOddsData?.marketType ===
                                    "QuickBookmaker1"
                                  ? 1
                                  : 2
                              }
                              backgroundColor={"#A7DCFF"}
                              matchOddsData={matchOddsData}
                              handleAmountClick={handleAmountClick}
                            />
                          ))}
                      </Box>
                    </Box>
                    {matchOddsData?.teamC && (
                      <Box
                        sx={{
                          // display: "flex",
                          // marginTop: "15px",
                          marginX: "2px",
                          flexWrap: "wrap",
                          width: { laptop: "49.1%", mobile: "48%" },
                          flex: "0 0 auto",
                          border: "1px solid #cc9f30",
                          padding: "0.5rem",
                          marginTop: "6px",
                          gap: { mobile: "3px", laptop: 1, tablet: 1 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // marginTop: "15px",
                            ml: "6px",
                            flexWrap: "wrap",
                            maxWidth: "100%",
                            flex: 1,
                            // border: "1px solid black",
                            // padding: "0.5rem",
                            marginBottom: "5px",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: "bold",
                              width: "100%",
                            }}
                          >
                            {matchOddsData?.teamC}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            // marginTop: "15px",
                            marginX: "2px",
                            flexWrap: "wrap",
                            maxWidth: "100%",
                            flex: 1,
                            // border: "1px solid black",
                            // padding: "0.5rem",
                            gap: { mobile: "3px", laptop: 1, tablet: 1 },
                          }}
                        >
                          {matchButtonList.length > 0 &&
                            matchButtonList?.map((v, index) => (
                              <NumberData
                                key={index}
                                containerStyle={{
                                  marginLeft: "2px",
                                  flex: 1,
                                  background:
                                    selectedFastAmount === v && "#FF4949",
                                  borderRadius: "5px",
                                  border: "2px solid white",
                                }}
                                value={v.value}
                                lable={v.lable}
                                type={"back"}
                                session={session}
                                betOnTeam={matchOddsData?.teamC}
                                teamSuspend={matchOddsData?.teamC_suspend}
                                odds={matchOddsData?.teamC_Back}
                                typeOfBet={typeOfBet}
                                placeIndex={
                                  matchOddsData?.marketType ===
                                  "QuickBookmaker0"
                                    ? 0
                                    : matchOddsData?.marketType ===
                                      "QuickBookmaker1"
                                    ? 1
                                    : 2
                                }
                                backgroundColor={"#A7DCFF"}
                                matchOddsData={matchOddsData}
                                handleAmountClick={handleAmountClick}
                              />
                            ))}
                        </Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "50%",
                        flex: 1,
                        gap: { mobile: "3px", laptop: 1, tablet: 1 },
                      }}
                    >
                      {matchButtonList.length > 0 &&
                        matchButtonList?.map((v, index) => (
                          <NumberData
                            key={index}
                            containerStyle={{
                              marginLeft: "2px",
                              flex: 1,
                              background: selectedFastAmount === v && "#FF4949",
                              borderRadius: "5px",
                              border: "2px solid white",
                            }}
                            value={v.value}
                            lable={v.lable}
                            type={"back"}
                            session={session}
                            betOnTeam={
                              ![null, ""].includes(matchOddsData?.teamA_Back)
                                ? matchOddsData?.teamA
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB
                                : matchOddsData?.teamC
                            }
                            teamSuspend={
                              ![null, ""].includes(matchOddsData?.teamA_Back)
                                ? matchOddsData?.teamA_suspend
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB_suspend
                                : matchOddsData?.teamC_suspend
                            }
                            odds={
                              ![null, ""].includes(matchOddsData?.teamA_Back)
                                ? matchOddsData?.teamA_Back
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB_Back
                                : matchOddsData?.teamC_Back
                            }
                            typeOfBet={typeOfBet}
                            backgroundColor={"#A7DCFF"}
                            matchOddsData={matchOddsData}
                            placeIndex={
                              matchOddsData?.marketType === "QuickBookmaker0"
                                ? 0
                                : matchOddsData?.marketType ===
                                  "QuickBookmaker1"
                                ? 1
                                : 2
                            }
                            handleAmountClick={handleAmountClick}
                          />
                        ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // marginY: "8px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "50%",
                        flex: 1,
                        gap: { mobile: "3px", laptop: 1, tablet: 1 },
                      }}
                    >
                      {matchButtonList.length > 0 &&
                        matchButtonList?.map((v, index) => (
                          <NumberData
                            key={index}
                            containerStyle={{
                              marginLeft: "2px",
                              flex: 1,
                              background: selectedFastAmount === v && "#FF4949",
                              borderRadius: "5px",
                              border: "2px solid white",
                            }}
                            value={v.value}
                            lable={v.lable}
                            type={"lay"}
                            session={session}
                            betOnTeam={
                              ![null, ""].includes(matchOddsData?.teamA_lay)
                                ? matchOddsData?.teamA
                                : ![null, ""].includes(matchOddsData?.teamB_lay)
                                ? matchOddsData?.teamB
                                : matchOddsData?.teamC
                            }
                            teamSuspend={
                              ![null, ""].includes(matchOddsData?.teamA_lay)
                                ? matchOddsData?.teamA_suspend
                                : ![null, ""].includes(matchOddsData?.teamB_lay)
                                ? matchOddsData?.teamB_suspend
                                : matchOddsData?.teamC_suspend
                            }
                            odds={
                              ![null, ""].includes(matchOddsData?.teamA_lay)
                                ? matchOddsData?.teamA_lay
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB_lay
                                : matchOddsData?.teamC_lay
                            }
                            typeOfBet={typeOfBet}
                            backgroundColor={"#FFB5B5"}
                            matchOddsData={matchOddsData}
                            placeIndex={
                              matchOddsData?.marketType === "QuickBookmaker0"
                                ? 0
                                : matchOddsData?.marketType ===
                                  "QuickBookmaker1"
                                ? 1
                                : 2
                            }
                            handleAmountClick={handleAmountClick}
                          />
                        ))}
                    </Box>
                  </>
                )}
              </>
            }
          </Box>
        </Box>
      )}
      {session === "sessionOdds" && (
        <Box
          // ref={refs}
          ref={myDivRef}
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              border: "1px solid white",
              borderRadius: "5px",
              gap: 1,
              overflow: "hidden",
              width: "100%",
            },
          ]}
        >
          <Box
            sx={{
              background: "#F8C851",
              width: { mobile: "100%", laptop: "100%" },
              overflow: "hidden",
              display: "flex",

              // justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            {matchesMobile && (
              <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
            )}
            {
              <>
                <>
                  <Box
                    sx={{
                      display: "flex",
                      // marginTop: "15px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      gap: { mobile: "3px", laptop: 1, tablet: 1 },
                    }}
                  >
                    {sessionButtonList.length > 0 &&
                      sessionButtonList?.map((v, index) => (
                        <NumberData
                          key={index}
                          containerStyle={{
                            marginLeft: "2px",
                            flex: 1,
                            background: selectedFastAmount === v && "#FF4949",
                            borderRadius: "5px",
                            border: "2px solid white",
                          }}
                          value={v.value}
                          lable={v.lable}
                          type={"back"}
                          session={session}
                          teamSuspend={data?.suspended}
                          odds={data?.no_rate}
                          typeOfBet={typeOfBet}
                          backgroundColor={"#FFB5B5"}
                          matchOddsData={matchOddsData}
                          data={data}
                          placeIndex={2}
                          handleAmountClick={handleAmountClick}
                          setShowFastTimeBox={setShowFastTimeBox}
                        />
                      ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // marginY: "8px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      gap: { mobile: "3px", laptop: 1, tablet: 1 },
                    }}
                  >
                    {sessionButtonList.length > 0 &&
                      sessionButtonList?.map((v, index) => (
                        <NumberData
                          key={index}
                          containerStyle={{
                            marginLeft: "2px",
                            flex: 1,
                            background: selectedFastAmount === v && "#FF4949",
                            borderRadius: "5px",
                            border: "2px solid white",
                          }}
                          value={v.value}
                          lable={v.lable}
                          type={"lay"}
                          session={session}
                          teamSuspend={data?.suspended}
                          odds={data?.yes_rate}
                          typeOfBet={typeOfBet}
                          backgroundColor={"#A7DCFF"}
                          matchOddsData={matchOddsData}
                          data={data}
                          placeIndex={1}
                          handleAmountClick={handleAmountClick}
                          setShowFastTimeBox={setShowFastTimeBox}
                        />
                      ))}
                  </Box>
                </>
              </>
            }
          </Box>
        </Box>
      )}
      {canceled.value && (
        <NotificationModal
          open={canceled}
          handleClose={() =>
            setCanceled({
              value: false,
              msg: "",
              loading: false,
              type: false,
            })
          }
        />
      )}
    </>
  );
};

const NumberData = ({
  value,
  lable,
  typeOfBet,
  containerStyle,
  setFastAmount,
  setShowFastTimeBox,
  session,
  backgroundColor,
  type,
  betOnTeam,
  matchOddsData,
  // setFastAmountQuickBet,
  handleAmountClick,
  odds,
  setMinWidth,
  placeIndex,
  teamSuspend,
  data,
}) => {
  return (
    <Box
      onClick={() => {
        if (session === "sessionOdds") {
          const payload = {
            betId: data?.id,
            bet_condition: data?.bet_condition,
            bet_type: backgroundColor === "#A7DCFF" ? "yes" : "no",
            id: data?.match_id,
            marketType: typeOfBet,
            matchType: data?.matchType,
            odds: odds,
            place_index: placeIndex,
            po: placeIndex,
            rate_percent: data?.rate_percent,
            teamA_name: matchOddsData?.teamA,
            teamB_name: matchOddsData?.teamB,
            selectionId: data?.selectionId,
            stack: Number(value),
            stake: Number(value),
            sessionBet: true,
          };
          handleAmountClick(payload, session, odds, teamSuspend);
          // setShowFastTimeBox(false);
        } else if (session === "bookmaker") {
          setFastAmount((prev) => ({ ...prev, bookMaker: value }));
          setShowFastTimeBox(false);
        } else if (session === "manualBookMaker") {
          const payload = {
            betId: matchOddsData?.bet_id,
            betOn: betOnTeam,
            bet_type: type,
            id: matchOddsData?.match_id,
            marketType: typeOfBet,
            matchType: matchOddsData?.matchType,
            odds: odds,
            place_index: placeIndex,
            stack: Number(value),
            stake: Number(value),
            teamA_name: matchOddsData?.teamA,
            teamB_name: matchOddsData?.teamB,
            teamC_name: matchOddsData?.teamC,
            team_bet: betOnTeam,
          };
          handleAmountClick(payload, session, odds, teamSuspend);
        }
      }}
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: { laptop: "22%", mobile: setMinWidth == "no" ? "" : "47%" },
          background: `${backgroundColor}`,
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {currencyFormatter(lable)}
      </Typography>
    </Box>
  );
};
export default FastTimePlaceBet;
