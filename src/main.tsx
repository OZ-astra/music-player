import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MusicPlayer from "./music-player/App";
const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(<MusicPlayer />);
