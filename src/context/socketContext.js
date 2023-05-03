import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  apiBasePath,
  apiMicroBasePath,
  microServiceApiPath,
} from "../components/helper/constants";
import { setRole } from "../newStore";
import { GlobalStore } from "./globalStore";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [socket, setSocket] = useState(null);
  const [socketMicro, setSocketMicro] = useState(null);
  const { JWT, role } = setRole();
  const token = "Bearer " + JWT;
  const checkSocket = localStorage.getItem("socket");
  const checkMicroSocket = localStorage.getItem("microSocket");
  const getToken = (tk, rl) => {
    let token = "";
    if (rl === "role4") {
      token = "Bearer " + (tk.userJWT || localStorage.getItem("JWTuser"));
    } else if (rl === "role3") {
      token = "Bearer " + (tk.expertJWT || localStorage.getItem("JWTexpert"));
    }
    return token;
  };
  useEffect(() => {
    // if (checkSocket != "true") {
    const token = getToken(globalStore, role);
    const newSocket = io(`${apiBasePath}`, {
      transports: ["websocket"],
      headers: {
        Authorization: `${token}`,
      },
      auth: {
        token: `${token}`,
      },
    });
    newSocket.on("connect", () => {
      setSocket(newSocket);
      // localStorage.setItem("socket", newSocket.connected)
    });
    // }
    // if (checkSocket != "true") {
    const newMicroSocket = io(`${microServiceApiPath}`, {
      transports: ["websocket"],
      headers: {
        Authorization: `${token}`,
      },
      auth: {
        token: `${token}`,
      },
    });
    newMicroSocket.on("connect", () => {
      setSocketMicro(newMicroSocket);
      // localStorage.setItem("microSocket", newMicroSocket.connected)
    });
    // }
  }, [globalStore, role]);

  return (
    <SocketContext.Provider value={{ socket, socketMicro }}>
      {children}
    </SocketContext.Provider>
  );
};
