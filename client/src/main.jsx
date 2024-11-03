import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { SocketProvider } from "./context/socketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
  </SocketProvider>
);
