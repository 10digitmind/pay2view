import React, { useState,useEffect } from "react";
import "../Styles/ForgotPassword.css"; // styling separately
import { Link } from "react-router-dom";

import api from "../utils/api";

const COOLDOWN_TIME = 60; // seconds

const API_URL =process.env.REACT_APP_API_URL 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
   const [loading, setLoading] = useState(false);
     const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    setMessage("Please enter your email");
    return;
  }

  if (cooldown > 0) return;

  try {
    setLoading(true);

    const res = await api.post(`${API_URL}/send-reset-password`, { email });

    // Always show generic message for security
    setMessage(res.data.message || "If this email exists, a reset link has been sent.");

    // Start cooldown only after successful request
    setCooldown(COOLDOWN_TIME);
  } catch (err) {
    console.log(err);

    // Show specific error if backend allows it
    if (err.response?.data?.error === "No account found with this email.") {
      setMessage("No account found with this email.");
    } else {
      setMessage("If this email exists, a reset link has been sent.");
    }
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="forgot-container">
      <div className="forgot-header">
        <h2>Forgot Password?</h2>
        <p>Enter your email to reset your password</p>
      </div>

      <form className="forgot-form" onSubmit={handleSubmit}>
        <div className="input-group">
 
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

      <button
  disabled={loading || cooldown > 0}
  type="submit"
  className="forgot-btn"
>
  {cooldown > 0
    ? `Wait ${cooldown}s`
    : loading
    ? "Sending..."
    : "Send Reset Link"}
</button>

      </form>

      {message && <p className="message">{message}</p>}

      <p className="back-login">
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
