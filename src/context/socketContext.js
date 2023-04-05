import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { apiBasePath } from "../components/helper/constants";
import { setRole } from "../components/helper/SetRole";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
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
      // console.log("newSocket: " ,newSocket)
      setSocket(newSocket);
    });
    // setTimeout(() => {
    //   console.log("newSocket  ", newSocket);
    //   newSocket.emit("newMessage", "ping");
    //   newSocket.on("newMessage", (value) => {
    //     console.log("value", value);
    //   });
    // }, 3000);
  }, [token]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
