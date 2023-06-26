import { memo } from "react";
import StyledImage from "../StyledImage";
import {
  CircularProgress,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowDown, Logout } from "../../assets";
import { removeCurrentUser } from "../../newStore/reducers/currentUser";
import useOuterClick from "../helper/userOuterClick";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setRole } from "../../newStore";
import { useContext } from "react";
import { GlobalStore } from "../../context/globalStore";
import { logout, setPage, setUpdatedTransPasswords } from "../../newStore/reducers/auth";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
} from "../../newStore/reducers/matchDetails";
import { removeSocket } from "../helper/removeSocket";
import { toast } from "react-toastify";
import { SocketContext } from "../../context/socketContext";

const BoxProfile = ({ image, value, containerStyle, amount, nav }) => {
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
      cursor: "pointer",
      minWidth: { laptop: "150px" },
    },
    mainBoxSubsx: [
      {
        backgroundColor: "primary.main",
        minWidth: { laptop: "150px", mobile: "90px" },
        marginLeft: "1vw",
        // marginRight: "1vw",
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

  const DropdownMenu = ({ anchorEl, open, handleClose, nav }) => {
    const { globalStore, setGlobalStore } = useContext(GlobalStore);
    const [loading, setLoading] = useState(false);

    const { axios } = setRole();
    const { socket, socketMicro } = useContext(SocketContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const innerRef = useOuterClick((ev) => {
      handleClose();
    });
    const logoutProcess = async () => {
      try {
        setLoading(true);
        if (nav === "admin") {
          navigate("/admin");
          dispatch(logout({ roleType: "role1" }));
          setGlobalStore((prev) => ({ ...prev, adminWT: "" }));
        }
        navigate(`/${nav}`);
        dispatch(removeCurrentUser());
        dispatch(logout({ roleType: "role2" }));
        dispatch(removeManualBookMarkerRates());
        dispatch(setUpdatedTransPasswords(false));
        dispatch(removeSelectedMatch());
        setGlobalStore((prev) => ({ ...prev, walletWT: "" }));
        handleClose();
        removeSocket();
        socket.disconnect();
        socketMicro.disconnect();
        dispatch(setPage(parseInt(1)));
        setLoading(false);
        const { data } = await axios.get("auth/logout");
        if (data?.data === "success logout") {
          toast.success(data?.data);
        }
      } catch (e) {
        toast.error(e.response?.data?.message);
        setLoading(false);
        console.log("error", e.message);
      }
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
        cursor: "pointer",
      },
      mainBoxSubStyleImagesx: { width: "35%", height: "auto" },
    };
    return (
      <Box ref={innerRef} sx={classes.mainBoxsx}>
        {menutItems?.map((x) => (
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
            if (!loading) {
              logoutProcess();
            } else {
              return false;
            }
          }}
          sx={classes.mainBoxSubsx}
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
            <StyledImage src={Logout} sx={classes.mainBoxSubStyleImagesx} />
          )}
        </Box>
      </Box>
    );
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
          nav={nav}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};
export default memo(BoxProfile);
