import React from 'react'
import { useState } from 'react';
import '../Styles/Withdrawal.css'

export default function WithdrawalTab() {
   const [form, setForm] = useState({
    amount: "",
    bank: "",
    accountName: "",
  });

  const [history] = useState([
    { id: 1, amount: "₦50,000", bank: "GTBank", date: "2025-08-20", status: "Completed" },
    { id: 2, amount: "₦15,000", bank: "Access Bank", date: "2025-08-25", status: "Pending" },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Withdrawal requested: ₦${form.amount} to ${form.bank}`);
    setForm({ amount: "", bank: "", accountName: "" });
  };

  return (
    <div className="withdrawal">
      {/* Request Withdrawal */}
      <div className="withdrawal-request">
        <h2>Request Withdrawal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="form-group">
            <label>Bank Name</label>
            <input
              type="text"
              name="bank"
              value={form.bank}
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
          <button type="submit" className="withdrawal-btn">
            Request Withdrawal
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
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.amount}</td>
                  <td>{item.bank}</td>
                  <td>{item.date}</td>
                  <td
                    className={`status ${
                      item.status === "Completed" ? "completed" : "pending"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
