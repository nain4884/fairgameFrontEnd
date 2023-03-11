import { Routes, Route } from "react-router-dom"
import Home1 from "./Home1"
import Live from "./Live"

const ExportRoutes = () => {
    return (
        <Routes>
            <Route path="/home1" element={<Home1 />} />
            <Route path="/live" element={<Live />} />
            {/* <Route path="/add_match" element={<AddMatch />} />
            <Route path="/betodds" element={<MatchScreen />} />
            <Route path="/login/:id" element={<Login />} />
            <Route path="/market" element={<BookMakerMarket />} />
            <Route path="/add_book_maker" element={<AddBookMakerMarket />} />
            <Route path="/match" element={<BetFairOdds />} /> */}
        </Routes>
    )
}
export default ExportRoutes