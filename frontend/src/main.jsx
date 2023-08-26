// provider
import { UserContextProvider } from "./context/User";
import { InterfaceContextProvider } from "./context/Interface";

// react
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <InterfaceContextProvider>
        <App />
      </InterfaceContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
