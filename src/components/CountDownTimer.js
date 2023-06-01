import { Box, Modal, Typography } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { BETPLACED, HourGlass, NOT } from "../assets";
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
        {/* <CountdownCircleTimer
                    isPlaying
                    duration={time}
                    size={130}
                    colors={['#F7B801', "#0B4F26"]}
                    colorsTime={[5, 0]}
                    strokeLinecap={0}
                    strokeWidth={8}
                    onComplete={() => {
                        setVisible(false)
                    }}
                >
                    {({ remainingTime }) => <Typography sx={{ fontSize: '25px' }}>{remainingTime}</Typography>}
                </CountdownCircleTimer> */}
        <Lottie
          animationData={HourGlass}
          style={{
            display: "flex",
            alignSelf: "center",
            width: "200px",
            height: "200px",
          }}
        />
      </Box>
    </Modal>
  );
};
export default CountDownTimer;
