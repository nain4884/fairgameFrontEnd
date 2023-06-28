import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  DownGIcon,
  DownIcon,
  Excel,
  LockIcon,
  Pdf,
  UnLockIcon,
} from "../admin/assets";
import Modal from "./Modal";
import SearchInput from "./SearchInput";

import StyledImage from "./StyledImage";
import UserDetailModal from "./UserDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import constants from "./helper/constants";
import {
  setPage,
  setSubPage,
  setSubUserData,
  setUserData,
} from "../newStore/reducers/auth";
import SearchInputModal from "./SearchInputModal";
import AccountListRow from "./AccountListRow";
import ListSubHeaderT from "./ListSubHeaderT";
import ListHeaderT from "./ListHeaderT";
import { useTheme } from "@emotion/react";

const AccountListModal = ({ id, show, setShow, title, handleExport }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  // const {currentUser} = useSelector((state) => state?.currentUser);
  const { userWallet } = useSelector((state) => state?.auth);
  // const [roles, setRoles] = useState([]);
  let { axios } = setRole();
  const { subUserData } = useSelector((state) => state?.auth);
  const roles = useSelector((state) => state?.auth?.allRole);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [data1, setData] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const { subCurrentPageNo } = useSelector((state) => state?.auth);
  const [sumValue, setSumVal] = useState({
    creditsum: 0.0,
    profitsum: 0.0,
    balancesum: 0.0,
    exposuresum: 0.0,
    percent_profit_loss: 0,
    availablebalancesum: 0.0,
    exposurelimit: "",
    totalCommissions: "",
  });

  useEffect(() => {
    getListOfUser();
  }, [currentPage]);

  async function getListOfUser(username) {
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getAllUserById/${id}?${username ? `userName=${username}` : ""
        }&page=${currentPage}&limit=${pageLimit}`
      );
      data?.data?.data.map((element) => {
        let roleDetail = roles.find(findThisRole);
        function findThisRole(role) {
          return role.id === element.roleId;
        }
        element.role = roleDetail?.roleName;
      });
      // dispatch(setSubUserData(data?.data?.data));
      setData(data?.data?.data);
      setPageCount(
        Math.ceil(
          parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) /
          pageLimit
        )
      );
    } catch (e) {
      console.log(e);
    }
    // /fair-game-wallet/getLogUserAggregateData
  }

  const getUerLogged = async () => {
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getLogUserAggregateData?userId=${id}`
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
    getUerLogged();
  }, []);

  function callPage(val) {
    // dispatch(setSubPage(parseInt(val)));
    setCurrentPage(parseInt(val));
  }

  // async function getRoles() {
  //   setRoles(JSON.parse(localStorage.getItem("allRoles")));
  // }

  //   useEffect(() => {
  //     // getRoles();
  //     getListOfUser(id);
  //   }, [currentPageNo, pageCount,id, userWallet?.access_token]);

  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
            width: " 98%",
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ListH
            id={id}
            title={title}
            getListOfUser={getListOfUser}
            setPageCount={setPageCount}
            matchesMobile={matchesMobile}
            handleExport={handleExport}
          />
          <Button
            sx={{ color: "", fontSize: "30px" }}
            onClick={() => {
              setShow({ value: false, id: "", title: "" });
              // dispatch(setSubUserData([]));
              // dispatch(setSubPage(1));
            }}
          >
            &times;
          </Button>
        </Box>

        <Box
        // sx={{ overflowX: "auto" }}
        >
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            <ListHeaderT />
            <ListSubHeaderT data={sumValue} />
            {data1?.map((element, i) => {
              if (i % 2 === 0) {
                return (
                  <AccountListRow
                    callProfile={false}
                    showOptions={false}
                    showChildModal={true}
                    containerStyle={{ background: "#FFE094" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={currentPage}
                  />
                );
              } else {
                return (
                  <AccountListRow
                    callProfile={false}
                    showOptions={false}
                    showChildModal={true}
                    containerStyle={{ background: "#ECECEC" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#F8C851" }}
                    fTextStyle={{ color: "#0B4F26" }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={currentPage}
                  />
                );
              }
            })}
          </Box>
        </Box>
        <Footer
          currentPage={currentPage}
          pages={pageCount}
          callPage={callPage}
        />
      </Box>
    </>
  );
};

const Footer = ({ currentPage, pages, callPage }) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        width: "100%",
        alignItems: "center",
        px: { mobile: "5px", laptop: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        paddingX: "10%",
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
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
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

const ListH = ({ id, title, getListOfUser, setPageCount, matchesMobile, handleExport }) => {
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: "10px",
        py: "6px",
      }}
    >
      <Box display={"flex"} alignItems="center" sx={{ alignItems: "center" }}>
        <Typography
          sx={{
            fontSize: { mobile: "14px", laptop: "18px", tablet: "18px" },
            color: "#FFF",
            marginRight: { mobile: "10px", laptop: "20px", tablet: "20px" },
          }}
        >
          {title}

          {matchesMobile && (
            <Box sx={{ display: "flex", marginTop: "5px" }}>
              <Box
                sx={{
                  background: "white",
                  height: { mobile: "25px", laptop: "30px", tablet: "30px" },
                  borderRadius: "5px",
                  width: { mobile: "25px", laptop: "45px", tablet: "45px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledImage
                  src={Excel}
                  sx={{
                    height: { mobile: "15px", laptop: "20px", tablet: "20px" },
                  }}
                  onClick={() => handleExport('xlsx', id)}
                />
              </Box>
              <Box
                sx={{
                  background: "white",
                  marginLeft: "10px",
                  borderRadius: "5px",
                  height: { mobile: "25px", laptop: "30px", tablet: "30px" },
                  width: { mobile: "25px", laptop: "45px", tablet: "45px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledImage
                  src={Pdf}
                  sx={{
                    height: { mobile: "15px", laptop: "20px", tablet: "20px" },
                  }}
                  onClick={() => handleExport('pdf', id)}
                />
              </Box>
            </Box>
          )}
        </Typography>
        {!matchesMobile && (
          <>
            <Box
              sx={{
                background: "white",
                height: { mobile: "25px", laptop: "30px", tablet: "30px" },
                borderRadius: "5px",
                width: { mobile: "25px", laptop: "45px", tablet: "45px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledImage
                src={Excel}
                sx={{
                  height: { mobile: "15px", laptop: "20px", tablet: "20px" },
                }}
                onClick={() => handleExport('xlsx', id)}
              />
            </Box>
            <Box
              sx={{
                background: "white",
                marginLeft: "10px",
                borderRadius: "5px",
                height: { mobile: "25px", laptop: "30px", tablet: "30px" },
                width: { mobile: "25px", laptop: "45px", tablet: "45px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledImage
                src={Pdf}
                sx={{
                  height: { mobile: "15px", laptop: "20px", tablet: "20px" },
                }}
                onClick={() => handleExport('pdf', id)}
              />
            </Box>
          </>
        )}
      </Box>

      <SearchInputModal
        getListOfUser={getListOfUser}
        setPageCount={setPageCount}
        id={id}
        show={true}
        placeholder={"Search User..."}
      />
    </Box>
  );
};

export default AccountListModal;
