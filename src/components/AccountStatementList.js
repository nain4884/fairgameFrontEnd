import { Box, Typography } from "@mui/material";
import SearchInput from "./SearchInput";
import SmallDropDown from "./smallDropDown";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import constants from "./helper/constants";
import { setRole } from "../newStore";
import YellowHeader from "./yellowheader";
import jwtDecode from "jwt-decode";
import moment from "moment";
import CustomLoader from "./helper/CustomLoader";

const AccountStatementList = ({ user, visible, selected }) => {
  const userToken = sessionStorage.getItem("JWTuser");
  const decodedTokenUser = userToken !== null && jwtDecode(userToken);

  const { currentUser } = useSelector((state) => state?.currentUser);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [data, setData] = useState("");
  const [isDated, setIsDated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const handleChildData = (childData) => {
    setData(childData);
  };
  const getLimitEntries = (childLimitData) => {
    setPageLimit(childLimitData);
  };
  function callPage(val) {
    setCurrentPage(parseInt(val));
    setCurrenLimit(parseInt(val));
    setIsDated(true);
  }
  async function getAccountStatement() {
    const userId = currentUser.id;
    var payload = {
      limit: pageLimit,
      skip: currentPage * pageLimit,
    };
    if (fromDate) {
      payload.fromDate = moment(fromDate).format("YYYY-MM-DD");
    }
    if (toDate) {
      payload.toDate = moment(toDate).format("YYYY-MM-DD");
    }
    let { axios } = setRole();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/fair-game-wallet/transactionHistory/${userId}`,
        payload
      );
      if (data) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setTransactionHistory(data.data[0]);
        setPageCount(
          Math.ceil(parseInt(data.data[1] ? data.data[1] : 1) / pageLimit)
        );
      }
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    getAccountStatement();
  }, [currentPage, pageLimit]);

  const Footer = ({ currentPage, pages, callPage, currenLimit }) => {
    return (
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          px: { mobile: "5px", laptop: "10px" },
          justifyContent: "space-between",
          background: "#FAFAFA",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "12px", laptop: "14px" },
            fontWeight: "600",
          }}
        >
          Showing 1 to {pages}
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
              cursor: "pointer",
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
              cursor: "pointer",
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

  return (
    <Box sx={{ width: "100%" }}>
      {loading ? (
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
      ) : (
        <>
          <Box sx={{ marginX: { mobile: "2vw", laptop: "1vw" } }}>
            <YellowHeader
              setFromDate={setFromDate}
              fromDate={fromDate}
              toDate={toDate}
              setToDate={setToDate}
              onChildData={handleChildData}
              getAccountStatement={getAccountStatement}
            />
          </Box>

          <Box
            sx={[
              {
                marginX: { mobile: "2vw", laptop: "1vw" },
                minHeight: "100px",
                borderRadius: "2px",
                border: "2px solid white",
                width: "97.5%",
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
                background: "#F8C851",
              },
            ]}
          >
            <ListH getLimitEntries={getLimitEntries} />
            <Box sx={{ overflowX: "scroll", width: "100%" }}>
              <ListHeaderT />
              {decodedTokenUser?.role === "user,visible"
                ? transactionHistory?.map((item) => (
                    <Row
                      key={item?.id}
                      index={item?.id}
                      containerStyle={{ background: "#FFE094" }}
                      profit={true}
                      fContainerStyle={{ background: "#0B4F26" }}
                      fTextStyle={{ color: "white" }}
                      date={item?.createAt}
                      description={item?.description}
                      closing={item?.current_amount}
                      trans_type={item?.trans_type}
                      amount={item?.amount}
                      fromuserName={item?.action_by?.userName}
                      touserName={item?.user?.userName}
                    />
                  ))
                : transactionHistory.map((item) => (
                    <Row
                      key={item?.id}
                      index={item?.id}
                      containerStyle={{ background: "#FFE094" }}
                      profit={true}
                      fContainerStyle={{ background: "#0B4F26" }}
                      fTextStyle={{ color: "white" }}
                      date={item?.createAt}
                      closing={item?.current_amount}
                      trans_type={item?.trans_type}
                      amount={item?.amount}
                      description={item?.description}
                      fromuserName={item?.action_by?.userName}
                      touserName={item?.user?.userName}
                    />
                  ))}

              {transactionHistory?.length === 0 && (
                <EmptyRow containerStyle={{ background: "#FFE094" }} />
              )}
            </Box>
            <Footer
              currenLimit={currenLimit}
              currentPage={currentPage}
              pages={pageCount}
              callPage={callPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const ListH = ({ getLimitEntries }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          mobile: "row",
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
          sx={{ fontSize: "10px", color: "black", fontWeight: "500" }}
        >
          Show
        </Typography>
        <SmallDropDown getLimitEntries={getLimitEntries} />
        <Typography
          sx={{ fontSize: "10px", color: "black", fontWeight: "500" }}
        >
          Entries
        </Typography>
      </Box>
      <SearchInput
        show={true}
        width={"100%"}
        placeholder={"Search..."}
        inputContainerStyle={{
          width: { mobile: "50vw", laptop: "17vw" },
          marginLeft: "auto",
        }}
      />
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
        width: { mobile: "222vw", tablet: "100%", laptop: "100%" },
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: { mobile: "14%", laptop: "11%", tablet: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Date</Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "16%", laptop: "14%", tablet: "14%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Credit
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "16%", laptop: "14%", tablet: "14%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Debit</Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "14%", laptop: "11%", tablet: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Closing
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "36%", laptop: "36%", tablet: "36%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Description
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "18%", laptop: "11%", tablet: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>From</Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "18%", laptop: "11%", tablet: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>To</Typography>
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
  fContainerStyle,
  fTextStyle,
  profit,
  index,
  date,
  closing,
  description,
  touserName,
  fromuserName,
  trans_type,
  amount,
  debit,
  credit,
}) => {
  const dateString = date;
  const dateObj = new Date(dateString);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          width: { mobile: "222vw", tablet: "100%", laptop: "100%" },
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
            width: { mobile: "14%", laptop: "11%", tablet: "11%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: { mobile: "10px", laptop: "12px", tablet: "12px" },
              fontWeight: "600",
            },
            fTextStyle,
          ]}
        >
          {moment(formattedDate).format("DD-MM-YYYY HH:mm")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "16%", laptop: "14%", tablet: "14%" },
          display: "flex",
          paddingLeft: "10px",
          background: "#27AC1E",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {amount > 0 ? amount : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "16%", laptop: "14%", tablet: "14%" },
          display: "flex",
          paddingLeft: { laptop: "10px", mobile: "5px" },
          background: "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {amount < 0 ? amount : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "14%", laptop: "11%", tablet: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {closing}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "36%", laptop: "36%", tablet: "36%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "18%", laptop: "11%", tablet: "18%" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "center",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "10px", laptop: "12px", tablet: "10px" },
            fontWeight: "700",
          }}
        >
          {fromuserName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { mobile: "18%", laptop: "11%", tablet: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "10px", laptop: "12px", tablet: "10px" },
            fontWeight: "700",
          }}
        >
          {touserName}
        </Typography>
      </Box>
    </Box>
  );
};
export default AccountStatementList;
