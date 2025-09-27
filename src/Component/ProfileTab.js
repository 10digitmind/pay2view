import React from 'react'
import { useState,useEffect } from 'react';
import '../Styles/Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import { getCurrentUser } from '../Redux/Asyncthunk';
import SettingsPage from './SettingPage';


const API_URL =process.env.REACT_APP_API_URL 


export default function ProfileTab() {
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
const dispatch = useDispatch()

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    profilePic: user?.profilePic || "", // can be empty
  });


  // Keep form in sync if user changes in store
  useEffect(() => {
    setForm({
      fullName: user?.fullName || "",
      username: user?.username || "",
      profilePic: user?.profilePic || "",
    });

  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
   setLoading(false)
    try {
      const data = new FormData();
      data.append("fullName", form.fullName);
      data.append("username", form.username);

      if (form.newImageFile) {
        data.append("image", form.newImageFile);
      }

   const token = localStorage.getItem('authToken')
      const res = await axios.post(`${API_URL}/update-user-profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

    

if(res.data.message === 'Profile updated successfully'){
   setLoading(true)
}
  toast.success(res.data.message || "Profile updated successfully");
      setEditMode(false);

   dispatch(getCurrentUser())
      // optionally update redux store with updated user
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
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

          <label>Email</label>
          <input type="email" value={user?.email} disabled />

          <div className="profile-actions">
            <button className="save-btn"  onClick={handleSave}>
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
        </>
      )}
    </div>
    <SettingsPage/>
  </div>
);

}