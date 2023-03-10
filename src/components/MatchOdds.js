import React, { useCallback, useEffect, useRef } from "react"
import { useTheme } from "@emotion/react"
import { Typography, useMediaQuery, Box, Menu, MenuItem } from "@mui/material"
import { BallStart, Header, INDIA, Info, Lock, Logout, PAKISTAN, TIME, UD } from "../assets"
import './index.css'
import PlaceBet from "./PlaceBet"
import { useDispatch, useSelector } from 'react-redux'
import { setColorValue } from "../store/selectedColorBox"
import { useState } from "react"
import StyledImage from "./StyledImage"
import { setAnchor } from "../store/betPlace"
import { Popover } from 'react-tiny-popover'
import BetPlaced from "./BetPlaced"

const SeperateBox = ({ color, po, empty, value, value2, lock, session, back, time }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    const dispatch = useDispatch()
    // const anchor=useSelector(state=>state.betplace)?.anchor
    const [anchor, setAnchor] = React.useState(null)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [canceled, setCanceled] = React.useState(false)
    const innerRef = useOuterClick(ev => {
        // setIsPopoverOpen(false)
        // alert('hi')
        if (isPopoverOpen) {
            // alert('hi')
            setIsPopoverOpen(false)
        }

    });
    const getMargin = () => {
        if (po == 1 && session) {
            return { right: { mobile: 0, laptop: '-80%' }, left: { mobile: 0, laptop: '50%' } }

        }
        if (po == 2 && session) {
            return { right: { mobile: 0, laptop: '-124.3%' }, left: { mobile: 0, laptop: '50%' } }

        }
        if (po == 1) {
            return { right: { mobile: 0, laptop: 0 }, left: { mobile: 0, laptop: '78%' } }
        }
        if (po == 2) {
            return { right: { mobile: 0, laptop: 0 }, left: { mobile: 0, laptop: '46.7%' } }

        }
        if (po == 3) {
            return { right: { mobile: 0, laptop: 0 }, left: { mobile: 0, laptop: '15.8395%' } }

        }
        if (po == 4) {
            return { right: { mobile: 0, laptop: '380%' }, left: { mobile: 0, laptop: '-280%' } }

        }
        if (po == 5) {
            return { right: { laptop: '427%', mobile: 0 }, left: { laptop: '-344%', mobile: 0 } }

        }
        if (po == 6) {
            return { right: { laptop: '427.55%', mobile: 0 }, left: { laptop: '-375%', mobile: 0 } }

        }
        return { right: 0 }
    }
    return (
        < Box ref={innerRef} sx={{ width: { mobile: '30%', laptop: '20%' }, height: '94%', position: 'relative' }}>
            {/* <Popover

                isOpen={isPopoverOpen}
                align={matchesMobile ? "end" : "center"}
                positions={['bottom']} // preferred positions by priority
                onClickOutside={() => setIsPopoverOpen(false)}
                content={() => <PlaceBet onSubmit={() => {
                    setVisible(true)
                    setCanceled(false)
                }}
                    onCancel={() => {
                        setVisible(true)
                        setCanceled(true)
                    }}

                    handleClose={() => {
                        setIsPopoverOpen(false)
                    }}
                    season={session}
                    back={back}
                />}
            > */}
            <Box onClick={e => {
                if (lock || color == "white") {
                    return null
                }
                setIsPopoverOpen(true)
                dispatch(setColorValue(color))
            }}
                style={{ position: 'relative' }}
                sx={{ background: lock ? "#FDF21A" : color, border: color != 'white' ? '1px solid #2626264D' : '0px solid white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
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
            {isPopoverOpen && <Box sx={{ zIndex: 110, position: 'absolute', ...getMargin(), transform: { laptop: 'translate( -230%)' }, top: '40px' }}>
                <PlaceBet
                    // refs={innerRef}
                    onSubmit={() => {

                        setIsPopoverOpen(false)
                        setVisible(true)
                        setCanceled(false)

                    }}
                    onCancel={() => {
                        setVisible(true)
                        setCanceled(true)
                        setIsPopoverOpen(false)

                    }}

                    handleClose={() => {
                        console.log('i')
                        setIsPopoverOpen(false)

                    }}
                    season={session}
                    back={back}
                /></Box>}
            {
                <BetPlaced time={time} not={canceled} visible={visible} setVisible={(i) => {
                    setIsPopoverOpen(false)
                    setVisible(i)
                }} />
            }

            {/* {isPopoverOpen && <Box sx={{ zIndex: 999, position: 'absolute' }}>
                <PlaceBet onSubmit={() => {
                    setVisible(true)
                    setCanceled(false)
                }}
                    onCancel={() => {
                        setVisible(true)
                        setCanceled(true)
                    }}

                    handleClose={() => {
                        setIsPopoverOpen(false)
                    }}
                    season={session}
                    back={back}
                /></Box>} */}
            {/* </Popover> */}
        </Box >
    )
}

const Divider = () => {
    return (
        <Box sx={{ width: '100%', background: 'rgba(211,211,211)', height: '1px' }} ></Box>
    )
}
const BoxComponent = ({ name, color, align, time }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ display: 'flex', background: 'white', height: '40px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} >
            <Box sx={{ display: 'flex', background: 'white', position: 'relative', height: '40px', width: '40%', alignItems: 'center', }} >
                <Box sx={{ flexDirection: 'row', display: 'flex', width: '100%', alignItems: 'center' }}>
                    {
                        name != "DRAW" ? <img src={name == "INDIA" ? INDIA : PAKISTAN} style={{ width: "22px", height: '25px', marginLeft: '10px', backgroundSize: "contains" }} />
                            :
                            <Box sx={{ width: '22px', height: '25px', marginLeft: '10px', }}>
                            </Box>
                    }
                    <Typography sx={{ color: 'black', fontSize: { laptop: '14px', mobile: "13px" }, fontWeight: '600', marginLeft: '10px' }} >{name}</Typography>
                </Box>
                <MoneyBox color={color} />
            </Box>
            <Box sx={{ display: 'flex', background: 'white', height: '40px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { mobile: 'flex-end', laptop: 'center' }, alignItems: 'center' }} >
                {!matchesMobile && <SeperateBox po={1} time={time} align={align} value={"1.71"} value2={" 1cr+"} color={matchesMobile ? "white" : "#CEEBFF"} />}
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                {!matchesMobile && <SeperateBox po={2} time={time} align={align} value={"1.71"} value2={" 1cr+"} color={matchesMobile ? "white" : "#C2E6FF"} />}
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                <SeperateBox po={3} time={time} align={align} value={"1.71"} value2={" 1cr+"} color={matchesMobile ? "white" : "#A7DCFF"} />
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                <SeperateBox po={4} time={time} align={align} value={"1.72"} value2={" 1cr+"} color={matchesMobile ? "white" : "#FFB5B5"} />
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                <SeperateBox po={5} time={time} back={true} align={align} value={"1.72"} value2={" 1cr+"} color={matchesMobile ? "#A7DCFF" : "#F2CBCB"} />
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                <SeperateBox po={6} time={time} align={align} value={"1.72"} value2={" 1cr+"} color={matchesMobile ? "#FFB5B5" : "#ECD6D6"} />
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
            </Box>
        </Box>
    )
}
const SmallBox = ({ color }) => {
    return (
        <Box sx={{ width: { laptop: '70px', mobile: '17vw' }, position: 'absolute', display: 'flex', left: { mobile: '56.5%', laptop: '49vw', tablet: '49%' }, justifyContent: 'center', alignItems: 'center', height: '30px', background: 'white', borderRadius: '7px' }}>
            <Typography sx={{ fontSize: { laptop: '12px', mobile: '10px' }, fontWeight: 'bold', color: color ? color : '#46e080' }} >+Book.60</Typography>
        </Box>
    )
}
const SmallBoxSeason = ({ color }) => {
    return (
        <Box sx={{ width: { laptop: '70px', mobile: '17vw' }, flexDirection: 'column', position: 'absolute', display: 'flex', left: { mobile: '56.5%', laptop: '49vw', tablet: '49%' }, justifyContent: 'center', alignItems: 'center', height: '30px', background: 'white', borderRadius: '3px' }}>
            <Typography sx={{ fontSize: '8px', fontWeight: 'bold', color: '#FF4D4D' }} >Session Bet</Typography>
            <Typography sx={{ fontSize: '8px', fontWeight: 'bold', color: '#46e080' }} >999</Typography>

        </Box>
    )
}
const MoneyBox = ({ color }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{
            width: '80px', border: "1px solid #2626264D",
            borderRadius: "5px", justifyContent: 'center', position: matchesMobile ? 'absolute' : 'relative', right: matchesMobile ? '-90%' : '7px', alignItems: 'center', display: 'flex', height: '25px', background: '#F6F6F6', borderRadius: '7px', zIndex: 100,
        }}>
            <Typography sx={{ fontSize: '9px', fontWeight: 'bold', color: color }} >-10,00,000</Typography>

        </Box>
    )
}
const Time = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { mobile: '10px', laptop: "12px" }, fontWeight: 'bold', color: '#black', width: { mobile: '40px', laptop: '80px' } }} >5 sec Delay</Typography>
            <img style={{ width: '20px', height: '20px' }} src={TIME} />
        </Box>
    )
}
const Odds = ({ }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box key="odds" sx={{ display: 'flex', backgroundColor: 'white', padding: .2, flexDirection: 'column', marginY: { mobile: '.2vh', laptop: '.5vh' }, width: { mobile: "98%", laptop: '97%' }, marginX: '1vw', alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', } }}>





            <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Match Odds</Typography>
                    <Time />
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
                    <SmallBox />
                    <Typography sx={{ color: 'white', width: '60px', fontSize: { laptop: '9px', mobile: "7px" }, fontWeight: '500', flexWrap: "wrap" }} >Maximum Bet 100000</Typography>
                    <img src={Info} style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '5px' }} />
                </Box>
            </Box >
            {
                <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: '99.7%', alignSelf: 'center' }} >
                    <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                        <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: 4000 MAX:4500</Typography>
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
            <BoxComponent time={true} color={'#46e080'} name={'INDIA'} />
            <Divider />
            <BoxComponent time={true} color={'#FF4D4D'} name={'PAKISTAN'} />
            <Divider />
            <BoxComponent time={true} color={'#F8C851'} name={"DRAW"} />

        </Box >

    )
}
const SeasonMarketBox = ({ index }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ display: 'flex', background: 'white', height: '38px', width: '100%' }} >
            <Box sx={{ display: 'flex', background: 'white', height: '38px', width: '40%', alignItems: 'center' }} >
                <Typography sx={{ color: 'black', fontSize: { laptop: '11px', tablet: '10px', mobile: "8px" }, marginLeft: '7px', fontWeight: '600' }} >6 Over runs INDIA W (INDIA vs PAKISTAN) Adv 0</Typography>
            </Box>
            <Box sx={{ display: 'flex', position: 'relative', background: 'white', height: '38px', width: { laptop: '60%', mobile: '80%' }, justifyContent: 'center', alignItems: 'center' }} >
                <SeperateBox po={1} color={"white"} />
                {matchesMobile && <PlaceBetComponent amount={index == 2} />}
                {false && <>
                    <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                    <SeperateBox po={2} color={"white"} />
                    <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                    <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                    <SeperateBox po={3} color={"white"} /></>}
                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                <SeperateBox po={6} color={"white"} />
                <SeperateBox po={1} session={true} back={true} value={"37"} value2={"100"} lock={index == 2} color={"#F6D0CB"} />

                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                <SeperateBox po={2} session={true} value={"39"} value2={"100"} lock={index == 2} color={"#B3E0FF"} />

                <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                {!matchesMobile && <>
                    <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                    <SeperateBox color={"white"} />
                    <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                    <SeperateBox color={"white"} />
                </>}
                {!matchesMobile && <PlaceBetComponentWeb amount={index == 2} />}
            </Box>
        </Box>
    )
}
const PlaceBetComponent = ({ amount }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(0);
    };
    const [show, setShow] = React.useState(false)
    const innerRef = useOuterClick(ev => {
        setShow(false)
    });


    return (
        <Box sx={{ marginTop: "-8.4vw" }}>
            <Box ref={innerRef} onClick={e => {
                setShow(!show)
            }} sx={{ background: "#0B4F26", position: "relative", flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { laptop: "90px", mobile: '80px' }, borderRadius: '5px', height: '35px', left: '35px', position: 'absolute', zIndex: 100 }} >
                <Box sx={{ background: "#FDF21A", borderRadius: '3px', width: "90%", height: '45%', zIndex: 40, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: 'bold', color: "#FF4D4D" }}>Total Bet : <span style={{ color: "#0B4F26" }} >250</span></Typography>
                </Box>
                <Box sx={{ zIndex: 100 }} >
                    <Typography sx={{ fontSize: { laptop: '10px', mobile: amount ? "10px" : "8px" }, fontWeight: amount ? "bold" : '500', color: "white" }}>{amount ? "-10,000,000" : "Profit/Loss"}</Typography>
                </Box>
            </Box >
            {show && <DropdownMenu style={{ zIbnex: 10 }} open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />}

        </Box>
    )
}
const PlaceBetComponentWeb = ({ amount }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [show, setShow] = React.useState(false)
    const innerRef = useOuterClick(ev => {
        setShow(false)
    });
    return (
        <>
            <Box onClick={e => setShow(!show)} sx={{ background: "#0B4F26", flexDirection: 'row', display: 'flex', alignItems: 'center', paddingX: '.2vw', width: { laptop: "10vw" }, borderRadius: '5px', height: '32px', right: '8px', position: 'absolute' }} >
                <Box sx={{ background: "#FDF21A", borderRadius: '3px', width: "45%", height: '85%', display: "flex", alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: { laptop: '.5vw', }, fontWeight: 'bold', color: "#FF4D4D" }}>Total Bet</Typography>
                    <Typography sx={{ fontSize: { laptop: '.5vw' }, fontWeight: 'bold', color: "#0B4F26" }}>250</Typography>
                </Box>
                <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                    <Typography sx={{ fontSize: { laptop: amount ? ".65vw" : '.6vw' }, fontWeight: amount ? "bold" : '500', color: "white" }}>{amount ? "-100,000,00" : "Profit/Loss"}</Typography>
                    <img
                        src={UD}
                        style={{ width: '12px', height: '12px', marginLeft: '5px' }}
                    />
                </Box>
                {show && <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />}

            </Box >
        </>
    )
}
function useOuterClick(callback) {
    const callbackRef = useRef(); // initialize mutable ref, which stores callback
    const innerRef = useRef(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value 
    useEffect(() => { callbackRef.current = callback; });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e) {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(e.target)
            ) callbackRef.current(e);
        }
    }, []); // no dependencies -> stable click listener

    return innerRef; // convenience for client (doesn't need to init ref himself) 
}
const menutItems = [{ title: "Account Statement" }, { title: "Profile Loss Report" }, { title: "Bet History" }, { title: "Unsetteled Bet" }, { title: "Casino Report History" }, { title: "Set Button Values" }, { title: "Security Auth Verfication" }, { title: "Change Password" }]
const DropdownMenu = ({ anchorEl, open, handleClose }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    return (
        <Box
            sx={{
                borderRadius: "5px",
                border: "1px solid #306A47",
                zIndex: 1001,
                overflow: "hidden",
                top: "35px",
                left: matchesMobile ? "-13%" : "0%",
                position: "absolute"
            }}
        >
            <Box sx={{ minHeight: "100px", flexDirection: "column", backgroundColor: "white", display: "flex" }}>
                <Box sx={{ display: "flex", height: "25px" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>Runs</Typography>
                    </Box>
                    <Box sx={{ width: "90px", display: "flex", borderLeft: "1px solid #306A47", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>Amount</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>40</Typography>
                    </Box>
                    <Box sx={{ width: "90px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>41</Typography>
                    </Box>
                    <Box sx={{ width: "90px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>42</Typography>
                    </Box>
                    <Box sx={{ width: "90px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>43</Typography>
                    </Box>
                    <Box sx={{ width: "90px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>44</Typography>
                    </Box>
                    <Box sx={{ width: "90px", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


const SessionMarket = ({ }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ display: 'flex', background: 'white', padding: .3, flexDirection: 'column', marginY: { mobile: '.2vh', laptop: '.5vh' }, width: { mobile: "98%", laptop: '97%' }, marginX: "1vw", alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', } }}>
            <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Session Odds</Typography>
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
                    <SmallBoxSeason />
                    <Typography sx={{ color: 'white', width: '60px', fontSize: { laptop: '9px', tablet: '9px', mobile: "7px" }, fontWeight: '500', flexWrap: "wrap" }} >Maximum Bet 100000</Typography>
                    <img src={Info} style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '5px' }} />
                </Box>
            </Box >
            <Box sx={{ width: "100%" }}>
                {<Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: '99.7%', alignSelf: 'center' }} >
                    <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                        <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: 4000 MAX:4500</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { laptop: 'center', mobile: 'flex-end' } }} >

                        <Box sx={{ background: "#FF9292", width: { laptop: '16.5%', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >NO</Typography>
                        </Box>
                        <Box sx={{ width: '.35%', display: 'flex' }} ></Box>
                        <Box sx={{ background: "#00C0F9", width: { laptop: '16.5%', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >YES</Typography>
                        </Box>

                        {/* <Box sx={{background:'#FF9292',width:{laptop:"16.5%",mobile:"25%"},height:'100%',display:'flex',justifyContent:"center",alignItems:"center"}}>
                            </Box> */}

                    </Box>
                </Box>}

                <SeasonMarketBox index={1} />
                <Divider />

                <SeasonMarketBox />
                <Divider />
                <SeasonMarketBox />
                <Divider />
                <SeasonMarketBox index={2} />
                <Divider />
                <SeasonMarketBox />
                <Divider />
                <SeasonMarketBox />
                <Divider />
                <SeasonMarketBox />
                <Divider />
            </Box >
        </Box >

    )
}
const BookMarketer = ({ }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ display: 'flex', backgroundColor: 'white', padding: .2, flexDirection: 'column', marginY: { mobile: '.2vh', laptop: '.5vh' }, width: { mobile: "98%", laptop: '97%' }, marginX: '1vw', alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', } }}>
            <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Bookmaker Market</Typography>
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
                    <SmallBox color={"#FF4D4D"} />
                    <Typography sx={{ color: 'white', width: '60px', fontSize: { laptop: '9px', tablet: '9px', mobile: "7px" }, fontWeight: '500', flexWrap: "wrap" }} >Maximum Bet 100000</Typography>
                    <img src={Info} style={{ width: '15px', height: '15px', marginRight: '5px', marginLeft: '5px' }} />
                </Box>
            </Box >
            {
                <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: '99.7%', alignSelf: 'center' }} >
                    <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                        <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: 4000 MAX:4500</Typography>
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
            <Box sx={{ position: 'relative' }}>
                <BoxComponent color={'#46e080'} name={'INDIA'} />
                <Divider />
                <BoxComponent color={'#FF4D4D'} name={'PAKISTAN'} align="end" />
                {!matchesMobile && <Box sx={{ background: 'rgba(0,0,0,1)', width: '60%', marginLeft: '40%', height: '82px', position: 'absolute', top: '.1px', alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                    <img src={BallStart} style={{ width: '113px', height: "32px" }} />
                </Box>}
            </Box>


        </Box >

    )
}
const MatchOdds = ({ }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Odds />
            <BookMarketer />
            <SessionMarket />
        </Box>
    )
}

export default MatchOdds