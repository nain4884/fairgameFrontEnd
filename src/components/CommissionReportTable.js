import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import constants from "./helper/constants";

import SearchInputModal from "./SearchInputModal";

import { useTheme } from "@emotion/react";
import moment from "moment";

const CommissionReportTable = ({ id, show, setShow, title }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [data1, setData] = useState([]);

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
      setPageCount(
        Math.ceil(
          parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) /
            pageLimit
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const { subCurrentPageNo } = useSelector((state) => state?.auth);

  useEffect(() => {
    getListOfUser();
  }, [currentPage]);

  function callPage(val) {
    // dispatch(setSubPage(parseInt(val)));
    setCurrentPage(parseInt(val));
  }

  const ListHeaderT = () => {
    return (
      <Box
        sx={{
          width: { mobile: "218%", laptop: "100%", tablet: "100%" },
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
            width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
            width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
            Date/Time
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
            Team
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
            width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
            Odds
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "15%", tablet: "15%", mobile: "15%" },
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
            Bet Type
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "15%", tablet: "15%", mobile: "15%" },
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
            Stack
          </Typography>
        </Box>

        <Box
          sx={{
            width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
      betType: element?.bet_place_id?.bet_type,
      stack: element?.bet_place_id?.amount,
      odds: element?.bet_place_id?.odds,
      isActive: element?.isActive,
      teamBet: element?.bet_place_id?.team_bet,
      createAt: element?.createAt,
    };
    const [elementToUDM, setElementToUDM] = useState(prevElement);

    function checkIfElementUpdated(val) {
      setElementToUDM(val);
    }
    useEffect(() => {
      checkIfElementUpdated(prevElement);
    }, [element.ComissionType]);
console.log("containerStyle", fContainerStyle);
    return (
      <>
        {!elementToUDM?.isActive && (
          <Box
            sx={{
              background: "rgba(0,0,0,0.5)",
              width: { mobile: "218%", laptop: "100%", tablet: "100%" },
              height: "50px",
              position: "absolute",
              display: "flex",
            }}
          />
        )}

        <Box
          sx={[
            {
              width: { mobile: "218%", laptop: "100%", tablet: "100%" },
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
                width: { laptop: "20%", tablet: "20%", mobile: "20%" },
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
                  fontSize: { mobile: "10px", laptop: "10px", tablet: "10px" },
                  fontWeight: "600",
                  cursor: "pointer",
                  color:["#319E5B","#303030"].includes(fContainerStyle.background) && "white"
                },
                
              ]}
            >
              {elementToUDM.title}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "20%", tablet: "20%", mobile: "20%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography sx={[{ fontSize: "12px", fontWeight: "600" },fTextStyle]}>
              {/* {elementToUDM.teamBet} */}
              {elementToUDM.createAt
                ? `${moment(elementToUDM?.createAt).format("L")}  ${moment(
                    elementToUDM?.createAt
                  ).format("LT")}`
                : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "20%", tablet: "20%", mobile: "20%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography sx={[{ fontSize: "12px", fontWeight: "600" },fTextStyle]}>
              {elementToUDM.teamBet}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "20%", tablet: "20%", mobile: "20%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
              ...fContainerStyle,
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "600",    color:["#319E5B","#303030"].includes(fContainerStyle.background) && "white" }}
            >
              {elementToUDM.commissionType}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "20%", tablet: "20%", mobile: "20%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography sx={[{ fontSize: "12px", fontWeight: "600" },fTextStyle]}>
              {elementToUDM.odds}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "15%", tablet: "15%", mobile: "15%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography sx={[{ fontSize: "12px", fontWeight: "600" },fTextStyle]}>
              {elementToUDM.betType}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "15%", tablet: "15%", mobile: "15%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography sx={[{ fontSize: "12px", fontWeight: "600" },fTextStyle]}>
              {elementToUDM.stack}
            </Typography>
          </Box>

          <Box
            sx={{
              width: { laptop: "20%", tablet: "20%", mobile: "20%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography sx={[{ fontSize: "12px", fontWeight: "600" },fTextStyle]}>
              {elementToUDM.commissionAmount}
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        sx={[
          {
            width: { mobile: "100%", laptop: "96%", tablet: "96%" },
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
        </Box>

        <Box
          sx={{
            overflowX: "auto",
            width: { mobile: "99%", laptop: "103%", tablet: "103%" },
          }}
        >
          <ListHeaderT />
          <Box
            sx={{
              display: matchesBreakPoint ? "inline-block" : "block",
              width: "100%",
              position: "relative",
            }}
          >
            {data1?.map((element, i) => (
              <AccountListRow
                key={i}
                showOptions={false}
                showChildModal={true}
                containerStyle={{
                  background:
                    element?.ComissionType === "commission setteled"
                      ? "#303030"
                      : ["back", "yes"].includes(
                          element?.bet_place_id?.bet_type
                        )
                      ? "#B3E0FF"
                      : ["lay", "no"].includes(element?.bet_place_id?.bet_type)
                      ? "#F6D0CB"
                      : "#FFE094 ",
                }}
                profit={element.profit_loss >= 0}
                fContainerStyle={{
                  background:
                    element?.ComissionType === "session"
                      ? "#319E5B"
                      : element?.ComissionType === "commission setteled"
                      ? "#303030"
                      : "#F1C550",
                }}
                fTextStyle={{ color: ["commission setteled" ].includes(element?.ComissionType) && "white" }}
                element={element}
                getListOfUser={getListOfUser}
                currentPage={currentPage}
              />
            ))}
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

const Footer = ({ currentPage, getListOfUser, pages, callPage, setShow }) => {
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
