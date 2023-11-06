import jwtDecode from "jwt-decode";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
const HomeSlide = lazy(() => import("../../components/HomeSlide"));
const AdminInPlay = lazy(() => import("../../components/AdminInplay"));
const CustomHeader = lazy(() => import("../../components/CommonMasterAdminLayout/Header"));
const EmptyComponent = lazy(() => import("../../components/EmptyComponent"));
const Home = lazy(() => import("../../components/List_Of_Client"));
const MatchSubmit1 = lazy(() => import("../../components/MatchSubmit1"));
const PageNotFound = lazy(() => import("../../components/PageNotFound"));
const ForgotPassword = lazy(() => import("../ForgotPassword"));
const NewPassword = lazy(() => import("../NewPassword"));
const Verification = lazy(() => import("../Varification"));
const AccountStatement = lazy(() => import("../admin/AccountStatement"));
const AddAccountScreen = lazy(() => import("../admin/AddAccount"));
const ChangePassword = lazy(() => import("../admin/ChangePassword"));
const CurrentBets = lazy(() => import("../admin/CurrentBets"));
const DeleteBet = lazy(() => import("../admin/DeleteBet"));
const EditAccountScreen = lazy(() => import("../admin/EditAccountScreen"));
const GeneralReport = lazy(() => import("../admin/GeneralReport"));
const MarketAnaylsisContainer = lazy(() => import("../admin/MarketAnaylsisContainer"));
const NewMatchScreen = lazy(() => import("../admin/MatchScreen"));
const MatchSubmit = lazy(() => import("../admin/MatchSubmit"));
const ProfitLoss = lazy(() => import("../admin/ProfitLoss"));
const Reports = lazy(() => import("../admin/Reports"));
const TotalBets = lazy(() => import("../admin/TotalBets"));
const Login = lazy(() => import("../expert/Login"));

const MasterRoutes = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = ["/admin", "/admin/"].includes(location.pathname);
  function MasterPrivateRoute({ children }) {
    const token = sessionStorage.getItem("JWTadmin");
    // Conditionally render the header
    const decodedToken = token !== null && jwtDecode(token);
    if (
      !["master", "admin", "superAdmin", "superMaster"].includes(
        decodedToken?.role
      )
    ) {
      return <Navigate to="/admin" />;
    }
    return children;
  }

  return (
    <>
      {isLoginPage ? null : <CustomHeader />}
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
              <AdminInPlay />
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
          path="/edit_account"
          element={
            <MasterPrivateRoute>
              <EditAccountScreen />
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
          path="/matches"
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
         <Route
          exact
          path="/nav"
          element={
            <MasterPrivateRoute>
              <EmptyComponent admin={true} />
            </MasterPrivateRoute>
          }
        />
        <Route
          exact
          path="/my-account"
          element={
            <MasterPrivateRoute>
              <HomeSlide />
            </MasterPrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default MasterRoutes;
