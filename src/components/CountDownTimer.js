import { Box, Modal } from "@mui/material";
import { HourGlass } from "../assets";
import Lottie from "lottie-react";
import React from "react";

const CountDownTimer = ({ visible, setVisible, time }) => {
  return (
    <Modal
      disableAutoFocus={true}
      onClose={() => setVisible(false)}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        outline: "none",
      }}
      open={visible}
    >
      <Box
        sx={{
          width: "220px",
          borderRadius: "6px",
          paddingY: "20px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          display: "flex",
          position: "absolute",
          top: "45%",
          zIndex: 999,
        }}
      >
        <Lottie
          animationData={HourGlass}
          style={{
            display: "flex",
            alignSelf: "center",
            width: "50px",
            height: "50px",
          }}
        />
      </Box>
    </Modal>
  );
};
export default CountDownTimer;
