import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { setRole } from "../newStore";
import constants from "./helper/constants";
import { useTheme } from "@emotion/react";
import moment from "moment";
import CustomLoader from "./helper/CustomLoader";
import StyledImage from "./StyledImage";
import { ArrowDown } from "../assets";

const CommissionReportTable = ({ id, show, setShow, title }) => {
  const theme = useTheme();
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [loader, setLoader] = useState(false);

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [matchList, setMatchList] = useState([]);
  const [commisionReport, setCommisionReport] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.pageLimit);
  const [showCommisionReport, setShowCommisionReport] = useState(false);
  const [selectedId, setSelectedId] = useState({
    match_id: "",
    user_id: "",
  });

  const getListOfMatches = async () => {
    let { axios } = setRole();
    try {
      const { data } = await axios.get(
        `/game-match/getMatchListDeclearResult`
        // `/fair-game-wallet/getCommisionReport/${id}?&pageNo=${currentPage}&pageLimit=${pageLimit}`
      );
      setMatchList(data?.data);
      setPageCount(
        Math.ceil(
          parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) /
            pageLimit
        )
      );
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      console.log(e);
    }
  };

  const getCommisionReport = async (match_id) => {
    let { axios } = setRole();
    try {
      const { data } = await axios.get(
        // `/game-match/getMatchListDeclearResult`
        `/fair-game-wallet/getCommisionReport/${id}/${match_id}`
      );
      console.log("datadata", data);
      setCommisionReport(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoader(true);
    getListOfMatches();
  }, [currentPage]);

  function callPage(val) {
    setCurrentPage(parseInt(val));
  }

  const MatchList = ({
    element,
    index,
    showCommisionReport,
    setShowCommisionReport,
    selectedId,
    setSelectedId,
    getCommisionReport,
    id,
  }) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Box
          onClick={() => {
            if (
              selectedId?.match_id == element?.match_id &&
              selectedId?.user_id == id
            ) {
              setShowCommisionReport((prev) => !prev);
            } else {
              setSelectedId({
                match_id: element?.match_id,
                user_id: id,
              });
              setShowCommisionReport(true);
              getCommisionReport(element?.match_id);
            }
          }}
          sx={{
            width: "100%",
            height: "50px",
            background: "white",
            display: "flex",
            padding: 0.1,
          }}
        >
          <Box
            sx={{
              width: { mobile: "10%", laptop: "5%" },
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              background: "black",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
            >
              {1 + index}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { mobile: "90%", laptop: "100%" },
              position: "relative",
              height: "100%",
              paddingY: "4px",
              alignItems: { laptop: "center", mobile: "center" },
              display: "flex",
              paddingX: "10px",
              background: "#0B4F26",
              marginLeft: 0.1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginTop: { mobile: "5px", laptop: "0" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "10px", laptop: "15px" },
                  color: "white",
                  fontWeight: "600",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineClamp: 2,
                }}
              >
                {element?.match_title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { laptop: "10px", mobile: "0" },
                  color: "white",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                ({moment(element?.match_createAt).format("DD-MM-YYYY")})
              </Typography>
            </Box>
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform: false ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {showCommisionReport && selectedId?.match_id == element?.match_id && (
          <>
            <Box
              sx={{
                width: { mobile: "100%", laptop: "96%" },
                marginTop: { mobile: ".25vh" },
                marginLeft: { laptop: "4%" },
                display: "flex",
                flexDirection: { laptop: "row", mobile: "column" },
              }}
            >
              <ListHeaderT />
              {/* <Box
                sx={{
                  // display: matchesBreakPoint ? "inline-block" : "block",
                  width: "100%",
                  position: "relative",
                }}
              > */}
                {/* {data1?.map((element, i) => (
              <AccountListRow
                key={i}
                showOptions={false}
                showChildModal={true}
                containerStyle={{
                  background:
                    element?.ComissionType === "commission setteled"
                      ? "#135a2e"
                      : ["back", "yes"].includes(
                          element?.bet_place_id?.bet_type
                        )
                      ? "#B3E0FF"
                      : ["lay", "no"].includes(element?.bet_place_id?.bet_type)
                      ? "#FF9292"
                      : "#FFE094 ",
                }}
                profit={element.profit_loss >= 0}
                fContainerStyle={{
                  background:
                    element?.ComissionType === "session"
                      ? "#319E5B"
                      : element?.ComissionType === "commission setteled"
                      ? "#135a2e"
                      : "#F1C550",
                }}
                fTextStyle={{
                  color:
                    ["commission setteled"].includes(element?.ComissionType) &&
                    "white",
                }}
                element={element}
                getListOfUser={getListOfUser}
                currentPage={currentPage}
              />
            ))} */}
              {/* </Box> */}
            </Box>
          </>
        )}
      </Box>
    );
  };

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
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
              fontSize: {
                mobile: "10px",
                laptop: "12px",
                tablet: "12px",
                lineHeight: 1,
              },
            }}
          >
            User Name
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
              fontSize: {
                mobile: "10px",
                laptop: "12px",
                tablet: "12px",
                lineHeight: 1,
              },
            }}
          >
            Commission Type
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
              fontSize: {
                mobile: "10px",
                laptop: "12px",
                tablet: "12px",
                lineHeight: 1,
              },
            }}
          >
            Commission Amount
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
              fontSize: {
                mobile: "10px",
                laptop: "12px",
                tablet: "12px",
                lineHeight: 1,
              },
            }}
          >
            My Commission
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
      betType: element?.bet_type,
      stack:
        element?.ComissionType === "match total"
          ? (element?.ComissionAmount * 100) / element?.userData?.matchComission
          : element?.amount,
      odds: element?.odds,
      isActive: element?.isActive,
      teamBet: element?.team_bet,
      createAt: element?.updateAt,
      myCommission: element?.myCommission,
      userName: element?.userData?.userName,
    };
    const [elementToUDM, setElementToUDM] = useState(prevElement);

    function checkIfElementUpdated(val) {
      setElementToUDM(val);
    }
    useEffect(() => {
      checkIfElementUpdated(prevElement);
    }, [element?.ComissionType]);
    return (
      <>
        {!elementToUDM?.isActive && (
          <Box
            sx={{
              background: "rgba(0,0,0,0.5)",
              width: { mobile: "218%", laptop: "100%", tablet: "100%" },
              height: "45px",
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
                width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
                  fontSize: { mobile: "10px", laptop: "12px", tablet: "10px" },
                  fontWeight: "600",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  color:
                    ["#319E5B", "#303030"].includes(
                      fContainerStyle.background
                    ) && "white",
                },
                fTextStyle,
              ]}
            >
              {elementToUDM?.userName}
            </Typography>
          </Box>
          <Box
            sx={[
              {
                width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
                  fontSize: { mobile: "10px", laptop: "12px", tablet: "10px" },
                  fontWeight: "600",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  color:
                    ["#319E5B", "#303030"].includes(
                      fContainerStyle.background
                    ) && "white",
                },
                fTextStyle,
              ]}
            >
              {elementToUDM.commissionType}
            </Typography>
          </Box>
          <Box
            sx={[
              {
                width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
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
                  fontSize: { mobile: "10px", laptop: "12px", tablet: "10px" },
                  fontWeight: "600",
                  cursor: "pointer",
                  color:
                    ["#319E5B", "#303030"].includes(
                      fContainerStyle.background
                    ) && "white",
                  display: " -webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                },
              ]}
            >
              {elementToUDM?.title}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {/* {elementToUDM.teamBet} */}
              {elementToUDM?.createAt
                ? `${moment(elementToUDM?.createAt).format("L")}  ${moment(
                    elementToUDM?.createAt
                  ).format("LT")}`
                : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {elementToUDM?.teamBet}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {elementToUDM?.odds}
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
              textTransform: "capitalize",
            }}
          >
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {elementToUDM?.betType}
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
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {elementToUDM?.stack}
            </Typography>
          </Box>

          <Box
            sx={{
              width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {elementToUDM?.commissionAmount}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "12.5%", tablet: "12.5%", mobile: "12.5%" },
              display: "flex",
              paddingLeft: "10px",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            }}
          >
            <Typography
              sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
            >
              {elementToUDM?.myCommission}
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
            width: { mobile: "96%", laptop: "85%", tablet: "96%" },
            // marginX: "0.5%",
            minHeight: loader ? "50%" : "200px",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
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
        {loader ? (
          <CustomLoader />
        ) : (
          <>
            {" "}
            <Box sx={{ marginX: "0", background: "#F8C851", height: "50px" }}>
              <ListH
                id={id}
                userName={title}
                title={"Commission Report"}
                setMatchList={setMatchList}
                setShow={setShow}
                matchesMobile={matchesMobile}
              />
            </Box>
            <Box
              sx={{
                overflowX: "auto",
                width: { mobile: "100%", laptop: "100%", tablet: "100%" },
              }}
            >
              {matchList?.map((element, index) => (
                <MatchList
                  key={element?.match_id}
                  element={element}
                  index={index}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  showCommisionReport={showCommisionReport}
                  setShowCommisionReport={setShowCommisionReport}
                  getCommisionReport={getCommisionReport}
                  id={id}
                />
              ))}
              {/* <ListHeaderT />
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
                          ? "#135a2e"
                          : ["back", "yes"].includes(
                              element?.bet_place_id?.bet_type
                            )
                          ? "#B3E0FF"
                          : ["lay", "no"].includes(
                              element?.bet_place_id?.bet_type
                            )
                          ? "#FF9292"
                          : "#FFE094 ",
                    }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{
                      background:
                        element?.ComissionType === "session"
                          ? "#319E5B"
                          : element?.ComissionType === "commission setteled"
                          ? "#135a2e"
                          : "#F1C550",
                    }}
                    fTextStyle={{
                      color:
                        ["commission setteled"].includes(
                          element?.ComissionType
                        ) && "white",
                    }}
                    element={element}
                    getListOfUser={getListOfUser}
                    currentPage={currentPage}
                  />
                ))}
              </Box> */}
            </Box>
            <Footer
              currentPage={currentPage}
              pages={pageCount}
              callPage={callPage}
            />
          </>
        )}
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

const ListH = ({
  id,
  title,
  setMatchList,
  matchesMobile,
  setShow,
  userName,
}) => {
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: "10px",
        height: "100%",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Typography
          sx={{
            fontSize: { mobile: "14px", laptop: "18px", tablet: "18px" },
            fontWeight: "500",
            color: "#000",
            textTransform: "capitalize",
            marginRight: { mobile: "10px", laptop: "20px", tablet: "20px" },
          }}
        >
          {userName ? `${userName} -` : ""} ({title}){" "}
        </Typography>
      </Box>

      <Button
        sx={{ color: "", fontSize: "30px" }}
        onClick={() => {
          setShow({ value: false, id: "", title: "" });
        }}
      >
        &times;
      </Button>
    </Box>
  );
};

export default CommissionReportTable;
