import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CancelDark } from "../assets";
import { setRole } from "../newStore";
import { toast } from "react-toastify";

const SessionResultModal = ({ onClick, newData }) => {
  const [selected, setSelected] = useState("");
  const { axios } = setRole();
  const declareResult = async () => {
    try {
      const body = {
        betId: newData?.id,
        matchId: newData?.match_id,
        sessionBets: true,
        score: selected,
      };
      const { data } = await axios.post("/game-match/declearResult", body);
      toast.success(data?.message);
    } catch (e) {
      toast.error(e?.response?.data?.message);
      console.log("error", e?.message);
    }
  };

  const noResultDeclare = async () => {
    try {
      const body = {
        betId: newData?.id,
        matchId: newData?.match_id,
        sessionBets: true,
      };
      const { data } = await axios.post("/game-match/NoResultDeclare", body);
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
          {title}
        </Typography>
      </Box>
    );
  };

  console.log("selected", selected);
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
            onClick={() => onClick()}
          />

          <CustomButton
            color={"rgb(106 90 90)"}
            title={"No Result"}
            onClick={() => noResultDeclare()}
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
            title={"Declare"}
            onClick={() => {
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
