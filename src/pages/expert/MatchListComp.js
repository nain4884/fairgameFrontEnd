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
  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  // const totalPages = Math.ceil(allMatch?.length / constants.customPageLimit);

  const { axios } = setRole();
  const getAllMatch = async (title) => {
    try {
      if (title) {
        setCurrentPage(1);
      }

      let response = await axios.get(
        `/game-match/getAllMatch?${
          title ? `title=${title}` : ""
        }&pageNo=${currentPage}&pageLimit=${pageLimit}`
      );
      setAllMatch(response.data[0]);

      setPageCount(
        Math.ceil(
          parseInt(response?.data[1] ? response.data[1] : 1) /
            constants.customPageLimit
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllMatch();
  }, [currentPage]);
  function callPage(e, value) {
    setCurrentPage(parseInt(value));
  }

  const currentElements = allMatch;
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
      <ListH getAllMatch={getAllMatch} />
      <ListHeaderT />
      {currentElements.map((element, i) => {
        return (
          <Row
            index={i + 1}
            containerStyle={{ background: (i + 1) % 2 === 0 ? "#ECECEC" : "" }}
            data={element}
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
    </Box>
  );
};

export default memo(MatchListComp);
