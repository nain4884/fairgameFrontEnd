import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Matches from './pages/matches';
import MasterRoutes from './pages/master';
import ExpertRoutes from './pages/expert';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Varification';
import NewPassword from './pages/NewPassword';
import AdminRoutes from './pages/fairGameAdmin';
import USerRoutes from './pages/matches/UserRoutes';
import ModalMUI from '@mui/material/Modal';
import { AuthProvider } from './Authprovider';
import PageNotFound from './components/PageNotFound';
import SmoothScroll from './components/SmoothScoll';
import CustomLoader from './components/helper/CustomLoader';
import { Box } from '@mui/material';
const LazyUserRoutes = lazy(() => import('./pages/matches/UserRoutes'));
const LazyMasterRoutes = lazy(() => import('./pages/master'));
const LazyExpertRoutes = lazy(() => import('./pages/expert'));
const LazyAdminRoutes = lazy(() => import('./pages/fairGameAdmin'));

const Main = () => {
  return (
    <AuthProvider>
      <SmoothScroll />
      <Suspense
        fallback={
          <ModalMUI
            open={true}
            // onClose={setSelected}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: 'white',
                '& > .MuiBackdrop-root': {
                  backdropFilter: 'blur(2px)',
                  backgroundColor: 'white',
                },
              }}
            >
              <CustomLoader text="" />
            </Box>
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
