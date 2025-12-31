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
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  card: {
    position: "relative",
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
  },
  title: {
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "12px",
  },
  list: {
    textAlign: "left",
    fontSize: "14px",
    marginBottom: "16px",
  },
  button: {
    display: "inline-block",
    background: "#000",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default TelegramBotAd;
