import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  apiBasePath,
  apiMicroBasePath,
  microServiceApiPath,
} from "../components/helper/constants";
import { setRole } from "../newStore";
import { GlobalStore } from "./globalStore";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const location = useLocation();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [socket, setSocket] = useState(null);
  const [socketMicro, setSocketMicro] = useState(null);
  const { JWT, role } = setRole();
  const token = "Bearer " + JWT;
  const checkSocket = localStorage.getItem("socket");
  const checkMicroSocket = localStorage.getItem("microSocket");
  console.log("nav", location);
  const getToken = (tk, rl) => {
    let token = "";
    if (rl === "role4") {
      token = "Bearer " + (tk.userJWT || sessionStorage.getItem("JWTuser"));
    } else if (rl === "role3") {
      token = "Bearer " + (tk.expertJWT || sessionStorage.getItem("JWTexpert"));
    } else if (rl === "role2") {
      token = "Bearer " + (tk.adminWT || sessionStorage.getItem("JWTwallet"));
    }
    if (rl === "role1") {
      token = "Bearer " + (tk.walletWT || sessionStorage.getItem("JWTadmin"));
    }
    return token;
  };
  useEffect(() => {
    try {
      const token = getToken(globalStore, role);
      if (!["Bearer null", ""].includes(token)) {
        // if (!socket && checkSocket !== "true") {
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
          // toast.success("Socket connect !", { autoClose: 2000 });
          // localStorage.setItem("socket", newSocket.connected)
        });
        // }
        // newSocket.on("disconnect", () => {
        //   toast.error("Socket disconnect !", { autoClose: 1000 });
        // });
        // }
        // if (!socketMicro && checkMicroSocket !== "true") {
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
          // toast.success("Third party socket connect !", { autoClose: 2000 });
          // localStorage.setItem("microSocket", newMicroSocket.connected)
        });

        // newMicroSocket.on("disconnect", () => {
        //   toast.error("Third party socket disconnect !", { autoClose: 1000 });
        // });

        newMicroSocket.onerror = (event) => {
          // Handle the WebSocket connection error here
          console.error("WebSocket connection failed:", event);
        };
        // }
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }, [role, globalStore]);

  return (
    <SocketContext.Provider value={{ socket, socketMicro }}>
      {children}
    </SocketContext.Provider>
  );
};
