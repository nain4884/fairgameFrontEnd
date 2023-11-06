import { useTheme } from '@emotion/react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import ModalMUI from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FullAllBets from '../../components/FullAllBets';
import CustomLoader from '../../components/helper/CustomLoader';
import { Background } from '../../components/index';
import '../../components/index.css';
import { SocketContext } from '../../context/socketContext';
import { setRole } from '../../newStore';
import {
  setAllBetRate,
  setAllSessionBets,
  setMultiSelectedMatch,
  setRefreshForBets,
} from '../../newStore/reducers/matchDetails';
import BookMarketer from './matches/BookMaketer';
import Odds from './matches/Odds';
import SessionMarket from './matches/SessionMarket';
import UserProfitLoss from './matches/UserProfitLoss';

const MatchSubmit = ({ }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('laptop'));
  const { socketMicro } = useContext(SocketContext);
  const { axios } = setRole();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state?.currentUser);
  const matchIds = location?.state?.matchIds;
  const marketIds = location?.state?.marketIds;
  const [matchData, setMatchData] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [IObets, setIObtes] = useState([]);
  const [mode, setMode] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popData, setPopData] = useState();
  const [showUserProfitLoss, setShowUserProfitLoss] = useState(false);
  const [storedMatchid, setStoredMatchId] = useState('');
  const [manualRateHttp, setManualRateHttp] = useState([]);

  const { multiSelectedMatches, allBetRates, allSessionBets, refreshForBets } =
    useSelector((state) => state?.matchDetails);

  // matchIds

  useEffect(() => {
    if (multiSelectedMatches) {
      console.log(multiSelectedMatches, 'multiSelectedMatches');
      setMatchData(multiSelectedMatches);
    }

    if (allBetRates) {
      setIObtes(allBetRates);
    }
    if (allSessionBets) {
      setSessionBets(allSessionBets);
    }
  }, [multiSelectedMatches, allBetRates, allSessionBets]);

  useEffect(() => {
    // alert(JSON.stringify(matchIds))
    if (matchIds !== undefined) {
      getAllBetsData();
      getThisMatch();
    }
  }, [matchIds]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketIds) {
        socketMicro.on('connect', () => {
          for (var index = 0; index < marketIds.length; index++) {
            socketMicro.emit('init', { id: marketIds[index] });
            // setInterval(() => {
            //   socketMicro.emit('init', { id: marketIds[index] });
            // }, 3000);
            socketMicro.on('reconnect', () => {
              socketMicro.emit('init', { id: marketIds[index] });
            });
          }
        });

        socketMicro.on('connect_error', (event) => { });

        for (var i = 0; i < marketIds?.length; i++) {
          (function (i) {
            socketMicro.emit('init', { id: marketIds[i] });

            // setInterval(() => {
            //   socketMicro.emit('init', { id: marketIds[i] });
            // }, 3000);
            socketMicro.on('reconnect', () => {
              socketMicro.emit('init', { id: marketIds[i] });
            });
            socketMicro.on(`session${marketIds[i]}`, (val) => {
              if (val !== null) {
                var newVal = val?.map((v) => ({
                  bet_condition: v?.RunnerName,
                  betStatus: 0,
                  sessionBet: true,
                  no_rate: v?.LayPrice1,
                  yes_rate: v?.BackPrice1,
                  rate_percent: `${v?.LaySize1}-${v?.BackSize1}`,
                  suspended: v?.GameStatus,
                  selectionId: v?.SelectionId,
                }));

                setMatchData((prevMatchData) => {
                  return prevMatchData.map((item) => {
                    if (item?.marketId === marketIds[i]) {
                      // Merge the filteredNewVal with the currentMatch bettings array
                      const data = item.bettings?.map((betting) => {
                        var selectedData =
                          newVal?.length > 0 &&
                          newVal?.find(
                            (data) => data?.selectionId === betting?.selectionId
                          );
                        if (selectedData && selectedData !== undefined) {
                          return {
                            ...betting,
                            bet_condition: selectedData?.bet_condition,
                            no_rate: selectedData?.no_rate,
                            yes_rate: selectedData?.yes_rate,
                            rate_percent: selectedData?.rate_percent,
                            suspended: selectedData?.suspended,
                            selectionId: selectedData?.selectionId,
                          };
                        }
                        if (betting?.selectionId !== null) {
                          return {
                            ...betting,
                            bet_condition: betting?.bet_condition,
                            no_rate: 0,
                            yes_rate: 0,
                            rate_percent: betting?.rate_percent,
                            suspended: '',
                            selectionId: betting?.selectionId,
                          };
                        }
                        return betting;
                      });

                      return {
                        ...item,
                        bettings: data,
                      };
                    }
                    return item;
                  });
                });
              }

              // dispatch(setSessionOddsLive(body));
            });

            socketMicro.on(`matchOdds${marketIds[i]}`, (val) => {
              // matchodds Market live and stop disable condition
              if (val !== null) {
                if (val.length === 0) {
                  socketMicro.emit('disconnect_market', {
                    id: marketIds[i],
                  });
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item?.marketId === marketIds[i]) {
                        return {
                          ...item,
                          matchOddsLive: [], // Add the new array property with an empty array
                        };
                      }
                      return item;
                    });
                  });
                  // }
                } else {
                  // dispatch(setMatchOddsLive(val[0]));
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item?.marketId === marketIds[i]) {
                        return {
                          ...item,
                          matchOddsLive: val[0], // Add the new array property with array
                        };
                      }
                      return item;
                    });
                  });
                  if (val[0]?.status === 'CLOSED') {
                    socketMicro.emit('disconnect_market', {
                      id: marketIds[i],
                    });
                    setMatchData((prevMatchData) => {
                      return prevMatchData.map((item) => {
                        if (item?.marketId === marketIds[i]) {
                          return {
                            ...item,
                            matchOddsLive: [], // Add the new array property with an empty array
                          };
                        }
                        return item;
                      });
                    });
                  }
                }
              }
            });

            socketMicro.on(`bookmaker${marketIds[i]}`, (val) => {
              if (val !== null) {
                if (val.length > 0) {
                  setMatchData((prevMatchData) => {
                    return prevMatchData.map((item) => {
                      if (item?.marketId === marketIds[i]) {
                        return {
                          ...item,
                          bookmakerLive: val[0], // Add the new array property with an empty array
                        };
                      }
                      return item;
                    });
                  });
                }
              }
            });
          })(i);
        }
      } else {
        for (var k = 0; k < marketIds.length; k++) {
          (function (k) {
            setMatchData((prevMatchData) => {
              return prevMatchData.map((item) => {
                if (item.marketId === marketIds[k]) {
                  return {
                    ...item,
                    matchOddsLive: [], // Add the new array property with an empty array
                    bookmakerLive: [],
                  };
                }
                return item;
              });
            });
          })(k);
        }
      }
    } catch (e) {
      console.log('error', e);
    }
    return () => {
      for (var j = 0; j < marketIds?.length; j++) {
        (function (j) {
          socketMicro?.emit('disconnect_market', {
            id: marketIds[j],
          });
          setMatchData((prevMatchData) => {
            return prevMatchData.map((item) => {
              if (item.marketId === marketIds[j]) {
                return {
                  ...item,
                  matchOddsLive: [], // Add the new array property with an empty array 
                  bookmakerLive: [],
                };
              }
              return item;
            });
          });
        })(j);
      }
    };
  }, [socketMicro, marketIds]);

  async function getThisMatch() {
    let payload = {
      idArray: matchIds,
    };
    try {
      setLoading(true);
      let response = await axios.post(
        `/game-match/multipleMatchDetail`,
        payload
      );
      // setMatchData(response?.data?.data);
      const newData = response?.data?.data || [];
      const updatedData = newData?.map((element) => {
        if (element?.bettings !== null) {
          const updatedBettings = element?.bettings?.map((bet) => {
            if (bet?.selectionId !== null) {
              return { ...bet, yes_rate: 0, no_rate: 0, suspended: '' };
            }
            return bet;
          });
          return { ...element, bettings: updatedBettings };
        }
        return element;
      });
      dispatch(setMultiSelectedMatch(updatedData));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      setLoading(false);
      console.log('response', e.response.data);
    }
  }

  async function getAllBetsData() {
    let payload = {
      match_id: matchIds,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);

      setIObtes(data?.data?.data);
      dispatch(setAllBetRate(data?.data?.data));
      const bets = data?.data?.data?.filter(
        (b) =>
          ![
            'MATCH ODDS',
            'BOOKMAKER',
            'MANUAL BOOKMAKER',
            'QuickBookmaker0',
            'QuickBookmaker1',
            'QuickBookmaker2',
          ].includes(b?.marketType)
      );
      setSessionBets(bets || []);
      dispatch(setAllSessionBets(bets));
      setTimeout(() => {
        dispatch(setRefreshForBets(false));
      }, 1000);
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        dispatch(setRefreshForBets(false));
      }, 1000);
    }
  }

  const handleClicked = (matchId) => {
    try {
      setStoredMatchId(matchId);
      setShowUserProfitLoss(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (matchIds) {
      let payload = {
        idArray: matchIds,
      };
      const fetchManualRate = async () => {
        try {
          const { data } = await axios.post(
            '/betting/getMultipleManualRate',
            payload
          );
          console.log('manualRate', data);
          setManualRateHttp(data?.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchManualRate();

      const intervalId = setInterval(fetchManualRate, 300);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  useEffect(() => {
    if (refreshForBets) {
      getAllBetsData();
    }
  }, [refreshForBets]);

  return (
    <Background>
      {loading ? (
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomLoader text="" />
        </Box>
      ) : (
        <>
          {location?.state?.match == 3 && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  // flexDirection: "row",
                  flexDirection: { matchesMobile: 'column', laptop: 'row' },
                  flex: 1,
                  height: '100%',
                  marginLeft: '0.5%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                >
                  {matchData?.length > 0 &&
                    matchData?.map((item, index) => {
                      let manualSessionHttp = {};
                      if (manualRateHttp.hasOwnProperty(item?.id)) {
                        manualSessionHttp = manualRateHttp[item?.id];
                      }

                      let IObetsData = IObets?.filter(
                        (element) => element?.match_id === item?.id
                      );
                      let sessionBetsData = sessionBets?.filter(
                        (element) => element?.match_id === item?.id
                      );

                      return (
                        <>
                          {index === 0 ? (
                            <>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  width: '100%',
                                }}
                              >
                                <Box
                                  sx={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    minHeight: '100px',
                                    display: 'flex',
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: '16px',
                                      width: '100%',
                                      color: 'white',
                                      fontWeight: '700',
                                      paddingTop: '2%',
                                      alignSelf: 'start',
                                    }}
                                  >
                                    {item?.teamA} V/S {item?.teamB}
                                    <Button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleClicked(item?.id);
                                      }}
                                      sx={{
                                        backgroundColor: '#F8C851',
                                        fontSize: '10px',
                                        color: 'black',
                                        fontWeight: '700',
                                        float: 'right',
                                        border: ' 1px solid white',
                                        marginBottom: '2px',
                                        alignSelf: 'start',
                                        '&:hover': {
                                          backgroundColor: '#F8C851',
                                        },
                                      }}
                                    >
                                      User Profit Loss
                                    </Button>
                                  </Typography>
                                  {item?.apiMatchActive && (
                                    <Odds
                                      currentMatch={item}
                                      matchOddsLive={item?.matchOddsLive}
                                      data={
                                        item?.matchOddsLive?.runners?.length > 0
                                          ? item?.matchOddsLive?.runners
                                          : []
                                      }
                                      typeOfBet={'Match Odds'}
                                    />
                                  )}
                                  {manualSessionHttp?.manualBookRate?.map(
                                    (bookmaker) => {
                                      if (bookmaker.betStatus === 1) {
                                        return (
                                          <Odds
                                            currentMatch={item}
                                            session={'manualBookMaker'}
                                            data={bookmaker}
                                            minBet={bookmaker?.min_bet || 0}
                                            maxBet={bookmaker?.max_bet || 0}
                                            typeOfBet={bookmaker?.marketName}
                                            matchOddsData={bookmaker}
                                          />
                                        );
                                      }
                                    }
                                  )}
                                  {/* {item?.manualBookMakerActive && (
                                  <Odds
                                    currentMatch={item}
                                    data={item}
                                    manualBookmakerData={matchOddsDataTemp}
                                    typeOfBet={"Quick Bookmaker"}
                                  />
                                )} */}
                                  {manualSessionHttp?.manualBookRate?.map(
                                    (bookmaker) => {
                                      if (bookmaker.betStatus === 1) {
                                        return (
                                          <Odds
                                            currentMatch={item}
                                            session={'manualBookMaker'}
                                            data={bookmaker}
                                            minBet={bookmaker?.min_bet || 0}
                                            maxBet={bookmaker?.max_bet || 0}
                                            typeOfBet={bookmaker?.marketName}
                                            matchOddsData={bookmaker}
                                          />
                                        );
                                      }
                                    }
                                  )}
                                  {item?.apiBookMakerActive && (
                                    <BookMarketer
                                      currentMatch={item}
                                      bookmakerLive={item?.bookmakerLive}
                                      data={
                                        item?.bookmakerLive?.runners?.length > 0
                                          ? item?.bookmakerLive?.runners
                                          : []
                                      }
                                    />
                                  )}

                                  {item?.manualSessionActive && (
                                    <SessionMarket
                                      title={'Quick Session Market'}
                                      // match={"multiple"}
                                      currentOdds={currentOdds}
                                      currentMatch={item}
                                      data={[]}
                                      sessionOffline={item?.sessionOffline}
                                      sessionExposer={
                                        manualSessionHttp?.sessionExposure
                                      }
                                      sessionBets={sessionBetsData?.length}
                                      setPopData={setPopData}
                                      popData={popData}
                                      sessionData={
                                        manualSessionHttp?.manualSessionRate
                                      }
                                      max={item?.manaual_session_max_bet}
                                      min={item?.manaual_session_min_bet}
                                    />
                                  )}
                                  {item?.apiSessionActive && (
                                    <SessionMarket
                                      title={'Session Market'}
                                      match={'multiple'}
                                      currentOdds={currentOdds}
                                      currentMatch={item}
                                      data={[]}
                                      sessionOffline={item?.sessionOffline}
                                      sessionExposer={
                                        manualSessionHttp?.sessionExposure
                                      }
                                      sessionBets={sessionBetsData?.length}
                                      setPopData={setPopData}
                                      popData={popData}
                                      max={item?.betfair_session_max_bet}
                                      min={item?.betfair_session_min_bet}
                                    />
                                  )}
                                </Box>
                                <Box
                                  sx={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    display: 'flex',
                                    minHeight: '100px',
                                    marginX: '0.5%',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      width: '100%',
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: '150px',
                                        marginY: '.75%',
                                        height: '35px',
                                      }}
                                    ></Box>
                                  </Box>
                                  <FullAllBets
                                    IObets={IObetsData}
                                    mode={mode}
                                    tag={false}
                                    setSelectedBetData={setSelectedBetData}
                                    selectedBetData={selectedBetData}
                                  />
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <>
                              <Box
                                sx={{
                                  maxWidth: matchesMobile ? '99%' : '49.5%',
                                  flex: matchesMobile ? '0 0 99%' : '0 0 49.5%',
                                  marginRight: '0.5%',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '16px',
                                    color: 'white',
                                    fontWeight: '700',
                                    paddingTop: '0.7%',
                                    alignSelf: 'start',
                                  }}
                                >
                                  {item?.teamA} V/S {item?.teamB}
                                  <Button
                                    onClick={() => handleClicked(item?.id)}
                                    sx={{
                                      backgroundColor: '#F8C851',
                                      fontSize: '10px',
                                      color: 'black',
                                      fontWeight: '700',
                                      float: 'right',
                                      border: ' 1px solid white',
                                      marginBottom: '2px',
                                      alignSelf: 'start',
                                      '&:hover': { backgroundColor: '#F8C851' },
                                    }}
                                  >
                                    User Profit Loss
                                  </Button>
                                </Typography>
                                {item?.apiMatchActive && (
                                  <Odds
                                    currentMatch={item}
                                    // matchOddsLive={matchOddsLive}
                                    matchOddsLive={item?.matchOddsLive}
                                    // data={[]}
                                    data={
                                      item?.matchOddsLive?.runners?.length > 0
                                        ? item?.matchOddsLive?.runners
                                        : []
                                    }
                                    typeOfBet={'Match Odds'}
                                  />
                                )}
                                {/* {item?.manualBookMakerActive && (
                              <Odds
                                currentMatch={item}
                                data={item}
                                manualBookmakerData={matchOddsDataTemp}
                                typeOfBet={"Quick Bookmaker"}
                                // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                              />
                            )} */}
                                {manualSessionHttp?.manualBookRate?.map(
                                  (bookmaker) => {
                                    if (bookmaker.betStatus === 1) {
                                      return (
                                        <Odds
                                          currentMatch={item}
                                          session={'manualBookMaker'}
                                          data={bookmaker}
                                          minBet={bookmaker?.min_bet || 0}
                                          maxBet={bookmaker?.max_bet || 0}
                                          typeOfBet={bookmaker?.marketName}
                                          matchOddsData={bookmaker}
                                        />
                                      );
                                    }
                                  }
                                )}
                                {item?.apiBookMakerActive && (
                                  <BookMarketer
                                    currentMatch={item}
                                    bookmakerLive={item?.bookmakerLive}
                                    data={
                                      item?.bookmakerLive?.runners?.length > 0
                                        ? item?.bookmakerLive?.runners
                                        : []
                                    }
                                  />
                                )}

                                {item?.manualSessionActive && (
                                  <SessionMarket
                                    title={'Quick Session Market'}
                                    // match={"multiple"}
                                    currentOdds={currentOdds}
                                    currentMatch={item}
                                    sessionExposer={
                                      manualSessionHttp?.sessionExposure
                                    }
                                    sessionOffline={item?.sessionOffline}
                                    sessionBets={sessionBetsData?.length}
                                    setPopData={setPopData}
                                    popData={popData}
                                    sessionData={
                                      manualSessionHttp?.manualSessionRate
                                    }
                                    max={item?.manaual_session_max_bet}
                                    min={item?.manaual_session_min_bet}
                                  />
                                )}
                                {item?.apiSessionActive && (
                                  <SessionMarket
                                    title={'Session Market'}
                                    match={'multiple'}
                                    currentOdds={currentOdds}
                                    currentMatch={item}
                                    sessionExposer={
                                      manualSessionHttp?.sessionExposure
                                    }
                                    sessionOffline={item?.sessionOffline}
                                    sessionBets={sessionBetsData?.length}
                                    setPopData={setPopData}
                                    popData={popData}
                                    max={item?.betfair_session_max_bet}
                                    min={item?.betfair_session_min_bet}
                                  />
                                )}
                                <FullAllBets
                                  tag={true}
                                  IObets={IObetsData}
                                  setSelectedBetData={setSelectedBetData}
                                  selectedBetData={selectedBetData}
                                />
                              </Box>
                            </>
                          )}
                        </>
                      );
                    })}
                </Box>
              </Box>
              <ModalMUI
                open={showUserProfitLoss}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignSelf: 'center',
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: 'center',
                      width: { mobile: '90%', laptop: '50%' },
                    }}
                  >
                    <UserProfitLoss
                      title={'User Profit Loss'}
                      matchId={storedMatchid}
                      setShowUserProfitLoss={setShowUserProfitLoss}
                      single={'multiple'}
                    />
                  </Box>
                </Box>
              </ModalMUI>
            </>
          )}

          {(location?.state?.match === 4 || location?.state?.match === 2) && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { matchesMobile: 'column', laptop: 'row' },
                  flex: 1,
                  height: '100%',
                  // marginX: "0.5%",
                  marginLeft: '0.5%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                >
                  {matchData?.length > 0 &&
                    matchData?.map((item, index) => {
                      let manualSessionHttp = {};
                      if (manualRateHttp.hasOwnProperty(item?.id)) {
                        manualSessionHttp = manualRateHttp[item?.id];
                      }

                      let IObetsData = IObets?.filter(
                        (element) => element?.match_id === item?.id
                      );
                      let sessionBetsData = sessionBets?.filter(
                        (element) => element?.match_id === item?.id
                      );
                      console.log('sdsdfsf', item, index);
                      return (
                        <>
                          <Box
                            key={item?.id}
                            sx={{
                              maxWidth: matchesMobile ? '99%' : '49.5%',
                              flex: matchesMobile ? '0 0 99%' : '0 0 49.5%',
                              marginRight: matchesMobile ? '0%' : '0.5%',
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: '700',
                                paddingTop: '0.7%',
                                alignSelf: 'start',
                              }}
                            >
                              {item?.teamA} V/S {item?.teamB}
                              <Button
                                onClick={() => handleClicked(item?.id)}
                                sx={{
                                  backgroundColor: '#F8C851',
                                  fontSize: '10px',
                                  color: 'black',
                                  fontWeight: '700',
                                  float: 'right',
                                  border: ' 1px solid white',
                                  marginBottom: '2px',
                                  alignSelf: 'start',
                                  '&:hover': { backgroundColor: '#F8C851' },
                                }}
                              >
                                User Profit Loss
                              </Button>
                            </Typography>

                            {item?.apiMatchActive && (
                              <Odds
                                currentMatch={item}
                                matchOddsLive={item?.matchOddsLive}
                                data={
                                  item.matchOddsLive?.runners?.length > 0
                                    ? item.matchOddsLive?.runners
                                    : []
                                }
                                typeOfBet={'Match Odds'}
                              />
                            )}
                            {/* {item?.manualBookMakerActive && (
                          <Odds
                            currentMatch={item}
                            data={item}
                            manualBookmakerData={matchOddsDataTemp}
                            typeOfBet={"Quick Bookmaker"}
                          />
                        )} */}
                            {manualSessionHttp?.manualBookRate?.map(
                              (bookmaker) => {
                                if (bookmaker.betStatus === 1) {
                                  return (
                                    <Odds
                                      key={bookmaker?.id}
                                      currentMatch={item}
                                      session={'manualBookMaker'}
                                      data={bookmaker}
                                      minBet={bookmaker?.min_bet || 0}
                                      maxBet={bookmaker?.max_bet || 0}
                                      typeOfBet={bookmaker?.marketName}
                                      matchOddsData={bookmaker}
                                    />
                                  );
                                }
                              }
                            )}

                            {item?.apiBookMakerActive && (
                              <BookMarketer
                                currentMatch={item}
                                bookmakerLive={item?.bookmakerLive}
                                data={
                                  item?.bookmakerLive?.runners?.length > 0
                                    ? item?.bookmakerLive?.runners
                                    : []
                                }
                              />
                            )}

                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={'Quick Session Market'}
                                // match={"multiple"}
                                currentMatch={item}
                                currentOdds={currentOdds}
                                sessionOffline={item?.sessionOffline}
                                sessionExposer={
                                  manualSessionHttp?.sessionExposure
                                }
                                sessionBets={sessionBetsData?.length}
                                sessionData={
                                  manualSessionHttp?.manualSessionRate
                                }
                                setPopData={setPopData}
                                popData={popData}
                                max={item?.manaual_session_max_bet}
                                min={item?.manaual_session_min_bet}
                              />
                            )}
                            {item?.apiSessionActive && (
                              <SessionMarket
                                title={'Session Market'}
                                match={'multiple'}
                                currentMatch={item}
                                currentOdds={currentOdds}
                                sessionOffline={item?.sessionOffline}
                                sessionExposer={
                                  manualSessionHttp?.sessionExposure
                                }
                                sessionBets={sessionBetsData?.length}
                                setPopData={setPopData}
                                popData={popData}
                                max={item?.betfair_session_max_bet}
                                min={item?.betfair_session_min_bet}
                              />
                            )}
                            <FullAllBets
                              tag={true}
                              IObets={IObetsData}
                              setSelectedBetData={setSelectedBetData}
                              selectedBetData={selectedBetData}
                            />
                          </Box>
                        </>
                      );
                    })}
                </Box>
              </Box>
              <ModalMUI
                open={showUserProfitLoss}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignSelf: 'center',
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: 'center',
                      width: { mobile: '90%', laptop: '50%' },
                    }}
                  >
                    <UserProfitLoss
                      title={'User Profit Loss'}
                      matchId={storedMatchid}
                      setShowUserProfitLoss={setShowUserProfitLoss}
                      single={'multiple'}
                    />
                  </Box>
                </Box>
              </ModalMUI>
            </>
          )}
        </>
      )}
    </Background>
  );
};

export default MatchSubmit;
