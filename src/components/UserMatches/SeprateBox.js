import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDailogData } from "../../store/dailogModal";
import useOuterClick from "../helper/userOuterClick";
import { setColorValue } from "../../store/selectedColorBox";
import PlaceBet from "../PlaceBet";
import BetPlaced from "../BetPlaced";
import { Modal } from "react-bootstrap";
import MUIModal from "@mui/material/Modal";

import { Lock } from "../../assets";
import { useState } from "react";
import { setAllBetRate } from "../../newStore/reducers/matchDetails";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";
import { height } from "@mui/system";
const PlaceBetType = {
  BackLay: "BackLay",
  YesNo: "YesNo",
};

const SeprateBox = ({
  color,
  po,
  empty,
  value,
  value2,
  lock,
  session,
  back,
  currentMatch,
  time,
  type,
  name,
  data,
  typeOfBet,
  mainData,
  rates,
  betType,
  fromOdds,
}) => {
  const theme = useTheme();
  const { axios } = setRole();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchor, setAnchor] = React.useState(null);
  const [isBack, setIsBack] = React.useState(false);
  const [isSessionYes, setIsSessionYes] = React.useState(false);
  const [placeBetType, setPlaceBetType] = React.useState(PlaceBetType.BackLay);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [canceled, setCanceled] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  function showDialogModal(isModalOpen, showRight, message) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      // navigate(`/${window.location.pathname.split('/')[1]}`,{state:data.id})
    }, [2000]);
    setShowModalMessage(message);
  }
  // console.warn("Modal: ", currentMatch)
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };

  const getMargin = () => {
    if (po === 1 && session) {
      return {
        right: { mobile: 0, laptop: "-80%" },
        left: { mobile: 0, laptop: "50%" },
      };
    }
    if (po === 2 && session) {
      return {
        right: { mobile: "-100%", tablet: 0, laptop: "-124.3%" },
        left: { mobile: 0, laptop: "50%" },
      };
    }
    if (po === 1) {
      return {
        right: { mobile: 0, laptop: 0 },
        left: { mobile: 0, laptop: "78%" },
      };
    }
    if (po === 2) {
      return {
        right: { mobile: 0, laptop: 0 },
        left: { mobile: 0, laptop: "46.7%" },
      };
    }
    if (po === 3) {
      return {
        right: { mobile: 0, laptop: 0 },
        left: { mobile: 0, laptop: "15.8395%" },
      };
    }
    if (po === 4) {
      return {
        right: { mobile: 0, laptop: "380%" },
        left: { mobile: 0, laptop: "-280%" },
      };
    }
    if (po === 5) {
      return {
        right: { laptop: "427%", mobile: 0 },
        left: { laptop: "-344%", mobile: 0 },
      };
    }
    if (po === 6) {
      return {
        right: { laptop: "427.55%", mobile: 0 },
        left: { laptop: "-375%", mobile: 0 },
      };
    }
    return { right: 0 };
  };
  const handlePlaceBet = async (payload, match) => {
    let oddValue = Number(
      document.getElementsByClassName("OddValue")?.[0]?.textContent
    );
    if (oddValue != payload.odds) {
      toast.warning("Odds value has been updated. You can not place bet.");
      return;
    }
    if (payload.marketType == "MATCH ODDS") {
      setVisible(true);
      setCanceled(false);
      let delay = match?.delaySecond ? match?.delaySecond : 0;
      delay = delay * 1000;
      setTimeout(() => {
        PlaceBetSubmit(payload);
      }, delay);
    } else {
      PlaceBetSubmit(payload);
    }
  };

  const PlaceBetSubmit = async (payload) => {
    try {
      if (Number(payload?.odds) !== Number(value)) {
        return toast.error("Rate changed ");
      }
      let response = await axios.post(`/betting/placeBet`, payload);
      // setAllRateBets(response?.data?.data[0])
      // dispatch(setAllBetRate(response?.data?.data[0]))
      showDialogModal(isPopoverOpen, true, response.data.message);
      setVisible(true);
      setCanceled(false);
      // navigate("/matchDetail")
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message);
      showDialogModal(isPopoverOpen, false, e.response.data.message);
      setShowModalMessage(e.response.data.message);
      setShowSuccessModal(true);
    }
  };

  return (
    <>
      <Box
        // ref={innerRef}
        sx={{
          padding: { mobile: "0px", laptop: "1px", tablet: "1px" },
          width: { mobile: "100%", laptop: "20%" },
          height: "94%",
          position: typeOfBet === "Session" && "relative", // add
        }}
      >
        <Box
          onClick={(e) => {
            if (lock || color == "white") {
              return null;
            }
            setSelectedValue(value);
            type?.type === "BL"
              ? setIsBack(type?.color === "#A7DCFF")
              : setIsSessionYes(type?.color === "#A7DCFF");
            setIsPopoverOpen(true);
            dispatch(setColorValue(color));
          }}
          style={{ position: "relative" }}
          sx={{
            background: lock ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            cursor: !empty && !lock && value && value2 && "pointer",
          }}
        >
          {!empty && !lock && (
            <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: color == "white" ? "white" : "black",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {value}
              </Typography>
              {typeOfBet != "MANUAL BOOKMAKER" ? (
                <Typography
                  sx={{
                    fontSize: "8px",
                    marginTop: -0.4,
                    color: color == "white" ? "white" : "black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {value2}
                </Typography>
              ) : null}
            </Box>
          )}
          {lock && (
            <img
              src={Lock}
              style={{ width: "10px", height: "15px" }}
              alt="lock"
            />
          )}
        </Box>

        <MUIModal
          open={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top:"33%",

              justifyContent: "center",
            }}
            // sx={{
            //   zIndex: 110,
            //   position: "absolute",
            //   ...getMargin(),
            //   transform: { laptop: "translate( -230%)" },
            //   top: "40px",
            // }}
          >
            <PlaceBet
              name={name}
              rates={rates}
              onSubmit={async (payload) => {
                handlePlaceBet(payload, currentMatch);
              }}
              // onSubmit={async (payload) => {
              //   try {
              //     console.log(payload, "payload");
              //     let response = await axios.post(
              //       `/betting/placeBet`,
              //       payload
              //     );
              //     // setAllRateBets(response?.data?.data[0])
              //     // dispatch(setAllBetRate(response?.data?.data[0]))
              //     showDialogModal(isPopoverOpen, true, response.data.message)
              //     setVisible(true);
              //     setCanceled(false);
              //     // navigate("/matchDetail")
              //   } catch (e) {
              //     console.log(e.response.data.message);
              //     toast.error(e.response.data.message)
              //     showDialogModal(isPopoverOpen, false, e.response.data.message)
              //     setShowModalMessage(e.response.data.message);
              //     setShowSuccessModal(true);
              //   }
              // }}
              onCancel={() => {
                setVisible(true);
                setCanceled(true);
                setIsPopoverOpen(false);
              }}
              handleClose={() => {
                setIsPopoverOpen(false);
              }}
              season={session}
              fromOdds={fromOdds}
              back={back}
              currentMatch={currentMatch}
              isBack={isBack}
              betType={betType}
              selectedValue={selectedValue}
              isSessionYes={isSessionYes}
              type={type}
              data={data}
              betOn={name}
              typeOfBet={typeOfBet}
              mainData={mainData}
            />
          </Box>
        </MUIModal>

        {
          <BetPlaced
            // time={5}
            time={
              typeOfBet == "MATCH ODDS"
                ? currentMatch?.delaySecond
                  ? currentMatch?.delaySecond
                  : 0
                : 0
            }
            not={canceled}
            visible={visible}
            setVisible={(i) => {
              setIsPopoverOpen(false);
              setVisible(i);
            }}
          />
        }
      </Box>
      {showSuccessModal && (
        <Modal
          message={showModalMessage}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"matchDetail"}
          userPG={true}
        />
      )}
    </>
  );
};

export default SeprateBox;
