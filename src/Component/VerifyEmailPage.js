import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL =process.env.REACT_APP_API_URL 
const VerifyEmailPage = () => {
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(0); // countdown in seconds
  const navigate = useNavigate();
const {email} =useParams()

  const handleResend = async () => {
    try {
      setResending(true);
      setTimer(60); // start 60 seconds countdown

      await axios.post(`${API_URL}/resendverification-email`, { email: email });
      toast.success("Verification email resent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend email");
      setTimer(0); // reset timer if error
    } finally {
      setResending(false);
    }
  };

  // Countdown effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

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
        {/* Email Icon */}
        <FaEnvelope size={50} color="#000000" style={{ marginBottom: "20px" }} />

        {/* Title */}
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
          Check your email
        </h2>

        {/* Subtitle */}
        <p style={{ color: "#666666", marginBottom: "30px" }}>
          We've sent a verification link to <strong>{email}</strong>
        </p>

        {/* Instructions */}
        <div style={{ textAlign: "left" }}>
          {[
            "Check your email inbox (and spam folder)",
            "Click the verification link in the email",
            "Return here to start exploring premium content"
          ].map((step, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div
                style={{
                  minWidth: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "15px",
                  fontWeight: "bold"
                }}
              >
                {idx + 1}
              </div>
              <p style={{ color: "#333333", margin: 0, flex: 1 }}>{step}</p>
            
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "#dddddd", margin: "30px 0" }} />

        {/* Resend Email Button */}
        <button
          onClick={handleResend}
          disabled={resending || timer > 0}
          style={{
            backgroundColor: resending || timer > 0 ? "#888888" : "#000000",
            color: "#ffffff",
            padding: "12px 25px",
            borderRadius: "5px",
            border: "none",
            cursor: resending || timer > 0 ? "not-allowed" : "pointer",
            fontWeight: "bold",
            width: "100%",
            marginBottom: "20px"
          }}
        >
          {timer > 0 ? `Resend Email (${timer}s)` : resending ? "Resending..." : "Resend Email"}
        </button>

        {/* Return Home */}
     
      </div>
    </div>
  );
};

export default VerifyEmailPage;
