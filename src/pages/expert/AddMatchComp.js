import React, { useEffect, useState } from "react";
import Background from "./Background";
import { Box, Button, Input, Typography } from "@mui/material";
import { StyledImage } from "../../components";
import { defaultMarketId, matchType } from "../../components/helper/constants";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";
import { useNavigate } from "react-router-dom";
import microServiceAxios from "../../axios/microServiceAxios";
import { DatePicker } from "rsuite";
import DropDownSimple from "../../components/DropdownSimple";
import { ArrowDownBlack, Upload } from "../../expert/assets";
import LabelValueComponent from "./LabelValueComponent";
const imputStyle = {
  fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" },
  textTransform: "capitalize",
};

const stateDetail = {
  1: { field: "gameType", val: "" },
  2: { field: "startAt", val: new Date() },
  3: { field: "betfair_match_max_bet", val: "" },
  4: { field: "bookmaker_manual_max_bet", val: "" },
  5: { field: "title", val: "" },
  6: { field: "matchImage", val: "" },
  7: { field: "betfair_session_min_bet", val: "" },
  8: { field: "bookmaker_manual_min_bet", val: "" },
  9: { field: "teamA", val: "" },
  10: { field: "teamA_Image", val: "" },
  11: { field: "betfair_session_max_bet", val: "" },
  12: { field: "betfair_bookmaker_min_bet", val: "" },
  13: { field: "teamB", val: "" },
  14: { field: "teamB_Image", val: "" },
  15: { field: "betfair_bookmaker_max_bet", val: "" },
  16: { field: "manaual_session_min_bet", val: "" },
  17: { field: "teamC", val: "" },
  18: { field: "betfair_match_min_bet", val: "" },
  19: { field: "manaual_session_max_bet", val: "" },
  20: { field: "marketId", val: "" },
  21: { field: "delaySecond", val: "" },
  22: { field: "CompetitionName", val: "" },
};

const AddMatchComp = () => {
  const [Detail, setDetail] = useState(stateDetail);
  const navigate = useNavigate();

  const { axios } = setRole();
  const [Error, setError] = useState({
    1: { field: "gameType", val: false },
    2: { field: "startAt", val: false },
    3: { field: "betfair_match_max_bet", val: false },
    4: { field: "bookmaker_manual_max_bet", val: false },
    5: { field: "title", val: false },
    6: { field: "matchImage", val: false },
    7: { field: "betfair_session_min_bet", val: false },
    8: { field: "bookmaker_manual_min_bet", val: false },
    9: { field: "teamA", val: false },
    10: { field: "teamA_Image", val: false },
    11: { field: "betfair_session_max_bet", val: false },
    12: { field: "betfair_bookmaker_min_bet", val: false },
    13: { field: "teamB", val: false },
    14: { field: "teamB_Image", val: false },
    15: { field: "betfair_bookmaker_max_bet", val: false },
    16: { field: "manaual_session_min_bet", val: false },
    17: { field: "teamC", val: false },
    18: { field: "betfair_match_min_bet", val: false },
    19: { field: "manaual_session_max_bet", val: false },
    20: { field: "marketId", val: false },
    21: { field: "delaySecond", val: false },
    22: { field: "CompetitionName", val: false },
  });
  const [matches, setMatches] = useState([
    { EventName: "No Matches Available", MarketId: defaultMarketId },
  ]);
  const [marketId, setMarketId] = useState(defaultMarketId);
  console.log("Detail", matches);
  const createMatch = async () => {
    try {
      if (
        (Detail[1].val === "") & (Detail[9].val === "") &&
        Detail[13].val === ""
      ) {
        setError({
          ...Error,
          9: {
            ...Error[9],
            val: true,
          },
          1: {
            ...Error[1],
            val: true,
          },
          13: {
            ...Error[13],
            val: true,
          },
        });
        return false;
      }

      if (Detail[1].val === "") {
        setError({
          ...Error,

          1: {
            ...Error[1],
            val: true,
          },
        });
        return false;
      }

      if (Detail[9].val === "") {
        setError({
          ...Error,

          9: {
            ...Error[9],
            val: true,
          },
        });
        return false;
      }
      if (Detail[13].val === "") {
        setError({
          ...Error,

          13: {
            ...Error[13],
            val: true,
          },
        });
        return false;
      }

      let request = new FormData();
      let i;
      for (i = 0; i < 21; i++) {
        if ((!Detail[i + 1].val || Detail[i + 1].val !== 0) && i !== 19)
          request.append(`${Detail[i + 1].field}`, Detail[i + 1].val);
        if (i === 19) request.append(`${Detail[i + 1].field}`, marketId);
      }
      const { data } = await axios.post(`/game-match/addmatch`, request);
      if (data.message === "Match added successfully.")
        toast.success(data.message);
      navigate("/expert/match");
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };

  const getAllLiveMatches = async () => {
    try {
      const { data } = await microServiceAxios.get(
        `/matchList?sports=${Detail[1].val}`
      );
      let matchesList = [];
      data.forEach((match) => {
        matchesList.push({
          EventName: match.EventName,
          MarketId: match.MarketId,
          CompetitionId: match.CompetitionId,
          CompetitionName: match.CompetitionName,
          EventDetail: {
            EventDate: match.EventDate,
            Runners: match.Runners,
            Runnercount: match.Runnercount,
          },
        });
      });
      setMatches(matchesList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (Detail[1].val !== "") {
      getAllLiveMatches();
      setError({
        ...Error,

        1: {
          ...Error[1],
          val: false,
        },
      });
    }
    if (Detail[9].val !== "") {
      setError({
        ...Error,

        9: {
          ...Error[9],
          val: false,
        },
      });
    }
    if (Detail[13].val !== "") {
      setError({
        ...Error,

        13: {
          ...Error[13],
          val: false,
        },
      });
    }
  }, [Detail[1].val, Detail[9].val, Detail[13].val]);

  return (
    <Background>
      {/* <Header /> */}
      <Box
        sx={{
          background: "white",
          borderRadius: "5px",
          margin: "10px",
          p: "10px",
        }}
      >
        {/* <Box sx={{ display: "flex" }}>
                  <LabelValueComponent icon={ArrowDownWhite} valueStyle={{ color: "white" }} valueContainerStyle={{ background: "#0B4F26" }}  containerStyle={{ flex: 1, width: "100%", }} title={"BetFair Match List"} value="India vs Pakistan" />
                  <LabelValueComponent icon={ArrowDownWhite} valueStyle={{ color: "white" }} valueContainerStyle={{ background: "#0B4F26" }} containerStyle={{ flex: 1, marginLeft: "20px" }} title={"BetFair Maximum Amount"} value="$ 1,00,000,000,000,000" />
              </Box> */}
        <Box sx={{ margin: "15px" }}>
          <LabelValueComponent
            title={"Add Match"}
            notShowSub={true}
            titleSize={"20px"}
            headColor={"#000000"}
          />
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            marginTop: "20px",
            borderRadius: "5px",

            p: "10px",
            py: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* <LabelValueComponent icon={ArrowDownBlack} valueStyle={{}}  containerStyle={{ flex: 1, width: "100%", }} title={"Game"} value="Select Game" /> */}
            <Box
              sx={{
                position: "relative",
                width: { mobile: "100%", laptop: "18%", tablet: "24%" },
              }}
            >
              <DropDownSimple
                valued="Select Game Type..."
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
                valueStyle={{ ...imputStyle, color: "white" }}
                title={"Game *"}
                valueContainerStyle={{
                  height: "45px",
                  marginX: "0px",
                  background: "#0B4F26",
                  border: "1px solid #DEDEDE",
                  borderRadius: "5px",
                }}
                containerStyle={{
                  width: "100%",
                  position: "relative",
                  marginTop: "5px",
                }}
                titleStyle={{ marginLeft: "0px", color: "#575757" }}
                data={matchType}
                dropDownStyle={{
                  width: "100%",
                  marginLeft: "0px",
                  marginTop: "0px",
                  position: "absolute",
                }}
                dropDownTextStyle={imputStyle}
                Detail={Detail}
                setError={setError}
                setDetail={setDetail}
                place={1}
              />
              {Error[1]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      mobile: "10px",
                      laptop: "12px",
                      tablet: "12px",
                    },
                  }}
                >
                  Game Type Required
                </Typography>
              )}
              {/* <DropDownSimple titleStyle={{ marginY: "0px", fontSize: "12px" }} valueContainerStyle={{ border: "0px", borderRadius: "5px" }} dropDownStyle={{ width: "100%", background: "#F2F2F2" }} containerStyle={{ width: "100%" }} title={'Game'} data={["Cricket", "Football", "Tennis", "Football", "Ice", "Hockey", "Volleyball", "Politics", "Basketball", "Table Tennis", "Darts"]} place={1} /> */}
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { mobile: "100%", laptop: "18%", tablet: "24%" },
              }}
            >
              <DropDownSimple
                valued="Select match"
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
                valueStyle={{ ...imputStyle, color: "white" }}
                title={"Match Name"}
                valueContainerStyle={{
                  height: "45px",
                  marginX: "0px",
                  background: "#0B4F26",
                  border: "1px solid #DEDEDE",
                  borderRadius: "5px",
                }}
                containerStyle={{
                  width: "100%",
                  position: "relative",
                  marginTop: "5px",
                }}
                titleStyle={{ marginLeft: "0px", color: "#575757" }}
                data={matches}
                setMarketId={setMarketId}
                matchesSelect={true}
                dropDownStyle={{
                  width: "100%",
                  marginLeft: "0px",
                  marginTop: "0px",
                  position: "absolute",
                  maxHeight:"400px",
                  overflow:"auto"
                }}
                dropDownTextStyle={imputStyle}
                Detail={Detail}
                setDetail={setDetail}
                place={5}
              />
              {/* <DropDownSimple titleStyle={{ marginY: "0px", fontSize: "12px" }} valueContainerStyle={{ border: "0px", borderRadius: "5px" }} dropDownStyle={{ width: "100%", background: "#F2F2F2" }} containerStyle={{ width: "100%" }} title={'Match Name'} data={["India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England"]} place={2} /> */}
            </Box>
         {Detail[22].val!=="" &&  <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Competition Name"}
                type={"text"}
                required={true}
                value={Detail[22].val}
                InputValType={""}
                place={22}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
              {Error[22]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      mobile: "10px",
                      laptop: "12px",
                      tablet: "12px",
                    },
                  }}
                >
                  Competition Name Required
                </Typography>
              )}
            </Box>}
            {/* <LabelValueComponent icon={ArrowDownBlack} containerStyle={{ flex: 1,  }} title={"Match Name"} value="Enter Name of the Match..." /> */}
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team A *"}
                type={"text"}
                required={true}
                value="Enter Name of Team A..."
                InputValType={"InputVal"}
                place={9}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
              {Error[9]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      mobile: "10px",
                      laptop: "12px",
                      tablet: "12px",
                    },
                  }}
                >
                  Team A name Required
                </Typography>
              )}
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team B *"}
                type={"text"}
                required={true}
                value="Enter Name of Team B..."
                InputValType={"InputVal"}
                place={13}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
              {Error[13]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      mobile: "10px",
                      laptop: "12px",
                      tablet: "12px",
                    },
                  }}
                >
                  {" "}
                  Team B name Required
                </Typography>
              )}
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              {" "}
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team C"}
                type={"text"}
                value="Enter Name of Team C..."
                InputValType={"InputVal"}
                place={17}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>

            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                icon={ArrowDownBlack}
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Start Time"}
                value="Select Start Time..."
                InputValType={"DatePickerVal"}
                place={2}
                DetailError={{ Error, setDetail, Detail, setError }}
              />
              {Error[2]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      mobile: "10px",
                      laptop: "12px",
                      tablet: "12px",
                    },
                  }}
                >
                  Start Time Required
                </Typography>
              )}
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                icon={Upload}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Image (Optional)"}
                value="No File Selected..."
                InputValType={"FileSelectVal"}
                place={6}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                icon={Upload}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team A Image (Optional)"}
                value="No File Selected..."
                InputValType={"FileSelectVal"}
                place={10}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                icon={Upload}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team B Image (Optional)"}
                value="No File Selected..."
                InputValType={"FileSelectVal"}
                place={14}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Match Min Bet"}
                type={"Number"}
                value="Enter your Match Min Bet..."
                InputValType={"InputVal"}
                place={18}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            {/* <Input placeholder="Delhi" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"City"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={5} /> */}

            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Match Max Bet"}
                type={"Number"}
                value="Enter your Match Max Bet..."
                InputValType={"InputVal"}
                place={3}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "Number",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Session Min Bet"}
                type={"Number"}
                value="Betfair Session Min Bet..."
                InputValType={"InputVal"}
                place={7}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Session Max Bet"}
                type={"Number"}
                value="Betfair Session Max Bet..."
                InputValType={"InputVal"}
                place={11}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Bookmaker Max Bet"}
                type={"Number"}
                value="Enter  Bookmaker Max Bet..."
                InputValType={"InputVal"}
                place={15}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Bookmaker Min Bet"}
                type={"Number"}
                value="Enter Bookmaker Min Bet..."
                InputValType={"InputVal"}
                place={12}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Bookmaker Manual Max Bet"}
                type={"Number"}
                value="Enter Bookmaker Manaul Max Bet..."
                InputValType={"InputVal"}
                place={4}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Bookmaker Manual Min Bet"}
                type={"Number"}
                value="Enter Bookmaker Manaul Max Bet..."
                InputValType={"InputVal"}
                place={8}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Manaual Session Min Bet"}
                type={"Number"}
                value="Enter Session Min Bet..."
                InputValType={"InputVal"}
                place={16}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Manaual Session Max Bet"}
                type={"Number"}
                value="Enter Session Max Bet..."
                InputValType={"InputVal"}
                place={19}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            <Box
              sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
            >
              <LabelValueComponent
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Delay Time Limit"}
                type={"Number"}
                value="Enter Delay Time..."
                InputValType={"InputVal"}
                place={21}
                DetailError={{
                  Error,
                  setDetail,
                  Detail,
                  setError,
                  type: "String",
                }}
              />
            </Box>
            {/* <Box sx={{ flex: 1,  }} /> */}
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}
        >
          <Box
            onClick={() => {
              createMatch();
            }}
            sx={{
              background: "#10DC61",
              height: "40px",
              width: { mobile: "50%", laptop: "15%", tablet: "15%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid black",
            }}
          >
            <Typography sx={{ color: "white" }}>Create</Typography>
          </Box>
          <Box
            onClick={() => {
              setDetail(stateDetail);
              navigate("/expert/home");
            }}
            sx={{
              background: "#E32A2A",
              height: "40px",
              marginLeft: "20px",
              display: "flex",
              width: { mobile: "50%", laptop: "15%", tablet: "15%" },
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid black",
            }}
          >
            <Typography sx={{ color: "white" }}>Cancel</Typography>
          </Box>
        </Box>
      </Box>
    </Background>
  );
};

export default AddMatchComp;
