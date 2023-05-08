import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { encryptTransform } from "redux-persist-transform-encrypt";
import root_reducer from "./reducers";
import axios from "axios";

import { apiBasePath } from "../components/helper/constants";

const encryptor = encryptTransform({
  secretKey: "my-super-secret-key",
  onError: function (error) {
    // Handle the error.
  },
});

const persistConfig = {
  key: "root",
  storage,
  transform: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const setRole = (token) => {
  const {
    auth: { user, userWallet, userExpert, userAdmin },
  } = store.getState();
  const userAxiosInstance = axios.create({
    baseURL: apiBasePath,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("JWTuser")}`,
    },
  });

  const expertInstance = axios.create({
    baseURL: apiBasePath,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("JWTexpert")}`,
    },
  });

  const adminInstance = axios.create({
    baseURL: apiBasePath,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("JWTadmin")}`,
    },
  });

  const walletInstance = axios.create({
    baseURL: apiBasePath,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("JWTwallet")}`,
    },
  });

  let role = "role4";
  let JWT = user?.access_token;
  let transPass = "isTransPasswordCreated4";
  let pattern1 = /admin/;
  let pattern2 = /wallet/;
  let pattern3 = /expert/;
  let userAxios = userAxiosInstance;
  userAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  if (pattern1.test(window.location.pathname)) {
    role = "role1";

    JWT = userAdmin?.access_token;
    transPass = "isTransPasswordCreated1";
    userAxios = adminInstance;
    adminInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  if (pattern2.test(window.location.pathname)) {
    role = "role2";
    JWT = userWallet?.access_token;
    transPass = "isTransPasswordCreated2";
    userAxios = walletInstance;
    walletInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  if (pattern3.test(window.location.pathname)) {
    role = "role3";
    JWT = userExpert?.access_token;
    transPass = "isTransPasswordCreated3";
    userAxios = expertInstance;
    expertInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return {
    role,
    JWT,
    transPass,
    axios: userAxios,
    locPath: window.location.pathname.split("/")[1].trim(),
  };
};

export default store;