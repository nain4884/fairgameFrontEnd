import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "../index.css";
import Odds from "./Odds";
import { useDispatch } from "react-redux";
import {
  setAllBetRate,
  setMatchOddsLive,
  setSelectedMatch,
  setSessionOddsLive,
} from "../../newStore/reducers/matchDetails";
import { setRole } from "../../newStore";
import constants from "../helper/constants";

const MatchesComponent = ({ doNavigateWithState, selected }) => {
  // const classes=useStyle()
  const [matchData, setMatchData] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const dispatch = useDispatch();
  const { axios } = setRole();

  useEffect(() => {
    getAllMatch();
  }, [currentPage, pageCount, selected]);

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
        setMatchData(data[0]);
        setPageCount(Math.ceil(parseInt(data[1]) / pageLimit));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function callPage(e) {
    setCurrentPage(parseInt(e.target.outerText));
  }

  return (
    <>
      {matchData?.map((match) => {
        return (
          <Odds
            onClick={() => {
              dispatch(setSelectedMatch({}));
              dispatch(setMatchOddsLive([]));
              dispatch(setSessionOddsLive([]));
              dispatch(setAllBetRate([]));
              doNavigateWithState(match.id);
            }}
            top={true}
            blur={false}
            match={match}
          />
        );
      })}
      <Pagination
        className="whiteTextPagination d-flex justify-content-center"
        count={pageCount}
        color="primary"
        onChange={callPage}
      />
      {/* <Odds onClick={onClick} top={false} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} /> */}
    </>
  );
};

export default MatchesComponent;
