import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowDown, drawerBackground } from "../../assets";

const SideBar = ({ mobileShow }) => {
  const [showSideBarMobile, setShowSideBarMobile] = useState(false);
  const location = useLocation();

  const [selected, setSelected] = useState("All Sports");
  const data = [
    {
      title: "All Sports",
      data: [
        "In Play",
        "Live Casino",
        "Live Card",
        "Cricket",
        "Soccer",
        "Tennis",
        "Football",
        "Ice Hockey",
        "Volleyball",
        "Politics",
        "Basketball",
        "Table",
        "Tennis",
        "Darts",
      ],
    },
    {
      title: "Others",
      data: [],
    },
  ];
  useEffect(() => {
    if (
      location?.pathname.includes("change_password") ||
      location?.pathname?.includes("change_button_value") ||
      location?.pathname?.includes("account_statement") ||
      location?.pathname?.includes("profit_loss") ||
      location?.pathname?.includes("bet_history")
    ) {
      setShowSideBarMobile(true);
    } else {
      setShowSideBarMobile(false);
    }
  }, [location]);
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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "5vh",
          minHeight: "20px",
          width: { mobile: "100%", laptop: "60%" },
        }}
      >
        <Typography
          variant="menuListItem"
          sx={{
            fontSize: {
              laptop: showSideBarMobile ? "15px" : "13px",
              mobile: "20px",
            },
            marginLeft: { mobile: "35px", laptop: "0px" }, 
            cursor:'pointer'
          }}
        >
          {item}
        </Typography>
      </Box>
    );
  };

  const RenderList = ({ data }) => {
    return data.map((item,idx) => {
      return <ListItem key={idx} item={item} />;
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
      {data?.map((i,idx) => {
        return <RenderItem key={idx} i={i} />;
      })}
    </Box>
  );
};

export default SideBar;
