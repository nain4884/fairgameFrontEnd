// https://www.sciencekids.co.nz/images/pictures/flags680/India.jpg
// https://www.sciencekids.co.nz/images/pictures/flags680/Pakistan.jpg
import {
    TextField,
    Typography,
    useTheme,
    useMediaQuery,
    Divider,
    List, ListItem, ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import "./index.css";
import {
    ARROWUP,
    Header,
    INDIA,
    Info,
    Lock,
    Logout,
    PAKISTAN,
    TIME,
    UD,
} from "../assets";
import { useState, useEffect } from "react";
import { apiBasePath } from "./helper/constants";

const MatchComponent = ({ currentMatch, liveScoreData,submit }) => {
    console.log("liveScoreData :", liveScoreData)
    const [visible, setVisible] = useState(true);
    const [overscore, setOverscore] = useState('23');
    const [ballOutcomes, setBallOutcomes] = useState([]);
    const [ballLastOutcomes, setBallLastOutcomes] = useState([]);
    const [lastOverRun, setLastOverRun] = useState("");
    const [currentOverRun, setCurrentOverRun] = useState("");
    const [innings, setInnings] = useState([]);


    useEffect(() => {
        if (liveScoreData) {
            setBallOutcomes(liveScoreData?.CurrentOver?.Balls);
            setCurrentOverRun(liveScoreData?.CurrentOver?.Runs)
            setBallLastOutcomes(liveScoreData?.LastOver?.Balls);
            setLastOverRun(liveScoreData?.LastOver?.Runs);
            setInnings(liveScoreData?.Innings);
        }

    }, [liveScoreData]);


    return (
        <Box
            sx={[
                {
                    width: {  tablet:submit? "100%" :"98%", mobile: submit ? "100%" :"98%", laptop: "100%" },
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    marginX: { laptop: "0vw", mobile: "0px", tablet: "0px" },
                    marginY: { laptop: ".5vh", mobile: "0.2vh" },
                    marginTop: { mobile: "0" },
                    borderRadius: "2px",
                    background: "white",
                    padding: '1px',
                    alignSelf: {
                        mobile: "center",
                        tablet: "center",
                        laptop: "flex-start",
                    },
                },
            ]}
        >
            <Box
                sx={{
                    display: "flex",
                    height: 38,
                    flexDirection: "row",
                    width: "100%",
                    alignSelf: "center",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        background: "#f1c550",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { laptop: "13px", tablet: "10px", mobile: "10px" },
                            fontWeight: "bold",
                            marginLeft: "7px",
                        }}
                    >
                        Live Scoreboard
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: 0.1,
                        background: "#262626",
                        // '#262626'
                    }}
                >
                    <div className="slanted"></div>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        background: "#262626",
                        // '#262626' ,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <img
                        onClick={() => {
                            setVisible(!visible);
                        }}
                        src={ARROWUP}
                        style={{
                            transform: visible ? "rotate(180deg)" : "rotate(0deg)",
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                            marginLeft: "5px",
                        }}
                    />
                </Box>
            </Box>
            {visible && (
                <Box
                    sx={{
                        display: "flex",
                        padding: "8px",
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "flex-end",
                        borderBottom: "0px solid",
                        borderColor: "gray",

                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                maxWidth: "20%",
                                // alignItems: "center",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "0px",
                                    fontWeight: "bold",
                                }}
                            >
                                CRR: {isNaN(innings?.[0]?.CRR) ?  0 :innings?.[0]?.CRR }
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "10px",
                                    fontWeight: "bold",
                                }}
                            >
                                RRR: {innings?.[0]?.RRR ? innings?.[0]?.RRR : 0}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                            }}
                        >

                            {innings?.[0]?.Runs && <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "0",
                                    fontWeight: "bold",
                                }}
                            >
                                {innings?.[0]?.Runs}/{innings?.[0]?.Wickets} ({innings?.[0]?.Overs})
                            </Typography>}
                            {currentMatch?.teamA_Image && (
                                <img
                                    style={{
                                        width: "45px",
                                        height: "35px",
                                        boxShadow:
                                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    }}
                                    src={`${apiBasePath}/${currentMatch?.teamA_Image}`}
                                    alt={currentMatch?.teamA}
                                />
                            )}
                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "600",
                                }}
                            >
                                {innings?.[0]?.Team || currentMatch?.teamA}
                                {/* {currentMatch?.teamA} */}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flex: 0.2,
                                alignItems: "center",
                                flexDirection: "column",
                                display: "flex",
                                marginTop: "1vh",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", tablet: "8px", laptop: "10px" },
                                    marginTop: "5vh",
                                    color: "gray",
                                    fontWeight: "600",
                                }}
                            >
                                V/S
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                            }}
                        >

                            {innings?.[1]?.Runs && <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "bold",
                                }}
                            >
                                {/* 282-8 (50) */}
                                {innings?.[1]?.Runs}/{innings?.[1]?.Wickets} ({innings?.[1]?.Overs})
                            </Typography>}
                            {currentMatch?.teamB_Image && (
                                <img
                                    style={{
                                        width: "45px",
                                        height: "35px",
                                        boxShadow:
                                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    }}
                                    src={`${apiBasePath}/${currentMatch?.teamB_Image}`}
                                    alt={currentMatch?.teamB}
                                />
                            )}
                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "600",
                                }}
                            >
                                {innings?.[1]?.Team || currentMatch?.teamB}
                                {/* {currentMatch?.teamB} */}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{
                                fontSize: { mobile: "8px", table: "10px", laptop: "14px" },
                                // marginTop: "1vh",
                                fontWeight: "bold",
                                color: "#319e5b"
                            }}>
                                Last Overs: {ballLastOutcomes?.reduce((acc, curr) => {
                                    const parsedValue = parseInt(curr);
                                    return isNaN(parsedValue) ? acc : acc + parsedValue;
                                }, 0)}
                            </Typography>
                            <List
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                            >
                                {ballLastOutcomes?.map((outcome, index) => (
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { mobile: "8px", table: "10px", laptop: "12px" }, fontWeight: 'bold', color: outcome.includes('w') ? '#FF4D4D' : 'inherit' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))}
                                {/* {ballLastOutcomes?.map((outcome, index) => (
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { mobile: "8px", table: "10px", laptop: "12px" }, fontWeight: 'bold' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))} */}
                            </List>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography sx={{
                                fontSize: { mobile: "8px", table: "10px", laptop: "14px" },
                                // marginTop: "1vh",
                                fontWeight: "bold",
                                color: "#319e5b"
                            }}>
                                Current Over: {currentOverRun}
                            </Typography>
                            <List
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                            >
                                {ballOutcomes?.map((outcome, index) => (
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { mobile: "8px", table: "10px", laptop: "12px" }, fontWeight: 'bold', color: outcome.includes('w') ? '#FF4D4D' : 'inherit' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))}
                                {/* {ballOutcomes?.map((outcome, index) => (
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { mobile: "8px", table: "10px", laptop: "12px" }, fontWeight: 'bold' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))} */}
                            </List>
                        </Box>
                        {/* <Divider />
                        <Typography variant="body1" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Current Overscore: {overscore}
                        </Typography>
                        <List
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: 0,
                                paddingBottom: 0
                            }}
                        >
                            {ballOutcomes.map((outcome, index) => (
                                <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '5px', paddingRight: '5px', }}>
                                    <ListItemText primary={<Typography style={{ fontWeight: '600' }}>{outcome}</Typography>} />
                                </ListItem>
                            ))}
                        </List> */}
                    </Box>
                    {/* <Divider /> */}
                </Box>
            )}
        </Box>
    );
};

export default MatchComponent;
