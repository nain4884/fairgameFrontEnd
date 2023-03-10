import { Routes, Route } from "react-router-dom"
import CustomHeader from "../../admin/components/Header.js"
import AddAccount from "./AddAccount"
const AdminRoutes = () => {
    return (
        <>
            <CustomHeader />
            <Routes>
                {/* <Route path="/list_of_clients" element={<Home />} />
                <Route exact path="/market_analysis" element={<MarketAnaylsisContainer />} />
                <Route exact path="/live_market" element={<LiveMarket />} />
                <Route exact path="/match" element={<MatchScreen />} />
                <Route exact path="/account_statement" element={<AccountStatement />} />
                <Route exact path="/general_report" element={<GeneralReport />} />
                <Route exact path="/profit_loss" element={<ProfitLoss />} /> */}
                <Route exact path="/add_account" element={<AddAccount />} />
                {/* <Route exact path="/current_bet" element={<CurrentBets />} />
                <Route exact path="/delete_bet" element={<DeleteBet />} />
                <Route exact path="/reports" element={<Reports />} />
                <Route exact path="/game_report" element={<Reports />} />
                <Route exact path="/total_bets" element={<TotalBets />} />
                <Route exact path="/change_password" element={<ChangePassword />} />
                <Route exact path="/match_submit" element={<MatchSubmit />} />
                <Route exact path="/match_submit1" element={<MatchSubmit1 />} /> */}
            </Routes>
        </>
    )
}

export default AdminRoutes
