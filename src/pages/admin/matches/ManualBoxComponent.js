import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery, Box } from "@mui/material";
import { BallStart } from "../../../assets";
import { StyledImage } from "../../../components";
import { LockSolid } from "../../../admin/assets";
import SeperateBox from "./SeperateBox";
import MoneyBox from "./MoneyBox";
import { apiBasePath } from "../../../components/helper/constants";

const BoxComponent = ({
    name, color, align, lock, teamImage, rates, data, matchOddsData, ballStatus, status, isTeamC
}) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

    return (
        <Box
            sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: "100%",
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
                    {teamImage !== null && (
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
            </Box>

            {ballStatus ? <Box
                sx={{
                    background: "#000",
                    height: isTeamC ? "125px" : "82px",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    zIndex: 10,
                    width: { laptop: "60%", mobile: "40.5%" },
                    justifyContent: { mobile: "flex-end", laptop: "center" },
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <img src={BallStart} style={{ width: '113px', height: "32px" }} />
            </Box> : <>
                {status ?
                    <Box
                        sx={{
                            // background: "rgba(0,0,0,1)",
                            height: "40px",
                            display: "flex",
                            width: { laptop: "60%", mobile: "80%" },
                            // width: { mobile: "60%", laptop: "10.2vw" },
                            justifyContent: { mobile: "flex-end", laptop: "flex-end" },
                            alignItems: "center",
                        }}
                    >
                        <MoneyBox color={color} rates={rates} />
                        <Box
                            sx={{
                                background: "rgba(0,0,0,1)",
                                height: "40px",
                                display: "flex",
                                // width: { laptop: "60%", mobile: "80%" },
                                width: { mobile: "61%", laptop: "10.17vw", desktop: '10.17vw', desktop2XL: '10.12vw' },
                                justifyContent: { mobile: "flex-end", laptop: "flex-end" },
                                alignItems: "center",
                            }}
                        >
                            <Typography style={{ fontSize: { mobile: "12px", laptop: "22px" }, textTransform: "uppercase", width: "100%", textAlign: "center", color: "white", fontWeight: "400", }}>
                                suspended
                            </Typography>
                        </Box>
                    </Box> :
                    <Box
                        sx={{
                            display: "flex",
                            background: "white",
                            height: "40px",
                            width: { laptop: "60%", mobile: "80%" },
                            justifyContent: { mobile: "flex-end", laptop: "flex-end" },
                            alignItems: "center",
                        }}
                    >
                        <MoneyBox color={color} rates={rates} />

                        {!lock && (
                            <SeperateBox
                                align={align}
                                value={matchOddsData?.back ? matchOddsData?.back : 0}
                                value2={null}
                                color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
                            />
                        )}
                        {lock && (
                            <Box
                                sx={{
                                    height: "94%",
                                    background: "#FDF21A",
                                    border: "1px solid #2626264D",
                                    width: "5vw",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <StyledImage
                                    src={LockSolid}
                                    sx={{ height: "20px", width: "20px" }}
                                />
                            </Box>
                        )}



                        <Box sx={{ width: "3px", display: "flex", background: "pink" }}></Box>
                        {!lock && (
                            <SeperateBox
                                align={align}
                                value={matchOddsData?.lay ? matchOddsData?.lay : 0}
                                value2={null}
                                color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
                            />
                        )}
                        {lock && (
                            <Box
                                sx={{
                                    height: "94%",
                                    background: "#FDF21A",
                                    border: "1px solid #2626264D",
                                    width: "5vw",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <StyledImage
                                    src={LockSolid}
                                    sx={{ height: "20px", width: "20px" }}
                                />
                            </Box>
                        )}
                    </Box>
                }
            </>
            }
        </Box>
    );
};

export default BoxComponent;