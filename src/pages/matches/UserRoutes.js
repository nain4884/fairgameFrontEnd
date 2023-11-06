import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import {CustomHeader} from "../../components";
const Matches = lazy(() => import("."));
const PageNotFound = lazy(() => import("../../components/PageNotFound"));
const ForgotPassword = lazy(() => import("../ForgotPassword"));
const NewPassword = lazy(() => import("../NewPassword"));
const Verification = lazy(() => import("../Varification"));
const Login = lazy(() => import("../login"));
const Rules = lazy(() => import("./Rules"));

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
