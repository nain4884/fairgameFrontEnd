import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ARROWUP, BACKIMAGE, CHECK } from "../admin/assets/index";
import StyledImage from "./StyledImage";
import constants from "./helper/constants";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import LiveMarketComponent from "./LiveMarketComponent";
import CustomBox from "./CustomBox";
import CustomLoader from "./helper/CustomLoader";
import { SocketContext } from "../context/socketContext";

const MarketAnalysis = () => {
  const { socket } = useContext(SocketContext);
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState("0");
  const [max, setMax] = useState("2");
  const [matchData, setMatchData] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [marketIds, setMarketIds] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newMessage", (value) => {
        console.log(value);
      });

      socket.onevent = async (packet) => {

        if (packet.data[0] === "newMatchAdded") {
          getAllMatch();
        }

      };
    }
  }, [socket]);

  const handleClick = (value) => {
    setMax(value);
    setMode("1");
  };
  const changeSelected = (index, i) => {
    if (mode === "0") {
      return false;
    }
    const x = [...selected];
    if (x.includes(i.id)) {
      setMatchIds((prevIds) => prevIds.filter((matchId) => matchId !== i.id));
      setMarketIds((prevIds) =>
        prevIds.filter((marketId) => marketId !== i.marketId)
      );
      const updatedSelected = x.filter((id) => id !== i.id);
      setSelected(updatedSelected);
    } else {
      if (max == selected?.length) {
        toast.warn(`Only ${max} allowed`);
        return;
      }

      setMatchIds((prevIds) => [...prevIds, i.id]);
      setMarketIds((prevIds) => [...prevIds, i.marketId]);
      if (!x.includes(i.id)) {
        setSelected([...x, i.id]);
      }
    }
  };
  const { axios } = setRole();

  useEffect(() => {
    // console.log(selected, 'selcted')
  }, [selected]);
  const navigate = useNavigate();

  async function getAllMatch() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `/game-match/getAllMatch?isActveMatch=1&bets=0&pageNo=${currentPage}&pageLimit=${pageLimit}`
      );
      if (data.length > 0) {
        setLoading(false);
        setMatchData(data[0]);
        setPageCount(Math.ceil(parseInt(data[1]) / pageLimit));
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    getAllMatch();
  }, [currentPage]);

  function callPage(e, value) {
    setCurrentPage(parseInt(value));
  }
  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column", margin: "0.5%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginX: ".5%",
            padding: { mobile: "5px", laptop: "0px 8px" },
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            width: "100%",
            marginY: { mobile: "1%", tablet: "1%", laptop: "0" },
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              width: "100%",
              fontWeight: "700",
              marginY: "0.5%",
              marginLeft: "5px",
              alignSelf: "start",
            }}
          >
            MARKET ANALYSIS
          </Typography>
          {mode == "0" && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: {
                  mobile: "center",
                  tablet: "flex-end",
                  laptop: "flex-end",
                  marginRight: "0.5%"
                },
              }}
            >
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
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <CustomBox
                bg={"#E32A2A"}
                onClick={(e) => {
                  setMode("0");
                  setSelected([]);
                }}
                title={"Cancel"}
              />
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
                    navigate(`/${pathname.split("/")[1]}/match_submit`, {
                      state: {
                        activeTab: "Analysis",

                        match: Number(max),
                        matchIds: matchIds,
                        marketIds: marketIds,
                      },
                    });
                    // navigate(`/${pathname.split("/")[1]}/match_submit1`, {
                    //   state: { matchIds: matchIds, marketIds: marketIds },
                    // });
                  } else {
                    navigate(`/${pathname.split("/")[1]}/match_submit`, {
                      state: {
                        match: Number(max),
                        matchIds: matchIds,
                        marketIds: marketIds,
                        activeTab: "Analysis",
                      },
                    });
                  }
                }}
                title={"Submit"}
              />
              <Box sx={{ width: "10px" }}></Box>
            </Box>
          )}
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader />
        </Box>
      ) : (
        matchData?.length > 0 && (
          <>
            {matchData?.map((i, k) => {
              return (
                <LiveMarketComponent
                  key={i?.id}
                  data={i}
                  setSelected={() => changeSelected(k, i)}
                  mode={mode}
                  selected={!selected.includes(i?.id)}
                  team={i?.teamA}
                  team_2={i?.teamB}
                />
              );
            })}
            <Pagination
              page={currentPage}
              className="whiteTextPagination d-flex justify-content-center"
              count={pageCount}
              color="primary"
              onChange={callPage}
            />
          </>
        )
      )}
    </Box>
  );
};
export default MarketAnalysis;
