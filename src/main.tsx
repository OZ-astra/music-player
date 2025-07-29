import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./intro-section-with-dropdown-nav/index";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <StrictMode>
    <Homepage />
  </StrictMode>
);
