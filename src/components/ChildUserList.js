import { memo } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import moment from "moment";
import { StyledImage } from ".";
import { ArrowDown } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import SessionBetSeperate from "./sessionBetSeperate";
import { useState } from "react";
import { useEffect } from "react";
import { setRole } from "../newStore";
import AllUserListSeparate from "./AllUserListSeparate";

const ChildUserList = ({
  id,
  show,
  setShow,
  matchId,
  getBetReport,
  sessionBetData,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  let { axios } = setRole();
  const [showSessionList, setShowSessionList] = useState(false);
  const [data1, setData] = useState([]);
  useEffect(() => {
    getChildUserList();
  }, []);

  const getChildUserList = async () => {
    try {
      let payload = {
        userId: id,
        match_id: matchId,
      };
      const { data } = await axios.post(`/betting/getUserProfitLoss`, payload);
      if (data?.data) {
        setData(data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {data1?.length > 0 &&
        data1?.map((profitLoss, index) => {
          return (
            <AllUserListSeparate
              key={index}
              item={profitLoss}
              index={index + 1}
              matchId={matchId}
              getBetReport={getBetReport}
              sessionBetData={sessionBetData}
            />
          );
        })}
    </Box>
  );
};

export default memo(ChildUserList);
