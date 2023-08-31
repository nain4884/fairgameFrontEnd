import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Excel, Pdf } from "../admin/assets";

import StyledImage from "./StyledImage";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import constants from "./helper/constants";
import { setSubPage, setSubUserData } from "../newStore/reducers/auth";
import SearchInputModal from "./SearchInputModal";
import AccountListRow from "./AccountListRow";
import ListSubHeaderT from "./ListSubHeaderT";
import ListHeaderT from "./ListHeaderT";

const AccountListModalChild = ({ id, show, setShow, title }) => {
  const dispatch = useDispatch();

  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const { subUserData } = useSelector((state) => state?.auth);
  const roles = useSelector((state) => state?.auth?.allRole);
  const [data1, setData] = useState([]);
  const [sumValue, setSumVal] = useState({
    creditsum: 0.0,
    profitsum: 0.0,
    balancesum: 0.0,
    exposuresum: 0.0,
    percent_profit_loss: 0,
    availablebalancesum: 0.0,
  });

  useEffect(
    () => {
      getListOfUser();
    },
    { show }
  );
  async function getListOfUser() {
    let { axios } = setRole();
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getAllUserById/${id}?&page=${subCurrentPageNo}&limit=${pageLimit}`
      );
      data?.data?.data.map((element) => {
        let roleDetail = roles.find(findThisRole);
        function findThisRole(role) {
          return role.id === element.roleId;
        }
        element.role = roleDetail?.roleName;
      });
      dispatch(setSubUserData(data?.data?.data));
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
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getLogUserAggregateData?userId=${id}`
      );
      setSumVal({
        ...data?.data,
        availablebalancesum: data?.data?.balancesum - data?.data?.exposuresum,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const { subCurrentPageNo } = useSelector((state) => state?.auth);
  function callPage(val) {
    dispatch(setSubPage(parseInt(val)));
  }

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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ListH id={id} title={title} />
          <Button
            sx={{ color: "", fontSize: "30px" }}
            onClick={() => {
              setShow({ value: false, id: "", title: "" });
              dispatch(setSubUserData([]));
              dispatch(setSubPage(1));
            }}
          >
            &times;
          </Button>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            <ListHeaderT />
            <ListSubHeaderT data={sumValue} />
            {subUserData?.map((element, i) => {
              if (i % 2 === 0) {
                return (
                  <AccountListRow
                    key={i}
                    showCReport={false}
                    showOptions={false}
                    containerStyle={{ background: "#FFE094" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={subCurrentPageNo}
                  />
                );
              } else {
                return (
                  <AccountListRow 
                    key={i}
                    showCReport={false}
                    showOptions={false}
                    containerStyle={{ background: "#ECECEC" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#F8C851" }}
                    fTextStyle={{ color: "#0B4F26" }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={subCurrentPageNo}
                  />
                );
              }
            })}
          </Box>
        </Box>
        <Footer
          currentPage={subCurrentPageNo}
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

const ListH = ({ id, title }) => {
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
            fontSize: "18px",
            color: "#FFF",
            marginRight: "20px",
          }}
        >
          {title}
        </Typography>
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
          <StyledImage src={Excel} sx={{ height: "20px" }} />
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
          <StyledImage src={Pdf} sx={{ height: "20px" }} />
        </Box>
      </Box>
      <SearchInputModal id={id} placeholder={"Search User..."} />
    </Box>
  );
};

export default AccountListModalChild;
