import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";

const ResultComponent = ({
  onClick,
  teamA,
  teamB,
  tie,
  draw,
  betId,
  matchId,
}) => {
  const [selected, setSelected] = useState(teamA);
  const { axios } = setRole();

  const undeclareResult = async () => {
    try {
      const body = {
        betId: betId?.[0]?.id,
        match_id: betId?.[0]?.match_id,
        selectOption: selected,
      };

      const { data } = await axios.post("/game-match/declearResult", body);
      toast.success(data?.message);
    } catch (e) {
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };
  const declareResult = async () => {
    try {
      const body = {
        betId: betId?.[0]?.id,
        match_id: betId?.[0]?.match_id,
        selectOption: selected,
      };
      console.log("first", betId, body);
      const { data } = await axios.post("/game-match/declearResult", body);
      toast.success(data?.message);
    } catch (e) {
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };
  const CustomButton = ({ title, color, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: "45%",
          height: "40px",
          borderRadius: "10px",
          background: color,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "500", color: "white" }}
        >
          {title}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: "400px",
        height: "300px",
        padding: 0.2,
        borderRadius: 2,
        boxShadow: "0px 5px 10px #1A568414",
        background: "white",
      }}
    >
      <Box
        sx={[
          {
            width: "100%",
            justifyContent: "space-between",
            paddingX: "10px",
            display: "flex",
            alignItems: "center",
            height: "50px",
            background: "white",
            borderRadius: 2,
          },
          (theme) => ({
            backgroundImage: theme.palette.primary.headerGradient,
          }),
        ]}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
        >
          Match Result
        </Typography>
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          src={CancelDark}
          style={{ width: "25px", height: "25px" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          flexWrap: "wrap",
          flexDirection: "row",
          display: "flex",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {[`${teamA}`, `${teamB}`, `${tie}`, `${draw}`].map((i, k) => {
          return (
            <Box
              onClick={() => {
                setSelected(i);
              }}
              sx={{
                width: "49%",
                marginY: "5px",
                borderRadius: "3px",
                border: "2px solid #2626261A",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60px",
                background: selected === i ? "#0B4F26" : "#F8C851",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: selected === i ? "white" : "black",
                }}
              >
                {i}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          justifyContent: "space-evenly",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomButton
          color={"#FF4D4D"}
          title={"Un Declare"}
          onClick={() => undeclareResult()}
        />
        <CustomButton
          color={"#0B4F26"}
          title={"Declare"}
          onClick={() => declareResult()}
        />
      </Box>
    </Box>
  );
};
export default ResultComponent;
