import React, { useState,useEffect } from "react";
import { FaEye, FaEllipsisV, FaShieldAlt } from "react-icons/fa";
import "../Styles/ContentTab.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { removeContent } from "../Redux/AuthSlice";
import { getCurrentUser, getUserAccount, getUserContent, getWithdrawalHistory } from "../Redux/Asyncthunk";

const API_URL =process.env.REACT_APP_API_URL 

function ContentTab() {
  const [menuOpen, setMenuOpen] = useState(null);
const [videoStatuses, setVideoStatuses] = useState([]);
const [videoReadyMap, setVideoReadyMap] = useState({});
const [showCreatorHubModal, setShowCreatorHubModal] = useState(true);
  const { user } = useSelector((state) => state.auth);


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

const { content} = useSelector((state) => state.auth)
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

const isVideo = (item) => {
  if (!item || !item.preview_url) return false;
  return item.preview_url.includes("videodelivery.net");
};


  useEffect(() => {
  if (token) {
    dispatch(getCurrentUser());
    dispatch(getUserContent());
    dispatch(getUserAccount())
    dispatch(getWithdrawalHistory())
  }
}, [token, dispatch]);

useEffect(() => {
  if (!content || content?.length === 0) return;

  // Filter videos that are NOT ready in DB
  const videosToCheck = content
    .filter(item => isVideo(item) && !item.isReady)
    .map(item => item.full_url);

  if (videosToCheck?.length === 0) {
    // All videos are ready, set them in the map
    const readyMap = {};
    content.forEach(item => {
      if (isVideo(item)) readyMap[item?.full_url] = true;
    });
    setVideoReadyMap(readyMap);
    return;
  }

  const pollVideos = async () => {
    try {
      const res = await axios.post(`${API_URL}/check-video-status`, { videos: videosToCheck });

      setVideoReadyMap(prev => {
        const updated = { ...prev };
        res.data.results.forEach(v => {
          // Use full_url as key
          updated[v.id] = v.ready;
        });
        return updated;
      });

      const allReady = res.data.results.every(v => v.ready === true);
      if (!allReady) {
        setTimeout(pollVideos, 3000);
      }
    } catch (error) {
      console.error("Polling error:", error);
      setTimeout(pollVideos, 5000);
    }
  };

  pollVideos();
}, [content]);









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


{showCreatorHubModal && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h3>Welcome to Your Creator Hub!</h3>
      <p>
        Here you can share <strong>all your uploaded content at once</strong> and also share your social media links with your followers.
      </p>

      <div className="modal-actions">
        {/* Copy Creator Hub link */}
        <button
          className="copy-btn"
          onClick={() => {
            const creatorHubLink = `${window.location.origin}/creator/${user?.username}`;
            navigator.clipboard.writeText(creatorHubLink);
            toast.success("Creator Hub link copied!");
          }}
        >
          Copy Creator Hub Link
        </button>

        {/* View Creator Hub */}
        <a
          href={`/creator/${user?.username}`}
          target="_blank"
          rel="noreferrer"
          className="view-hub-link"
        >
          See Your Hub
        </a>

        {/* Edit Profile if bio/social not set */}
        {(!user?.bio || !user.social?.facebook) && (
          <button
            className="edit-profile-btn"
            onClick={() => {
              navigate("/profile");
              setShowCreatorHubModal(false);
            }}
          >
            Update Bio & Social Media
          </button>
        )}

        {/* Close modal */}
        <button
          className="info-hub-btn"
          onClick={() => setShowCreatorHubModal(false)}
        >
          Close info 
        </button>
      </div>
    </div>
  </div>
)}



    {/* Loading State */}
    {loading && <p>Loading content...</p>}

    {/* Content Cards */}
    <div className="content-grid">
      {content?.length > 0 ? (
        content.map((item) => (
          <div className="content-card" key={item._id}>
  {/* MEDIA PREVIEW */}
  
{isVideo(item) ? (
  !item.isReady && !videoReadyMap[item.full_url] ? (
    <div
      style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        color: "#fff",
        borderRadius: "10px",
        fontSize: "16px",
      }}
    >
      Processing video... please wait
    </div>
  ) : (
    <video
      src={`https://videodelivery.net/${item.full_url}/manifest/video.m3u8`}
      controls
      className="content-img"
      style={{ background: "#000", height: "auto" }}
    />
  )
) : item.full_url.endsWith(".pdf") ? (
  item.preview_url ? (
    <img src={item.preview_url} alt={item.title} className="content-img" />
  ) : (
    <div
      style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
        borderRadius: "10px",
        fontSize: "18px",
      }}
    >
      📄 PDF File
    </div>
  )
) : (
  <img src={item.full_url} alt={item.title} className="content-img" />
)}




  {/* CONTENT DETAILS */}
  <div className="content-details">
    <h3>{item.title}</h3>
    <p className="price">₦{item.price.toLocaleString()}</p>
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

  {/* Share to Earn */}
  <button
    className="share-btn"
    onClick={() => {
      navigator.clipboard.writeText(item.shareLink.trim().replace(/\s+/g, "%20"));
      toast.success("Share link copied! Earn when someone buys.");
    }}
  >
    <FaShieldAlt className="share-icon" /> Share to Earn
  </button>

  {/* MENU */}
  <div className="menu-wrapper">
    <FaEllipsisV
      className="menu-icon"
      onClick={() => toggleMenu(item._id)}
      color="black"
      size={22}
    />
    {menuOpen === item._id && (
      <div className="menu-dropdown">
        <button onClick={() => handleDelete(item._id)}>Delete</button>
      </div>
    )}
  </div>
</div>

        ))
      ) : (
        !loading && (
          <div
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
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/uplaod-content")}
          >
            <FiUpload size={48} color="#888" style={{ marginBottom: "16px" }} />
            <p style={{ fontSize: "16px", color: "#000000ff", maxWidth: "300px" }}>
              No content uploaded yet. Upload and start earning money!
            </p>
          </div>
        )
      )}
    </div>
  </div>
);

}

export default ContentTab;
