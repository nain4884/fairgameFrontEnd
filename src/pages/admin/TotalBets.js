import { Box, Typography } from '@mui/material';
import Background from '../../components/Background';
const data = [
  {
    values: [
      {
        name: 'John Doe',
        color: 'black',
        background: '#F1C550',
      },
      {
        name: 'BOOKMAKER',
        color: 'black',
        background: '#F1C550',
      },
      {
        name: 'INDIA',
        color: 'black',
        background: '#B3E0FF',
      },
      {
        name: '1000',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: 'Back',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: '100,000,000',
        color: 'black',
        background: '#B3E0FF',
      },
      {
        name: '10,000,000',
        color: 'white',
        background: '#0B4F26',
      },
      {
        name: '03:23 AM',
        color: 'black',
        background: '#B3E0FF',
        time: true,
        date: '02-11-2022',
      },
    ],
  },
  {
    values: [
      {
        name: 'John Doe',
        color: 'white',
        background: '#319E5B',
      },
      {
        name: 'MATCH ODDS',
        color: 'white',
        background: '#319E5B',
      },
      {
        name: 'INDIA',
        color: 'black',
        background: '#FFB5B5',
      },
      {
        name: '1000',
        color: 'black',
        background: '#FFB5B5',
        small: true,
      },
      {
        name: 'LAY',
        color: 'black',
        background: '#FFB5B5',
        small: true,
      },
      {
        name: '100,000,000',
        color: 'black',
        background: '#FFB5B5',
      },
      {
        name: '10,000,000',
        color: 'white',
        background: '#0B4F26',
      },
      {
        name: '03:23 AM',
        color: 'black',
        background: '#FFB5B5',
        time: true,
        date: '02-11-2022',
      },
    ],
  },
  {
    values: [
      {
        name: 'John Doe',
        color: 'white',
        background: '#303030',
      },
      {
        name: '6 OVER RUN INDIA',
        color: 'white',
        background: '#303030',
      },
      {
        name: '',
        color: 'black',
        background: '#303030',
      },
      {
        name: '1000',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: 'YES',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: '100,000,000',
        color: 'black',
        background: '#B3E0FF',
      },
      {
        name: '10,000,000',
        color: 'white',
        background: '#0B4F26',
      },
      {
        name: '03:23 AM',
        color: 'black',
        background: '#B3E0FF',
        time: true,
        date: '02-11-2022',
      },
    ],
  },
  {
    values: [
      {
        name: 'John Doe',
        color: 'black',
        background: '#F1C550',
      },
      {
        name: 'BOOKMAKER',
        color: 'black',
        background: '#F1C550',
      },
      {
        name: 'INDIA',
        color: 'black',
        background: '#B3E0FF',
      },
      {
        name: '1000',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: 'Back',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: '100,000,000',
        color: 'black',
        background: '#B3E0FF',
      },
      {
        name: '10,000,000',
        color: 'white',
        background: '#0B4F26',
      },
      {
        name: '03:23 AM',
        color: 'black',
        background: '#B3E0FF',
        time: true,
        date: '02-11-2022',
      },
    ],
  },
  {
    values: [
      {
        name: 'John Doe',
        color: 'white',
        background: '#319E5B',
      },
      {
        name: 'MATCH ODDS',
        color: 'white',
        background: '#319E5B',
      },
      {
        name: 'INDIA',
        color: 'black',
        background: '#FFB5B5',
      },
      {
        name: '1000',
        color: 'black',
        background: '#FFB5B5',
        small: true,
      },
      {
        name: 'LAY',
        color: 'black',
        background: '#FFB5B5',
        small: true,
      },
      {
        name: '100,000,000',
        color: 'black',
        background: '#FFB5B5',
      },
      {
        name: '10,000,000',
        color: 'white',
        background: '#0B4F26',
      },
      {
        name: '03:23 AM',
        color: 'black',
        background: '#FFB5B5',
        time: true,
        date: '02-11-2022',
      },
    ],
  },
  {
    values: [
      {
        name: 'John Doe',
        color: 'white',
        background: '#303030',
      },
      {
        name: '6 OVER RUN INDIA',
        color: 'white',
        background: '#303030',
      },
      {
        name: '',
        color: 'black',
        background: '#303030',
      },
      {
        name: '1000',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: 'YES',
        color: 'black',
        background: '#B3E0FF',
        small: true,
      },
      {
        name: '100,000,000',
        color: 'black',
        background: '#B3E0FF',
      },
      {
        name: '10,000,000',
        color: 'white',
        background: '#0B4F26',
      },
      {
        name: '03:23 AM',
        color: 'black',
        background: '#B3E0FF',
        time: true,
        date: '02-11-2022',
      },
    ],
  },
];
const TotalBets = () => {
  const Footer = () => {
    return (
      <Box
        sx={{
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          px: { mobile: '5px', laptop: '10px' },
          justifyContent: 'space-between',
          background: '#FAFAFA',
          marginTop: '10px',
          marginX: '0.5%',
          marginBottom: '10px',
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: '12px', laptop: '14px' },
            fontWeight: '600',
          }}
        >
          Showing 1 to 6 of 10 entries
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              height: '35px',
              width: { mobile: '80px', laptop: '100px' },
              background: '#0B4F26',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: { laptop: '14px', mobile: '12px' },
              }}
            >
              Previous
            </Typography>
          </Box>
          <Box
            sx={{
              height: '35px',
              marginX: { laptop: '10px', mobile: '5px' },
              width: '40px',
              background: '#262626',
              display: 'flex',
              borderRadius: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: { laptop: '14px', mobile: '12px' },
              }}
            >
              1
            </Typography>
          </Box>
          <Box
            sx={{
              height: '35px',
              width: { mobile: '80px', laptop: '100px' },
              background: '#0B4F26',
              display: 'flex',
              borderRadius: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: { laptop: '14px', mobile: '12px' },
              }}
            >
              Next
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Background>
      {/* <Header /> */}
      <Typography
        sx={{
          fontSize: '16px',
          color: 'white',
          marginLeft: '0.5%',
          fontWeight: '600',
          paddingY: '0.5%',
          alignSelf: 'start',
        }}
      >
        India Vs pakistan
      </Typography>

      <Box
        sx={{
          width: { mobile: '98%', laptop: '99%' },
          marginX: '.5%',
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginY: { laptop: '.25vh' },
          padding: 0.2,
          background: 'white',
        }}
      >
        <HeaderRow />
        {[...data, ...data, ...data]?.map((i, k) => {
          return (
            <div key={k} style={{ display: 'flex', position: 'relative' }}>
              <Box
                sx={{
                  width: '3%',
                  border: '1px solid white',
                  background: 'black',
                  height: '50px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Typography
                  sx={{ fontSize: '10px', fontWeight: '600', color: 'white' }}
                >
                  {k + 1}
                </Typography>
              </Box>
              <Row index={k} values={i.values} />
              {k == 3 && (
                <Box
                  sx={{
                    background: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    height: '50px',
                    position: 'absolute',
                    display: 'flex',
                  }}
                >
                  <Box sx={{ flex: 1, display: 'flex' }}>
                    <Box sx={{ width: '28.8%' }}></Box>
                    <Box
                      sx={{
                        width: '37.5%',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}
                    >
                      {
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '700',
                            color: 'white',
                            textTransform: 'uppercase',
                          }}
                        >
                          Bet <span style={{ color: '#e41b23' }}>deleted</span>{' '}
                          due to no ball
                        </Typography>
                      }
                    </Box>
                    <Box sx={{ width: '29.5%' }}></Box>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  width: '13%',
                  border: '1px solid white',
                  background: k % 2 == 0 ? '#A7DCFF' : '#FFB5B5',
                  height: '50px',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.8vw',
                    fontWeight: '600',
                    color: 'black',
                    wordWrap: 'break-word',
                    paddingLeft: '7px',
                  }}
                >
                  {'127.0.0.1'}
                </Typography>
              </Box>
            </div>
          );
        })}
        <Footer />
      </Box>
    </Background>
  );
};
const HeaderRow = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Box
        sx={{
          width: '3.4%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          No
        </Typography>
      </Box>
      <Box
        sx={{
          width: '15%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Username
        </Typography>
      </Box>
      <Box
        sx={{
          width: '20%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Market
        </Typography>
      </Box>
      <Box
        sx={{
          width: '15%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Favourite
        </Typography>
      </Box>
      <Box
        sx={{
          width: '10%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Odds
        </Typography>
      </Box>
      <Box
        sx={{
          width: '10%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: '15%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Stake
        </Typography>
      </Box>
      <Box
        sx={{
          width: '15%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          My Stake
        </Typography>
      </Box>
      <Box
        sx={{
          width: '15%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Time
        </Typography>
      </Box>
      <Box
        sx={{
          width: '15%',
          border: '1px solid white',
          background: 'rgba(0,0,0)',
          height: '25px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8vw',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '7px',
          }}
        >
          Location details (ip)
        </Typography>
      </Box>
    </Box>
  );
};
const SmallBox = ({ item }) => {
  return (
    <Box
      sx={{
        width: '10%',
        border: '1px solid white',
        background: item?.background,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '10px',
          fontWeight: '600',
          color: item?.color,
          marginLeft: '7px',
        }}
      >
        {item?.name}
      </Typography>
    </Box>
  );
};
const LargeBox = ({ item, k }) => {
  return (
    <Box
      sx={{
        width: k == 1 ? '20%' : '15%',
        border: '1px solid white',
        background: item?.background,
        height: '50px',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: '.8vw',
          fontWeight: '600',
          color: item?.color,
          wordWrap: 'break-word',
          marginLeft: '7px',
        }}
      >
        {item?.name}
      </Typography>
      {item?.time && (
        <Typography
          sx={{
            fontSize: '10px',
            fontWeight: '600',
            color: item?.color,
            marginLeft: '7px',
          }}
        >
          {item?.date}
        </Typography>
      )}
    </Box>
  );
};
const Row = ({ values, index }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      {values.map((item, k) => {
        if (!item?.small) {
          return <LargeBox key={k} k={k} item={item} />;
        } else {
          return <SmallBox key={k} k={k} item={item} />;
        }
      })}
    </Box>
  );
};
export default TotalBets;
