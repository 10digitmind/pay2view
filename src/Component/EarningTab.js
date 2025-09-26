import { useSelector } from 'react-redux';
import '../Styles/Earning.css'
import { useNavigate } from 'react-router-dom';


export default function EarningTab() {

      const { account} = useSelector((state) => state.auth)
     
      const navigate = useNavigate()
  return (
    <div className="earnings">
      <h2>Sales History</h2>

  <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Content</th>
              <th>Buyer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
         <tbody>
  {account?.soldContent?.length === 0 ? (
    <tr>
      <td style={{cursor:"pointer"}} onClick={()=>navigate('/uplaod-content')} colSpan="5" className="no-sales">
        <div className="no-sales-message">
          <span className="no-sales-icon">📦</span>
          <p>No sales content yet.<br />Upload and start earning!</p>
        </div>
      </td>
    </tr>
  ) : (
    account.soldContent.map((sale) => (
      <tr key={sale._id}>
        <td>
          <strong>{sale.title}</strong>
          <br />
          <small>{sale.reference}</small>
        </td>
        <td>{sale.buyerEmail}</td>
        <td>₦{(sale.amount).toLocaleString()}</td>
        <td>{new Date(sale.soldAt).toLocaleDateString()}</td>
        <td
style={{ color: sale.status === "success" ? "green" : "red" }}

        >
          {sale.status}
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}
 
