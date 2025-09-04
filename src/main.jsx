import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Ecommerce from "./e-commerce/App.jsx";

const root = document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <Ecommerce />
  </StrictMode>
);
