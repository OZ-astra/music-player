import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AgeCalculator from "./age-calculator/age";

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <StrictMode>
    <AgeCalculator />
  </StrictMode>
);
