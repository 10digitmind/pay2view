import React from "react";
import "../Styles/chatbutton.css"; // Import the CSS file
import { IoLogoWhatsapp } from "react-icons/io";

const ChatButton = () => {
  const phoneNumber = "2348163446758"; // WhatsApp number in international format
  const message = "Hello, I need assistance!"; // Default message

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="chat-button">
      Chat with us! <IoLogoWhatsapp size={20} />
    </a>
  );
    };
    
  export default ChatButton;