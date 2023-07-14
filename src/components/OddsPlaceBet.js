import {
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  CancelDark,
  HourGlass,
} from "../assets";
import "../components/index.css";
import Lottie from "lottie-react";
import StyledImage from "./StyledImage";
import { useDispatch, useSelector } from "react-redux";
import BoxInput from "./BoxInput";
import { toast } from "react-toastify";
import { setRole } from "../newStore";
import { setDailogData } from "../store/dailogModal";
const OddsPlaceBet = ({
  handleClose,
  season,
  type,
  name,
  typeOfBet,
  placeBetData,
  setPlaceBetData,
  setFastRate,
  fastRate,
  setCanceled,
  handleRateChange
}) => {
  const [defaultValue, setDefaultValue] = useState(" ");
  const [betPlaceLoading, setBetPlaceLoading] = useState(false);
  const dispatch = useDispatch();

  const { axios } = setRole();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [betPalaceError, setBetPalaceError] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("");
  const [newRates, setNewRates] = useState({
    loss_amount: 0,
    win_amount: 0,
  });
  const theme = useTheme();

  const selectedColorBox = useSelector(
    (state) => state.selectedColorBox
  )?.value;
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const { geoLocation } = useSelector((state) => state.auth);
  const [ip, setIP] = useState(geoLocation);
  useEffect(() => {
    if (geoLocation) {
      setIP(geoLocation);
    }
  }, [geoLocation]);
  const getLatestBetAmount = async (value, newData) => {
    try {
      const title = placeBetData?.bet_type;
      const bet_type = title;

      var body = {
        bet_type,
        marketType: typeOfBet,
        odds: placeBetData?.odds,
        stake: Number(value),
      };
      if (season) {
        body = {
          ...body,
          marketType: typeOfBet,
          rate_percent: newData?.rate_percent,
        };
      }
      const { data } = await axios.post("/betting/calculateBetAmount", body);
      if (data?.data) {
        setNewRates(data?.data);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
    }
  };

  const TeamsOdssData = ({
    input,
    title,
    value,
    containerStyle,
    valueContainerStyle,
    valueTextStyle,
    bet_condition,
  }) => {
    const [oddValue, setOddValue] = useState(placeBetData?.odds);
    return (
      <Box sx={[{ display: "flex", flexDirection: "column" }, containerStyle]}>
        <Box
          sx={{
            background: "#262626",
            border: "2px solid #C7B6B6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "10px", tablet: "11px", laptop: "11px" },
              fontWeight: "600",
            }}
          >
            {title}
          </Typography>
        </Box>
        {!input && (
          <Box
            sx={[
              {
                background: "white",
                border: "1px solid #FFF",
                // border: "0px solid #C7B6B6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "32px",
                marginTop: "1px",
              },
              valueContainerStyle,
            ]}
          >
            <Typography
              sx={[
                {
                  overflow: bet_condition && "hidden",
                  textOverflow: bet_condition && "ellipsis",
                  whiteSpace: bet_condition && "nowrap",
                  width: bet_condition && { laptop: "140px", mobile: "100px" },
                  margin: bet_condition && "auto",
                  marginTop: bet_condition && "5px",
                  color: "#262626",
                  padding: "1px",
                  fontSize: {
                    mobile: "12px",
                    tablet: "12px",
                    laptop: "12px",
                  },
                  fontWeight: { mobile: "700", laptop: "600" },
                  textTransform: 'capitalize'
                },
                valueTextStyle,
              ]}
            >
              {value}
            </Typography>
          </Box>
        )}
        {input && (
          <Box
            sx={[
              {
                // background: selectedColorBox,
                border: "1px solid #FFF",
                // border: "0px solid #C7B6B6",
                display: "flex",
                justifyContent: season ? "center" : "space-between",
                paddingX: "4px",
                alignItems: "center",
                height: "32px",
                marginTop: "1px",
              },
              valueContainerStyle,
            ]}
          >
            {!season && (
              <Box
                onClick={() => {
                  setOddValue((i) => Number(i) - 1);
                }}
                sx={{
                  width: "18px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  borderRadius: "3px",
                  height: "18px",
                  background: "#319E5B",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
                >
                  -
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                width: "30px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                borderRadius: "3px",
                height: "15px",
              }}
            >
              <Typography
                className="OddValue"
                sx={{
                  color: "black",
                  fontSize: { mobile: "12px", laptop: "12px" },
                  fontWeight: { mobile: "700", laptop: "600" },
                }}
              >
                {oddValue}
              </Typography>
            </Box>
            {!season && (
              <Box
                onClick={() => {
                  setOddValue((i) => Number(i) + 1);
                }}
                sx={{
                  width: "18px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  borderRadius: "3px",
                  height: "18px",
                  background: "#319E5B",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
                >
                  +
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  const MoneyBox = ({ color, trendingDown, rate, trendingUp }) => {
    return (
      <Box
        sx={{
          width: { mobile: "70px", tablet: "100px", laptop: "100px" },
          height: "25px",
          alignItems: "center",
          justifyContent: "center",
          background: color,
          borderRadius: "4px",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "10px", tablet: "13px", laptop: "13px" },
            fontWeight: "700",
            color: "white",
          }}
        >
          {rate}
        </Typography>
        {trendingUp && (
          <StyledImage
            src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
            sx={{
              height: "20px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "20px",
            }}
          />
        )}
        {trendingDown && (
          <StyledImage
            src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            sx={{
              height: "20px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "20px",
            }}
          />
        )}
      </Box>
    );
  };

  const handlePlaceBet = async (payload, match) => {
    let oddValue = fastRate !== null && fastRate;

    if (oddValue != payload.odds) {
      // toast.warning("Odds value has been updated. You can not place bet.");
      setCanceled({ value: true, msg: "Rate changed", type: false });
      setBetPlaceLoading(false);
      setBetPalaceError(true);

      return false;
    } else {
      PlaceBetSubmit(payload);
    }
  };

  function showDialogModal(isModalOpen, showRight, message) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      // navigate(`/${window.location.pathname.split('/')[1]}`,{state:data.id})
    }, [2000]);
    setShowModalMessage(message);
  }
  const PlaceBetSubmit = async (payload) => {
    try {
      let response = await axios.post(`/betting/placeBet`, payload);
      // setAllRateBets(response?.data?.data[0])
      setBetPalaceError(false);
      setCanceled({ value: true, msg: response?.data?.message, type: true });
      setTimeout(() => {
        setPlaceBetData(null);
      }, 1500);
      showDialogModal(isPopoverOpen, true, response.data.message);
      setVisible(true);
      setFastRate(0);
      setBetPlaceLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setCanceled({
        value: true,
        msg: e?.response?.data?.message,
        type: false,
      });
      setBetPalaceError(true);
      setBetPlaceLoading(false);
      // toast.error(e.response.data.message);
      showDialogModal(isPopoverOpen, false, e.response.data.message);
      setShowModalMessage(e.response.data.message);
      setTimeout(() => {
        setPlaceBetData(null);
        handleRateChange();//add 
      }, 1500);
      setShowSuccessModal(true);
    }
  };

  const onSubmit = async (e) => {
    try {
      let payload = {
        id: placeBetData?.id,
        matchType: placeBetData?.matchType,
        // betId: currentMatch?.matchOddsData?.[0]?.id,
        betId: placeBetData?.betId,
        bet_type: placeBetData?.bet_type,
        odds: placeBetData?.odds,
        betOn: placeBetData?.betOn,
        stack: Number(defaultValue),
        team_bet: name,
        country: ip?.country_name || null,
        ip_address: ip?.IPv4 || null,
        stake: Number(defaultValue),
        teamA_name: placeBetData?.teamA_name,
        teamB_name: placeBetData?.teamB_name,
        teamC_name: placeBetData?.teamC_name,
        marketType: placeBetData?.marketType,
      };
      handlePlaceBet(payload, placeBetData?.currentMatch);
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          border: "1px solid white",
          borderRadius: "5px",
          overflow: "hidden",
          width: "100%",
          position: "relative",
        },
      ]}
    >
      <Box sx={{ background: "#F8C851", width: "100%", overflow: "hidden" }}>
        <Box
          sx={[
            {
              height: "38px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: "10px",
            },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.headerGradient}`,
            }),
          ]}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { mobile: "10px", tablet: "10px", laptop: "14px" },
              color: "text.white",
            }}
          >
            Place Bet
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MoneyBox
              trendingUp={false}
              rate={Number(newRates?.win_amount)?.toFixed(2)}
              color={"#10DC61"}
            />
            <Box sx={{ width: "5px" }}></Box>
            <MoneyBox
              trendingDown={false}
              rate={Number(newRates?.loss_amount).toFixed(2)}
              color={"#FF4D4D"}
            />
            <Box sx={{ width: "5px", marginRight: "20px" }}></Box>
            <StyledImage
              onClick={handleClose}
              src={CancelDark}
              sx={{
                padding: "10px",
                height: "50px",
                width: "50px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
          <TeamsOdssData
            title={"Team"}
            valueContainerStyle={{
              background: type?.color ? type?.color : "#F8C851",
            }}
            containerStyle={{ flex: season ? { mobile: 2.5, laptop: 2 } : 1 }}
            value={placeBetData?.name}
          />
          <TeamsOdssData
            input={true}
            title={"Odds"}
            valueContainerStyle={{
              background: type?.color ? type?.color : "#F8C851",
            }}
            value={"60.00"}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
          />
          <TeamsOdssData
            title={"Back/Lay"}
            value={placeBetData?.bet_type}
            valueContainerStyle={{ background: type?.color }}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
          />
          {!matchesMobile && <Box sx={{ width: "20px" }}></Box>}
          <BoxInput
            setDefaultValue={setDefaultValue}
            defaultValue={defaultValue}
            selectedColorBox={type?.color}
            getLatestBetAmount={(value) =>
              value && getLatestBetAmount(value, placeBetData?.data)
            }
            containerStyle={{ marginLeft: "2px", flex: 1.3 }}
            title={"Stake"}
          />
        </Box>
        {matchesMobile && (
          <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
        )}
        {
          <>
            <Box sx={{ display: "flex", marginTop: "15px", marginX: "2px", border: '2px solid white' }}>
              {["2000", "3000", "5000", "10000"]?.map((v) => (
                <NumberData
                  key={v}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  getLatestBetAmount={(value) =>
                    getLatestBetAmount(value, placeBetData?.data)
                  }
                  setDefaultValue={setDefaultValue}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
              {["20000", "100000", "200000", "500000"]?.map((v) => (
                <NumberData
                  key={v}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  getLatestBetAmount={(value) =>
                    getLatestBetAmount(value, placeBetData?.data)
                  }
                  setDefaultValue={setDefaultValue}
                />
              ))}
            </Box>
          </>
        }
        <Box
          sx={{
            display: "flex",
            flex: 1,
            paddingY: "2vh",
            justifyContent: "space-evenly",
          }}
        >
          <button
            // style={classes.CustomButton_Btn("#262626")}
            style={{
              color: "#FFF",
              backgroundColor: "#FF4949",
              width: "150px",
              // width: { laptop: "150px", mobile: "130px" },
              height: "35px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              setDefaultValue(" ");
              setNewRates({
                loss_amount: 0,
                win_amount: 0,
              });
            }}
          >
            Reset
          </button>

          <button
            // style={classes.CustomButton_Btn("#262626")}
            style={{
              color: "#fff",
              backgroundColor: "#262626",
              width: "150px",
              cursor: betPlaceLoading ? "not-allowed" : "pointer",
              // width: { laptop: "150px", mobile: "130px" },
              height: "35px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              if (betPlaceLoading) {
                return false;
              } else {
                setBetPlaceLoading(true);
                if (defaultValue === " ") {
                  // toast.warn("Please enter amount to place a bet");
                  setCanceled({
                    value: true,
                    msg: "Please enter amount to place a bet",
                    type: false,
                  });
                  setBetPlaceLoading(false);
                  return false;
                } else if (placeBetData.marketType == "MATCH ODDS") {
                  setVisible(true);
                  let delay = placeBetData?.currentMatch?.delaySecond
                    ? placeBetData?.currentMatch?.delaySecond
                    : 0;
                  delay = delay * 1000;
                  setTimeout(() => {
                    onSubmit();
                  }, delay);
                } else {
                  onSubmit();
                }
              }
            }}
          >
            Submit
          </button>
        </Box>
      </Box>
      {betPlaceLoading && (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, .5)",
          }}
        >
          <Lottie
            animationData={HourGlass}
            style={{
              display: "flex",
              alignSelf: "center",
              width: "50px",
              height: "50px",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const NumberData = ({
  value,
  containerStyle,
  setDefaultValue,
  getLatestBetAmount,
}) => {
  return (
    <Box
      onClick={() => {
        setDefaultValue(value);
        getLatestBetAmount(value);
      }}
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: "18%",
          background: "#0B4F26",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "500",
          fontWeight: "600",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
export default OddsPlaceBet;
