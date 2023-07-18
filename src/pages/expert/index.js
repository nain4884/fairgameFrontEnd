import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home1 from "./Home1";
import Live from "./Live";
import BetFairOdds from "./BetFairOdds";
import MatchScreen from "./MatchScreen";
import BookMakerMarket from "./BookMakerMarket";
import AddBookMakerMarket from "./AddBookMakerMarket";
import Login from "./Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Authprovider";
import AddBet from "./AddBet";
import { memo } from "react";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Varification";
import NewPassword from "../NewPassword";
import PageNotFound from "../../components/PageNotFound";
import ChangePassword from "./ChangePassword.js";
import Header from "./Header";
import AddMatchComp from "./AddMatchComp";

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
