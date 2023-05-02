import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Matches from "./pages/matches";
import Admin from "./pages/admin";
import FairGameWalletRoutes from "./pages/fairGameWallet";
import FairGameAdminRoutes from "./pages/fairGameAdmin";
import MasterRoutes from "./pages/master";
import SuperAdminRoutes from "./pages/superAdmin";
import SuperMasterRoutes from "./pages/superMaster";
import ExpertRoutes from "./pages/expert";
import Login from "./pages/login";
import { useEffect, useState } from "react";

import { AuthProvider } from "./Authprovider";
import { setRole } from "./newStore";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Varification";
import NewPassword from "./pages/NewPassword";

const Main = () => {
  const [loginRole, setLoginRole] = useState("");
  const [loginJWT, setLoginJWT] = useState(null);
  const [socketInit, setSocketInit] = useState(null);
  // useEffect(() => {
  //   const newSocket = io);
  //   setSocket(newSocket);
  //   return () => newSocket.off();
  // }, [loginJWT]);

  useEffect(() => {
    setRoleAndJWT();
  }, [window.location.pathname]);

  const setRoleAndJWT = () => {
    let { role, JWT } = setRole();
    setLoginRole(role);
    setLoginJWT(JWT);
  };

  function UserPrivateRoute({ children }) {
    const token = localStorage.getItem("JWTuser");
    if (!token) {
      return <Navigate to="/" />;
    }
    return children;
  }


  return (
    <AuthProvider>
      <Routes>
        {/* User Routes */}
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

        {/* Admin Routes */}
        <Route path="/admin/*" element={<Admin />} />

        {/* Expert Routes */}
        <Route path="/expert/*"  element={
              <ExpertRoutes />
          }  />

        {/* Wallet Routes */}

        <Route path="/change_button_value" element={<Matches />} />
        <Route path="/change_password" element={<Matches />} />
        <Route path="/account_statement" element={<Matches />} />
        <Route path="/bet_history" element={<Matches />} />
        <Route path="/profit_loss" element={<Matches />} />
        <Route path="/rules" element={<Matches />} />
        <Route path="/fairgame_wallet/*" element={<FairGameWalletRoutes />} />
        <Route path="/fairgame_admin/*" element={<FairGameAdminRoutes />} />
        <Route path="/master/*" element={<MasterRoutes />} />
        <Route path="/super_master/*" element={<SuperMasterRoutes />} />
        <Route path="/super_admin/*" element={<SuperAdminRoutes />} />
      </Routes>
    </AuthProvider>
  );
};

export default Main;
