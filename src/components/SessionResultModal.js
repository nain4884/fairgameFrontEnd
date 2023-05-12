import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";

const SessionResultModal = ({
  onClick,
  newData,
  updateSessionData,
  setLive,
  setLocalState,
  currentMatch,
}) => {
  const [selected, setSelected] = useState("");
  const { axios } = setRole();
  const [loading, setLoading] = useState({ id: "", value: false });
  const undeclareResult = async () => {
    try {
      const body = {
        betId: newData?.id,
        match_id: newData?.match_id,
        sessionBet: true,
        score: selected,
      };
      setLoading({ id: "UD", value: true });
      const { data } = await axios.post("/game-match/undeclareresult", body);
      if (data?.statusCode !== 500) {
        setLoading({ id: "", value: false });
        // const updatedData = {
        //   ...newData,
        //   betStatus: 2,
        //   suspended: "Result Declared",
        // };
        // // call the parent component's updateSessionData function
        // updateSessionData(updatedData);

        setLocalState(() => {
          const updatedBettings = currentMatch?.bettings.map(
            (betting, index) => {
              if (betting?.id === newData?.id) {
                setLive(true);
                return {
                  ...newData,
                  betStatus: 1,
                  suspended: "",
                };
              }
              return betting;
            }
          );
          return {
            ...currentMatch,
            bettings: updatedBettings,
          };
        });
      }
      onClick();
      toast.success(data?.message);
    } catch (e) {
      setLoading({ id: "", value: false });
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };
  const declareResult = async () => {
    try {
      const body = {
        betId: newData?.id,
        match_id: newData?.match_id,
        sessionBet: true,
        score: selected,
      };
      setLoading({ id: "DR", value: true });
      const { data } = await axios.post("/game-match/declearResult", body);
      if (data?.statusCode !== 500) {
        // const updatedData = {
        //   ...newData,
        //   betStatus: 2,
        //   suspended: "Result Declared",
        // };
        // // call the parent component's updateSessionData function
        // updateSessionData(updatedData);

        setLocalState(() => {
          const updatedBettings = currentMatch?.bettings.map(
            (betting, index) => {
              if (betting?.id === newData?.id) {
                setLive(true);
                return {
                  ...newData,
                  betStatus: 2,
                  suspended: "Result Declared",
                };
              }
              return betting;
            }
          );
          return {
            ...currentMatch,
            bettings: updatedBettings,
          };
        });
      }
      onClick();
      setLoading({ id: "", value: false });
      toast.success(data?.message);
    } catch (e) {
      setLoading({ id: "", value: false });
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };

  const noResultDeclare = async () => {
    try {
      const body = {
        betId: newData?.id,
        match_id: newData?.match_id,
        sessionBets: true,
      };
      setLoading({ id: "NR", value: true });
      const { data } = await axios.post("/game-match/NoResultDeclare", body);
      if (data?.statusCode !== 500) {
        setLocalState(() => {
          const updatedBettings = currentMatch?.bettings.map(
            (betting, index) => {
              if (betting?.id === newData?.id) {
                setLive(true);
                return {
                  ...newData,
                  betStatus: 2,
                  suspended: "NO RESULT",
                };
              }
              return betting;
            }
          );
          return {
            ...currentMatch,
            bettings: updatedBettings,
          };
        });
      }
      onClick();
      setLoading({ id: "", value: false });
      toast.success(data?.message);
    } catch (e) {
      toast.error(e?.response?.data?.message);
      setLoading({ id: "", value: false });
      console.log("error", e?.message);
    }
  };

  const CustomButton = ({ id, title, color, loading, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: "100%",
          cursor: "pointer",
          height: "38px",
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
          {loading?.id === id ? (
            <CircularProgress
              sx={{
                color: "#FFF",
              }}
              size={20}
              thickness={4}
              value={60}
            />
          ) : (
            title
          )}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "300px",
        height: "240px",
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
          Session Result
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
          paddingTop: "3%",
          flexDirection: "row",
          display: "flex",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Enter score"
          variant="standard"
          value={selected}
          onChange={(e) => setSelected(e?.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              alignSelf: "center",
              border: "1px solid #303030",
              borderRadius: "5px",
              paddingY: "5px",
              paddingX: "1vw",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            paddingY: "5px",
            paddingX: "1vw",
            width: "100%",
            gap: 1,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <CustomButton
            color={"#FF4D4D"}
            title={"Un Declare"}
            loading={loading}
            id="UD"
            onClick={() => {
              if (loading?.value) {
                return false;
              }

              undeclareResult();
            }}
          />

          <CustomButton
            color={"rgb(106 90 90)"}
            title={"No Result"}
            loading={loading}
            id="NR"
            onClick={() => {
              if (loading?.value) {
                return false;
              }

              noResultDeclare();
            }}
          />
        </Box>
        <Box
          sx={{
            paddingY: "5px",
            paddingX: "1vw",
            width: "100%",
          }}
        >
          <CustomButton
            color={"#0B4F26"}
            id="DR"
            title={"Declare"}
            loading={loading}
            onClick={() => {
              if (loading?.value) {
                return false;
              }
              if (selected !== "") {
                declareResult();
              } else {
                toast.warn("Please enter score");
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default SessionResultModal;
