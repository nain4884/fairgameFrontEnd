import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Matches from ".";
import { CustomHeader } from "../../components";
import PageNotFound from "../../components/PageNotFound";
import ForgotPassword from "../ForgotPassword";
import NewPassword from "../NewPassword";
import Verification from "../Varification";
import Login from "../login";
import Rules from "./Rules";
const USerRoutes = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = ["/",].includes(location.pathname);
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
          path="/inplay"
          element={
            <UserPrivateRoute>
              <Matches />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/comingsoon"
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
        <Route path="/change_button_value" element={<Matches  />} />
        <Route path="/change_password" element={<Matches  />} />
        <Route path="/account_statement" element={<Matches  />} />
        <Route path="/bet_history" element={<Matches />} />
        <Route path="/profit_loss" element={<Matches  />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/my-account" element={<Matches />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default USerRoutes;
