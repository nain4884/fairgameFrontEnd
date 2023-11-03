import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminEventComponent = ({ data, selected, setAnchor, setAnchor1 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      onClick={(e) => {
        const pathname = location.pathname.split("/")[1];
        const url = data?.url && `/${pathname}/${data?.url}`;
        if (
          selected === data?.title &&
          !["Reports", "wallet"].includes(data?.title)
        ) {
          const href = `/${pathname}/nav`;
          navigate(href, {
            state: {
              activeTab: "",
            },
          });
        } else {
          if (data.url) {
            if (data?.title === "Reports") {
              setAnchor(e);
            } else if (data?.title === "wallet") {
              setAnchor1(e);
            }
            navigate(url, {
              state: {
                activeTab: data?.title,
              },
            });
          }
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
        alt="data img"
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
    </Box>
  );
};

export default memo(AdminEventComponent);
