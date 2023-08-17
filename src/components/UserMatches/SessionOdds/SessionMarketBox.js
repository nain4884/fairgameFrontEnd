import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import PlaceBetComponent from "../PlaceBetComponent";
import PlaceBetComponentWeb from "../PlaceBetComponentWeb";
import SeprateBox from "../SeprateBox";
import { memo } from "react";
import { formatNumber } from "../../helper/helper";
import { BallStart } from "../../../assets";

const SessionMarketBox = ({
  index,
  typeOfBet,
  data,
  newData,
  selectedFastAmount,
  mainData,
  allRates,
  sessionMain,
  setFastAmount,
  closeModal,
  setFastBetLoading,
  handleRateChange,
  upcoming
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        background: "white",
        height: "38px",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
     {data?.betStatus === 0 && (
        <Box
          sx={{
            margin: "1px",
            width: "100%",
            height: "100%",
            position: "absolute",
            right: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        ></Box>
      )}
     {data?.betStatus === 1 &&  upcoming  && (
        <Box
          sx={{
            margin: "1px",
            width: "100%",
            height: "100%",
            position: "absolute",
            right: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        ></Box>
      )}
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: { mobile: "60%", laptop: "40%" },
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: { laptop: "11px", tablet: "10px", mobile: "8px" },
            marginLeft: "7px",
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          {data?.bet_condition}
        </Typography>
      </Box>
      {matchesMobile && (
        <PlaceBetComponent amount={index == 2} profitLoss={data} />
      )}
      {!matchesMobile && (
        <PlaceBetComponentWeb amount={index === 2} profitLoss={data} />
      )}
      {!["ACTIVE", "", undefined, null,""].includes(data?.suspended) || data.yes_rate===null && data.no_rate===null ? (
        <Box
          sx={{
            background: "rgba(0,0,0,1)",
            // marginLeft: "-2px",
            height: "38px",
            // position: "absolute",
            marginLeft: { laptop: "20%", tablet: "0%", mobile: "0%" },
            // right: 0,
            width: { laptop: "19.5%", tablet: "40%", mobile: "40.5%" },
            justifyContent: { mobile: "center", laptop: "center" },
            alignItems: "center",
            display: "flex",
            zIndex: 1,
          }}
        >
          {data?.suspended == "Ball Started" ? (
            <img src={BallStart} style={{ width: "113px", height: "32px" }} />
          ) : (
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
              {data?.suspended}
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "38px",
              width: { laptop: "60%", mobile: "40.5%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {!matchesMobile && <SeprateBox po={1} color={"white"} />}

            {false && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeprateBox po={2} color={"white"} rates={allRates} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeprateBox po={3} color={"white"} rates={allRates} />
              </>
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && <SeprateBox po={6} color={"white"} />}
            <SeprateBox
              closeModal={closeModal}
              setFastBetLoading={setFastBetLoading}
              po={2}
              setFastAmount={setFastAmount}
              rates={allRates}
              session={true}
              sessionMain={sessionMain}
              selectedFastAmount={selectedFastAmount}
              betType={"no"}
              value={data?.no_rate}
              value2={formatNumber(data?.rate_percent?.split("-")[0])}
              lock={[null,0,"0"].includes(data?.no_rate) ? true : false}
              color={"#F6D0CB"}
              type={{ color: "#FFB5B5", type: "YN" }}
              typeOfBet={typeOfBet}
              data={data}
              mainData={mainData}
              handleRateChange={handleRateChange}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeprateBox
              closeModal={closeModal}
              setFastBetLoading={setFastBetLoading}
              po={1}
              sessionMain={sessionMain}
              rates={allRates}
              setFastAmount={setFastAmount}
              selectedFastAmount={selectedFastAmount}
              session={true}
              betType={"yes"}
              value={data?.yes_rate}
              value2={formatNumber(data?.rate_percent?.split("-")[1])}
              lock={[null,0,"0"].includes(data?.yes_rate) ? true : false}
              color={"#B3E0FF"}
              type={{ color: "#A7DCFF", type: "YN" }}
              typeOfBet={typeOfBet}
              data={data}
              mainData={mainData}
              handleRateChange={handleRateChange}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeprateBox color={"white"} rates={allRates} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeprateBox color={"white"} rates={allRates} />
              </>
            )}
          </Box>
          {!matchesMobile && (
            <PlaceBetComponentWeb amount={index === 2} profitLoss={data} />
          )}
        </>
      )}
    </Box>
  );
};

export default memo(SessionMarketBox);
