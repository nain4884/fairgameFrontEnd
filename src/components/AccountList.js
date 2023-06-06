import { Box, Typography, useMediaQuery } from "@mui/material";
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
import ModalMUI from "@mui/material/Modal";
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
import AccountListModal from "./AccountListModal";
import { setCurrentUser } from "../newStore/reducers/currentUser";
import { useRef } from "react";
import AccountListRow from "./AccountListRow";
import ListSubHeaderT from "./ListSubHeaderT";
import ListHeaderT from "./ListHeaderT";

const AccountList = () => {
  const dispatch = useDispatch();
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  // const {currentUser} = useSelector((state) => state?.currentUser);
  const { userWallet } = useSelector((state) => state?.auth);
  // console.log(userWallet, "userWallet");
  // const [roles, setRoles] = useState([]);
  const { userData } = useSelector((state) => state?.auth);
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
  let { axios, JWT } = setRole();
  async function getListOfUser() {
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getAllUser?&page=${currentPageNo}&limit=${pageLimit}`
      );
      data?.data?.data.map((element) => {
        let roleDetail = roles.find(findThisRole);
        function findThisRole(role) {
          return role.id === element.roleId;
        }
        element.role = roleDetail?.roleName;
      });
      // dispatch(setUserData(data?.data?.data));
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
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getLogUserAggregateData`
      );
      setSumVal({
        ...data?.data,
        percent_profit_loss: 0,
        totalCommissions: "",
        exposurelimit: "",
        availablebalancesum: data?.data?.balancesum - data?.data?.exposuresum,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const [pageCount, setPageCount] = useState(constants.pageLimit);
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageCount);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { currentPageNo } = useSelector((state) => state?.auth);
  function callPage(val) {
    dispatch(setPage(parseInt(val)));
    // setCurrentPage(parseInt(val));
  }

  // async function getRoles() {
  //   setRoles(JSON.parse(localStorage.getItem("allRoles")));
  // }

  useEffect(() => {
    if (data1.length === 0 && currentPageNo) {
      getListOfUser();
    }
  }, [currentPageNo]);

  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
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
        <ListH setData={setData} />
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            <ListHeaderT />
            <ListSubHeaderT data={sumValue} />
            {data1.map((element, i) => {
              if (i % 2 === 0) {
                return (
                  <AccountListRow
                    showOptions={true}
                    containerStyle={{ background: "#FFE094" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={currentPageNo}
                  />
                );
              } else {
                return (
                  <AccountListRow
                    showOptions={true}
                    containerStyle={{ background: "#ECECEC" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#F8C851" }}
                    fTextStyle={{ color: "#0B4F26" }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={currentPageNo}
                  />
                );
              }
            })}
          </Box>
        </Box>
      </Box>
      <Footer
        currentPage={currentPageNo}
        pages={pageCount}
        callPage={callPage}
      />
    </>
  );
};

const Footer = ({ currentPage, pages, callPage }) => {
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

const ListH = ({ setData }) => {
  return (
    <Box
      display={"flex"}
      sx={{ justifyContent: "space-between", px: "10px", py: "6px", gap: 2 }}
    >
      <Box display={"flex"} alignItems="center">
        <Box
          sx={{
            background: "white",
            height: "30px",
            borderRadius: "5px",
            width: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage src={Excel} sx={{ height: "25px" }} />
        </Box>
        <Box
          sx={{
            background: "white",
            marginLeft: "10px",
            height: "30px",
            borderRadius: "5px",
            width: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage src={Pdf} sx={{ height: "25px" }} />
        </Box>
      </Box>
      <SearchInput
        placeholder={"Search User..."}
        show={true}
        setData={setData}
      />
    </Box>
  );
};

export default AccountList;
