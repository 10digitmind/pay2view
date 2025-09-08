import React, { useState } from "react";
import "../Styles/ForgotPassword.css"; // styling separately
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    // Call your backend API here
    // Example:
    // axios.post('/api/forgot-password', { email })
    //      .then(res => setMessage(res.data.message))
    //      .catch(err => setMessage(err.response.data.error))

    setMessage("If this email exists, a reset link has been sent.");
  };

  return (
    <div className="forgot-container">
      <div className="forgot-header">
        <h2>Forgot Password?</h2>
        <p>Enter your email to reset your password</p>
      </div>

      <form className="forgot-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <AiOutlineMail className="icon" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="forgot-btn">
          Send Reset Link
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
