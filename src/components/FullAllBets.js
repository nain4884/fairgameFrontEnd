import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHECK } from "../admin/assets";
import { ARROWUP } from "../assets";
import moment from "moment";
import { useTheme } from "@emotion/react";
const FullAllBets = ({
  tag,
  mode,
  IObets,
  setSelectedBetData,
  selectedBetData,
}) => {
  const [selectedData, setSelectedData] = useState([]);

  const [visible, setVisible] = useState(true);

  const [newData, setNewBets] = useState([]);
  useEffect(() => {
    if (IObets) {
      const uniqueData = {};
      IObets?.forEach((item) => {
        uniqueData[item.id] = item;
      });

      const result = Object.values(uniqueData);
      const body = result?.map((v) => {
        const values = {
          values: [
            {
              name: v?.user?.userName || v?.userName,
              color: ["no", "yes"].includes(v?.bet_type) ? "#FFF" : "black",
              background: ["no", "yes"].includes(v?.bet_type)
                ? "#319E5B"
                : "#F1C550",
              deleted_reason: v?.deleted_reason,
              id: v?.id,
            },
            {
              name:
                v?.marketType == "MANUAL BOOKMAKER"
                  ? "Quick Bookmaker"
                  : v?.marketType,
              color: ["no", "yes"].includes(v?.bet_type) ? "#FFF" : "black",
              background: ["no", "yes"].includes(v?.bet_type)
                ? "#319E5B"
                : "#F1C550",
              deleted_reason: v?.deleted_reason,
            },
            {
              name: v?.team_bet,
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleted_reason: v?.deleted_reason,
            },
            {
              name: v?.odds,
              color: "black",
              rate: v.rate
                ? v?.bet_type === "no"
                  ? v?.rate?.split("-")[0]
                  : v?.rate?.split("-")[1]
                : null,
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleted_reason: v?.deleted_reason,
            },
            {
              name: v?.bet_type,
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleted_reason: v?.deleted_reason,
            },
            {
              name: v?.amount || v?.stake,
              color: "black",
              background: ["yes", "back"].includes(v?.bet_type)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleted_reason: v?.deleted_reason,
            },
            {
              name: v?.myStack,
              color: "white",
              background: "#0B4F26",
              deleted_reason: v?.deleted_reason,
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
            },
          ],
        };
        return values;
      });

      setNewBets(body);
    }
  }, [IObets]);

  useEffect(() => {
    setSelectedData([]);
    if (setSelectedBetData !== undefined) {
      setSelectedBetData([]);
    }
  }, [mode]);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: "0",
        width: "100%",
        alignSelf: { mobile: "center", tablet: "center", laptop: "flex-start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
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
          }}
        >
          <div className="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: { laptop: "flex-end", mobile: "flex-end" },
            padding: { laptop: "0", mobile: "0" },
          }}
        >
          <Box
            sx={{
              width: "70px",
              height: "80%",
              background: "white",
              justifyContent: "center",
              borderRadius: "3px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginRight: "2px",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "8px", mobile: "8px" },
                fontWeight: "700",
                color: "#FF1111",
              }}
            >
              Total Bet
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#0B4F26",
                lineHeight: 1,
              }}
            >
              {IObets?.length || 0}
            </Typography>
          </Box>
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
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <HeaderRow mode={mode} tag={tag} />
          <div
            className="myScroll"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {newData?.map((i, k) => {
              const num = newData.length - k;
              const formattedNum = num < 10 ? "0" + num : num.toString();
              return (
                <div
                  key={k}
                  style={{ display: "flex", position: "relative" }}
                  onClick={(e) => {
                    let x = [...selectedData];
                    if (x.includes(k)) {
                      const updatedSelectedBetData = selectedBetData.filter(
                        (id) => id !== i?.values[0].id
                      );
                      setSelectedBetData(updatedSelectedBetData);
                      x.splice(x.indexOf(k), 1);
                      setSelectedData([...x]);
                      e.stopPropagation();
                    } else {
                      if (!i?.values[0].deleted_reason) {
                        setSelectedBetData(i?.values[0].id);
                        setSelectedBetData([
                          ...selectedBetData,
                          i?.values[0].id,
                        ]);
                        x.push(k);
                        setSelectedData([...x]);
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: mode ? "7%" : "5.3%",
                      border: "1px solid white",
                      background: "black",
                      height: "35px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {!mode && (
                      <Typography
                        sx={{
                          fontSize: !tag
                            ? { mobile: "8px", laptop: "11px" }
                            : "13px",
                          fontWeight: tag ? "bold" : "600",
                          color: "white",
                        }}
                      >
                        {formattedNum}
                      </Typography>
                    )}
                    {mode && !selectedData.includes(k) && (
                      <Box
                        sx={{
                          width: "15px",
                          height: "15px",
                          border: "1px solid white",
                          borderRadius: "10px",
                        }}
                      ></Box>
                    )}
                    {mode && selectedData.includes(k) && (
                      <Box sx={{}}>
                        <img
                          src={CHECK}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Box>
                    )}
                  </Box>
                  <Row index={k} values={i.values} />
                  {/* i?.values[0].id */}
                  {i?.values[0]?.deleted_reason && (
                    <Box
                      sx={{
                        background: "rgba(0,0,0,0.5)",
                        width: "100%",
                        // height: "350px",
                        position: "absolute",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ flex: 1, display: "flex" }}>
                        <Box sx={{ width: "34%", height: "35px" }}></Box>
                        <Box
                          sx={{
                            width: "66%",
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}
                        >
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
                        </Box>
                      </Box>
                    </Box>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </Box>
  );
};
const HeaderRow = ({ tag, mode }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box
        sx={{
          width: mode ? "8%" : "6%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          No
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: tag ? "flex-start" : "center",
          paddingLeft: tag ? "5px" : 0,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          User
        </Typography>
      </Box>
      <Box
        sx={{
          width: "20%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: tag ? "flex-start" : "center",
          paddingLeft: tag ? "5px" : 0,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Market
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Favourite
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Odds
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Stake
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          My Stake
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Time
        </Typography>
      </Box>
    </Box>
  );
};
const SmallBox = ({ item, k }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  // alert(JSON.stringify(item))
  return (
    <Box
      key={k}
      sx={{
        width: "10%",
        border: "1px solid white",
        background: item?.background,
        height: "35px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textTransform: "capitalize",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "10px" : ".7vw",
          fontWeight: "600",
          lineHeight: 1,
          color: item?.color,
        }}
      >
        {item?.name}
      </Typography>
      <Typography
        sx={{ fontSize: "9px", fontWeight: "600", color: item?.color }}
      >
        {item?.rate && item?.rate}
      </Typography>
    </Box>
  );
};
const LargeBox = ({ item, k }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      key={k}
      sx={{
        width: k == 1 ? "20%" : "15%",
        border: "1px solid white",
        background: item?.background,
        height: "35px",
        justifyContent: "center",
        alignItems: k == 1 || k == 0 ? "center" : "center",
        paddingLeft:
          k == 1 || k == 0 ? { mobile: "0", tablet: "5px", laptop: "5px" } : 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "8px" : ".6vw",
          fontWeight: "600",
          color: item?.color,
          textTransform: "capitalize",
          wordWrap: "break-word",
          textAlign: "center",
          lineHeight: 1,
          whiteSpace: { mobile: "nowrap", laptop: "inherit" },
          textOverflow: "ellipsis",
          maxWidth: { mobile: "43px", laptop: "initial" },
        }}
      >
        {item?.name}
      </Typography>
      {item?.time && (
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".6vw",
            fontWeight: "600",
            color: item?.color,
          }}
        >
          {item?.date}
        </Typography>
      )}
    </Box>
  );
};
const Row = ({ values, index }) => {
  return (
    <Box key={index} sx={{ width: "100%", display: "flex" }}>
      {values.map((item, k) => {
        if (!item?.small) {
          return <LargeBox k={k} item={item} />;
        } else {
          return <SmallBox k={k} item={item} />;
        }
      })}
    </Box>
  );
};
export default FullAllBets;
