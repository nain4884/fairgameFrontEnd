import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { ArrowDown, DELETE, MyBet } from "../assets";
import userAxios from "../axios/userAxios";

import { ARROWDOWN, ARROWUP } from "../expert/assets";
import StyledImage from "./StyledImage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setAllBetRate,
  setAllBetRates,
} from "../newStore/reducers/matchDetails";
import constants from "./helper/constants";
const BetHistory = ({
  profit,
  mark,
  setPageCountOuter,
  mark2,
  allBetsData,
  count,
  callPage,
  betData,
  betHistory,
  isArrow,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const { allbetsPage } = useSelector((state) => state?.auth);

  // const user = useSelector((state) => state?.rootReducer?.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.currentUser);
  const match_id = location.state;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <>
      {
        <Box
          sx={{
            width: { mobile: "100%", laptop: "100%" },
            marginY: { mobile: ".2vh", laptop: "1vh" },
            padding: 0.2,
            background: "white",
          }}
        >
          <Box
            sx={[
              {
                width: "100%",
                height: {mobile: "37px", laptop: "42px"},
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "4px",
                marginBottom: ".1vh",
                display: "flex",
                background: "#F8C851",
              },
              // (theme) => ({
              //   backgroundImage: `${theme.palette.primary.headerGradient}`,
              // }),
            ]}
          >
            <Typography
              sx={{ fontSize: {mobile: "12px", laptop: "16px"}, color: "black", fontWeight: "700" }}
            >
              All Rate Bets
            </Typography>
            <Box
              sx={{
                width: "100px",
                height: "90%",
                background: "white",
                justifyContent: "center",
                borderRadius: "3px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", fontWeight: "700", color: "#FF1111" }}
              >
                All Bet
              </Typography>
              <Typography
                sx={{ fontSize: "12px", fontWeight: "700", color: "#0B4F26" }}
              >
                {[...new Set(betData?.filter((v) => v.sessionBet !== true))]?.length || 0}
                {/* {betData.length || 0} */}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                height: "30px",
                margin: { mobile: "0.5px", laptop: "0" },
                width: {mobile: "5%", laptop: "4%"},
                display: "flex",
                background: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "400", fontSize: { mobile: "8px", laptop: "11px" }, color: "white" }}
              >
                {"No"}
              </Typography>
            </Box>
            <RowComponent
              profit={profit}
              header={true}
              data={["Username", "Market", "Favourite", "B/Lay", "Odds", "Stake"]}
            />

            {profit && (
              <Box
                sx={{
                  height: "30px",
                  width: "20%",
                  display: "flex",
                  background: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: { mobile: "0", laptop: "1px" },
                  my: 0,
                  my: "0px !important"
                }}
              >
                <Typography
                  sx={{ fontWeight: "400", fontSize: { mobile: "8px", laptop: "11px" }, color: "white" }}
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
            {[...new Set(betData?.filter((v) => v.sessionBet !== true))]?.map(
              (i, k) => {
                {
                  /* {betData?.map((i, k) => { */
                }
                const num = betData.length - k;
                const formattedNum = num < 10 ? "0" + num : num.toString();
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        height: {mobile: "35px", laptop: "40px"},
                        width: {mobile: "5%", laptop: "4%"},
                        display: "flex",
                        background: "black",
                        margin: { mobile: "0.5px", laptop: "1px" },
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: { mobile: "8px", laptop: "11px" },
                          fontWeight: "500",
                        }}
                      >
                        {formattedNum}
                      </Typography>
                    </Box>
                    <RowComponent profit={profit} header={false} data={i} />
                    {/* {profit && k !== - && ( */}
                    <Box
                      sx={{
                        height: {mobile: "35px", laptop: "40px"},
                        width: "20%",
                        margin: { mobile: "0", laptop: "1px" },
                        display: "flex",
                        // background: k % 2 === 0 ? "#E32A2A" : "#10DC61",
                        background: i.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingX: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { mobile: "11px", laptop: "12px" },
                          color: "white",
                          fontWeight: "700",
                        }}
                      >
                        {Number(i.myProfitLoss) >= 0 ? (
                          <>
                            <span style={{ visibility: "hidden" }}>-</span>
                            {Number(i.myProfitLoss).toFixed(2)}
                          </>
                        ) : (
                          Number(i.myProfitLoss).toFixed(2)
                        )}
                      </Typography>

                      {!matchesMobile && !isArrow && (
                        <StyledImage
                          sx={{
                            width: { mobile: "15px", laptop: "15px" },
                            height: { laptop: "7px", mobile: "7px" },
                          }}
                          src={i.myProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                        // src={k % 2 === 0 ? ARROWDOWN : ARROWUP}
                        />
                      )}
                    </Box>
                    {/* )} */}

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
                          height: {mobile: "35px", laptop: "40px"}, 
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "20%" : "35%" }}></Box>
                      </Box>
                    )}

                    {/* {profit && i?.deleted_reason !==null && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "12.5%",
                          margin: { mobile: "1px", laptop: "1px" },
                          display: "flex",
                          background:
                            i.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
                          // background: k % 2 == 0 ? "#E32A2A" : "#10DC61",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { mobile: "11px", laptop: "14px" },
                            color: "white",
                            fontWeight: "700",
                          }}
                        >
                          {Number(i.myProfitLoss).toFixed(2)}
                        </Typography>
                        <StyledImage
                          sx={{
                            width: { mobile: "15px", laptop: "25px" },
                            height: { laptop: "15px", mobile: "7px" },
                          }}
                          src={
                            Number(i.myProfitLoss).toFixed(2) > 0
                              ? ARROWUP
                              : ARROWDOWN
                          }
                          // src={k % 2 == 0 ? ARROWDOWN : ARROWUP}
                        />
                      </Box>
                    )} */}
                    {profit && i?.deleted_reason && (
                      <Box
                        sx={{
                          height: {mobile: "35px", laptop: "40px"},
                          width: "20%",
                          margin: { mobile: "1px", laptop: "1px" },
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
                          Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                          Due {"\n"} {i.deleted_reason}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              }
            )}
            {/* <Footer
                            currentPage={currentPage}
                            pages={pageCount}
                            callPage={callPage}
                            currentPageNo={allbetsPage}
                        /> */}
          </Box>
        </Box>
      }
    </>
  );
};

const RowComponent = ({ header, data, profit }) => {
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
    } else if (data?.betType === "back" || data?.betType === "yes") {
      // return "#FF9292";
      // return "#00C0F9";
      return "rgb(179, 224, 255)";
    } else if (data?.betType === "lay" || data?.betType === "no") {
      return "rgb(255, 146, 146)";
      // return "#FF9292";
      // return "#B3E0FF";
    }
  };
  return (
    <Box
      sx={{
        width: profit ? "76%" : "95%",
        height: header ? "30px" : {mobile: "35px", laptop: "40px"},
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            data={
              data?.username
            }
            first={true}
            header={header}
          />
          <SingleBox
            color={getColor}
            data={
              data?.marketType == "MANUAL BOOKMAKER"
                ? "Quick Bookmaker"
                : data?.marketType
            }
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
          <SingleBox
            color={getColor()}
            data={data?.betType}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data?.amount}
            header={header}
            boxWidth="100%"
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor}
            data={data[1]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[2]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            boxWidth="50%"
            color={getColor()}
            data={data[3]}
            header={header}
          />
          <SingleBox
            boxWidth="50%"
            color={getColor()}
            data={data[4]}
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={data[5]}
            header={header}
            boxWidth="100%"
          />
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
const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  width,
  boxWidth,
}) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: "100%",
          height: {mobile: "35px", laptop: "40px"},
          background: "#F1C550",
          marginX: { mobile: "0.5px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data === "Bookmaker" ? (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { mobile: "8px", tablet: "10px", laptop: ".7vw" },
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
              fontSize: { mobile: "8px", tablet: "10px", laptop: "11px" },
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
          height: {mobile: "35px", laptop: "40px"},
          flexDirection: "column",
          background: color,
          marginX: { mobile: "0.5px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { laptop: "9px", tablet: "8px", mobile: "8px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Box sx={{ height: ".4vh" }}></Box>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { laptop: "11px", tablet: "9px", mobile: "9px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: { mobile: "54px", laptop: "initial" },
          }}
        >
          {data?.team_bet || data?.teamBet}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          // width:  "100%",
          width: boxWidth,
          height: {mobile: "35px", laptop: "40px"},
          background: color,
          marginX: { mobile: "0.5px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { mobile: "9px", tablet: "10px", laptop: "12px" },
            color: "black",
            textTransform: "capitalize"
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
          // width:  "100%",
          width: boxWidth,
          height: "30px",
          background: "black",
          marginX: { mobile: "0.5px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { laptop: "12px", mobile: "10px" },
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
export default BetHistory;
