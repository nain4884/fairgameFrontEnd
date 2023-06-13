import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ForgotPassword from "../ForgotPassword";
import Verification from "../Varification";
import NewPassword from "../NewPassword";
import PageNotFound from "../../components/PageNotFound";
import Matches from ".";
import { CustomHeader } from "../../components";
import Login from "../login";
import Rules from "./Rules";
import ProfitLoss from "./ProfitLoss";
import BetHistory from "./BetHistory";
import AccountStatement from "./AccountStatement";
import ChangeButtonValue from "./ChangeButtonValue";
import { ChangePassword } from "../../components/ChangePassword";
import SmoothScroll from "../../components/SmoothScoll";
const USerRoutes = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = ["/"].includes(location.pathname);
  function UserPrivateRoute({ children }) {
    const token = sessionStorage.getItem("JWTuser");
    if (!token) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <>
      {isLoginPage ? null : <CustomHeader />}
 
      <Routes>
        <Route path="/" element={<Login allowedRole={["user"]} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/matches"
          element={
            <UserPrivateRoute>
              <Matches />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/matchDetail"
          element={
            <UserPrivateRoute>
              <Matches />
            </UserPrivateRoute>
          }
        />
        <Route path="/change_button_value" element={<ChangeButtonValue />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/account_statement" element={<AccountStatement />} />
        <Route path="/bet_history" element={<BetHistory />} />
        <Route path="/profit_loss" element={<ProfitLoss />} />
        <Route path="/rules" element={<Rules />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default USerRoutes;
