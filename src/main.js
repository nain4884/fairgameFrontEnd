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
import { anupamBasePath } from "./components/constants"
import { setRole } from "./components/SetRole"
const Main = () => {
  const [socket, setSocket] = useState(null);
  const [loginRole, setLoginRole] = useState("")
  const [loginJWT, setLoginJWT] = useState(null)
  useEffect(() => {
    // console.log(loginRole,loginJWT)
    const newSocket = io(`${anupamBasePath}`, {
      extraHeaders: {
        Authorization: 'Bearer ' + loginJWT
      }
    });
    setSocket(newSocket);
    return () => newSocket.close();
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
    <Routes>
      <Route path="/demo" element={<Demo socket={socket} />} />
      <Route path="/" element={<Login socket={socket} />} />
      <Route path="/forget_password" element={<Login socket={socket} />} />
      <Route path="/verification" element={<Login socket={socket} />} />
      <Route path="/new_password" element={<Login socket={socket} />} />
      <Route path="/matches" element={<Matches socket={socket} />} />
      <Route path="/home" element={<Matches socket={socket} />} />
      <Route path="/change_button_value" element={<Matches socket={socket} />} />
      <Route path="/change_password" element={<Matches socket={socket} />} />
      <Route path="/account_statement" element={<Matches socket={socket} />} />
      <Route path="/bet_history" element={<Matches socket={socket} />} />
      <Route path="/profit_loss" element={<Matches socket={socket} />} />
      <Route path="/rules" element={<Matches socket={socket} />} />
      <Route path="/admin/*" element={<Admin socket={socket} />} />
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