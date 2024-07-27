import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Comments from "./components/layout/Comments";

const scriptTag = document.getElementById("opine-script") as HTMLElement;
const apiUrl = scriptTag.dataset.apiUrl as string;
const featureFlag = scriptTag.getAttribute("data-feature-flag") === "true";

export const AppConfigContext = React.createContext({
  apiUrl,
  featureFlag,
});

const root = ReactDOM.createRoot(
  document.getElementById("comments-container") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppConfigContext.Provider value={{ apiUrl, featureFlag }}>
      <Comments />
    </AppConfigContext.Provider>
  </React.StrictMode>
);
