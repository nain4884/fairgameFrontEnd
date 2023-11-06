import { lazy } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import CustomHeader from '../../components/CommonMasterAdminLayout/Header';
const LazyHomeSlide = lazy(() => import('../../components/HomeSlide'));
const LazyAdminInPlay = lazy(() => import('../../components/AdminInplay'));

const LazyDepositWallet = lazy(() => import('../../components/DepositWallet'));
const LazyEmptyComponent = lazy(() =>
  import('../../components/EmptyComponent')
);
const LazyHome = lazy(() => import('../../components/List_Of_Client'));
const LazyMatchSubmit1 = lazy(() => import('../../components/MatchSubmit1'));
const LazyPageNotFound = lazy(() => import('../../components/PageNotFound'));
const LazyForgotPassword = lazy(() => import('../ForgotPassword'));
const LazyNewPassword = lazy(() => import('../NewPassword'));
const LazyVerification = lazy(() => import('../Varification'));
const LazyAccountStatement = lazy(() => import('../admin/AccountStatement'));
const LazyAddAccountScreen = lazy(() => import('../admin/AddAccount'));
const LazyChangePassword = lazy(() => import('../admin/ChangePassword'));
const LazyCurrentBets = lazy(() => import('../admin/CurrentBets'));
const LazyDeleteBet = lazy(() => import('../admin/DeleteBet'));
const LazyEditAccountScreen = lazy(() => import('../admin/EditAccountScreen'));
const LazyGeneralReport = lazy(() => import('../admin/GeneralReport'));
const LazyMarketAnaylsisContainer = lazy(() =>
  import('../admin/MarketAnaylsisContainer')
);
const LazyNewMatchScreen = lazy(() => import('../admin/MatchScreen'));
const LazyMatchSubmit = lazy(() => import('../admin/MatchSubmit'));
const LazyProfitLoss = lazy(() => import('../admin/ProfitLoss'));
const LazyReports = lazy(() => import('../admin/Reports'));
const LazyTotalBets = lazy(() => import('../admin/TotalBets'));
const LazyLogin = lazy(() => import('../expert/Login'));

const AdminRoutes = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = ['/wallet', '/wallet/'].includes(location.pathname);

  function AdminPrivateRoute({ children }) {
    const token = sessionStorage.getItem('JWTwallet');
    const decodedToken = token !== null && jwtDecode(token);
    if (!['fairGameAdmin', 'fairGameWallet'].includes(decodedToken?.role)) {
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
          element={
            <LazyLogin allowedRole={['fairGameAdmin', 'fairGameWallet']} />
          }
        />
        <Route path="/forgotpassword" element={<LazyForgotPassword />} />
        <Route path="/verification" element={<LazyVerification />} />
        <Route path="/newpassword" element={<LazyNewPassword />} />
        <Route
          path="/list_of_clients"
          element={
            <AdminPrivateRoute>
              <LazyHome />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/market_analysis"
          element={
            <AdminPrivateRoute>
              <LazyMarketAnaylsisContainer />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/live_market"
          element={
            <AdminPrivateRoute>
              <LazyAdminInPlay />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/match"
          element={
            <AdminPrivateRoute>
              <LazyNewMatchScreen />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/account_statement"
          element={
            <AdminPrivateRoute>
              <LazyAccountStatement />
            </AdminPrivateRoute>
          }
        />
        <Route exact path="/general_report" element={<LazyGeneralReport />} />
        <Route exact path="/profit_loss" element={<LazyProfitLoss />} />
        <Route exact path="/add_account" element={<LazyAddAccountScreen />} />
        <Route exact path="/edit_account" element={<LazyEditAccountScreen />} />
        <Route exact path="/current_bet" element={<LazyCurrentBets />} />
        <Route exact path="/reports" element={<LazyReports />} />
        <Route exact path="/walletsettings" element={<LazyReports />} />
        <Route exact path="/game_report" element={<LazyReports />} />
        <Route exact path="/total_bets" element={<LazyTotalBets />} />
        <Route exact path="/change_password" element={<LazyChangePassword />} />
        <Route exact path="/match_submit" element={<LazyMatchSubmit />} />
        <Route exact path="/match_submit1" element={<LazyMatchSubmit1 />} />
        <Route exact path="/deposit" element={<LazyDepositWallet />} />
        <Route exact path="/withdraw" element={<LazyDepositWallet />} />
        <Route exact path="/credit_reference" element={<LazyDepositWallet />} />
        <Route
          exact
          path="/matches"
          element={
            <AdminPrivateRoute>
              <LazyDeleteBet />
            </AdminPrivateRoute>
          }
        />

        <Route
          exact
          path="/nav"
          element={
            <AdminPrivateRoute>
              <LazyEmptyComponent admin={true} />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/my-account"
          element={
            <AdminPrivateRoute>
              <LazyHomeSlide />
            </AdminPrivateRoute>
          }
        />
        <Route path="*" element={<LazyPageNotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
