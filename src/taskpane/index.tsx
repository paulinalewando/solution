import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "../components/App";
import "./taskpane.css";

let isOfficeInitialized = false;

const render = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if ((window as any).Office) {
  Office.onReady((info) => {
    isOfficeInitialized = true;
    console.log("Office.js initialized:", info);
    render();
  });
} else {
  console.warn("Office.js not detected. Running in standalone mode.");
  render();
}
