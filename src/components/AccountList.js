import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Excel, Pdf, } from "../admin/assets";
import SearchInput from "./SearchInput";
import StyledImage from "./StyledImage";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import constants from "./helper/constants";
import { setPage, } from "../newStore/reducers/auth";
import AccountListRow from "./AccountListRow";
import ListSubHeaderT from "./ListSubHeaderT";
import ListHeaderT from "./ListHeaderT";
import { saveAs } from "file-saver";
import CustomLoader from "./helper/CustomLoader";

const AccountList = () => {
  const dispatch = useDispatch();
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const roles = useSelector((state) => state?.auth?.allRole);
  const [data1, setData] = useState([]);
  const [sumValue, setSumVal] = useState({
    creditsum: 0.0,
    profitsum: 0.0,
    balancesum: 0.0,
    exposuresum: 0.0,
    percent_profit_loss: 0,
    exposurelimit: "",
    availablebalancesum: 0.0,
    totalCommissions: "",
  });
  let { axios } = setRole();

  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [pageLimit, setPageLimit] = useState(constants.listOfClientCountLimit);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { currentPageNo } = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);

  async function getListOfUser(username) {
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getAllUser?${username ? `userName=${username}` : ""
        }&page=${currentPageNo}&limit=${pageLimit}`
      );
      if (data?.data?.data) {
        data?.data?.data.map((element) => {
          let roleDetail = roles.find(findThisRole);
          function findThisRole(role) {
            return role.id === element.roleId;
          }
          element.role = roleDetail?.roleName;
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setData(data?.data?.data);
        setPageCount(
          Math.ceil(
            parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) /
            pageLimit
          )
        );
        getUerLogged();
      }
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log(e);
    }
  }
  function callPage(val) {
    dispatch(setPage(parseInt(val)));
  }

  const getUerLogged = async () => {
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getLogUserAggregateData`
      );
      let profitLoss =
        data?.data?.percent_profit_loss === null
          ? 0
          : Number(data?.data?.percent_profit_loss);
      setSumVal({
        ...data?.data,
        percent_profit_loss: profitLoss?.toFixed(2),
        totalCommissions: "",
        exposurelimit: "",
        availablebalancesum: data?.data?.balancesum - data?.data?.exposuresum,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setPage(parseInt(1)));
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getListOfUser();
  }, [currentPageNo]);

  const handleExport = async (type, id) => {
    let url = `/fair-game-wallet/exportUser?exportType=${type}`;
    if (id) {
      url = `/fair-game-wallet/exportUser?exportType=${type}&userId=${id}`;
    }
    try {
      const response = await axios.get(url, { responseType: "blob" });
      saveAs(
        response.data,
        currentUser?.userName ? currentUser?.userName : "file"
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>

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
          <Box
            sx={[
              {
                // marginX: "0.5%",
                minHeight: "200px",
                borderRadius: "10px",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px",
                overflow: "hidden",
                border: "2px solid white",
              },
              (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`,
              }),
            ]}
          >
            <ListH
              getListOfUser={getListOfUser}
              setPageCount={setPageCount}
              handleExport={handleExport}
            />
            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  display: matchesBreakPoint ? "inline-block" : "block",
                  position: { mobile: "relative", laptop: "static" },
                }}
              >
                <Box sx={{}}>
                  <ListHeaderT />
                  <ListSubHeaderT data={sumValue} />
                  {data1.map((element, i) => {
                    if (i % 2 === 0) {
                      return (
                        <AccountListRow
                          key={i}
                          callProfile={true}
                          showOptions={true}
                          containerStyle={{ background: "#FFE094" }}
                          profit={element.profit_loss >= 0}
                          fContainerStyle={{ background: "#0B4F26" }}
                          fTextStyle={{ color: "white" }}
                          element={element}
                          getListOfUser={getListOfUser}
                          currentPage={currentPageNo}
                          handleExport={handleExport}
                        />
                      );
                    } else {
                      return (
                        <AccountListRow
                          key={i}
                          callProfile={true}
                          showOptions={true}
                          containerStyle={{ background: "#ECECEC" }}
                          profit={element.profit_loss >= 0}
                          fContainerStyle={{ background: "#F8C851" }}
                          fTextStyle={{ color: "#0B4F26" }}
                          element={element}
                          getListOfUser={getListOfUser}
                          currentPage={currentPageNo}
                          handleExport={handleExport}
                        />
                      );
                    }
                  })}
                </Box>
              </Box>
            </Box>
          </Box>

          <Footer
            getListOfUser={getListOfUser}
            currentPage={currentPageNo}
            pages={pageCount}
            callPage={callPage}
          />
        </>
      )}
    </>
  );
};

const Footer = ({ currentPage, pages, callPage, getListOfUser }) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        px: { mobile: "5px", laptop: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        // marginX: "0.5%",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}
      >
        Showing 1 to {pages}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "35px",
            cursor: "pointer",
            width: { mobile: "80px", laptop: "100px" },
            background: "#0B4F26",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1
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
            {currentPage}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            width: { mobile: "80px", laptop: "100px" },
            background: "#0B4F26",
            display: "flex",
            borderRadius: "5px",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) === pages
                ? pages
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

const ListH = ({ getListOfUser, setPageCount, handleExport }) => {
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "3px",
        gap: 2,
        background: "#F8C851",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Box
          sx={{
            background: "white",
            height: "32px",
            borderRadius: "5px",
            width: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage
            src={Excel}
            sx={{ height: "25px" }}
            onClick={() => handleExport("xlsx")}
          />
        </Box>
        <Box
          sx={{
            background: "white",
            marginLeft: "10px",
            height: "32px",
            borderRadius: "5px",
            width: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage
            src={Pdf}
            sx={{ height: "25px" }}
            onClick={() => handleExport("pdf")}
          />
        </Box>
      </Box>
      <SearchInput
        placeholder={"Search User..."}
        show={true}
        setPageCount={setPageCount}
        getListOfUser={getListOfUser}
      />
    </Box>
  );
};

export default AccountList;
