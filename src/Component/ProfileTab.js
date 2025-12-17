import React from 'react'
import { useState,useEffect } from 'react';
import '../Styles/Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTwitter, FaInstagram, FaFacebook, FaSnapchat,FaTiktok } from "react-icons/fa";
import { getCurrentUser } from '../Redux/Asyncthunk';
import SettingsPage from './SettingPage';


const API_URL =process.env.REACT_APP_API_URL 


export default function ProfileTab() {
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
   const [usernameStatus, setUsernameStatus] = useState("idle");
// "idle" | "checking" | "available" | "taken" | "error"

  
const dispatch = useDispatch()

 const [form, setForm] = useState({
  fullName: "",
  username: "",
  profilePic: "",
  bio: "",
  social: {
    facebook: "",
    x: "",
    tiktok: "",
    snapchat: "",
    instagram: "",
  },
});


  // Keep form in sync if user changes in store
  useEffect(() => {
  if (user) {
    setForm({
      fullName: user.fullName || "",
      username: user.username || "",
      profilePic: user.profilePic || "",
      bio: user.bio || "",
      social: {
        facebook: user.social?.facebook?.replace("https://facebook.com/", "") || "",
        x: user.social?.x?.replace("https://x.com/", "") || "",
        instagram: user.social?.instagram?.replace("https://instagram.com/", "") || "",
        tiktok: user.social?.tiktok
          ?.replace("https://tiktok.com/@", "") || "",
        snapchat: user.social?.snapchat
          ?.replace("https://snapchat.com/add/", "") || "",
      },
    });
  }
}, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSocialChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    social: {
      ...prev.social,
      [name]: value,
    },
  }));
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image locally
      setForm((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
        newImageFile: file, // save file for uploading
      }));
    }
  };

  const handleSave = async () => {
  setLoading(true); // start loading
  try {
    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("username", form.username);
    data.append("bio", form.bio || "");

    // Construct social URLs from handles
    const socialUrls = {
      facebook: form.social.facebook
        ? `https://facebook.com/${form.social.facebook}`
        : "",
      x: form.social.x ? `https://x.com/${form.social.x}` : "",
      instagram: form.social.instagram
        ? `https://instagram.com/${form.social.instagram}`
        : "",
      tiktok: form.social.tiktok
        ? `https://tiktok.com/@${form.social.tiktok}`
        : "",
      snapchat: form.social.snapchat
        ? `https://snapchat.com/add/${form.social.snapchat}`
        : "",
    };

    data.append("social", JSON.stringify(socialUrls)); // append social as JSON string

    if (form.newImageFile) {
      data.append("image", form.newImageFile);
    }

    const token = localStorage.getItem("authToken");

    const res = await axios.post(`${API_URL}/update-user-profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.message === "Profile updated successfully") {
      toast.success(res.data.message || "Profile updated successfully");
      setEditMode(false);
      dispatch(getCurrentUser()); // update redux store
    }

    setLoading(false); // stop loading
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Failed to update profile"
    );
    setLoading(false);
  }
};


  const handleCancel = () => {
    setForm({
      fullName: user?.fullName || "",
      username: user?.username || "",
      profilePic: user?.profilePic || "",
    });
    setEditMode(false);
  };



const checkUsername = async (username) => {
 setUsernameStatus("checking");
  try {
    

    const token = localStorage.getItem("authToken");

    const res = await axios.get(
      `${API_URL}/check-username-availability?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Normal availability check
    if (res.data.available) {
      setUsernameStatus("available");
    } else {
      setUsernameStatus("taken");
    }
  } catch (err) {
   
    // Handle reserved username specifically
    if (err.response?.status === 400 || err.response?.data?.message === "This username is reserved") {
      setUsernameStatus("reserved");
    } else {
      setUsernameStatus("error"); // generic error
    }
  }
};




 function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const debouncedUsername = useDebounce(form.username, 500);

useEffect(() => {
  if (!debouncedUsername || debouncedUsername === user?.username) {
    setUsernameStatus("idle");
    return;
  }
  checkUsername(debouncedUsername);
}, [debouncedUsername]);



useEffect(() => {
  if (!editMode) return;

  const timer = setTimeout(() => {
    checkUsername(form.username);
  }, 500);
  console.log("usernameStatus:", usernameStatus);


  return () => clearTimeout(timer);
}, [form.username, editMode]);




  return (
  <div className="profile-container">
    <div className="profile-header">
      <h2>My Profile</h2>
      {!editMode && (
        <button className="edit-btn" onClick={() => setEditMode(true)}>
          Edit-Profile
        </button>
      )}
    
    </div>

    {/* Profile Picture with Fallback and Edit Overlay */}
    <div className="profile-avatar-container">
      <div className="avatar-wrapper">
        {form.profilePic ? (
          <img src={form.profilePic} alt="Profile" className="avatar-img" />
        ) : (
          <div className="avatar-fallback">
            {form.username?.slice(0, 2).toUpperCase() || "US"}
          </div>
        )}

        {editMode && (
          <>
            <label htmlFor="profilePicInput" className="avatar-edit-overlay">
              ✎
            </label>
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>
    </div>
    {/* Profile Details */}
    <div className="profile-details">
      {editMode ? (
        <>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form?.username}
            onChange={handleChange}
          />
{usernameStatus === "checking" && <p>Checking...</p>}
{usernameStatus === "available" && <p className="ok">Username available ✅</p>}
{usernameStatus === "taken" && <p className="error">Username already taken ❌</p>}
{usernameStatus === "reserved" && <p className="error">This username is reserved 🚫</p>}
{usernameStatus === "error" && <p className="error">Error checking username ⚠️</p>}



          <label>Email</label>
          <input type="email" value={user?.email} disabled />

          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={form?.bio}
            onChange={handleChange}
          />
    

   <div className="profile-socials-title-wrapper">
  <h6 className="profile-socials-title">Social Media</h6>
  <h5>Please add your social media username only </h5>
</div>
<label>Facebook</label>
<input
  placeholder={`Your username only, e.g. ${user?.username || "johndoe"}`}
  type="text"
  name="facebook"
  value={form?.social.facebook}
  onChange={handleSocialChange}
/>


<label>(Twitter/X)</label>
<input
  placeholder={`Your username only, e.g. ${user?.username || "johndoe"}`}
  type="text"
  name="x"
  value={form?.social?.x}
   onChange={handleSocialChange}
/>

<label>TikTok</label>
<input
  placeholder={`Your username only, e.g. ${user?.username || "johndoe"}`}
  type="text"
  name="tiktok"
  value={form?.social?.tiktok}
  onChange={handleSocialChange}
/>

<label>Snapchat</label>
<input
  placeholder={`Your username only, e.g. ${user?.username || "johndoe"}`}
  type="text"
  name="snapchat"
  value={form?.social?.snapchat}
  onChange={handleSocialChange}
/>

<label>Instagram</label>
<input
  placeholder={`Your username only, e.g. ${user?.username || "johndoe"}`}
  type="text"
  name="instagram"
  value={form?.social?.instagram}
   onChange={handleSocialChange}
/>



          <div className="profile-actions">
            <button className="save-btn"   disabled={usernameStatus === "taken" || usernameStatus === "checking" || usernameStatus === "reserved"}  onClick={handleSave}>
             {loading?'Save changes':'saving changes....'} 
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
        

          <p>
            <strong>Full Name:</strong> {user?.fullName || "-"}
          </p>
          <p>
            <strong>Username:</strong> {user?.username || "-"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "-"}
          </p>

          <div className="profile-socials">
  {user?.social?.facebook && (
    <a href={user.social?.facebook} target="_blank" rel="noreferrer">
      <FaFacebook />
    </a>
  )}
  {user?.social?.x && (
    <a href={user.social?.x} target="_blank" rel="noreferrer">
      {/* You can use a custom X icon if you have it */}
      <span className="x-icon">X</span>
    </a>
  )}
  {user?.social?.tiktok && (
    <a href={user.social?.tiktok} target="_blank" rel="noreferrer">
      <FaTiktok className="social-icon" />
    </a>

  )}
  {user?.social?.snapchat && (
    <a href={user.social?.snapchat} target="_blank" rel="noreferrer">
      <FaSnapchat />
    </a>
  )}
  {user?.social?.instagram && (
    <a href={user.social.instagram} target="_blank" rel="noreferrer">
      <FaInstagram />
    </a>
  )}
</div>
        </>
      )}
    </div>
    <SettingsPage/>
  </div>
);

}