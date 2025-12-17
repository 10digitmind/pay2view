import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "../Styles/ViewContent.css";
import UnlockModal from "./UnlockModal";
 import Hls from "hls.js";
import { FiCornerDownLeft } from "react-icons/fi";

const API_URL =process.env.REACT_APP_API_URL 

const ViewContent = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
    const [duration, setDuration] = useState(0);
    const canvasRef = useRef(null);

  const videoRef = useRef(null);

  // Fetch video snippet URL
  useEffect(() => {
    const fetchVideoSnippet = async () => {
      try {
        const res = await axios.get(`${API_URL}/video-snippet/${id}`);
        setVideoSrc(res.data.unlocked ? res.data.videoURL : res.data.snippetURL);
      } catch (err) {
        console.error("Failed to fetch video snippet:", err);
      }
    };
    fetchVideoSnippet();
  }, [id]);







  // Fetch content metadata
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-content/${id}`);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);



  useEffect(() => {
  if (content?.videoDuration) {
    setDuration(content.videoDuration);
    return;
  }
}, [ content]);
  // Handle snippet playback






// Canvas Blur Preview (only for snippet preview)
useEffect(() => {
  if (!videoRef.current || !canvasRef.current) return;
  if (content?.isPaid) return; // No blur for paid content

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  let animationFrame;

  const drawBlurredFrame = () => {
    if (video.paused || video.ended) {
      animationFrame = requestAnimationFrame(drawBlurredFrame);
      return;
    }

    // Match canvas size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // REAL blur applied to video pixels
    ctx.filter = "blur(20px)";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    animationFrame = requestAnimationFrame(drawBlurredFrame);
  };

  video.addEventListener("play", () => {
    drawBlurredFrame();
  });

  return () => cancelAnimationFrame(animationFrame);
}, [content?.isPaid, videoReady]);





useEffect(() => {
  const video = videoRef.current;
  if (!video || !videoSrc || content?.isPaid) return;

  let intervalId;

  const checkReady = () => {
    // readyState 3 or 4 means video has enough data to play
    if (video.readyState >= 3) {
    
  setVideoReady(true)
      clearInterval(intervalId);

      const snippetDuration = 3; // seconds
      const handleTimeUpdate = () => {
        if (video.currentTime >= snippetDuration) {
          video.pause();
          video.currentTime = 0;
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.play().catch(() => {});
    }
  };

  // HLS support
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // Start interval to check if video is playable
      intervalId = setInterval(checkReady, 200); // check every 200ms
    });

    return () => {
      clearInterval(intervalId);
      hls.destroy();
    };
  } else {
    // Safari / native HLS fallback
    video.src = videoSrc;
    intervalId = setInterval(checkReady, 200);
    return () => clearInterval(intervalId);
  }
}, [videoSrc, content?.isPaid]);






  // Replay snippet
  const handleReplaySnippet = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins > 0 ? `${mins}m:${secs}s` : `${secs}s`;
};


  if (loading)
    return (
      <div id="content-area">
        <div className="nice-loader">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );

  if (!content) return <div style={{height:'50vh', display:'flex',justifyContent:'center',alignItems:"center"}}>

    <p>Content not found</p>
    </div>

  return (
  <>
    <div className="view-content-container">
      <div className="content-preview">

        {/* Placeholder while video loads */}
        {!videoReady && content?.videoUrl && (
          <div id="content-area">
            <div className="nice-loader">
            
              <p style={{ color: "white" }}>Loading snippet...</p>
            </div>
          </div>
        )}

        {/* Video Preview (Blurred if not paid) */}
        {content?.videoUrl && (
          <video
            ref={videoRef}
            src={videoSrc} 
            className="preview-img"
            muted
            controls={false}
            width="100%"
            style={{
              display: videoReady ? "block" : "none",
              filter: !content.isPaid ? "blur(30px)" : "none",
              pointerEvents: "none" // cannot click or inspect
            }}
          />
        )}

        {/* Image Preview (Blurred if not paid) */}
        {!content?.videoUrl && content.preview_url && (
          <img
            src={content.preview_url}
            alt={content.title}
            className="preview-img"
            style={{
              filter: !content.isPaid ? "blur(8px)" : "none",
              pointerEvents: "none"
            }}
          />
        )}

        {/* No Preview */}
        {!content?.videoUrl && !content.preview_url && (
          <div
            style={{
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f4f4f4",
              borderRadius: "10px",
              fontSize: "18px",
            }}
          >
            📄 No Preview Available
          </div>
        )}

        {/* Replay Button – only for video & unpaid */}
        {content.videoUrl && !content.isPaid && (
          <button className="replay-snippet-btn" onClick={handleReplaySnippet}>
            Replay Snippet
          </button>
        )}

        {/* Lock Overlay */}
        <div className="lock-overlay">
          <FaLock className="lock-icon" />
          <span className="price-tag">₦{content.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Duration – only for video */}
      {content?.videoUrl && (
        duration ? (
          <p style={{ marginBottom: '25px' }}>
            Video Duration: {formatDuration(duration)}
          </p>
        ) : (
          <p>Loading duration...</p>
        )
      )}

      {/* About content */}
      <div className="about-content">
        <h2>About This Content</h2>
        <p>{content.description}</p>
        <div className="about-info">
          <p>{content.title}</p>
          <p>High Resolution</p>
          <p>Exclusive</p>
        </div>
      </div>

      {/* Secure purchase */}
      <div className="secure-purchase">
        <h3>Secure Purchase</h3>
        <ul>
          <li>
            <FaShieldAlt color="green" /> Encrypted payment processing
          </li>
          <li>
            <FaCheckCircle color="green" /> Instant access after purchase
          </li>
          <li>
            <FaCheckCircle color="green" /> 30-day satisfaction guarantee
          </li>
        </ul>
      </div>

      {/* Unlock Button */}
      <button className="unlock-btn" onClick={() => setModalOpen(true)}>
        Unlock for ₦{content.price.toLocaleString()}
      </button>
      <p className="one-time-payment">One-time payment. No subscription required</p>
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
