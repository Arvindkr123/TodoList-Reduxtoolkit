import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/GlobalStyles.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
