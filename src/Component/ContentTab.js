import React, { useState } from 'react'
import { FaEye, FaEllipsisV } from "react-icons/fa";
import '../Styles/ContentTab.css'

function ContentTab() {
const [menuOpen, setMenuOpen] = useState(null);

  const contents = [
    {
      id: 1,
      title: "Exclusive Tutorial",
      price: "₦5,000",
      views: 120,
      sold: 45,
      img: "https://plus.unsplash.com/premium_photo-1753982281836-4a7d5cb5792f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      descriptions:'very beautiful and simple picture'
    },
    {
      id: 2,
      title: "Behind the Scenes",
      price: "₦2,000",
      views: 90,
      sold: 30,
      img: "https://images.unsplash.com/photo-1750210955902-ce0e71765fb1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
       descriptions:'sex  picture'
    },
    {
      id: 3,
      title: "Behind the Scenes",
      price: "₦12,000",
      views: 90,
      sold: 40,
      img: "https://images.unsplash.com/photo-1755311903890-c0aed5dc2825?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
       descriptions:'nice sexy picture '
    },
  ];

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  return (
    <div className="content-page">
      {/* Header */}
      <div className="content-header">
        <h2>My Content</h2>
        <button className="upload-btn"> + Upload New Content</button>
      </div>

      {/* Content Cards */}
      <div className="content-grid">
        {contents.map((item) => (
          <div className="content-card" key={item.id}>
            <img src={item.img} alt={item.title} className="content-img" />
            <div className="content-details">
              <h3>{item.title}</h3>
              <p className="price">{item.price}</p>
              <div className="stats">
                <span>
                  <FaEye /> {item.views}
                </span>
                <span>Sold: {item.sold}</span>
              </div>
              <p style={{fontSize:'13px',textTransform:"capitalize"}}>{item.descriptions}</p>
            </div>

            {/* 3-dot Menu */}
            <div className="menu-wrapper">
              <FaEllipsisV
                className="menu-icon"
                onClick={() => toggleMenu(item.id)}
                color='green'
               size={22}
              />
              {menuOpen === item.id && (
                <div className="menu-dropdown">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentTab