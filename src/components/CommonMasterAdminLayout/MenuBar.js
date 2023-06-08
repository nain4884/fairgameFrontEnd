import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DropdownMenu1 = ({ anchorEl, open, handleClose, nav }) => {

  const menutItems1 = [
    { title: "Account Statement", link: `/${nav}/account_statement` },
    { title: "Current Bet", link: `/${nav}/current_bet` },
    { title: "General Report", link: `/${nav}/general_report` },
    { title: "Profit/Loss", link: `/${nav}/profit_loss` },
  ];

  const navigate = useNavigate();
  const classes = {
    Menusx: { marginTop: "2px", paddingY: "0px", padding: "0px" },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: { sx: { paddingY: "0px", padding: "0px" } },
    MenuItemsx: {
      fontSize: { laptop: "11px", mobile: "10px" },
      fontWeight: "600",
      marginX: "0px",
      width: { laptop: "140px", mobile: "170px" },
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
        transform: "scale(1.02)",
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
      {menutItems1.map((x, index) => (
        <MenuItem
          key={index}
          dense={true}
          sx={classes.MenuItemsx}
          onClick={() => {
            navigate(x.link);
            handleClose();
          }}
        >
          {x.title}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu1;
