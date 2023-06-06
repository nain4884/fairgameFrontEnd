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

const Matches = () => {
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const selected = location.state?.activeTab || "CRICKET";

  const theme = useTheme();
  // const { currentUser } = useSelector((state) => state?.currentUser);

  const [loader, setLoader] = useState(true);

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  useEffect(() => {
    if (["INPLAY", "CRICKET"].includes(selected)) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [selected]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        flex={1}
        sx={[
          { flex: 1, display: "flex", height: "98vh" },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
          }),
        ]}
      >
        <SideBar />
        {window.location.pathname === "/matches" && (
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
      </Box>
    </div>
  );
};
export default memo(Matches);
