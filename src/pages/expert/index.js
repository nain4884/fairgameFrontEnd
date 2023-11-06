import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { memo, lazy } from "react";

// Lazy-load the components
const LazyPageNotFound = lazy(() => import("../../components/PageNotFound"));
const LazyForgotPassword = lazy(() => import("../ForgotPassword"));
const LazyNewPassword = lazy(() => import("../NewPassword"));
const LazyVerification = lazy(() => import("../Varification"));
const LazyAddBet = lazy(() => import("./AddBet"));
const LazyAddBookMakerMarket = lazy(() => import("./AddBookMakerMarket"));
const LazyAddMatchComp = lazy(() => import("./AddMatchComp"));
const LazyBetFairOdds = lazy(() => import("./BetFairOdds"));
const LazyBookMakerMarket = lazy(() => import("./BookMakerMarket"));
const LazyChangePassword = lazy(() => import("./ChangePassword.js"));
const LazyEditMatchComp = lazy(() => import("./EditMatchComp"));
const LazyHeader = lazy(() => import("./Header"));
const LazyHome1 = lazy(() => import("./Home1"));
const LazyLive = lazy(() => import("./Live"));
const LazyLogin = lazy(() => import("./Login"));
const LazyMatchScreen = lazy(() => import("./MatchScreen"));

const ExportRoutes = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = ["/expert", "/expert/"].includes(location.pathname);

  function ExpertPrivateRoute({ children }) {
    const token = sessionStorage.getItem("JWTexpert");
    if (!token) {
      return <Navigate to="/expert" />;
    }
    return children;
  }

  return (
    <>
      {isLoginPage ? null : (
        <LazyHeader />
      )}
      <Routes>
        <Route path="/" element={<LazyLogin allowedRole={["expert"]} />} />
        <Route
          path="/home"
          element={
            <ExpertPrivateRoute>
              <LazyHome1 />
            </ExpertPrivateRoute>
          }
        />
        <Route path="/forgotpassword" element={<LazyForgotPassword />} />
        <Route path="/verification" element={<LazyVerification />} />
        <Route path="/newpassword" element={<LazyNewPassword />} />
        <Route
          path="/live"
          element={
            <ExpertPrivateRoute>
              <LazyLive />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/addBet"
          element={
            <ExpertPrivateRoute>
              <LazyAddBet />
            </ExpertPrivateRoute>
          }
        />{" "}
        {/* Remove when addBet page found */}
        <Route
          path="/match"
          element={
            <ExpertPrivateRoute>
              <LazyBetFairOdds />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/add_match"
          element={
            <ExpertPrivateRoute>
              <LazyAddMatchComp />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/edit_match"
          element={
            <ExpertPrivateRoute>
              <LazyEditMatchComp />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/betodds"
          element={
            <ExpertPrivateRoute>
              <LazyMatchScreen />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/market"
          element={
            <ExpertPrivateRoute>
              <LazyBookMakerMarket />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/add_book_maker"
          element={
            <ExpertPrivateRoute>
              {" "}
              <LazyAddBookMakerMarket />
            </ExpertPrivateRoute>
          }
        />
        <Route
          exact
          path="/change_password"
          element={
            <ExpertPrivateRoute>
              <LazyChangePassword />
            </ExpertPrivateRoute>
          }
        />
        <Route path="*" element={<LazyPageNotFound />} />
      </Routes>
    </>
  );
};

export default memo(ExportRoutes);
