import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CustomHeader, SideBar } from "../../components";

import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import SessionBetSeperate from "../../components/sessionBetSeperate";
import AllRateSeperate from "../../components/AllRateSeperate";

import AccountStatementList from "../../components/AccountStatementList";
import YellowHeader from "../../components/yellowheader";
import ProfitLossComponent from "../../components/ProfitLossComponent";
import { ChangePassword } from "../../components/ChangePassword";
import { AuthContext } from "../../Authprovider";
import constants from "../../components/helper/constants";
import jwtDecode from "jwt-decode";
import { setRole } from "../../newStore";

import Home from "./Home";
import Match from "./Match";
import { memo } from "react";
import Settings from "./Settings";
import DropdownMenu1 from "../../components/CommonMasterAdminLayout/MenuBar";
import MyAccount from "./Settings";
import CustomLoader from "../../components/helper/CustomLoader";
import EventListing from "../../components/EventListing";

const Soccer = ({selected}) => {
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const theme = useTheme();
  // const { currentUser } = useSelector((state) => state?.currentUser);

  const [loader, setLoader] = useState(true);

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          minHeight: "90vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomLoader height={"70vh"} text={"Coming Soon"} />
      </Box>
    </Box>
    

  );
};
export default memo(Soccer);
