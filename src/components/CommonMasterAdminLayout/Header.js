import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Drawer,
  AppBar,
  Toolbar,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Draw, logo, Logout } from "../../assets";
import SearchInput from "../../components/SearchInput";
import SessionTimeOut from "../../components/helper/SessionTimeOut";
import StyledImage from "../../components/StyledImage";
import { stateActions } from "../../store/stateActions";
import { setActiveAdmin } from "../../store/admin";
import SideBarAdmin from "../../components/sideBar/SideBarAdmin";
import { ThisUseModal } from "../../components/Modal";
import LiveMarket from "./LiveMarket";
import ButtonHead from "./ButtonHead";
import DropdownMenu2 from "./WithrawDepositMenu";
import DropdownMenu1 from "./MenuBar";
import currentUser, {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import { logout } from "../../newStore/reducers/auth";
import { setRole } from "../../newStore";
import { removeSocket } from "../helper/removeSocket";

const CustomHeader = ({ }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [isTransPasswordExist, setIsTransPasswordExist] = useState(false);
  localStorage.getItem("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [anchor1, setAnchor1] = React.useState(null);
  const currentSelected = useSelector(
    (state) => state?.activeAdmin?.activeTabAdmin
  );

  const { userAdmin } = useSelector((state) => state.auth);
  const nav=userAdmin?.role?.roleName==="fairGameAdmin" ? "fairgame_admin" :userAdmin?.role?.roleName === "fairGameWallet" ? "fairgame_wallet" :userAdmin?.role?.roleName==="admin" ? "admin": ""

  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname.includes("market_analysis")) {
      dispatch(setActiveAdmin(3));
    } else if (location.pathname.includes("list_of_clients")) {
      dispatch(setActiveAdmin(0));
    } else if (location.pathname.includes("live_market")) {
      dispatch(setActiveAdmin(1));
    } else if (
      location.pathname.includes("reports") ||
      location.pathname.includes("account_statement") ||
      location.pathname.includes("current_bet") ||
      location.pathname.includes("general_report") ||
      location.pathname.includes("game_report") ||
      location.pathname.includes("profit_loss")
    ) {
      dispatch(setActiveAdmin(2));
    }
    let { transPass, axios, role } = setRole();
    setIsTransPasswordExist(userAdmin?.isTransPasswordCreated);
    getUserDetail(axios, role);
  }, [location, window.location.pathname, userAdmin]);



  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  async function getUserDetail(axios, role) {
    try {
      const { data } = await axios.get("users/profile");
      setBalance(data.data.current_balance);
      dispatch(setCurrentUser(data.data));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);

  const classes = {
    AppBarVal: { zIndex: (theme) => theme.zIndex.drawer + 1 },
    BoxCont1: [
      {
        width: "100%",
        minHeight: { laptop: 60, tablet: 60, mobile: 60 },
        display: "flex",
        flexDirection: matchesMobile ? "column" : "row",
        alignItems: !matchesMobile ? "center" : "flex-start",
        justifyContent: "space-between",
        paddingX: { laptop: "0.5%", mobile: "1%" },
        paddingY: matchesMobile ? "15px" : "0px",
        paddingBottom: matchesMobile ? "10px" : "0px",
      },
      (theme) => ({
        backgroundImage: `${theme.palette.primary.headerGradient}`,
      }),
    ],
    BoxCont1sub1: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      flex: 1,
    },
    BoxCont1sub1sub1: {
      display: "flex",
      alignItems: "center",
      marginRight: "12px",
    },
    BoxCont1sub1sub1StyleImg: {
      height: { laptop: "24px", mobile: "20px" },
      width: "auto",
    },
    RenderLogoCompStyleImg: {
      height: { laptop: "45px", mobile: "40px" },
      width: "auto",
      marginLeft: { laptop: "20px", mobile: "10px" },
    },
    BoxCont1sub1ButtonHead1boxStyle: {
      backgroundColor: currentSelected == 0 ? "white" : "transparent",
      justifyContent: "center",
      borderRadius: "3px",
      marginLeft: "2%",
    },
    BoxCont1sub1LiveMarketboxStyle: {
      backgroundColor: currentSelected == 1 ? "white" : "transparent",
      borderRadius: "3px",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "2%",
    },
    BoxCont1sub1ButtonHead2boxStyle: {
      backgroundColor: currentSelected == 2 ? "white" : "transparent",
      borderRadius: "3px",
      marginLeft: "2%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHeadtitleStylefn: (currentSelected, num) => {
      return { color: currentSelected == num ? "green" : "white" };
    },
    BoxCont1sub1ButtonHead3boxStyle: {
      backgroundColor: currentSelected == 3 ? "white" : "transparent",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHead4boxStyle: {
      backgroundColor: currentSelected == 4 ? "white" : "transparent",
      width: "90px",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "space-around",
    },
    BoxCont1sub2: {
      display: "flex",
      justifyContent: "space-between",
      minWidth: matchesMobile ? "100%" : "0px",
      alignItems: "center",
      marginTop: matchesMobile ? "15px" : "0px",
    },
    BoxCont1sub2SearchInputContStyle: {
      height: "30px",
      minWidth: { laptop: "100px", mobile: "1.5vw" },
      width: "140px",
    },
    BoxCont1sub2BoxProfileContStyle: matchesMobile ? { width: "52%" } : {},
    BoxEnd: { minHeight: { laptop: 60, mobile: 60 + 32 + 42 } },
  };
  const RenderLogo = useCallback(() => {
    return (
      <StyledImage
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/${nav}/list_of_clients`);
        }}
        src={logo}
        sx={classes.RenderLogoCompStyleImg}
      />
    );
  }, []);

  return (
    <>
      <SessionTimeOut />
      <AppBar position="fixed" sx={classes.AppBarVal}>
        <Box sx={classes.BoxCont1}>
          <Box sx={classes.BoxCont1sub1}>
            <Box sx={classes.BoxCont1sub1sub1}>
              <StyledImage
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
                src={Draw}
                sx={classes.BoxCont1sub1sub1StyleImg}
              />
              <RenderLogo />
            </Box>
            <ButtonHead
              onClick={() => {
                dispatch(setActiveAdmin(0));
                navigate(`/${nav}/list_of_clients`);
              }}
              title={"LIST OF CLIENTS"}
              boxStyle={classes.BoxCont1sub1ButtonHead1boxStyle}
              titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                currentSelected,
                0
              )}
            />
            <LiveMarket
              onClick={() => {
                dispatch(setActiveAdmin(1));
                navigate(`/${nav}/live_market`);
              }}
              title={"LIVE MARKET"}
              boxStyle={classes.BoxCont1sub1LiveMarketboxStyle}
            />
            <ButtonHead
              selected={currentSelected == 2}
              report={true}
              onClick={(e) => {
                dispatch(setActiveAdmin(2));
                setAnchor(e.currentTarget);
              }}
              title={"REPORTS"}
              boxStyle={classes.BoxCont1sub1ButtonHead2boxStyle}
              titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                currentSelected,
                2
              )}
            />
            <ButtonHead
              onClick={() => {
                dispatch(setActiveAdmin(3));
                navigate(`/${nav}/market_analysis`);
              }}
              title={"MARKET ANALYSIS"}
              boxStyle={classes.BoxCont1sub1ButtonHead3boxStyle}
              titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                currentSelected,
                3
              )}
            />
            {window.location.pathname.split("/")[1] == "fairgame_wallet" && (
              <ButtonHead
                onClick={(e) => {
                  dispatch(setActiveAdmin(4));
                  // navigate('/fairgame_wallet/wallet')
                  setAnchor1(e.currentTarget);
                }}
                title={"WALLET"}
                report={true}
                selected={currentSelected == 4}
                boxStyle={classes.BoxCont1sub1ButtonHead4boxStyle}
                titleStyle={classes.BoxCont1sub1ButtonHeadtitleStylefn(
                  currentSelected,
                  4
                )}
              />
            )}
          </Box>
          <Box sx={classes.BoxCont1sub2}>
            <SearchInput
              placeholder={"All Clients..."}
              header={true}
              inputContainerStyle={classes.BoxCont1sub2SearchInputContStyle}
            />
            <BoxProfile
              containerStyle={classes.BoxCont1sub2BoxProfileContStyle}
              image={"https://picsum.photos/200/300"}
              value={currentUser?.userName || ""}
              amount={currentUser?.current_balance || ""}
            />
          </Box>
        </Box>
        {
          <MobileSideBar
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        }
        {isTransPasswordExist === "false" &&
          !/createTransPassword/.test(window.location.pathname) && (
            <ThisUseModal
              message="You don't have transaction password"
              buttonMessage="Create Transaction Password"
              navigateTo="createTransPassword"
            />
          )}
      </AppBar>
      <DropdownMenu1
        open={Boolean(anchor)}
        anchorEl={anchor}
        handleClose={() => setAnchor(null)}
      />
      <DropdownMenu2
        open={Boolean(anchor1)}
        anchorEl={anchor1}
        handleClose={() => setAnchor1(null)}
      />
      <Box sx={classes.BoxEnd} />
    </>
  );
};

const BoxProfile = ({ image, value, containerStyle, amount }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    // console.log(anchorEl)
  }, [anchorEl]);
  const handleClose = () => {
    setOpen(false);
  };
  const classes = {
    mainBox: {
      display: "flex",
      position: "relative",
      justifyContent: "space-between",
      minWidth: { laptop: "150px" },
    },
    mainBoxSubsx: [
      {
        backgroundColor: "primary.main",
        minWidth: { laptop: "150px", mobile: "90px" },
        marginLeft: "1vw",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 3px 10px #B7B7B726",
        justifyContent: "space-between",
        height: { laptop: "45px", mobile: "35px" },
        overflow: "hidden",
        paddingX: "10px",
        borderRadius: "5px",
      },
      containerStyle,
    ],
    mainBoxSubSubTypography1sx: {
      fontSize: { laptop: "11px", mobile: "8px" },
      color: "text.white",
      fontWeight: "600",
    },
    mainBoxSubSubTypography2sx: {
      fontSize: { laptop: "13px", mobile: "8px" },
      color: "text.white",
      fontWeight: " 700",
    },
    mainBoxSubStyledImagesx: {
      height: "6px",
      width: "10px",
      marginRight: "5px",
    },
  };
  return (
    <Box sx={classes.mainBox}>
      <Box
        onClick={(event) => {
          setOpen(!open);
          event?.stopPropagation();
        }}
        sx={classes.mainBoxSubsx}
      >
        <Box style={{}}>
          <Typography sx={classes.mainBoxSubSubTypography1sx}>
            {value}
          </Typography>
          <Typography sx={classes.mainBoxSubSubTypography2sx}>
            {amount}
          </Typography>
        </Box>
        <StyledImage src={ArrowDown} sx={classes.mainBoxSubStyledImagesx} />
      </Box>
      {open && (
        <DropdownMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};
function useOuterClick(callback) {
  const callbackRef = useRef(); // initialize mutable ref, which stores callback
  const innerRef = useRef(); // returned to client, who marks "border" element
  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener
  return innerRef; // convenience for client (doesn't need to init ref himself)
}


const DropdownMenu = ({ anchorEl, open, handleClose }) => {
  const { userAdmin } = useSelector((state) => state.auth);
  const nav=userAdmin?.role?.roleName==="fairGameAdmin" ? "fairgame_admin" :userAdmin?.role?.roleName === "fairGameWallet" ? "fairgame_wallet" :userAdmin?.role?.roleName==="admin" ? "admin": ""

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const innerRef = useOuterClick((ev) => {
    handleClose();
  });
  const logoutProcess = () => {
    dispatch(logout({ roleType: "role2" }));
    removeCurrentUser()
    navigate(`/${nav}`);
    handleClose();
    removeSocket();
  };
  const menutItems = [
    { title: "Secure Auth Verification" },
    { title: "Change Password", link: `/${nav}/change_password` },
  ];

  const classes = {
    mainBoxsx: {
      position: "absolute",
      background: "white",
      top: "45px",
      right: 0,
      paddingY: "10px",
      paddingX: "2px",
      borderRadius: "5px",
      marginTop: "2px",
    },
    mainBoxMenuItem: {
      fontSize: { laptop: "12px", mobile: "10px" },
      fontWeight: "500",
      marginX: "5px",
      width: { laptop: "200px", mobile: "200px" },
      borderBottomWidth: 1,
      color: "black",
      borderColor: "#EAEFEC",
      paddingY: "2px",
      borderStyle: "solid",
      "&:hover": {
        backgroundColor: "primary.main",
        color: "white",
        borderColor: "white",
        borderRadius: "5px",
        transform: "scale(1.02)",
      },
    },
    mainBoxSubsx: {
      borderRadius: "5px",
      height: { laptop: "38px", mobile: "34px" },
      width: "200px",
      marginLeft: "5px",
      marginTop: "10px",
      backgroundColor: "#F1C550",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    mainBoxSubStyleImagesx: { width: "35%", height: "auto" },
  };
  return (
    <Box ref={innerRef} sx={classes.mainBoxsx}>
      {menutItems.map((x) => (
        <MenuItem
          dense={true}
          sx={classes.mainBoxMenuItem}
          onClick={() => {
            handleClose();
            if (x.link) {
              navigate(x.link);
            }
          }}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          logoutProcess();
        }}
        sx={classes.mainBoxSubsx}
      >
        <StyledImage src={Logout} sx={classes.mainBoxSubStyleImagesx} />
      </Box>
    </Box>
  );
};
const MobileSideBar = ({ mobileOpen, setMobileOpen }) => {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const classes = {
    Drawersx: {
      display: { xs: "block", sm: "none" },
      "& .MuiDrawer-paper": { boxSizing: "border-box", width: "300px" },
    },
    DrawerBox1sx: { minHeight: { laptop: 60, mobile: 60 + 32 } },
    DrawerBox2sx: { height: "100vh" },
  };
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={classes.Drawersx}
    >
      <Box sx={classes.DrawerBox1sx} />
      <Box sx={classes.DrawerBox2sx}>
        <SideBarAdmin
          handleDrawerToggle={handleDrawerToggle}
          mobileShow={true}
        />
      </Box>
    </Drawer>
  );
};

export default CustomHeader;
