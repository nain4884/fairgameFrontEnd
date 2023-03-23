import { useTheme } from "@emotion/react"
import { Box, Typography, useMediaQuery } from "@mui/material"
import { display, width } from "@mui/system"
import { useEffect, useState } from "react"
import { Header, Info, Lock, TEAMLOGO, TEAMLOGO1 } from "../assets"
import './index.css'
const SeperateBox = ({ color, empty, value, value2, lock }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ background: color, border: color != 'white' ? '1px solid #2626264D' : '0px solid white', width: { mobile: '24.5%', laptop: '20%' }, height: '94%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            {!empty && !lock && <Box sx={{ alignItems: 'center', justifyContent: 'space-around' }} >
                <Typography sx={{ fontSize: '13px', color: color == 'white' ? 'white' : 'black', fontWeight: '700', textAlign: 'center' }} >{value}</Typography>
                <Typography sx={{ fontSize: '12px', marginTop: -.4, color: color == 'white' ? 'white' : 'black', textAlign: 'center' }} >{value2}</Typography>
            </Box>}
            {lock &&
                <img
                    src={Lock}
                    style={{ width: '10px', height: '15px' }}
                />
            }
        </Box>
    )
}
const Divider = () => {
    return (
        <Box sx={{ width: '99%', background: 'rgba(211,211,211)', height: '1px' }} ></Box>
    )
}
const Odds = ({ upcoming, onClick, top, blur, match }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ position: 'relative', width: '100%', marginY: { mobile: '.8vh', laptop: '1vh' }, marginTop: { mobile: top ? '1vh' : '1.2vh', laptop: top ? "2vh" : '1vh' }, width: { mobile: "98%", laptop: '97.8%' }, marginX: '1vw', padding: .1, background: 'white' }}>
            {upcoming && <Box sx={{ position: 'absolute', zIndex: 2, background: 'rgba(0,0,0,0.5)', width: '100%', right: 0, height: '144px' }} ></Box>}

            {upcoming && <Box sx={{ width: '70px', zIndex: 3, border: '1px solid white', height: { mobile: '20px', laptop: '13px' }, justifyContent: 'center', display: 'flex', alignItems: 'center', background: '#129FFE', position: 'absolute', marginTop: -1, borderRadius: '3px', marginLeft: 1 }} >
                <Typography sx={{ fontStyle: 'italic', fontSize: { laptop: '10px', mobile: "10px" }, fontWeight: '600', color: 'white' }} >UPCOMING</Typography>
            </Box>}
            <Box onClick={onClick} sx={{ zIndex: 0, filter: blur ? "blur(0px)" : null, display: 'flex', position: 'relative', flexDirection: 'column', alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', }, background: 'white' }}>
                {!upcoming && <Box sx={{ width: '50px', border: '1px solid white', height: { mobile: '20px', laptop: '13px' }, justifyContent: 'center', display: 'flex', alignItems: 'center', background: '#46CF4D', position: 'absolute', marginTop: -1, borderRadius: '3px', marginLeft: 1 }} >
                    <Typography sx={{ fontStyle: 'italic', fontSize: { laptop: '10px', mobile: "10px" }, fontWeight: '600', color: 'white' }} >LIVE</Typography>
                </Box>}
                <Box sx={{ display: 'flex', height: '38px', flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                    <Box sx={{ flex: 1.2, background: '#f1c550', alignItems: { laptop: 'center', mobile: 'flex-end' }, display: 'flex', }}>
                        <Typography noWrap={true} sx={{ marginBottom: '2px', fontSize: { laptop: '14px', mobile: "10px" }, fontWeight: 'bold', marginLeft: '7px' }} >{match.teamA} vs {match.teamB} <span style={{ fontWeight: '500' }} >{match.startAt}</span></Typography> {/* Today at 9:30 PM */}
                    </Box>
                    <Box sx={{
                        flex: .1, background: '#262626'
                        // '#262626' 
                    }}>
                        <div class="slanted"></div>
                    </Box>
                    <Box sx={{
                        flex: 1, background: '#262626',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{ height: '80%', marginRight: '3px', borderRadius: '4px', width: '110px', background: 'white', justifyContent: "space-evenly", display: 'flex', alignSelf: 'flex-end' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: "12px", fontWeight: 'bold', color: '#0B4F26' }} >102</Typography>
                                <Typography sx={{ fontSize: "8px", fontWeight: '400', color: '#0B4F26' }} >Days</Typography>

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: "25px", fontWeight: 'bold', color: '#0B4F26' }} >:</Typography>

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: "12px", fontWeight: 'bold', color: '#0B4F26' }} >19</Typography>
                                <Typography sx={{ fontSize: "8px", fontWeight: '400', color: '#0B4F26' }} >Hrs</Typography>

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: "25px", fontWeight: 'bold', color: '#0B4F26' }} >:</Typography>

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: "12px", fontWeight: 'bold', color: '#0B4F26' }} >15</Typography>
                                <Typography sx={{ fontSize: "8px", fontWeight: '400', color: '#0B4F26' }} >Min</Typography>

                            </Box>
                        </Box>

                    </Box>
                </Box >
                {
                    <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: '99.7%', alignSelf: 'center' }} >
                        <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                            <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: {match.betfair_match_min_bet} MAX: {match.betfair_match_max_bet}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { laptop: 'center', mobile: 'flex-end' } }} >
                            <Box sx={{ background: "#00C0F9", width: { laptop: '16.5%', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >Back</Typography>
                            </Box>
                            <Box sx={{ width: '.35%', display: 'flex' }} ></Box>

                            <Box sx={{ background: "#FF9292", width: { laptop: '16.5%', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >Lay</Typography>
                            </Box>

                        </Box>
                    </Box>
                }
                <Box sx={{ display: 'flex', background: 'white', height: '40px', width: '100%', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', background: 'white', height: '40px', width: '40%', alignItems: 'center' }} >
                        <img src={TEAMLOGO} style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                        <Typography sx={{ color: 'black', fontSize: { laptop: '11px', tablet: '10px', mobile: "10px" }, marginLeft: '7px', fontWeight: '600' }} >{match.teamA}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', background: 'white', height: '40px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { mobile: 'flex-end', laptop: 'center' }, alignItems: 'center' }} >
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamA_Back ? match.bettings[0].teamA_Back - 2 : 50 - 2}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#CEEBFF"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamA_Back ? match.bettings[0].teamA_Back - 1 : 50 - 1}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#C2E6FF"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        <SeperateBox value={`${match.bettings[0].teamA_Back ? match.bettings[0].teamA_Back : 50}`} value2={" 1cr+"} color={matchesMobile ? "#A7DCFF" : "#A7DCFF"} />
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        <SeperateBox value={`${match.bettings[0].teamA_lay ? match.bettings[0].teamA_lay : 51}`} value2={" 1cr+"} color={matchesMobile ? "#FFB5B5" : "#FFB5B5"} />
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamA_lay ? match.bettings[0].teamA_lay + 1 : 51 + 1}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#F2CBCB"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamA_lay ? match.bettings[0].teamA_lay + 2 : 51 + 2}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#ECD6D6"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', background: 'white', height: '40px', width: '100%', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', background: 'white', height: '40px', width: '40%', alignItems: 'center' }} >
                        <img src={TEAMLOGO1} style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                        <Typography sx={{ color: 'black', fontSize: { laptop: '12px', mobile: "11px" }, marginLeft: '7px', fontWeight: '600' }} >{match.teamB}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', background: 'white', height: '40px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { mobile: 'flex-end', laptop: 'center' }, alignItems: 'center' }} >
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamB_Back ? match.bettings[0].teamB_Back - 2 : 50 - 2}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#CEEBFF"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamB_Back ? match.bettings[0].teamB_Back - 1 : 50 - 1}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#C2E6FF"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        <SeperateBox value={`${match.bettings[0].teamB_Back ? match.bettings[0].teamB_Back : 50}`} value2={" 1cr+"} color={matchesMobile ? "#A7DCFF" : "#A7DCFF"} />
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        <SeperateBox value={`${match.bettings[0].teamB_lay ? match.bettings[0].teamB_lay : 51}`} value2={" 1cr+"} color={matchesMobile ? "#FFB5B5" : "#FFB5B5"} />
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamB_lay ? match.bettings[0].teamB_lay + 1 : 50 + 1}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#F2CBCB"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                        {!matchesMobile && <SeperateBox value={`${match.bettings[0].teamB_lay ? match.bettings[0].teamB_lay + 2 : 50 + 2}`} value2={" 1cr+"} color={matchesMobile ? "white" : "#ECD6D6"} />}
                        <Box sx={{ width: '.25%', display: 'flex', background: 'pink' }} ></Box>
                    </Box>
                </Box>
            </Box >
        </Box>
    )
}
const MatchesComponent = ({ doNavigateWithState }) => {
    const [matchData, setMatchData] = useState([])
    const getAllMatches = async () => {
        try {
            const { data } = {
                data: [
                    {
                        "id": "ea46118c-501f-4e48-8ccf-d9dd9023bc2b",
                        "isActive": true,
                        "createAt": "2023-03-02T11:16:44.169Z",
                        "updateAt": "2023-03-02T11:16:44.169Z",
                        "createdBy": "8152710e-e1e8-427e-bf89-426fff6f7028",
                        "deletedAt": null,
                        "gameType": "cricket",
                        "title": "ind vs pak",
                        "marketId": "2",
                        "teamA": "india",
                        "teamB": "pak",
                        "teamC": null,
                        "startAt": "2023-05-05T10:26:36.070Z",
                        "stopAt": null,
                        "matchImage": null,
                        "teamA_Image": null,
                        "teamB_Image": null,
                        "match_max_bet": null,
                        "betfair_match_min_bet": 20,
                        "betfair_match_max_bet": 80,
                        "betfair_session_min_bet": 0,
                        "betfair_session_max_bet": 0,
                        "betfair_bookmaker_min_bet": 0,
                        "betfair_bookmaker_max_bet": 0,
                        "bookmaker_manual_min_bet": 0,
                        "bookmaker_manual_max_bet": 0,
                        "manaual_session_min_bet": 0,
                        "manaual_session_max_bet": 0,
                        "apiMatchActive": null,
                        "apiBookMakerActive": null,
                        "apiSessionActive": null,
                        "manualBookMakerActive": null,
                        "manualSessionActive": null,
                        "bettings": [
                            {
                                "id": "dff6963b-5208-411e-bbfd-357b29b4d9fb",
                                "isActive": true,
                                "createAt": "2023-03-02T11:17:28.077Z",
                                "updateAt": "2023-03-02T11:17:28.077Z",
                                "createdBy": "8152710e-e1e8-427e-bf89-426fff6f7028",
                                "deletedAt": null,
                                "match_id": "ea46118c-501f-4e48-8ccf-d9dd9023bc2b",
                                "matchType": "cricket",
                                "bet_condition": null,
                                "teamA_Back": null,
                                "teamB_Back": null,
                                "drawRate": null,
                                "no_rate": null,
                                "yes_rate": null,
                                "rate_percent": null,
                                "suspended": "suspended",
                                "teamA_suspend": null,
                                "teamB_suspend": null,
                                "teamA_lay": 50,
                                "teamB_lay": 75,
                                "selectionId": null,
                                "sessionBet": false,
                                "betStatus": 1
                            }
                        ]
                    },
                    {
                        "id": "60ffa666-1f6d-427c-943d-9f114442be43",
                        "isActive": true,
                        "createAt": "2023-03-06T06:27:39.965Z",
                        "updateAt": "2023-03-06T06:27:39.965Z",
                        "createdBy": "3feb1b8d-a55a-4df2-b3c9-9f9aeb6ef0f0",
                        "deletedAt": null,
                        "gameType": "cricket",
                        "title": "ind vs aus",
                        "marketId": "3",
                        "teamA": "india",
                        "teamB": "aus",
                        "teamC": null,
                        "startAt": "2023-05-05T10:26:36.070Z",
                        "stopAt": null,
                        "matchImage": null,
                        "teamA_Image": null,
                        "teamB_Image": null,
                        "match_max_bet": null,
                        "betfair_match_min_bet": 20,
                        "betfair_match_max_bet": 80,
                        "betfair_session_min_bet": 0,
                        "betfair_session_max_bet": 0,
                        "betfair_bookmaker_min_bet": 0,
                        "betfair_bookmaker_max_bet": 0,
                        "bookmaker_manual_min_bet": 0,
                        "bookmaker_manual_max_bet": 0,
                        "manaual_session_min_bet": 0,
                        "manaual_session_max_bet": 0,
                        "apiMatchActive": null,
                        "apiBookMakerActive": null,
                        "apiSessionActive": null,
                        "manualBookMakerActive": null,
                        "manualSessionActive": null,
                        "bettings": [
                            {
                                "id": "7d93f2c4-6134-49c5-bba7-420d291c7e14",
                                "isActive": true,
                                "createAt": "2023-03-06T06:29:12.587Z",
                                "updateAt": "2023-03-06T06:29:12.587Z",
                                "createdBy": "3feb1b8d-a55a-4df2-b3c9-9f9aeb6ef0f0",
                                "deletedAt": null,
                                "match_id": "60ffa666-1f6d-427c-943d-9f114442be43",
                                "matchType": "cricket",
                                "bet_condition": null,
                                "teamA_Back": null,
                                "teamB_Back": null,
                                "drawRate": null,
                                "no_rate": null,
                                "yes_rate": null,
                                "rate_percent": null,
                                "suspended": "suspended",
                                "teamA_suspend": null,
                                "teamB_suspend": null,
                                "teamA_lay": 90,
                                "teamB_lay": 55,
                                "selectionId": null,
                                "sessionBet": false,
                                "betStatus": 1
                            },
                            {
                                "id": "1e8cd1d2-dbe5-40b9-be0c-d9458a0f6db2",
                                "isActive": true,
                                "createAt": "2023-03-06T06:32:41.041Z",
                                "updateAt": "2023-03-18T06:26:04.305Z",
                                "createdBy": "3feb1b8d-a55a-4df2-b3c9-9f9aeb6ef0f0",
                                "deletedAt": null,
                                "match_id": "60ffa666-1f6d-427c-943d-9f114442be43",
                                "matchType": "cricket",
                                "bet_condition": null,
                                "teamA_Back": 22,
                                "teamB_Back": null,
                                "drawRate": null,
                                "no_rate": null,
                                "yes_rate": null,
                                "rate_percent": null,
                                "suspended": "suspended",
                                "teamA_suspend": null,
                                "teamB_suspend": null,
                                "teamA_lay": 50,
                                "teamB_lay": 50,
                                "selectionId": null,
                                "sessionBet": false,
                                "betStatus": 1
                            }
                        ]
                    },
                    {
                        "id": "aa56cbb1-5f29-4514-92bb-087c976447a2",
                        "isActive": true,
                        "createAt": "2023-03-10T05:47:41.698Z",
                        "updateAt": "2023-03-10T05:47:41.698Z",
                        "createdBy": "dd432377-9f9d-4248-917d-85b16dfeb7e7",
                        "deletedAt": null,
                        "gameType": "cricket",
                        "title": "ind vs aus",
                        "marketId": "3",
                        "teamA": "india",
                        "teamB": "aus",
                        "teamC": null,
                        "startAt": "2023-05-05T10:26:36.070Z",
                        "stopAt": null,
                        "matchImage": null,
                        "teamA_Image": null,
                        "teamB_Image": null,
                        "match_max_bet": null,
                        "betfair_match_min_bet": 20,
                        "betfair_match_max_bet": 80,
                        "betfair_session_min_bet": 0,
                        "betfair_session_max_bet": 0,
                        "betfair_bookmaker_min_bet": 0,
                        "betfair_bookmaker_max_bet": 0,
                        "bookmaker_manual_min_bet": 0,
                        "bookmaker_manual_max_bet": 0,
                        "manaual_session_min_bet": 0,
                        "manaual_session_max_bet": 0,
                        "apiMatchActive": null,
                        "apiBookMakerActive": null,
                        "apiSessionActive": null,
                        "manualBookMakerActive": null,
                        "manualSessionActive": null,
                        "bettings": [
                            {
                                "id": "a681e36d-0856-409b-9891-c88e4a4f80e8",
                                "isActive": true,
                                "createAt": "2023-03-10T05:50:26.045Z",
                                "updateAt": "2023-03-10T05:50:26.045Z",
                                "createdBy": "dd432377-9f9d-4248-917d-85b16dfeb7e7",
                                "deletedAt": null,
                                "match_id": "aa56cbb1-5f29-4514-92bb-087c976447a2",
                                "matchType": "cricket",
                                "bet_condition": null,
                                "teamA_Back": 49,
                                "teamB_Back": 23,
                                "drawRate": null,
                                "no_rate": null,
                                "yes_rate": null,
                                "rate_percent": null,
                                "suspended": "suspended",
                                "teamA_suspend": null,
                                "teamB_suspend": null,
                                "teamA_lay": 50,
                                "teamB_lay": 24,
                                "selectionId": null,
                                "sessionBet": false,
                                "betStatus": 0
                            },
                            {
                                "id": "2254b223-99d2-4a8b-928e-246977d76266",
                                "isActive": true,
                                "createAt": "2023-03-10T05:53:06.854Z",
                                "updateAt": "2023-03-10T05:53:06.854Z",
                                "createdBy": "dd432377-9f9d-4248-917d-85b16dfeb7e7",
                                "deletedAt": null,
                                "match_id": "aa56cbb1-5f29-4514-92bb-087c976447a2",
                                "matchType": "cricket",
                                "bet_condition": "10 Over run",
                                "teamA_Back": null,
                                "teamB_Back": null,
                                "drawRate": null,
                                "no_rate": 20,
                                "yes_rate": 21,
                                "rate_percent": "100-100",
                                "suspended": "suspended",
                                "teamA_suspend": null,
                                "teamB_suspend": null,
                                "teamA_lay": null,
                                "teamB_lay": null,
                                "selectionId": null,
                                "sessionBet": true,
                                "betStatus": 0
                            }
                        ]
                    }
                ],
            };
            // console.log(data,macthId);
            setMatchData(data)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getAllMatches()
    }, [])
    return (
        <>
            {/* <Odds onClick={onClick} top={false} /> */}
            {matchData?.map(match => {
                return (
                    <Odds onClick={()=>{doNavigateWithState(match.id)}} top={true} match={match} />
                )
            })}
            {/* <Odds onClick={onClick} top={false} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} /> */}
        </>
    )
}

export default MatchesComponent;