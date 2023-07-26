import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">M&-World Booking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <div className="usernameContainer">
              <span className="username">{user.username}</span>
            </div>
            <button className="navButton" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegisterClick}>
              Register
            </button>
            <button className="navButton" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
