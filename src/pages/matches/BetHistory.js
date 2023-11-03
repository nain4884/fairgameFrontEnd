import { Box, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Background } from '../../components';
import AllRateSeperate from '../../components/AllRateSeperate';
import CustomLoader from '../../components/helper/CustomLoader';
import SessionBetSeperate from '../../components/sessionBetSeperate';
import { setRole } from '../../newStore';
import { setallbetsPage } from '../../newStore/reducers/auth';

const BetHistory = ({ selected, visible }) => {
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem('JWTuser');
  const decodedTokenUser = userToken !== null && jwtDecode(userToken);
  const [allBets, SetAllBets] = useState([]);
  const userID = decodedTokenUser.sub;
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  function callPage(val) {
    dispatch(setallbetsPage(parseInt(val)));
    setCurrentPage(parseInt(val));
  }
  async function getBetHisory() {
    const userId = userID;
    let { axios } = setRole();
    const payload = {
      userId: userId,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(`/betting/getBetHisory`, payload);
      SetAllBets(data.data[0]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      //   toast.success(data?.message);
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log(e);
    }
  }

  useEffect(() => {
    getBetHisory();
  }, [currentPage]);

  return (
    <>
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
            <Typography
              sx={{
                fontSize: { mobile: '12px', laptop: '15px' },
                marginLeft: { laptop: '5px', mobile: '3px' },

                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {'BET HISTORY'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { laptop: 'row', mobile: 'column' },
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '99%',
                  display: 'flex',
                  flexDirection: { laptop: 'row', mobile: 'column' },
                }}
              >
                <AllRateSeperate
                  betHistory={true}
                  mark2
                  mark
                  allBetsData={allBets?.filter((b) =>
                    [
                      'MATCH ODDS',
                      'BOOKMAKER',
                      'MANUAL BOOKMAKER',
                      'QuickBookmaker0',
                      'QuickBookmaker1',
                      'QuickBookmaker2',
                    ].includes(b?.marketType)
                  )}
                  count={
                    allBets?.filter((b) =>
                      [
                        'MATCH ODDS',
                        'BOOKMAKER',
                        'MANUAL BOOKMAKER',
                        'QuickBookmaker0',
                        'QuickBookmaker1',
                        'QuickBookmaker2',
                      ].includes(b?.marketType)
                    ).length || 0
                  }
                  callPage={callPage}
                />
                <Box sx={{ width: { laptop: '1vw', mobile: 0 } }}></Box>
                <SessionBetSeperate
                  betHistory={true}
                  allBetsData={allBets?.filter(
                    (b) =>
                      ![
                        'MATCH ODDS',
                        'BOOKMAKER',
                        'MANUAL BOOKMAKER',
                        'QuickBookmaker0',
                        'QuickBookmaker1',
                        'QuickBookmaker2',
                      ].includes(b?.marketType)
                  )}
                  mark
                />
              </Box>
            </Box>
          </>
        )}
      </Background>
    </>
  );
};

export default BetHistory;
