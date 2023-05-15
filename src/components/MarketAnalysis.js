import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARROWUP, BACKIMAGE, CHECK } from "../admin/assets/index";
import StyledImage from "./StyledImage";
import constants from "./helper/constants";
import { setRole } from "../newStore";
const LiveMarketComponent = ({
  team,
  team_2,
  selected,
  mode,
  setSelected,
  data,
}) => {
  const navigate = useNavigate();
  const StockBox = ({ team, value, up }) => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "10px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { mobile: "13px", laptop: "14px" },
            fontWeight: "700",
          }}
        >
          {team}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "13px", laptop: "16px" },
              marginRight: "5px",
              fontWeight: "700",
            }}
          >
            {value}
          </Typography>
          {(up == true || up == false) && (
            <StyledImage
              src={
                up
                  ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                  : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
              }
              sx={{
                height: "25px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "25px",
              }}
            />
          )}
          {!team && (
            <img style={{ width: "20px", height: "12px" }} src={ARROWUP} />
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      onClick={() => {
        if (mode == "0") {
          navigate("/admin/delete_bet", { state: { submit: true } });
        }
        setSelected();
      }}
      sx={{
        cursor: "pointer",
        width: "99%",
        display: "flex",
        position: "relative",
        marginY: "6px",
        alignSelf: "center",
        justifyContent: "space-evenly",
        height: "55px",
        flexDirection: { mobile: "column", laptop: "row" },
        marginX: ".5%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 11,
          width: "50px",
          height: "15px",
          top: "-8px",
          left: mode == "1" ? "65px" : "10px",
          background: "#46CF4D",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid white",
        }}
      >
        <Typography
          sx={{
            fontSize: { laptop: "8px", mobile: "8px" },
            color: "white",
            fontStyle: "italic",
          }}
        >
          LIVE NOW
        </Typography>
      </Box>
      {mode == "1" && (
        <Box
          sx={{
            width: "55px",
            height: "55px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1.5px solid white",
            background: !selected ? "#46CF4D" : "rgba(0,0,0,.5)",
          }}
        >
          <img src={CHECK} style={{ width: "40px", height: "40px" }} />
        </Box>
      )}
      <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
        <Box
          sx={{
            background: "#F8C851",
            paddingY: { mobile: 0.5, laptop: 0 },
            width: { mobile: "99%", laptop: "45%" },
            height: "100%",
            display: "flex",
            alignItems: "center",
            marginX: "2px",
            border: "1.5px solid white",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "16px", mobile: "17px" },
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            {team} Vs {team_2}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "55%",
            alignSelf: "center",
            display: "flex",
            height: "100%",
            marginTop: { mobile: "2px", laptop: 0 },
          }}
        >
          <Box
            sx={{
              background: "#27AC1E",
              width: "34%",
              height: "100%",
              border: "1.5px solid white",
            }}
          >
            <StockBox value={"+1,000,000,000"} up={true} team={team} />
          </Box>
          <Box
            sx={{
              background: "#E32A2A",
              width: "33%",
              height: "100%",
              marginX: "2px",
              border: "1.5px solid white",
            }}
          >
            <StockBox value={"-1,000,000,000"} up={false} team={team_2} />
          </Box>
          <Box
            sx={{
              background: "#0B4F26",
              width: "33%",
              height: "100%",
              border: "1.5px solid white",
            }}
          >
            <StockBox value={"1,000,000,000"} team={"Total Bet"} />
          </Box>
        </Box>
        {selected && mode == "1" && (
          <Box
            sx={{
              width: "99.67%",
              marginRight: ".1%",
              height: "94%",
              marginTop: "1.5px",
              background: "rgba(0,0,0,.6)",
              position: "absolute",
              right: 0,
            }}
          ></Box>
        )}
      </Box>
    </Box>
  );
};
const CustomBox = ({ title, onClick }) => {
  return (
    <Box onClick={onClick} sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "140px",
          height: "35px",
          justifyContent: "center",
          border: "2px solid white",
          alignItems: "center",
          background: "#F8C851",
          borderRadius: "5px",
          display: "flex",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
const MarketAnalysis = () => {
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState("0");
  const [max, setMax] = useState("2");
  const [matchData, setMatchData] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const handleClick = (value) => {
    setMax(value);
    setMode("1");
  };
  const changeSelected = (index) => {
    if (mode == "0") {
      return false;
    }
    let x = [...selected];
    if (x.includes(index?.toString())) {
      x.splice(x.indexOf(index?.toString()), 1);
      setSelected([...x]);
    } else {
      if (max == selected?.length) {
        return;
      }
      let x = [...selected];
      x.push(index?.toString());
      setSelected([...x]);
    }
  };

  const { axios } = setRole();

  useEffect(() => {
    // console.log(selected, 'selcted')
  }, [selected]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMatch();
  }, [currentPage, pageCount]);

  async function getAllMatch() {
    try {
      let { data } = await axios.get(
        `/game-match/getAllMatch?isActveMatch=1&bets=0&pageNo=${currentPage}&pageLimit=${pageLimit}`
      );
      if (data.length > 0) {
        setMatchData(data[0]);
        setPageCount(Math.ceil(parseInt(data[1]) / pageLimit));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box sx={{ display: "flex", width: "100vw", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginX: ".5%",
          marginTop: ".5%",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "700",
            marginY: "0.5%",
            alignSelf: "start",
          }}
        >
          MARKET ANALYSIS
        </Typography>
        {mode == "0" && (
          <Box sx={{ display: "flex" }}>
            <CustomBox
              onClick={(e) => {
                handleClick("2");
              }}
              title={"2 Match Screen"}
            />
            <Box sx={{ width: "10px" }}></Box>
            <CustomBox
              onClick={(e) => {
                handleClick("3");
              }}
              title={"3 Match Screen"}
            />
            <Box sx={{ width: "10px" }}></Box>
            <CustomBox
              onClick={(e) => {
                handleClick("4");
              }}
              title={"4 Match Screen"}
            />
          </Box>
        )}
        {mode == "1" && (
          <Box sx={{ display: "flex" }}>
            <CustomBox
              onClick={(e) => {
                if (max == "2") {
                  if (selected.length != 2) {
                    return;
                  }
                } else if (max == "3") {
                  if (selected.length != 3) {
                    return;
                  }
                } else if (max == "4") {
                  if (selected.length != 4) {
                    return;
                  }
                }
                if (selected) setMode("0");
                setSelected([]);
                if (max == "3") {
                  navigate("/admin/match_submit1");
                } else {
                  navigate("/admin/match_submit", {
                    state: { match: Number(max) },
                  });
                }
              }}
              title={"Submit"}
            />
            <Box sx={{ width: "10px" }}></Box>
          </Box>
        )}
      </Box>
      {matchData?.length > 0 &&
        matchData?.map((i, k) => {
          console.log("i", i, k);
          return (
            <LiveMarketComponent
              key={i?.id}
              data={i}
              setSelected={() => changeSelected(k)}
              mode={mode}
              selected={!selected.includes(k?.toString())}
              team={i?.teamA}
              team_2={i?.teamB}
            />
          );
        })}
    </Box>
  );
};
export default MarketAnalysis;
