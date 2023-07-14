import { Pagination, Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { } from "@mui/material";
// import "../index.css";

import { useDispatch } from "react-redux";
import constants from "./helper/constants";
import { setRole } from "../newStore";
import CustomLoader from "./helper/CustomLoader";
import Odds from "./Matches/Odds";
import Background from "./Background";
import { useLocation, useNavigate } from "react-router-dom";

const AdminInPlay = () => {
  // const classes=useStyle()
  const [loader, setLoader] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  const dispatch = useDispatch();
  const { axios } = setRole();

  useEffect(() => {
    getAllMatch();
  }, [currentPage]);

  async function getAllMatch() {
    try {
      setLoader(true);
      let { data } = await axios.get(`/game-match/getAllMatch`, {
        params: {
          isActveMatch: 1,
          bets: 0,
          pageNo: currentPage,
          pageLimit: pageLimit,
          filter: null,
        },
      });

      if (data.length > 0) {
        setLoader(false);
        setMatchData(data[0]);
        setPageCount(Math.ceil(parseInt(data[1]) / constants.customPageLimit));
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  }

  function callPage(e, value) {
    setCurrentPage(parseInt(value));
  }

  const currentElements = matchData;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Background>
      {currentElements?.map((match) => {
        return (
          <Odds
            key={match.id}
            onClick={() => {
              navigate(`/${pathname.split("/")[1]}/matches`, {
                state: {
                  submit: true,
                  matchId: match?.id,
                  activeTab: "INPLAY",
                },
              });
            }}
            top={true}
            blur={false}
            match={match}
          />
        );
      })}
      {matchData?.length != 0 && (
        <Pagination
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          count={pageCount}
          color="primary"
          onChange={callPage}
        />
      )}
      {loader && (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader text="" />
        </Box>
      )}
    </Background>
  );
};

export default AdminInPlay;
