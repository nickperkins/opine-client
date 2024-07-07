import { createContext } from "react";

interface AppConfig {
  apiUrl: string;
  featureFlag: boolean;
}

const config: AppConfig = {
  apiUrl: process.env.REACT_APP_API_URL || "",
  featureFlag: process.env.REACT_APP_FEATURE_FLAG === "true",
};

export const AppConfigContext = createContext<AppConfig>(config);