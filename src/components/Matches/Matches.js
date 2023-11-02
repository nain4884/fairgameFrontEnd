import { Box, Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../newStore";
import {
  setAllBetRate,
  setAllSessionBets,
  setMatchOddsLive,
  setSelectedMatch,
  setSessionOddsLive,
  setUserAllMatches,
} from "../../newStore/reducers/matchDetails";
import CustomLoader from "../helper/CustomLoader";
import constants from "../helper/constants";
import "../index.css";
import Odds from "./Odds";

const MatchesComponent = ({
  doNavigateWithState,
  selected,
  setLoader,
  loader,
}) => {
  // const classes=useStyle()
  const [matchData, setMatchData] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  const dispatch = useDispatch();
  const { axios } = setRole();
  const {
    userAllMatches
  } = useSelector((state) => state?.matchDetails);

  useEffect(() => {
    getAllMatch();
  }, [currentPage, selected]);


  useEffect(() => {
    if(userAllMatches){
      setMatchData(userAllMatches)
    }
  },[userAllMatches])

  async function getAllMatch() {
    try {
      let { data } = await axios.get(`/game-match/getAllMatch`, {
        params: {
          isActveMatch: 1,
          bets: 0,
          pageNo: currentPage,
          pageLimit: pageLimit,
          filter: selected === "CRICKET" ? { gameType: "cricket" } : null,
        },
      });

      if (data.length > 0) {
        setLoader(false);
        dispatch(setUserAllMatches(data[0]))
        setMatchData(data[0]);
        setPageCount(Math.ceil(parseInt(data[1]) / constants.customPageLimit));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function callPage(e, value) {
    setCurrentPage(parseInt(value));
  }

  const handleUpdateMatch = async () => {
    getAllMatch();
  }

  const currentElements = matchData || [];
  console.log(matchData,"matchData")
  return (
    <>
      {currentElements.length > 0 && currentElements?.map((match) => {
        return (
          <Odds
            key={match.id}
            onClick={() => {
              dispatch(setSelectedMatch({}));
              dispatch(setMatchOddsLive([]));
              dispatch(setSessionOddsLive([]));
              dispatch(setAllBetRate([]));
              dispatch(setAllSessionBets([]));
              doNavigateWithState(match.id);
            }}
            top={true}
            blur={false}
            match={match}
            handleUpdateMatch={handleUpdateMatch}
          />
        );
      })}
      {matchData.length != 0 && (
        <Pagination
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          count={pageCount}
          color="primary"
          onChange={callPage}
        />
      )}
      {/* {loader && <CustomLoader text="" />} */}
      {loader && (
        <Box
          sx={{
            minHeight: "90vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader height={"70vh"} text={""} />
        </Box>
      )}
    </>
  );
};

export default memo(MatchesComponent);
