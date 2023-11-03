import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setRole } from '../../newStore';

const ChangeButtonValue = ({ selected, visible }) => {
  const { axios } = setRole();
  const [matchId, setMatchId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [valueLabel, setValueLabel] = useState([
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
  ]);

  const [valueLabel1, setValueLabel1] = useState([
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
    { lable: '', value: '' },
  ]);

  useEffect(() => {
    getButtonList();
  }, []);

  function customSort(a, b) {
    if (a.label === '1k') {
      return -1; // "1k" comes first
    } else if (b.label === '1k') {
      return 1; // "1k" comes first
    } else {
      // For other labels, maintain their original order
      return 0;
    }
  }
  const getButtonList = async () => {
    try {
      const { data } = await axios.get('/users/getButtonValues');
      if (data?.data[0]?.type === 'Match') {
        setMatchId(data?.data[0]?.id);
        const initialData = data?.data[0]?.buttons;
        const jsonObject = JSON.parse(initialData);
        const updatedState = valueLabel.map((item, index) => {
          return {
            ...item,
            lable: Object.keys(jsonObject)[index],
            value: Object.values(jsonObject)[index],
          };
        });
        updatedState.sort(customSort);
        setValueLabel(updatedState);
        //separate
        setSessionId(data?.data[1]?.id);
        const initialData1 = data?.data[1]?.buttons;
        const jsonObject1 = JSON.parse(initialData1);
        const updatedState1 = valueLabel.map((item, index) => {
          return {
            ...item,
            lable: Object.keys(jsonObject1)[index],
            value: Object.values(jsonObject1)[index],
          };
        });
        updatedState1.sort(customSort);
        setValueLabel1(updatedState1);
      } else if (data?.data[0]?.type === 'Session') {
        setSessionId(data?.data[0]?.id);
        const initialData = data?.data[0]?.buttons;
        const jsonObject = JSON.parse(initialData);
        const updatedState = valueLabel.map((item, index) => {
          return {
            ...item,
            lable: Object.keys(jsonObject)[index],
            value: Object.values(jsonObject)[index],
          };
        });
        updatedState.sort(customSort);
        setValueLabel1(updatedState);
        //separate
        setMatchId(data?.data[1]?.id);
        const initialData1 = data?.data[1]?.buttons;
        const jsonObject1 = JSON.parse(initialData1);
        const updatedState1 = valueLabel.map((item, index) => {
          return {
            ...item,
            lable: Object.keys(jsonObject1)[index],
            value: Object.values(jsonObject1)[index],
          };
        });
        updatedState1.sort(customSort);
        setValueLabel(updatedState1);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log('error', e.message);
    }
  };

  const setMatchButtonList = async () => {
    setLoader(true);
    const convertedData = valueLabel.reduce((result, item) => {
      if (item.value) {
        result[item.lable] = item.value;
      }
      return result;
    }, {});
    var payload = {
      buttons: convertedData,
      id: matchId,
    };
    try {
      const { data } = await axios.post('/users/setButtonValues', payload);
      toast.success(data?.message);
      setLoader(false);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log('error', e.message);
      setLoader(false);
    }
  };

  const setSessionButtonList = async () => {
    setLoader1(true);
    const convertedData = valueLabel1.reduce((result, item) => {
      if (item.value) {
        result[item.lable] = item.value;
      }
      return result;
    }, {});
    var payload = {
      buttons: convertedData,
      id: sessionId,
    };
    try {
      const { data } = await axios.post('/users/setButtonValues', payload);
      toast.success(data?.message);
      setLoader1(false);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log('error', e.message);
      setLoader1(false);
    }
  };

  const handleLabelChange = (index, newValue, type) => {
    if (newValue !== '' && newValue <= 0) {
      return;
    }
    if (type === 'label') {
      setValueLabel((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].lable = newValue;
        return updatedValues;
      });
    } else {
      setValueLabel((prevValues) => {
        const updatedValues1 = [...prevValues];
        updatedValues1[index].value = newValue;
        return updatedValues1;
      });
    }
  };

  const handleLabel1Change = (index, newValue, type) => {
    if (newValue !== '' && newValue <= 0) {
      return;
    }
    if (type === 'label') {
      setValueLabel1((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].lable = newValue;
        return updatedValues;
      });
    } else {
      setValueLabel1((prevValues) => {
        const updatedValues1 = [...prevValues];
        updatedValues1[index].value = newValue;
        return updatedValues1;
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { mobile: 'column', laptop: 'row', tablet: 'column' },
      }}
    >
      {/* {visible ? ( */}
      <>
        <Box
          sx={{
            flex: 1,
            width: { mobile: '96vw', laptop: '35vw', tablet: '35vw' },
            minWidth: { laptop: '450px', tablet: '450px', mobile: '0px' },
            marginTop: '10px',
            marginX: { mobile: '2vw', laptop: '1vw' },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: { laptop: '18px', mobile: '20px' },
              fontWeight: '700',
            }}
          >
            Change Match Button Values
          </Typography>
          <Box
            sx={{
              width: '100%',
              minHeight: '200px',
              background: '#F8C851',
              borderRadius: '5px',
              padding: '20px',
              marginTop: '10px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: '#202020',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Price Lable
                </Typography>
                {valueLabel.map((item, index) => {
                  return (
                    <LabelButton
                      key={index}
                      value={item}
                      index={index}
                      onChange={handleLabelChange}
                    />
                  );
                })}
              </Box>
              <Box sx={{ flex: 1, marginLeft: '10px' }}>
                <Typography
                  sx={{
                    color: '#202020',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Price Value
                </Typography>
                {valueLabel.map((item, index) => {
                  return (
                    <ValButton
                      key={index}
                      value={item}
                      index={index}
                      onChange={handleLabelChange}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box
              onClick={setMatchButtonList}
              sx={{
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                marginTop: '50px',
                marginBottom: '40px',
                width: '80%',
                background: '#0B4F26',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{ fontSize: { laptop: '18px', mobile: '20px' } }}
                color={'white'}
              >
                {loader ? (
                  <CircularProgress
                    sx={{
                      color: '#FFF',
                    }}
                    size={20}
                    thickness={4}
                    value={60}
                  />
                ) : (
                  'Update'
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
      <>
        <Box
          sx={{
            flex: 1,
            width: { mobile: '96vw', laptop: '35vw', tablet: '35vw' },
            minWidth: { laptop: '450px', tablet: '450px', mobile: '0px' },
            marginTop: '10px',
            marginX: { mobile: '2vw', laptop: '1vw' },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: { laptop: '18px', mobile: '20px' },
              fontWeight: '700',
            }}
          >
            Change Session Button Values
          </Typography>
          <Box
            sx={{
              width: '100%',
              minHeight: '200px',
              background: '#F8C851',
              borderRadius: '5px',
              padding: '20px',
              marginTop: '10px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: '#202020',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Price Lable
                </Typography>
                {valueLabel1.map((item, index) => {
                  return (
                    <LabelButton
                      key={index}
                      value={item}
                      index={index}
                      onChange={handleLabel1Change}
                    />
                  );
                })}
              </Box>
              <Box sx={{ flex: 1, marginLeft: '10px' }}>
                <Typography
                  sx={{
                    color: '#202020',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Price Value
                </Typography>
                {valueLabel1.map((item, index) => {
                  return (
                    <ValButton
                      key={index}
                      value={item}
                      index={index}
                      onChange={handleLabel1Change}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box
              onClick={setSessionButtonList}
              sx={{
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                marginTop: '50px',
                marginBottom: '40px',
                width: '80%',
                background: '#0B4F26',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{ fontSize: { laptop: '18px', mobile: '20px' } }}
                color={'white'}
              >
                {loader1 ? (
                  <CircularProgress
                    sx={{
                      color: '#FFF',
                    }}
                    size={20}
                    thickness={4}
                    value={60}
                  />
                ) : (
                  'Update'
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    </Box>
  );
};

const LabelButton = ({ value, index, onChange }) => {
  const handleChange = (event) => {
    onChange(index, event.target.value, 'label');
  };

  return (
    <Box
      sx={{
        background: 'white',
        height: '40px',
        marginTop: '5px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        value={value.lable}
        onChange={handleChange}
        variant="outlined"
        onKeyDown={(event) => {
          if (event.code === 'Space') {
            event.preventDefault();
          }
        }}
        size="small"
        fullWidth
        sx={{ fontSize: '14px', fontWeight: '600' }}
        inputProps={{
          onBlur: (event) => event.target.blur(),
        }}
      />
    </Box>
  );
};

const ValButton = ({ value, index, onChange }) => {
  const handleChange = (event) => {
    onChange(index, event.target.value, 'value');
  };

  return (
    <Box
      sx={{
        background: 'white',
        height: '40px',
        marginTop: '5px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        required={true}
        value={value.value}
        onChange={handleChange}
        variant="outlined"
        type="number" // Allow only numeric input
        size="small"
        fullWidth
        sx={{ fontSize: '14px', fontWeight: '600' }}
        onKeyDown={(event) => {
          if (
            event.code === 'Space' ||
            (!(event.key >= '0' && event.key <= '9') &&
              event.key !== 'Backspace' &&
              event.code !== 'ArrowUp' &&
              event.code !== 'ArrowDown' &&
              event.code !== 'Enter' &&
              event.code !== 'Tab' && // Allow Tab key
              event.code !== 'ArrowRight' && // Allow Right Arrow key
              event.code !== 'ArrowLeft')
          ) {
            event.preventDefault();
          }
        }}
        inputProps={{
          min: '1',
          onBlur: (event) => event.target.blur(),
        }}
      />
    </Box>
  );
};

export default ChangeButtonValue;
