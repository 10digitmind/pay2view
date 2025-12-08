import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/PaymentVerification.css'

const API_URL = process.env.REACT_APP_API_URL;

const PaymentVerification = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [unlockedContent, setUnlockedContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reference) {
      setError("No reference found in URL.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${API_URL}/verify-payment`, { reference });

        if (res.data.success) {
          setUnlockedContent(res.data);
        } else {
          setError("Payment verification failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setError("Error verifying payment. Please try again or contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  if (loading) {
    return (
      <div className="payment-loader">
        <div className="loader-card">
          <img
            src="https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=60"
            alt="Payment Preview"
            className="preview-image"
          />
          <div className="overlay">
            <div className="lock-icon">🔒</div>
            <p style={{ color: "black" }}>Verifying your payment...</p>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey",
          color: "black",
        }}
      >
        <p className="error">{error}</p>
      </div>
    );
  }

  // Detect if content is video
  const isVideo = unlockedContent.preview_url?.includes("videodelivery.net");

  return (
    <div className="payment-success-container">
      <div className="success-message">
        <h2>Content Unlocked!</h2>
        <p>You now have full access to this premium content. Download and enjoy!</p>
        <p>Access this content with your email anytime you want.</p>
      </div>

      <div className="unlocked-media">
        {isVideo ? (
          <video
            src={unlockedContent.full_url}
            controls
            autoPlay
            muted
            width="100%"
            style={{ borderRadius: "10px" }}
          />
        ) : (
          <img
            src={
              unlockedContent.full_url.endsWith("GetObject")
                ? unlockedContent.preview_url
                : unlockedContent.full_url
            }
            alt={unlockedContent.title}
            style={{ borderRadius: "10px" }}
          />
        )}
        {!isVideo && <p className="quality-tag">Full Quality</p>}
      </div>

      <div className="actions" style={{ marginTop: "20px" }}>
        {!isVideo && (
          <a href={unlockedContent.full_url} download>
            <button style={{color:'white', width:'100%',height:'35px',backgroundColor:'black', fontStyle:'bold', cursor:'pointer',marginBottom:"20px" }} className="download-btn">Download</button>
          </a>
        )}
        <button style={{color:'white', width:'100%',height:'35px',backgroundColor:'black', fontStyle:'bold', cursor:'pointer' }}  onClick={() => navigate("/")} className="creator-btn">
          Want to Earn?
        </button>
      </div>
    </div>
  );
};

export default PaymentVerification;
