import React, {  } from 'react'
import { useState } from 'react';
import '../Styles/Withdrawal.css'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getWithdrawalHistory } from '../Redux/Asyncthunk';
import api from '../utils/api';


const token = localStorage.getItem("authToken")
const API_URL =process.env.REACT_APP_API_URL 


export default function WithdrawalTab() {
   const [form, setForm] = useState({
    amount: "",
    bankName: "",
    accountName: "",
    accountNumber:""

  });

  const [loading,setLoading] = useState(false)
const { withdrawalsHistory } = useSelector((state) => state.auth);


const dispatch = useDispatch()



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
 setLoading(true);



if (form.amount < 1000) {
  toast.error("The minimum withdrawal amount is ₦1000. earn more to withdraw.");
  setLoading(false);
  return;
}

  try {
    const response = await api.post(
      `${API_URL}/request-withdrawals`,
      {
        bankName: form.bankName,
        accountName: form.accountName,
        accountNumber: form.accountNumber,
        amount: form.amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if JWT stored in localStorage
        },
      }
    );

    // Axios automatically parses JSON, so you can access response.data directly
    const data = response.data;

    toast.success(data.message || "Withdrawal request submitted successfully");
dispatch(getWithdrawalHistory())
    setForm({ amount: "", bankName: "", accountName: "", accountNumber: "" });
  } catch (error) {
    console.error("Withdrawal error:", error);
    setForm({ amount: "", bankName: "", accountName: "", accountNumber: "" });
setLoading(false)
    // Handle API error message if available
    const message =
      error.response?.data?.message || "Server error. Please try again later.";

    toast.error(message);
  }finally{
    setLoading(false)
  }
};




  return (
    <div className="withdrawal">
      {/* Request Withdrawal */}.
      <div className="withdrawal-request">
        <h2>Request Withdrawal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={(form.amount.toLocaleLowerCase())}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="form-group">
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
              required
            />
          </div>
          <div className="form-group">
            <label>Account Name</label>
            <input
              type="text"
              name="accountName"
              value={form.accountName}
              onChange={handleChange}
              placeholder="Enter account name"
              required
            />
          </div>
            <div className="form-group">
            <label>Account Number</label>
            <input
              type="number"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              placeholder="Enter account name"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="withdrawal-btn">
            {loading ? "Requesting withdrawal..." : "Request Withdrawal"}
          </button>
        </form>
      </div>

      {/* Withdrawal History */}
    <div className="withdrawal-history">
  <h2>Withdrawal History</h2>
  <div className="table-container">
    <table className="history-table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Bank</th>
          <th>Date & Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {withdrawalsHistory.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
              No withdrawal history available
            </td>
          </tr>
        ) : (
          withdrawalsHistory.map((item) => (
            <tr key={item._id || item.id}>
              <td>₦{(item?.amount.toLocaleString())}</td>
              <td>{item?.bankName}</td>
              <td>{new Date(item?.createdAt).toLocaleString()}</td>
              <td style={{color:`${item.status==='completed'?'green':'red'}`}}
              >
                {item.status}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}
