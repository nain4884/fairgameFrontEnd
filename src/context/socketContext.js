import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import {
  apiBasePath,
  apiMicroBasePath,
  microServiceApiPath,
} from "../components/helper/constants";
import { setRole } from "../newStore";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketMicro, setSocketMicro] = useState(null);
  const { JWT } = setRole()
  const token = "Bearer " + JWT;
  const checkSocket = localStorage.getItem("socket");
  const checkMicroSocket = localStorage.getItem("microSocket");
  useEffect(() => {
    // if (checkSocket != "true") {
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
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, socketMicro }} >{children}</SocketContext.Provider>
  );
};
