import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Comments from "./components/layout/Comments";

const scriptTag = document.currentScript as HTMLScriptElement;
const apiUrl = scriptTag.getAttribute("data-api-url") || "http://localhost:8787";
const featureFlag = scriptTag.getAttribute("data-feature-flag") === "true";

export const AppConfigContext = React.createContext({
  apiUrl,
  featureFlag,
});

const root = ReactDOM.createRoot(
  document.getElementById("comments-container") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AppConfigContext.Provider value={{ apiUrl, featureFlag }}>

    <Comments />
    </AppConfigContext.Provider>
  </React.StrictMode>,
);

