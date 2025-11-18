import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import "./styles/no-max-width-override.css";

import Context from "./Context/contextAPI.jsx";

import App from "./App.jsx";
// import {  HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <Context>
    <StrictMode>
      {/* <HelmetProvider> */}
      <App />
      {/* </HelmetProvider> */}
      {/* <ToastContainer /> */}
    </StrictMode>
  </Context>
);
