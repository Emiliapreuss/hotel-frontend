import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  const getUserRoles = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.roles || [];
    } catch (error) {
      console.error("Failed to parse token roles:", error);
      return [];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);
    setRoles(getUserRoles());
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, roles, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
