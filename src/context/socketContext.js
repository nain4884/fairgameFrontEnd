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
  const { JWT } = setRole();
  const token = "Bearer " + JWT;

  useEffect(() => {
    // retrieve the socket instances from localStorage
    const storedSocket = JSON.parse(localStorage.getItem("socket"));
    const storedMicroSocket = JSON.parse(localStorage.getItem("microSocket"));

    // initialize new socket instances if there are no stored sockets
    const newSocket =
      storedSocket ||
      io(`${apiBasePath}`, {
        transports: ["websocket"],
        headers: {
          Authorization: `${token}`,
        },
        auth: {
          token: `${token}`,
        },
      });
    const newMicroSocket =
      storedMicroSocket ||
      io(`${microServiceApiPath}`, {
        transports: ["websocket"],
        headers: {
          Authorization: `${token}`,
        },
        auth: {
          token: `${token}`,
        },
      });

    // store the socket instances in state
    setSocket(newSocket);
    setSocketMicro(newMicroSocket);

    // store the socket instances in localStorage when the component unmounts
    return () => {
      console.log('Unmounting')
      localStorage.setItem("socket", JSON.stringify(newSocket));
      localStorage.setItem("microSocket", JSON.stringify(newMicroSocket));
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, socketMicro }}>
      {children}
    </SocketContext.Provider>
  );
};
