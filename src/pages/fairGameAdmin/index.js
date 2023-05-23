import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import CustomHeader from "../../components/CommonMasterAdminLayout/Header";
import Home from "../../components/List_Of_Client";
import DepositWallet from "../../components/DepositWallet";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authprovider";
import Login from "../expert/Login";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Varification";
import NewPassword from "../NewPassword";
import jwtDecode from "jwt-decode";
import PageNotFound from "../../components/PageNotFound";
const AdminRoutes = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = ["/wallet", "/wallet/"].includes(location.pathname);

  function AdminPrivateRoute({ children }) {
    const token = sessionStorage.getItem("JWTwallet");
    const decodedToken = token !== null && jwtDecode(token);
    if (!["fairGameAdmin", "fairGameWallet"].includes(decodedToken?.role)) {
      return <Navigate to="/wallet" />;
    }
    return children;
  }

  return (
    <>
      {isLoginPage ? null : <CustomHeader />}
      <Routes forceRefresh={true}>
        <Route
          path="/"
          element={<Login allowedRole={["fairGameAdmin", "fairGameWallet"]} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/list_of_clients"
          element={
            <AdminPrivateRoute>
              <Home />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/market_analysis"
          element={
            <AdminPrivateRoute>
              <MarketAnaylsisContainer />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/live_market"
          element={
            <AdminPrivateRoute>
              <Home />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/match"
          element={
            <AdminPrivateRoute>
              <NewMatchScreen />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/account_statement"
          element={
            <AdminPrivateRoute>
              <AccountStatement />
            </AdminPrivateRoute>
          }
        />
        <Route exact path="/general_report" element={<GeneralReport />} />
        <Route exact path="/profit_loss" element={<ProfitLoss />} />
        <Route exact path="/add_account" element={<AddAccountScreen />} />
        <Route exact path="/current_bet" element={<CurrentBets />} />
        <Route exact path="/reports" element={<Reports />} />
        <Route exact path="/game_report" element={<Reports />} />
        <Route exact path="/total_bets" element={<TotalBets />} />
        <Route exact path="/change_password" element={<ChangePassword />} />
        <Route exact path="/match_submit" element={<MatchSubmit />} />
        <Route exact path="/match_submit1" element={<MatchSubmit1 />} />
        <Route exact path="/deposit" element={<DepositWallet />} />
        <Route exact path="/withdraw" element={<DepositWallet />} />
        <Route
          exact
          path="/matches"
          element={
            <AdminPrivateRoute>
              <DeleteBet />
            </AdminPrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
