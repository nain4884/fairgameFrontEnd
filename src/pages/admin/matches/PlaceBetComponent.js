import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const PlaceBetComponent = ({ onClick, amount, setData, newData, width }) => {
    const [proLoss, setProfitLoss] = useState(newData?.profitLoss);

    useEffect(() => {
        setData((prev) => {
            if (Array.isArray(prev)) {
                const index = prev.findIndex((item) => item.id === newData.id);
                if (index !== -1) {
                    // merge newData with the existing object
                    const updatedItem = { ...prev[index], ...newData };
                    const updatedArray = [...prev];
                    updatedArray.splice(index, 1, updatedItem);
                    return updatedArray;
                } else {
                    return prev;
                }
            } else {
                // handle the case when prev is not an array
                return prev;
            }
        });

        setProfitLoss(newData?.profitLoss);
    }, [newData]);

    const handleClick = useCallback(
        (e) => {
            setData((prev) => {
                if (Array.isArray(prev)) {
                    const index = prev.findIndex((item) => item.id === newData.id);
                    if (index !== -1) {
                        const updatedItem = { ...prev[index], ...newData };
                        const updatedArray = [...prev];
                        updatedArray.splice(index, 1, updatedItem);
                        return updatedArray;
                    } else {
                        // if (prev.length < 4) {
                        return [...prev, newData];
                        // }
                        // return prev;
                    }
                } else {
                    // handle the case when prev is not an array
                    return prev;
                }
            });
        },
        [setData, newData]
    );

    return (
        <Box
            onClick={handleClick}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Box
                // ref={innerRef}
                // onClick={(e) => {
                //     setShow(!show);
                // }}
                sx={{
                    background: "#0B4F26",
                    position: "absolute",
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    right: { mobile: "43vw", laptop: "41vw", tablet: "41vw" },
                    justifyContent: "center",
                    width: { laptop: "90px", mobile: "60px", tablet: "90px" },
                    borderRadius: "5px",
                    height: "35px",

                    zIndex: 100,
                }}
            >
                <Box
                    sx={{
                        background: "#FDF21A",
                        borderRadius: "3px",
                        width: "90%",
                        height: "45%",
                        zIndex: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { laptop: "10px", mobile: "8px" },
                            fontWeight: "bold",
                            color: "#FF4D4D",
                        }}
                    >
                        Total Bet :{" "}
                        <span style={{ color: "#0B4F26" }}>{proLoss?.total_bet || 0}</span>
                    </Typography>
                </Box>
                <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
                    <Typography
                        sx={{
                            marginTop: "2px",
                            fontSize: {
                                laptop: !newData?.profitLoss?.max_loss ? "8px" : "8px",
                                tablet: "8px",
                                mobile: "8px",
                            },
                            fontWeight: !newData?.profitLoss?.max_loss ? "500" : "500",
                            color: "white",
                        }}
                    >
                        {" "}
                        {!newData?.profitLoss?.max_loss
                            ? "Profit/Loss"
                            : newData?.profitLoss?.max_loss}
                    </Typography>
                </Box>
            </Box>
            {/* {show && (
                <DropdownMenu
                    style={{ zIbnex: 10 }}
                    list={proLoss?.betData}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                />
            )} */}
        </Box>
    );
};

export default PlaceBetComponent;
