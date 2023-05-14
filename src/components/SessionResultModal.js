import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEffect } from "react";
import { memo } from "react";
import SessionResultCustomButton from "./SessionResultCustomButton";

const SessionResultModal = ({
  onClick,
  newData,
  updateSessionData,
  setLive,
  setLocalState,
  currentMatch,
  visible,
  setIObtes,
}) => {
  const [selected, setSelected] = useState("");
  const { axios } = setRole();
  const [loading, setLoading] = useState({ id: "", value: false });

  const myDivRef = useRef(null);

  const scrollToBottom = () => {
    myDivRef.current?.scrollIntoView({});
  };

  useEffect(() => {
    scrollToBottom();
  }, [visible]);
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
                  betRestult: data?.data?.score,
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
                  betRestult: data?.data?.score,
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
        sessionBet: true,
      };
      setLoading({ id: "NR", value: true });
      const { data } = await axios.post("/game-match/NoResultDeclare", body);
      console.log(data, "data");
      if (data?.statusCode !== 500) {
        setLocalState(() => {
          const updatedBettings = currentMatch?.bettings.map(
            (betting, index) => {
              if (betting?.id === data?.data?.betId) {
                return {
                  ...newData,
                  profitLoss: null,
                  betRestult: null,
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
        setIObtes(data?.data);
        onClick();
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

  return (
    <Box
      ref={myDivRef}
      sx={{
        width: "250px",
        height: "180px",
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
            paddingX: "20px",
            display: "flex",
            alignItems: "center",
            height: "40px",
            background: "white",
            borderRadius: 2,
          },
          (theme) => ({
            backgroundImage: theme.palette.primary.headerGradient,
          }),
        ]}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "white", fontSize: "14px" }}
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
          padding: "8px",
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
            width: "100%",
            gap: 1,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <SessionResultCustomButton
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

          <SessionResultCustomButton
            color={"rgb(106 90 90)"}
            title={"No Result"}
            loading={loading}
            id="NR"
            onClick={() => {
              console.log("click");
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

            width: "100%",
          }}
        >
          <SessionResultCustomButton
            color={"#0B4F26"}
            id="DR"
            title={"Declare"}
            loading={loading}
            onClick={() => {
              if (loading?.value) {
                return false;
              }
              if (selected !== "" || !isNaN(selected)) {
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
export default memo(SessionResultModal);
