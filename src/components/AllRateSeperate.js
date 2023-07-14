import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { DELETE, ARROWUP } from "../assets";
import userAxios from "../axios/userAxios";

import {
  ARROWDOWN,
  ARROWUPPROFIT
} from "../expert/assets";
import StyledImage from "./StyledImage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import constants from "./helper/constants";
const AllRateSeperate = ({
  profit,
  mark,
  mark2,
  allBetsData,
  count,
  betHistory,
  isArrow
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const { allbetsPage } = useSelector((state) => state?.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.currentUser);

  const [visible, setVisible] = useState(true);
  return (
    <>
      <Box
        sx={[
          {
            width: { tablet: "100%", mobile: "100%", laptop: "100%" },
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            marginX: { laptop: "0vw", mobile: "0px", tablet: "0px" },
            marginY: { laptop: ".5vh", mobile: "2px" },
            marginTop: { mobile: "0" },
            marginBottom: { laptop: ".5vh", mobile: "2px" },
            borderRadius: "2px",
            background: "white",
            padding: '1px',

            alignSelf: {
              mobile: "center",
              tablet: "center",
              laptop: "flex-start",
            },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "13px", tablet: "10px", mobile: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              All Rate Bets: {count < 10 ? 0 : ""}{count || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div className="slanted"></div>
          </Box>
          {/* <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          ></Box> */}

          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              onClick={() => {
                setVisible(!visible);
              }}
              src={ARROWUP}
              style={{
                transform: visible ? "rotate(180deg)" : "rotate(0deg)",
                width: "15px",
                height: "15px",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            />
            {/* <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "#FF1111" }}
            >
              All Bet
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "#0B4F26" }}
            >
              {count || 0}
            </Typography> */}
          </Box>
        </Box>
        {visible && (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", gap: '1px' }}>
              <Box
                sx={{
                  height: "25px",
                  // margin: { mobile: "1px", laptop: "0.5px" },
                  width: "30px",
                  display: "flex",
                  background: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontWeight: "400", fontSize: "10px", color: "white" }}
                >
                  {"No"}
                </Typography>
              </Box>
              <RowComponent
                header={true}
                data={["Market", "Favourite", "B/Lay", "Odds", "Stake"]}
              />

              {profit && (
                <Box
                  sx={{
                    height: "25px",
                    width: "30%",
                    display: "flex",
                    background: "#319E5B",
                    justifyContent: "center",
                    alignItems: "center",
                    // margin: { mobile: "1px", laptop: "0" },
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "400", fontSize: { mobile: "10px", laptop: ".7vw" }, color: "white" }}
                  >
                    {"Profit/Loss"}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              className="myScroll"
              sx={{
                maxHeight: { mobile: "200px", laptop: "420px" },
                overflowY: "auto",
              }}
            >
              {/* {console.warn("allBetsData :", allBetsData)} */}
              {[
                ...new Set(
                  allBetsData?.filter(
                    (v) =>
                      v.bet_type === "back" ||
                      v.bet_type === "lay" ||
                      v.bet_type === "no" ||
                      v.bet_type === "yes"
                  )
                ),
              ]?.map((i, k) => {
                const num = allBetsData.length - k;
                const formattedNum = num < 10 ? "0" + num : num.toString();

                return (
                  <Box
                    key={k}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                      gap: '1px',
                      // marginBottom: { mobile: "1px", laptop: "1px" },

                    }}
                  >
                    <Box
                      sx={{
                        height: "40px",
                        width: "30px",
                        display: "flex",
                        background: "black",
                        // marginBottom: { mobile: "1px", laptop: "1px" },
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "500",
                        }}
                      >
                        {formattedNum}
                      </Typography>
                    </Box>
                    <RowComponent header={false} data={i} />
                    {i?.deleted_reason && betHistory && (
                      <Box
                        sx={{
                          width: {
                            mobile: profit ? "100%" : "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            laptop: profit ? "100 % " : "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.5)",
                          height: "30px",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "20%" : "35%" }}></Box>
                      </Box>
                    )}
                    {i?.deleted_reason && betHistory === undefined && (
                      <Box
                        sx={{
                          width: {
                            mobile: profit ? "100%" : "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            laptop: profit ? "100 % " : "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.5)",
                          height: "42px",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "20%" : "35%" }}></Box>
                        <Box
                          sx={{
                            width: mark2 ? "80%" : "65%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                          }}
                        >
                          {mark && (
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: "700",
                                color: "white",
                                textTransform: "uppercase",
                              }}
                            >
                              Bet <span style={{ color: "#e41b23" }}>deleted</span>{" "}
                              due to ${i?.deleted_reason}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}

                    {profit && !i?.deleted_reason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "30%",
                          // margin: { mobile: "1px", laptop: "1px" },
                          // display: "flex",
                          background: i?.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
                          // justifyContent: "center",
                          // alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "100%",
                            px: "5px"
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { mobile: "9px", laptop: "14px" },
                              color: "white",
                              fontWeight: "700",
                            }}
                          >
                            {Number(i.myProfitLoss) >= 0 ? <><span style={{ visibility: "hidden" }}>-</span>{Number(i.myProfitLoss).toFixed(2)}</>
                              : Number(i.myProfitLoss).toFixed(2)}
                            {/* {Number(i?.myProfitLoss).toFixed(2) || ""} */}
                          </Typography>

                          {!matchesMobile && !isArrow && <StyledImage
                            sx={{
                              width: { mobile: "12px", laptop: "15px" },
                              height: { mobile: "5px", laptop: "7px" },
                            }}
                            src={i?.myProfitLoss > 0 ? ARROWUPPROFIT : ARROWDOWN}
                          />
                          }
                        </Box>
                      </Box>
                    )}
                    {profit && i?.deleted_reason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "30%",
                          // margin: { mobile: "1px", laptop: "1px" },
                          display: "flex",
                          background: "black",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                        }}
                      >
                        <StyledImage
                          sx={{
                            width: { mobile: "15px", laptop: "20px" },
                            height: { laptop: "20px", mobile: "14px" },
                            marginRight: "5px",
                          }}
                          src={DELETE}
                        />
                        <Typography
                          sx={{
                            fontSize: { mobile: "7px", laptop: ".5vw" },
                            color: "white",
                            fontWeight: "700",
                            width: { laptop: "65%", mobile: "55%" },
                            textTransform: "uppercase",
                          }}
                        >
                          Bet <span style={{ color: "#e41b23" }}>Deleted</span> Due{" "}
                          {"\n"} {i?.deleted_reason}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
              {/* <Footer
                currentPage={currentPage}
                pages={pageCount}
                callPage={callPage}
                currentPageNo={allbetsPage}
              /> */}
            </Box>
          </>
        )}
      </Box>

      {/* --------- */}
      <style >
        {`
                /* width */
                .myScroll::-webkit-scrollbar {
                  width: 0px;
                }

                /* Track */
                .myScroll::-webkit-scrollbar-track {
                  background: #f1f1f1;
                }

                /* Handle */
                .myScroll::-webkit-scrollbar-thumb {
                  background: #888;
                }

                /* Handle on hover */
                .myScroll::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
              `}
      </style>
    </>
  );
};

const RowComponent = ({ header, data }) => {
  const getTime = (date) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeString;
  };
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.bet_type === "back" || data?.bet_type === "yes") {
      // return "#FF9292";
      // return "#00C0F9";
      return "#CEEBFF";
    } else if (data?.bet_type === "lay" || data?.bet_type === "no") {
      return "#F2CBCB";
      // return "#FF9292";
      // return "#B3E0FF";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "25px" : "40px",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        gap: '1px',
        marginBottom: { mobile: "1px", laptop: "1px" },

      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            data={data?.marketType == "MANUAL BOOKMAKER" ? "Quick Bookmaker" : data?.marketType}
            first={true}
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={data}
            up={true}
            header={header}
            time={getTime(data.createAt)}
          />
          <SingleBox color={getColor()} data={data?.bet_type} header={header} boxWidth="50%" />
          <SingleBox color={getColor()} data={data?.odds} header={header} boxWidth="50%" />
          <SingleBox
            color={getColor()}
            data={data?.rate || data?.amount}
            header={header}
            width={"50%"}
            boxWidth="100%"
          />
        </>
      )}
      {header && (
        <>
          <SingleBox color={getColor} data={data[0]} header={header} boxWidth="100%" />
          <SingleBox color={getColor()} data={data[1]} header={header} boxWidth="100%" />
          <SingleBox color={getColor()} data={data[2]} header={header} boxWidth="50%" />
          <SingleBox color={getColor()} data={data[3]} header={header} boxWidth="50%" />
          <SingleBox color={getColor()} data={data[4]} header={header} boxWidth="100%" />
        </>
      )}
    </Box>
  );
};

const Footer = ({ currentPage, pages, callPage, currentPageNo }) => {
  return (
    <Box
      sx={{
        height: "35px",
        display: "flex",
        alignItems: "center",
        px: { mobile: "5px", laptop: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        // marginX: "0%",
        // marginBottom: "10px",
      }}
    >
      <Typography
        sx={{ fontSize: { mobile: "10px", laptop: "12px" }, fontWeight: "600" }}
      >
        Showing 1 to {pages}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "25px",
            width: { mobile: "60px", laptop: "80px" },
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
              fontSize: { laptop: "12px", mobile: "10px" },
            }}
          >
            Previous
          </Typography>
        </Box>
        <Box
          sx={{
            height: "25px",
            marginX: { laptop: "8px", mobile: "3.5px" },
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
              fontSize: { laptop: "12px", mobile: "12px" },
            }}
          >
            {currentPageNo + 1}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "25px",
            width: { mobile: "60px", laptop: "80px" },
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
const SingleBox = ({ data, header, color, up, first, time, width, boxWidth }) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: width ? width : "100%",
          height: "40px",
          background: "#F1C550",
          // marginX: { mobile: "0.5px", laptop: "0.5px" },
          display: "flex",
          // gap: '0.5px',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data === "Bookmaker" ? (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { mobile: "8px", tablet: "10px", laptop: ".5vw" },
              color: "black",
              textAlign: "center",
            }}
          >
            {data}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { mobile: "8px", tablet: "10px", laptop: ".5vw" },
              color: "black",
              textAlign: "center",
              maxHeight: "2em",
              overflow: "hidden",
              lineHeight: 1,
            }}
          >
            {data}
          </Typography>
        )}
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          // marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { laptop: "11px", tablet: "9px", mobile: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        {/* <Box sx={{ height: ".4vh" }}></Box> */}
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { laptop: "12px", tablet: "10px", mobile: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
          }}
        >
          {data.team_bet}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          // width: "100%",
          width: boxWidth,
          height: "40px",
          background: color,
          // marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { mobile: "10px", tablet: "10px", laptop: "12px", textTransform: 'capitalize' },
            color: "black",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  ) : (
    header && (
      <Box
        sx={{
          // width: "100%",
          width: boxWidth,
          height: "25px",
          background: "#319E5B",
          // gap: '0.5px',
          // marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { laptop: ".7vw", mobile: "10px" },
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  );
};
export default AllRateSeperate;
