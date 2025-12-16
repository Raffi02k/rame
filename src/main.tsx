import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
)
