import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const { user, userWallet, userAdmin, userExpert } = useSelector(
    (state) => state.auth
  );
  const body = {
    tokenAdmin: userWallet?.access_token,
    tokenMaster: userAdmin?.access_token,
    tokenExpert: userExpert?.access_token,
    tokenUser: user?.access_token,
  };
  return <AuthContext.Provider value={body}>{children}</AuthContext.Provider>;
};
