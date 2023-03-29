import { useTheme } from "@emotion/react"
import { Box, Pagination, Typography, useMediaQuery } from "@mui/material"
import { display, width } from "@mui/system"
import { useEffect, useState } from "react"
import { Header, Info, Lock, TEAMLOGO, TEAMLOGO1 } from "../assets"
import userAxios from "../axios/userAxios"
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
    const [pageCount, setPageCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(5)

    useEffect(() => {
        getAllMatch()
    }, [currentPage, pageCount])
    
    async function getAllMatch() {
        try {
            let { data } = await userAxios.get(`/game-match/getAllMatch?bets=1&pageNo=${currentPage}&pageLimit=${pageLimit}`);
            if(data.length > 0) {
                setMatchData(data[0])
                setPageCount(Math.ceil(parseInt(data[1]) / pageLimit));
            }
        } catch (e) {
            console.log(e)
        }
    }

    function callPage(e) {
        setCurrentPage(parseInt(e.target.outerText))
    }

    return (
        <>
            {matchData?.map(match => {
                return (
                    <Odds onClick={() => { doNavigateWithState(match.id) }} top={true} blur={false} match={match} />
                )
            })}
            <Pagination className="whiteTextPagination d-flex justify-content-center" count={pageCount} color="primary" onChange={callPage} />
            {/* <Odds onClick={onClick} top={false} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} /> */}
        </>
    )

}

export default MatchesComponent;