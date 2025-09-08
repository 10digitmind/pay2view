import '../Styles/Earning.css'


export default function EarningTab() {
   const sales = [
    {
      id: 1,
      title: "Exclusive Tutorial",
      reference: "TXN12345",
      buyer: "john@example.com",
      amount: "₦5,000",
      date: "2025-09-01",
      status: "Completed",
    },
    {
      id: 2,
      title: "Behind the Scenes",
      reference: "TXN67890",
      buyer: "jane@example.com",
      amount: "₦2,000",
      date: "2025-09-03",
      status: "Pending",
    },
  ];

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
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>
                  <strong>{sale.title}</strong>
                  <br />
                  <small>{sale.reference}</small>
                </td>
                <td>{sale.buyer}</td>
                <td>{sale.amount}</td>
                <td>{sale.date}</td>
                <td
                  className={`status ${
                    sale.status === "Completed" ? "completed" : "pending"
                  }`}
                >
                  {sale.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
