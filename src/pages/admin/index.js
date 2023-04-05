import { Routes, Route } from "react-router-dom"
import ChangePassword from "./ChangePassword.js"
import AccountStatement from "./AccountStatement.js"
import AddAccount from "./AddAccount"
import CurrentBets from "./CurrentBets.js"
import DeleteBet from "./DeleteBet.js"
import GeneralReport from "./GeneralReport.js"
import Home from "./List_Of_Clients.js"
import MarketAnaylsisContainer from "./MarketAnaylsisContainer.js"
import { MatchScreen } from "./MatchScreen.js"
import MatchSubmit from "./MatchSubmit.js"
import ProfitLoss from "./ProfitLoss.js"
import Reports from "./Reports.js"
import TotalBets from "./TotalBets.js"
import MatchSubmit1 from "../../components/MatchSubmit1.js"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Authprovider";
import CustomHeader from "../../components/CommonMasterAdminLayout/Header.js"
const AdminRoutes = () => {
    const { tokenMaster } = useContext(AuthContext);
    useEffect(() => {
        if (tokenMaster != localStorage.getItem('JWTmaster')) {
            window.location.reload()
        }
    }, [])
    return (
        <>
            <CustomHeader />
            <Routes>
                <Route path="/list_of_clients" element={<Home />} />
                <Route exact path="/market_analysis" element={<MarketAnaylsisContainer />} />
                <Route exact path="/live_market" element={<Home />} />
                <Route exact path="/add_account" element={<AddAccount />} />
                <Route exact path="/match" element={<MatchScreen />} />
                <Route exact path="/account_statement" element={<AccountStatement />} />
                <Route exact path="/general_report" element={<GeneralReport />} />
                <Route exact path="/profit_loss" element={<ProfitLoss />} />
                <Route exact path="/current_bet" element={<CurrentBets />} />
                <Route exact path="/delete_bet" element={<DeleteBet />} />
                <Route exact path="/reports" element={<Reports />} />
                <Route exact path="/game_report" element={<Reports />} />
                <Route exact path="/total_bets" element={<TotalBets />} />
                <Route exact path="/match_submit" element={<MatchSubmit />} />
                <Route exact path="/change_password" element={<ChangePassword />} />
                <Route exact path="/match_submit1" element={<MatchSubmit1 />} />
            </Routes>
        </>
    )
}

export default AdminRoutes
