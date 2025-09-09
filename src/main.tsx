import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WeatherApp from "./weather-app/App";
const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>
);
