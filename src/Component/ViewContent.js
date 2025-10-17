import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "../Styles/ViewContent.css";
import UnlockModal from "./UnlockModal";

const API_URL =process.env.REACT_APP_API_URL 

const ViewContent = () => {
  const { id,title } = useParams(); // get content id from URL
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // if API requires auth
        const res = await axios.get(`${API_URL}/get-content/${id}`, {
            

        });
        setContent(res.data.content);
      
       
      } catch (err) {
        console.error(err);
        toast.error("Failed to load content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);



  if (loading) return <p>Loading content...</p>;
  if (!content) return <p>Content not found</p>;

  return (
    <>
  
    <div className="view-content-container">
      
      <div className="content-preview">
        <img src={content.preview_url} alt={content.title} className="preview-img" />
        <div className="lock-overlay">
          <FaLock className="lock-icon" />
          <span className="price-tag">₦{(content.price ).toLocaleString()}</span>
        </div>
      </div>

      {/* About This Content */}
      <div className="about-content">
        <h2>About This Content</h2>
        <p>{content.description}</p>
        <div className="about-info">
             <p >{title}</p>
            <p>High Resolution</p>
                 <p>Exclusive</p>
        </div>
      </div>

      {/* Secure Purchase Info */}
      <div className="secure-purchase">
        <h3>Secure Purchase</h3>
        <ul>
          <li><FaShieldAlt color="green" /> Encrypted payment processing</li>
          <li><FaCheckCircle color="green"  /> Instant access after purchase</li>
          <li><FaCheckCircle color="green" /> 30-day satisfaction guarantee</li>
        </ul>
      </div>

      {/* Unlock Button */}
    <button className="unlock-btn" onClick={() => setModalOpen(true)}>
  Unlock for ₦{(content.price ).toLocaleString()}
</button>
      <p className="one-time-payment">One-time payment .  No subscription required</p>
    </div>
    <UnlockModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  content={content}
/>
     </>
  );
};

export default ViewContent;
