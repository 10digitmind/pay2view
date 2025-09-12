import React from 'react'
import { useState } from 'react';
import '../Styles/Profile.css'
import { useSelector } from 'react-redux';

export default function ProfileTab() {
 const [editMode, setEditMode] = useState(false);
   const { user} = useSelector((state) => state.auth)
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    image: "https://images.unsplash.com/photo-1756814879165-d2eb1606c3c0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D", // default placeholder
  });

  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    setProfile(form);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        {!editMode && (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>

      <div className="profile-pic">
        <img src={editMode ? form.image : profile.image} alt="Profile" />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="upload-input"
          />
        )}
      </div>

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
              value={user?.username}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <div className="profile-actions">
              <button className="save-btn" onClick={handleSave}>
                Save changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Full Name:</strong> {profile.fullName}
            </p>
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
