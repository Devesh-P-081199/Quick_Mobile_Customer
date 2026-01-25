import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
// Fonts
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-400-italic.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-sans/latin-700.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/hedvig-letters-serif/latin-400.css";

import "./styles/main.css";
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
