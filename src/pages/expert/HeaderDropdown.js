import React, { useContext } from 'react'
import { GlobalStore } from '../../context/globalStore';
import { SocketContext } from '../../context/socketContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeManualBookMarkerRates, removeSelectedMatch } from '../../newStore/reducers/matchDetails';
import { logout } from '../../newStore/reducers/auth';
import { removeCurrentUser } from '../../newStore/reducers/currentUser';
import { removeSocket } from '../../components/helper/removeSocket';
import { Box, Menu, MenuItem } from '@mui/material';
import { StyledImage } from '../../components';
import { Logout } from '../../assets';
import { setRole } from '../../newStore';

const menutItems = [
    { title: "Bet Odds", navigateTo: "betodds" },
    { title: "Market", navigateTo: "market" },
    { title: "Add Book Maker", navigateTo: "add_book_maker" },
    { title: "Add Match", navigateTo: "add_match" },
    { title: "Change Password" },
  ];
  const HeaderDropdown = ({ anchorEl, open, handleClose }) => {
    const { axios } = setRole();

    const { globalStore, setGlobalStore } = useContext(GlobalStore);
    const { socket, socketMicro } = useContext(SocketContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutProcess = async () => {
      dispatch(removeManualBookMarkerRates());
      dispatch(logout({ roleType: "role3" }));
      dispatch(removeSelectedMatch());
      setGlobalStore((prev) => ({ ...prev, expertJWT: "" }));
      await axios.get("auth/logout");
      dispatch(removeCurrentUser());
      navigate("/expert");
      handleClose();
      removeSocket();
      socket.disconnect();
      socketMicro.disconnect();
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
        {menutItems.map((x) => (
          <MenuItem
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
            logoutProcess();
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
          }}
        >
          <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
        </Box>
      </Menu>
    );
  };

export default HeaderDropdown