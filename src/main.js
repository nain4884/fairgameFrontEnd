import { Routes, Route } from "react-router-dom"
import Matches from "./pages/matches"
import Admin from "./pages/admin"
import FairGameWalletRoutes from "./pages/fairGameWallet"
import FairGameAdminRoutes from "./pages/fairGameAdmin"
import MasterRoutes from "./pages/master"
import SuperAdminRoutes from "./pages/superAdmin"
import SuperMasterRoutes from "./pages/superMaster"
import ExpertRoutes from "./pages/expert"
import Demo from "./demo"
import Login from "./pages/login"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { apiBasePath } from "./components/constants"
import { setRole } from "./components/SetRole"
import { AuthProvider } from "./Authprovider"

const Main = () => {
  const [socket, setSocket] = useState(null);
  const [loginRole, setLoginRole] = useState("")
  const [loginJWT, setLoginJWT] = useState(null)
  useEffect(() => {
    const newSocket = io(`${apiBasePath}`, {
      extraHeaders: {
        Authorization: 'Bearer ' + loginJWT
      }
    });
    setSocket(newSocket);
    return () => newSocket.off();
  }, [setSocket, loginJWT]);
  useEffect(() => {
    setRoleAndJWT()
  }, [window.location.pathname])
  const setRoleAndJWT = () => {
    let { role, JWT } = setRole()
    setLoginRole(role)
    setLoginJWT(JWT)
  }
  return (
    <AuthProvider>
      <Routes>
        <Route path="/demo" element={<Demo />} />
        <Route path="/" element={<Login />} />
        <Route path="/forget_password" element={<Login />} />
        <Route path="/verification" element={<Login />} />
        <Route path="/new_password" element={<Login />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matchDetail" element={<Matches />} />
        <Route path="/change_button_value" element={<Matches />} />
        <Route path="/change_password" element={<Matches />} />
        <Route path="/account_statement" element={<Matches />} />
        <Route path="/bet_history" element={<Matches />} />
        <Route path="/profit_loss" element={<Matches />} />
        <Route path="/rules" element={<Matches />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/fairgame_wallet/*" element={<FairGameWalletRoutes />} />
        <Route path="/fairgame_admin/*" element={<FairGameAdminRoutes />} />
        <Route path="/master/*" element={<MasterRoutes />} />
        <Route path="/super_master/*" element={<SuperMasterRoutes />} />
        <Route path="/super_admin/*" element={<SuperAdminRoutes />} />
        <Route path="/expert/*" element={<ExpertRoutes />} />
      </Routes>
    </AuthProvider>
  )
}

export default Main