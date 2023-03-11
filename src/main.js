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
import Admin from "./pages/admin"
// import NewPassword from "../containers/newpassword"
// import ProfitLoss from "../containers/profitLoss"
// import Verification from "../containers/verification"
// import ExportRoutes from "../expert/routes"
// import Rules from "../containers/rules"
// import FairGameAdminRoutes from "../fairgameAdmin/routes/main"
import FairGameWalletRoutes from "./pages/fairGameWallet"
import FairGameAdminRoutes from "./pages/fairGameAdmin"
import MasterRoutes from "./pages/master"
import SuperAdminRoutes from "./pages/superAdmin"
import SuperMasterRoutes from "./pages/superMaster"
import ExpertRoutes from "./pages/expert"
// import SuperMasterRoutes from "../superMaster/routes/main"
// import SuperAdminRoutes from "../superAdmin/routes/main"
// import Master from '../master/routes/main'
import Demo from "./demo"
import Login from "./pages/login"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { anupamBasePath } from "./components/constants"
const Main = () => {
    const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`${anupamBasePath}`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
    return (
        <Routes>
            <Route path="/demo" element={<Demo socket={socket}/>} />
            <Route path="/" element={<Login socket={socket}/>} />
            <Route path="/forget_password" element={<Login socket={socket}/>} />
            <Route path="/verification" element={<Login socket={socket}/>} />
            <Route path="/new_password" element={<Login socket={socket}/>} />
            <Route path="/matches" element={<Matches socket={socket}/>} />
            <Route path="/home" element={<Matches socket={socket}/>} />
            <Route path="/change_button_value" element={<Matches socket={socket}/>} />
            <Route path="/change_password" element={<Matches socket={socket}/>} />
            <Route path="/account_statement" element={<Matches socket={socket}/>} />
            <Route path="/bet_history" element={<Matches socket={socket}/>} />
            <Route path="/profit_loss" element={<Matches socket={socket}/>} />
            <Route path="/rules" element={<Matches socket={socket}/>} />
            <Route path="/admin/*" element={<Admin socket={socket}/>} />
            <Route path="/fairgame_wallet/*" element={<FairGameWalletRoutes />} />
            <Route path="/fairgame_admin/*" element={<FairGameAdminRoutes />} />
            <Route path="/master/*" element={<MasterRoutes />} />
            <Route path="/super_master/*" element={<SuperMasterRoutes />} />
            <Route path="/super_admin/*" element={<SuperAdminRoutes />} />
            <Route path="/expert/*" element={<ExpertRoutes />} />
        </Routes>
    )
}

export default Main
