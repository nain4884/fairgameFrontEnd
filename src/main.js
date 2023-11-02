import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import ModalMUI from "@mui/material/Modal";
import { AuthProvider } from "./Authprovider";
import PageNotFound from "./components/PageNotFound";
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
      <Suspense
        fallback={
          <ModalMUI
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              backgroundColor: "white",
              "& > .MuiBackdrop-root" : {
            backdropFilter: "blur(2px)",
            backgroundColor:"white",
          }
            }}
            open={true}
            // onClose={setSelected}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CustomLoader text="" />
          </ModalMUI>
        }
      >
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
