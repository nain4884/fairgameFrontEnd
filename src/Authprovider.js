import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenAdmin, setTokenAdmin] = useState(localStorage.getItem('JWTadmin'));
  const [tokenMaster, setTokenMaster] = useState(localStorage.getItem('JWTmaster'));
  const [tokenExpert, setTokenExpert] = useState(localStorage.getItem('JWTexpert'));
  const [tokenUser, setTokenUser] = useState(localStorage.getItem('JWTuser'));

  return (
    <AuthContext.Provider value={{ tokenAdmin, tokenMaster, tokenExpert, tokenUser }}>
      {children}
    </AuthContext.Provider>
  );
};