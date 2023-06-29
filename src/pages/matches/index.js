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
import EventListing from "../../components/EventListing";
import DropdownMenu1 from "../../components/CommonMasterAdminLayout/MenuBar";
import MyAccount from "./Settings";
import ChangePasswordComponent from "../../components/ChangePasswordComponent";
import EmptyComponent from "../../components/EmptyComponent";
import Soccer from "./Soccer";

const Matches = () => {
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const [selected, setSelected] = useState(
    location.state?.activeTab || "CRICKET"
  );

  useEffect(() => {
    if (location.state?.activeTab) {
      setSelected(location.state?.activeTab);
    }
  }, [location.state?.activeTab]);

  const theme = useTheme();
  // const { currentUser } = useSelector((state) => state?.currentUser);

  const [loader, setLoader] = useState(true);

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        flex={1}
        sx={[
          { flex: 1, display: "flex" },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
          }),
        ]}
      >
        <SideBar />

        {["INPLAY", "CRICKET"].includes(selected) &&
          window.location.pathname !== "/matchDetail" && (
            <Match
              setLoader={setLoader}
              loader={loader}
              selected={selected}
              setVisible={setVisible}
              // handleClose={handleClose}
            />
          )}
        {window.location.pathname === "/matchDetail" && (
          <Home
            selected={selected}
            setVisible={setVisible}
            visible={visible}
            // handleClose={handleClose}
          />
        )}
        {["MY ACCOUNT"].includes(selected) &&
          window.location.pathname === "/my-account" && (
            <Settings
              selected={selected}
              setVisible={setVisible}
              visible={visible}
              // handleClose={handleClose}
            />
          )}
        {["MY ACCOUNT"].includes(selected) &&
          window.location.pathname === "/change_password" && (
            <ChangePasswordComponent selected={selected} visible={true} />
          )}

        {["EmptyComponent"].includes(selected) &&
          window.location.pathname === "/matches" && (
            <EmptyComponent selected={selected} visible={true} />
          )}
        {["MY ACCOUNT"].includes(selected) &&
          window.location.pathname === "/account_statement" && (
            <AccountStatementList selected={selected} visible={true} />
          )}
        {["MY ACCOUNT"].includes(selected) &&
          window.location.pathname === "/profit_loss" && (
            <AccountStatementList selected={selected} visible={true} />
          )}
        {!["EmptyComponent", "MY ACCOUNT", "INPLAY", "CRICKET"].includes(
          selected
        ) &&
          window.location.pathname === "/comingsoon" && (
            <Soccer selected={selected} visible={true} />
          )}
      </Box>
    </div>
  );
};
export default memo(Matches);
