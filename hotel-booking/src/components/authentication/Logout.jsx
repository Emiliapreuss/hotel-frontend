import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const Logout = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  useEffect(() => {
    localStorage.removeItem("authToken");
    setLoggedIn(false);
    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
