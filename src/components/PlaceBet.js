import {
  Input,
  Menu,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, CANCEL, CancelDark } from "../assets";
import "../components/index.css";
import StyledImage from "./StyledImage";
import { useSelector } from "react-redux";
import BoxInput from "./BoxInput";
import { toast } from "react-toastify";
import { setRole } from "../newStore";
const PlaceBet = ({
  open,
  refs,
  handleClose,
  currentMatch,
  season,
  onSubmit,
  onCancel,
  back,
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
  rates,
  fromOdds,
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

  const myDivRef = useRef(null);

  // const scrollToBottom = () => {
  //   myDivRef.current?.scrollIntoView({
  //     top: 2000,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
    if (!fromOdds) {
      // scrollToBottom();
      scrollToFullDiv()
    }
  }, [selectedValue, fromOdds]);




  const getLatestBetAmount = async (value, newData) => {
    console.log("value", value);
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
        body = { ...body, marketType: "", rate_percent: newData?.rate_percent };
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

  const CustomButton = ({ color, title, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: { laptop: "150px", mobile: "130px" },
          height: { laptop: "35px", mobile: "38px" },
          borderRadius: { mobile: "7px", laptop: "5px" },
          border: "2px solid white",
          alignItems: "center",
          justifyContent: "center",
          background: color,
          display: "flex",
        }}
      >
        <Typography
          sx={{ color: "white", fontWeight: "500", fontSize: "13px" }}
        >
          {title}
        </Typography>
      </Box>
    );
  };
  const [ip, setIP] = useState("");
  useEffect(() => {
    FetchIpAddress();
  }, []);

  async function FetchIpAddress() {
    const response = await fetch("https://geolocation-db.com/json/")
      .then((response) => {
        return response.json();
      }, "jsonp")
      .then((res) => {
        setIP(res);
      })
      .catch((err) => console.log(err));
  }

  const TeamsOdssData = ({
    input,
    title,
    value,
    containerStyle,
    valueContainerStyle,
    valueTextStyle,
    bet_condition,
  }) => {
    const [oddValue, setOddValue] = useState(currentOdds || "0");
    const selectedColorBox = useSelector(
      (state) => state.selectedColorBox
    )?.value;
    // console.log(selectedColorBox, "selectedColorBox");
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
                    mobile:
                      title == "Back/Lay" || title == "Yes/No"
                        ? "10px"
                        : "10px",
                    tablet:
                      title == "Back/Lay" || title == "Yes/No"
                        ? "10px"
                        : "10px",
                    laptop:
                      title == "Back/Lay" || title == "Yes/No"
                        ? "10px"
                        : "10px",
                  },
                  fontWeight:
                    title === "Back/Lay" || title === "Yes/No" ? "800" : "600",
                },
                valueTextStyle,
              ]}
            >
              {title === "Back/Lay"
                ? isBack
                  ? "Back"
                  : "Lay"
                : title === "Team"
                ? name
                : bet_condition
                ? bet_condition
                : isSessionYes
                ? "Yes"
                : "No"}
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
                  setCurrentOdds((prev) => Number(prev) - 1);
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
                  fontSize: { mobile: "12px", laptop: "16px" },
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
                  setCurrentOdds((prev) => Number(prev) + 1);
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
      stack: defaultValue,
      team_bet: name,
      country: ip?.country_name,
      ip_address: ip?.IPv4,
      stake: defaultValue,
      teamA_name: currentMatch?.teamA,
      teamB_name: currentMatch?.teamB,
      teamC_name: currentMatch?.teamC,
      marketType: marketType === "MATCH ODDS" ? "MATCH ODDS" : marketType,
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
      payload.odds = selectedValue;
      payload.sessionBet = true;
    }
    return payload;
  }




  const scrollToFullDiv = () => {
    if (myDivRef.current) {
      const { scrollTop, offsetHeight, scrollHeight } = myDivRef.current;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition < scrollHeight) {
        myDivRef.current.scrollTop = scrollHeight;
      }
    }
  };
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
          marginLeft: season ? 0 : 0,
          overflow: "hidden",

          width: { mobile: "98vw", tablet: "60vw", laptop: "38vw" },
          // boxShadow:
          //   "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
          // left: isSessionYes?"-30%": "95%"
        },
        // typeOfBet == "MATCH ODDS" || typeOfBet == "BOOKMAKER ?
        matchesMobile
          ? // ? { position: "absolute", right: back ? "-16.5vw" : "0vw" }
            // : { position: "absolute", right: back ? "-16.5vw" : "0vw" },
            { position: "absolute", right: back ? "0vw" : "0vw" }
          : typeOfBet == "Session"
          ? {
              position: "absolute",
              right: back ? "auto" : "0vw",
              left: isSessionYes ? "-30%" : "95%",
            }
          : {
              position: "absolute",
              right: back
                ? typeOfBet != "Session"
                  ? "1.5vw"
                  : "-16.5vw"
                : "0vw",
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
          <Box
            sx={{ display: "flex", alignItems: "center" }}
          >
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
            title={"Odds"}
            valueContainerStyle={{
              background: type?.color ? type?.color : "#F8C851",
            }}
            value={"60.00"}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
          />
          <TeamsOdssData
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
              {["2000", "3000", "5000", "10000"]?.map((v) => (
                <NumberData
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  getLatestBetAmount={(value) =>
                    getLatestBetAmount(value, data)
                  }
                  setDefaultValue={setDefaultValue}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
              {["20000", "100000", "200000", "500000"]?.map((v) => (
                <NumberData
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
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
          <CustomButton
            onClick={(e) => {
              if (defaultValue !== "") {
                setDValue(e);
                return "";
              }
              handleClose();
            }}
            title={"Reset"}
            color={"#FF4949"}
          />
          {/* <CustomButton
            onClick={() => {
              handleClose();
              onSubmit(SubmitPayloadForPlaceBet(betOn, typeOfBet));
            }}
            title={"Submit"}
            color={"#262626"}
          /> */}
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
              handleClose();
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
export default PlaceBet;
