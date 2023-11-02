import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenu1 = ({ anchorEl, open, handleClose,top, nav,menutItems1,title ,activeTab}) => {



  const navigate = useNavigate();
  const classes = {
    Menusx: { marginTop: { mobile: "15px", laptop: "30px", tablet: "18px" }, marginLeft: { mobile: "5px", laptop: "0", tablet: "0" }, paddingY: "0px", padding: "0px", width: { mobile: "105%", laptop: "100%", tablet: "100%" }},
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: { sx: {
      // border: "1px solid #fff", 
      paddingY: "0px", padding: "0px", 
    
      // width: "96.25%", 
      width: "100%", 
      left: "1px !important", 
      top: {laptop: "191px !important", mobile: "170px !important"}, 
      minHeight: "220px", 
      background: "url(/static/media/back.00d2deda3616019e96ee.png)",
      boxShadow: "none",
      // background: "none"
      // left: "27px !important",  
  } },
    MenuItemsx: {
      width: "100%",
      fontSize: { laptop: "16px", mobile: "12px" },
      fontWeight: "600",
      marginX: "0px",
      // width: { laptop: "140px", mobile: "170px" },
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      // paddingY: "-10px",
      marginTop: "0px",
      borderStyle: "solid",
      // marginLeft: "-10px",
      minHeight: {mobile: "30px", laptop: "40px"},
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
  return (
    <>
      <Box sx={{width: "80%"}}>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={classes.Menusx}
          MenuListProps={classes.MenuListProps}
          PaperProps={classes.MenuPaperProps}
        >
          <Box sx={{}}>
            <Typography
              sx={[
                {
                  fontSize: { laptop: "18px", mobile: "16px" },
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  padding: {laptop: "10px 37px", mobile: "10px 20px"},
                  paddingBottom: "15px",
                  color: "#fff",
                  textTransform: "uppercase"
                },

              ]}
            >
              {title}
            </Typography>
            {/* <Box sx={{ height: "1px", background: "#ddd" }}></Box> */}
          </Box>
          <Box sx={{background: "#F8C851", marginLeft: {mobile:"20px",laptop: "37px"},marginRight: "20px", padding: "10px", borderRadius: "5px"}}>

            {menutItems1.map((x, index) => (
              <MenuItem
                key={index}
                dense={true}
                sx={classes.MenuItemsx}
                onClick={() => {
                  navigate(x.link, {
                    state: {
                      activeTab: activeTab,
                    },
                  });
                  handleClose();
                }}
              >
                {x.title}
              </MenuItem>
            ))}
          </Box>
        </Menu>
      </Box>

    </>
  );
};

export default memo(DropdownMenu1);
