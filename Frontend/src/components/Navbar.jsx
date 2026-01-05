import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HireFlow</Link>
      </div>



      <div className="navbar-links">
        <Link to="/contact">Contact Us</Link>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="primary-btn">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              className="logout-btn"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
