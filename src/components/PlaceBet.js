import {
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useRef, useState } from "react";
import { CancelDark } from "../assets";
import "../components/index.css";
import StyledImage from "./StyledImage";
import { useSelector } from "react-redux";
import BoxInput from "./BoxInput";
import { toast } from "react-toastify";
import { setRole } from "../newStore";
import NumberData from "./NumberData";
import TeamsOdssData from "./TeamsOdssData";
import PlaceBetCustomButton from "./PlaceBetCustomButton";
import PlaceBetMoneyBox from "./PlaceBetMoneyBox";
const PlaceBet = ({
  handleClose,
  currentMatch,
  season,
  onSubmit,
  isSessionYes,
  isBack,
  type,
  name,
  betOn,
  data,
  typeOfBet,
  selectedValue,
  mainData,
  betType,
  po,
}) => {
  const [defaultValue, setDefaultValue] = useState(" ");
  const [currentOdds, setCurrentOdds] = useState(selectedValue);
  const [newRates, setNewRates] = useState({
    loss_amount: 0,
    win_amount: 0,
  });
  const theme = useTheme();
  const { axios } = setRole();
  const selectedColorBox = useSelector(
    (state) => state.selectedColorBox
  )?.value;
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const { geoLocation } = useSelector((state) => state.auth);
  const [ip, setIP] = useState(geoLocation);
  const [buttonData, setButtonData] = useState([]);

  useEffect(() => {
    if (geoLocation) {
      setIP(geoLocation);
      getButtonList();
    }
  }, [geoLocation]);
  const myDivRef = useRef(null);

  function customSort(a, b) {
    if (a.label === "1k") {
      return -1; // "1k" comes first
    } else if (b.label === "1k") {
      return 1; // "1k" comes first
    } else {
      // For other labels, maintain their original order
      return 0;
    }
  }

  const getButtonList = async () => {
    try {

      const { data } = await axios.get("/users/getButtonValues");
      // alert(JSON.stringify(data))
      // if (data?.data) {
      //   setNewRates(data?.data);
      // }
      const initialData = data?.data?.buttons; // Replace this with your initial data
      const jsonObject = JSON.parse(initialData);
      // Update the state using the spread operator to keep the existing objects
      // const updatedState = valueLabel.map((item, index) => {
      //   return {
      //     ...item,
      //     label: Object.keys(jsonObject)[index],
      //     value: Object.values(jsonObject)[index],
      //   };
      // });
      const resultArray = Object.entries(jsonObject).map(([label, value]) => ({
        label: label,
        value: value,
      }));
      resultArray.sort(customSort);
      setButtonData(resultArray);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
    }
  };

  const getLatestBetAmount = async (value, newData) => {
    try {
      const title = season ? betType : isBack ? "back" : "lay";
      const bet_type = title;

      var body = {
        bet_type,
        marketType: typeOfBet,
        odds: currentOdds,
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

  function setDValue(e) {
    e.preventDefault();
    setDefaultValue("");
  }
  function findBetId(data) {
    const matchOdds = data?.bettings?.filter(
      (element) => element.sessionBet === false
    );
    return matchOdds?.[0]?.id;
  }

  function SubmitPayloadForPlaceBet(
    betOn = "teamA_back",
    marketType = "BOOKMAKER"
  ) {
    let payload = {
      id: currentMatch?.id,
      matchType: currentMatch?.gameType,
      // betId: currentMatch?.matchOddsData?.[0]?.id,
      betId: findBetId(currentMatch),
      bet_type: isBack ? "back" : "lay",
      odds: Number(
        document.getElementsByClassName("OddValue")?.[0]?.textContent
      ),
      betOn: betOn,
      stack: Number(defaultValue),
      team_bet: name,
      country: ip?.country_name || null,
      ip_address: ip?.IPv4 || null,
      stake: Number(defaultValue),
      teamA_name: currentMatch?.teamA,
      teamB_name: currentMatch?.teamB,
      teamC_name: currentMatch?.teamC,
      marketType: marketType === "MATCH ODDS" ? "MATCH ODDS" : marketType,
      po: po,
    };
    if (marketType == "Session") {
      delete payload.betOn;
      delete payload.odds;

      payload.matchType = data?.matchType;
      payload.teamA_name = mainData?.teamA;
      payload.teamB_name = mainData?.teamB;
      payload.id = data?.match_id;
      payload.betId = data?.id;
      payload.bet_type = isSessionYes ? "yes" : "no";
      payload.bet_condition = data?.bet_condition;
      payload.rate_percent = data?.rate_percent;
      payload.marketType = currentMatch?.bet_condition;
      payload.odds = Number(selectedValue);
      payload.sessionBet = true;
      payload.selectionId = data?.selectionId;
    }
    return payload;
  }

  return (
    <Box
      // ref={refs}
      ref={myDivRef}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          border: "1px solid white",
          borderRadius: "5px",
          position: "relative",
          marginLeft: season ? 0 : 0,
          overflow: "hidden",

          width: { mobile: "98vw", tablet: "60vw", laptop: "40%" },
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
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
            <PlaceBetMoneyBox
              trendingUp={false}
              rate={Number(newRates?.win_amount)?.toFixed(2)}
              color={"#10DC61"}
            />
            <Box sx={{ width: "5px" }}></Box>
            <PlaceBetMoneyBox
              trendingDown={false}
              rate={Number(newRates?.loss_amount).toFixed(2)}
              color={"#FF4D4D"}
            />

          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Box sx={{ width: "5px", marginRight: "20px" }}></Box> */}
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
            currentOdds={currentOdds}
            season={season}
            setCurrentOdds={setCurrentOdds}
            isBack={isBack}
            isSessionYes={isSessionYes}
            name={name}
            title={season ? "Session" : "Team"}
            value={season ? "6 OVER RUNS INDIA" : "INDIA"}
            valueContainerStyle={{
              background: type?.color ? type?.color : "#F8C851",
            }}
            containerStyle={{ flex: season ? { mobile: 2.5, laptop: 2 } : 1 }}
            bet_condition={data?.bet_condition}
          />
          <TeamsOdssData
            input={true}
            currentOdds={currentOdds}
            season={season}
            setCurrentOdds={setCurrentOdds}
            isBack={isBack}
            isSessionYes={isSessionYes}
            name={name}
            title={"Odds"}
            valueContainerStyle={{
              background: type?.color ? type?.color : "#F8C851",
            }}
            value={"60.00"}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
          />
          <TeamsOdssData
            currentOdds={currentOdds}
            season={season}
            setCurrentOdds={setCurrentOdds}
            isBack={isBack}
            isSessionYes={isSessionYes}
            name={name}
            title={season ? "Yes/No" : "Back/Lay"}
            value={
              season
                ? selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB"
                  ? "No"
                  : "Yes"
                : selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB"
                  ? "Lay"
                  : "Back"
            }
            valueContainerStyle={{ background: type?.color }}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
          />
          {!matchesMobile && <Box sx={{ width: "20px" }}></Box>}
          <BoxInput
            setDefaultValue={setDefaultValue}
            defaultValue={defaultValue}
            selectedColorBox={type?.color}
            getLatestBetAmount={(value) =>
              value && getLatestBetAmount(value, data)
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
            <Box sx={{ display: "flex", marginTop: "15px", marginX: "2px" }}>
              {buttonData?.slice(0, 4).map((v, index) => (
                <NumberData
                  key={index}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v.value}
                  label={v.label}
                  getLatestBetAmount={(value) =>
                    getLatestBetAmount(value, data)
                  }
                  setDefaultValue={setDefaultValue}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
              {buttonData?.slice(4, 8).map((v, index) => (
                <NumberData
                  key={index}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v.value}
                  label={v.label}
                  getLatestBetAmount={(value) =>
                    getLatestBetAmount(value, data)
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
          <PlaceBetCustomButton
            onClick={(e) => {
              if (defaultValue !== "") {
                setDValue(e);
                return "";
              }
            }}
            title={"Reset"}
            color={"#FF4949"}
          />
          <button
            // style={classes.CustomButton_Btn("#262626")}
            style={{
              color: "#fff",
              backgroundColor: "#262626",
              width: "150px",
              // width: { laptop: "150px", mobile: "130px" },
              height: "35px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              onSubmit(SubmitPayloadForPlaceBet(betOn, typeOfBet));
            }}
          >
            Submit
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(PlaceBet);
