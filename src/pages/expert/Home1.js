import {
  Box,
  Button,
  Input,
  Pagination,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput, StyledImage } from "../../components";
import {
  ArrowDownBlack,
  ArrowDownWhite,
  Upload2 as Upload,
} from "../../expert/assets";
import { DatePicker } from "rsuite";
import Header from "./Header";
import Background from "./Background";
import "./style.css";
import DropDownSimple from "../../components/DropdownSimple";
import { defaultMarketId, matchType } from "../../components/helper/constants";
import microServiceAxios from "../../axios/microServiceAxios";
import { setDailogData } from "../../store/dailogModal";
import { useDispatch } from "react-redux";
import { setSelectedMatch } from "../../newStore/reducers/expertMatchDetails";
import { setRole } from "../../newStore";
const containerStyles = {
  marginTop: "10px",
};
const titleStyles = {
  color: "#202020",
  fontSize: { mobile: "12px", laptop: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const imputStyle = {
  fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" },
};
const inputContainerStyle = {
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

const stateDetail = {
  1: { field: "gameType", val: "" },
  2: { field: "startAt", val: "" },
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
};

export default function Home1() {
  const [Detail, setDetail] = useState(stateDetail);
const {axios}=setRole()
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
  });

  const [matches, setMatches] = useState([
    { EventName: "No Matches Available", MarketId: defaultMarketId },
  ]);
  const [marketId, setMarketId] = useState(defaultMarketId);

  const createMatch = async () => {
    try {
      let request = new FormData();
      let i;
      for (i = 0; i < 20; i++) {
        if ((!Detail[i + 1].val || Detail[i + 1].val !== 0) && i !== 19)
          request.append(`${Detail[i + 1].field}`, Detail[i + 1].val);
        if (i === 19) request.append(`${Detail[i + 1].field}`, marketId);
      }
      const { data } = await axios.post(`/game-match/addmatch`, request);
      if (data.message === "Match added successfully.")
        navigate("/expert/match");
    } catch (e) {
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
    getAllLiveMatches();
    console.log("Detail[2].val", Detail[2].val);
  }, [Detail[1].val]);

  const [showMatch, setShowMatch] = useState(false);
  const navigate = useNavigate();

  return (
    <Background>
      <Header />
      <Box
        sx={{ background: "white", borderRadius: "5px", m: "10px", p: "10px" }}
      >
        {/* <Box sx={{ display: "flex" }}>
                    <LabelValueComponent icon={ArrowDownWhite} valueStyle={{ color: "white" }} valueContainerStyle={{ background: "#0B4F26" }} containerStyle={{ flex: 1 }} title={"BetFair Match List"} value="India vs Pakistan" />
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
          <Box sx={{ display: "flex" }}>
            {/* <LabelValueComponent icon={ArrowDownBlack} valueStyle={{}} containerStyle={{ flex: 1 }} title={"Game"} value="Select Game" /> */}
            <Box sx={{ flex: 1, position: "relative" }}>
              <DropDownSimple
                valued="Select Account Type..."
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
                valueStyle={{ ...imputStyle, color: "white" }}
                title={"Game"}
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
                setDetail={setDetail}
                place={1}
              />
              {/* <DropDownSimple titleStyle={{ marginY: "0px", fontSize: "12px" }} valueContainerStyle={{ border: "0px", borderRadius: "5px" }} dropDownStyle={{ width: "100%", background: "#F2F2F2" }} containerStyle={{ width: "100%" }} title={'Game'} data={["Cricket", "Football", "Tennis", "Football", "Ice", "Hockey", "Volleyball", "Politics", "Basketball", "Table Tennis", "Darts"]} place={1} /> */}
            </Box>
            <Box sx={{ flex: 1, position: "relative", marginLeft: "1%" }}>
              <DropDownSimple
                valued="Select Account Type..."
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
                }}
                dropDownTextStyle={imputStyle}
                Detail={Detail}
                setDetail={setDetail}
                place={5}
              />
              {/* <DropDownSimple titleStyle={{ marginY: "0px", fontSize: "12px" }} valueContainerStyle={{ border: "0px", borderRadius: "5px" }} dropDownStyle={{ width: "100%", background: "#F2F2F2" }} containerStyle={{ width: "100%" }} title={'Match Name'} data={["India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England"]} place={2} /> */}
            </Box>
            {/* <LabelValueComponent icon={ArrowDownBlack} containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Match Name"} value="Enter Name of the Match..." /> */}
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
              title={"Team A"}
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
              title={"Team B"}
              type={"text"}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <LabelValueComponent
              icon={ArrowDownBlack}
              valueStyle={{}}
              containerStyle={{ flex: 1 }}
              title={"Start Time"}
              value="Select Start Time..."
              InputValType={"DatePickerVal"}
              place={2}
              DetailError={{ Error, setDetail, Detail, setError }}
            />
            <LabelValueComponent
              icon={Upload}
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              icon={Upload}
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              icon={Upload}
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            {/* <Input placeholder="Delhi" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"City"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={5} /> */}
          </Box>
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <LabelValueComponent
              valueStyle={{}}
              containerStyle={{ flex: 1 }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <LabelValueComponent
              valueStyle={{}}
              containerStyle={{ flex: 1 }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <LabelValueComponent
              containerStyle={{ flex: 1, marginLeft: "1%" }}
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
            <Box sx={{ flex: 1, marginLeft: "1%" }} />
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
              width: "15%",
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
              setShowMatch(false);
              setDetail(stateDetail);
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
            <Typography sx={{ color: "white" }}>Cancel</Typography>
          </Box>
        </Box>
      </Box>
      {/* {showMatch && <MatchListComp />} */}
    </Background>
  );
}

const LabelValueComponent = ({
  title,
  value,
  icon,
  containerStyle,
  valueStyle,
  valueContainerStyle,
  InputValType,
  place,
  DetailError,
  type,
  notShowSub,
  titleSize,
  headColor,
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
      {!notShowSub && (
        <ShowComponent
          InputValType={InputValType}
          value={value}
          valueContainerStyle={valueContainerStyle}
          valueStyle={valueStyle}
          icon={icon}
          place={place}
          DetailError={DetailError}
          type={type}
        />
      )}
    </Box>
  );
};

const fileUpload = async (e, position, DetailError) => {
  let file = e.target.files[0];
  DetailError.setDetail({
    ...DetailError.Detail,
    [position]: {
      ...DetailError.Detail[position],
      val: file,
    },
  });
  DetailError.setError({
    ...DetailError.error,
    [position]: {
      ...DetailError.Detail[position],
      val: file === undefined ? false : true,
    },
  });
};

const ShowComponent = ({
  InputValType,
  value,
  valueContainerStyle,
  valueStyle,
  icon,
  place,
  DetailError,
  type,
}) => {
  switch (InputValType) {
    case "InputVal":
      return (
        <Box
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          {/* <Input containerStyle={containerStyles} placeholder="1,000,000,000" titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Credit Reference"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={8} type={"Number"} /> */}
          <Input
            placeholder={`${value}`}
            value={DetailError.Detail[place].val}
            containerStyle={containerStyles}
            titleStyle={titleStyles}
            inputStyle={imputStyle}
            inputContainerStyle={inputContainerStyle}
            title={"City"}
            type={type}
            onChange={(e) => {
              DetailError.setDetail({
                ...DetailError.Detail,
                [place]: {
                  ...DetailError.Detail[place],
                  val:
                    type === "Number"
                      ? parseInt(e.target.value)
                      : e.target.value.toString(),
                },
              });
              DetailError.setError({
                ...DetailError.error,
                [place]: {
                  ...DetailError.Detail[place],
                  val:
                    type === "Number"
                      ? DetailError.Detail[place].val === 0
                      : DetailError.Detail[place].val === "",
                },
              });
            }}
          />
        </Box>
      );
    case "FileSelectVal":
      return (
        <Button
          variant="contained"
          component="label"
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => {
              fileUpload(e, place, DetailError);
            }}
          />
          {icon && (
            <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />
          )}
        </Button>
      );
    case "DatePickerVal":
      return (
        <DatePicker
          format="yyyy-MM-dd HH:mm"
          defaultValue={() =>
            DetailError?.Detail[2]?.val
              ? new Date(DetailError?.Detail[2]?.val)
              : new Date()
          } //(DetailError?.Detail[2]?.val)
          onChange={(e) => {
            console.log("e?.toString()", e?.toString());
            DetailError.setDetail({
              ...DetailError.Detail,
              [place]: {
                ...DetailError.Detail[place],
                val: e?.toString(),
              },
            });
          }}
        />
      );
    default:
      return (
        <Box
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          <Typography sx={[{ color: "black", fontSize: "11px" }, valueStyle]}>
            {value}
          </Typography>
          {icon && (
            <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />
          )}
        </Box>
      );
  }
};

const MatchListComp = () => {
  const [allMatch, setAllMatch] = useState([]);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const {axios}=setRole()
  const getAllMatch = async () => {
    try {
      let response = await axios.get(
        `/game-match/getAllMatch?&page=${currentPage}&limit=${pageLimit}`
      );
      setAllMatch(response.data[0]);
      setPageCount(
        Math.ceil(
          parseInt(response?.data[1] ? response.data[1] : 1) / pageLimit
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  const callPage = (e) => {
    setCurrentPage(parseInt(e.target.outerText));
  };
  useEffect(() => {
    getAllMatch();
  }, [currentPage, pageCount]);
  return (
    <Box
      sx={[
        {
          marginX: "10px",
          marginTop: "10px",
          minHeight: "200px",
          borderRadius: "10px",
          border: "2px solid white",
        },
        (theme) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <ListH />
      <ListHeaderT />
      {allMatch.map((element, i) => {
        return (
          <Row
            index={i + 1}
            containerStyle={{ background: (i + 1) % 2 === 0 ? "#ECECEC" : "" }}
            data={element}
          />
        );
      })}
      <Pagination
        className="whiteTextPagination d-flex justify-content-center"
        count={pageCount}
        color="primary"
        onChange={callPage}
      />
    </Box>
  );
};

const ListH = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      sx={{ justifyContent: "space-between", px: "10px", py: "10px" }}
    >
      <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "500" }}>
        Match List
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SearchInput placeholder={"Search Match..."} />
        <CusButton
          onClick={() => {
            navigate("/expert/home1");
          }}
          title={"Add Match"}
        />
      </Box>
    </Box>
  );
};

const CusButton = ({ title, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor:"pointer",
        height: "35px",
        minWidth: "100px",
        marginLeft: "10px",
        borderRadius: "5px",
        background: "#0B4F26",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "white", fontSize: "13px" }}>{title}</Typography>
    </Box>
  );
};

const ListHeaderT = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: "60px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Sr No.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Title</Typography>
      </Box>
    </Box>
  );
};

const Row = ({ index, containerStyle, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {axios}=setRole()
  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: { field: "apiMatchActive", val: data?.apiMatchActive || false },
    2: { field: "apiBookMakerActive", val: data?.apiBookMakerActive || false },
    3: { field: "apiSessionActive", val: data?.apiSessionActive || false },
    5: {
      field: "manualSessionActive",
      val: data?.manualSessionActive || false,
    },
    4: {
      field: "manualBookMakerActive",
      val: data?.manualBookMakerActive || false,
    },
  });

  function showDialogModal(isModalOpen, showRight, message, navigateTo, state) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      navigate(
        `/${window.location.pathname.split("/")[1]}/${navigateTo}`,
        state
      );
    }, [2000]);
  }

  async function submitMatchUpdation() {
    let defaultMatchStatus = {
      apiMatchActive: false,
      apiBookMakerActive: false,
      apiSessionActive: false,
      manualBookMakerActive: false,
      manualSessionActive: false,
    };
    let i;
    for (i = 0; i < 5; i++) {
      if (updateMatchStatus[i + 1].field === "apiMatchActive")
        defaultMatchStatus.apiMatchActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "apiBookMakerActive")
        defaultMatchStatus.apiBookMakerActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "apiSessionActive")
        defaultMatchStatus.apiSessionActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "manualBookMakerActive")
        defaultMatchStatus.manualBookMakerActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "manualSessionActive")
        defaultMatchStatus.manualSessionActive = updateMatchStatus[i + 1].val;
    }
    let payload = {
      matchId: data.id,
      ...defaultMatchStatus,
    };
    try {
      let response = await axios.post(
        `/game-match/updateMatchActiveStatus`,
        payload
      );
      if (response.data.message === "Match update successfully.") {     
        showDialogModal(true, true, response.data.message, "betodds", {
          state: { id: data.id, marketId: data.marketId },
        });
      }
    } catch (e) {
      console.log(e);
      showDialogModal(true, false, e.response.data.message);
    }
  }

  const navigateToAddBet = () => {
    navigate("/expert/addBet", {
      state: { id: data.id, marketId: data.marketId, gameType: data.gameType },
    });
  };
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          background: "#FFE094",
          alignItems: "center",
          borderBottom: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={{
          display: "flex",
          width: "60px",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>{index}</Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
        }}
      >
        <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
          <ButtonWithSwitch
            title={data.title}
            containerStyle={{ width: "30%" }}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={1}
          />
          <ButtonWithSwitch
            title="Bookmaker"
            containerStyle={{}}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={2}
          />
          <ButtonWithSwitch
            title="Session"
            containerStyle={{}}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={3}
          />
          <ButtonWithSwitch
            title={`Manual\nBookmaker`}           
            containerStyle={{ width: "13%" }}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={4}
          />
          <ButtonWithSwitch
            title={`Manual\nSession`}
            containerStyle={{}}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={5}
          />
        </Box>
        {/* <CusButton onClick={() => {
                    navigateToAddBet()
                }} title={"Add Bet"} /> */}
        <CusButton
          
          onClick={() => {
            submitMatchUpdation();
          }}
          title={"Submit"}
        />
      </Box>
    </Box>
  );
};

const ButtonWithSwitch = ({
  title,
  containerStyle,
  titleStyle,
  updateMatchStatus,
  setUpdateMatchStatus,
  place,
}) => {
  const [background, setBackground] = useState("#0B4F26");
  const [checked, setChecked] = useState(updateMatchStatus[place].val);
  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);
  return (
    <Box
      sx={[
        {
          height: "35px",
          minWidth: "100px",
          width: "14%",
          marginLeft: "10px",
          borderRadius: "5px",
          background: background,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={[
          {
            color: "white",
            fontWeight: "500",
            fontSize: "13px",
            marginLeft: "1vw",
            lineHeight: "14px",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <MaterialUISwitch
        checked={checked}
        onChange={(e) => {
          setChecked(!checked);
          setUpdateMatchStatus({
            ...updateMatchStatus,
            [place]: {
              ...updateMatchStatus[place],
              val: !checked,
            },
          });
        }}
      />
    </Box>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 35,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    marginTop: "8px",
    marginRight: "1px",
    padding: 0,
    paddingLeft: "3px",
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#10DC61",
      transform: "translateX(20px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "white",
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#10DC61",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FF4D4D",
    width: 18,
    height: 18,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
}));
export { MatchListComp };
