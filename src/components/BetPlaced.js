import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BETPLACED, NOT } from "../assets";
import CountDownTimer from "./CountDownTimer";

const BetPlaced = ({ visible, setVisible, not, time }) => {
  const [flag, setFlag] = useState(false);
  const [timer, settimer] = useState(true);
  useEffect(() => {
    if (visible && !not && time) {
      setTimeout(
        () => {
          setFlag(true);
        },
        !time ? 1000 : 5000
      );
    } else {
      setFlag(false);
    }
    if (visible && !flag) {
      setTimeout(
        () => {
          setVisible(false);
        },
        not || !time ? 1000 : 6200
      );
    }
  }, [visible]);
  if (!flag && visible && time) {
    return <CountDownTimer visible={true} setVisible={setFlag} time={time} />;
  }
};
export default BetPlaced;
