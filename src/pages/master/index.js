import { Routes, Route, Navigate } from "react-router-dom";
import AccountStatement from "../admin/AccountStatement";
import AddAccountScreen from "../admin/AddAccount";
import ChangePassword from "../admin/ChangePassword";
import CurrentBets from "../admin/CurrentBets";
import GeneralReport from "../admin/GeneralReport";
import MarketAnaylsisContainer from "../admin/MarketAnaylsisContainer";
import NewMatchScreen, { MatchScreen } from "../admin/MatchScreen";
import MatchSubmit from "../admin/MatchSubmit";
import ProfitLoss from "../admin/ProfitLoss";
import Reports from "../admin/Reports";
import TotalBets from "../admin/TotalBets";
import DeleteBet from "../admin/DeleteBet";
import MatchSubmit1 from "../../components/MatchSubmit1";
import Home from "../../components/List_Of_Client";
import DepositWallet from "../../components/DepositWallet";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Authprovider";
import CustomHeader from "../../components/CommonMasterAdminLayout/Header";
import jwtDecode from "jwt-decode";
import Login from "../expert/Login";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Varification";
import NewPassword from "../NewPassword";
const MasterRoutes = () => {
  function MasterPrivateRoute({ children }) {
    const token = sessionStorage.getItem("JWTmaster");

    const decodedToken = token!==null && jwtDecode(token);
    if (
      !["master", "admin", "superAdmin", "superMaster"].includes(
        decodedToken?.role
      )
    ) {
      return <Navigate to="/master" />;
    }
    return children;
  }

  return (
    <>
      {/* <CustomHeader /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Login
              allowedRole={["master", "admin", "superAdmin", "superMaster"]}
            />
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/list_of_clients"
          element={
            <MasterPrivateRoute>
              <Home />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/market_analysis"
          element={<MarketAnaylsisContainer />}
        />
        <Route
          exact
          path="/live_market"
          element={
            <MasterPrivateRoute>
              <Home />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/match"
          element={
            <MasterPrivateRoute>
              <NewMatchScreen />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/account_statement"
          element={
            <MasterPrivateRoute>
              <AccountStatement />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/general_report"
          element={
            <MasterPrivateRoute>
              <GeneralReport />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/profit_loss"
          element={
            <MasterPrivateRoute>
              <ProfitLoss />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/add_account"
          element={
            <MasterPrivateRoute>
              <AddAccountScreen />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/current_bet"
          element={
            <MasterPrivateRoute>
              <CurrentBets />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/reports"
          element={
            <MasterPrivateRoute>
              <Reports />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/game_report"
          element={
            <MasterPrivateRoute>
              <Reports />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/total_bets"
          element={
            <MasterPrivateRoute>
              <TotalBets />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/change_password"
          element={
            <MasterPrivateRoute>
              <ChangePassword />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/match_submit"
          element={
            <MasterPrivateRoute>
              <MatchSubmit />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/match_submit1"
          element={
            <MasterPrivateRoute>
              <MatchSubmit1 />
            </MasterPrivateRoute>
          }
        />
        {/* <Route exact path="/deposit" element={  <MasterPrivateRoute> <DepositWallet />} / </MasterPrivateRoute>>
        <Route exact path="/withdraw" element={  <MasterPrivateRoute> <DepositWallet />} / </MasterPrivateRoute>> */}
        <Route
          exact
          path="/delete_bet"
          element={
            <MasterPrivateRoute>
              <DeleteBet />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/createTransPassword"
          element={
            <MasterPrivateRoute>
              <ChangePassword />
            </MasterPrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default MasterRoutes;
