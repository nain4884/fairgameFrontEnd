// https://www.sciencekids.co.nz/images/pictures/flags680/India.jpg
// https://www.sciencekids.co.nz/images/pictures/flags680/Pakistan.jpg
import {
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import "./index.css";
import {
  ARROWUP,
  Header,
  INDIA,
  Info,
  Lock,
  Logout,
  PAKISTAN,
  TIME,
  UD,
} from "../assets";
import { useState, useEffect } from "react";
import { apiBasePath } from "./helper/constants";
import ReactHtmlParser from "react-html-parser";

const MatchComponent = ({ currentMatch, liveScoreData, submit }) => {
  console.log("liveScoreData :", liveScoreData);
  const [visible, setVisible] = useState(true);
  const [overscore, setOverscore] = useState("23");
  const [ballOutcomes, setBallOutcomes] = useState([]);
  const [ballLastOutcomes, setBallLastOutcomes] = useState([]);
  const [lastOverRun, setLastOverRun] = useState("");
  const [currentOverRun, setCurrentOverRun] = useState("");
  const [innings, setInnings] = useState([]);

  useEffect(() => {
    if (liveScoreData) {
      setBallOutcomes(liveScoreData?.CurrentOver?.Balls);
      setCurrentOverRun(liveScoreData?.CurrentOver?.Runs);
      setBallLastOutcomes(liveScoreData?.LastOver?.Balls);
      setLastOverRun(liveScoreData?.LastOver?.Runs);
      setInnings(liveScoreData?.Innings);
    }
  }, [liveScoreData]);

  return (
    <Box
    key="odds"
    sx={{
      position: "relative",
      display: "flex",
      backgroundColor: "white",
      padding: { mobile: "1px", laptop: ".1vh" },
      flexDirection: "column",
      marginY: { mobile: "2px", laptop: ".5vh" },
      marginTop: { mobile: "0" },
      width: { mobile: "98%", laptop: "100%" },
      marginX: {mobile:"1vw",laptop:"0px"},
      alignSelf: {
        mobile: "center",
        tablet: "center",
        laptop: "flex-start",
      },
    }}
  >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "13px", tablet: "10px", mobile: "10px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Live Scoreboard
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
            // '#262626'
          }}
        >
          <div className="slanted"></div>
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          />
        </Box>
      </Box>
      {visible && ReactHtmlParser(liveScoreData)}
      </Box>


  );
};

export default MatchComponent;
