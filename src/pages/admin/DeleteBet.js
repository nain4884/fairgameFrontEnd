import React from "react"
import { useTheme } from "@emotion/react"
import { Typography, useMediaQuery, Box, Menu, MenuItem } from "@mui/material"
import { BallStart, INDIA, Lock, PAKISTAN, TIME, UD } from "../../assets/index"
import "../../components/index.css"
import { useDispatch, useSelector } from 'react-redux'
import { setColorValue } from "../../store/selectedColorBox"
import { useState } from "react"
import { StyledImage } from "../../components"
import { Popover } from 'react-tiny-popover'
import { DeleteIcon, LOCKED, LOCKOPEN, LockSolid } from "../../admin/assets"
import { Background, DailogModal } from '../../components/index'
import { useLocation } from "react-router-dom"
import FullAllBets from "../../components/FullAllBets"
import AddNotificationModal from "../../components/AddNotificationModal"
import { setDailogData } from "../../store/dailogModal"

const SeperateBox = ({ color, empty, value, value2, lock, session, back }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    const dispatch = useDispatch()
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    return (
        <>
            <Popover
                isOpen={isPopoverOpen}
                align={matchesMobile ? "end" : "center"}
                positions={['bottom']}
                onClickOutside={() => setIsPopoverOpen(false)}
            >
                <Box onClick={e => {
                    if (lock || color == "white") {
                        return null
                    }
                    setIsPopoverOpen(!isPopoverOpen)
                    dispatch(setColorValue(color))
                }} sx={{ background: lock ? "#FDF21A" : color, border: color != 'white' ? '1px solid #2626264D' : '0px solid white', width: { mobile: '30%', laptop: '5vw' }, height: '94%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                    {!empty && !lock && <Box sx={{ alignItems: 'center', justifyContent: 'space-around' }} >
                        <Typography sx={{ fontSize: '13px', color: color == 'white' ? 'white' : 'black', fontWeight: '700', textAlign: 'center' }} >{value}</Typography>
                        <Typography sx={{ fontSize: '8px', marginTop: -.4, color: color == 'white' ? 'white' : 'black', textAlign: 'center' }} >{value2}</Typography>
                    </Box>}
                    {lock &&
                        <img
                            src={Lock}
                            style={{ width: '10px', height: '15px' }}
                        />}
                </Box>
            </Popover>
        </>
    )
}

const DeleteBet = ({ }) => {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    const location = useLocation()
    const Divider = () => {
        return (
            <Box sx={{ width: '100%', background: 'rgba(211,211,211)', height: '1.5px' }} ></Box>
        )
    }
    const BoxComponent = ({ name, color, align, lock }) => {
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
                </Box>
                <Box sx={{ display: 'flex', background: 'white', height: '40px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { mobile: 'flex-end', laptop: 'flex-end' }, alignItems: 'center' }} >
                    <MoneyBox color={color} />

                    {!lock && <SeperateBox align={align} value={"1.71"} value2={" $23000"} color={matchesMobile ? "white" : "#A7DCFF"} />}
                    {lock && <Box sx={{ height: "94%", background: "#FDF21A", border: "1px solid #2626264D", width: "5vw", justifyContent: "center", alignItems: "center", display: "flex" }} >
                        <StyledImage src={LockSolid} sx={{ height: "20px", width: "20px" }} />
                    </Box>}
                    <Box sx={{ width: '3px', display: 'flex', background: 'pink' }} ></Box>
                    {!lock && <SeperateBox align={align} value={"1.72"} value2={" $23000"} color={matchesMobile ? "white" : "#FFB5B5"} />}
                    {lock && <Box sx={{ height: "94%", background: "#FDF21A", border: "1px solid #2626264D", width: "5vw", justifyContent: "center", alignItems: "center", display: "flex" }} >
                        <StyledImage src={LockSolid} sx={{ height: "20px", width: "20px" }} />
                    </Box>}
                </Box>
            </Box>
        )
    }
    const SmallBox = ({ color }) => {
        return (
            <Box sx={{ width: { laptop: '70px', mobile: '17vw' }, display: 'flex', marginRight: "5px", justifyContent: 'center', alignItems: 'center', height: '30px', background: 'white', borderRadius: '3px' }}>
                <Typography sx={{ fontSize: { laptop: '12px', mobile: '10px' }, fontWeight: 'bold', color: color ? color : '#46e080' }} >+Book.60</Typography>
            </Box>
        )
    }
    const SmallBoxSeason = ({ color }) => {
        return (
            <Box sx={{ width: { laptop: '85px', mobile: '17vw' }, flexDirection: 'column', position: 'absolute', display: 'flex', marginRight: '5px', justifyContent: 'center', alignItems: 'center', height: '30px', background: 'white', borderRadius: '3px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#FF4D4D' }} >Session Bets</Typography>
                <Typography sx={{ fontSize: '10px', fontWeight: 'bold', color: "#0B4F26" }} >999</Typography>

            </Box>
        )
    }
    const MoneyBox = ({ color }) => {
        const theme = useTheme()
        const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
        return (
            <Box sx={{
                width: '80px',
                borderRadius: "5px", justifyContent: 'center', position: matchesMobile ? 'absolute' : 'relative', right: matchesMobile ? '-90%' : '20px', alignItems: 'center', display: 'flex', height: '25px', borderRadius: '7px'
            }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 'bold', color: color }} >+600,000,000</Typography>

            </Box>
        )
    }

    const Odds = ({ }) => {
        const theme = useTheme()
        const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
        return (
            <Box key="odds" sx={{ position: 'relative', display: 'flex', backgroundColor: 'white', padding: .2, flexDirection: 'column', width: "100%", marginTop: "10px", alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', position: 'relative' } }}>
                <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                    <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Match Odds</Typography>
                    </Box>
                    <Box sx={{
                        flex: .1, background: '#262626'
                    }}>
                        <div class="slanted"></div>
                    </Box>
                    <Box sx={{
                        flex: 1, background: '#262626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <SmallBox />
                    </Box>
                </Box >
                <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', borderTop: "2px solid white", width: '99.7%', alignSelf: 'center' }} >
                    <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                        <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: 4000 MAX:4500</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { laptop: 'flex-end', mobile: 'flex-end' } }} >
                        <Box sx={{ background: "#00C0F9", border: "1px solid #2626264D", width: { laptop: '5vw', mobile: "20%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >Back</Typography>
                        </Box>
                        <Box sx={{ width: '3px', display: 'flex', background: "white" }} ></Box>
                        <Box sx={{ background: "#FF9292", border: "1px solid #2626264D", width: { laptop: '5vw', mobile: "20%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >Lay</Typography>
                        </Box>
                        <Box sx={{ width: '.7px', display: 'flex', background: "white" }} ></Box>
                    </Box>
                </Box>
                <Box sx={{ position: 'relative', width: '99.8%', background: "red" }}>
                    <BoxComponent color={'#46e080'} name={'INDIA'} />
                    <Divider />
                    <BoxComponent color={'#FF4D4D'} name={'PAKISTAN'} align="end" />
                </Box>
            </Box >

        )
    }
    const SeasonMarketBox = ({ index, setData, data }) => {
        const theme = useTheme()
        const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
        return (
            <div>
                <Box sx={{ display: 'flex', background: 'white', height: '38px', width: '100%' }} >
                    <Box sx={{ display: 'flex', background: 'white', height: '38px', width: '40%', alignItems: 'center' }} >
                        <Typography sx={{ color: 'black', fontSize: { laptop: '11px', tablet: '10px', mobile: "8px" }, marginLeft: '7px', fontWeight: '600' }} >6 Over runs INDIA W (INDIA vs PAKISTAN) Adv 0</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', position: 'relative', background: 'white', height: '38px', width: { laptop: '60%', mobile: '80%' }, justifyContent: 'flex-end', alignItems: 'center' }} >
                        {<PlaceBetComponentWeb amount={index == 2} onClick={() => {
                            if (data.includes(index)) {
                                let x = [...data]
                                x.splice(x.indexOf(index), 1)
                                setData([...x])
                            }
                            else {
                                if (data.length < 4) {
                                    let x = [...data]
                                    setData([...x, index])
                                }
                            }
                        }} />}
                        <SeperateBox color={"white"} />
                        <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                        <SeperateBox color={"white"} />
                        <SeperateBox session={true} back={true} value={"37"} value2={"100"} lock={index == 2} color={"#F6D0CB"} />
                        <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                        <SeperateBox session={true} value={"39"} value2={"100"} lock={index == 2} color={"#B3E0FF"} />
                        <Box sx={{ width: '.45%', display: 'flex', background: 'pink' }} ></Box>
                        {index == 1 && <Box sx={{ width: '10.2vw', right: "2px", display: 'flex', position: 'absolute', height: '100%', background: 'rgba(0,0,0,1)', justifyContent: 'center ', alignItems: 'center' }}>
                            <img src={BallStart} style={{ width: '60px', height: '17px' }} />
                        </Box>}
                    </Box>

                </Box>
                <Divider></Divider>

            </div>
        )
    }
    const PlaceBetComponent = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(0);
        };
        return (
            <>
                <Box onClick={e => handleClick(e)} sx={{ background: "#0B4F26", flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { laptop: "90px", mobile: '80px' }, borderRadius: '5px', height: '35px', left: '35px', position: 'absolute' }} >
                    <Box sx={{ background: "#FDF21A", borderRadius: '3px', width: "90%", height: '45%', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: 'bold', color: "#FF4D4D" }}>Total Bet : <span style={{ color: "#0B4F26" }} >250</span></Typography>
                    </Box>
                    <Box >
                        <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: '500', color: "white" }}>Profit/Loss</Typography>

                    </Box>
                </Box >
                <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />

            </>
        )
    }
    const PlaceBetComponentWeb = ({ onClick, amount }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <>
                <Box
                    onClick={onClick}
                    sx={{ background: "#0B4F26", flexDirection: 'row', display: 'flex', alignItems: 'center', paddingX: '.2vw', width: "10vw", borderRadius: '5px', height: '32px', right: '11vw', position: 'absolute' }} >
                    <Box sx={{ background: "#FDF21A", borderRadius: '3px', width: "45%", height: '85%', display: "flex", alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '.5vw', fontWeight: 'bold', color: "#FF4D4D" }}>Total Bet</Typography>
                        <Typography sx={{ fontSize: '.5vw', fontWeight: 'bold', color: "#0B4F26" }}>250</Typography>
                    </Box>
                    <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                        <Typography sx={{ fontSize: { laptop: amount ? ".65vw" : '.6vw' }, fontWeight: amount ? "bold" : '500', color: "white" }}>{!amount ? "Profit/Loss" : "-10,000,00"}</Typography>
                        <img
                            src={UD}
                            style={{ width: '12px', height: '12px', marginLeft: '5px' }}
                        />
                    </Box>
                </Box >
                <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />

            </>
        )
    }
    const menutItems = [{ title: "Account Statement" }, { title: "Profile Loss Report" }, { title: "Bet History" }, { title: "Unsetteled Bet" }, { title: "Casino Report History" }, { title: "Set Button Values" }, { title: "Security Auth Verfication" }, { title: "Change Password" }]
    const DropdownMenu = ({ anchorEl, open, handleClose }) => {
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    sx: {
                        paddingY: "0px"
                    }
                }}
                PaperProps={
                    {
                        sx: {
                            borderRadius: "5px",
                            border: "1px solid #306A47",

                        }
                    }
                }
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
            </Menu>
        )
    }
    const SessionMarket = ({ }) => {
        const theme = useTheme()
        const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
        const [showUnlock, setShowUnlock] = useState(false)
        const [locked, setLocked] = useState(false)
        const [data, setData] = useState([])
        return (
            <>
                <Box sx={{ display: 'flex', position: "relative", background: 'white', padding: .3, flexDirection: 'column', marginBottom: "10px", width: { laptop: '100%' }, alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', } }}>
                    <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                        <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Session Odds</Typography>
                        </Box>
                        <Box sx={{
                            flex: .1, background: '#262626'
                        }}>
                            <div class="slanted"></div>

                        </Box>
                        <Box sx={{
                            flex: 1, background: '#262626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <SmallBoxSeason />
                        </Box>
                    </Box >
                    <Box sx={{ width: "100%", alignItems: 'center', display: 'flex', flexDirection: 'column', overflowY: 'auto', }}>
                        {<Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: '99.7%', alignSelf: 'center' }} >
                            <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                                <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: 4000 MAX:4500</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { laptop: 'flex-end', mobile: 'flex-end' } }} >
                                <Box sx={{ background: "#FF9292", width: { laptop: '5vw', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                    <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >BACK</Typography>
                                </Box>
                                <Box sx={{ width: '3px', display: 'flex', background: "white" }} ></Box>
                                <Box sx={{ background: "#00C0F9", width: { laptop: '5vw', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                    <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >LAY</Typography>
                                </Box>
                            </Box>
                        </Box>}

                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '200px', width: '100%', position: 'relative' }}>
                            <SeasonMarketBox data={data} setData={setData} index={1} />
                            <Divider />
                            <SeasonMarketBox data={data} index={2} setData={setData} />
                            <Divider />
                            <SeasonMarketBox data={data} index={3} setData={setData} />
                            <Divider />
                            <SeasonMarketBox data={data} index={4} setData={setData} />
                            <Divider />
                            <SeasonMarketBox data={data} index={5} setData={setData} />
                            <Divider />
                            <SeasonMarketBox data={data} index={6} setData={setData} />
                            <Divider />
                            <SeasonMarketBox data={data} index={7} setData={setData} />
                            <Divider />
                        </Box>
                    </Box >
                    {/* {showUnlock && <Box sx={{ position: 'absolute', width: '100%', background: 'transparent', alignSelf: 'center', position: 'absolute', marginTop: '38px', left: '20%' }}>
                    <UnlockComponent
                        unlock={locked}
                        title={(locked ? "Unlock " : "Lock ") + "Session Market"} onSubmit={(i) => {
                            if (i) {
                                setLocked(!locked)
                            }
                            setShowUnlock(false)
                        }} />
                </Box>} */}
                </Box >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {data.map((x, i) => {
                        return <RunsBox margin={i != 0} />
                    })}
                </Box>
            </>
        )
    }
    const BookMarketer = ({ }) => {
        const theme = useTheme()
        const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
        const [showUnlock, setShowUnlock] = useState(false)
        const [locked, setLocked] = useState(false)
        return (
            <Box sx={{ display: 'flex', position: "relative", backgroundColor: 'white', padding: .2, flexDirection: 'column', marginY: "10px", width: "100%", alignSelf: { mobile: 'center', tablet: 'center', laptop: 'flex-start', } }}>
                <Box sx={{ display: 'flex', height: 38, flexDirection: 'row', width: '99.7%', alignSelf: 'center' }}>
                    <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Bookmaker Market</Typography>
                    </Box>
                    <Box sx={{
                        flex: .1, background: '#262626'
                    }}>
                        <div class="slanted"></div>
                    </Box>
                    <Box sx={{
                        flex: 1, background: '#262626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <SmallBox color={"#FF4D4D"} />
                    </Box>
                </Box >
                <Divider />
                {
                    <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: '99.7%', alignSelf: 'center' }} >
                        <Box sx={{ display: 'flex', background: "'#319E5B'", height: '25px', width: '40%', alignItems: 'center' }} >
                            <Typography sx={{ color: 'white', fontSize: { laptop: '11px', mobile: "9px" }, marginLeft: '7px' }} >MIN: 4000 MAX:4500</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', background: '#319E5B', height: '25px', width: { laptop: '60%', mobile: '80%' }, justifyContent: { laptop: 'flex-end', mobile: 'flex-end' } }} >
                            <Box sx={{ background: "#00C0F9", width: { laptop: '5vw', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >Back</Typography>
                            </Box>
                            <Box sx={{ width: '3px', display: 'flex', background: "white" }} ></Box>
                            <Box sx={{ background: "#FF9292", width: { laptop: '5vw', mobile: "25%" }, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '600' }} >Lay</Typography>
                            </Box>
                        </Box>
                    </Box>
                }
                <Box sx={{ position: 'relative', width: "99.8%" }}>
                    <BoxComponent color={'#46e080'} name={'INDIA'} />
                    <Divider />
                    <BoxComponent color={'#FF4D4D'} lock={true} name={'PAKISTAN'} align="end" />
                </Box>
            </Box >

        )
    }
    const RunsBox = ({ margin }) => {
        return (
            <Box sx={{ minHeight: "100px", flexDirection: "column", borderRadius: '5px', overflow: "hidden", border: "1px solid #0B4F26 ", marginLeft: margin ? "10px" : "0px", backgroundColor: "white", display: "flex", width: '25%', }}>
                <Box sx={{ display: "flex", height: "25px", width: "100%", background: '#0B4F26', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '600' }}>6 Over runs INDIA</Typography>
                </Box>
                <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
                    <Box sx={{ display: "flex", height: "25px" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>Runs</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>Amount</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>40</Typography>
                        </Box>
                        <Box sx={{ width: '80%', display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>41</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>42</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>43</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>44</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>44</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>44</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", height: "25px", borderTop: "1px solid #306A47" }}>
                        <Box sx={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}>44</Typography>
                        </Box>
                        <Box sx={{ width: "80%", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "12px", color: "white" }}>4,02,350</Typography>
                            <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    const [mode, setMode] = useState(false)
    const CustomButton = () => {
        return (
            <Box onClick={() => {
                if (mode) {
                    setVisible(true)
                }
                else {
                    setMode(!mode)

                }
            }} sx={{ width: "150px", marginY: '.75%', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', background: "#E32A2A", height: '35px', border: '1.5px solid white', display: 'flex', alignSelf: 'flex-end' }}>
                <Typography style={{ fontWeight: '600', fontSize: '13px', color: 'white', marginRight: '10px' }} >{mode ? "Delete" : "Delete Bet"}</Typography>
                <img src={DeleteIcon} style={{ width: '17px', height: '20px' }} />
            </Box>
        )
    }
    const CancelButton = () => {
        return (
            <Box onClick={() => {

                setMode(!mode)
            }} sx={{ width: "150px", marginY: '.75%', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', background: "#f1c550", height: '35px', border: '1.5px solid white', display: 'flex', alignSelf: 'flex-end' }}>
                <Typography style={{ fontWeight: '600', fontSize: '13px', color: 'black', marginRight: '10px' }} >{"Cancel"}</Typography>
            </Box>
        )
    }
    const dispatch = useDispatch()
    return (
        <Background>
            <AddNotificationModal value={value} title={'Add Remark'} visible={visible} onDone={() => {
                dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deleted Sucessfully" }))
            }} setVisible={() => {
                setVisible(false)
                setMode(!mode)
            }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, height: '100%', marginX: "0.5%" }}>
                <Box sx={{ flex: 1, flexDirection: 'column', minHeight: "100px", display: 'flex' }}>
                    <Typography sx={{ fontSize: '16px', color: 'white', fontWeight: '700', paddingTop: '2%', alignSelf: 'start', }} >INDIA V/S PAKISTAN</Typography>
                    <Odds />
                    <BookMarketer />
                    <SessionMarket />
                </Box>
                <Box sx={{ width: "20px" }} />
                <Box sx={{ flex: 1, flexDirection: 'column', display: 'flex', minHeight: "100px" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        {mode && <CancelButton />}
                        <Box sx={{ width: '2%' }} ></Box>
                        <CustomButton />
                    </Box>
                    <FullAllBets mode={mode} tag={false} />
                </Box>
            </Box>
            <DailogModal />
        </Background>
    )
}

export default DeleteBet;