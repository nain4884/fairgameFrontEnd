import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SideBar } from "../../components";

import { useLocation } from "react-router-dom";



import AccountStatementList from "../../components/AccountStatementList";
import { setRole } from "../../newStore";

import { memo } from "react";
import { toast } from "react-toastify";
import ChangePasswordComponent from "../../components/ChangePasswordComponent";
import EmptyComponent from "../../components/EmptyComponent";
import EventListing from "../../components/EventListing";
import BetHistory from "./BetHistory";
import ChangeButtonValue from "./ChangeButtonValue";
import Home from "./Home";
import Match from "./Match";
import ProfitLoss from "./ProfitLoss";
import Settings from "./Settings";
import Soccer from "./Soccer";

const Matches = () => {
  let { axios } = setRole();
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

  // const { currentUser } = useSelector((state) => state?.currentUser);

  const [loader, setLoader] = useState(true);
  const [passLoader,setPassLoader]=useState(false)


  const changePassword = async (value) => {
    setPassLoader(true)
   setTimeout(async()=>{
    try {
      const payload = {
        OldPassword: value[2].val,
        password: value[3].val,
        confirmpassword: value[4].val,
      };
      const { data } = await axios.post(
        `/fair-game-wallet/updateSelfPassword`,
        payload
      );

      if (data.message === "Password update successfully.") {
        toast.success("Password update successfully.");

      }
      setPassLoader(false)
    } catch (e) {
      // console.log(e.response.data.message);
      toast.error(e.response.data.message);
      setPassLoader(false)
    }
   },1000)
  }

  return (
    <div style={{ height: "120vh", display: "flex", flexDirection: "column" }}>
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
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              // overflowX: "hidden",
              flexDirection: "column",
              flex: 1,
              width: "100%",
              justifyContent: "flex-start",
              // overflowY: "auto",
              alignItems: "flex-start",
            }}
          >
            <EventListing selected={selected} />
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
                <ChangePasswordComponent selected={selected} visible={true} passLoader={passLoader} changePassword={changePassword} />
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
                <ProfitLoss selected={selected} visible={true} />
              )}

            {["MY ACCOUNT"].includes(selected) &&
              window.location.pathname === "/bet_history" && (
                <BetHistory selected={selected} visible={true} />
              )}
            {["MY ACCOUNT"].includes(selected) &&
              window.location.pathname === "/change_button_value" && (
                <ChangeButtonValue selected={selected} visible={true} />
              )}
            {window.location.pathname === "/comingsoon" && (
              <Soccer selected={selected} visible={true} />
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default memo(Matches);
