import { useState,useEffect } from "react";

const TelegramBotAd = () => {
  const [show, setShow] = useState(true);

    useEffect(() => {
  const dismissed = localStorage.getItem("telegramAdDismissed");
  if (dismissed) setShow(false);
}, []);

const closeAd = () => {
  localStorage.setItem("telegramAdDismissed", "true");
  setShow(false);
};

  if (!show) return null;



  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* Close button */}
        <button
         onClick={closeAd}
          style={styles.close}
          aria-label="Close ad"
        >
          ✕
        </button>

        <h2 style={styles.title}>💸 Earn While You Sleep</h2>

        <p style={styles.text}>
          We built a Telegram bot that replies to your DMs automatically,
          filters unserious messages, and makes people pay before you reply.
        </p>

        <ul style={styles.list}>
          <li>✅ Auto-reply 24/7</li>
          <li>✅ No spam DMs</li>
          <li>✅ Get paid before replying</li>
        </ul>

        <a
          href="https://t.me/seriousDmBot?start=ref_pay2view_web_ad"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          🚀 Start on Telegram
        </a>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    pointerEvents: "none", // page remains clickable
  },
  card: {
    pointerEvents: "auto", // only card is clickable
    position: "relative",
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    width: "280px",
    textAlign: "left",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  close: {
    position: "absolute",
    top: "6px",
    right: "8px",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#888",
  },
  title: {
    marginBottom: "6px",
    fontSize: "15px",
    fontWeight: "600",
  },
  text: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "8px",
  },
  list: {
    fontSize: "13px",
    marginBottom: "10px",
    paddingLeft: "16px",
  },
  button: {
    display: "inline-block",
    background: "#000",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "13px",
  },
};


export default TelegramBotAd;
