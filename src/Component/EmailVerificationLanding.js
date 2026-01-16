import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../Redux/Asyncthunk";
import api from "../utils/api";

const API_URL =process.env.REACT_APP_API_URL 


const EmailVerificationLanding = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const verifyEmail = async () => {
      const query = new URLSearchParams(location.search);
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
          const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
          localStorage.setItem("expiresAt", expiresAt);
        }

        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (err) {
        if (!mounted) return;

        const errMsg =
          err.response?.data?.message ||
          err.message ||
          "Verification failed.";

        setStatus("error");
        setMessage(errMsg);
        toast.error(errMsg);
      }
    };

    verifyEmail();

    return () => {
      mounted = false;
    };
  }, [location.search, dispatch, navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ maxWidth: "500px", width: "100%", padding: "40px", textAlign: "center" }}>
        <FaEnvelope size={50} />

        <h2>
          {status === "success" ? "Email Verified!" : "Verify Your Email"}
        </h2>

        <p>{message}</p>

        {status === "success" && (
          <>
            <FaCheckCircle size={40} />
            <p>Redirecting to your dashboard...</p>
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
