import { useEffect, useState } from "react";

const NewUnlocksMessage = ({ soldContent }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!soldContent || soldContent.length === 0) return;

    // 1. Get lastCheckedAt from localStorage or use a default far past date
    const lastCheckedAt = localStorage.getItem("lastCheckedAt") || new Date(0).toISOString();

    // 2. Filter new sales since last check
    const newSales = soldContent.filter(
      (item) => new Date(item.soldAt) > new Date(lastCheckedAt)
    );

    if (newSales.length > 0) {
      // 3. Calculate total amount
      const totalAmount = newSales.reduce((sum, item) => sum + Number(item.amount), 0);

      // 4. Set the message
      setMessage(
        `You have ${newSales.length} new content unlock${newSales.length > 1 ? "s" : ""} worth ₦${totalAmount.toLocaleString()}`
      );

      // 5. Update lastCheckedAt AFTER showing message
      localStorage.setItem("lastCheckedAt", new Date().toISOString());
    }
  }, [soldContent]);

  return message ? <p className="text-green-600">{message}</p> : null;
};

export default NewUnlocksMessage;


