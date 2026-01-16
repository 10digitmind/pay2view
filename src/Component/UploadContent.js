import { useState,useEffect } from "react";
import { FaUpload, FaCheck, FaTimes, FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import "../Styles/UploadContent.css";
import { getCurrentUser } from "../Redux/Asyncthunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import api from "../utils/api";

const API_URL =process.env.REACT_APP_API_URL 

const UploadContent = ({setActiveTab}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [titleError, setTitleError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedContent, setUploadedContent] = useState(null);
 
const [removebtn, setRemovebtn] = useState(true);
const [uploadProgress, setUploadProgress] = useState(0);


  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setFile(file);

  // IMAGE PREVIEW
  if (file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return;
  }

  // VIDEO PREVIEW + DURATION VALIDATION
  if (file.type.startsWith("video/")) {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;

    

      if (duration < 10) {
        toast.error("Video must be at least 10 seconds long.");
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      if (duration > 60) {
        toast.error("Video cannot exceed 60 seconds.");
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      // Mark file as duration-validated (optional)
      file.validDuration = true;
     
    };

    video.src = url;
    return;
  }

  // PDF PREVIEW
  if (file.type === "application/pdf") {
    setPreviewUrl(null);
    return;
  }
};


  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);

    if (words.length > 100) {
      setTitleError("Title cannot exceed 100 words.");
    } else {
      setTitle(value);
      setTitleError("");
    }
  };


  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);

    if (words.length > 500) {
      setTitleError("Description cannot exceed 500 words.");
    } else {
      setDescription(value);
      setTitleError("");
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();


  if (!file || !title || !description || !price) {
    toast.error("Please complete all fields before submitting.");
    return;
  }
setRemovebtn(false)
  let uploadFile = file;

  try {
    // Only compress images; leave videos and other files as-is
    if (file.type.startsWith("image")) {
      uploadFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });
    }

    const formData = new FormData();
    formData.append("image", uploadFile); // field name must match Multer backend
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const simulateProgress = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 1));
    }, 100);

    const res = await api.post(`${API_URL}/upload-content`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(Math.min(percentCompleted, 90));
      },
    });

    clearInterval(simulateProgress);
    setUploadProgress(100);

    setTimeout(() => {
      setUploadedContent(res.data.content);
      setUploadSuccess(true);
      setRemovebtn(true)
      toast.success("Content uploaded successfully!");
      setUploading(false);
      setUploadProgress(0);
    }, 100);
  } catch (err) {
    console.error(err);
    setUploading(false);
    setUploadProgress(0);
    toast.error(err.response?.data || "Upload failed. Try again.");
  }
};





  // UI
  if (uploadSuccess && uploadedContent) {
    return (
      <div className="upload-success-container">
        <h2>Content uploaded successfully!</h2>
        <button onClick={() => navigate('/content')}>
          Go to Content
        </button>
        <button
          onClick={() => {
            setFile(null);
            setPreviewUrl(null);
            setTitle("");
            setDescription("");
            setPrice("");
            setUploadSuccess(false);
            setUploadedContent(null);
          }}
        >
          Upload Another
        </button>
      </div>
    );
  }

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        {!file && (
          <label htmlFor="file-upload" className="upload-box">
            <FaUpload className="upload-icon" />
            <p>Click to select a file </p>
            <small>Supported: JPG, PNG, PDF,mp4,.mov,.mkv</small>
            <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.mp4,.mov,.mkv,.webm"
              onChange={handleFileChange}
         
              hidden
            />
          </label>
        )}

        {file && (
          <div className="file-preview">
            <div className="preview-content">
              {previewUrl ? (
  file.type.startsWith("video/") ? (
    <video
      src={previewUrl}
      className="preview-image"
      controls
      width="250"
    />
  ) : (
    <img src={previewUrl} alt="Preview" className="preview-image" />
  )
) : (
  file.type === "application/pdf" ? (
    <div className="pdf-preview">
      <FaFilePdf className="pdf-icon" />
      <span>{file.name}</span>
    </div>
  ) : (
    <div className="file-name-preview">
      <span>{file.name}</span>
    </div>
  )
)}

             {removebtn? <button type="button" className="remove-btn" onClick={removeFile}>
                <FaTimes />
              </button>:''}
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Enter content title"
          className="upload-input"
          value={title}
          onChange={handleTitleChange}
        />
        <small style={{ color: titleError ? "red" : "#666" }}>
          {titleError ? titleError : `${title.trim().split(/\s+/).length}/100 words`}
        </small>

        <textarea
          placeholder="Describe your content..."
          className="upload-textarea"
          value={description}
          onChange={handleDescriptionChange}
        />
        <small style={{ color: titleError ? "red" : "#666" }}>
          {titleError
            ? titleError
            : `${description.trim().split(/\s+/).length}/500 words`}
        </small>

        <input
          type="number"
          placeholder="Enter price"
          className="upload-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p style={{ fontSize: "12px" }}>
          Set a fair price for your content (₦1 - ₦1,000,000)
        </p>
{uploading && (
  <div className="upload-progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${uploadProgress}%` }}
    />
    <span>{uploadProgress}%</span>
  </div>
)}

        <button
          type="submit"
          className="upload-submit-btn"
          disabled={uploading}
          style={{ opacity: uploading ? 0.6 : 1, cursor: uploading ? 'not-allowed' : 'pointer' }}
        >
          {uploading ? "Uploading please wait..." : <><FaCheck className="btn-icon" /> Upload Content</>}
        </button>
         <div className="security-section">
        <div className="security-item">
          <span className="circle"></span>
          Encrypted
        </div>
        <div className="security-item">
          <span className="circle"></span>
          Privacy Protected
        </div>
          <div className="security-item">
          <span className="circle"></span>
         Get paid fast
        </div>
      </div>
      </form>
      
    </div>
  );
};

export default UploadContent;
