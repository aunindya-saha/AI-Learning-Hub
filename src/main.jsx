import React from "react";
import ReactDOM from "react-dom/client";
import LearningHub from "./LearningHub.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LearningHub />
    <SpeedInsights />
    <Analytics />
  </React.StrictMode>
);
