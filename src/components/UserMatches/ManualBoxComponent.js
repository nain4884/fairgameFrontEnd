import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MoneyBox from "./MoneyBox";
import SeprateBox from "./SeprateBox";
import { apiBasePath } from "../helper/constants";
import { BallStart } from "../../assets";
import { useEffect } from "react";
import { memo } from "react";
import ManualSeparateBox from "./ManualSeparateBox";

const ManualBoxComponent = ({
  name,
  color,
  data,
  team,
  typeOfBet,
  align,
  rate,
  allRates,
  lock,
  teamImage,
  newData,
  suspendedData,
  showBox,
  livestatus,
  isRound,
  matchOddsData,
  ballStatus,
  isBall,
  selectedFastAmount,
  setFastAmount,
  sessionMain,
  setFastRate,
  fastRate,
  setPlaceBetData,
  placeBetData,
  setFastBetLoading,
  isTeamC,
  handleRateChange
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { ex, status } = data ?? {};
  useEffect(() => {
    if (livestatus || status !== "ACTIVE" || showBox) {
      setPlaceBetData(null);
    }
  }, [livestatus, status, showBox]);

  const handleDecimal = (value, gap, type) => {
    // alert(type)
    let checkDecimal = value % 1; // get the decimal portion of the number
    // alert(checkDecimal)
    if (checkDecimal >= 0.5) {
      let getValue =
        type == "back" ? Math.round(value) - gap : Math.round(value - 1) + gap;
      let checkZeroHundred =
        type == "back"
          ? getValue < 1
            ? 0
            : Math.round(getValue)
          : getValue >= 100
            ? 100
            : Math.round(getValue);
      let returnValue;
      if (type == "back") {
        let check = value % 1;
        returnValue =
          check >= 0.5
            ? getValue < 1
              ? checkZeroHundred
              : checkZeroHundred - 1
            : checkZeroHundred;
      } else {
        returnValue = checkZeroHundred;
      }
      return returnValue;
    } else {
      let getValue = type == "back" ? value - gap : value + gap;
      let checkZeroHundred =
        type == "back"
          ? getValue < 1
            ? 0
            : Math.round(getValue)
          : getValue >= 100
            ? 100
            : Math.round(getValue);
      let returnValue;
      if (type == "back") {
        let check = value % 1;
        returnValue = check >= 0.5 ? checkZeroHundred - 1 : checkZeroHundred;
      } else {
        returnValue = checkZeroHundred;
      }
      return returnValue;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: { mobile: "60%", laptop: "40%" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: { mobile: "70%", laptop: "100%", tablet: "100%" },
            alignItems: "center",
          }}
        >
          {/* {name != "DRAW" ? (
            <></>
          ) : (
            <img
              src={name == "INDIA" ? INDIA : PAKISTAN}
              style={{
                width: "22px",
                height: "25px",
                marginLeft: "10px",
                backgroundSize: "contains",
              }}
              alt="draw"
            />
            <Box
              sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
            ></Box>
          )} */}

          {teamImage != null && (
            <>
              <img
                src={`${apiBasePath}/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
              <Box
                sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
              ></Box>
            </>
          )}
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "14px", mobile: "10px" },
              fontWeight: "600",
              marginLeft: "10px",
              marginRight: "10px",
              width: { mobile: "113px", table: "100%", laptop: "100%" },
              textTransform: "capitalize"
            }}
          >
            {name}
          </Typography>
        </Box>
        <MoneyBox color={color} rates={rate} />
      </Box>
      {ballStatus ? (
        <>
          {isBall ? (
            <Box
              sx={{
                background: "#000",
                height: isTeamC ? "125px" : "82px",
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 10,
                width: { laptop: "60%", mobile: "40.5%" },
                justifyContent: { mobile: "center", laptop: "center" },
                alignItems: "center",
                display: "flex",
              }}
            >
              <img src={BallStart} style={{ width: "108px", height: "30px" }} />
            </Box>
          ) : null}
        </>
      ) : (
        <>
          {showBox && (
            <Box
              sx={{
                background: "rgba(0,0,0,0.5)",
                height: "40px",
                position: "absolute",
                right: 0,
                zIndex: 10,
                width: { laptop: "60%", mobile: "40.5%" },
                justifyContent: { mobile: "flex-end", laptop: "center" },
                alignItems: "center",
                display: "flex",
              }}
            ></Box>
          )}
          {!["ACTIVE", "", undefined, null].includes(status) ||
            newData?.bettings?.length === 0 ||
            livestatus ? (
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                height: "40px",
                width: { laptop: "60%", mobile: "40.5%" },
                justifyContent: { mobile: "flex-end", laptop: "center" },
                alignItems: "center",
                display: "flex",
              }}
            >
              {ballStatus ? null : (
                // <img src={BallStart} style={{ width: '113px', height: "32px" }} />
                <Typography
                  sx={{
                    fontSize: { mobile: "12px", laptop: "22px" },
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: "100%",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {newData?.bettings?.length === 0 || livestatus
                    ? "suspended"
                    : status}
                </Typography>
              )}
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  background: "white",
                  height: "40px",
                  width: { laptop: "60%", mobile: "40%" },
                  justifyContent: { mobile: "flex-end", laptop: "center" },
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {!matchesMobile && (
                  <ManualSeparateBox
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={2}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    setPlaceBetData={setPlaceBetData}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    // lock={lock}
                    lock={matchOddsData?.back ? handleDecimal(matchOddsData?.back, 2, "back") > 0 ? false : true : true}
                    rates={allRates}
                    value={
                      matchOddsData?.back
                        ? handleDecimal(matchOddsData?.back, 2, "back")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#CEEBFF"}
                    type={{ color: "#A7DCFF", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <ManualSeparateBox
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={1}
                    setPlaceBetData={setPlaceBetData}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    // lock={lock}
                    lock={matchOddsData?.back ? handleDecimal(matchOddsData?.back, 1, "back") > 0 ? false : true : true}
                    rates={allRates}
                    // value={matchOddsData?.back ? matchOddsData?.back - 1 : 0}
                    value={
                      matchOddsData?.back
                        ? handleDecimal(matchOddsData?.back, 1, "back")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#C2E6FF"}
                    type={{ color: "#A7DCFF", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>

                <ManualSeparateBox
                  closeModal={ballStatus}
                  setFastBetLoading={setFastBetLoading}
                  placeBetData={placeBetData}
                  po={0}
                  setPlaceBetData={setPlaceBetData}
                  setFastRate={setFastRate}
                  fastRate={fastRate}
                  sessionMain={sessionMain}
                  setFastAmount={setFastAmount}
                  selectedFastAmount={selectedFastAmount}
                  back={true}
                  currentMatch={newData}
                  // lock={lock}
                  lock={matchOddsData?.back > 0 ? false : true}
                  rates={allRates}
                  value={matchOddsData?.back ? matchOddsData?.back : 0}
                  value2={""}
                  color={matchesMobile ? "#B3E0FF" : "#A7DCFF"}
                  type={{ color: "#A7DCFF", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                  handleRateChange={handleRateChange}
                />

                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>

                <ManualSeparateBox
                  closeModal={ballStatus}
                  setFastBetLoading={setFastBetLoading}
                  placeBetData={placeBetData}
                  po={0}
                  setPlaceBetData={setPlaceBetData}
                  setFastRate={setFastRate}
                  fastRate={fastRate}
                  sessionMain={sessionMain}
                  setFastAmount={setFastAmount}
                  selectedFastAmount={selectedFastAmount}
                  back={true}
                  currentMatch={newData}
                  // lock={lock}
                  lock={matchOddsData?.lay > 0 ? false : true}
                  rates={allRates}
                  value={matchOddsData?.lay ? matchOddsData?.lay : 0}
                  value2={""}
                  color={matchesMobile ? "#F6D0CB" : "#FFB5B5"}
                  type={{ color: "#FFB5B5", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                  handleRateChange={handleRateChange}
                />
                {!matchesMobile && (
                  <ManualSeparateBox
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={1}
                    setPlaceBetData={setPlaceBetData}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    rates={allRates}
                    // lock={lock}
                    lock={matchOddsData?.lay ? handleDecimal(matchOddsData?.lay, 1, "") > 0 ? false : true : true}
                    // value={matchOddsData?.lay ? matchOddsData?.lay + 1 : 0}
                    value={
                      matchOddsData?.lay
                        ? handleDecimal(matchOddsData?.lay, 1, "")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#F2CBCB"}
                    type={{ color: "#FFB5B5", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                  />
                )}
                {!matchesMobile && (
                  <ManualSeparateBox
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={2}
                    setPlaceBetData={setPlaceBetData}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    rates={allRates}
                    // lock={lock}
                    lock={matchOddsData?.lay ? handleDecimal(matchOddsData?.lay, 2, "") > 0 ? false : true : true}
                    // value={matchOddsData?.lay ? matchOddsData?.lay + 2 : 0}
                    value={
                      matchOddsData?.lay
                        ? handleDecimal(matchOddsData?.lay, 2, "")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#ECD6D6"}
                    type={{ color: "#FFB5B5", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(ManualBoxComponent);
