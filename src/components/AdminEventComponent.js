import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StyledImage from "./StyledImage";
import { DropDown } from "../admin/assets";

const AdminEventComponent = ({
  data,
  selected,
  setAnchor,
  setAnchor1,
  setShow,
  show,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      onClick={(e) => {
        const pathname = location.pathname.split("/")[1];
        const url = data?.url && `/${pathname}/${data?.url}`;
        if (selected === data?.title) {
          const href = `/${pathname}/list_of_clients`;
          // setShow(false);
          navigate(href, {
            state: {
              activeTab: "Client list",
            },
          });
        } else {
          if (data.url) {
            // setShow(false);
            navigate(url, {
              state: {
                activeTab: data?.title,
              },
            });
          } else if (data?.title === "Reports") {
            setAnchor(e);
          } else if (data?.title === "wallet") {
            setAnchor1(e);
          } 
          // else if (data?.title === "My Account") {
          //   setShow((prev) => !prev);
          // }
        }
      }}
      sx={[
        {
          width: "60px",
          minHeight: 80,
          minWidth: 80,
          height: "60px",
          marginX: ".5vw",
          borderRadius: ".6vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { laptop: "center", mobile: "center" },
          background: "white",
          cursor: "pointer",
        },
        selected === data.title
          ? { background: "#F8C851" }
          : { background: "white" },
        selected === data.title
          ? { border: "2px solid white" }
          : { border: "2px solid white" },
      ]}
    >
      <img
        src={data.image}
        style={{ width: "40px", height: "40px", alignSelf: "center" }}
      />
      <Typography
        noWrap
        sx={{
          marginTop: { mobile: "5px", laptop: ".8vh" },
          textTransform: "uppercase",
          fontSize: { laptop: "10px", mobile: "10px" },
          fontWeight: { mobile: "500", tablet: "500" },
        }}
      >
        {data.title}
      </Typography>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginTop: { mobile: "5px", laptop: ".8vh" },
        }}
      > */}

      {/* {["wallet", "Reports", "Details"].includes(data?.title) && (
          <StyledImage
            src={DropDown}
            sx={{
              height: "18px",
              width: "18px",

              transform: "rotate(180deg);",
            }}
          />
        )} */}
      {/* </Box> */}
    </Box>
  );
};

export default memo(AdminEventComponent);
