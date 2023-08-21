import { Box, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import { memo } from "react";
import SessionResultCustomButton from "./SessionResultCustomButton";
import { SocketContext } from "..//context/socketContext";
import useOuterClick from "./helper/userOuterClick";
import { setSelectedMatch } from "../newStore/reducers/matchDetails";
import { useDispatch } from "react-redux";

const CustomSessionResult = ({
  onClick,
  newData,
  setLive,
  setLocalState,
  currentMatch,
  setIObtes,
}) => {
  const { socket, socketMicro } = useContext(SocketContext);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const { axios } = setRole();
  const [loading, setLoading] = useState({ id: "", value: false });
  const [confirmNoResult, setConfirmNoResults] = useState(false);

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
        onClick();
        setLoading({ id: "", value: false });
        socket.emit("resultDeclareForBet", {
          match_id: newData?.match_id,
          betId: newData?.id,
        });

        // setLocalState(() => {
        //   const updatedBettings = currentMatch?.bettings.map(
        //     (betting, index) => {
        //       if (betting?.id === newData?.id) {
        //         setLive(true);
        //         return {
        //           ...newData,
        //           betStatus: 2,
        //           betRestult: data?.data?.score,
        //           suspended: "",
        //         };
        //       }
        //       return betting;
        //     }
        //   );
        //   const newBody = {
        //     ...currentMatch,
        //     bettings: updatedBettings,
        //   };
        //   // dispatch(setSelectedMatch(newBody));
        //   return newBody;
        // });
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
        onClick();

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
      if (data?.statusCode !== 500) {
        onClick();
        setConfirmNoResults(false);
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
      setConfirmNoResults(false);
      toast.error(e?.response?.data?.message);
      setLoading({ id: "", value: false });
      console.log("error", e?.message);
    }
  };

  const handleDeclare = () => {
    if (loading?.value) {
      return false;
    }
    if (selected === "") {
      toast.warn("Please enter score");
    } else {
      declareResult();
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleDeclare();
    }
  };

  return (
    <Box
      sx={{
        width: "38%",

        marginRight: "8px",
        // height: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        border: "1px solid",
        // borderRadius: 2,
        // boxShadow: "0px 5px 10px #1A568414",
        background: "white",
        gap: 1,
      }}
    >
      {!confirmNoResult ? (
        <>
          <TextField
            autoFocus
            placeholder="Score"
            variant="standard"
            value={selected}
            onChange={(e) => setSelected(e?.target.value)}
            onKeyDown={handleInputKeyPress}
            InputProps={{
              disableUnderline: true,
              sx: {
                alignSelf: "center",
                border: "1px solid #303030",
                borderRadius: "5px",
                paddingY: "5px",
                paddingX: "0.5vw",
                height: "28px",
              },
            }}
          />
          {newData?.betStatus === 2 ? (
            <SessionResultCustomButton
              color={"#FF4D4D"}
              title={"Un Declare"}
              loading={loading}
              id="UD"
              session={true}
              onClick={() => {
                if (loading?.value) {
                  return false;
                }
                if (selected === "") {
                  toast.warn("Please enter score");
                } else {
                  undeclareResult();
                }
              }}
            />
          ) : (
            <>
              {newData?.betStatus !== 3 ? (
                <SessionResultCustomButton
                  color={"#0B4F26"}
                  id="DR"
                  session={true}
                  title={"Declare"}
                  loading={loading}
                  onClick={handleDeclare}
                />
              ) : null}
            </>
          )}

          {newData?.betStatus !== 2 && (
            <SessionResultCustomButton
              color={"rgb(106 90 90)"}
              title={"No Result"}
              loading={loading}
              id="NR"
              session={true}
              onClick={(e) => {
                e.stopPropagation();
                setConfirmNoResults(true);
              }}
            />
          )}
        </>
      ) : (
        <>
          <Typography
            sx={{
              color: "#0B4F26",
              fontSize: "12px",
              fontWeight: "500",
              height: "28px",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            Are you sure to set No Result ?
          </Typography>
          {newData?.betStatus !== 2 && (
            <SessionResultCustomButton
              color={"rgb(106 90 90)"}
              title={"Yes"}
              loading={loading}
              id="NR"
              session={true}
              onClick={() => {
                if (loading?.value) {
                  return false;
                }
                noResultDeclare();
              }}
            />
          )}
        </>
      )}

      <img
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        src={CancelDark}
        style={{ width: "25px", height: "25px", cursor: "pointer" }}
      />
    </Box>
  );
};
export default memo(CustomSessionResult);
