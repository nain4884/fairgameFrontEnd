import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import constants from "./helper/constants";

import SearchInputModal from "./SearchInputModal";

import { useTheme } from "@emotion/react";

const CommissionReportTable = ({ id, show, setShow, title }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [data1, setData] = useState([]);

  useEffect(() => {
    getListOfUser();
  }, [show]);

  async function getListOfUser() {
    let { axios } = setRole();
    try {
      const { data } = await axios.get(
        `/game-match/getCommisionReport/${id}?&page=${currentPage}&limit=${pageLimit}`
      );

      // data?.data?.data.map((element) => {
      //   let roleDetail = roles.find(findThisRole);
      //   function findThisRole(role) {
      //     return role.id === element.roleId;
      //   }
      //   element.role = roleDetail?.roleName;
      // });
      // // dispatch(setSubUserData(data?.data?.data));
      setData(data?.data);
      // setPageCount(
      //   Math.ceil(
      //     parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) /
      //       pageLimit
      //   )
      // );
    } catch (e) {
      console.log(e);
    }
  }

  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const { subCurrentPageNo } = useSelector((state) => state?.auth);
  function callPage(val) {
    // dispatch(setSubPage(parseInt(val)));
    setCurrentPage(parseInt(val));
  }

  const ListHeaderT = () => {
    return (
      <Box
        sx={{
          width: "100%",
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
            width: { laptop: "11.5vw", tablet: "20.5vw", mobile: "42.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "10px", laptop: "12px", tablet: "12px" },
            }}
          >
            Name
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "12.5vw", tablet: "12.5vw", mobile: "28.5vw" },

            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "10px", laptop: "12px", tablet: "12px" },
            }}
          >
            Commission Type
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "10.5vw", tablet: "10.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { mobile: "10px", laptop: "12px", tablet: "12px" },
            }}
          >
            Commission Amount
          </Typography>
        </Box>
      </Box>
    );
  };

  const AccountListRow = ({
    containerStyle,
    fContainerStyle,
    fTextStyle,
    element,
  }) => {
    const prevElement = {
      title:
        element?.ComissionType === "session"
          ? element?.bet_id?.bet_condition
          : element?.match_id?.title,
      commissionAmount: element.ComissionAmount,
      commissionType: element.ComissionType,
    };
    const [elementToUDM, setElementToUDM] = useState(prevElement);

    function checkIfElementUpdated(val) {
      setElementToUDM(val);
    }
    useEffect(() => {
      checkIfElementUpdated(prevElement);
    }, [element.ComissionType]);

    return (
      <Box
        sx={[
          {
            width: "100%",
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
              width: { laptop: "11.5vw", tablet: "20.5vw", mobile: "42.5vw" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
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
                cursor: "pointer",
              },
              fTextStyle,
            ]}
          >
            {elementToUDM.title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "12.5vw", tablet: "12.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.commissionType}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "10.5vw", tablet: "10.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.commissionAmount}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
        <Box sx={{ marginX: "0.5%" }}>
          <ListH
            id={id}
            title={"Commission Report"}
            setData={setData}
            setShow={setShow}
            matchesMobile={matchesMobile}
          />

          <ListHeaderT />
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            {data1?.map((element, i) => {
              if (i % 2 === 0) {
                return (
                  <AccountListRow
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

const Footer = ({ currentPage, pages, callPage, setShow }) => {
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

const ListH = ({ id, title, setData, matchesMobile, setShow }) => {
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: "10px",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Typography
          sx={{
            fontSize: { mobile: "14px", laptop: "18px", tablet: "18px" },
            color: "#FFF",
            marginRight: { mobile: "10px", laptop: "20px", tablet: "20px" },
          }}
        >
          {title}
        </Typography>
        {/* 
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
              />
            </Box>
          </>
        )} */}
      </Box>
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
      {/* 
      <SearchInputModal
        setData={setData}
        id={id}
        show={true}
        placeholder={"Search User..."}
      /> */}
    </Box>
  );
};

export default CommissionReportTable;
