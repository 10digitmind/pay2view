import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../Redux/Asyncthunk";
import api from "../utils/api";

const API_URL =process.env.REACT_APP_API_URL 


const EmailVerificationLanding = () => {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
const dispatch = useDispatch()
  // Helper to get token from URL
    const query = new URLSearchParams(useLocation().search);
  // Call verify-email API
  useEffect(() => {
  let mounted = true;
  const verifyEmail = async () => {
    const token = decodeURIComponent(query.get("token")?.trim());

    if (!token) {
      if (!mounted) return;
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    try {
      const res = await api.get(`${API_URL}/verify-email?token=${token}`);
      if (!mounted) return;

      setStatus("success");
      setMessage(res.data.message);
      toast.success(res.data.message);
      await dispatch(getCurrentUser());

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        const now = Date.now();
        const expiresAt = now + 24 * 60 * 60 * 1000;
        localStorage.setItem("expiresAt", expiresAt);
      }

      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err) {
      if (!mounted) return;
      const errMsg = err.response?.data?.message || err.message || "Verification failed.";
      setStatus("error");
      setMessage(errMsg);
      toast.error(errMsg);
    }
  };

  verifyEmail();

  return () => {
    mounted = false;
  };
}, [location.search, navigate]);


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px"
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "40px 30px",
          textAlign: "center"
        }}
      >
        <FaEnvelope size={50} color="#000" style={{ marginBottom: "20px" }} />

        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
          {status === "success" ? "Email Verified!" : "Verify Your Email"}
        </h2>

        <p style={{ color: "#666", marginBottom: "30px" }}>{message}</p>

        {status === "success" && (
          <>
            <FaCheckCircle size={40} color="#000" style={{ marginBottom: "20px" }} />
            <p style={{ marginTop: "20px", color: "#333" }}>Redirecting to your dashboard...</p>
          </>
        )}

        {status === "error" && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Unable to verify your email. Please check the link or contact support.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationLanding;
