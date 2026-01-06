import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page login-bg">
      <form className="auth-card fade-scale" onSubmit={handleSubmit}>
        <h2>Login to HireFlow</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-text">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
