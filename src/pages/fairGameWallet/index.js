import { Routes, Route, Navigate } from "react-router-dom";
import AccountStatement from "../admin/AccountStatement";
import AddAccountScreen from "../admin/AddAccount";
import ChangePassword from "../admin/ChangePassword";
import CurrentBets from "../admin/CurrentBets";
import GeneralReport from "../admin/GeneralReport";
import MarketAnaylsisContainer from "../admin/MarketAnaylsisContainer";
import NewMatchScreen, { MatchScreen } from "../admin/MatchScreen";
import MatchSubmit from "../admin/MatchSubmit";
import MatchSubmit1 from "../../components/MatchSubmit1";
import ProfitLoss from "../admin/ProfitLoss";
import Reports from "../admin/Reports";
import TotalBets from "../admin/TotalBets";
import CustomHeader from "../../components/CommonMasterAdminLayout/Header";
import Home from "../../components/List_Of_Client";
import DepositWallet from "../../components/DepositWallet";
import DeleteBet from "../admin/DeleteBet";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Authprovider";
import Login from "../expert/Login";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Varification";
import NewPassword from "../NewPassword";
import jwtDecode from "jwt-decode";
const FairGameWalletRoutes = () => {
  const { tokenAdmin } = useContext(AuthContext);
  useEffect(() => {
    if (tokenAdmin != localStorage.getItem("JWTwallet")) {
      window.location.reload();
    }
  }, []);

  function WalletPrivateRoute({ children }) {
    const token = localStorage.getItem("JWTwallet");
    const decodedToken = jwtDecode(token);
    if (decodedToken?.role !== "fairGameWallet") {
      return <Navigate to="/fairgame_wallet" />;
    }
    return children;
  }

  return (
    <>
      {/* <CustomHeader /> */}
      <Routes forceRefresh={true}>
        <Route path="/" element={<Login allowedRole={["fairGameWallet"]} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/list_of_clients"
          element={
            <WalletPrivateRoute>
              <Home />
            </WalletPrivateRoute>
          }
        />
        <Route
          exact
          path="/market_analysis"
          element={
            <WalletPrivateRoute>
              <MarketAnaylsisContainer />
            </WalletPrivateRoute>
          }
        />
        <Route
          exact
          path="/live_market"
          element={
            <WalletPrivateRoute>
              <Home />
            </WalletPrivateRoute>
          }
        />
        <Route exact path="/match" element={<NewMatchScreen />} />
        <Route exact path="/account_statement" element={<AccountStatement />} />
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
        <Route exact path="/credit_reference" element={<DepositWallet />} />
        <Route exact path="/matches" element={<DeleteBet />} />
        <Route exact path="/createTransPassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
};

export default FairGameWalletRoutes;
