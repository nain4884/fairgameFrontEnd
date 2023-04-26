import { Box, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import DropDownSimple from "../../components/DropdownSimple";
import { matchType } from "../../components/helper/constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import microServiceAxios from "../../axios/microServiceAxios";
import Modal from "../../components/Modal";
import { setRole } from "../../newStore";

const stateDetail = {
  1: { field: "match_id", val: "" },
  2: { field: "matchType", val: "" },
  3: { field: "sessionBet", val: "" },
  4: { field: "teamA_lay", val: 0 },
  5: { field: "teamB_lay", val: 0 },
  6: { field: "teamA_Back", val: 0 },
  7: { field: "teamB_Back", val: 0 },
  8: { field: "drawRate", val: 0 },
  9: { field: "bet_condition", val: "" },
  10: { field: "no_rate", val: 0 },
  11: { field: "yes_rate", val: 0 },
  12: { field: "rate_percent", val: 0 },
};

const imputStyle = {
  fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" },
};

function AddBetComp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [Detail, setDetail] = useState(stateDetail);
  const [valueParsed, setValueParsed] = useState(false);
  const [id, setId] = useState("");

  const [matches, setMatches] = useState([
    { EventName: "No Matches Available", MarketId: "" },
  ]);

  const [thisMatchDetail, setThisMatchDetail] = useState();
  const { axios } = setRole();
  const [Error, setError] = useState({
    1: { field: "match_id", val: false },
    2: { field: "matchType", val: false },
    3: { field: "sessionBet", val: false },
    4: { field: "teamA_lay", val: false },
    5: { field: "teamB_lay", val: false },
    6: { field: "teamA_Back", val: false },
    7: { field: "teamB_Back", val: false },
    8: { field: "drawRate", val: false },
    9: { field: "bet_condition", val: false },
    10: { field: "no_rate", val: false },
    11: { field: "yes_rate", val: false },
    12: { field: "rate_percent", val: false },
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("");
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };

  function detailIdSet(id) {
    if (id != "") {
      setDetail({
        ...Detail,
        1: {
          ...Detail[1],
          val: id,
        },
      });
    }
  }

  function passIdMarId(id, gameType) {
    if (id) {
      setId(id);
      setError({
        ...Error,
        1: {
          ...Error[1],
          val: !id,
        },
      });
    }
    if (gameType) {
      setDetail({
        ...Detail,
        2: {
          ...Detail[2],
          val: gameType,
        },
      });
      setError({
        ...Error,
        2: {
          ...Error[2],
          val: !gameType,
        },
      });
    }
    setValueParsed(true);
  }

  const getAllActiveMatches = async () => {
    try {
      const { data } = await axios.get(`/game-match/getAllMatch`);
      let matchesList = [];
      data[0]?.forEach((match) => {
        matchesList.push({ EventName: match.title, MarketId: match.id });
      });
      setMatches(matchesList);
    } catch (e) {
      console.log(e);
    }
  };

  const getMatchDetail = async (idToFetch) => {
    try {
      const { data } = await axios.get(`/game-match/matchDetail/${idToFetch}`);
      if (data) {
        setThisMatchDetail(data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.message) {
        setShowSuccessModal(true);
        setShowModalMessage(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    const id = location.state?.id;
    const gameType = location.state?.gameType;
    passIdMarId(id, gameType);
    if (id) {
      getMatchDetail(id);
    } else {
      getAllActiveMatches();
    }
  }, [valueParsed]);

  async function createBet() {
    let payload = {
      match_id: id ? id : Detail[1].val,
      matchType: Detail[2].val,
      sessionBet: Detail[3].val == "Session Odds",
      teamA_lay: Detail[4].val,
      teamB_lay: Detail[5].val,
      teamA_Back: Detail[6].val,
      teamB_Back: Detail[7].val,
      drawRate: Detail[8].val,
    };
    let payload2 = {
      match_id: id ? id : Detail[1].val,
      matchType: Detail[2].val,
      sessionBet: Detail[3].val == "Session Odds",
      bet_condition: Detail[9].val,
      no_rate: Detail[10].val,
      yes_rate: Detail[11].val,
      rate_percent: Detail[12].val,
    };
    try {
      if (Detail[3].val == "Session Odds") payload = payload2;
      const { data } = await axios.post(`/betting/addBetting`, payload);
      if (data.message) {
        setShowSuccessModal(true);
        setShowModalMessage(data.message);
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.message) {
        setShowSuccessModal(true);
        setShowModalMessage(e.response.data.message);
      }
    }
  }

  return (
    <>
      <Box sx={{ margin: "15px" }}>
        <LabelValueComponent
          title={"Add Bet"}
          notShowSub={true}
          titleSize={"20px"}
          headColor={"white"}
        />
      </Box>
      <Box
        sx={{
          background: "#F8C851",
          marginTop: "20px",
          borderRadius: "5px",
          p: "10px",
          py: "20px",
          margin: "15px",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <DropDownSimple
          valued="Select Bet Type..."
          dropStyle={{
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
          }}
          valueStyle={{ ...imputStyle, color: "white" }}
          title={"Match / Session"}
          data={["Match Odds", "Session Odds"]}
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
          dropDownStyle={{
            width: "100%",
            marginLeft: "0px",
            marginTop: "0px",
            position: "absolute",
          }}
          dropDownTextStyle={imputStyle}
          Detail={Detail}
          setDetail={setDetail}
          place={3}
        />
        {!id && (
          <DropDownSimple
            valued="Select Sports..."
            dropStyle={{
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            }}
            valueStyle={{ ...imputStyle, color: "white" }}
            title={"Sports"}
            data={matchType}
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
            dropDownStyle={{
              width: "100%",
              marginLeft: "0px",
              marginTop: "0px",
              position: "absolute",
            }}
            dropDownTextStyle={imputStyle}
            Detail={Detail}
            setDetail={setDetail}
            place={2}
          />
        )}
        {!id && (
          <DropDownSimple
            valued="Select Active Match For Betting..."
            dropStyle={{
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            }}
            valueStyle={{ ...imputStyle, color: "white" }}
            title={"Available Match For Betting"}
            data={matches}
            setMarketId={detailIdSet}
            matchesSelect={true}
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
            dropDownStyle={{
              width: "100%",
              marginLeft: "0px",
              marginTop: "0px",
              position: "absolute",
            }}
            dropDownTextStyle={imputStyle}
            Detail={Detail}
            setDetail={setDetail}
            place={1}
          />
        )}
      </Box>
      {Detail[3].val === "Session Odds" && (
        <Box
          sx={{
            background: "#F8C851",
            marginTop: "20px",
            borderRadius: "5px",
            p: "10px",
            py: "20px",
            margin: "15px",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}
          >
            Session Bet
          </Typography>
          <Box sx={{ display: "flex", marginTop: "30px" }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Bet Condition"}
              type={"text"}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Rate Percent"}
              type={"text"}
              value="Enter Name of Team B..."
              InputValType={"InputVal"}
              place={12}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Yes Rate"}
              type={"text"}
              value="Enter Name of Team A..."
              InputValType={"InputVal"}
              place={11}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"No Rate"}
              type={"text"}
              value="Enter Name of Team B..."
              InputValType={"InputVal"}
              place={10}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
          </Box>
        </Box>
      )}
      {Detail[3].val === "Match Odds" && (
        <Box
          sx={{
            background: "#F8C851",
            marginTop: "20px",
            borderRadius: "5px",
            p: "10px",
            py: "20px",
            margin: "15px",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}
          >
            Match Bet
          </Typography>
          <Box sx={{ display: "flex", marginTop: "30px" }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Team A Back"}
              type={"text"}
              value="Enter Name of Team A..."
              InputValType={"InputVal"}
              place={6}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Team A Lay"}
              type={"text"}
              value="Enter Name of Team B..."
              InputValType={"InputVal"}
              place={4}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Draw Rate"}
              type={"text"}
              value="Enter Name of Team A..."
              InputValType={"InputVal"}
              place={8}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Team B Back"}
              type={"text"}
              value="Enter Name of Team A..."
              InputValType={"InputVal"}
              place={7}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Team B Lay"}
              type={"text"}
              value="Enter Name of Team B..."
              InputValType={"InputVal"}
              place={5}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
            />
          </Box>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}>
        <Box
          onClick={() => {
            createBet();
          }}
          sx={{
            background: "#10DC61",
            height: "40px",
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid black",
          }}
        >
          <Typography sx={{ color: "white", lineHeight: 1 }}>
            Create Bet
          </Typography>
        </Box>
        <Box
          onClick={() => {
            navigate("/expert/match");
          }}
          sx={{
            background: "#E32A2A",
            height: "40px",
            marginLeft: "20px",
            display: "flex",
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid black",
          }}
        >
          <Typography sx={{ color: "white", lineHeight: 1 }}>
            Cancel Bet
          </Typography>
        </Box>
      </Box>
      {thisMatchDetail && (
        <Box
          sx={{
            background: "#F8C851",
            marginTop: "20px",
            borderRadius: "5px",
            p: "10px",
            py: "20px",
            margin: "15px",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}
          >
            Match Detail
          </Typography>
          <Box sx={{ display: "flex", marginTop: "30px" }}>
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Session Bet"}
              titleSize={"20px"}
              type={"text"}
              value="Enter Name of Team A..."
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Team A Lay"}
              type={"text"}
              value="Enter Name of Team B..."
              InputValType={"InputVal"}
              place={4}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Draw Rate"}
              type={"text"}
              value="Enter Name of Team A..."
              InputValType={"InputVal"}
              place={8}
              DetailError={{
                Error,
                setDetail,
                Detail,
                setError,
                type: "Number",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            {/* <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team B Back"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={7} DetailError={{ Error, setDetail, Detail, setError, type: "Number" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team B Lay"} type={"text"} value="Enter Name of Team B..." InputValType={"InputVal"} place={5} DetailError={{ Error, setDetail, Detail, setError, type: "Number" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} /> */}
          </Box>
        </Box>
      )}
      {showSuccessModal && (
        <Modal
          message={showModalMessage}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"match"}
        />
      )}
    </>
  );
}

const LabelValueComponent = ({
  title,
  containerStyle,
  titleSize,
  headColor,
  InputValType,
  DetailError,
  place,
}) => {
  return (
    <Box className="beFairMatch" sx={[containerStyle]}>
      <Typography
        sx={{
          fontSize: titleSize ? titleSize : "12px",
          fontWeight: "600",
          color: headColor ? headColor : "#575757",
        }}
      >
        {title}
      </Typography>
      {InputValType ? (
        <input
          sx={{ borderRadius: "5px" }}
          type={DetailError?.type}
          onChange={(e) => {
            console.log(
              'DetailError?.type === "Number"',
              DetailError?.type === "Number"
            );
            DetailError.setDetail({
              ...DetailError.Detail,
              [place]: {
                ...DetailError.Detail[place],
                val:
                  DetailError?.type === "Number"
                    ? parseInt(e.target.value)
                    : e.target.value.toString(),
              },
            });
            DetailError.setError({
              ...DetailError.error,
              [place]: {
                ...DetailError.Detail[place],
                val:
                  DetailError?.type === "Number"
                    ? DetailError.Detail[place].val === 0
                    : DetailError.Detail[place].val === "",
              },
            });
          }}
        />
      ) : (
        <Typography></Typography>
      )}
    </Box>
  );
};

export default AddBetComp;
