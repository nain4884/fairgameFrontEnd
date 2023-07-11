import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DELETE, MyBet } from "../assets";
import userAxios from "../axios/userAxios";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import StyledImage from "./StyledImage";
import { useSelector } from "react-redux";
import { formatNumber } from "./helper/helper";
const SessionBetHistory = ({ profit, betData, mark, mark2, betHistory }) => {
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
            background: "#F8C851"
          },
          // (theme) => ({
          //   backgroundImage: `${theme.palette.primary.headerGradient}`,
          // }),
        ]}
      >
        <Typography
          sx={{ fontWeight: "12px", color: "black", fontWeight: "700" }}
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
            {betData?.length || 0}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            margin: { mobile: "0.5px", laptop: "0.5px" },
            // my: "0px !important",
            height: "30px",
            width: "4%",
            display: "flex",
            background: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "400", fontSize: { laptop: "11px", mobile: "8px" }, color: "white" }}
          >
            {"No"}
          </Typography>
        </Box>
        <RowComponent
          header={true}
          data={["Username", "Matched Bet", "Odds", "Yes/No", "Stake"]}
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
              margin: { mobile: "0.5px", laptop: "1px" },
              marginY: '0 !important'
            }}
          >
            <Typography
              sx={{ fontWeight: "400", fontSize: { mobile: "8px", laptop: "12px" }, color: "white" }}
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
        {/* {betData?.map((i, k) => { */}
        {betData
          ?.filter((v) => v.sessionBet === true)
          ?.map((i, k) => {
            const num = betData.length - k;
            const formattedNum = num < 10 ? "0" + num : num.toString();
            return (
              <Box
                key={k}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: {mobile: "35px", laptop: "40px"},
                    margin: { mobile: "0.5px", laptop: "0.5px" },
                    // mb: 0,
                    width: "4%",
                    display: "flex",
                    background: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontSize: "11px", fontWeight: "500" }}
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
                      height: "42px",
                      position: "absolute",
                    }}
                  >
                    <Box sx={{ width: mark2 ? "20%" : "35%" }}></Box>
                  </Box>
                )}

                {profit && !i?.deleted_reason && (
                  <Box
                    sx={{
                      height: {mobile: "35px", laptop: "40px"},
                      width: "20%",
                      margin: { mobile: "0.5px", laptop: "1px" },
                      mb: 0,
                      display: "flex",
                      background: i.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
                      // background: k % 2 == 0 ? "#E32A2A" : "#10DC61",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingX: { laptop: "10px", mobile: "0" }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { mobile: "9px", laptop: "12px" },
                        color: "white",
                        fontWeight: "700",
                      }}
                    >
                      {Number(i.myProfitLoss) >= 0
                        ? <><span style={{ visibility: "hidden" }}>-</span>{Number(i.myProfitLoss).toFixed(2)}</>
                        : Number(i.myProfitLoss).toFixed(2)}
                    </Typography>
                    <StyledImage
                      sx={{
                        width: { mobile: "12px", laptop: "15px" },
                        height: { laptop: "7px", mobile: "0px" },
                      }}
                      src={
                        Number(i.myProfitLoss).toFixed(2) > 0
                          ? ARROWUP
                          : ARROWDOWN
                      }
                    // src={k % 2 == 0 ? ARROWDOWN : ARROWUP}
                    />
                  </Box>
                )}
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
      </Box>
    </Box>
  );
};
// value2 = { formatNumber(newData?.rate_percent?.split("-")[0])}
const RowComponent = ({ header, data, boxWidthHeader }) => {
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
    } else if (data?.betType === "back" || data?.betType == "yes") {
      // return "#00C0F9";
      return "rgb(179, 224, 255)";
    } else if (data?.betType === "lay" || data?.betType == "no") {
      // return "#FF9292";
      return "rgb(255, 146, 146)";
    }
  };
  return (
    <Box
      sx={{
        width: "81%",
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
            color={getColor()}
            data={data?.username}
            first={true}
            header={header}
            boxWidth="25%"

          />
          <SingleBox
            color={getColor}
            data={data?.marketType}
            first={true}
            header={header}
            time={getTime(data.createAt)}
            boxWidth="30%"
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            isPercent={true}
            rate={formatNumber(
              data?.betType == "no"
                ? data?.rate?.split("-")[0]
                : data?.rate?.split("-")[1]
            )}
            boxWidth="11%"
          />
          <SingleBox
            boxWidth="11%"
            color={getColor()} data={data?.betType} header={header} />
          <SingleBox
            color={getColor()}
            data={data?.stack || data?.stake || data?.amount}
            header={header}
            boxWidth="30%"
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
            boxWidthHeader="25%"
          />
          <SingleBox
            color={getColor}
            data={data[1]}
            first={true}
            header={header}
            boxWidthHeader="30%"
          />
          <SingleBox color={getColor()} data={data[2]} header={header} boxWidthHeader="11%" />
          <SingleBox color={getColor()} data={data[3]} header={header} boxWidthHeader="11%" />
          <SingleBox color={getColor()} data={data[4]} header={header} boxWidthHeader="30%" />
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
  boxWidth,
  boxWidthHeader
}) => {
  // console.log(data, "dataaaa")
  return !header ? (
    first ? (
      <Box
        sx={{
          // width: "100%",
          width: boxWidth ? boxWidth : "100%",
          height: {mobile: "35px", laptop: "40px"},
          flexDirection: "column",
          background: "#F8C851",
          marginX: { mobile: "0.5px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { mobile: "8px", laptop: "9px" },
            color: "black",
            textAlign: "center",

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
            fontWeight: "600",
            fontSize: { laptop: "11px", mobile: "8px" },
            color: "black",
            textAlign: "center",
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
          marginX: { mobile: "0.5px", laptop: "1px" },
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
          // width: "15%",
          width: boxWidth,
          height:{mobile: "35px", laptop: "40px"},
          background: color,
          marginX: { mobile: "0.5px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { mobile: "10px", laptop: "12px" },
            color: "black",
            textTransform: "capitalize"
          }}
        >
          {data}
        </Typography>
        {isPercent && (
          <Typography
            sx={{
              fontSize: "9px",
              marginTop: -0.4,
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "600",
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
        width: boxWidthHeader ? boxWidthHeader : "100%",
        height: "30px",
        background: "#000",
        marginX: { mobile: "0.5px", laptop: "1px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: { laptop: "12px", mobile: "8px" },
          color: "white",
          wordWrap: "break-word",
        }}
      >
        {data}
      </Typography>
    </Box>
  ) : (
    <>
      <Box
        sx={{
          // width:  data?.betType === "Stake" ? "10%" : "25%",
          width: boxWidthHeader ? boxWidthHeader : "100%",
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
            fontSize: { laptop: "12px", mobile: "8px" },
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {data}
        </Typography>
      </Box>

    </>
  );
};
export default SessionBetHistory;
