import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AdviceGenerator from "./Advice generator/index";

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <StrictMode>
    <AdviceGenerator />
  </StrictMode>
);
