import * as React from "react";
import Box from "@mui/material/Box";
// import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { TransPassComp } from "./TransPasswordComponent";
import { Button, Typography } from "@mui/material";

export function ThisUseModal() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 3500);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#00000069",
            borderRadius: "15px",
            height: "100vh",
            width: "100vw",
            zIndex: 9999,
            transition: "transform 1s ease-in-out",

          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #707070",
              backgroundColor: "#000",
              borderRadius: "15px",
              position: "relative",
              top: "20px",
              transition: "transform 1s ease-in-out",
            }}
          >
            <Button
              sx={{
                color: "#F8C851",
                position: "absolute",
                right: 0,
                top: 0,
                fontSize: "30px",
              }}
              onClick={handleClose}
            >
              &times;
            </Button>
            <TransPassComp onCancel={handleClose} />
          </Box>
        </Box>
      )}
    </>
  );
}

export function Modal({
  message,
  buttonMessage,
  navigateTo,
  setShowSuccessModal,
  showSuccessModal,
  userPG,
  activeTab,
}) {
  const navigate = useNavigate();
  return (
    <>
      <>
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#00000069",
            borderRadius: "15px",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #707070",
              backgroundColor: "#000",
              borderRadius: "15px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: { mobile: "150px", laptop: "300px", tablet: "300px" },
                minWidth: { laptop: "250px", tablet: "200px", mobile: "0px" },
              }}
            >
              <Box
                sx={{
                  maxHeight: "300px",
                  maxWidth: "500px",
                  // width: "250px",
                  // height: "100px",
                  minHeight: "100px",
                  minwidth: "150px",
                  background: "#F8C851",
                  borderRadius: "5px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography mb={2} color={"#000"}>
                  {message}
                </Typography>
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    ":hover": { backgroundColor: "#43ff5f" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setShowSuccessModal(!showSuccessModal);
                    navigateTo &&
                      navigate(
                        `/${window.location.pathname.split("/")[1]
                        }/${navigateTo}`,
                        { state: { activeTab: activeTab } }
                      );
                    userPG && navigate(`/${navigateTo}`);
                  }}
                >
                  {buttonMessage}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </>
  );
}

export default Modal;
