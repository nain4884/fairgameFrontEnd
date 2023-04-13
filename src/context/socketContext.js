import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { apiBasePath, apiMicroBasePath, microServiceApiPath } from "../components/helper/constants";
import { setRole } from "../newStore";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketMicro, setSocketMicro] = useState(null);
  const {JWT} = setRole()
  const token = "Bearer " + JWT;
  useEffect(() => {
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
    });
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
    });
  }, [token]);
  return (
    <SocketContext.Provider value={{socket,socketMicro}} >{children}</SocketContext.Provider>
  );
};
