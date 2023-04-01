import { Routes, Route } from "react-router-dom"
import Home1 from "./Home1"
import Live from "./Live"
import BetFairOdds from "./BetFairOdds"
import MatchScreen from "./MatchScreen"
import BookMakerMarket from "./BookMakerMarket"
import AddBookMakerMarket from "./AddBookMakerMarket"
import Login from "./Login"
import { useContext } from "react";
import { AuthContext } from "../../Authprovider";
import AddBet from "./AddBet"

const ExportRoutes = () => {
  const { tokenExpert } = useContext(AuthContext);
  if (!tokenExpert) {
    window.location.reload()
  }
    return (
        <Routes>
            <Route path="/home1" element={<Home1 />} />
            <Route path="/live" element={<Live />} />
            <Route path="/addBet" element={<AddBet />} /> {/* Remove when addBet page found */}
            <Route path="/match" element={<BetFairOdds />} />
            <Route path="/add_match" element={<Home1 />} />
            <Route path="/betodds" element={<MatchScreen />} />
            <Route path="/market" element={<BookMakerMarket />} />
            <Route path="/login/:id" element={<Login />} />
            <Route path="/add_book_maker" element={<AddBookMakerMarket />} />
        </Routes>
    )
}
export default ExportRoutes