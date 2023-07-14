import { Drawer, TextField, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, drawerBackground } from "../../assets";

const SideBar = ({ mobileShow, }) => {
  const [showSideBarMobile, setShowSideBarMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const [selected, setSelected] = useState("All Sports");
  const data = [
    {
      title: "All Sports",
      data: [
        { title: "In Play", url: "/inplay", activeTab: "INPLAY" },
        { title: "Cricket", url: "/matches", activeTab: "CRICKET" },
        { title: "Live Casino", url: "/comingsoon", activeTab: "LIVE CASINO" },
        { title: "Live Card", url: "/comingsoon", activeTab: "LIVE CARD" },
        { title: "soccer", url: "/comingsoon", activeTab: "SOCCER" },
        { title: "Tennis", url: "/comingsoon", activeTab: "TENNIS" },
        { title: "Ice Hockey", url: "/comingsoon", activeTab: "ICE HOCKEY" },
        { title: "Volleyball", url: "/comingsoon" },
        { title: "Politics", url: "/comingsoon" },
        { title: "Table", url: "/comingsoon", },
        { title: "Darts", url: "/comingsoon" },
        { title: "Snooker", url: "/comingsoon", activeTab: "SNOOKER" },
        { title: "Golf", url: "/comingsoon", activeTab: "GOLF" },
        { title: "Chess", url: "/comingsoon", activeTab: "CHESS" },
        { title: "Basketball", url: "/comingsoon", activeTab: "BASKETBALL" },
      ],
    },
    {
      title: "Others",
      data: [],
    },
  ];
  const ListHeader = ({ title }) => {
    return (
      <Box
        onClick={() => {
          if (selected == title) {
            setSelected("");
          } else {
            setSelected(title);
          }
        }}
        sx={[
          {
            width: "100%",
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
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ display: "flex", flex: 0.3 }}></Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              height: "100%",
              justifyContent: { mobile: "flex-start", laptop: "center" },
              alignItems: "center",
            }}
          >
            <Typography
              variant="menuListHeader"
              sx={{
                fontSize: {
                  laptop: showSideBarMobile ? "18px" : "16px",
                  mobile: "20px",
                },
                fontWeight: { mobile: "500", laptop: "600" },
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
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
                transform:
                  selected == title ? "rotate(0deg)" : "rotate(180deg)",
              }}
              src={ArrowDown}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  const ListItem = ({ item }) => {
    const theme = useTheme();
    return (
      <Box
        onClick={() => {
          navigate(item?.url, { state: { activeTab: item?.activeTab } })
          // handleDrawerToggle()
        }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "5vh",
          minHeight: "20px",
          width: { mobile: "100%", laptop: "100%" },
          "&:hover": {
            borderBottomRightRadius: ".5vh",
            borderTopRightRadius: ".5vh",
            cursor: "pointer",
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { mobile: "5%", laptop: "40%", tablet: "8%" },
          }}
        ></Box>
        <Typography
          variant="menuListItem"
          sx={{
            fontSize: {
              laptop: showSideBarMobile ? "15px" : "13px",
              mobile: "20px",
            },
            marginLeft: { mobile: "35px", laptop: "0px" },
            cursor: "pointer",
          }}
        >
          {item.title}
        </Typography>
      </Box>
    );
  };

  const RenderList = ({ data }) => {
    return data.map((item, idx) => {
      return (
        <ListItem
          key={idx}
          item={item}
          setShowSideBarMobile={setShowSideBarMobile}
        />
      );
    });
  };
  const RenderItem = ({ i }) => {
    return (
      <>
        <ListHeader title={i.title} />
        {selected == i.title && <RenderList data={i.data} />}
      </>
    );
  };

  return (
    <Box
      sx={[
        {
          width: {
            laptop: showSideBarMobile ? "100%" : "18%",
            mobile: mobileShow ? "100%" : "0%",
          },
          minHeight: "500px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          alignItems: { mobile: "flex-start", laptop: "flex-end" },
          backgroundImage: `url(${drawerBackground})`,
        },
      ]}
    >
      {data?.map((i, idx) => {
        return <RenderItem key={idx} i={i} />;
      })}
    </Box>
  );
};

export default SideBar;
