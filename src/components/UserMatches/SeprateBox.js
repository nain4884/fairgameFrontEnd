import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  setBetData,
  setUpdateBetData,
} from "../../newStore/reducers/matchDetails";
import { setRole } from "../../newStore";
import NotificationModal from "../NotificationModal";
import { toast } from "react-toastify";

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
  placeBetData,
  setFastBetLoading,
  closeModal,
  handleRateChange,
  updateRate,
}) => {
  const theme = useTheme();
  const { axios } = setRole();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBack, setIsBack] = React.useState(false);
  const [isSessionYes, setIsSessionYes] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [betPalaceError, setBetPalaceError] = useState(false);
  const [betPlaceLoading, setBetPlaceLoading] = useState(false);
  const [canceled, setCanceled] = useState({
    value: false,
    msg: "",
    loading: false,
    type: false,
  });
  const { geoLocation } = useSelector((state) => state.auth);
  const [showAtTop, setShowAtTop] = useState(false);
  const { betData, updateDetData } = useSelector(
    (state) => state?.matchDetails
  );

  const [previousValue, setPreviousValue] = useState(false);

  const [ip, setIP] = useState(geoLocation);
  useEffect(() => {
    if (geoLocation) {
      setIP(geoLocation);
    }
  }, [geoLocation]);

  useEffect(() => {
    if (
      updateRate?.key == betData?.po &&
      updateRate?.match == betData?.type &&
      updateRate?.team == selectedCountry &&
      selectedValue != updateRate?.value
    ) {
      dispatch(setUpdateBetData(updateRate?.value));
    }
  }, [updateRate]);
  useEffect(() => {
    if (closeModal || lock) {
      console.log("closeModal", closeModal);
      setIsPopoverOpen(false);
    }
  }, [closeModal, lock]);

  useEffect(() => {
    setPreviousValue(value);
    if (setFastRate !== undefined) {
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

  function showDialogModal(isModalOpen, showRight, message) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      // navigate(`/${window.location.pathname.split('/')[1]}`,{state:data.id})
    }, [2000]);
    setShowModalMessage(message);
  }
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
  const handlePlaceBet = async (payload, match, po) => {
    let data = {
      type: payload?.bet_type,
      po: po,
    };
    dispatch(setBetData({ ...data }));

    let newPayload = {
      ...payload,
      country: ip?.country_name || null,
      ip_address: ip?.IPv4 || null,
      place_index: po,
    };

    let oddValue = Number(value);

    // : Number(document.getElementsByClassName("OddValue")?.[0]?.textContent);
    if (newPayload?.stake === 0) {
      // toast.warn("Please enter amount to place a bet");
      setCanceled({
        value: true,
        loading: false,
        msg: "Please enter amount to place a bet",
        type: false,
      });
      setBetPlaceLoading(false);
      setFastBetLoading(false);
      return false;
    } else {
      if (oddValue !== newPayload.odds) {
        // toast.warning("Odds value has been updated. You can not place bet.");
        setCanceled({
          value: true,
          msg: "Rate changed",
          loading: false,
          type: false,
        });
        setBetPlaceLoading(false);
        setFastBetLoading(false);
        setBetPalaceError(true);
        return;
      }
      if (newPayload.marketType == "MATCH ODDS") {
        setVisible(true);
        let delay = match?.delaySecond ? match?.delaySecond : 0;
        delay = delay * 1000;
        setCanceled({
          value: true,
          msg: "Rate changed",
          loading: true,
          type: false,
        });
        setTimeout(() => {
          PlaceBetSubmit(newPayload, po);
        }, delay);
      } else {
        PlaceBetSubmit(newPayload, po);
      }
    }
  };

  const PlaceBetSubmit = async (payload, po) => {
    try {
      if (
        payload.marketType == "MATCH ODDS" &&
        payload?.odds !== updateDetData
      ) {
        setBetPlaceLoading(false);
        setFastBetLoading(false);
        setCanceled({
          value: true,
          msg: "Rate changed",
          loading: false,
          type: false,
        });
        return false;
      }
      if (Number(payload?.odds) !== Number(value)) {
        setBetPlaceLoading(false);
        setFastBetLoading(false);
        setCanceled({
          value: true,
          msg: "Rate changed",
          loading: false,
          type: false,
        });
        return false;
      }
      if (payload.marketType !== "MATCH ODDS") {
        setCanceled({
          value: true,
          msg: "Rate changed",
          loading: true,
          type: false,
        });
      }
      setIsPopoverOpen(false);
      let response = await axios.post(`/betting/placeBet`, payload);
      if (sessionMain === "sessionOdds") {
        setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
      } else if (sessionMain === "manualBookMaker") {
        setFastAmount((prev) => ({ ...prev, [typeOfBet]: 0 }));
      } else if (sessionMain === "bookmaker") {
        setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
      }
      toast.success(response.data.message);
      showDialogModal(isPopoverOpen, true, response.data.message);
      setVisible(true);
      setFastBetLoading(false);
      setBetPlaceLoading(false);
      setPreviousValue(0);
      setCanceled({
        value: true,
        msg: response.data.message,
        loading: false,
        type: true,
      });
      setIsPopoverOpen(false);
      // navigate("/matchDetail")
    } catch (e) {
      setBetPlaceLoading(false);
      setFastBetLoading(false);
      setCanceled({
        value: true,
        msg: e.response.data.message,
        loading: false,
        type: false,
      });
      setBetPalaceError(true);
      showDialogModal(isPopoverOpen, false, e.response.data.message);
      setShowModalMessage(e.response.data.message);
      setShowSuccessModal(true);
      setTimeout(() => {
        // handleRateChange(); 
        //add
        setVisible(true);
        setIsPopoverOpen(false);
      }, 1500);
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
          cursor: betPlaceLoading ? "not-allowed" : "pointer",
          padding: { mobile: "0px", laptop: "1px", tablet: "1px" },
          width: { mobile: "100%", laptop: "20%" },
          height: "94%",
          position: typeOfBet === "SESSION" && "relative", // add
        }}
      >
        <Box
          onClick={(e) => {
            if(lock || [0,"0"].includes(value)){
              return false
            }
            if (betPlaceLoading) {
              return false;
            } else {
              if (selectedFastAmount) {
                setFastBetLoading(true);

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
                  payload.selectionId = data?.selectionId;
                  payload.betId = data?.id;
                  payload.bet_type = type?.color === "#A7DCFF" ? "yes" : "no";
                  payload.bet_condition = data?.bet_condition;
                  payload.rate_percent = data?.rate_percent;
                  payload.marketType = typeOfBet;
                  payload.odds = Number(value);
                  payload.sessionBet = true;
                }
                handlePlaceBet(payload, currentMatch, po);
              }
              else {
                setIsPopoverOpen(true);
                setSelectedCountry(name);
                setSelectedValue(value);
                dispatch(setUpdateBetData(value));
                type?.type === "BL"
                  ? setIsBack(type?.color === "#A7DCFF")
                  : setIsSessionYes(type?.color === "#A7DCFF");
                dispatch(setColorValue(color));
              }
            }
          }}
          style={{ position: "relative" }}
          sx={{
            background: lock || [0,"0"].includes(value) ? "#FDF21A" : color,
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
          {!empty && (!lock && ![0,"0"].includes(value)) && (
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
          {(lock || [0,"0"].includes(value)) && (
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
              betPlaceLoading={betPlaceLoading}
              name={name}
              rates={rates}
              onSubmit={async (payload) => {
                if (betPlaceLoading) {
                  return false;
                } else {
                  // setBetPlaceLoading(true);// timer related
                  handlePlaceBet(payload, currentMatch, payload?.po);
                }
              }}
              onCancel={() => {
                setVisible(true);
                setIsPopoverOpen(false);
                setBetPlaceLoading(false);
              }}
              handleClose={() => {
                setIsPopoverOpen(false);
                setBetPlaceLoading(false);
              }}
              season={session}
              back={back}
              po={po}
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
            visible={betPlaceLoading}
            setVisible={(i) => {
              setVisible(i);
            }}
          />
        }
        {canceled.value && (
          <NotificationModal
            time={
              typeOfBet == "MATCH ODDS"
                ? currentMatch?.delaySecond
                  ? currentMatch?.delaySecond
                  : 0
                : 0
            }
            open={canceled}
            handleClose={() =>
              setCanceled({
                value: false,
                msg: "",
                loading: false,
                type: false,
              })
            }
          />
        )}
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

export default memo(SeprateBox);
