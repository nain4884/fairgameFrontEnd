import { ThemeProvider } from "@mui/system";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { SocketProvider } from "./context/socketContext";
import Main from "./main";
import store from "./newStore";
import theme from "./theme";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStore } from "./context/globalStore";

let persistor = persistStore(store);
function App() {
  const [globalStore, setGlobalStore] = useState({
    userJWT: "",
    adminWT: "",
    expertJWT: "",
    walletJWT: "",
  });

  if (process.env.ENV !== "production") console.log = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStore.Provider value={{ globalStore, setGlobalStore }}>
            <SocketProvider>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <div className="App">
                <Main />
              </div>
            </SocketProvider>
          </GlobalStore.Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
