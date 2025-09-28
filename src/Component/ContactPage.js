import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import '../Styles/contact.css'

const API_URL =process.env.REACT_APP_API_URL 
const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
if (!formData ) {
    toast.error('All field required')
    return 
  }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/contact`, formData);

      if (res.data.success) {
        toast.success("Message sent successfully!");
       setLoading(false)
       setFormData({
    fullname: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });

      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <FaEnvelope className="contact-icon" />
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          We're here to help. Send us a message and we'll respond as soon as
          possible.
        </p>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <h2>Contact Information</h2>
        <div className="info-item">
          <FaEnvelope className="info-icon" />
          <div>
            <h3>Email</h3>
            <p>hello@pay2view.ng</p>
            <span>General inquiries and support</span>
          </div>
        </div>
        <div className="info-item">
          <FaPhone className="info-icon" />
          <div>
            <h3>Phone</h3>
            <p>+234 (0) 906 123 4567</p>
            <span>Business hours: 9AM - 6PM WAT</span>
          </div>
        </div>
        <div className="info-item">
          <FaMapMarkerAlt className="info-icon" />
          <div>
            <h3>Address</h3>
            <p>Lagos, Nigeria</p>
            <span>Victoria Island, Lagos State</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form >
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="category-select"
            >
              <option value="">Select a category</option>
              <option value="support">Support</option>
              <option value="partnership">Partnership</option>
              <option value="press">Press</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Brief subject of the message"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Please provide as much detail as possible"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : <><FaPaperPlane size={13} className="send-icon"/> Send Message</>}
          </button>
        </form>
      </section>

      {/* Response time */}
      <section className="contact-info-box">
        <div className="response-time">
          <h3>Response Time</h3>
          <ul>
            <li>• General inquiries: Within 24 hours</li>
            <li>• Technical support: Within 4-6 hours</li>
            <li>• Payment issues: Within 2-4 hours</li>
            <li>• Emergency issues: Call our support line</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="faq-box">
          <h3>Need Quick Answers?</h3>
          <p>
            Check our FAQ section for common questions about payments, content
            upload, and account management.
          </p>
          <a href="/faq" className="faq-link">Browse FAQ →</a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
