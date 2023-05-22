import React from "react";
import "./App.css";
import Main from "./main";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { Provider } from "react-redux";
import store, { setRole } from "./newStore";
import { SocketProvider } from "./context/socketContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { GlobalStore } from "./context/globalStore";

let persistor = persistStore(store);
function App() {
  const [globalStore, setGlobalStore] = useState({
    userJWT: "",
    adminWT: "",
    expertJWT: "",
    walletJWT: "",
  });
  // if (process.env.ENV !== "production") console.log = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStore.Provider value={{ globalStore, setGlobalStore }}>
            <SocketProvider>
              <ToastContainer />
              <React.StrictMode>
                <div className="App">
                  <Main />
                </div>
              </React.StrictMode>
            </SocketProvider>
          </GlobalStore.Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
