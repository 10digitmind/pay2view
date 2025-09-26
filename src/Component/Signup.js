import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import "../Styles/Signup.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../Redux/Asyncthunk";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


  const togglePassword = () => setShowPassword(!showPassword);

  const getPasswordStrength = (pass) => {
    if (pass.length < 6) return "Weak";
    const hasNumbers = /\d/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasSpecial = /[!@#$%^&*]/.test(pass);
    if (pass.length >= 8 && hasNumbers && hasUpper && hasLower && hasSpecial)
      return "Strong";
    return "Medium";
  };

 const handleSignUp = async () => {

  if (!navigator.onLine) {
  toast.error("No internet connection. Please check your network.");
  return;
}

  if (!email || !password) {
    toast.error("Please input email and password");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    // Optional: handle network timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000); // 10 seconds

    const resultAction = await dispatch(createUser({ email, password, signal: controller.signal })).unwrap();

    clearTimeout(timeout);

    if (resultAction?._id) {
    
      setTimeout(() => {
        navigate(`/email-verification-sent/${email}`);
      }, 200);
    }
  } catch (err) {
    if (err.name === "AbortError") {
      toast.error("Network is slow. Please try again.");
    } else {
      toast.error(err?.message || "Sign-up failed. Please try again.");
    }
    setError(err);
  } finally {
    setLoading(false);
  }
};


  const strength = getPasswordStrength(password);
  return (
    <div className="signup-page">
      <h2 className="signup-title">Start Your Creator Journey</h2>
      <p className="signup-subtitle">
        <span className="highlight">Earn up to ₦100k/month</span>
      </p>

      <div className="signup-container">
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {password && (
          <p className={`password-strength ${strength.toLowerCase()}`}>
            Password Strength: {strength}
          </p>
        )}
      

  <button onClick={handleSignUp} className="signup-btn" disabled={loading}>
  {loading ? "Signing up..." : "Sign Up"}
</button>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {/* Creator Benefits */}
        <div className="creator-benefits">
          <h4>Creator Benefits:</h4>
          <p>
            <FaCheckCircle className="check-icon" /> Instant payouts via bank
            transfer
          </p>
          <p>
            <FaCheckCircle className="check-icon" /> No monthly subscription
            fees
          </p>
          <p>
            <FaCheckCircle className="check-icon" /> Keep 90% of your earnings
          </p>
        </div>

        {/* Agreement */}
        <p className="agreement">
          By creating an account, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
