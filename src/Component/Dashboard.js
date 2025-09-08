// Dashboard.js
import React, { useState } from "react";
import { FaTachometerAlt, FaFolder, FaMoneyBill, FaWallet, FaUser } from "react-icons/fa";
import "../Styles/Dashboard.css";
import DashboardHome from "./DashboardHome";
import ContentTab from "./ContentTab";
import EarningTab from "./EarningTab";
import WithdrawalTab from "./WithdrawalTab";
import ProfileTab from "./ProfileTab";

const tabs = [
  { name: "Dashboard", icon: <FaTachometerAlt />, component: <DashboardHome /> },
  { name: "Content", icon: <FaFolder />, component: <ContentTab /> },
  { name: "Earnings", icon: <FaMoneyBill />, component: <EarningTab /> },
  { name: "Withdrawal", icon: <FaWallet />, component: <WithdrawalTab /> },
  { name: "Profile", icon: <FaUser />, component: <ProfileTab /> },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const currentTab = tabs.find((tab) => tab.name === activeTab);

  return (
    <div className="dashboard-container">
      <div className="dashboard-nav">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`tab-item ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => setActiveTab(tab.name)}
          >
            <div className="tab-icon">{tab.icon}</div>
            <span className="tab-text">{tab.name}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-content">{currentTab.component}</div>
    </div>
  );
};

export default Dashboard;
