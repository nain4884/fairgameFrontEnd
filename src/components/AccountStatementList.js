import { Box, Typography, useMediaQuery } from "@mui/material";
import SearchInput from "./SearchInput";
import { Excel, LockIcon, Pdf, UnLockIcon } from "../assets";
import SmallDropDown from "./smallDropDown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import constants from "./helper/constants";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import YellowHeader from "./yellowheader";
import { formatDate } from "./helper/Dateconverter.js";
import jwtDecode from "jwt-decode";
import YellowHeaderAdmin from "./YellowHeaderAdmin";
import { useTheme } from "@emotion/react";
import { setCurrentStatementPage } from "../newStore/reducers/auth";
import moment from "moment";

const AccountStatementList = ({ user }) => {
  const theme = useTheme();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const adminToken = sessionStorage.getItem("JWTadmin");
  const userToken = sessionStorage.getItem("JWTuser");

  const decodedTokenAdmin = adminToken !== null && jwtDecode(adminToken);
  const decodedTokenUser = userToken !== null && jwtDecode(userToken);

  const { currentUser } = useSelector((state) => state?.currentUser);

  const dispatch = useDispatch();
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [data, setData] = useState("");
  const [isDated, setIsDated] = useState(false);
  const handleChildData = (childData) => {
    setData(childData);
  };
  const getLimitEntries = (childLimitData) => {
    setPageLimit(childLimitData);
  };
  console.log(pageLimit, "pagelimit");
  function callPage(val) {
    // dispatch(secallPagetCurrentStatementPage(parseInt(val)));
    // setCurrentPage(parseInt(val * pageLimit));
    setCurrentPage(parseInt(val));
    setCurrenLimit(parseInt(val));
    setIsDated(true);
  }
  async function getAccountStatement() {
    const userId = currentUser.id;
    const originalDatefrom = formatDate(data[0]);
    const originalDateto = formatDate(data[1]);
    if (
      data !== "" &&
      isDated === false &&
      originalDatefrom !== "NaN-NaN-NaN" &&
      originalDateto !== "NaN-NaN-NaN"
    ) {
      var payload = {
        limit: pageLimit,
        skip: currentPage * pageLimit,
        fromDate: originalDatefrom,
        toDate: originalDateto,
      };
    } else {
      var payload = {
        limit: pageLimit,
        skip: currentPage * pageLimit,
      };
    }
    console.log(payload);
    let { axios } = setRole();
    try {
      const { data } = await axios.post(
        `/fair-game-wallet/transactionHistory/${userId}`,
        payload
      );
      // console.log(data.data[0], 'datadatadatadata')
      setTransactionHistory(data.data[0]);
      setPageCount(
        Math.ceil(parseInt(data.data[1] ? data.data[1] : 1) / pageLimit)
      );

      //   toast.success(data?.message);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAccountStatement();
  }, [currentPage, pageCount, pageLimit]);

  // const Footer = () => {
  //     return (
  //         <>
  //         <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: { mobile: "5px", laptop: "10px" }, justifyContent: "space-between", background: "#FAFAFA", }}>
  //             <Typography sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}>Showing 1 to 6</Typography>
  //             <Box sx={{ display: "flex", alignItems: "center" }}>
  //                 <Box sx={{ height: "35px", width: { mobile: "80px", laptop: "100px" }, background: "#0B4F26", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>
  //                     <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>Previous</Typography>
  //                 </Box>
  //                 <Box sx={{ height: "35px", marginX: { laptop: "10px", mobile: "5px" }, width: "40px", background: "#262626", display: "flex", borderRadius: "5px", justifyContent: "center", alignItems: "center" }}>
  //                     <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>1</Typography>
  //                 </Box>
  //                 <Box sx={{ height: "35px", width: { mobile: "80px", laptop: "100px" }, background: "#0B4F26", display: "flex", borderRadius: "5px", justifyContent: "center", alignItems: "center" }}>
  //                     <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>Next</Typography>
  //                 </Box>
  //             </Box>
  //         </Box>
  //         </>
  //     )
  // }

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
            }}
            // onClick={() => {
            //     callPage(
            //         parseInt(currentPage) - 1 === 0 ? 0 : parseInt(currentPage) - 1
            //     );
            // }}
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

  return (
    <>
      <YellowHeader
        onChildData={handleChildData}
        getAccountStatement={getAccountStatement}
      />

      {/* {decodedTokenUser.role === "user" && (
        <YellowHeader
          onChildData={handleChildData}
          getAccountStatement={getAccountStatement}
        />
      )} */}
      {/* {decodedTokenAdmin.role === "admin" && ( */}
      {/* <YellowHeader
          onChildData={handleChildData}
          getAccountStatement={getAccountStatement}
        /> */}
      {/* // <YellowHeaderAdmin onChildData={handleChildData} getAccountStatement={getAccountStatement} /> */}
      {/* )} */}
      {/* <YellowHeader onChildData={handleChildData} getAccountStatement={getAccountStatement} /> */}

      <Box
        sx={[
          {
            marginX: "0.5%",
            minHeight: "100px",
            borderRadius: "2px",
            border: "2px solid white",
            width: "99%",
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
          },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <ListH getLimitEntries={getLimitEntries} />
        <Box sx={{ overflowX: "scroll", width: "100%" }}>
          <ListHeaderT />
          {decodedTokenUser.role === "user"
            ? transactionHistory.map((item) => (
                <Row
                  index={item?.id}
                  containerStyle={{ background: "#FFE094" }}
                  profit={true}
                  fContainerStyle={{ background: "#0B4F26" }}
                  fTextStyle={{ color: "white" }}
                  date={item?.createAt}
                  closing={item?.current_amount}
                  trans_type={item?.trans_type}
                  amount={item?.amount}
                  touserName={item?.action_by.userName}
                  fromuserName={item?.user.userName}
                  {...(item.trans_type === "withdraw"
                    ? { debit: item.amount }
                    : { credit: item.amount })}
                  {...(item.trans_type === "add"
                    ? {
                        fromuserName: item.action_by.userName,
                        touserName: item.user.userName,
                      }
                    : {
                        fromuserName: item.user.userName,
                        touserName: item.action_by.userName,
                      })}
                />
              ))
            : transactionHistory.map((item) => (
                <Row
                  index={item?.id}
                  containerStyle={{ background: "#FFE094" }}
                  profit={true}
                  fContainerStyle={{ background: "#0B4F26" }}
                  fTextStyle={{ color: "white" }}
                  date={item?.createAt}
                  closing={item?.current_amount}
                  trans_type={item?.trans_type}
                  amount={item?.amount}
                  touserName={item?.action_by.userName}
                  fromuserName={item?.user.userName}
                  {...(item.trans_type === "win" || item.trans_type === "add"
                    ? { credit: item.amount }
                    : { debit: item.amount })}
                  {...(item.trans_type === "add" || item.trans_type === "win"
                    ? {
                        fromuserName: item.action_by.userName,
                        touserName: item.user.userName,
                      }
                    : {
                        fromuserName: item.user.userName,
                        touserName: item.action_by.userName,
                      })}
                />
              ))}

          {transactionHistory.length === 0 && (
            <EmptyRow containerStyle={{ background: "#FFE094" }} />
          )}

          {/* {transactionHistory.map((item) => (
                            <Row
                                index={item?.id}
                                containerStyle={{ background: "#FFE094" }}
                                profit={true}
                                fContainerStyle={{ background: "#0B4F26" }}
                                fTextStyle={{ color: "white" }}
                                date={item?.createAt}
                                closing={item?.current_amount}
                                trans_type={item?.trans_type}
                                amount={item?.amount}
                                
                                touserName={item?.action_by.userName}
                                fromuserName={item?.user.userName}
                                {...(item.trans_type === "withdraw" ? { debit: item.amount } : { credit: item.amount })}
                                {...(item.trans_type === "add" ? { fromuserName: item.action_by.userName, touserName: item.user.userName } : { fromuserName: item.user.userName, touserName: item.action_by.userName })}
                            />
                        ))} */}
        </Box>
        <Footer
          currenLimit={currenLimit}
          currentPage={currentPage}
          pages={pageCount}
          callPage={callPage}
        />
      </Box>
    </>
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
          {moment(formattedDate).format("DD-MM-YYYY")}
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
          {credit}
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
          {debit}
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
          {trans_type}
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
