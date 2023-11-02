import { memo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "../../components/PageNotFound";
import ForgotPassword from "../ForgotPassword";
import NewPassword from "../NewPassword";
import Verification from "../Varification";
import AddBet from "./AddBet";
import AddBookMakerMarket from "./AddBookMakerMarket";
import AddMatchComp from "./AddMatchComp";
import BetFairOdds from "./BetFairOdds";
import BookMakerMarket from "./BookMakerMarket";
import ChangePassword from "./ChangePassword.js";
import EditMatchComp from "./EditMatchComp";
import Header from "./Header";
import Home1 from "./Home1";
import Live from "./Live";
import Login from "./Login";
import MatchScreen from "./MatchScreen";

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
      {isLoginPage ? null : <Header />}
      <Routes>
        <Route path="/" element={<Login allowedRole={["expert"]} />} />
        <Route
          path="/home"
          element={
            <ExpertPrivateRoute>
              <Home1 />
            </ExpertPrivateRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/live"
          element={
            <ExpertPrivateRoute>
              <Live />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/addBet"
          element={
            <ExpertPrivateRoute>
              <AddBet />
            </ExpertPrivateRoute>
          }
        />{" "}
        {/* Remove when addBet page found */}
        <Route
          path="/match"
          element={
            <ExpertPrivateRoute>
              <BetFairOdds />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/add_match"
          element={
            <ExpertPrivateRoute>
              <AddMatchComp />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/edit_match"
          element={
            <ExpertPrivateRoute>
              <EditMatchComp />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/betodds"
          element={
            <ExpertPrivateRoute>
              <MatchScreen />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/market"
          element={
            <ExpertPrivateRoute>
              <BookMakerMarket />
            </ExpertPrivateRoute>
          }
        />
        <Route
          path="/add_book_maker"
          element={
            <ExpertPrivateRoute>
              {" "}
              <AddBookMakerMarket />
            </ExpertPrivateRoute>
          }
        />
        <Route
          exact
          path="/change_password"
          element={
            <ExpertPrivateRoute>
              <ChangePassword />
            </ExpertPrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default memo(ExportRoutes);
