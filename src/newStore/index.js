import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { encryptTransform } from "redux-persist-transform-encrypt";
import root_reducer from "./reducers";

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

export default store;
