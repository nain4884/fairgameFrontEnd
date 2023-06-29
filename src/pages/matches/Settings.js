import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import EventListing from "../../components/EventListing";
import { useNavigate } from "react-router-dom";

const MyAccount = ({ selected }) => {
  const navigate = useNavigate();
  const classes = {
    Menusx: { marginTop: { mobile: "15px", laptop: "30px", tablet: "18px" }, marginLeft: { mobile: "5px", laptop: "0", tablet: "0" }, paddingY: "0px", padding: "0px", width: { mobile: "105%", laptop: "100%", tablet: "100%" } ,  top:{mobile:"-260px"},tablet:"-460px",laptop:"-460px"},
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: { sx: {
      // border: "1px solid #fff", 
      paddingY: "0px", padding: "0px", 
    
      // width: "96.25%", 
      width: "100%", 
      left: "1px !important",  
      minHeight: "220px", 
      background: "url(/static/media/back.00d2deda3616019e96ee.png)",
      boxShadow: "none",
      // background: "none"
      // left: "27px !important",  
  } },
    MenuItemsx: {
      width: "100%",
      fontSize: { laptop: "16px", mobile: "10px" },
      fontWeight: "600",
      marginX: "0px",
      // width: { laptop: "140px", mobile: "170px" },
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      // paddingY: "-10px",
      marginTop: "0px",
      borderStyle: "solid",
      // marginLeft: "-10px",
      minHeight: "40px",
      lineHeight: "18px",
      color: "black",
      "&:hover": {        
        backgroundColor: "#e5b744",
        // color: "white",
        border: 0,

        // transform: "scale(1.02)",
      },
    },
  };

  const menutItems1 = [
    { title: "Account Statement", link: "/account_statement" },
    { title: "Profile/Loss Report", link: "/profit_loss" },
    { title: "Bet History", link: "/bet_history" },
    { title: "Set Button Values", link: "/change_button_value" },
    { title: "Security Auth Verification" },
    { title: "Change Password", link: "/change_password" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <EventListing selected={selected} top={"190px"}/>
      <Box sx={{width: "80%"}}>
        {/* <Menu
          id="basic-menu"
          // anchorEl={anchorEl}
          open={true}
          // onClose={handleClose}
          sx={classes.Menusx}
          MenuListProps={classes.MenuListProps}
          PaperProps={classes.MenuPaperProps}
        > */}
          <Box sx={{}}>
            <Typography
              sx={[
                {
                  fontSize: { laptop: "18px", mobile: "10px" },
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  padding: "10px 37px",
                  paddingBottom: "15px",
                  color: "#fff",
                  textTransform: "uppercase"
                },

              ]}
            >
              My Account
            </Typography>
            {/* <Box sx={{ height: "1px", background: "#ddd" }}></Box> */}
          </Box>
          <Box sx={{background: "#F8C851", marginLeft: "37px",marginRight: "20px", padding: "10px", borderRadius: "5px"}}>

            {menutItems1.map((x, index) => (
              <MenuItem
                key={index}
                dense={true}
                sx={classes.MenuItemsx}
                onClick={() => {
                  navigate(x.link, {
                    state: {
                      activeTab: "MY ACCOUNT",
                    },
                  });
                  // handleClose();
                }}
              >
                {x.title}
              </MenuItem>
            ))}
          </Box>
        {/* </Menu> */}
      </Box>
    </Box>
  );
};

export default MyAccount;
