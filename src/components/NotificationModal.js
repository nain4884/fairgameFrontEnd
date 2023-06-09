import { Box, Typography } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import React, { useEffect } from "react";
import { BETPLACED, NOT } from "../assets";

const NotificationModal = ({ open, handleClose }) => {
  try {
    useEffect(() => {
      if (open.value) {
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    }, [open.value]);
    console.log('open', open)
    return (
      <MUIModal
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          outline: "none",
        }}
        open={open?.value}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "190px",
            borderRadius: "6px",
            paddingY: "10px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            alignSelf: "center",
            display: "flex",
            position: "absolute",
            top: "45%",
            zIndex: 999,
          }}
        >
          <img
            src={open.type ? BETPLACED : NOT}
            style={{ width: "60px", height: "60px", marginTop: "3px" }}
          />

          <Typography
            sx={{
              fontSize: { mobile: "10px", laptop: "14px", tablet: "14px" },
              fontWeight: "500",
              marginY: ".7vh",
              width: "70%",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {open.msg}
          </Typography>
        </Box>
      </MUIModal>
    );
  } catch (e) {
    console.log(e.message);
  }
};

export default NotificationModal;
