import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import "./index.css";
import { AuthProvider } from "./components/authentication/AuthContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
