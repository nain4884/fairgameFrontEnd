import { memo } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import { setRole } from "../newStore";
import AllUserListSeparate from "./AllUserListSeparate";

const ChildUserList = ({ id, matchId, getBetReport, sessionBetData, sessionBets }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  let { axios } = setRole();
  const [data1, setData] = useState([]);

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

  useEffect(() => {
    getChildUserList();
  }, []);

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
              sessionBets={sessionBets}
            />
          );
        })}
    </Box>
  );
};

export default memo(ChildUserList);
