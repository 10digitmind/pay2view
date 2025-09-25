import { useState,useEffect } from "react";
import { FaUpload, FaCheck, FaTimes, FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import "../Styles/UploadContent.css";
import { getCurrentUser } from "../Redux/Asyncthunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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


  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Only JPG, PNG, and PDF files are supported.");
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image")) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
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

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    try {
      setUploading(true);
      const res = await axios.post(`${API_URL}/upload-content`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUploadedContent(res.data.content);
      setUploadSuccess(true);
      toast.success("Content uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // UI
  if (uploadSuccess && uploadedContent) {
    return (
      <div className="upload-success-container">
        <h2>Content uploaded successfully!</h2>
        <button onClick={() => navigate('/dashboard')}>
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
            <small>Supported: JPG, PNG, PDF</small>
            <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
         
              hidden
            />
          </label>
        )}

        {file && (
          <div className="file-preview">
            <div className="preview-content">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="preview-image" />
              ) : (
                <div className="pdf-preview">
                  <FaFilePdf className="pdf-icon" />
                  <span>{file.name}</span>
                </div>
              )}
              <button type="button" className="remove-btn" onClick={removeFile}>
                <FaTimes />
              </button>
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

        <button
          type="submit"
          className="upload-submit-btn"
          disabled={uploading}
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
      </div>
      </form>
      
    </div>
  );
};

export default UploadContent;
