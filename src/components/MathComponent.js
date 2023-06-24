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
import { useState } from "react";
import { apiBasePath } from "./helper/constants";

const MatchComponent = ({ currentMatch }) => {
    const [visible, setVisible] = useState(true);
    const [overscore, setOverscore] = useState('23');
    const [ballOutcomes, setBallOutcomes] = useState(['W', '2', '6', '4', 'w', '6', '1', '4']);
    return (
        <Box
            sx={[
                {
                    width: { tablet: "98%", mobile: "98%", laptop: "100%" },
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
                        padding: "1vh",
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
                                // alignItems: "center",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "bold",
                                }}
                            >
                                CRR: 30
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "bold",
                                }}
                            >
                                RRR: 32
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

                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "bold",
                                }}
                            >
                                171-3 (35.3)
                            </Typography>
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
                                {currentMatch?.teamA}
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

                            <Typography
                                sx={{
                                    fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                    marginTop: "1vh",
                                    fontWeight: "bold",
                                }}
                            >
                                282-8 (50)
                            </Typography>
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
                                {currentMatch?.teamB}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography sx={{
                                fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                // marginTop: "1vh",
                                fontWeight: "bold",
                            }}>
                                Last Overs: {overscore}
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
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { mobile: "8px", table: "10px", laptop: "12px" }, fontWeight: 'bold' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography sx={{
                                fontSize: { mobile: "8px", table: "10px", laptop: "12px" },
                                // marginTop: "1vh",
                                fontWeight: "bold",
                            }}>
                                Current Over: {overscore}
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
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { mobile: "8px", table: "10px", laptop: "12px" }, fontWeight: 'bold' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))}
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
