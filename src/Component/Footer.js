// Footer.jsx
import React from "react";
import logo from "../Image/pay2view.png"; // adjust path to your logo
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import '../Styles/Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Pay2View Logo" />
      </div>

      {/* Footer Sections */}
      <div className="footer-sections">
        <div className="footer-column">
          <h4>Company</h4>
          <a href="about-us">About</a>
          <a href="contact">Contact</a>
        
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <a href="Terms-Condition">Terms</a>
          <a href="privacy-policy">Privacy</a>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <a href="faq">FAQs</a>
        </div>
      </div>

      {/* Socials */}
      <div className="footer-socials">
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebookF /></a>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Pay2View. All rights reserved.</p>
    </footer>
  );
};


export default Footer;
