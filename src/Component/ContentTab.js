import React, { useState } from "react";
import { FaEye, FaEllipsisV, FaShieldAlt } from "react-icons/fa";
import "../Styles/ContentTab.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { removeContent } from "../Redux/AuthSlice";

const API_URL =process.env.REACT_APP_API_URL 

function ContentTab() {
  const [menuOpen, setMenuOpen] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

const { content} = useSelector((state) => state.auth)
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Fetch user content from API


  const handleDelete = async (contentId) => {
    ;
setMenuOpen(null)
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your content!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(99, 94, 94, 1)",
      cancelButtonColor: "#000000ff",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `${API_URL}/delete-content/${contentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
            dispatch(removeContent(contentId))
          Swal.fire("Deleted!", res.data.message, "success");
          // Update UI
        ;
        }
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          err.response?.data?.error || "Failed to delete content.",
          "error"
        );
      }
    }
  };

  return (
    <div className="content-page">
      {/* Header */}
      <div className="content-header">
        <h2>My Content</h2>
        <button
          onClick={() => navigate("/uplaod-content")}
          className="upload-btn"
        >
          + Upload New Content
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading content...</p>}

      {/* Content Cards */}
      <div className="content-grid">
        {content.length > 0
          ? content.map((item) => (
              <div className="content-card" key={item._id}>
                <img
                  src={item.full_url.endsWith(".pdf")?item.preview_url:item.full_url}
                  alt={item.title}
                  className="content-img"
                />
                <div className="content-details">
                  <h3>{item.title}</h3>
                  <p className="price">₦{(item.price ).toLocaleString()}</p>
                  <div className="stats-content">
                    <span>
                      <FaEye /> {item.viewCount || 0}
                    </span>
                    <span>Sold: {item.soldCount || 0}</span>
                  </div>
                  <p style={{ fontSize: "13px", textTransform: "capitalize" }}>
                    {item.description}
                  </p>
                </div>

                {/* Share to Earn Button */}
                <button
                  className="share-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(item.shareLink.trim().replace(/\s+/g, '%20'));
                    toast.success("Share link copied! Earn when someone buys.");
                  }}
                >
                  <FaShieldAlt className="share-icon" /> Share to Earn
                </button>

                {/* 3-dot Menu */}
                <div className="menu-wrapper">
                  <FaEllipsisV
                    className="menu-icon"
                    onClick={() => toggleMenu(item._id)}
                    color="black"
                    size={22}
                  />
                  {menuOpen === item._id && (
                    <div className="menu-dropdown">
                      <button onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          : !loading &&   <div
      style={{
        width: "100%",
        height: "40vh",
        backgroundColor: "#f8f8f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #ccc",
        borderRadius: "12px",
        textAlign: "center",
        padding: "20px",
        boxShadow:"0 5px 20px rgba(0,0,0,0.2)",
        cursor:"pointer"
      }}
      onClick={() => navigate("/uplaod-content")}
    >
      <FiUpload size={48}   color="#888" style={{ marginBottom: "16px" }} />
      <p style={{ fontSize: "16px", color: "#000000ff", maxWidth: "300px" }}>
        No content uploaded yet. Upload and start earning money!
      </p>
    </div>}
      </div>
    </div>
  );
}

export default ContentTab;
