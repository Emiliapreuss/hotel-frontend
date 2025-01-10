import { Navigate } from "react-router-dom";
import { useAuth } from "../components/authentication/AuthContext";

function HomePageRedirect() {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default HomePageRedirect;
