
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // ✅ Ensure this is correctly imported
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Ensure authentication context is available */}
      <BrowserRouter> {/* ✅ Correctly wrapping App inside a single Router */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
