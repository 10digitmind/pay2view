import React, { useState } from "react";
import { FaCreditCard, FaTimes } from "react-icons/fa";
import "../Styles/UnlockModal.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL =process.env.REACT_APP_API_URL 

const UnlockModal = ({ isOpen, onClose, content }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState()
  const navigate =useNavigate()

  if (!isOpen) return null;

  // Calculate fees
  const platformFee = 0.00; // 5% platform fee
  const totalPrice = content.price + platformFee;


const handlePay = async () => {
  if (!email) {
    toast.error("Please enter your email.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(`${API_URL}/pay-2-view`, {
      buyerEmail: email,
      contentId: content._id,
      platformFee: 0, // start with 0
    });

    // Destructure from response
    const { alreadyPaid, reference, data } = res.data;

    if (alreadyPaid) {
      // 🚀 User already paid → navigate straight to verify page
      localStorage.setItem("paystack_ref", reference);
      navigate(`/payment-verification/${reference}`);
    } else {
      // 🚀 Fresh payment → open Paystack checkout
      const { authorization_url, reference: newRef } = data;
      localStorage.setItem("paystack_ref", newRef);
      window.open(authorization_url, "_blank");
    }
  } catch (err) {
    console.error(err);
    toast.error("Payment initialization failed. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Content Preview */}
        <div className="modal-content-preview">
          <img src={content.preview_url} alt={content.title} className="modal-preview-img" />
          <div className="modal-content-info">
            <h2>{content.title}</h2>
            <p>₦{(content.price ).toLocaleString()}</p>
          </div>
        </div>

        {/* Email Input */}
        <div className="modal-email">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Receive a receipt and access your purchases</p>
        </div>

        {/* Fees and Total */}
        <div className="modal-pricing">
          <div className="pricing-row">
            <span>Content Price:</span>
            <span>₦{(content.price).toLocaleString()}</span>
          </div>
          <div className="pricing-row">
            <span>Platform Fee:</span>
            <span>₦{platformFee}</span>
          </div>
          <div className="pricing-row total">
            <span>Total:</span>
            <span>₦{(content.price ).toLocaleString()}</span>
          </div>
        </div>

        {/* Secure Payment Info */}
        <div className="modal-secure">
          <p>✅ Secure Payment</p>
          <p>
            Your payment is processed securely through Paystack. We never store your card
            details.
          </p>
        </div>

        {/* Pay Button */}
        <button onClick={handlePay} className="pay-btn">
          <FaCreditCard className="pay-icon" /> Pay ₦{(totalPrice ).toLocaleString()} with Paystack
        </button>

        {/* Terms */}
        <p className="modal-terms">
          By completing this purchase, you agree to our <a style={{color:"black"}} href="/">Terms of Service and Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default UnlockModal;
