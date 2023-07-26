import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [redirectCount, setRedirectCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (success && redirectCount >= 0) {
      timer = setTimeout(() => {
        setRedirectCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [success, redirectCount]);

  useEffect(() => {
    if (redirectCount === 0) {
      navigate("/login");
    }
  }, [redirectCount, navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    const confirmPassword = credentials.confirmPassword;
    setCredentials((prev) => ({
      ...prev,
      password: e.target.value,
    }));
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const password = credentials.password;
    setCredentials((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
    setPasswordMatch(e.target.value === password);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setRedirectCount(3);

    if (!passwordMatch) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/auth/register", credentials);
      setSuccess("Registration successful!");
      setCredentials({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              value={credentials.phone}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={credentials.password}
              onChange={handlePasswordChange}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input-field"
            />
            <button type="submit" className="register-button">
              Register
            </button>
            {error && <span className="error">{error}</span>}
            {success && (
              <span className="success">
                {success} Redirecting to Login screen in {redirectCount}...
              </span>
            )}
            {!passwordMatch && (
              <span className="password-match-error">Passwords do not match</span>
            )}
          </form>
          <div className="login-link">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
   
  );
};

export default Register;
