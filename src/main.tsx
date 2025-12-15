import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ScheduleProvider } from "./context/schedule-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <ScheduleProvider> 
    <App />
   </ScheduleProvider>
  </React.StrictMode>
)
