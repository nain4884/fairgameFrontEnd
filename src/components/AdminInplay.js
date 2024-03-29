import { Pagination, Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { } from "@mui/material";
// import "../index.css";

import { useDispatch, useSelector } from "react-redux";
import constants from "./helper/constants";
import { setRole } from "../newStore";
import CustomLoader from "./helper/CustomLoader";
import Odds from "./Matches/Odds";
import Background from "./Background";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { setAllMatches } from "../newStore/reducers/matchDetails";

const AdminInPlay = () => {
  // const classes=useStyle() 
  const { socket } = useContext(SocketContext);
  const [loader, setLoader] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  const dispatch = useDispatch();
  const { axios } = setRole();

  const updateAdminPlayList = useSelector(state=>state.matchDetails)

  useEffect(() => {
    getAllMatch();
  }, [currentPage, updateAdminPlayList]);

  // useEffect(() => {
  //   if (socket && socket.connected) {
  //     socket.on("newMessage", (value) => {
  //       console.log(value);
  //     });

  //     socket.onevent = async (packet) => {

  //       if (packet.data[0] === "newMatchAdded") {
  //         getAllMatch();
  //       }
  //       if (packet.data[0] === "resultDeclareForBet") {
  //         getAllMatch();
  //       }


  //     };
  //   }
  // }, [socket]);

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

  const handleUpdateMatch = async () => {
    getAllMatch();
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
            handleUpdateMatch={handleUpdateMatch}
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
