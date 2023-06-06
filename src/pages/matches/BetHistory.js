import { Box, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import constants from "../../components/helper/constants";
import { setallbetsPage } from "../../newStore/reducers/auth";
import { setRole } from "../../newStore";
import AllRateSeperate from "../../components/AllRateSeperate";
import SessionBetSeperate from "../../components/sessionBetSeperate";
import { Background } from "../../components";

const BetHistory = () => {
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("JWTuser");
  const decodedTokenUser = userToken !== null && jwtDecode(userToken);
  const [allBets, SetAllBets] = useState([]);
  const [count, setCount] = useState(0);
  // console.log(decodedTokenUser.sub)
  const userID = decodedTokenUser.sub;
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);

  function callPage(val) {
    dispatch(setallbetsPage(parseInt(val)));
    // setCurrentPage(parseInt(val * pageLimit));
    setCurrentPage(parseInt(val));
    setCurrenLimit(parseInt(val));
  }
  async function getBetHisory() {
    const userId = userID;
    let { axios } = setRole();
    const payload = {
      userId: userId,
      limit: pageLimit,
      // skip: 0 ,
      skip: currentPage * pageLimit,
    };
    try {
      const { data } = await axios.post(`/betting/getBetHisory`, payload);
      SetAllBets(data.data[0]);
      setCount(
        data?.data[0]?.filter((b) =>
          ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
        ).length || 0
      );
      setPageCount(
        Math.ceil(parseInt(data.data[1] ? data.data[1] : 1) / pageLimit)
      );

      //   toast.success(data?.message);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (allBets.length === 0) {
      getBetHisory();
    }
  }, [currentPage]);

  return (

     <Background>
        <Typography
          sx={{
            fontSize: { mobile: "12px", laptop: "15px" },
            marginLeft: { laptop: "5px", mobile: "3px" },
          
            color: "white",
            fontWeight: "bold",
          }}
        >
          {"BET HISTORY"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { laptop: "row", mobile: "column" },
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "99%",
              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
            }}
          >
            <AllRateSeperate
              mark2
              mark
              allBetsData={allBets?.filter((b) =>
                ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
                  b?.marketType
                )
              )}
              count={
                allBets?.filter((b) =>
                  ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
                    b?.marketType
                  )
                ).length || 0
              }
              setPageCountOuter={setPageCount}
              callPage={callPage}
            />
            <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>
            <SessionBetSeperate
              allBetsData={allBets?.filter(
                (b) =>
                  !["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
                    b?.marketType
                  )
              )}
              mark
            />
          </Box>
        </Box>
        </Background>

  );
};

export default BetHistory;
