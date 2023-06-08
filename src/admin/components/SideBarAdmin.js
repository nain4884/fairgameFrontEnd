import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const colors = ["#F8C851", "#FFDA7D", "#FFE7AD", "#FFF1CF", "#FFF8E6"];
const datas = [
  {
    title: "Cricket",
    values: [
      {
        title: "T20 World Cup",
        sub: "(Tournamnet name)",
        values: [
          {
            title: "01, November, 2022",
            values: [
              {
                title: "India vs Bangladesh",
                values: [
                  {
                    title: "Match Odds",
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
                    title: "Match Odds",
                    values: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Asia Cup",
        sub: " (Tournamnet name)",
        values: [],
      },
      {
        title: "Women world Cup",
        sub: " (Tournamnet name)",
        values: [],
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
            <RenderValues
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
  const navigate = useNavigate();
  return (
    <Box
      onClick={(event) => {
        navigate("/admin/match");
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
const RenderEvents = ({ i, handleDrawerToggle, k }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Box
      key={k}
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
      key={k}
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

const SideBarAdmin = ({ handleDrawerToggle, key }) => {
  return (
    <Box
      key={key}
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
      {datas.map((i, k) => {
        return (
          <RenderGames handleDrawerToggle={handleDrawerToggle} i={i} k={k} />
        );
      })}
    </Box>
  );
};
export default SideBarAdmin;
