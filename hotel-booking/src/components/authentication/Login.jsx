import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/ApiFunctions";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      setLoggedIn(true);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <section className="container, mt-5, mb-10">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h3>Login</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-hotel mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
