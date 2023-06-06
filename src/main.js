import { Routes, Route, Navigate } from "react-router-dom";
import Matches from "./pages/matches";
import MasterRoutes from "./pages/master";
import ExpertRoutes from "./pages/expert";


import { AuthProvider } from "./Authprovider";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Varification";
import NewPassword from "./pages/NewPassword";
import AdminRoutes from "./pages/fairGameAdmin";
import PageNotFound from "./components/PageNotFound";
import USerRoutes from "./pages/matches/UserRoutes";

const Main = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* User Routes */}
        {<Route exact path="/*" element={<USerRoutes />} />}
        {/* Master Routes */}
        <Route exact path="/admin/*" element={<MasterRoutes />} />

        {/* Expert Routes */}
        <Route exact path="/expert/*" element={<ExpertRoutes />} />

        {/* admin Routes */}
        <Route exact path="/wallet/*" element={<AdminRoutes />} />

        {/* <Route exact path="/fairgame_wallet/*" element={<FairGameWalletRoutes />} /> */}
        {/* <Route path="/master/*" element={<MasterRoutes />} /> */}
        {/* <Route path="/super_master/*" element={<SuperMasterRoutes />} /> */}
        {/* <Route path="/super_admin/*" element={<SuperAdminRoutes />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default Main;
