import { memo } from "react";
import ListH from "./ListH";
import ListHeaderT from "./ListHeaderT";
import Row from "./Row";
import { Box, Pagination } from "@mui/material";
import { useEffect } from "react";
import { setRole } from "../../newStore";
import { useState } from "react";
import constants from "../../components/helper/constants";

const MatchListComp = () => {
  const [allMatch, setAllMatch] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const { axios } = setRole();
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
  useEffect(() => {
    if (allMatch.length === 0) {
      getAllMatch();
    }
  }, [currentPage]);
  const callPage = (e) => {
    setCurrentPage(parseInt(e.target.outerText));
  };
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
      <ListH  setAllMatch={setAllMatch} currentPage={currentPage} pageLimit={pageLimit}/>
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

export default memo(MatchListComp);
