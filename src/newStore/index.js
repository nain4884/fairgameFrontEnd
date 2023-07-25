import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
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
  storage: storageSession,
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

  userAxiosInstance.interceptors.response.use(
    (response) => {
      // For successful responses, just return the response
      return response;
    },
    (error) => {
      // Handle unauthorized errors (status code 401)
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login screen (replace '/login' with your actual login screen route)
        window.location.replace("/");
      }
      return Promise.reject(error);
    }
  );

  expertInstance.interceptors.response.use(
    (response) => {
      // For successful responses, just return the response
      return response;
    },
    (error) => {
      // Handle unauthorized errors (status code 401)
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login screen (replace '/login' with your actual login screen route)
        window.location.replace("/expert");
      }
      return Promise.reject(error);
    }
  );

  adminInstance.interceptors.response.use(
    (response) => {
      // For successful responses, just return the response
      return response;
    },
    (error) => {
      // Handle unauthorized errors (status code 401)
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login screen (replace '/login' with your actual login screen route)
        window.location.replace("/admin");
      }
      return Promise.reject(error);
    }
  );

  walletInstance.interceptors.response.use(
    (response) => {
      // For successful responses, just return the response
      return response;
    },
    (error) => {
      // Handle unauthorized errors (status code 401)
      if (error.response && error.response.status === 401) {
        // Redirect the user to the login screen (replace '/login' with your actual login screen route)
        window.location.replace("/wallet");
      }
      return Promise.reject(error);
    }
  );

  let role = "role4";
  let roleName = user?.role?.roleName;
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
    transPass = userAdmin?.isTransPasswordCreated;
    userAxios = adminInstance;
    roleName = userAdmin?.role?.roleName;
    adminInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  if (pattern2.test(window.location.pathname)) {
    role = "role2";
    JWT = userWallet?.access_token;
    roleName = userWallet?.role?.roleName;
    transPass = userAdmin?.isTransPasswordCreated;
    userAxios = walletInstance;
    walletInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  if (pattern3.test(window.location.pathname)) {
    role = "role3";
    JWT = userExpert?.access_token;
    transPass = "isTransPasswordCreated3";
    userAxios = expertInstance;
    roleName = userExpert?.role?.roleName;
    expertInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return {
    role,
    JWT,
    transPass,
    roleName,
    axios: userAxios,
    locPath: window.location.pathname.split("/")[1].trim(),
  };
};

export default store;
