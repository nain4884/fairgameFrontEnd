import { Typography, Box, useMediaQuery, useTheme, Menu, MenuItem, Drawer, AppBar, Toolbar } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Draw, logo, Logout } from "../../assets";
import SearchInput from "../../components/SearchInput";
import SessionTimeOut from "../../components/SessionTimeOut";
import StyledImage from "../../components/StyledImage";
import { stateActions } from "../../store/stateActions";
import { Down } from "../../fairGameWallet/assets";
import { setActiveAdmin } from "../../store/admin";
import SideBarAdmin from "../../components/SideBarAdmin";

const CustomHeader = ({ }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    // const [currentSelected, setCurrentSelected] = useState(0)
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchor, setAnchor] = React.useState(null)
    const [anchor1, setAnchor1] = React.useState(null)

    const currentSelected = useSelector(state => state?.activeAdmin?.activeTabAdmin)
    const location = useLocation();
    React.useEffect(() => {
        if (location.pathname.includes("market_analysis")) {
            dispatch(setActiveAdmin(3))
        } else if (location.pathname.includes("list_of_clients")) {
            dispatch(setActiveAdmin(0))
        } else if (location.pathname.includes("live_market")) {
            dispatch(setActiveAdmin(1))
        } else if (location.pathname.includes("reports") || location.pathname.includes("account_statement") || location.pathname.includes("current_bet") || location.pathname.includes("general_report") || location.pathname.includes("game_report") || location.pathname.includes("profit_loss")) {
            dispatch(setActiveAdmin(2))
        }
    }, [location])
    useEffect(() => {
        console.log(currentSelected, 'admin')
    }, [currentSelected])
    useEffect(() => {
        if (!matchesMobile) {
            setMobileOpen(false)
        }
    }, [matchesMobile])
    const RenderLogo = useCallback(() => {
        return (
            <StyledImage onClick={(e) => {
                e.stopPropagation()
                navigate('/fairgame_wallet/list_of_clients')
            }} src={logo} sx={{ height: { laptop: "45px", mobile: "40px" }, width: "auto", marginLeft: { laptop: "20px", mobile: "10px" } }} />
        )
    }, [])
    return (
        <>
            <SessionTimeOut />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Box sx={[{
                    width: "100%", minHeight: { laptop: 60, tablet: 60, mobile: 60 },
                    display: "flex",
                    flexDirection: matchesMobile ? "column" : "row",
                    alignItems: !matchesMobile ? "center" : "flex-start",
                    justifyContent: "space-between",
                    paddingX: { laptop: "0.5%", mobile: "1%" },
                    paddingY: matchesMobile ? "15px" : "0px",
                    paddingBottom: matchesMobile ? "10px" : "0px"
                }, (theme) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`
                })]}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", flex: 1, }}>
                        <Box sx={{ display: "flex", alignItems: "center", marginRight: "12px" }}>
                            <StyledImage onClick={() => {
                                setMobileOpen(!mobileOpen)
                            }} src={Draw} sx={{ height: { laptop: "24px", mobile: "20px" }, width: "auto" }} />
                            <RenderLogo />
                        </Box>
                        <ButtonHead onClick={() => {
                            dispatch(setActiveAdmin(0))
                            navigate('/fairgame_wallet/list_of_clients')
                        }} title={"LIST OF CLIENTS"} boxStyle={{ backgroundColor: currentSelected == 0 ? "white" : "transparent", justifyContent: "center", borderRadius: "3px", marginLeft: "2%" }} titleStyle={{ color: currentSelected == 0 ? "green" : "white" }} />
                        <LiveMarket onClick={() => {
                            dispatch(setActiveAdmin(1))
                            navigate('/fairgame_wallet/live_market')
                        }} title={"LIVE MARKET"} boxStyle={{ backgroundColor: currentSelected == 1 ? "white" : "transparent", borderRadius: "3px", justifyContent: "center", alignItems: "center", marginLeft: "2%" }} />
                        <ButtonHead selected={currentSelected == 2} report={true} onClick={(e) => {
                            // setCurrentSelected(2)
                            dispatch(setActiveAdmin(2))
                            // navigate('/admin/reports')
                            setAnchor(e.currentTarget)
                        }} title={"REPORTS"} boxStyle={{ backgroundColor: currentSelected == 2 ? "white" : "transparent", borderRadius: "3px", marginLeft: "2%", justifyContent: "center" }} titleStyle={{ color: currentSelected == 2 ? "green" : "white" }} />
                        <ButtonHead onClick={() => {
                            dispatch(setActiveAdmin(3))
                            navigate('/fairgame_wallet/market_analysis')
                        }} title={"MARKET ANALYSIS"}
                            boxStyle={{ backgroundColor: currentSelected == 3 ? "white" : "transparent", borderRadius: "3px", marginLeft: '1.5%', justifyContent: "center" }} titleStyle={{ color: currentSelected == 3 ? "green" : "white" }} />
                        <ButtonHead onClick={(e) => {
                            dispatch(setActiveAdmin(4))
                            // navigate('/fairgame_wallet/wallet')
                            setAnchor1(e.currentTarget)
                        }} title={"WALLET"}
                            report={true} selected={currentSelected == 4} boxStyle={{ backgroundColor: currentSelected == 4 ? "white" : "transparent", width: "90px", borderRadius: "3px", marginLeft: '1.5%', justifyContent: "space-around" }} titleStyle={{ color: currentSelected == 4 ? "green" : "white" }} />

                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", minWidth: matchesMobile ? "100%" : "0px", alignItems: "center", marginTop: matchesMobile ? "15px" : "0px" }}>
                        <SearchInput placeholder={"All Clients..."} header={true} inputContainerStyle={{ height: "30px", minWidth: { laptop: "100px", mobile: "1.5vw" }, width: "140px" }} />
                        <BoxProfile containerStyle={matchesMobile ? { width: "52%" } : {}} image={"https://picsum.photos/200/300"} value={"Super Master"} />
                    </Box>
                </Box>
                {<MobileSideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />}
            </AppBar>
            <DropdownMenu1 open={Boolean(anchor)} anchorEl={anchor} handleClose={() => setAnchor(null)} />
            <DropdownMenu2 open={Boolean(anchor1)} anchorEl={anchor1} handleClose={() => setAnchor1(null)} />
            <Box sx={{ minHeight: { laptop: 60, mobile: 60 + 32 + 42 } }} />
        </>
    )
}
const ButtonHead = ({ title, boxStyle, titleStyle, onClick, report, selected }) => {
    return (
        <Box onClick={(e) => onClick(e)} sx={[{ justifyContent: 'space-between', paddingX: "0.5%", height: "28px", alignItems: 'center', display: 'flex', flexDirection: 'row' }, boxStyle]}>
            <Typography sx={[{ fontSize: "10px", fontWeight: "bold", fontFamily: "Montserrat" }, titleStyle]}>{title}</Typography>
            {
                report && <img src={Down} style={{ width: selected ? '10px' : '0px', height: '6px', marginLeft: '4px', opacity: selected ? 1 : 0 }} />
            }
        </Box>
    )
}
const menutItems1 = [{ title: "Account Statement", link: "/fairgame_wallet/account_statement" }, { title: "Current Bet", link: "/fairgame_wallet/current_bet" }, { title: "General Report", link: "/fairgame_wallet/general_report" },
// { title: "Game Report", link: "/admin/game_report" }, 
{ title: "Profit/Loss", link: "/fairgame_wallet/profit_loss" }]
const DropdownMenu1 = ({ anchorEl, open, handleClose }) => {
    const navigate = useNavigate()
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ marginTop: '2px', paddingY: "0px", padding: "0px" }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                sx: {
                    paddingY: "0px",
                    padding: "0px"
                }
            }}
        >
            {menutItems1.map(x => <MenuItem

                dense={true} sx={{
                    fontSize: { laptop: "11px", mobile: "10px" },
                    fontWeight: "600",
                    marginX: "0px",
                    width: { laptop: "140px", mobile: "170px" },
                    borderBottomWidth: 0,
                    borderColor: "#EAEFEC",
                    paddingY: "-10px",
                    marginTop: "0px",
                    borderStyle: "solid",
                    marginLeft: '-10px',
                    minHeight: '14px',
                    lineHeight: '14px',

                    "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        borderColor: "white",
                        borderRadius: "5px",
                        transform: "scale(1.02)"
                    }
                }} onClick={() => {
                    navigate(x.link)
                    handleClose()
                }}>{x.title}</MenuItem>)}
        </Menu>
    )
}


const menutItems2 = [{ title: "Deposit", link: "/fairgame_wallet/deposit" }, { title: "Withdraw", link: "/fairgame_wallet/withdraw" }]

const DropdownMenu2 = ({ anchorEl, open, handleClose }) => {
    const navigate = useNavigate()
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ marginTop: '2px', paddingY: "0px", padding: "0px" }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                sx: {
                    paddingY: "0px",
                    padding: "0px"
                }
            }}
        >
            {menutItems2.map(x => <MenuItem

                dense={true} sx={{
                    fontSize: { laptop: "11px", mobile: "10px" },
                    fontWeight: "600",
                    marginX: "0px",
                    width: { laptop: "100px", mobile: "170px" },
                    borderBottomWidth: 0,
                    borderColor: "#EAEFEC",
                    paddingY: "-10px",
                    marginTop: "0px",
                    borderStyle: "solid",
                    marginLeft: '-10px',
                    minHeight: '14px',
                    lineHeight: '14px',

                    "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        borderColor: "white",
                        borderRadius: "5px",
                        transform: "scale(1.02)"
                    }
                }} onClick={() => {
                    navigate(x.link)
                    handleClose()
                }}>{x.title}</MenuItem>)}
        </Menu>
    )
}
const LiveMarket = ({ title, boxStyle, titleStyle, onClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const colors = ["#ff0000", "#ffa500", "#ffff00", "orange", "#0000ff", "#4b0082", "#ee82ee"]
    useEffect(() => {
        let i = setInterval(() => {
            setCurrentIndex(state => {
                if (state < 6) {
                    return state + 1
                } else {
                    return 0
                }
            })
        }, 1000)
        return () => {
            clearInterval(i)
        }
    }, [])
    return (
        <Box onClick={e => {
            onClick()
        }} sx={[{ paddingX: "0.5%", display: "flex", height: "28px", alignItems: "center", background: "red", justifyContent: "center" }, boxStyle]}>
            <Typography sx={[{ fontSize: "11px", lineHeight: "12px", fontWeight: "bold", color: colors[currentIndex], fontFamily: "Montserrat" }, titleStyle]}>{title}</Typography>
        </Box>
    )
}

const BoxProfile = ({ image, value, containerStyle }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        console.log(anchorEl)
    }, [anchorEl])
    const handleClose = () => {
        setOpen(false)
    };
    return (
        <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'space-between', minWidth: { laptop: "150px", } }}>
            <Box onClick={(event) => {
                setOpen(!open)
                event?.stopPropagation()
            }} sx={[{ backgroundColor: "primary.main", minWidth: { laptop: "150px", mobile: "90px" }, marginLeft: "1vw", display: "flex", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", justifyContent: "space-between", height: { laptop: "45px", mobile: "35px" }, overflow: "hidden", paddingX: "10px", borderRadius: "5px" }, containerStyle]}>
                <Box style={{}}>
                    <Typography sx={{ fontSize: { laptop: '11px', mobile: "8px" }, color: "text.white", fontWeight: "600" }}>{value}</Typography>
                    <Typography sx={{ fontSize: { laptop: '13px', mobile: "8px" }, color: "text.white", fontWeight: " 700" }}>1,00,000,000</Typography>
                </Box>
                <StyledImage src={ArrowDown} sx={{ height: "6px", width: "10px", marginRight: '5px' }} />
            </Box>
            {open && <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />}
        </Box>
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
const menutItems = [{ title: "Secure Auth Verification" }, { title: "Change Password", link: "/fairgame_wallet/change_password" }]
const DropdownMenu = ({ anchorEl, open, handleClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const innerRef = useOuterClick(ev => {
        handleClose()
    })
    const logoutProcess = () => {
        dispatch(stateActions.logout());
        navigate("/")
        handleClose()
    }
    return (

        <Box
            ref={innerRef}
            sx={{ position: 'absolute', background: 'white', top: '45px', right: 0, paddingY: '10px', paddingX: '2px', borderRadius: '5px', marginTop: '2px' }} >
            {menutItems.map(x => <MenuItem dense={true} sx={{

                fontSize: { laptop: "12px", mobile: "10px" },
                fontWeight: "500",
                marginX: "5px",
                width: { laptop: "200px", mobile: "200px" },
                borderBottomWidth: 1,
                color: 'black',
                borderColor: "#EAEFEC",
                paddingY: "2px",
                borderStyle: "solid",
                "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "white",
                    borderRadius: "5px",
                    transform: "scale(1.02)"
                }
            }} onClick={() => {
                handleClose()
                if (x.link) {
                    navigate(x.link)
                }
            }}>{x.title}</MenuItem>)}
            <Box onClick={() => {
                logoutProcess()
            }} sx={{ borderRadius: "5px", height: { laptop: "38px", mobile: "34px" }, width: "200px", marginLeft: "5px", marginTop: "10px", backgroundColor: "#F1C550", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
            </Box>
        </Box>
    )
}
const MobileSideBar = ({ mobileOpen, setMobileOpen }) => {

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}

            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "300px" },

            }}
        >
            <Box sx={{ minHeight: { laptop: 60, mobile: 60 + 32 } }} />
            <Box sx={{ height: "100vh" }}>
                <SideBarAdmin handleDrawerToggle={handleDrawerToggle} mobileShow={true} />
            </Box>
        </Drawer>
    )
}

export default CustomHeader;