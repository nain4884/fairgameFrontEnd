import { Routes, Route, Navigate } from "react-router-dom";
import Home1 from "./Home1";
import Live from "./Live";
import BetFairOdds from "./BetFairOdds";
import MatchScreen from "./MatchScreen";
import BookMakerMarket from "./BookMakerMarket";
import AddBookMakerMarket from "./AddBookMakerMarket";
import LoginId from "./Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Authprovider";
import AddBet from "./AddBet";
import { memo } from "react";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Varification";
import NewPassword from "../NewPassword";
import Login from "../login";

const ExportRoutes = () => {

  function ExpertPrivateRoute({ children }) {
    const token = localStorage.getItem("JWTexpert");
    if (!token) {
      return <Navigate to="/expert" />;
    }
    return children;
  }

  return (
    <Routes>
      <Route path="/" element={<Login allowedRole={["expert"]}/>} />
      <Route path="/home" element={ <ExpertPrivateRoute><Home1 /></ExpertPrivateRoute> } />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/newpassword" element={<NewPassword />} />
      <Route path="/live" element={<Live />} />
      <Route path="/addBet" element={<AddBet />} />{" "}
      {/* Remove when addBet page found */}
      <Route path="/match" element={<BetFairOdds />} />
      <Route path="/add_match" element={<Home1 />} />
      <Route path="/betodds" element={<MatchScreen />} />
      <Route path="/market" element={<BookMakerMarket />} />
      <Route path="/login/:id" element={<LoginId />} />
      <Route path="/add_book_maker" element={<AddBookMakerMarket />} />
    </Routes>
  );
};
export default memo(ExportRoutes);
