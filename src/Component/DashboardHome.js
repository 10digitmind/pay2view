import React, { useEffect } from "react";
import { FaWallet, FaFileAlt, FaDollarSign, FaUpload, FaClock } from "react-icons/fa";
import "../Styles/Dashboardhome.css";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../Redux/Asyncthunk";
import { useNavigate } from "react-router-dom";

const DashboardHome = ({setActiveTab}) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('authToken')
  const navigate = useNavigate()

  useEffect(()=>{
    if(token){
  dispatch(getCurrentUser())
    }

  },)
  return (
    <div className="dashboard-home">
      {/* Alert Badge */}
      <div className="alert-badge">
        <p>🔔 You have <strong>5 new content unlocks</strong> worth ₦15,000</p>
      </div>

     {/* Balance Section */}
<div className="balance-section">
  <div className="balance-info">
    <div className="balance-text">
      <h2>Available Balance</h2>
      <p className="balance-amount">₦120,500</p>
    </div >
    <p className="ready-text">💡 Ready to withdraw your funds?</p>
  </div>
<div className="withdraw-con-btn">
  <button  onClick={() => setActiveTab("Withdrawal")} className="withdraw-btn">
    <FaWallet className="wallet-icon" /> Withdraw Now
  </button>
</div>

</div>


      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <FaFileAlt color="green" className="stat-icon" />
          <h3>120</h3>
          <p>Content Sold</p>
          <small  style={{color:"green"}}>+125  this month</small>
        </div>

        <div className="stat-card">
          <FaUpload color="blue" className="stat-icon" />
          <h3>45</h3>
          <p>Content Uploaded</p>
          <small style={{color:"blue"}}>+3 this month</small>
        </div>

        <div className="stat-card">
          <FaDollarSign color='green' className="stat-icon" />
          <h3>₦250,000</h3>
          <p>Total Earnings</p>
          <small style={{color:"green"}}>+₦50,000 this month</small>
        </div>

        <div className="stat-card">
          <FaClock color="red" className="stat-icon" />
          <h3>₦15,000</h3>
           <small>Pending withdrawals</small>
          <p style={{color:'red'}}> 1 Pending request</p>
         
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
