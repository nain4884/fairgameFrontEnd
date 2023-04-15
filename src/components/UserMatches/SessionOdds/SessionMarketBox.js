import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import PlaceBetComponent from '../PlaceBetComponent';
import PlaceBetComponentWeb from '../PlaceBetComponentWeb';
import SeprateBox from '../SeprateBox';
import { memo } from 'react';

const SessionMarketBox = ({ index, typeOfBet, data, newData,mainData, allRates }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "11px", tablet: "10px", mobile: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {data.bet_condition}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            background: "white",
            height: "38px",
            width: { laptop: "60%", mobile: "80%" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SeprateBox po={1} color={"white"} />
          {matchesMobile && (
            <PlaceBetComponent
              amount={index == 2}
              profitLoss={data?.profitLoss}
            />
          )}
          {false && (
            <>
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
              <SeprateBox  po={2} color={"white"} rates={allRates} />
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
              <SeprateBox   po={3} color={"white"} rates={allRates} />
            </>
          )}
          <Box sx={{ width: ".45%", display: "flex", background: "pink" }}></Box>
          <SeprateBox po={6} color={"white"} />
          <SeprateBox
            po={2}
            rates={allRates}
            session={true}
            value={data.no_rate}
            value2={data?.rate_percent?.split("-")[0]}
            lock={data?.betStatus===0 || data.no_rate===null ? true : false}
            color={"#F6D0CB"}
            type={{ color: "#FFB5B5", type: "YN" }}
            typeOfBet={typeOfBet}
            data={data}
            mainData={mainData}
          />
          <Box sx={{ width: ".45%", display: "flex", background: "pink" }}></Box>
          <SeprateBox
            po={1}
            rates={allRates}
            session={true}
            back={true}
            value={data.yes_rate}
            value2={data?.rate_percent?.split("-")[1]}
            lock={data?.betStatus===0 || data.yes_rate===null ? true : false}
            color={"#B3E0FF"}
            type={{ color: "#A7DCFF", type: "YN" }}
            typeOfBet={typeOfBet}
            data={data}
            mainData={mainData}
          />
          <Box sx={{ width: ".45%", display: "flex", background: "pink" }}></Box>
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
          {!matchesMobile && (
            <PlaceBetComponentWeb
              amount={index == 2}
              profitLoss={data?.profitLoss}
            />
          )}
        </Box>
      </Box>
    );
  };

export default memo(SessionMarketBox)