import { Box, Typography } from "@mui/material";
import ProfitLossComponent from "../../components/ProfitLossComponent";
import { Background } from "../../components";

const ProfitLoss = () => {
  return (
    <Background>
      <Typography
        sx={{
          fontSize: { mobile: "12px", laptop: "15px" },
          marginLeft: { laptop: "2px", mobile: "6px" },
          marginTop: "10px",
          marginBottom: "5px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {"PROFIT/LOSS REPORT"}
      </Typography>
      <ProfitLossComponent />
    </Background>
  );
};

export default ProfitLoss;
