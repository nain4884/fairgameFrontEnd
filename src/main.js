import { Routes, Route, Navigate } from "react-router-dom";
import Matches from "./pages/matches";
import MasterRoutes from "./pages/master";
import ExpertRoutes from "./pages/expert";
import Login from "./pages/login";

import { AuthProvider } from "./Authprovider";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Varification";
import NewPassword from "./pages/NewPassword";
import AdminRoutes from "./pages/fairGameAdmin";

const Main = () => {
  function UserPrivateRoute({ children }) {
    const token = sessionStorage.getItem("JWTuser");
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
        <Route path="/change_button_value" element={<Matches />} />
        <Route path="/change_password" element={<Matches />} />
        <Route path="/account_statement" element={<Matches />} />
        <Route path="/bet_history" element={<Matches />} />
        <Route path="/profit_loss" element={<Matches />} />
        <Route path="/rules" element={<Matches />} />
        {/* Master Routes */}
        <Route path="/admin/*" element={<MasterRoutes />} />

        {/* Expert Routes */}
        <Route path="/expert/*" element={<ExpertRoutes />} />

        {/* admin Routes */}
        <Route exact path="/wallet/*" element={<AdminRoutes />} />

        {/* <Route exact path="/fairgame_wallet/*" element={<FairGameWalletRoutes />} /> */}
        {/* <Route path="/master/*" element={<MasterRoutes />} /> */}
        {/* <Route path="/super_master/*" element={<SuperMasterRoutes />} /> */}
        {/* <Route path="/super_admin/*" element={<SuperAdminRoutes />} /> */}
      </Routes>
    </AuthProvider>
  );
};

export default Main;
