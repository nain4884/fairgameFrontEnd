import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const menutItems2 = [
  { title: "Deposit", link: "/wallet/deposit" },
  { title: "Withdraw", link: "/wallet/withdraw" },
];

const DropdownMenu2 = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();
  const classes = {
    Menusx: { marginTop: {mobile:"15px" ,laptop:"30px",tablet:"18px"},marginLeft:{mobile:"5px",laptop:"0",tablet:"0"}, paddingY: "0px", padding: "0px",width:{mobile:"105%",laptop:"100%",tablet:"100%"}},
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: { sx: { paddingY: "0px", padding: "0px",width:"100%" } },
    MenuItemsx: {
      fontSize: { laptop: "11px", mobile: "10px" },
      fontWeight: "600",
      marginX: "0px",
      width: "100%",
      // width: { laptop: "100px", mobile: "170px" },
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      paddingY: "-10px",
      marginTop: "0px",
      borderStyle: "solid",
      marginLeft: "-10px",
      minHeight: "14px",
      lineHeight: "14px",
      "&:hover": {
        backgroundColor: "primary.main",
        color: "white",
        borderColor: "white",
        borderRadius: "5px",
        // transform: "scale(1.02)",
      },
    },
  };
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={classes.Menusx}
      MenuListProps={classes.MenuListProps}
      PaperProps={classes.MenuPaperProps}
    >
     
      {menutItems2.map((x, index) => (
        <MenuItem
          key={index}
          dense={true}
          sx={classes.MenuItemsx}
          onClick={() => {
            navigate(x.link, {
              state: {
                activeTab: "wallet",
              },
            });
            handleClose();
          }}
        >
          {x.title}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu2;
