// PaymentVerification.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaDownload, FaLockOpen } from "react-icons/fa";
import "../Styles/PaymentVerification.css";

const API_URL =process.env.REACT_APP_API_URL 

const PaymentVerification = () => {
    const location = useLocation();
   const params = new URLSearchParams(location.search);
    const reference = params.get("reference");
  const navigate = useNavigate();
//   const reference = searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [unlockedContent, setUnlockedContent] = useState(null);
  const [error, setError] = useState(null);
const ref =  reference

  useEffect(() => {
    if (!ref) {
      setError("No reference found in URL.");
      setLoading(false);

      return;
   
    }

  const verifyPayment = async () => {
  try {
    setLoading(true);

    const res = await axios.post(`${API_URL}/verify-payment`, {
      reference: ref, // send in body
    });

    console.log(res.data);

    if (res.data.success) {
      setUnlockedContent(res.data);
    } else {
      setError("Payment verification failed. Please try again.");
    }
  } catch (err) {
    console.error(err);
    setError("Error verifying payment. Please try again or cotact support.");
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
          <p style={{color:"black"}}>Verifying your payment...</p>
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
}
  if (error) return<div style={{width:'100%',height:'50vh',display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"grey ",color:"black"}}>
<p className="error">{error}</p>;
  </div> 

  return (
   <div className="payment-success-container">
  <div className="success-message">
    <h2>Content Unlocked!</h2>
    <p>You now have full access to this premium content. Download and enjoy!</p>
     <p>Access this content with your email anytime you want </p>
  </div>

  <div className="unlocked-image">
    <img src={unlockedContent.full_url.endsWith("GetObject")?unlockedContent.preview_url:unlockedContent.full_url} alt={unlockedContent.title} />
    <p className="quality-tag">Full Quality</p>
  </div>

  <div className="actions">
    <a href={unlockedContent.full_url}  download>
      <button className="download-btn">Download</button>
    </a>
    <button onClick={()=> navigate('/')} className="creator-btn">Want to  Earn?</button>
  </div>
</div>

  );
};

export default PaymentVerification;
