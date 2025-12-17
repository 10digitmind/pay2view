import { useState,useEffect,useRef } from "react";
import React  from "react";
import "../Styles/CreatorHub.css";
import { FaTwitter, FaInstagram, FaFacebook, FaSnapchat,FaTiktok } from "react-icons/fa";
import { FaEye, FaEllipsisV, FaShieldAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import '../Styles/CreatorHub.css'
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
        const res = await axios.get(`${API_URL}/get-user-by-username/${username}`);
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
          href={creator?.social?.twitter || "#"}
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
          href={creator?.social?.snapchat || "#"}
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
    <iframe
       src={`https://iframe.videodelivery.net/${item.snippetURL}`}
        title={`video-${item._id}`}
      allow="autoplay; encrypted-media; picture-in-picture"
      className="pch-video"
    />
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




