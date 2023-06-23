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
              Session Bets &#40;{allBetsData?.length || 0}&#41;
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
              // margin: { mobile: "1px", laptop: "0.5px" },
              height: "32px",
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
          {allBetsData?.map((i, k) => {
            const num = allBetsData.length - k;
            const formattedNum = num < 10 ? "0" + num : num.toString();
            return (
              <Box
                key={k}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  gap: '1px'
                }}
              >
                <Box
                  sx={{
                    height: "32px",
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
                    sx={{ color: "white", fontSize: "10px", fontWeight: "500" }}
                  >
                    {formattedNum}
                  </Typography>
                </Box>
                <RowComponent header={false} data={i} />
                {betHistory && i?.deleted_reason && (
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
                      height: "32px",
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
                      height: "42px",
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
                      margin: { mobile: "1px", laptop: "1px" },
                      display: "flex",
                      background: i.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
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
                      src={i.myProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                    />
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
                      Bet <span style={{ color: "#e41b23" }}>Deleted</span> Due{" "}
                      {"\n"}
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

      {/* <Box
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
        {allBetsData?.map((i, k) => {
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
                  height: "40px",
                  margin: { mobile: "1px", laptop: "1px" },
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
              {betHistory && i?.deleted_reason && (
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
                    height: "42px",
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
                    margin: { mobile: "1px", laptop: "1px" },
                    display: "flex",
                    background: i.myProfitLoss > 0 ? "#10DC61" : "#E32A2A",
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
                    src={i.myProfitLoss > 0 ? ARROWUP : ARROWDOWN}
                  />
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
                    Bet <span style={{ color: "#e41b23" }}>Deleted</span> Due{" "}
                    {"\n"}
                    {i?.deleted_reason}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box> */}
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
        height: header ? "32px" : "32px",
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
          height: "32px",
          flexDirection: "column",
          background: "#F8C851",
          // marginX: { mobile: "1px", laptop: "1px" },
          display: "flex",
          justifyContent: "center",
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
          height: "32px",
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
            fontSize: { mobile: "11px", laptop: "13px" ,textTransform: 'capitalize'},
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
        height: "32px",
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
        height: "32px",
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
  );
};
export default SessionBetSeperate;
