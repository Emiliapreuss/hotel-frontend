import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/ApiFunctions";

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <section className="container, mt-5, mb-10">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h3>Register</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
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
                value={user.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-hotel mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
