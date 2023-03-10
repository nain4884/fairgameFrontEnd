import { Routes, Route } from "react-router-dom"
// import AdminRoutes from "../admin/routes/main"
// import BetHistory from "../containers/betHistory"
// import AccountStatement from "../containers/AccountStatement"
// import ChangeButtonValue from "../containers/changeButtonValue"
// import ChangePassword from "../containers/changePassword"
// import ForgetPassword from "../containers/forgetPassword"
// import Home from "../containers/home"
// import Login from "../containers/login"
import Matches from "./pages/matches"
// import NewPassword from "../containers/newpassword"
// import ProfitLoss from "../containers/profitLoss"
// import Verification from "../containers/verification"
// import ExportRoutes from "../expert/routes"
// import Rules from "../containers/rules"
// import FairGameAdminRoutes from "../fairgameAdmin/routes/main"
// import FairGameWalletRoutes from "../fairgameWallet/routes/main"
// import SuperMasterRoutes from "../superMaster/routes/main"
// import SuperAdminRoutes from "../superAdmin/routes/main"
// import Master from '../master/routes/main'
import Demo from "./demo"
import Login from "./pages/login"
const Main = () => {
    return (
        <Routes>
            <Route path="/demo" element={<Demo />} />
            <Route path="/" element={<Login />} />
            <Route path="/forget_password" element={<Login />} />
            <Route path="/verification" element={<Login />} />
            <Route path="/new_password" element={<Login />} />
            <Route path="/matches" element={<Matches />} />
            {/* <<Route path="/change_password" element={<ChangePassword />} />
            <Route path="/change_button_value" element={<ChangeButtonValue />} />
            <Route path="/account_statement" element={<AccountStatement />} />
            <Route path="/home" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/bet_history" element={<BetHistory />} />
            <Route path="/profit_loss" element={<ProfitLoss />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/fairgame_admin/*" element={<FairGameAdminRoutes />} />
            <Route path="/fairgame_wallet/*" element={<FairGameWalletRoutes />} />
            <Route path="/super_master/*" element={<SuperMasterRoutes />} />
            <Route path="/super_admin/*" element={<SuperAdminRoutes />} />
            <Route path="/master/*" element={<Master />} />
            <Route path="/expert/*" element={<ExportRoutes />} /> */}
        </Routes>
    )
}

export default Main
