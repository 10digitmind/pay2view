import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/ResetPassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const API_URL =process.env.REACT_APP_API_URL 

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/reset-password`, {
        token,
        password,
      });

      if (res.data.success) {
        toast.success("Password reset successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(res.data.error || "Password reset failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Your Password</h2>
        <p>Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="reset-password-form">
          {/* Password Field */}
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="password-input-container">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>

  );
};

export default ResetPassword;
