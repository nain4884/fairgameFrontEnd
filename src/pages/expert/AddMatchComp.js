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
import { useDispatch, useSelector } from "react-redux";
import { setAllMatchs } from "../../newStore/reducers/expertMatchDetails";

const imputStyle = {
  fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" },
  textTransform: "capitalize",
};

const stateDetail = {
  1: { field: "gameType", val: "" },
  2: { field: "startAt", val: new Date() },
  3: { field: "betfair_match_max_bet", val: "" },
  4: { field: "bookmaker_manual", val: "" },
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
  23: { field: "EventId", val: null },
  24: { field: "MarketName1", val: "" },
  25: { field: "MarketMinBet1", val: "" },
  26: { field: "MarketMaxBet1", val: "" },
  27: { field: "MarketName2", val: "" },
  28: { field: "MarketMinBet2", val: "" },
  29: { field: "MarketMaxBet2", val: "" },
  30: { field: "MarketName3", val: "" },
  31: { field: "MarketMinBet3", val: "" },
  32: { field: "MarketMaxBet3", val: "" },
  33: { field: "tournament", val: "" },
  34: { field: "tournamentId", val: "" },
};

const AddMatchComp = () => {
  const [Detail, setDetail] = useState(stateDetail);
  const [numTimesToShow, setnumTimesToShow] = useState(0);
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { axios } = setRole();
  const [Error, setError] = useState({
    1: { field: "gameType", val: false },
    2: { field: "startAt", val: false },
    3: { field: "betfair_match_max_bet", val: false },
    4: { field: "bookmaker_manual", val: false },
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
    23: { field: "tournament", val: "" },
  });
  const selectionData = [1, 2, 3];
  const [matches, setMatches] = useState([
    { EventName: "No Matches Available", MarketId: defaultMarketId },
  ]);

  const [tournamentList, setTournamentList] = useState([
    { EventName: "No Tournaments Available", MarketId: defaultMarketId },
  ]);
  const [marketId, setMarketId] = useState(defaultMarketId);
  console.log("Detail", Detail);
  const createMatch = async (e) => {
    e?.preventDefault();
    try {
      let quick_bookmaker = [];
      if (show1) {
        quick_bookmaker = [
          {
            marketName: Detail[24]?.val,
            min_bet: Detail[18]?.val,
            max_bet: Detail[26]?.val,
          },
        ];
      }
      if (show2) {
        quick_bookmaker = [
          {
            marketName: Detail[24]?.val,
            min_bet: Detail[18]?.val,
            max_bet: Detail[26]?.val,
          },
          {
            marketName: Detail[27]?.val,
            min_bet: Detail[18]?.val,
            max_bet: Detail[29]?.val,
          },
        ];
      }
      if (show3) {
        quick_bookmaker = [
          {
            marketName: Detail[24]?.val,
            min_bet: Detail[18]?.val,
            max_bet: Detail[26]?.val,
          },
          {
            marketName: Detail[27]?.val,
            min_bet: Detail[18]?.val,
            max_bet: Detail[29]?.val,
          },
          {
            marketName: Detail[30]?.val,
            min_bet: Detail[18]?.val,
            max_bet: Detail[32]?.val,
          },
        ];
      }
      if (
        (Detail[1].val === "") && (Detail[9].val === "") &&
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
      if (quick_bookmaker.length === 0) {
        setError({
          ...Error,

          4: {
            ...Error[4],
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
      request.append("EventId", Detail[23].val);

      request.append("quick_bookmaker", JSON.stringify(quick_bookmaker));
      request.append("betfair_session_min_bet", Detail[18].val);
      request.append("bookmaker_manual_min_bet", Detail[18].val);
      request.append("betfair_bookmaker_min_bet", Detail[18].val);
      request.append("manaual_session_min_bet", Detail[18].val);
      request.append("betfair_match_min_bet", Detail[18].val);
      request.append("competitionId", Detail[34].val);
      request.append("competitionName", Detail[33].val);
      console.log("request", quick_bookmaker);
      console.log(Object.fromEntries(request), "request");
      const { data } = await axios.post(`/game-match/addmatch`, request);
      if (data.message === "Match added successfully.") {
        getAllMatch();
        toast.success(data.message);
        navigate("/expert/match");
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };

  const getAllMatch = async () => {
    try {
      let response = await axios.get(`/game-match/getLiveMatchSession`);
      dispatch(setAllMatchs(response.data.data[0]));
    } catch (e) {
      console.log(e);
    }
  };

  const getAllLiveTournaments = async () => {
    try {
      const { data } = await microServiceAxios.get(`/competitionList`);
      console.log("getAllLiveTournaments", data);
      let tournamentList = [];
      data.forEach((tournament) => {
        tournamentList.push({
          EventName: tournament?.competition?.name,
          EventId: tournament?.competition?.id,
          competitionRegion: tournament?.competitionRegion,
          marketCount: tournament?.marketCount,
        });
      });
      setTournamentList(tournamentList);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllLiveMatches = async () => {
    try {
      const { data } = await microServiceAxios.get(
        `/eventList/${Detail[34].val}`
      );
      let matchesList = [];
      data.forEach((match) => {
        matchesList.push({
          EventName: match?.event?.name,
          EventId: match?.event?.name,
          MarketId: match?.marketId,
          CompetitionId: match?.competition?.id,
          CompetitionName: match?.competition?.name,
          EventDetail: {
            EventDate: match?.event?.openDate,
            Runners: match?.runners,
            // Runnercount: match?.runners,
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
      getAllLiveTournaments();
      setError({
        ...Error,

        1: {
          ...Error[1],
          val: false,
        },
      });
    }
  }, [Detail[1].val]);

  useEffect(() => {
    if (Detail[33].val !== "") {
      getAllLiveMatches();
      setError({
        ...Error,

        23: {
          ...Error[23],
          val: false,
        },
      });
    }
  }, [Detail[33].val]);

  useEffect(() => {
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
    if (Detail[4].val !== "") {
      // alert(Detail[24].val)
      setError({
        ...Error,

        4: {
          ...Error[4],
          val: false,
        },
      });
      setnumTimesToShow(Detail[4].val);
      if (Detail[4].val == 1) {
        setshow1(true);
        setshow2(false);
        setshow3(false);
      } else if (Detail[4].val == 2) {
        setshow1(true);
        setshow2(true);
        setshow3(false);
      } else if (Detail[4].val == 3) {
        setshow1(true);
        setshow2(true);
        setshow3(true);
      }
    }

    if (Detail[5].val !== "") {
      setDetail({
        ...Detail,
        18: {
          ...Detail[18],
          val: "100",
        },
      });
    }
  }, [Detail[9].val, Detail[13].val, Detail[4].val, Detail[5].val]);

  return (
    <Background>
      {/* <Header /> */}
      <form onSubmit={createMatch}>
        <Box
          sx={{
            background: "white",
            borderRadius: "5px",
            margin: "10px",
            p: "10px",
          }}
        >
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
              <Box
                sx={{
                  position: "relative",
                  width: { mobile: "100%", laptop: "18%", tablet: "24%" },
                }}
              >
                <DropDownSimple
                  valued="Select Game Type..."
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: { mobile: "100%", laptop: "18%", tablet: "24%" },
                }}
              >
                <DropDownSimple
                  valued="Select tournament"
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  }}
                  valueStyle={{ ...imputStyle, color: "white" }}
                  title={"Tournament Name"}
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
                  type={"tournament"}
                  titleStyle={{ marginLeft: "0px", color: "#575757" }}
                  data={tournamentList}
                  setMarketId={setMarketId}
                  matchesSelect={true}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
                  dropDownTextStyle={imputStyle}
                  Detail={Detail}
                  setDetail={setDetail}
                  place={33}
                />
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
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                  type={"cricket"}
                  titleStyle={{ marginLeft: "0px", color: "#575757" }}
                  data={matches}
                  setMarketId={setMarketId}
                  matchesSelect={true}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
                  dropDownTextStyle={imputStyle}
                  Detail={Detail}
                  setDetail={setDetail}
                  place={5}
                />
              </Box>
              <Box
                sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
              >
                <LabelValueComponent
                  disable={true}
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
                  disable={true}
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
                  disable={true}
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
                  disable={true}
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
                  required={true}
                  containerStyle={{ flex: 1, width: "100%" }}
                  title={"Min Bet"}
                  type={"Number"}
                  value="Enter your Min Bet..."
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

              <Box
                sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
              >
                <LabelValueComponent
                  required={true}
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
              {/* <Box
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
            </Box> */}
              <Box
                sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
              >
                <LabelValueComponent
                  required={true}
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
                  required={true}
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
              {/* <Box
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
            </Box> */}
              {/* <Box
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
            </Box> */}
              <Box
                sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}
              >
                <LabelValueComponent
                  required={true}
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
                  required={true}
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

              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    width: { mobile: "100%", laptop: "18%", tablet: "24%" },
                  }}
                >
                  <DropDownSimple
                    valued="Select Bookmaker"
                    dropStyle={{
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                    }}
                    valueStyle={{ ...imputStyle, color: "white" }}
                    title={"Bookmaker"}
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
                    data={selectionData}
                    // setMarketId={setMarketId}
                    // matchesSelect={true}
                    dropDownStyle={{
                      width: "100%",
                      marginLeft: "0px",
                      marginTop: "0px",
                      position: "absolute",
                      maxHeight: "500px",
                      overflow: "auto",
                    }}
                    dropDownTextStyle={imputStyle}
                    Detail={Detail}
                    setError={setError}
                    setDetail={setDetail}
                    place={4}
                  />
                  {Error[4]?.val && (
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
                      Atleast One Bookmaker Required
                    </Typography>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  {show1 && (
                    <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                      <Box
                        sx={{
                          width: {
                            mobile: "100%",
                            laptop: "18%",
                            tablet: "24%",
                          },
                        }}
                      >
                        <LabelValueComponent
                          required={true}
                          containerStyle={{ flex: 1, width: "100%" }}
                          title={"Market Name"}
                          type={"Text"}
                          value="Enter Market Name..."
                          InputValType={"InputVal"}
                          place={24}
                          DetailError={{
                            Error,
                            setDetail,
                            Detail,
                            setError,
                            type: "String",
                          }}
                        />
                      </Box>

                      {/* <Box sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, width: "100%" }}
              title={"Min Bet"}
              type={"Number"}
              value="Enter Session Min Bet..."
              InputValType={"InputVal"}
              place={25}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "String",
              }}
              />
            </Box> */}

                      <Box
                        sx={{
                          width: {
                            mobile: "100%",
                            laptop: "18%",
                            tablet: "24%",
                          },
                        }}
                      >
                        <LabelValueComponent
                          required={true}
                          containerStyle={{ flex: 1, width: "100%" }}
                          title={"Max Limit"}
                          type={"Number"}
                          value="Enter Max Bet..."
                          InputValType={"InputVal"}
                          place={26}
                          DetailError={{
                            Error,
                            setDetail,
                            Detail,
                            setError,
                            type: "String",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  {show2 && (
                    <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                      <Box
                        sx={{
                          width: {
                            mobile: "100%",
                            laptop: "18%",
                            tablet: "24%",
                          },
                        }}
                      >
                        <LabelValueComponent
                          required={true}
                          containerStyle={{ flex: 1, width: "100%" }}
                          title={"Market Name"}
                          type={"Text"}
                          value="Enter Market Name..."
                          InputValType={"InputVal"}
                          place={27}
                          DetailError={{
                            Error,
                            setDetail,
                            Detail,
                            setError,
                            type: "String",
                          }}
                        />
                      </Box>

                      {/* <Box sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, width: "100%" }}
              title={"Min Bet"}
              type={"Number"}
              value="Enter Session Min Bet..."
              InputValType={"InputVal"}
              place={28}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "String",
              }}
            />
          </Box> */}

                      <Box
                        sx={{
                          width: {
                            mobile: "100%",
                            laptop: "18%",
                            tablet: "24%",
                          },
                        }}
                      >
                        <LabelValueComponent
                          required={true}
                          containerStyle={{ flex: 1, width: "100%" }}
                          title={"Max Limit"}
                          type={"Number"}
                          value="Enter Max Bet..."
                          InputValType={"InputVal"}
                          place={29}
                          DetailError={{
                            Error,
                            setDetail,
                            Detail,
                            setError,
                            type: "String",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  {show3 && (
                    <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                      <Box
                        sx={{
                          width: {
                            mobile: "100%",
                            laptop: "18%",
                            tablet: "24%",
                          },
                        }}
                      >
                        <LabelValueComponent
                          required={true}
                          containerStyle={{ flex: 1, width: "100%" }}
                          title={"Market Name"}
                          type={"Text"}
                          value="Enter Market Name..."
                          InputValType={"InputVal"}
                          place={30}
                          DetailError={{
                            Error,
                            setDetail,
                            Detail,
                            setError,
                            type: "String",
                          }}
                        />
                      </Box>

                      {/* <Box sx={{ width: { mobile: "100%", laptop: "18%", tablet: "24%" } }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, width: "100%" }}
              title={"Min Bet"}
              type={"Number"}
              value="Enter Session Min Bet..."
              InputValType={"InputVal"}
              place={31}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "String",
              }}
            />
          </Box> */}

                      <Box
                        sx={{
                          width: {
                            mobile: "100%",
                            laptop: "18%",
                            tablet: "24%",
                          },
                        }}
                      >
                        <LabelValueComponent
                          required={true}
                          containerStyle={{ flex: 1, width: "100%" }}
                          title={"Max Limit"}
                          type={"Number"}
                          value="Enter Max Bet..."
                          InputValType={"InputVal"}
                          place={32}
                          DetailError={{
                            Error,
                            setDetail,
                            Detail,
                            setError,
                            type: "String",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}
          >
            <Button
              type="submit"
              sx={{
                background: "#10DC61",
                cursor: "pointer",
                height: "40px",
                width: { mobile: "50%", laptop: "15%", tablet: "15%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid black",
                "&:hover": {
                  background: "#10DC61",
                },
              }}
            >
              <Typography sx={{ color: "white" }}>Create</Typography>
            </Button>
            <Box
              onClick={() => {
                setDetail(stateDetail);
                navigate("/expert/home");
              }}
              sx={{
                background: "#E32A2A",
                height: "40px",
                cursor: "pointer",
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
      </form>
    </Background>
  );
};

export default AddMatchComp;
