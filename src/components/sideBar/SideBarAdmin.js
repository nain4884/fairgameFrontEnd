import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../newStore";
import { ArrowDown, drawerBackground } from "../../assets";
import { ARROWDROPDOWN } from "../../admin/assets";

const colors = ["#F8C851", "#FFDA7D", "#FFE7AD", "#FFF1CF", "#FFF8E6"];
const datas = [
  {
    title: "Cricket",
    values: [
      {
        title: "01, November, 2022",
        values: [
          {
            title: "India vs Bangladesh",
            values: [
              {
                title: "Match Odds 3",
                values: false,
              },
            ],
          },
        ],
      },
      {
        title: "01, November, 2022",
        values: [
          {
            title: "India vs Bangladesh",
            values: [
              {
                title: "Match Odds 3",
                values: false,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Football",
    values: [],
  },
  {
    title: "Tennis",
    values: [],
  },
  {
    title: "Ice hockey",
    values: [],
  },
];
const MinusBox = () => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "15px",
        height: "15px",
        background: "black",
      }}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", color: "#FDCB52" }}
      >
        -
      </Typography>
    </Box>
  );
};
const PlusBox = () => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "15px",
        height: "15px",
        background: "black",
      }}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", color: "#FDCB52" }}
      >
        +
      </Typography>
    </Box>
  );
};
const MainBox = ({ title, width, color, under, selected, sub }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: width + "%",
        height: "6vh",
        paddingX: "3%",
        background: color,
        justifyContent: "space-between",
        borderRadius: "3px",
        alignItems: "center",
        marginTop: "1px",
        alignSelf: "flex-end",
        marginBottom: ".5vh",
        marginRight: "3px",
        opacity: selected && under ? 1 : 0.8,
        "&:hover": {
          cursor: "pointer",
          background: color,
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",

          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flex: 0.1 }}></Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: "black",
            fontWeight: "600",
            marginLeft: "3%",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "8px",
            color: "black",
            fontWeight: "400",
            marginLeft: "2%",
          }}
        >
          {sub}
        </Typography>
      </Box>
      {under && <Box
        sx={{
          display: "flex",
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "15px",
            height: "8px",
            transform: selected && under ? "rotate(0deg)" : "rotate(180deg)",
          }}
          src={ARROWDROPDOWN}
        />
      </Box>}
      {/* {selected && under && <MinusBox />}
      {!selected && under && <PlusBox />} */}
    </Box>
  );
};
const RenderDates = ({ i, handleDrawerToggle }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();
        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[2]}
        width={80}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value, index) => {
          return (
            // <RenderValues
            //   handleDrawerToggle={handleDrawerToggle}
            //   i={value}
            //   k={index}
            // />
            <RenderBets
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              k={index}
            />
          );
        })}
    </Box>
  );
};
const RenderValues = ({ i, handleDrawerToggle }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();

        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[3]}
        width={75}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value, index) => {
          return (
            <RenderBets
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              k={index}
            />
          );
        })}
    </Box>
  );
};
const RenderBets = ({ i, handleDrawerToggle }) => {
  // alert(JSON.stringify(i))
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[1];
  return (
    <Box
      onClick={(event) => {
        navigate(`/${path}/match`, { state: { matchId: i.matchId } });
        // navigate("/expert/live", {
        //   state: {
        //     createSession: false,
        //     match: x,
        //     sessionEvent: element,
        //   },
        // });
        handleDrawerToggle();
        event.stopPropagation();
      }}
      sx={{
        width: "100%",
        display: "flex",
        marginLeft: "7%",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        under={false}
        color={colors[4]}
        width={70}
        title={i.title}
      />
    </Box>
  );
};
const RenderEvents = ({ i, handleDrawerToggle }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();

        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[0]}
        width={85}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value, index) => {
          return (
            <RenderDates
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              k={index}
            />
          );
        })}
    </Box>
  );
};

const RenderGames = ({ i, k, handleDrawerToggle }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();

        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[1]}
        width={90}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value, index) => {
          return (
            <RenderEvents
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              k={index}
            />
          );
        })}
    </Box>
  );
};

const SideBarAdmin = ({ handleDrawerToggle }) => {
  const { axios } = setRole();
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    getSingleMatch();
    // if (state?.id) {
    // alert(1)
    // getSingleMatch("10785cf8-4a64-40fa-9e16-e88f18071dea");
    // getAllBetsData("10785cf8-4a64-40fa-9e16-e88f18071dea");
    // }
  }, []);

  const getSingleMatch = async (val) => {
    try {
      // const { data } = await axios.get(`game-match/matchDetail/${val}`);
      const response = await axios.get(`/game-match/getMatchListByDate`);
      // alert(response?.data?.data.length)
      let data = response?.data?.data;
      const finalData = [
        {
          title: "Cricket",
          values: data.map((item) => ({
            title: new Date(item.start_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            values: item.titles.map((title, index) => ({
              title: title,
              values: [
                {
                  title: "Match Odds",
                  values: false,
                  matchId: item.ids[index],
                },
              ],
            })),
          })),
        },
        {
          title: "Football",
          values: [],
        },
        {
          title: "Tennis",
          values: [],
        },
        {
          title: "Ice hockey",
          values: [],
        },
      ];
      // console.log("data 112:", JSON.stringify(finalData))
      setMatchData(finalData);
      // setManualBookmakerData(matchOddsDataTemp);
      // // setCurrentMatch(newMatch);
      // setCurrentMatch({
      //   ...data.data,
      // });
    } catch (e) {
      console.log(e?.message, "message");
    }
  };

  return (
    <Box

    // headerGradient
    >
      <Box
        sx={[
          {
            width: "100%",
            marginTop: "5px",
            paddingX: "3%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "20px",
            height: "6vh",
            marginBottom: ".5vh",
            borderBottomRightRadius: ".5vh",
            borderTopRightRadius: ".5vh",
          },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flex: 0.1 }}></Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              height: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="menuListHeader"
              sx={{
                fontSize: "14px",
                marginLeft: "1.8%",
                fontWeight: { mobile: "500", laptop: "600" },
              }}
            >
              All Sports
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <img
              style={{
                width: "15px",
                height: "8px",
                // transform: "rotate(0deg)" : "rotate(180deg)",
              }}
              src={ARROWDROPDOWN}
            />
          </Box>
          {/* <MinusBox /> */}
        </Box>
      </Box>
      {matchData?.map((i, k) => {
        return (
          <RenderGames handleDrawerToggle={handleDrawerToggle} i={i} k={k} />
        );
      })}
    </Box>
  );
};
export default SideBarAdmin;
