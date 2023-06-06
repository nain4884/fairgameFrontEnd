import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "./helper/constants";
import SearchInput from "./SearchInput";
import SmallDropDown from "./smallDropDown";
import { setRole } from "../newStore";
import moment from "moment";

const Footer = ({ currentPage, pages, callPage, currenLimit }) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        px: { mobile: "5px", laptop: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        marginX: "0.5%",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}
      >
        Showing 1 to 10
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "35px",
            width: { mobile: "80px", laptop: "100px" },
            background: "#0B4F26",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) - 1 === -1 ? 0 : parseInt(currentPage) - 1
            );
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { laptop: "14px", mobile: "12px" },
            }}
          >
            Previous
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            marginX: { laptop: "10px", mobile: "5px" },
            width: "40px",
            background: "#262626",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { laptop: "14px", mobile: "12px" },
            }}
          >
            {currentPage + 1}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            width: { mobile: "80px", laptop: "100px" },
            background: "#0B4F26",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) === pages - 1
                ? pages - 1
                : parseInt(currentPage) + 1
            );
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { laptop: "14px", mobile: "12px" },
            }}
          >
            Next
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const BetsList = () => {
  const { currentUser } = useSelector((state) => state?.currentUser);
  const data = [
    {
      eventType: "Cricket",
      eventName: "India Vs Pakistan",
      userName: "JohnDoe",
      team: "Pakistan",
      betType: "6 Over Pakistan",
      userRate: "66",
      amount: "1000",
      placeDate: "04-11-2022",
      matchDate: "04-11-2022",
      type: "Yes",
    },
    {
      eventType: "Cricket",
      eventName: "India Vs Pakistan",
      userName: "JohnDoe9110",
      team: "India",
      betType: "Bookmaker",
      userRate: "66",
      amount: "1000",
      placeDate: "04-11-2022",
      matchDate: "04-11-2022",
      type: "Lay",
    },
    {
      eventType: "Cricket",
      eventName: "India Vs Pakistan",
      userName: "JohnParker1234",
      team: "India",
      betType: "Match Odds",
      userRate: "66",
      amount: "1000",
      placeDate: "04-11-2022",
      matchDate: "04-11-2022",
      type: "Back",
    },
  ];

  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    getBetList();
  }, [currentPage, pageCount, pageLimit]);

  const getLimitEntries = (childLimitData) => {
    setPageLimit(childLimitData);
  };

  function callPage(val) {
    // dispatch(secallPagetCurrentStatementPage(parseInt(val)));
    // setCurrentPage(parseInt(val * pageLimit));
    setCurrentPage(parseInt(val));
    setCurrenLimit(parseInt(val));
    // setIsDated(true);
  }

  async function getBetList() {
    const userId = currentUser.id;

    var payload = {
      limit: pageLimit,
      skip: currentPage * pageLimit,
    };
    console.log(payload);
    let { axios } = setRole();
    try {
      // const { data } = await axios.post(
      //   `/betting/currentAllMatchBet/${userId}`,
      //   payload
      // );
      const { data } = await axios.post(`/betting/currentAllMatchBet`, payload);
      // console.log(data.data[0], 'datadatadatadata')
      setBetHistory(data.data[0]);
      setPageCount(
        Math.ceil(parseInt(data.data[1] ? data.data[1] : 1) / pageLimit)
      );

      //   toast.success(data?.message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box
      sx={[
        {
          marginX: "0.5%",
          minHeight: "200px",
          borderTopRightRadius: {
            mobile: "10px",
            laptop: "0px",
            tablet: "10px",
          },
          borderTopLeftRadius: {
            mobile: "10px",
            laptop: "0px",
            tablet: "10px",
          },
          border: "2px solid white",
        },
        (theme) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <ListH getLimitEntries={getLimitEntries} />
      <Box sx={{ overflowX: "scroll" }}>
        <Box sx={{ overflowX: "scroll", minWidth: "900px" }}>
          <ListHeaderT />

          {betHistory.map((item, index) => {
            return (
              <Row
                data={item}
                index={index}
                containerStyle={{ background: "#FFE094" }}
                profit={true}
                fContainerStyle={{ background: "#0B4F26" }}
                fTextStyle={{ color: "white" }}
              />
            );
          })}
          {betHistory.length === 0 && (
            <EmptyRow containerStyle={{ background: "#FFE094" }} />
          )}
        </Box>
      </Box>
      <Box sx={{ width: "100%", margin: 0, position: "absolute", left: 0 }}>
        {/* <Footer /> */}
        <Footer
          currenLimit={currenLimit}
          currentPage={currentPage}
          pages={pageCount}
          callPage={callPage}
        />
      </Box>
    </Box>
  );
};

const ListH = ({ getLimitEntries }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          mobile: "column-reverse",
          laptop: "row",
          tablet: "row",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <Box display={"flex"} alignItems="center" sx={{ width: "100%" }}>
        <Typography
          sx={{ fontSize: "10px", color: "white", fontWeight: "500" }}
        >
          Show
        </Typography>
        <SmallDropDown getLimitEntries={getLimitEntries} />
        <Typography
          sx={{ fontSize: "10px", color: "white", fontWeight: "500" }}
        >
          Entries
        </Typography>
      </Box>
      <SearchInput show={true} width={"100%"} placeholder={"Search..."} />
    </Box>
  );
};

const ListHeaderT = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: "3%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>No</Typography>
      </Box>
      <Box
        sx={{
          width: "12%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Event Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Event Name
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Username
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Team</Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Bet Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "7%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          User Rate
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "10px" }}>
          Back/Lay
        </Typography>
        <Typography sx={{ color: "white", fontSize: "10px" }}>
          Yes/No
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Amount
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Place Date
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Match Date
        </Typography>
      </Box>
    </Box>
  );
};

const EmptyRow = ({ containerStyle }) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
          justifyContent: "center",
        },
        containerStyle,
      ]}
    >
      <Typography>No Results found</Typography>
    </Box>
  );
};

const Row = ({
  containerStyle,
  data,
  fContainerStyle,
  fTextStyle,
  profit,
  index,
}) => {
  let flag = index % 2 != 0;
  let no = (index + 1).toString();
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={[
          {
            width: "3%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "45px",
            background: "black",
            borderRight: "2px solid white",
          },
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          {(no > 9 ? "" : "0") + no}
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "12%",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>
          {data.EventType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#ECECEC" : "#FFE094",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          {data.EventName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#ECECEC" : "#FFE094",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          {data.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {data.Team}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {data.BetType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "7%",
          display: "flex",
          background: flag ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {data.UserRate}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          justifyContent: "center",
          background: flag ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {data.bet_type}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {data.Amount}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
          justifyContent: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: flag ? "#ECECEC" : "#FFE094",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.PlaceDate).format("DD-MM-YYYY")}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.PlaceDate).format("HH:mm A")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
          justifyContent: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: flag ? "#ECECEC" : "#FFE094",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.MatchDate).format("DD-MM-YYYY")}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.MatchDate).format("HH:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};
export default BetsList;
