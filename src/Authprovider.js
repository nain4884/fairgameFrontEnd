import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // const [tokenAdmin, setTokenAdmin] = useState(localStorage.getItem('JWTadmin'));
  // const [tokenMaster, setTokenMaster] = useState(localStorage.getItem('JWTmaster'));
  // const [tokenExpert, setTokenExpert] = useState(localStorage.getItem('JWTexpert'));
  // const [tokenUser, setTokenUser] = useState(localStorage.getItem('JWTuser'));

  const { user, userAdmin, userMaster, userExpert } = useSelector(
    (state) => state.auth
  );
  const body = {
    tokenAdmin: userAdmin?.access_token,
    tokenMaster: userMaster?.access_token,
    tokenExpert: userExpert?.access_token,
    tokenUser: user?.access_token,
  };
  return <AuthContext.Provider value={body}>{children}</AuthContext.Provider>;
};
