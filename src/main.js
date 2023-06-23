import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Matches from "./pages/matches";

import { AuthProvider } from "./Authprovider";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Varification";
import SmoothScroll from "./components/SmoothScoll";
import NewPassword from "./pages/NewPassword";
import PageNotFound from "./components/PageNotFound";
import NavigateLoader from "./components/NavigateLoader";

const UserRoutes = React.lazy(() => import("./pages/matches/UserRoutes"));
const MasterRoutes = React.lazy(() => import("./pages/master"));
const ExpertRoutes = React.lazy(() => import("./pages/expert"));
const AdminRoutes = React.lazy(() => import("./pages/fairGameAdmin"));

const Main = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<NavigateLoader />}>
        <SmoothScroll />

        <Routes>
          {/* User Routes */}
          {<Route exact path="/*" element={<UserRoutes />} />}
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
      </Suspense>
    </AuthProvider>
  );
};

export default Main;
