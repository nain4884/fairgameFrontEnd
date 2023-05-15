import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MoneyBox from "./MoneyBox";
import SeprateBox from "./SeprateBox";
import { apiBasePath } from "../helper/constants";

const BoxComponent = ({
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
    matchOddsData
}) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    // console.log("check data :", matchOddsData)
    const { ex, status } = data;
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
                    width: "40%",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
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
                            fontSize: { laptop: "14px", mobile: "13px" },
                            fontWeight: "600",
                            marginLeft: "10px",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
                <MoneyBox color={color} rates={rate} />
            </Box>
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
            {!["ACTIVE", "", undefined, null].includes(status) || newData?.bettings?.length === 0 || livestatus ? (
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
                    {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
                    <h4 style={{ textTransform: "uppercase" }}>{newData?.bettings?.length === 0 || livestatus ? "suspended" : status}</h4>
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            background: "white",
                            height: "40px",
                            width: { laptop: "60%", mobile: "80%" },
                            justifyContent: { mobile: "flex-end", laptop: "center" },
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        {!matchesMobile && (
                            <SeprateBox
                                back={true}
                                currentMatch={newData}
                                lock={lock}
                                rates={allRates}
                                value={Math.round(matchOddsData?.back
                                    ? matchOddsData?.back - 2
                                    : 0)}
                                value2={0}
                                color={matchesMobile ? "white" : "#CEEBFF"}
                                type={{ color: "#A7DCFF", type: "BL" }}
                                name={name}
                                data={data}
                                typeOfBet={typeOfBet}
                            />
                        )}
                        <Box
                            sx={{ width: ".25%", display: "flex", background: "pink" }}
                        ></Box>
                        {!matchesMobile && (
                            <SeprateBox
                                back={true}
                                currentMatch={newData}
                                lock={lock}
                                rates={allRates}
                                value={Math.round(matchOddsData?.back
                                    ? matchOddsData?.back - 1
                                    : 0)}
                                value2={0}
                                color={matchesMobile ? "white" : "#C2E6FF"}
                                type={{ color: "#A7DCFF", type: "BL" }}
                                name={name}
                                data={data}
                                typeOfBet={typeOfBet}
                            />
                        )}
                        <Box
                            sx={{ width: ".25%", display: "flex", background: "pink" }}
                        ></Box>

                        <SeprateBox
                            back={true}
                            currentMatch={newData}
                            lock={lock}
                            rates={allRates}
                            value={
                                Math.round(matchOddsData?.back
                                    ? matchOddsData?.back
                                    : 0)
                            }
                            value2={0}
                            color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
                            type={{ color: "#A7DCFF", type: "BL" }}
                            name={name}
                            data={data}
                            typeOfBet={typeOfBet}
                        />

                        <Box
                            sx={{ width: ".25%", display: "flex", background: "pink" }}
                        ></Box>

                        <SeprateBox
                            back={true}
                            currentMatch={newData}
                            lock={lock}
                            rates={allRates}
                            value={
                                Math.round(matchOddsData?.lay
                                    ? matchOddsData?.lay
                                    : 0)
                            }
                            value2={0}
                            color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
                            type={{ color: "#FFB5B5", type: "BL" }}
                            name={name}
                            data={data}
                            typeOfBet={typeOfBet}
                        />
                        {/* <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box> */}
                        {!matchesMobile && (
                            <SeprateBox
                                back={true}
                                currentMatch={newData}
                                rates={allRates}
                                lock={lock}
                                value={
                                    Math.round(matchOddsData?.lay
                                        ? matchOddsData?.lay + 1
                                        : 0)
                                }
                                value2={0}
                                color={matchesMobile ? "white" : "#F2CBCB"}
                                type={{ color: "#FFB5B5", type: "BL" }}
                                name={name}
                                data={data}
                                typeOfBet={typeOfBet}
                            />
                        )}
                        {/* <Box
              sx={{ width: ".25%", display: "flex", background: "pink" }}
            ></Box> */}
                        {!matchesMobile && (
                            <SeprateBox
                                back={true}
                                currentMatch={newData}
                                rates={allRates}
                                lock={lock}
                                value={
                                    Math.round(matchOddsData?.lay
                                        ? matchOddsData?.lay + 2
                                        : 0)
                                }
                                value2={0}
                                color={matchesMobile ? "white" : "#ECD6D6"}
                                type={{ color: "#FFB5B5", type: "BL" }}
                                name={name}
                                data={data}
                                typeOfBet={typeOfBet}
                            />
                        )}
                        <Box
                            sx={{ width: ".25%", display: "flex", background: "pink" }}
                        ></Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default BoxComponent;
