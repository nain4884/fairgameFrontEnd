import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useContext, lazy } from "react";
import { AuthContext } from "../../Authprovider";
import jwtDecode from "jwt-decode";



const LazyAccountStatement = lazy(() => import("../admin/AccountStatement"));
const LazyAddAccountScreen = lazy(() => import("../admin/AddAccount"));
const LazyChangePassword = lazy(() => import("../admin/ChangePassword"));
const LazyCurrentBets = lazy(() => import("../admin/CurrentBets"));
const LazyGeneralReport = lazy(() => import("../admin/GeneralReport"));
const LazyMarketAnaylsisContainer = lazy(() => import("../admin/MarketAnaylsisContainer"));
const LazyMatchScreen = lazy(() => import("../admin/MatchScreen"));
const LazyMatchSubmit = lazy(() => import("../admin/MatchSubmit"));
const LazyMatchSubmit1 = lazy(() => import("../../components/MatchSubmit1"));
const LazyProfitLoss = lazy(() => import("../admin/ProfitLoss"));
const LazyReports = lazy(() => import("../admin/Reports"));
const LazyTotalBets = lazy(() => import("../admin/TotalBets"));
const LazyHome = lazy(() => import("../../components/List_Of_Client"));
const LazyDepositWallet = lazy(() => import("../../components/DepositWallet"));
const LazyDeleteBet = lazy(() => import("../admin/DeleteBet"));
const LazyLogin = lazy(() => import('../expert/Login'));
const LazyForgotPassword = lazy(() => import("../ForgotPassword"));
const LazyVerification = lazy(() => import("../Varification"));
const LazyNewPassword = lazy(() => import("../NewPassword"));
const LazyEditAccountScreen = lazy(() => import("../admin/EditAccountScreen"));

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
      <Route
          path="/"
          element={<LazyLogin allowedRole={["fairGameWallet"]} />}
        />
        <Route path="/forgotpassword" element={<LazyForgotPassword />} />
        <Route path="/verification" element={<LazyVerification />} />
        <Route path="/newpassword" element={<LazyNewPassword />} />
        <Route
          path="/list_of_clients"
          element={
            <WalletPrivateRoute>
              <LazyHome />
            </WalletPrivateRoute>
          }
        />
        <Route
          exact
          path="/market_analysis"
          element={
            <WalletPrivateRoute>
              <LazyMarketAnaylsisContainer />
            </WalletPrivateRoute>
          }
        />
        <Route
          exact
          path="/live_market"
          element={
            <WalletPrivateRoute>
              <LazyHome />
            </WalletPrivateRoute>
          }
        />
        <Route exact path="/match" element={<LazyMatchScreen />} />
        <Route exact path="/account_statement" element={<LazyAccountStatement />} />
        <Route exact path="/general_report" element={<LazyGeneralReport />} />
        <Route exact path="/profit_loss" element={<LazyProfitLoss />} />
        <Route exact path="/add_account" element={<LazyAddAccountScreen />} />
        <Route exact path="/edit_account" element={<LazyEditAccountScreen />} />
        <Route exact path="/current_bet" element={<LazyCurrentBets />} />
        <Route exact path="/reports" element={<LazyReports />} />
        <Route exact path="/game_report" element={<LazyReports />} />
        <Route exact path="/total_bets" element={<LazyTotalBets />} />
        <Route exact path="/change_password" element={<LazyChangePassword />} />
        <Route exact path="/match_submit" element={<LazyMatchSubmit />} />
        <Route exact path="/match_submit1" element={<LazyMatchSubmit1 />} />
        <Route exact path="/deposit" element={<LazyDepositWallet />} />
        <Route exact path="/withdraw" element={<LazyDepositWallet />} />
        <Route exact path="/credit_reference" element={<LazyDepositWallet />} />
        <Route exact path="/matches" element={<LazyDeleteBet />} />
        <Route exact path="/createTransPassword" element={<LazyChangePassword />} />
      </Routes>
    </>
  );
};

export default FairGameWalletRoutes;
