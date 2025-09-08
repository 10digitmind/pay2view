import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../Styles/Login.css";
import { useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
   const { user } = useSelector((state) => state.auth);

  return (
    <div className="login-page">
      <h2 className="login-title">Sign in to your Pay2View account</h2>
      <p className="login-subtitle">Access your account and continue your journey</p>

      <div className="login-container">
        {/* Email Input */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Your@email.com" />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
          />
          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="extra-options">
          <a href="/forgot-password">Forgot Password?</a>
          <p>
            Don’t have an account? <a href="/getstarted">Sign Up</a>
          </p>
        </div>

        <button className="login-btn">Login</button>
      </div>

      {/* Security Badges */}
      <div className="security-section">
        <div className="security-item">
          <span className="circle"></span>
          Secure Login
        </div>
        <div className="security-item">
          <span className="circle"></span>
          Encrypted
        </div>
        <div className="security-item">
          <span className="circle"></span>
          Privacy Protected
        </div>
      </div>
    </div>
  );
};

export default Login;
