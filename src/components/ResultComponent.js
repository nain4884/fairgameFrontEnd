import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import { memo } from "react";
import MatchOddsResultCustomButton from "./MatchOddsResultCustomButom";
import { useNavigate } from "react-router-dom";

const ResultComponent = ({
  onClick,
  teamA,
  teamB,
  tie,
  draw,
  betId,
  matchId,
  betStatus,
  stopAt
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(teamA);
  const { axios } = setRole();
  const [loading, setLoading] = useState({ id: "", value: false });
  const undeclareResult = async () => {
    try {
      const body = {
        betId: betId?.[0]?.id,
        match_id: betId?.[0]?.match_id,
        selectOption: selected,
      };
      setLoading({ id: "UD", value: true });
      const { data } = await axios.post("/game-match/undeclareresult", body);
      toast.success(data?.message);
      setLoading({ id: "", value: false });
      onClick();
    } catch (e) {
      toast.error(e?.response?.data?.message);
      setLoading({ id: "", value: false });
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
      setLoading({ id: "DR", value: true });
      const { data } = await axios.post("/game-match/declearResult", body);
      onClick();
      toast.success(data?.message);
      setLoading({ id: "", value: false });
      navigate("/expert/match");
    } catch (e) {
      setLoading({ id: "", value: false });
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };
  const teamData =
    draw === "draw"
      ? [`${teamA}`, `${teamB}`, `${tie}`, `${draw}`]
      : [`${teamA}`, `${teamB}`, `${tie}`];
  return (
    <Box
      sx={{
        width: "400px",
        // height: "300px",
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
            borderRadius: "10px 10px 0 0",
            background: "#ff4d4d",
          },
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
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ padding: 0 }}>
        <Box
          sx={{
            width: "100%",
            flexWrap: "wrap",
            flexDirection: "row",
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            px: "10px",
            py: "5px",
          }}
        >
          {teamData.map((i, k) => {
            return (
              <Box
                key={k}
                onClick={() => {
                  setSelected(i);
                }}
                sx={{
                  width: "40%",
                  marginY: "5px",
                  marginX: "5px",
                  borderRadius: "3px",
                  border: "2px solid #2626261A",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50px",
                  cursor: "pointer",
                  background: selected === i ? "#0B4F26" : "#F8C851",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
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
            // height: "60px",
            paddingY: "10px",
            justifyContent: "space-evenly",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "#000",
          }}
        >
          {betStatus === 2 || stopAt ? (
            <MatchOddsResultCustomButton
              color={"#FF4D4D"}
              loading={loading}
              id="UD"
              title={"Un Declare"}
              onClick={() => {
                if (loading?.value) {
                  return false;
                }
                undeclareResult();
              }}
            />
          ) : (
            <MatchOddsResultCustomButton
              id="DR"
              color={"#0B4F26"}
              loading={loading}
              title={"Declare"}
              onClick={() => {
                if (loading?.value) {
                  return false;
                }

                declareResult();
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default memo(ResultComponent);
