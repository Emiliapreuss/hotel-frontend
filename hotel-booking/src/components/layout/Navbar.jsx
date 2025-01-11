import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";

const NavBar = () => {
  const { roles } = useAuth();
  const { loggedIn } = useAuth();

  const isAdmin = roles.includes("ROLE_ADMIN");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid align-items-center d-flex justify-content-between">
        {/* Left side: Browse Rooms and Admin */}
        <div className="d-flex align-items-center">
          <Link to={"/"} className="navbar-brand">
            <span className="hotel-color">XYZ hotel</span>
          </Link>
          {loggedIn && (
            <NavLink
              className="nav-link ms-3"
              aria-current="page"
              to={"/browse-rooms"}
            >
              Browse all rooms
            </NavLink>
          )}
          {loggedIn && isAdmin && (
            <NavLink
              className="nav-link ms-3"
              aria-current="page"
              to={"/admin"}
            >
              Admin
            </NavLink>
          )}
        </div>

        {/* Right side: Login and Register */}
        <div className="d-flex align-items-center">
          {loggedIn ? (
            <>
              <NavLink
                className="nav-link ms-3"
                aria-current="page"
                to={"/bookings"}
              >
                Your bookings
              </NavLink>
              <NavLink
                className="nav-link ms-3"
                aria-current="page"
                to={"/logout"}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="nav-link ms-3"
                aria-current="page"
                to={"/login"}
              >
                Login
              </NavLink>
              <NavLink
                className="nav-link ms-3"
                aria-current="page"
                to={"/register"}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
