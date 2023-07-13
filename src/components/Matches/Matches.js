import { Pagination, Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { } from "@mui/material";
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
import Lottie from "lottie-react";
import { HourGlass } from "../../assets/";
import CustomLoader from "../helper/CustomLoader";

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

  useEffect(() => {
    getAllMatch();
  }, [currentPage, selected]);

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

  const currentElements = matchData;
  return (
    <>
      {currentElements?.map((match) => {
        return (
          <Odds
            key={match.id}
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
      {/* <Odds onClick={onClick} top={false} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} /> */}
    </>
  );
};

export default MatchesComponent;
