import React, { useContext, useState } from "react";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  logoutMatchDetails,
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../../newStore/reducers/matchDetails";
import { logout, logoutAuth } from "../../newStore/reducers/auth";
import { logoutCurrentUser, removeCurrentUser } from "../../newStore/reducers/currentUser";
import { removeSocket } from "../../components/helper/removeSocket";
import { Box, CircularProgress, Menu, MenuItem } from "@mui/material";
import { StyledImage } from "../../components";
import { Logout } from "../../assets";
import { setRole } from "../../newStore";
import { toast } from "react-toastify";
import { logoutExpertDetails } from "../../newStore/reducers/expertMatchDetails";

const menutItems = [
  { title: "Bet Odds", navigateTo: "betodds" },
  { title: "Market", navigateTo: "market" },
  { title: "Add Book Maker", navigateTo: "add_book_maker" },
  { title: "Add Match", navigateTo: "add_match" },
  { title: "Change Password", navigateTo: "change_password" },
];
const HeaderDropdown = ({ anchorEl, open, handleClose }) => {
  const { axios } = setRole();
  const [loading, setLoading] = useState(false);

  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const { socket, socketMicro } = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutProcess = async () => {
    try {
      setLoading(true);
      setLoading(false);
      dispatch(logoutMatchDetails());
      dispatch(logoutCurrentUser());
      dispatch(logoutAuth());
      dispatch(logoutExpertDetails());
      setGlobalStore((prev) => ({ ...prev, expertJWT: "" }));
      localStorage.removeItem("JWTexpert")
      localStorage.removeItem("role3")
      sessionStorage.removeItem("JWTexpert")
      navigate("/expert");
      handleClose();
      removeSocket();
      socket.disconnect();
      socketMicro.disconnect();
      const { data } = await axios.get("auth/logout");
      if (data?.data == "success logout") {
        toast.success(data?.data);
      }
    } catch (e) {
      toast.error(e.response?.data?.message);
      setLoading(false);
      console.log("error", e.message);
    }
  };
  return (
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menutItems.map((x, i) => (
        <MenuItem
          key={i}
          dense={true}
          sx={{
            fontSize: { laptop: "12px", mobile: "10px" },
            fontWeight: "500",
            marginX: "5px",
            width: { laptop: "200px", mobile: "200px" },
            borderBottomWidth: 1,
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
          }}
          onClick={() => handleClose(x.navigateTo)}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          if (!loading) {
            logoutProcess();
          } else {
            return false;
          }
        }}
        sx={{
          borderRadius: "5px",
          height: { laptop: "38px", mobile: "34px" },
          width: "200px",
          marginLeft: "5px",
          marginTop: "10px",
          backgroundColor: "#F1C550",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={20}
            thickness={4}
            value={60}
          />
        ) : (
          <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
        )}
      </Box>
    </Menu>
  );
};

export default HeaderDropdown;
