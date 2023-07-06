import { Box, Typography } from "@mui/material";
import moment from "moment/moment";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ARROWUP } from "../assets";

const AllBets = ({ tag, submit, allBetRates }) => {
  const navigate = useNavigate();

  const [newData, setNewBets] = useState([]);
  const [visibleImg, setVisibleImg] = useState(true);

  useEffect(() => {
    if (allBetRates) {
      const body = allBetRates?.map((v) => {
        const values = {
          values: [
            {
              name: v?.user?.userName,
              color: ["no", "yes"].includes(v?.bet_type) ? "#FFF" : "black",
              background: ["no", "yes"].includes(v?.bet_type)
                ? "#319E5B"
                : "#F1C550",
              deleted_reason: v?.deleted_reason,
              width: "12%"
            },
            {
              name: v?.marketType =="MANUAL BOOKMAKER" ? "Quick Bookmaker" : v?.marketType,
              color: ["no", "yes"].includes(v?.bet_type) ? "#FFF" : "black",
              background: ["no", "yes"].includes(v?.bet_type)
                ? "#319E5B"
                : "#F1C550",
              deleted_reason: v?.deleted_reason,
              width: "20%"
            },
            {
              name: v?.team_bet,
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleted_reason: v?.deleted_reason,
              width: "13%"

            },
            {
              name: v?.odds,
              color: "black",
              rate:
                (v?.bet_type === "no" && v?.rate?.split("-")[0]) ||
                (v?.bet_type === "yes" && v?.rate?.split("-")[1]),
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleted_reason: v?.deleted_reason,
              width: "7%"
            },
            {
              name: v?.bet_type,
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleted_reason: v?.deleted_reason,
              width: "7%"
            },
            {
              name: v?.amount,
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleted_reason: v?.deleted_reason,
              width: "17%"
            },
            {
              name: v?.myStack,
              color: "white",
              background: "#0B4F26",
              deleted_reason: v?.deleted_reason,
              width: "14%"
            },
            {
              name: moment(v?.createAt).format("LT"),
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              time: true,
              date: moment(v?.createAt).format("L"),
              deleted_reason: v?.deleted_reason,
              width: "10%"
            },
          ],
        };
        return values;
      });

      setNewBets(body);
    }
  }, [allBetRates]);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0",
        marginTop: submit ? "10px" : ".25vh",

        background: "white",
      }}
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
          // onClick={(e) => {
          //   e.stopPropagation();
          //   navigate("/admin/total_bets");
          // }}
          sx={[
            {
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            },
          ]}
        >
          <Typography
            sx={{
              fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            All Bets
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
            width: "100px",
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
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
              Total Bet
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "#0B4F26" }}
            >
              {newData?.length || 0}
            </Typography>
          </Box>
          <img
            onClick={() => {
              setVisibleImg(!visibleImg);
            }}
            src={ARROWUP}
            style={{
              transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: 'pointer'
            }}
          />
        </Box>
      </Box>

      {visibleImg && (
        <>
          <HeaderRow tag={tag} />
          <Box className="myScroll" sx={{ maxHeight: submit ? "200px" : "500px", overflowY: "auto" }}>
            {newData?.length > 0 &&
              newData?.map((i, k) => {
                const num = newData?.length - k;
                return (
                  <div style={{ display: "flex", position: "relative" }}>
                    <Box
                      sx={{
                        width: "4%",
                        border: "1px solid white",
                        background: "black",
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: !tag ? "10px" : "13px",
                          fontWeight: tag ? "bold" : "600",
                          color: "white",
                        }}
                      >
                        {num < 10 ? "0" + num : num.toString()}
                      </Typography>
                    </Box>
                    <Row index={k} values={i.values} />
                    {i?.values[0]?.deleted_reason && (
                      <Box
                        sx={{
                          background: "rgba(0,0,0,0.5)",
                          width: "100%",
                          height: "30px",
                          position: "absolute",
                          display: "flex",
                        }}
                      >
                        <Box sx={{ flex: 1, display: "flex" }}>
                          <Box sx={{ width: "34%", height: "30px" }}></Box>
                          <Box
                            sx={{
                              width: "66%",
                              height: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-end",
                            }}
                          >
                            {
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
                                due to {i?.values[0]?.deleted_reason}
                              </Typography>
                            }
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </div>
                );
              })}
          </Box>
        </>
      )}
    </Box>
  );
};
const HeaderRow = ({ tag }) => {
  return (
    <>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{
          width: "4%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "20px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>

          <Typography
            sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
          >
            No
          </Typography>


        </Box>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              width: "12%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: tag ? "flex-start" : "center",
              paddingLeft: tag ? "5px" : 0,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Username
            </Typography>
          </Box>
          <Box
            sx={{
              width: "20%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: tag ? "flex-start" : "center",
              paddingLeft: tag ? "5px" : 0,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Market
            </Typography>
          </Box>
          <Box
            sx={{
              width: "13%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Favourite
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Odds
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Type
            </Typography>
          </Box>
          <Box
            sx={{
              width: "17%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Stake
            </Typography>
          </Box>
          <Box
            sx={{
              width: "14%",
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              My Stake
            </Typography>
          </Box>
          <Box
            sx={{
              width: "10%",
              border: "1px solid white",
              borderRight: "0",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Time
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
const SmallBox = ({ item }) => {
  return (
    <Box
      sx={{
        width: item?.width ? item?.width : "50px",
        border: "1px solid white",
        background: item?.background,
        height: "30px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: item?.width ? item?.width : "auto"
      }}
    >
      <Typography
        sx={{ fontSize: "11px", fontWeight: "600", color: item?.color, textTransform: "capitalize" }}
      >
        {item?.name}
      </Typography>
      <Typography
        sx={{ fontSize: "8px", fontWeight: "600", color: item?.color }}
      >
        {item?.rate && item?.rate}
      </Typography>
    </Box>
  );
};
const LargeBox = ({ item, k }) => {
  return (
    <Box
      sx={{
        // width: k == 1 ? "24%" : "12%",

        border: "1px solid white",
        background: item?.background,
        height: "30px",
        justifyContent: "center",
        alignItems: k == 1 || k == 0 ? "flex-start" : "center",
        paddingLeft: k == 1 || k == 0 ? "5px" : 0,
        display: "flex",
        flexDirection: "column",
        width: item?.width ? item?.width : "50px"
      }}
    >
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: "600",
          color: item?.color,
          wordWrap: "break-word",
          textTransform: "capitalize",
          textAlign: "left",
          lineHeight: 1,
          px: "2px",
          textTransform: "capitalize",
          // whiteSpace: "nowrap",
          // textOverflow: "ellipsis",
          // maxWidth: "50px",
          overflow: "hidden",
          display: " -webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item?.name}
      </Typography>
      {item?.time && (
        <Typography
          sx={{ fontSize: "10px", fontWeight: "600", color: item?.color }}
        >
          {item?.date}
        </Typography>
      )}
    </Box>
  );
};
const Row = ({ values, index }) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      {/* <Box
          sx={{
            width: "40px",
            border: "1px solid white",
            background: "black",
            height: "30px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: !tag ? "10px" : "13px",
              fontWeight: tag ? "bold" : "600",
              color: "white",
            }}
          >
            {num < 10 ? "0" + num : num.toString()}
          </Typography>
        </Box> */}
      {values?.map((item, k) => {
        if (!item?.small) {
          return <LargeBox k={k} item={item} />;
        } else {
          return <SmallBox k={k} item={item} />;
        }
      })}
    </Box>
  );
};
export default memo(AllBets);
