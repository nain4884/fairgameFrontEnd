import { useEffect, useState, useContext } from "react"
import { Typography, Box } from "@mui/material";
import "../../components/index.css";
import { Background } from "../../components/index";
import AllBets from "../../components/AllBets";
import { useLocation } from "react-router-dom";
import Odds from "./matches/Odds";
import BookMarketer from "./matches/BookMaketer";
import SessionMarket from "./matches/SessionMarket";
import { setRole } from "../../newStore";
import { SocketContext } from "../../context/socketContext";

let matchOddsCount = 0;
const MatchSubmit = ({ }) => {
  const { socket, socketMicro } = useContext(SocketContext);
  const { axios } = setRole();
  const location = useLocation();
  const matchIds = location?.state?.matchIds;
  const [marketIds, setMarketIds] = useState([]);
  const [matchData, setMatchData] = useState([]);
  // matchIds
  useEffect(() => {
    if (matchIds !== undefined) {
      getThisMatch(matchIds);
      // getAllBetsData(matchId)
    }
  }, [matchIds]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && matchIds) {
        socketMicro.on("connect", () => {
          for (var i = 0; i < matchIds.length; i++) {
            socketMicro.emit("init", { id: matchIds[0] });
          }
          // socketMicro.emit("init", { id: marketId });
          // activateLiveMatchMarket();
          // setSessionLock(false)
        });

        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here

          // setMacthOddsLive([]);
          // setBookmakerLive([]);
          // setSessionLock(true)
          console.log("WebSocket connection failed:", event);
        });
        for (var i = 0; i < matchIds.length; i++) {
          socketMicro.emit("init", { id: matchIds[i] });
          // activateLiveMatchMarket();
          // socketMicro.on("bookMakerRateLive", (e) => {
          //   console.log("BookMaker", e);
          // });

          socketMicro.on("reconnect", () => {
            socketMicro.emit("init", { id: matchIds[i] });
            // activateLiveMatchMarket();
            // setSessionLock(false)
          });
        }
        // socketMicro.on(`session${marketId}`, (val) => {
        //   // console.log("currentMatchProfit 33:", val);

        //   if (val !== null && matchId === checkMctchId) {
        //     // console.warn("updatedBettings1 ", updatedBettings1);
        //     var newVal = val?.map((v) => ({
        //       bet_condition: v?.RunnerName,
        //       betStatus: 0,
        //       sessionBet: true,
        //       no_rate: v?.LayPrice1,
        //       yes_rate: v?.BackPrice1,
        //       rate_percent: `${v?.LaySize1}-${v?.BackSize1}`,
        //       suspended: v?.GameStatus,
        //       selectionId: v?.SelectionId,
        //     }));

        //     setCurrentMatch((currentMatch) => {
        //       if (currentMatch?.bettings?.length > 0) {
        //         const data = currentMatch?.bettings?.map((betting) => {
        //           var selectedData = newVal?.find(
        //             (data) => data?.selectionId === betting?.selectionId
        //           );
        //           if (selectedData !== undefined) {
        //             return {
        //               ...betting,
        //               bet_condition: selectedData?.bet_condition,
        //               no_rate: selectedData?.no_rate,
        //               yes_rate: selectedData?.yes_rate,
        //               rate_percent: selectedData?.rate_percent,
        //               suspended: selectedData?.suspended,
        //               selectionId: selectedData?.selectionId,
        //             };
        //           }
        //           return betting;
        //         });

        //         // Merge the filteredNewVal with the currentMatch bettings array

        //         return {
        //           ...currentMatch,
        //           bettings: data,
        //         };
        //       }
        //       return currentMatch;
        //     });
        //   }

        //   // dispatch(setSessionOddsLive(body));
        // });
        for (var i = 0; i < matchIds.length; i++) {
          socketMicro.on(`matchOdds${matchIds[i]}`, (val) => {

            // matchodds Market live and stop disable condition
            if (val !== null) {
              if (val.length === 0) {
                matchOddsCount += 1;
                if (matchOddsCount >= 3) {
                  socketMicro.emit("disconnect_market", {
                    id: matchIds[i],
                  });
                  // setMacthOddsLive([]);
                }
              } else {
                // dispatch(setMatchOddsLive(val[0]));
                // setMatchData()
                const updatedData = matchData.map(item => {
                  if (item.marketId === matchIds[i]) {
                    return {
                      ...item,
                      matchOddsLive: val[0]  // Add the new array property with an empty array
                    };
                  }
                  return item;
                });
                setMatchData(updatedData)
                // console.log(updatedData);
                // setMacthOddsLive(val[0]);// add
                if (val[0]?.status === "CLOSED") {
                  socketMicro.emit("disconnect_market", {
                    id: matchIds[i],
                  });
                  const updatedData = matchData.map(item => {
                    if (item.marketId === matchIds[i]) {
                      return {
                        ...item,
                        matchOddsLive: []  // Add the new array property with an empty array
                      };
                    }
                    return item;
                  });
                  setMatchData(updatedData)
                  // setMacthOddsLive([]);
                }
              }
            }
          });
        }
        // socketMicro.on(`bookmaker${marketId}`, (val) => {
        //   if (val !== null) {
        //     // console.log("val 222:", val);
        //     if (val.length > 0) {
        //       // dispatch(setBookMakerLive(val[0]));
        //       setBookmakerLive(val[0]);
        //     }
        //     setBookmakerLive([]);

        //   }
        // });
      } else {
        // setMacthOddsLive([]);
        // setBookmakerLive([]);
        // setSessionLock(false)
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      // socketMicro?.emit("disconnect_market", {
      //   id: marketId,
      // });
      // setMacthOddsLive([]);
      // setBookmakerLive([]);
      // setSessionLock(false)
    };
  }, [socketMicro, matchIds]);

  // useEffect(() => {
  //   try {
  //     if (socketMicro && socketMicro.connected && matchIds) {
  //       socketMicro.on("connect", () => {
  //         for (var i = 0; i < matchIds.length; i++) {
  //           socketMicro.emit("init", { id: matchIds[0] });
  //         }
  //         // socketMicro.emit("init", { id: marketId });
  //         // activateLiveMatchMarket();
  //         // setSessionLock(false)
  //       });

  //       socketMicro.on("connect_error", (event) => {
  //         // Handle the WebSocket connection error here

  //         // setMacthOddsLive([]);
  //         // setBookmakerLive([]);
  //         // setSessionLock(true)
  //         console.log("WebSocket connection failed:", event);
  //       });
  //       for (var i = 0; i < matchIds.length; i++) {
  //         socketMicro.emit("init", { id: matchIds[i] });
  //         // activateLiveMatchMarket();
  //         // socketMicro.on("bookMakerRateLive", (e) => {
  //         //   console.log("BookMaker", e);
  //         // });

  //         socketMicro.on("reconnect", () => {
  //           socketMicro.emit("init", { id: matchIds[i] });
  //           // activateLiveMatchMarket();
  //           // setSessionLock(false)
  //         });
  //       }
  //       for (var i = 0; i < matchIds.length; i++) {
  //         socketMicro.on(`matchOdds${matchIds[i]}`, (val) => {

  //           // matchodds Market live and stop disable condition
  //           if (val !== null) {
  //             if (val.length === 0) {
  //               matchOddsCount += 1;
  //               if (matchOddsCount >= 3) {
  //                 socketMicro.emit("disconnect_market", {
  //                   id: matchIds[i],
  //                 });
  //                 // setMacthOddsLive([]);
  //               }
  //             } else {
  //               // dispatch(setMatchOddsLive(val[0]));
  //               // setMatchData()
  //               const updatedData = matchData.map(item => {
  //                 if (item.marketId === matchIds[i]) {
  //                   return {
  //                     ...item,
  //                     matchOddsLive: val[0]  // Add the new array property with an empty array
  //                   };
  //                 }
  //                 return item;
  //               });
  //               setMatchData(updatedData)
  //               // console.log(updatedData);
  //               // setMacthOddsLive(val[0]);// add
  //               if (val[0]?.status === "CLOSED") {
  //                 socketMicro.emit("disconnect_market", {
  //                   id: matchIds[i],
  //                 });
  //                 const updatedData = matchData.map(item => {
  //                   if (item.marketId === matchIds[i]) {
  //                     return {
  //                       ...item,
  //                       matchOddsLive: []  // Add the new array property with an empty array
  //                     };
  //                   }
  //                   return item;
  //                 });
  //                 setMatchData(updatedData)
  //               }
  //             }
  //           }
  //         });
  //       }
  //     } else {
  //     }
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  //   return () => {
  //   };
  // }, [socketMicro, matchIds]);
  async function getThisMatch() {
    let payload = {
      idArray: matchIds,
    }
    try {
      let response = await axios.post(`/game-match/multipleMatchDetail`, payload);
      // alert(111)
      console.log("response :www", response?.data?.data);
      setMatchData(response?.data?.data);
      // let matchOddsDataTemp = response.data?.bettings?.filter(
      //   (element) => element.sessionBet === false
      // );

      // setManualBookmakerData(matchOddsDataTemp);

      //   setSessionExposure(response?.data?.sessionExposure);
      // setCurrentMatch({
      //   ...response.data,
      // });

      // dispatch(
      //   setSelectedMatch({
      //     ...response.data,
      //   })
      // );
      const ids = response?.data?.data.map(item => item.marketId);
      // alert(JSON.stringify(ids))
      setMarketIds(ids);
      // setMarketId(response.data.marketId);
      // setMatchDetail(response.data);
    } catch (e) {
      console.log("response", e.response.data);
    }
  }

  return (
    <Background>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        {matchData.map((item, index) => {
          let matchOddsDataTemp = item?.bettings?.filter(
            (element) => element.sessionBet === false
          );
          return <>
            <Box
              sx={{
                flex: 1,
                flexDirection: "column",
                minHeight: "100px",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "white",
                  fontWeight: "700",
                  paddingTop: "0.7%",
                  alignSelf: "start",
                }}
              >
                {item?.teamA} V/S {item?.teamB}
              </Typography>
              <Odds
                currentMatch={item}
                // matchOddsLive={matchOddsLive}
                matchOddsLive={item.matchOddsLive}
                data={[]}
                typeOfBet={"Match Odds"}
              />
              <BookMarketer
                currentMatch={item}
                // matchOddsLive={matchOddsLive}
                data={[]}
              />
              {item?.manualBookMakerActive && <Odds
                currentMatch={item}
                data={item}
                manualBookmakerData={matchOddsDataTemp}
                typeOfBet={"MANUAL BOOKMAKER"}
              // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
              />
              }
              <SessionMarket />
              <AllBets tag={true} />
            </Box>
            {index % 2 === 0 ? <Box sx={{ width: "10px" }} /> : null};
          </>
        })}
        {/* <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              paddingTop: "0.7%",
              alignSelf: "start",
            }}
          >
            INDIA V/S PAKISTAN
          </Typography>
          <Odds
            currentMatch={{}}
            // matchOddsLive={matchOddsLive}
            data={[]}
            typeOfBet={"Match Odds"}
          />
          <BookMarketer
            currentMatch={{}}
            // matchOddsLive={matchOddsLive}
            data={[]}
          />
          <SessionMarket />
          <AllBets tag={true} />
        </Box>
        <Box sx={{ width: "10px" }} />
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              paddingTop: "0.7%",
              alignSelf: "start",
            }}
          >
            INDIA V/S PAKISTAN 1
          </Typography>
          <Odds
            currentMatch={{}}
            // matchOddsLive={matchOddsLive}
            data={[]}
          />
          <BookMarketer
            currentMatch={{}}
            // matchOddsLive={matchOddsLive}
            data={[]}
          />
          <SessionMarket />
          <AllBets tag={true} />
        </Box> */}

      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        {location?.state?.match >= 3 && (
          <Box
            sx={{
              flex: 0.5,
              flexDirection: "column",
              minHeight: "100px",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                fontWeight: "700",
                paddingTop: "0.7%",
                alignSelf: "start",
              }}
            >
              INDIA V/S PAKISTAN
            </Typography>
            <Odds
              currentMatch={{}}
              // matchOddsLive={matchOddsLive}
              data={[]}
            />
            <BookMarketer
              currentMatch={{}}
              // matchOddsLive={matchOddsLive}
              data={[]}
            />
            <SessionMarket />
            <AllBets tag={true} />
          </Box>
        )}
        <Box sx={{ width: "10px" }} />
        {location?.state?.match == 4 && (
          <Box
            sx={{
              flex: 0.5,
              flexDirection: "column",
              display: "flex",
              minHeight: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                fontWeight: "700",
                paddingTop: "0.7%",
                alignSelf: "start",
              }}
            >
              INDIA V/S PAKISTAN
            </Typography>
            <Odds
              currentMatch={{}}
              // matchOddsLive={matchOddsLive}
              data={[]}
            />
            <BookMarketer
              currentMatch={{}}
              // matchOddsLive={matchOddsLive}
              data={[]}
            />
            <SessionMarket />
            <AllBets tag={true} />
          </Box>
        )}
      </Box>
    </Background>
  );
};

export default MatchSubmit;
