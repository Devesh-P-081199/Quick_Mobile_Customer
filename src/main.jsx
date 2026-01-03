import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/main.css";
import "./kstyle.css"; /* Legacy CSS variables only - no circular import */
import "./styles/no-max-width-override.css";

import Context from "./Context/contextAPI.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Context>
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  </Context>,
);
