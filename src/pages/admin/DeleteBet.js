import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DeleteIcon } from '../../admin/assets';
import AddNotificationModal from '../../components/AddNotificationModal';
import FullAllBets from '../../components/FullAllBets';
import CustomLoader from '../../components/helper/CustomLoader';
import { Background, DailogModal } from '../../components/index';
import '../../components/index.css';
import { SocketContext } from '../../context/socketContext';
import { setRole } from '../../newStore';
import {
  setAllBetRate,
  setAllSessionBets,
  setManualBookmaker,
  setQuickSession,
  setRefreshForBets,
  setSelectedMatch,
  setSelectedSessionBettings,
} from '../../newStore/reducers/matchDetails';
import BookMarketer from './matches/BookMaketer';
import Odds from './matches/Odds';
import SessionMarket from './matches/SessionMarket';
import UserProfitLoss from './matches/UserProfitLoss';

let matchOddsCount = 0;
const DeleteBet = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('laptop'));
  const { socketMicro } = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const location = useLocation();
  const matchId = location?.state?.matchId;
  const { axios } = setRole();
  const [loadingDeleteBet, setLoadingDeleteBet] = useState(false);

  const [IOSinglebets, setSingleIObtes] = useState([]);
  const [marketId, setMarketId] = useState('');
  const { currentUser } = useSelector((state) => state?.currentUser);
  const {
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    allBetRates,
    allSessionBets,
    quickSession,
    selectedSessionBettings,
    refreshForBets,
  } = useSelector((state) => state?.matchDetails);
  const [mode, setMode] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [manualSessions, setManualSessions] = useState([]);
  const { currentOdd } = useSelector((state) => state?.expertMatchDetails);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [currentOdds, setCurrentOdds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popData, setPopData] = useState('');
  const [sessionExposerHttp, setSessionExposureHttp] = useState(0);
  const [sessionOff, setSessionOff] = useState([]);
  const [bookmakerHttp, setBookmakerHttp] = useState([]);
  const [localSelectedSessionBettings, setLocalSelectedSessionBettings] =
    useState([]);

  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const url = window.location.href;

  useEffect(() => {
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }

    if (sessionOffline) {
      setSessionOff(sessionOffline);
    }

    if (currentOdd) {
      setCurrentOdds(currentOdd);
    }

    if (allSessionBets) {
      setSessionBets(allSessionBets);
    }
    if (allBetRates) {
      setSingleIObtes(allBetRates);
    }

    if (selectedSessionBettings) {
      setLocalSelectedSessionBettings(selectedSessionBettings);
    }
  }, [
    selectedMatch,
    sessionOffline,
    manualBookmaker,
    allSessionBets,
    currentOdd,
    allBetRates,
    quickSession,
    selectedSessionBettings,
  ]);

  const debouncedSession = _.debounce((val) => {
    if (val !== null && matchId === checkMctchId) {
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

      setCurrentMatch((currentMatch) => {
        if (currentMatch?.bettings?.length > 0) {
          setLocalSelectedSessionBettings((prev) => {
            const data = prev?.map((betting) => {
              const selectedData = newVal?.find(
                (nv) => nv?.selectionId === betting?.selectionId
              );
              return {
                ...betting,
                bet_condition:
                  selectedData?.bet_condition || betting?.bet_condition,
                no_rate:
                  selectedData?.no_rate !== undefined
                    ? selectedData.no_rate
                    : 0,
                yes_rate:
                  selectedData?.yes_rate !== undefined
                    ? selectedData.yes_rate
                    : 0,
                rate_percent:
                  selectedData?.rate_percent || betting?.rate_percent,
                suspended: selectedData?.suspended || '',
                selectionId: selectedData?.selectionId || betting?.selectionId,
              };
            });
            dispatch(setSelectedSessionBettings(data));
            return data;
          });
          const data = currentMatch?.bettings?.map((betting) => {
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

          // Merge the filteredNewVal with the currentMatch bettings array

          return {
            ...currentMatch,
            bettings: data,
          };
        }
        return currentMatch;
      });
    }

    // dispatch(setSessionOddsLive(body));
  }, 300);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on('connect', () => {
          socketMicro.emit('init', { id: marketId });
          // activateLiveMatchMarket();
        });
        socketMicro.on('connect_error', (event) => {
          // Handle the WebSocket connection error here

          setMacthOddsLive([]);
          setBookmakerLive([]);
          console.log('WebSocket connection failed:', event);
        });

        socketMicro.emit('init', { id: marketId });

        socketMicro.on('reconnect', () => {
          socketMicro.emit('init', { id: marketId });
        });

        socketMicro.on(`session${marketId}`, debouncedSession);
        socketMicro.on(`matchOdds${marketId}`, (val) => {
          // matchodds Market live and stop disable condition
          if (val !== null) {
            if (val.length === 0) {
              matchOddsCount += 1;
              if (matchOddsCount >= 3) {
                socketMicro.emit('disconnect_market', {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            } else {
              setMacthOddsLive(val[0]);
              if (val[0]?.status === 'CLOSED') {
                socketMicro.emit('disconnect_market', {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            }
          }
        });
        socketMicro.on(`bookmaker${marketId}`, (val) => {
          if (val !== null) {
            if (val.length > 0) {
              setBookmakerLive(val[0]);
            } else {
              setBookmakerLive([]);
            }
          }
        });
      } else {
        setMacthOddsLive([]);
        setBookmakerLive([]);
      }
    } catch (e) {
      console.log('error', e);
    }
    return () => {
      socketMicro?.emit('disconnect_market', {
        id: marketId,
      });
      setMacthOddsLive([]);
      setBookmakerLive([]);
    };
  }, [marketId, socketMicro]);

  async function getThisMatch(id) {
    try {
      setLoading(true);
      const response = await axios.get(`/game-match/matchDetail/${id}`);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );

      let sessionDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet && element.selectionId !== null
      );

      let quickSessionDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet && element.selectionId === null
      );

      const updateLiveSesssion = sessionDataTemp?.map((v) => ({
        ...v,
        yes_rate: 0,
        no_rate: 0,
        suspended: '',
      }));

      dispatch(setQuickSession(quickSessionDataTemp));
      dispatch(setSelectedSessionBettings(updateLiveSesssion));

      dispatch(setManualBookmaker(matchOddsDataTemp));
      const newBody = {
        ...response.data,
      };
      // setCurrentMatch(newBody);
      const updatedNewData = newBody?.bettings?.map((v) => {
        if (v?.selectionId) {
          return { ...v, yes_rate: 0, no_rate: 0, suspended: '' };
        }
        return v;
      });

      dispatch(setSelectedMatch({ ...newBody, bettings: updatedNewData }));

      setMarketId(response.data.marketId);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log('response', e.response.data);
    }
  }

  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);
      setSingleIObtes(data?.data?.data);
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

  useEffect(() => {
    if (matchId !== undefined) {
      getThisMatch(matchId);
      getAllBetsData(matchId);
    }
  }, [matchId]);

  useEffect(() => {
    if (refreshForBets) {
      getAllBetsData(matchId);
    }
  }, [refreshForBets]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (matchId !== undefined) {
          getThisMatch(matchId);
          getAllBetsData(matchId);
          setVisible(false);
          setMode(false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleDeleteBet = async (value) => {
    let data = {
      deleteReason: value,
      placeBetId: selectedBetData,
      matchId: matchId,
    };
    try {
      setLoadingDeleteBet(true);
      let response = await axios.post(`/betting/deleteMultipleBet`, data);
      if (response) {
        setLoadingDeleteBet(false);
        setMode(false);
      }
    } catch (e) {
      setLoadingDeleteBet(false);
      console.log(e);
    }
  };

  useEffect(() => {
    if (matchId) {
      let payload = {
        matchId: matchId,
      };
      const fetchManualRate = async () => {
        try {
          const { data } = await axios.post('/betting/getManualRate', payload);
          setManualSessions(data?.data?.manualSessionRate);
          setBookmakerHttp(data?.data?.manualBookRate);
          setSessionExposureHttp(data?.data?.sessionExposure);
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
          {visible && selectedBetData.length > 0 && (
            <AddNotificationModal
              value={value}
              title={'Add Remark'}
              visible={visible}
              loadingDeleteBet={loadingDeleteBet}
              setVisible={setVisible}
              onDone={handleDeleteBet}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);
                setMode(false);
              }}
            />
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { matchesMobile: 'column', laptop: 'row' },
              // marginY: { mobile: ".2vh", laptop: ".5vh" },
              flex: 1,
              height: '100%',
              marginX: '0.5%',
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
                  color: 'white',
                  fontWeight: '700',
                  // paddingTop: "2%",
                  alignSelf: 'start',
                  // paddingBottom: "5px"
                }}
              >
                {currentMatch?.teamA} V/S {currentMatch?.teamB}
              </Typography>
              {currentMatch?.apiMatchActive && (
                <Odds
                  currentMatch={currentMatch}
                  matchOddsLive={matchOddsLive}
                  data={
                    matchOddsLive?.runners?.length > 0
                      ? matchOddsLive?.runners
                      : []
                  }
                  typeOfBet={'Match Odds'}
                  minBet={currentMatch?.betfair_match_min_bet}
                  maxBet={currentMatch?.betfair_match_max_bet}
                />
              )}
              {bookmakerHttp?.map((bookmaker) => {
                if (bookmaker.betStatus === 1) {
                  return (
                    <Odds
                      currentMatch={currentMatch}
                      session={'manualBookMaker'}
                      data={bookmaker}
                      minBet={bookmaker?.min_bet || 0}
                      maxBet={bookmaker?.max_bet || 0}
                      typeOfBet={bookmaker?.marketName}
                      matchOddsData={bookmaker}
                    />
                  );
                }
              })}
              {/* {currentMatch?.manualBookMakerActive && (
                <Odds
                  currentMatch={currentMatch}
                  data={currentMatch}
                  manualBookmakerData={manualBookmakerData}
                  typeOfBet={"Quick Bookmaker"}
                />
              )} */}

              {currentMatch?.apiBookMakerActive && (
                <BookMarketer
                  currentMatch={currentMatch}
                  data={
                    bookmakerLive?.runners?.length > 0
                      ? bookmakerLive?.runners
                      : []
                  }
                />
              )}

              {currentMatch?.manualSessionActive && matchesMobile && (
                <SessionMarket
                  title={'Quick Session Market'}
                  sessionExposer={sessionExposerHttp}
                  currentMatch={currentMatch}
                  sessionBets={sessionBets?.length}
                  sessionData={manualSessions}
                  // data={[]}
                  sessionOffline={sessionOff}
                  setPopData={setPopData}
                  popData={popData}
                  min={currentMatch?.manaual_session_min_bet || 0}
                  max={currentMatch?.manaual_session_max_bet || 0}
                />
              )}
              {currentMatch?.apiSessionActive && matchesMobile && (
                <SessionMarket
                  title={'Session Market'}
                  currentMatch={currentMatch}
                  sessionBets={sessionBets?.length}
                  sessionExposer={sessionExposerHttp}
                  sessionData={localSelectedSessionBettings}
                  // data={[]}
                  sessionOffline={sessionOff}
                  setPopData={setPopData}
                  popData={popData}
                  max={currentMatch?.betfair_session_max_bet}
                  min={currentMatch?.betfair_session_min_bet}
                />
              )}
              {matchesMobile && (
                <UserProfitLoss
                  single={'single'}
                  title={'User Profit Loss'}
                  matchId={matchId}
                />
              )}
              {/* {matchesMobile && */}
              {url.includes('wallet') && IOSinglebets.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  {mode && (
                    //  <CancelButton setMode={setMode} />
                    <Box
                      onClick={() => {
                        setMode(!mode);
                      }}
                      sx={{
                        width: '150px',
                        marginY: '.75%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '5px',
                        background: '#f1c550',
                        height: '35px',
                        border: '1.5px solid white',
                        display: 'flex',
                        alignSelf: 'flex-end',
                        cursor: 'pointer',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: '600',
                          fontSize: '13px',
                          color: 'black',
                          marginRight: '10px',
                        }}
                      >
                        {'Cancel'}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ width: '2%' }}></Box>
                  {/* <CustomButton mode={mode} setMode={setMode} setVisible={setVisible} /> */}
                  <Box
                    onClick={() => {
                      if (mode) {
                        if (selectedBetData.length > 0) {
                          setVisible(true);
                        }
                      } else {
                        setMode(!mode);
                      }
                    }}
                    sx={{
                      width: '150px',
                      marginY: '.75%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '5px',
                      background: '#E32A2A',
                      height: '35px',
                      border: '1.5px solid white',
                      display: 'flex',
                      alignSelf: 'flex-end',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: '600',
                        fontSize: '13px',
                        color: 'white',
                        marginRight: '10px',
                      }}
                    >
                      {mode ? 'Delete' : 'Delete Bet'}
                    </Typography>
                    <img
                      alt="delete"
                      src={DeleteIcon}
                      style={{ width: '17px', height: '20px' }}
                    />
                  </Box>
                </Box>
              )}
              {/* } */}
              {IOSinglebets.length > 0 && (
                <FullAllBets
                  IObets={IOSinglebets}
                  mode={mode}
                  tag={false}
                  setSelectedBetData={setSelectedBetData}
                  selectedBetData={selectedBetData}
                />
              )}
            </Box>
            {!matchesMobile && <Box sx={{ width: '20px' }} />}
            {!matchesMobile && (
              <Box
                sx={{
                  flex: 1,
                  flexDirection: 'column',
                  display: 'flex',
                  minHeight: '100px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  {/* {mode && <CancelButton />} */}
                  <Box sx={{ width: '2%' }}></Box>
                  <Box
                    sx={{ width: '150px', marginY: '.75%', height: '15px' }}
                  ></Box>
                </Box>
                {currentMatch?.manualSessionActive && (
                  <SessionMarket
                    title={'Quick Session Market'}
                    currentOdds={currentOdds}
                    currentMatch={currentMatch}
                    sessionBets={sessionBets?.length}
                    sessionExposer={sessionExposerHttp}
                    sessionData={manualSessions}
                    // data={[]}
                    sessionOffline={sessionOff}
                    setPopData={setPopData}
                    popData={popData}
                    min={currentMatch?.manaual_session_min_bet || 0}
                    max={currentMatch?.manaual_session_max_bet || 0}
                  />
                )}
                {currentMatch?.apiSessionActive && (
                  <SessionMarket
                    title={'Session Market'}
                    currentOdds={currentOdds}
                    currentMatch={currentMatch}
                    sessionBets={sessionBets?.length}
                    sessionExposer={sessionExposerHttp}
                    sessionData={localSelectedSessionBettings}
                    // data={[]}
                    sessionOffline={sessionOff}
                    setPopData={setPopData}
                    popData={popData}
                    max={currentMatch?.betfair_session_max_bet}
                    min={currentMatch?.betfair_session_min_bet}
                  />
                )}
                <UserProfitLoss
                  single={'single'}
                  title={'User Profit Loss'}
                  matchId={matchId}
                />
              </Box>
            )}
          </Box>
          <DailogModal />
        </>
      )}
    </Background>
  );
};

export default DeleteBet;
