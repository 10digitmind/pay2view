import React, { useEffect, useState } from "react";
import { FaWallet, FaFileAlt, FaDollarSign, FaUpload, FaClock } from "react-icons/fa";
import "../Styles/Dashboardhome.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUserAccount, getUserContent, getWithdrawalHistory } from "../Redux/Asyncthunk";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useMemo } from "react";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import isWithinInterval from "date-fns/isWithinInterval";
import parseISO from "date-fns/parseISO";
import isAfter from "date-fns/isAfter";


const DashboardHome = ({setActiveTab}) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('authToken')


  

    const { content,loading,account,withdrawalsHistory} = useSelector((state) => state.auth)
  

  useEffect(() => {
  if (token) {
    dispatch(getCurrentUser());
    dispatch(getUserContent());
    dispatch(getUserAccount())
    dispatch(getWithdrawalHistory())
  }
}, [token, dispatch]);

  // item sold this month 

  const thisMonthSoldCount = useMemo(() => {
  if (!account?.soldContent) return 0;

  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  return account.soldContent.filter(item => {
    const soldDate = parseISO(item.soldAt);
    return isWithinInterval(soldDate, { start, end });
  }).length;
}, [account?.soldContent]);


// this mont erning calculation
const thisMonthEarnings = useMemo(() => {
  if (!account?.soldContent) return 0;

  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  return account.soldContent
    .filter(item => {
      const soldDate = parseISO(item.soldAt);
      return isWithinInterval(soldDate, { start, end });
    })
    .reduce((total, item) => total + Number(item.amount), 0);
}, [account?.soldContent]);

// this month uplaod calculation

const thisMonthUploads = useMemo(() => {
  if (!content || !Array.isArray(content)) return 0;

  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  return content.filter(item => {
    if (!item.createdAt) return false;
    const createdDate = parseISO(item.createdAt);
    return isWithinInterval(createdDate, { start, end });
  }).length;
}, [content]);

//sales alet 



  return (
    <div className="dashboard-home">
      {/* Alert Badge */}
      <div className="alert-badge">
    
{loading?<p>Loading your alert ..</p>:<p > 🔔 You've sold {thisMonthSoldCount}  content this month worth of #{thisMonthEarnings.toLocaleString()}</p>}

      </div>

     {/* Balance Section */}
<div className="balance-section">
  <div className="balance-info">
 <div className="balance-text">
  <h2>Available Balance</h2>

  {loading ? (
    <p className="balance-amount">Loading balance...</p>
  ) : account?.balance != null && !isNaN(account.balance) ? (
    <p className="balance-amount">₦{Number(account.balance).toLocaleString()}</p>
  ) : (
    <p  className="balance-amount">Unable to load balance try again</p>
  )}
</div>
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
        {loading?<h3>Loading ...</h3>:<h3>{account?.soldContent ? account.soldContent.length : 0}</h3>}
          <p>Content Sold</p>
          <small  style={{color:"green"}}>+{thisMonthSoldCount.toLocaleString()}  this month</small>
        </div>

        <div className="stat-card">
          <FaUpload color="blue" className="stat-icon" />
          {loading?<h3>loading...</h3>:<h3>{content.length}</h3>}
          <p>Content Uploaded</p>
          <small style={{color:"blue"}}>+ {thisMonthUploads.toLocaleString()} this month</small>
        </div>

        <div className="stat-card">
          <FaDollarSign color='green' className="stat-icon" />
         { loading?<h3>loading..</h3>:<h3>{account?.balance?.toLocaleString()}</h3>}
          <p>Total Earnings</p>
          <small style={{color:"green"}}>+₦{thisMonthEarnings.toLocaleString()}this month</small>
        </div>

<div className="stat-card">
  <FaClock color="red" className="stat-icon" />

  {withdrawalsHistory.filter(w => w.status === "pending").length > 0 ? (
    withdrawalsHistory
      .filter(w => w.status === "pending")
      .map((w) => (
        <div key={w._id}>
          <h3>₦{w.amount.toLocaleString()}</h3>
          <small>Pending withdrawal</small>
          <p style={{ color: "red" }}>1 Pending request</p>
        </div>
      ))
  ) : (
    <div>
      <h3>₦0</h3>
      <small>No pending withdrawals</small>
      <p style={{ color: "gray" }}>You have no pending withdrawal</p>
    </div>
  )}
</div>



      </div>
    </div>
  );
};

export default DashboardHome;
