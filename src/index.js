import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
