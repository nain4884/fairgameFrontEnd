import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const EventComponent = ({ data, selected }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate("/matches", { state: { activeTab: data?.title } });
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
        style={{ width: "35px", height: "35px", alignSelf: "center" }}
      />
      <Typography
        noWrap
        sx={{
          fontSize: { laptop: "12px", mobile: "12px" },
          fontWeight: { mobile: "500", tablet: "500" },
          marginTop: { mobile: "5px", laptop: ".8vh" },
        }}
      >
        {data.title}
      </Typography>
    </Box>
  );
};

export default memo(EventComponent);
