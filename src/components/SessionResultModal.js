import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEffect } from "react";
import { memo } from "react";
import SessionResultCustomButton from "./SessionResultCustomButton";
import { SocketContext } from "..//context/socketContext";
import useOuterClick from "./helper/userOuterClick";
import { useSelector } from "react-redux";

const SessionResultModal = ({
  onClick,
  newData,
  updateSessionData,
  setLive,
  setLocalState,
  currentMatch,
  visible,
  setIObtes,
  onClickCancel,
}) => {
  const { socket, socketMicro } = useContext(SocketContext);
  const [selected, setSelected] = useState("");
  const { axios } = setRole();
  const [loading, setLoading] = useState({ id: "", value: false });
  const [error, setError] = useState("");

  const { sessionResults } = useSelector((state) => state?.matchDetails);

  const innerRef = useOuterClick((ev) => {
    onClick();
  });

  const myDivRef = useRef(null);

  const scrollToBottom = () => {
    myDivRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visible]);
  const undeclareResult = async () => {
    try {
      setLoading({ id: "UD", value: true });
      const body = {
        betId: newData?.id,
        match_id: newData?.match_id,
        sessionBet: true,
        // score: selected,
      };
      const { data } = await axios.post("/game-match/undeclareresult", body);
      if (data?.statusCode !== 500) {
        onClick();
        // socket.emit("resultDeclareForBet", {
        //   match_id: newData?.match_id,
        //   betId: newData?.id,
        // });

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
      setLoading({ id: "", value: false });
      toast.success(data?.message);
    } catch (e) {
      setLoading({ id: "", value: false });
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };
  const declareResult = async () => {
    try {
      setLoading({ id: "DR", value: true });
      const body = {
        betId: newData?.id,
        match_id: newData?.match_id,
        sessionBet: true,
        score: selected,
      };
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
      // if (e?.response?.data?.statusCode === 403) {
      //   onClickCancel();
      // }
      setLoading({ id: "", value: false });
      // toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };

  const noResultDeclare = async () => {
    try {
      setLoading({ id: "NR", value: true });
      const body = {
        betId: newData?.id,
        match_id: newData?.match_id,
        sessionBet: true,
      };
      const { data } = await axios.post("/game-match/NoResultDeclare", body);
      if (data?.statusCode !== 500) {
        onClick();
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      // ref={innerRef}
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
            onClickCancel();
          }}
          src={CancelDark}
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        />
      </Box>

      <form onSubmit={handleSubmit}>
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
          ref={myDivRef}
        >
          {newData?.betStatus === 2 ? (
            <Typography
              sx={{
                color: "#0B4F26",
                fontSize: "13px",
                fontWeight: "500",
                fontWeight: "600",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              Are you sure to Undeclare Result ?
            </Typography>
          ) : newData?.betStatus !== 3 && newData?.betStatus !== 2 ? (
            <>
              <TextField
                autoFocus
                placeholder="Enter score"
                variant="standard"
                value={selected}
                onChange={(e) => {
                  setError("");
                  setSelected(e?.target.value);
                }}
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
              {error && (
                <Box
                  style={{ color: "red", marginTop: "8px", fontSize: "11px" }}
                >
                  {error}
                </Box>
              )}
            </>
          ) : (
            <Typography
              sx={{
                color: "#0B4F26",
                fontSize: "13px",
                fontWeight: "500",
                fontWeight: "600",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              Are you sure to set No Result ?
            </Typography>
          )}
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
            {newData?.betStatus === 2 ? (
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
                  // if (selected && /^\d+$/.test(selected)) {
                  // } else if (selected === "") {
                  //   setError("Please enter score");
                  // } else {
                  //   // toast.warn("Please enter score");
                  //   setError("Input field should contain numbers only");
                  // }
                }}
              />
            ) : (
              <>
                {newData?.betStatus !== 3 ? (
                  <SessionResultCustomButton
                    color={"#0B4F26"}
                    id="DR"
                    title={"Declare"}
                    loading={loading}
                    onClick={() => {
                      if (loading?.value) {
                        return false;
                      }
                      if (selected !== "" && /^\d+$/.test(selected)) {
                        declareResult();
                      } else if (selected === "") {
                        setError("Please enter score");
                      } else {
                        // toast.warn("Please enter score");
                        setError("Input field should contain numbers only");
                      }
                    }}
                  />
                ) : null}
              </>
            )}

            {newData?.betStatus !== 2 && newData?.isNoResult && (
              <SessionResultCustomButton
                color={"rgb(106 90 90)"}
                title={newData?.betStatus !== 3 ? "No Result" : "Yes"}
                loading={loading}
                id="NR"
                onClick={() => {
                  if (loading?.value) {
                    return false;
                  }

                  noResultDeclare();
                }}
              />
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default memo(SessionResultModal);
