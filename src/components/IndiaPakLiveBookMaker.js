import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import StyledImage from "./StyledImage";
import ResultComponent from "./ResultComponent";
import './index.css'
import { BALLSTART, BroadCast } from "../expert/assets";
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default function IndiaPakLiveBookMaker({ add, match }) {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    console.log('match', match)

    const AddSession = () => {
        const [teamARate, setTeamARate] = useState()
        const [teamALayValue, setTeamALayValue] = useState()
        const [teamBRate, setTeamBRate] = useState()
        const [teamBLayValue, setTeamBLayValue] = useState()
        const [incGap, setIncGap] = useState(0)

        const handleChange = (event) => {
            let target = event.target;
            // alert(event.target.name)
            // console.warn("event :", event)
            if (target.name === 'teamA_rate') {
                setTeamARate(target.value)
                if (target.value !== '') {
                    let teamA_lay = parseInt(target.value) + 1
                    // if (incGap > 0) {
                    //     // teamA_lay = teamA_lay + this.state.up_keypress
                    // }
                    setTeamALayValue(teamA_lay);
                } else {
                    setTeamALayValue('');
                }
            }
            else if (target.name === 'teamB_rate') {
                setTeamBRate(target.value)
                if (target.value !== '') {
                    let teamB_lay = parseInt(target.value) + 1
                    // if (incGap > 0) {
                    //     // teamB_lay = teamB_lay + this.state.up_keypress
                    // }
                    setTeamBLayValue(teamB_lay);
                } else {
                    setTeamBLayValue('');
                }
            }
        }

        const handleKeysMatchEvents = (key, event) => {
            // alert(key);
            // console.log('handle key event');
            event.preventDefault();
            // this.setState({ focus_team: event.target.getAttribute('id'), ERROR: false });
            let targetValue = parseFloat(event.target.value);
            event.target.value = targetValue;
            if (key == 'right') {
                let value = targetValue + 1
                if (event.target.name === 'teamA_rate') {
                    setTeamALayValue(teamALayValue + 1);
                }

                if (event.target.name === 'teamB_rate') {
                    // this.setState({ teamB_rate: value, ERROR: false });
                    setTeamBLayValue(teamBLayValue + 1)
                }

                // event.target.value = value
            }
            if (key == 'left') {
                let value = targetValue - 1
                if (event.target.name === 'teamA_rate') {
                    setTeamALayValue(teamALayValue - 1);
                }

                if (event.target.name === 'teamB_rate') {
                    setTeamBLayValue(teamBLayValue - 1)
                }

                // event.target.value = value
            }
            // if (key == 'up') {
            //     let upkey = this.state.up_keypress;
            //     upkey = upkey + 1
            //     let lay_value = targetValue + upkey + 1
            //     if (event.target.name === 'teamB_rate') {
            //         document.getElementById('teamB_lay').innerText = lay_value;
            //         this.setState({ teamB_lay: lay_value, ERROR: false });
            //     } else if (event.target.name === 'teamA_rate') {
            //         document.getElementById('teamA_lay').innerText = targetValue + upkey + 1;
            //         this.setState({ teamA_lay: lay_value, ERROR: false });
            //     }
            //     this.setState({ up_keypress: upkey, ERROR: false });
            // }
            // if (key == 'down') {
            //     let upkey = this.state.up_keypress;
            //     upkey = upkey - 1
            //     if (event.target.name === 'teamB_rate') {
            //         document.getElementById('teamB_lay').innerText = targetValue + upkey + 1;
            //     } else if (event.target.name === 'teamA_rate') {
            //         document.getElementById('teamA_lay').innerText = targetValue + upkey + 1;
            //     }
            //     this.setState({ up_keypress: upkey, ERROR: false });
            // }

        }

        return (
            <Box sx={{ border: "2px solid #FFFFFF" }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                        {/* <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>Add Session</Typography> */}
                    </Box>
                    <Box sx={{ background: "#00C0F9", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>Back</Typography>
                    </Box>
                    <Box sx={{ background: "#FF9292", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>Lay</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ background: "#FFFFFF", width: "60%", position: 'relative' }}>
                        {!add && <Box sx={{ width: '35%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '30%', top: '1px', background: 'black' }} >
                            <img src={BALLSTART} style={{ width: '80%', height: '30%', position: 'absolute', zIndex: 3 }} />
                        </Box>}
                        <Box sx={{ borderWidth: 0, justifyContent: 'space-between', height: '50%', paddingX: '10px', alignItems: 'center', display: 'flex', width: '100%' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%" }}>{match?.teamA}</Typography>
                            <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                <TextField
                                    onChange={
                                        (e) => handleChange(e)
                                        // (i) => setValue1(i.target.value)
                                    }
                                    name={"teamA_rate"}
                                    variant="standard"
                                    value={teamARate}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '30px', width: '90%',
                                            background: '#F6F6F6',
                                            border: '1px solid #2626264D',
                                            borderRadius: '4px',
                                            alignSelf: 'flex-end',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            paddingX: '10px',
                                            color: "#319E5B",
                                            fontWeight: '600'
                                        }
                                    }}
                                />
                            </KeyboardEventHandler>
                            <TextField
                                // onChange={(e) => handleChange(e)}
                                variant="standard"
                                value={teamALayValue}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {
                                        height: '30px', width: '90%',
                                        background: '#F6F6F6',
                                        border: '1px solid #2626264D',
                                        borderRadius: '4px',
                                        alignSelf: 'flex-end',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        paddingX: '10px',
                                        color: "#319E5B",
                                        fontWeight: '600'
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ border: '.2px solid #2626264D', borderBottomWidth: 0, alignItems: 'center', display: 'flex', paddingLeft: '10px', borderRightWidth: 0, paddingX: '10px', borderLeftWidth: 0, width: '100%', height: '50%', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '600', width: "50%" }}>{match?.teamB}</Typography>
                            <KeyboardEventHandler handleKeys={['up', 'down', 'left', 'right', 'tab', 'shift', '`', ',', '.', '/']} isDisabled={false} onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)} >
                                <TextField
                                    variant="standard"
                                    value={teamBRate}
                                    onChange={(e) => handleChange(e)}
                                    name={"teamB_rate"}
                                    // onChange={(i) => setValue2(i.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '30px', width: '90% ',
                                            background: '#F6F6F6',
                                            border: '1px solid #2626264D',
                                            borderRadius: '4px',
                                            alignSelf: 'flex-end',
                                            paddingX: '10px',
                                            color: "#FF4D4D",
                                            fontWeight: '600'
                                        }
                                    }}
                                />
                            </KeyboardEventHandler>
                            <TextField
                                variant="standard"
                                value={teamBLayValue}
                                // onChange={(i) => setTeamBLayValue(i.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {
                                        height: '30px', width: '90% ',
                                        background: '#F6F6F6',
                                        border: '1px solid #2626264D',
                                        borderRadius: '4px',
                                        alignSelf: 'flex-end',
                                        paddingX: '10px',
                                        color: "#FF4D4D",
                                        fontWeight: '600'
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ borderLeft: "2px solid white", width: "40%" }}>
                        <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                            <Box sx={{ background: "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}</Typography>
                            </Box>
                            <Box sx={{ background: "#FFB5B5", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                            <Box sx={{ background: "#A7DCFF", width: "50%", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}</Typography>
                            </Box>
                            <Box sx={{ background: "#FFB5B5", width: "50%", borderLeft: "2px solid white", display: "flex", height: "45px", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{!add ? 39 : "00"}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    const BookButton = () => {
        return (
            <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90px', height: '30px', background: 'white', marginRight: '2px', borderRadius: '2px' }}
            >
                <Typography sx={{ color: "#FF4D4D", fontSize: '12px', fontWeight: '600' }}>-Book 60</Typography>
            </Box>
        )
    }
    return (
        <Box sx={{ flex: 1, background: "#0B4F26", borderRadius: "5px", position: 'relative', minHeight: "300px", py: "20px", px: "10px" }}>
            {!add && <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', position: 'absolute', left: '0px', top: 0, zIndex: 1 }} ></Box>}
            <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600", zIndex: 2, position: 'relative' }}>{match?.title}</Typography>
            <Box sx={{ display: "flex", marginTop: "20px", flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '100%', alignSelf: 'center', paddingX: .2, paddingTop: .2, background: 'white' }}>
                    <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Bookmaker Market 1</Typography>
                    </Box>
                    <Box sx={{
                        flex: .1, background: '#262626'
                        // '#262626' 
                    }}>
                        <div class="slanted"></div>
                    </Box>
                    <Box sx={{
                        flex: 1, background: '#262626',
                        // '#262626' ,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <BookButton />
                    </Box>
                </Box >
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <AddSession />
                    <Box sx={{ display: "flex", zIndex: 2, position: 'relative', justifyContent: "center", width: '100%', marginTop: '5%', alignSelf: 'center' }}>
                        <Box sx={{ width: "30%", display: "flex", maxWidth: "120px", background: "#10DC61", justifyContent: 'space-between', paddingX: '10px', alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Live</Typography>
                            <img style={{ width: '23px', height: '18px', marginLeft: '5px' }} src={BroadCast} />
                        </Box>
                        <Box sx={{ width: '2%' }} ></Box>
                        <Box
                            onClick={(e) => {
                                setVisible1(true)
                                setVisible(false)
                                e.stopPropagation()
                            }} sx={{ position: 'relative', width: "30%", display: "flex", background: "#FF4D4D", maxWidth: "120px", marginLeft: "5px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Un Declare</Typography>
                            <Box sx={{ position: "absolute", zIndex: 999, top: '40px', left: '-120%' }}>
                                {visible1 && <ResultComponent

                                    onClick={() => {
                                        setVisible1(false)
                                    }} />}
                            </Box>
                        </Box>
                        <Box sx={{ width: '2%' }} ></Box>

                        <Box onClick={(e) => {
                            setVisible(true)
                            setVisible1(false)
                            e.stopPropagation()
                        }} sx={{ width: "30%", position: 'relative', display: "flex", background: "white", marginLeft: "5px", maxWidth: "120px", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "#0B4F26", fontWeight: "500", fontSize: "12px" }}>Declare</Typography>
                            <Box sx={{ position: "absolute", zIndex: 999, top: '40px', right: 0 }}>
                                {visible && <ResultComponent onClick={() => {
                                    setVisible(false)
                                }} />}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}



const RunsAmountBox = ({ anchorEl, open, handleClose }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                borderRadius: "5px",
                border: "1px solid #306A47",
                overflow: "hidden",
            }}
        >
            <Box sx={{ minHeight: "120px", flexDirection: "column", backgroundColor: "white", display: "flex" }}>
                <Box sx={{ display: "flex", height: "30px" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Runs</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Amount</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>40</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>41</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>42</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>43</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>44</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}