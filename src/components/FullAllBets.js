import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHECK } from "../admin/assets";
import moment from "moment";
import { useTheme } from "@emotion/react";
const data = [
  {
    values: [
      {
        name: "John Doe",
        color: "black",
        background: "#F1C550",
      },
      {
        name: "BOOKMAKER",
        color: "black",
        background: "#F1C550",
      },
      {
        name: "INDIA",
        color: "black",
        background: "#B3E0FF",
      },
      {
        name: "1000",
        color: "black",
        background: "#B3E0FF",
        small: true,
      },
      {
        name: "Back",
        color: "black",
        background: "#B3E0FF",
        small: true,
      },
      {
        name: "100,000,000",
        color: "black",
        background: "#B3E0FF",
      },
      {
        name: "10,000,000",
        color: "white",
        background: "#0B4F26",
      },
      {
        name: "03:23 AM",
        color: "black",
        background: "#B3E0FF",
        time: true,
        date: "02-11-2022",
      },
    ],
  },
];
const FullAllBets = ({ tag, mode, IObets }) => {
  //   const [selected, setSelected] = useState([...data, ...data]);
  const [selectedData, setSelectedData] = useState([]);

  const [newData, setNewBets] = useState([]);
  useEffect(() => {
    if (IObets) {
      const body = IObets?.map((v) => {
        const values = {
          values: [
            {
              name: v?.user?.userName || v?.userName,
              color: "black",
              background: "#F1C550",
              deleted_reason: v?.deleted_reason,
            },
            {
              name: v?.marketType,
              color: "black",
              background: "#F1C550",
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
              rate:v.rate ?   
              v?.bet_type === "no" ? v?.rate?.split("-")[0] :
               v?.rate?.split("-")[1] : null
                ,
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
  }, [mode]);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: { mobile: "100%", laptop: "100%" },
        marginY: { laptop: ".25vh" },
        padding: 0.2,
        background: "white",
      }}
    >
      <Box
        // onClick={(e) => {
        //   e.stopPropagation();
        //   navigate("/admin/total_bets");
        // }}
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
          All Bets
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
            Total Bet
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "700", color: "#0B4F26" }}
          >
            {IObets?.length || 0}
          </Typography>
        </Box>
      </Box>
      <HeaderRow mode={mode} tag={tag} />
      <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
        {newData?.map((i, k) => {
          const num = k + 1;
          return (
            <div
              key={k}
              style={{ display: "flex", position: "relative" }}
              onClick={(e) => {
                let x = [...selectedData];
                if (x.includes(k)) {
                  x.splice(x.indexOf(k), 1);
                  setSelectedData([...x]);
                  e.stopPropagation();
                } else {
                  x.push(k);
                  setSelectedData([...x]);
                }
              }}
            >
              <Box
                sx={{
                  width: mode ? "7%" : "5.3%",
                  border: "1px solid white",
                  background: "black",
                  height: "50px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {!mode && (
                  <Typography
                    sx={{
                      fontSize: !tag ? "10px" : "13px",
                      fontWeight: tag ? "bold" : "600",
                      color: "white",
                    }}
                  >
                    {num < 10 ? "0" + num : num.toString()}
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
              {i?.deleted_reason && (
                <Box
                  sx={{
                    background: "rgba(0,0,0,0.5)",
                    width: "100%",
                    height: "50px",
                    position: "absolute",
                    display: "flex",
                  }}
                >
                  <Box sx={{ flex: 1, display: "flex" }}>
                    <Box sx={{ width: "34%", height: "50px" }}></Box>
                    <Box
                      sx={{
                        width: "66%",
                        height: "50px",
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
                        Bet <span style={{ color: "#e41b23" }}>deleted</span>{" "}
                        due to {i?.deleted_reason}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </div>
          );
        })}
      </div>
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
            fontSize: matchesMobile ? "10px" : ".8vw",
            fontWeight: "500",
            color: "white",
            lineHeight: 1,
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
            fontSize: matchesMobile ? "10px" : ".8vw",
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
  console.log(item, "item");
  return (
    <Box
      key={k}
      sx={{
        width: "10%",
        border: "1px solid white",
        background: item?.background,
        height: "50px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "12px" : ".8vw",
          fontWeight: "600",
          color: item?.color,
        }}
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
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      key={k}
      sx={{
        width: k == 1 ? "20%" : "15%",
        border: "1px solid white",
        background: item?.background,
        height: "50px",
        justifyContent: "center",
        alignItems: k == 1 || k == 0 ? "flex-start" : "center",
        paddingLeft: k == 1 || k == 0 ? "5px" : 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "8px" : ".8vw",
          fontWeight: "600",
          color: item?.color,
          wordWrap: "break-word",
          textAlign: "center",
        }}
      >
        {item?.name}
      </Typography>
      {item?.time && (
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".8vw",
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
