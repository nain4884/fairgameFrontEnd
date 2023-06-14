import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../newStore";

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
  return (
    <Box
      sx={{
        display: "flex",
        width: width + "%",
        height: "40px",
        paddingX: "3%",
        background: color,
        borderRadius: "3px",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1px",
        alignSelf: "flex-end",
        marginRight: "3px",
      }}
    >
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
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

      {selected && under && <MinusBox />}
      {!selected && under && <PlusBox />}
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
  const path = window.location.pathname.split("/")[1]
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
      const finalData = [{
        title: "Cricket",
        values: data.map(item => ({
          title: new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          values: [
            {
              title: item.titles[0],
              values: [
                {
                  title: "Match Odds",
                  values: false,
                  matchId: item.ids[0],
                },
              ],
            },
          ],
        })),
      }, {
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
      },];
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
      sx={[
        {
          marginTop: { mobile: "2.5vh", laptop: 0, tablet: 0 },
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        (theme) => ({
          backgroundImage: `${theme.palette.primary.mainGradient}`,
        }),
      ]}
    // headerGradient
    >
      <Box
        sx={[
          {
            width: "98%",
            marginTop: "3px",
            paddingX: "3%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            height: "40px",
            borderRadius: "2px",
          },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradientAdmin}`,
          }),
        ]}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "white",
            fontWeight: "600",
            marginLeft: "1.5%",
          }}
        >
          All Sports
        </Typography>
        <MinusBox />
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
