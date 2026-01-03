import { useState } from 'react';
import React from "react";
import api from '../utils/api';


import '../Styles/setting.css'

import {
  FaBuilding,
  FaInfoCircle,
  FaEnvelope,
  FaGavel,
  FaLock,
  FaQuestionCircle,
  FaTrashAlt,
  FaTimes
} from "react-icons/fa";

import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL =process.env.REACT_APP_API_URL 

export default function SettingsPage() {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  

    const { user } = useSelector((state) => state.auth);

    const userId = user?._id


const handleDelete = async () => {
  if (!userId) {
    alert("User not found.");
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    const response = await api.delete(`${API_URL}/delete-user-account/${userId}`, {
          headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { reason }, 
      // send optional reason in the request body
    });

    if (response.status === 200) {
      toast("Your account has been deleted successfully.");
      setShowModal(false);
        localStorage.clear()
      // Optionally log out or redirect user
      window.location.href = "/"; 
    
    }
  } catch (err) {
    console.error("Delete account error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "An error occurred. Please try again later.");
  }
};

  return (
    <div className="settings-page">
      <h1 className="settings-title">Profile - Settings</h1>

      {/* Company Section */}
      <div className="settings-section">
        <h2><FaBuilding className="section-icon" /> Company</h2>
        <div className="settings-item">
          <FaInfoCircle className="item-icon" />
          <div style={{cursor:'pointer'}}>
            <a style={{textDecoration:'none'}}  href='about-us'>

          
            <h3>About Pay2View</h3>
            <p>Learn about our mission and team</p>
              </a>
          </div>
        </div>
        <div className="settings-item">
          <FaEnvelope className="item-icon" />
          <div  style={{cursor:'pointer'}}>
            <a style={{textDecoration:'none'}}  href='contact'>

        
            <h3>Contact Us</h3>
            <p>Get in touch with our support team</p>
                </a>
          </div>
        </div>
      </div>

      {/* Legal Section */}
      <div className="settings-section">
        <h2><FaGavel className="section-icon" /> Legal</h2>
        <div className="settings-item">
          <FaGavel className="item-icon" />
          <div   style={{cursor:'pointer'}}>
            <a style={{textDecoration:'none'}} href='terms-condition'>

       
            <h3>Terms of Service</h3>
            <p>Review our terms and conditions</p>
                 </a>
          </div>
        </div>
        <div className="settings-item">
          <FaLock className="item-icon" />
          <div style={{cursor:'pointer'}}>
            <a style={{textDecoration:'none'}}  href='privacy-policy'>

         
            <h3 >Privacy Policy</h3>
            <p>How we protect your data</p>
               </a>
          </div>
        </div>
        <div className="settings-item">
          <FaQuestionCircle className="item-icon" />
          <div  style={{cursor:'pointer'}}>
            <a style={{textDecoration:'none'}}  href='faq'>

       
            <h3>Help Center</h3>
            <p>FAQs and support articles</p>
                 </a>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="delete-section">
        <button className="delete-button" onClick={() => setShowModal(true)}>
          <FaTrashAlt className="delete-icon" /> Delete Account
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <h2>Confirm Account Deletion</h2>
            <p>
              So sad to see you go, Please tell us why you want to delete your account (optional).
            </p>
           <strong >⚠️ Important:</strong> Please make sure you've withdrawn all the money 
        in your account before deleting. This action <b>cannot be undone</b>.
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Your reason..."
              rows="4"
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDelete}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

