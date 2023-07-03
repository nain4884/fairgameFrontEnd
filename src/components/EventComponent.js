import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const EventComponent = ({ data, selected, setAnchor }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={(e) => {
        if (selected === data.title) {
          navigate(`/matches`, { state: { activeTab: "EmptyComponent" } });
        } else {
          console.log("sddd");
          if (data?.url) {
            if (data.title === "MY ACCOUNT") {
              setAnchor(e);
            }
            navigate(`/${data?.url}`, { state: { activeTab: data?.title } });
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
          marginBottom: "1vh",
          borderRadius: ".6vh",
          display: "flex",
          flexDirection: "column",
          border: "2px solid white",
          alignItems: "center",
          justifyContent: { laptop: "center", mobile: "center" },
          background: "white",
          cursor: "pointer",
        },
        selected === data.title
          ? { background: "#F8C851" }
          : { background: "white" },
      ]}
    >
      <img
        src={data.image}
        style={{ width: "35px", height: "35px", alignSelf: "center" }}
      />
      <Typography
        noWrap
        sx={{
          fontSize: { laptop: "11px", mobile: "11px" },
          fontWeight: { mobile: "500", tablet: "500" },
          marginTop: { mobile: "5px", laptop: ".8vh" },
          color: "black",
        }}
      >
        {data.title}
      </Typography>
    </Box>
  );
};

export default memo(EventComponent);
