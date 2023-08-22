import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StyledImage from "./StyledImage";
import { Logout } from "../assets";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { memo } from "react";
import { logoutMatchDetails } from "../newStore/reducers/matchDetails";
import { logoutCurrentUser } from "../newStore/reducers/currentUser";
import { logoutAuth } from "../newStore/reducers/auth";
import { SocketContext } from "../context/socketContext";
import { GlobalStore } from "../context/globalStore";
import { useState } from "react";

const DropdownMenu = ({ anchorEl, open, handleClose, axios }) => {
  const [loading, setLoading] = useState(false);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket, socketMicro } = useContext(SocketContext);

  const logoutProcess = async () => {
    try {
      // dispatch(setConfirmAuth(false));
      sessionStorage.setItem("JWTuser", null);
      setLoading(true);
      localStorage.setItem("confirmAuth", false);
      handleClose();
      dispatch(logoutMatchDetails());
      dispatch(logoutCurrentUser());
      dispatch(logoutAuth());
      localStorage.removeItem("role4");
      localStorage.removeItem("JWTuser");
      sessionStorage.clear();
      // dispatch(removeCurrentUser());
      // removeSocket();
      // dispatch(logout({ roleType: "role4" }));
      setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
      // dispatch(removeManualBookMarkerRates());
      // dispatch(removeSelectedMatch());
      socket.disconnect();
      socketMicro.disconnect();
      navigate("/");
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
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const menutItems = [{ title: "Rules", link: "/rules" }];
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        sx: {
          marginLeft: matchesMobile ? "7px" : "2px",
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {menutItems?.map((x, idx) => (
        <MenuItem
          key={idx}
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
          onClick={() => {
            if (x.link) {
              navigate(x.link);
            }
            handleClose();
          }}
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
          border: "2px solid #2626264D",
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

export default memo(DropdownMenu);
