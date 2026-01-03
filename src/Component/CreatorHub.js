import { useState,useEffect,useRef } from "react";
import React  from "react";
import "../Styles/CreatorHub.css";
import { FaTwitter, FaInstagram, FaFacebook, FaSnapchat,FaTiktok } from "react-icons/fa";
import { FaEye, FaEllipsisV, FaShieldAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import '../Styles/CreatorHub.css'
import api from "../utils/api";
 import Hls from "hls.js";
const API_URL =process.env.REACT_APP_API_URL 

// Mock Data (replace with API fetch later)

const CreatorHub = () => {

 const [creator, setCreator] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const {username} = useParams()
  const [filter, setFilter] = useState("all");

const isPDF = (item) => item?.full_url?.endsWith(".pdf");
const isVideo = (item) => item?.preview_url.includes("videodelivery.net");

 const filteredContent = content.filter((item) => {
  if (filter === "all") return true;

  if (filter === "video") return isVideo(item);

  if (filter === "pdf") return isPDF(item);

  if (filter === "image")
    return !isVideo(item) && !isPDF(item);

  return true;
});
// track ready state per video

const navigate = useNavigate();

useEffect(() => {
    const fetchCreator = async () => {
      try {
        const res = await api.get(`${API_URL}/get-user-by-username/${username}`);
      console.log('get',res)
        setCreator(res.data.creator);
        setContent(res.data.userContent);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }

  };

    fetchCreator();
  }, [username]);



useEffect(() => {
  content.forEach((item) => {
    if (isVideo(item) && !item.isPaid && item.snippetURL) {
      const video = item.videoRef;
      const canvas = item.canvasRef;
      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d");
      let animationFrame;

      // -----------------------------
      // HLS setup
      // -----------------------------
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(item.snippetURL); // your snippet HLS URL
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else {
        video.src = item.snippetURL;
        video.play().catch(() => {});
      }

      // -----------------------------
      // Draw blurred frames on canvas
      // -----------------------------
      const drawBlurredFrame = () => {
        if (video.paused || video.ended) {
          animationFrame = requestAnimationFrame(drawBlurredFrame);
          return;
        }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.filter = "blur(90px)";
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        animationFrame = requestAnimationFrame(drawBlurredFrame);
      };

      video.addEventListener("play", drawBlurredFrame);

      // cleanup
      return () => cancelAnimationFrame(animationFrame);
    }
  });
}, [content]);



const pay2viewLink = (itemId,itemname) => {
  window.open(
    `https://www.pay2view.io/view-content/${itemname}/${itemId}`,
    "_blank"
  );
};




  if (loading) return <p>Loading...</p>;
  if (!creator) return <p>Creator not found</p>;

 
// or: Boolean(item?.full_url) if full_url is UID

    
 return (
  <div className="pch-container">
    {/* CREATOR INFO */}
    <div className="pch-creator-info">
      <img
        src={creator?.profilePic || "/default-profile.png"}
        alt={creator?.fullName}
        className="pch-creator-pic"
      />

      <h2>{creator?.fullName}</h2>

      <p>
        {creator?.bio ||
          "This is a temporary bio. The creator can update it later."}
      </p>

      <div className="pch-socials">
        <a
          href={creator?.social?.x || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>

        <a
          href={creator?.social?.instagram || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>

        <a
          href={creator?.social?.facebook || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </a>

        <a
          href={creator?.social?.snapchat || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <FaSnapchat />
        </a>

         <a
          href={creator?.social?.tiktok || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <FaTiktok />
        </a>
      </div>
    </div>

    {/* CONTENT TYPE FILTER */}
 <div className="pch-filter-bar">
  <button
    className={`pch-filter-btn ${filter === "all" ? "active" : ""}`}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={`pch-filter-btn ${filter === "video" ? "active" : ""}`}
    onClick={() => setFilter("video")}
  >
    Video
  </button>

  <button
    className={`pch-filter-btn ${filter === "image" ? "active" : ""}`}
    onClick={() => setFilter("image")}
  >
    Image
  </button>

  <button
    className={`pch-filter-btn ${filter === "pdf" ? "active" : ""}`}
    onClick={() => setFilter("pdf")}
  >
    PDF
  </button>
</div>


    {/* CONTENT GRID */}
  <div className="pch-grid">
  {filteredContent && filteredContent.length > 0 ? (
    filteredContent.map((item) => (
      <div key={item._id} className="pch-card">
        {/* MEDIA */}
 <div className="pch-media">
  {isPDF(item) ? (
    item.preview_url ? (
      <img src={item.preview_url} alt={item.title} />
    ) : (
      <div className="pch-processing">📄 PDF File</div>
    )
  ) : isVideo(item) ? (
    <div style={{ position: "relative" }}>
      {/* Video */}
      <video
        ref={(el) => (item.videoRef = el)}
        muted
        controls={false}
        className="pch-video"
        style={{
          width: "100%",
          filter: item.isPaid ? "none" : "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Canvas for blur */}
      {!item.isPaid && (
        <canvas
          ref={(el) => (item.canvasRef = el)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Replay button for unpaid snippets */}
      {!item.isPaid && (
        <button
          className="pch-replay-btn"
          onClick={() => {
            if (item.videoRef) {
              item.videoRef.currentTime = 0;
              item.videoRef.play().catch(() => {});
            }
          }}
        >
          Replay
        </button>
      )}
    </div>
  ) : (
    <img src={item.preview_url} alt={item.title} />
  )}
</div>



        {/* DETAILS */}
        <div className="pch-details">
          <h4>{item.title}</h4>

          <p className="pch-price">
            ₦{item.price.toLocaleString()}
          </p>

          <div className="pch-stats">
            <span>
              <FaEye /> {item.viewCount || 0}
            </span>
            <span>Sold: {item.soldCount || 0}</span>
          </div>
        </div>

        {/* SHARE */}
      <button
      className="pch-pay-btn"
  onClick={() => pay2viewLink(item._id,item.title)}
><FaShieldAlt /> pay2view
</button>

      </div>
    ))
  ) : (
    !loading && (
      <div
        className="pch-empty"
    
      >
      
        <p>
        Content not available
        </p>
      </div>
    )
  )}
</div>

  </div>
);


};

export default CreatorHub;




