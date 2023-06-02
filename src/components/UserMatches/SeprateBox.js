import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
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
  setFastAmount,
  selectedFastAmount,
  fromOdds,
  sessionMain,
  setFastRate,
  fastRate,
  setPlaceBetData,
  placeBetData,
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

  const [showAtTop, setShowAtTop] = useState(false);

  const [previousValue, setPreviousValue] = useState(false);

  useEffect(() => {
    setPreviousValue(value);
    if (setFastRate !== undefined) {
      // console.log("value", placeBetData, { name, po, typeOfBet, value });
      if (
        placeBetData?.po === po &&
        placeBetData?.typeOfBet === typeOfBet &&
        placeBetData?.name === name
      ) {
        setFastRate(value);
      }
    }
  }, [value, placeBetData]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const divElement = document.getElementById("test");

      if (divElement) {
        const divHeight = divElement.offsetHeight;
        const divTop = divElement.offsetTop;

        if (scrollY + windowHeight < divTop + divHeight) {
          setShowAtTop(true);
        } else {
          setShowAtTop(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function FetchIpAddress() {
    const res = await fetch("https://geolocation-db.com/json/");
    return res.json();
  }

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
    const res = await FetchIpAddress();
    let newPayload = {
      ...payload,
      country: res?.country_name,
      ip_address: res?.IPv4,
    };

    let oddValue = selectedFastAmount ? Number(previousValue) : Number(value);
    // : Number(document.getElementsByClassName("OddValue")?.[0]?.textContent);
    if (newPayload?.stake ===0) {
      toast.warn("Please enter amount to place a bet");
      return false;
    } else {
      if (oddValue != newPayload.odds) {
        toast.warning("Odds value has been updated. You can not place bet.");
        return;
      }
      if (newPayload.marketType == "MATCH ODDS") {
        setVisible(true);
        setCanceled(false);
        let delay = match?.delaySecond ? match?.delaySecond : 0;
        delay = delay * 1000;
        setTimeout(() => {
          PlaceBetSubmit(newPayload);
        }, delay);
      } else {
        PlaceBetSubmit(newPayload);
      }
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
      if (sessionMain === "sessionOdds") {
        setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
      } else if (sessionMain === "manualBookMaker") {
        setFastAmount((prev) => ({ ...prev, mannualBookMaker: 0 }));
      } else if (sessionMain === "bookmaker") {
        setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
      }
      showDialogModal(isPopoverOpen, true, response.data.message);
      setVisible(true);
      setCanceled(false);
      setPreviousValue(0);
      // navigate("/matchDetail")
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message);
      showDialogModal(isPopoverOpen, false, e.response.data.message);
      setShowModalMessage(e.response.data.message);
      setShowSuccessModal(true);
    }
  };

  const innerRef = useOuterClick((ev) => {
    setIsPopoverOpen(false);
  });

  function findBetId(data) {
    const matchOdds = data?.bettings?.filter(
      (element) => element.sessionBet === false
    );
    return matchOdds?.[0]?.id;
  }

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
            if (selectedFastAmount) {
              let payload = {
                id: currentMatch?.id,
                matchType: currentMatch?.gameType,
                // betId: currentMatch?.matchOddsData?.[0]?.id,
                betId: findBetId(currentMatch),
                bet_type: type?.color === "#A7DCFF" ? "back" : "lay",
                odds: Number(value),
                betOn: name,
                stack: Number(selectedFastAmount),
                team_bet: name,
                // country: res?.country_name,
                // ip_address: res?.IPv4,
                stake: Number(selectedFastAmount),
                teamA_name: currentMatch?.teamA,
                teamB_name: currentMatch?.teamB,
                teamC_name: currentMatch?.teamC,
                marketType:
                  typeOfBet === "MATCH ODDS" ? "MATCH ODDS" : typeOfBet,
              };
              if (session) {
                delete payload.betOn;
                delete payload.odds;

                payload.matchType = data?.matchType;
                payload.teamA_name = mainData?.teamA;
                payload.teamB_name = mainData?.teamB;
                payload.id = data?.match_id;
                payload.betId = data?.id;
                payload.bet_type = type?.color === "#A7DCFF" ? "yes" : "no";
                payload.bet_condition = data?.bet_condition;
                payload.rate_percent = data?.rate_percent;
                payload.marketType = typeOfBet;
                payload.odds = Number(value);
                payload.sessionBet = true;
              }

              handlePlaceBet(payload, currentMatch);
            } else if (sessionMain !== "sessionOdds") {
              let payload = {
                id: currentMatch?.id,
                matchType: currentMatch?.gameType,
                // betId: currentMatch?.matchOddsData?.[0]?.id,
                betId: findBetId(currentMatch),
                bet_type: type?.color === "#A7DCFF" ? "back" : "lay",
                odds: Number(value),
                betOn: name,
                stack: Number(selectedFastAmount),
                team_bet: name,
                stake: Number(selectedFastAmount),
                teamA_name: currentMatch?.teamA,
                teamB_name: currentMatch?.teamB,
                teamC_name: currentMatch?.teamC,
                marketType:
                  typeOfBet === "MATCH ODDS" ? "MATCH ODDS" : typeOfBet,
                name,
                rates,
                back,
                currentMatch,
                selectedValue,
                type,
                data,
                betOn: name,
                typeOfBet: typeOfBet,
                po: po,
              };
              setPlaceBetData(payload);
            } else {
              setIsPopoverOpen(true);
              setSelectedValue(value);
              type?.type === "BL"
                ? setIsBack(type?.color === "#A7DCFF")
                : setIsSessionYes(type?.color === "#A7DCFF");
              dispatch(setColorValue(color));
            }
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
              top: "33%",

              justifyContent: "center",
            }}
          >
            <PlaceBet
              name={name}
              rates={rates}
              onSubmit={async (payload) => {
                handlePlaceBet(payload, currentMatch);
              }}
              onCancel={() => {
                setVisible(true);
                setCanceled(true);
                setIsPopoverOpen(false);
              }}
              handleClose={() => {
                setIsPopoverOpen(false);
              }}
              season={session}
              back={back}
              currentMatch={currentMatch}
              isBack={isBack}
              betType={betType}
              fromOdds={fromOdds}
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
