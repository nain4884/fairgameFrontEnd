import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
const data = [
  {
    title: "Bookmaker",
    time: "03:23 AM",
    type: "Back",
    odds: "90.00",
    stake: "1000.00",
    country: "INDIA",
  },
  {
    title: "Match odds",
    time: "03:23 AM",
    type: "Lay",
    odds: "90.00",
    stake: "1000.00",
    country: "INDIA",
  },
];
const AllRateSeperate = ({ profit, mark, setPageCountOuter, mark2, allBetsData, count, callPage }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(constants.pageLimit);
  const { allbetsPage } = useSelector((state) => state?.auth);



  // function callPage(val) {
  //   alert(val)
  //   // dispatch(setPage(parseInt(val)));
  //   setCurrentPage(parseInt(val));
  //   setPageCountOuter(parseInt(val))
  // }






  // const user = useSelector((state) => state?.rootReducer?.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.currentUser);
  const match_id = location.state;

  const [allRateBets, setAllRateBets] = useState([]);

  function doEmptyGetAllBets() {
    setAllRateBets([]);
  }

  async function getAllBetsData() {
    let allRateBetsTemp = [];
    let Bets = [];
    allBetsData?.forEach((element) => {
      element?.bettings?.forEach((element2) => {
        Bets.push({ ...element2, marketId: element.marketId });
      });
    });
    Promise.all(
      Bets.map(async (element) => {
        let payload = {
          match_id: element.match_id,
          user_id: currentUser?.id
        };
        try {
          let { data } = await userAxios.post(
            `/betting/getPlacedBets`,
            payload
          );

          allRateBetsTemp.push(...data.data[0]);
        } catch (e) {
          console.log(e);
        }
      })
    ).then(() => {
      setAllRateBets(allRateBetsTemp);

    });
  }
  return (
 
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
                height: "42px",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "4px",
                marginBottom: ".1vh",
                display: "flex",
              },
              (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`,
              }),
            ]}
          >
            <Typography
              sx={{ fontWeight: "12px", color: "white", fontWeight: "700" }}
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
                {count || 0}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                height: "30px",
                margin: { mobile: "1px", laptop: "0.5px" },
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
              data={["Market", "Favourite", "Back/Lay", "Odds", "Stake"]}
            />

            {profit && (
              <Box
                sx={{
                  height: "30px",
                  width: "30%",
                  display: "flex",
                  background: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: { mobile: "1px", laptop: "1px" },
                }}
              >
                <Typography
                  sx={{ fontWeight: "400", fontSize: "10px", color: "white" }}
                >
                  {"Profit/Loss"}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              maxHeight: { mobile: "200px", laptop: "420px" },
              overflowY: "auto",
            }}
          >
            {/* {console.warn("allBetsData :", allBetsData)} */}
            {[...new Set(allBetsData?.filter((v) => v.bet_type === "back" || v.bet_type === "lay" || v.bet_type === "no" || v.bet_type === "yes"))]?.map((i, k) => {
              const num = k + 1;

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
                      height: "40px",
                      width: "30px",
                      display: "flex",
                      background: "black",
                      margin: { mobile: "1px", laptop: "1px" },
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
                      {num < 10 ? "0" + num : num.toString()}
                    </Typography>
                  </Box>
                  <RowComponent header={false} data={i} />
                  {/* {k === 2 && <Box sx={{ width: { mobile: profit ? '100%' : '100%', alignItems: 'flex-end', justifyContent: 'center', display: 'flex', laptop: profit ? '100 % ' : '100% ' }, background: 'rgba(0, 0, 0, 0.5)', height: '42px', position: 'absolute' }}>
                                    <Box sx={{ width: mark2 ? '20%' : '35%' }} >
                                    </Box>
                                    <Box sx={{ width: mark2 ? '80%' : '65%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                                        {mark && <Typography sx={{ fontSize: '10px', fontWeight: '700', color: 'white', textTransform: "uppercase" }}>Bet <span style={{ color: '#e41b23' }} >deleted</span> due to no ball</Typography>}
                                        
                                    </Box>
                                </Box>} */}

                  {profit && k !== 2 && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
                        margin: { mobile: "1px", laptop: "1px" },
                        display: "flex",
                        background: k % 2 === 0 ? "#E32A2A" : "#10DC61",
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
                        {"100,000,00"}
                      </Typography>

                      <StyledImage
                        sx={{
                          width: { mobile: "15px", laptop: "25px" },
                          height: { laptop: "15px", mobile: "7px" },
                        }}
                        src={k % 2 === 0 ? ARROWDOWN : ARROWUP}
                      />
                    </Box>
                  )}
                  {profit && k === 2 && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
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
                          fontSize: { mobile: "7px", laptop: ".8vw" },
                          color: "white",
                          fontWeight: "700",
                          width: { laptop: "65%", mobile: "55%" },
                          textTransform: "uppercase",
                        }}
                      >
                        Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                        Due {"\n"} to No Ball
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
        </Box>
    
  );
};

const RowComponent = ({ header, data }) => {
  const getTime = (date) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return timeString;
  }
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.bet_type === "back" || data?.bet_type === "yes") {
      // return "#FF9292"; 
      // return "#00C0F9"; 
      return "rgb(179, 224, 255)"
    } else if (data?.bet_type === "lay" || data?.bet_type === "no") {
      return "rgb(255, 146, 146)"
      // return "#FF9292";
      // return "#B3E0FF";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "30px" : "42px",
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
            data={data?.marketType}
            first={true}
            header={header}
          />
          <SingleBox color={getColor()} data={data} up={true} header={header} time={getTime(data.createAt)} />
          <SingleBox color={getColor()} data={data?.bet_type} header={header} />
          <SingleBox color={getColor()} data={data?.odds} header={header} />
          <SingleBox color={getColor()} data={data?.rate || data?.amount} header={header} width={"50%"} />
        </>
      )}
      {header && (
        <>
          <SingleBox color={getColor} data={data[0]} header={header} />
          <SingleBox color={getColor()} data={data[1]} header={header} />
          <SingleBox color={getColor()} data={data[2]} header={header} />
          <SingleBox color={getColor()} data={data[3]} header={header} />
          <SingleBox color={getColor()} data={data[4]} header={header} />
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
const SingleBox = ({ data, header, color, up, first, time, width }) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: width ? width : "100%",
          height: "40px",
          background: "#F1C550",
          marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data === "Bookmaker" ? (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { mobile: "8px", tablet:"10px" ,laptop: ".5vw" },
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
              fontSize: { mobile: "8px",tablet:"10px" , laptop: ".5vw" },
              color: "black",
              textAlign: "center",
              maxHeight: "2em", overflow: 'hidden', lineHeight: 1,
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
          marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {laptop: "11px",tablet:"9px", mobile: "9px"},
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
            fontSize: { laptop: "12px",tablet:"10px", mobile: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em", overflow: 'hidden', lineHeight: 1,
          }}
        >
          {data.team_bet}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          background: color,
          marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { mobile: "p8x",tablet:"10px", laptop: "12px" },
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
          width: "100%",
          height: "30px",
          background: "black",
          marginX: { mobile: "1px", laptop: "1px" },
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
