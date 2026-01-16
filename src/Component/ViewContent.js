import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";

import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

import "../Styles/ViewContent.css";
import UnlockModal from "./UnlockModal";
 import Hls from "hls.js";

import api from "../utils/api";

const API_URL =process.env.REACT_APP_API_URL 

const ViewContent = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // -----------------------------
  // Fetch content metadata once
  // -----------------------------
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get(`${API_URL}/get-content/${id}`);
        const contentData = res.data.content;

        setContent(contentData);

        // Decide which video to play
        if (contentData.videoUrl) {
          setVideoSrc(
               contentData.snippetURL 
          );
        }
        // Set duration if already saved
        if (contentData.videoDuration) setDuration(contentData.videoDuration);
      } catch (err) {
        console.error("Failed to fetch content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  // -----------------------------
  // Canvas Blur for unpaid snippet
  // -----------------------------
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    if (content?.isPaid) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

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

    return () => cancelAnimationFrame(animationFrame);
  }, [content?.isPaid, videoReady]);

  // -----------------------------
  // Video snippet playback logic
  // -----------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || content?.isPaid) return;

    let intervalId;

    const checkReady = () => {
      if (video.readyState >= 3) {
        setVideoReady(true);
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

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        intervalId = setInterval(checkReady, 200);
      });

      return () => {
        clearInterval(intervalId);
        hls.destroy();
      };
    } else {
      video.src = videoSrc;
      intervalId = setInterval(checkReady, 200);
      return () => clearInterval(intervalId);
    }
  }, [videoSrc, content?.isPaid]);

  // -----------------------------
  // Replay snippet
  // -----------------------------
  const handleReplaySnippet = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  // -----------------------------
  // Format duration display
  // -----------------------------
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m:${secs}s` : `${secs}s`;
  };

  // -----------------------------
  // Render
  // -----------------------------
  if (loading)
    return (
      <div id="content-area">
        <div className="nice-loader">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );

  if (!content)
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Content not found</p>
      </div>
    );

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

          {/* Video Preview */}
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
                pointerEvents: "none",
              }}
            />
          )}

          {/* Image Preview */}
          {!content?.videoUrl && content.preview_url && (
            <img
              src={content.preview_url}
              alt={content.title}
              className="preview-img"
              style={{
                filter: !content.isPaid ? "blur(8px)" : "none",
                pointerEvents: "none",
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

        {/* Duration */}
        {content?.videoUrl && (
          <p style={{ marginBottom: "25px" }}>
            Video Duration: {duration ? formatDuration(duration) : "Loading..."}
          </p>
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

      {/* Unlock Modal */}
      <UnlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={content}
      />
    </>
  );
};

export default ViewContent;




