import { Routes, Route, Navigate } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
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
import SmoothScroll from "./components/SmoothScoll";
import CustomLoader from "./components/helper/CustomLoader";

const LazyUserRoutes = lazy(() => import("./pages/matches/UserRoutes"));
const LazyMasterRoutes = lazy(() => import("./pages/master"));
const LazyExpertRoutes = lazy(() => import("./pages/expert"));
const LazyAdminRoutes = lazy(() => import("./pages/fairGameAdmin"));

const Main = () => {
  return (
    <AuthProvider>
      <SmoothScroll />
      <Suspense fallback={<CustomLoader text="" />}>
        <Routes>
          {/* User Routes */}
          <Route exact path="/*" element={<LazyUserRoutes />} />

          {/* Master Routes */}
          <Route exact path="/admin/*" element={<LazyMasterRoutes />} />

          {/* Expert Routes */}
          <Route exact path="/expert/*" element={<LazyExpertRoutes />} />

          {/* Admin Routes */}
          <Route exact path="/wallet/*" element={<LazyAdminRoutes />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default Main;
