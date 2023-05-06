import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DELETE, MyBet } from "../assets";
import userAxios from "../axios/userAxios";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import StyledImage from "./StyledImage";
import { useSelector } from "react-redux";
import { formatNumber } from "./helper/helper";
const data = [
  {
    title: "BOOKMAKER",
    time: "03:23 AM",
    type: "Yes",
    odds: "90.00",
    stake: "1000.00",
    country: "INDIA",
  },
  {
    title: "Match odds",
    time: "03:23 AM",
    type: "No",
    odds: "90.00",
    stake: "1000.00",
    country: "INDIA",
  },
];
const SessionBetSeperate = ({ profit, mark, mark2, allBetsData }) => {
  //  {console.warn("allBetsData qq:",allBetsData)}
  return (
    <Box
      sx={{
        width: { mobile: "100%", laptop: "100%" },
        marginY: { mobile: ".2vh", laptop: "1vh" },
        padding: 0.2,
        background: "white",
        height: "auto",
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
          Session Bets
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
            {allBetsData?.length || 0}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            margin: { mobile: "1px", laptop: "0.5px" },
            height: "30px",
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
          data={["Matched Bet", "Odds", "Yes/No", "Stake"]}
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
              margin: { mobile: "1px", laptop: "0.4px" },
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
        {allBetsData?.map((i, k) => {
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
                  margin: { mobile: "1px", laptop: "0.4px" },
                  width: "30px",
                  display: "flex",
                  background: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "10px", fontWeight: "500" }}
                >
                  {"0" + (k + 1)}
                </Typography>
              </Box>
              <RowComponent header={false} data={i} />
              {/* {
                                k == 2 && <Box sx={{ width: { mobile: profit ? '100%' : '100%', alignItems: 'flex-end', justifyContent: 'center', display: 'flex', laptop: profit ? '100 % ' : '100% ' }, background: 'rgba(0, 0, 0, 0.5)', height: '42px', position: 'absolute' }}>
                                    <Box sx={{ width: mark2 ? '35%' : '35%' }} >
                                    </Box>
                                    <Box sx={{ width: mark2 ? '65%' : '65%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                                        {mark && <Typography sx={{ fontSize: '10px', fontWeight: '700', color: 'white', textTransform: "uppercase" }}>Bet <span style={{ color: '#e41b23' }} >deleted</span> due to no ball</Typography>}
                                    </Box>
                                </Box>
                            } */}
              {profit && k !== 2 && (
                <Box
                  sx={{
                    height: "40px",
                    width: "30%",
                    margin: { mobile: "1px", laptop: "0.4px" },
                    display: "flex",
                    background: k % 2 == 0 ? "#E32A2A" : "#10DC61",
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
                    src={k % 2 == 0 ? ARROWDOWN : ARROWUP}
                  />
                </Box>
              )}
              {profit && k == 2 && (
                <Box
                  sx={{
                    height: "40px",
                    width: "30%",
                    margin: { mobile: "1px", laptop: "0.4px" },
                    display: "flex",
                    background: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingX: "2px",
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
                    Bet <span style={{ color: "#e41b23" }}>Deleted</span> Due{" "}
                    {"\n"} to No Ball
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
// value2 = { formatNumber(newData?.rate_percent?.split("-")[0])}
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
    // if (header) {
    //     return "black"
    // }
    // else if (data?.type == "Yes") {
    //     return "#B3E0FF"
    // }
    // else {
    //     return "#FF9292"
    // }
    if (header) {
      return "black";
    } else if (data?.bet_type === "back" || data?.bet_type == "yes") {
      // return "#00C0F9";
      return "rgb(179, 224, 255)";
    } else if (data?.bet_type === "lay" || data?.bet_type == "no") {
      // return "#FF9292";
      return "rgb(255, 146, 146)";
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
            time={getTime(data.createAt)}
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            isPercent={true}
            rate={formatNumber(
              data?.bet_type == "no"
                ? data?.rate?.split("-")[0]
                : data?.rate?.split("-")[1]
            )}
          />
          <SingleBox color={getColor()} data={data?.bet_type} header={header} />
          <SingleBox
            color={getColor()}
            data={data?.stack || data?.stake || data?.amount}
            header={header}
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            first={true}
            header={header}
          />
          <SingleBox color={getColor()} data={data[1]} header={header} />
          <SingleBox color={getColor()} data={data[2]} header={header} />
          <SingleBox color={getColor()} data={data[3]} header={header} />
        </>
      )}
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
  isPercent,
  rate,
}) => {
  // console.log(data, "dataaaa")
  return !header ? (
    first ? (
      <Box
        sx={{
          width: "140%",
          height: "40px",
          flexDirection: "column",
          background: "#F8C851",
          marginX: { mobile: "1px", laptop: "0.4px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { mobile: "6px", laptop: "8px" },
            color: "black",
            textAlign: "end",
            marginRight: "3px",
          }}
        >
          {time}
        </Typography>
        <Box sx={{ height: ".4vh" }}></Box>
        <Typography
          sx={{
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
            fontWeight: "800",
            fontSize: { laptop: ".6vw", mobile: "8px" },
            color: "black",
            textAlign: "start",
            marginLeft: "3px",
          }}
        >
          {data}
        </Typography>
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          marginX: { mobile: "1px", laptop: "0.4px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "8px",
            color: "black",
            textAlign: "end",
            marginRight: "3px",
          }}
        >
          {data.time}
        </Typography>
        <Box sx={{ height: ".4vh" }}></Box>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "12px",
            color: "black",
            textAlign: "start",
            marginLeft: "3px",
          }}
        >
          {data.country}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          background: color,
          marginX: { mobile: "1px", laptop: "0.4px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { mobile: "11px", laptop: "13px" },
            color: "black",
          }}
        >
          {data}
        </Typography>
        {isPercent && (
          <Typography
            sx={{
              fontSize: "6px",
              marginTop: -0.4,
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {rate}
          </Typography>
        )}
      </Box>
    )
  ) : header && first ? (
    <Box
      sx={{
        width: "140%",
        height: "30px",
        background: "#319E5B",
        marginX: { mobile: "1px", laptop: "0.4px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "12px",
          color: "white",
          wordWrap: "break-word",
        }}
      >
        {data}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "30px",
        background: "black",
        marginX: { mobile: "1px", laptop: "0.4px" },
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
  );
};
export default SessionBetSeperate;
