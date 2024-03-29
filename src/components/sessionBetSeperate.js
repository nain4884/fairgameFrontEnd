import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DELETE, MyBet, ARROWUP } from "../assets";
import userAxios from "../axios/userAxios";
import {
  ARROWDOWN,
  // ARROWUP
} from "../expert/assets";
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
const SessionBetSeperate = ({
  profit,
  mark,
  mark2,
  allBetsData,
  betHistory,
  isArrow,
}) => {
  //  {console.warn("allBetsData qq:",allBetsData)}
  console.log("betHistory", betHistory);
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
            borderRadius: "2px",
            background: "white",
            padding: "1px",
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
              Session Bets: {allBetsData?.length < 10 ? 0 : ""}
              {allBetsData?.length || 0}
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
          </Box>
        </Box>
        {visible && (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
              <Box
                sx={{
                  // margin: { mobile: "1px", laptop: "0.5px" },
                  height: "25px",
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
                data={["Matched Bet", "Username", "Odds", "Yes/No", "Stake"]}
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
                    // margin: { mobile: "1px", laptop: "1px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { mobile: "10px", laptop: ".7vw" },
                      color: "white",
                    }}
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
                console.log(allBetsData, "allBetsData");
                const num = allBetsData.length - k;
                const formattedNum = num < 10 ? "0" + num : num.toString();
                return (
                  <Box
                    key={k}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                      gap: "1px",
                    }}
                  >
                    <Box
                      sx={{
                        height: "40px",
                        // margin: { mobile: "1px", laptop: "1px" },
                        marginBottom: { mobile: "1px", laptop: "1px" },
                        width: "30px",
                        display: "flex",
                        background: "black",
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
                    {i?.deleted_reason && (
                      <Box
                        sx={{
                          width: {
                            mobile: profit ? "100%" : "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            laptop: profit ? "100 % " : "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.6)",
                          height: "45px",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "35%" : "35%" }}></Box>
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
                          height: "45px",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "35%" : "35%" }}></Box>
                        <Box
                          sx={{
                            width: mark2 ? "65%" : "65%",
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
                              Bet{" "}
                              <span style={{ color: "#e41b23" }}>deleted</span>{" "}
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
                          // margin: { mobile: "1px", laptop: "1px", my: 0 },
                          background:
                            i.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: "10px",
                            height: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { mobile: "11px", laptop: "14px" },
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
                            {/* {Number(i.myProfitLoss).toFixed(2)} */}
                          </Typography>
                          {!isArrow && (
                            <StyledImage
                              sx={{
                                width: { mobile: "12px", laptop: "15px" },
                                height: { mobile: "12px", laptop: "15px" },
                              }}
                              src={i.myProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                            />
                          )}
                        </Box>
                      </Box>
                    )}
                    {profit && i?.deleted_reason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "30%",
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
                          Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                          Due {"\n"}
                          {i?.deleted_reason}
                        </Typography>
                      </Box>
                    )}
                    {i?.deleted_reason && betHistory && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "30%",
                          margin: { mobile: "1px", laptop: "1px" },
                          display: "flex",
                          // background: "black",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingX: "2px",
                          zIndex: 999,
                          position: "absolute",
                          right: 0,
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
                          Due {"\n"}
                          {i?.deleted_reason}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Box>
    </>
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
    if (header) {
      return "black";
    } else if (data?.bet_type === "back" || data?.bet_type == "yes") {
      // return "#00C0F9";
      return "#CEEBFF";
    } else if (data?.bet_type === "lay" || data?.bet_type == "no") {
      // return "#FF9292";
      return "#F2CBCB";
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
        gap: "1px",
        // marginTop: "1px"
        marginBottom: { mobile: "1px", laptop: "1px" },
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
            data={data?.username || data?.userName || data?.user?.userName}
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            isPercent={true}
            rate={formatNumber(
              data?.bet_type === "no" ||
              data?.betType === "no"
                ? data?.rate?.split("-")[0]
                : data?.rate?.split("-")[1]
            )}
          />
          <SingleBox
            color={getColor()}
            data={data?.betType || data?.bet_type}
            header={header}
          />
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
          <SingleBox color={getColor()} data={data[4]} header={header} />
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
          // marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          // margin: "1px"
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { mobile: "9px", laptop: "11px" },
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
            fontSize: { laptop: "12px", mobile: "10px" },
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
          marginX: { mobile: "1px", laptop: "1px" },
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
          // marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {
              mobile: "11px",
              laptop: "13px",
              textTransform: "capitalize",
            },
            color: "black",
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
        height: "25px",
        background: "#319E5B",
        // marginX: { mobile: "1px", laptop: "1px" },
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
        height: "25px",
        background: "#319E5B",
        marginX: { mobile: "0px", laptop: "0px" },
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
