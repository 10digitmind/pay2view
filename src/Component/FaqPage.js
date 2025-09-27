import { useState } from "react";
import {
  FaQuestionCircle,
  FaMoneyBillWave,
  FaUser,
  FaShoppingCart,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";
import "../Styles/faq.css";

export default function FaqPage() {
  const categories = [
    { key: "general", label: "General", icon: <FaQuestionCircle /> },
    { key: "payments", label: "Payments", icon: <FaMoneyBillWave /> },
    { key: "creators", label: "For Creators", icon: <FaUser /> },
    { key: "buyers", label: "For Buyers", icon: <FaShoppingCart /> },
    { key: "technical", label: "Technical", icon: <FaCogs /> },
    { key: "security", label: "Security", icon: <FaShieldAlt /> },
  ];

  const faqs = {
    general: [
      { q: "What is Pay2View?", a: "Pay2View is Nigeria's leading platform for premium content monetization, connecting creators and buyers." },
      { q: "How do I sign up?", a: "Click on Sign Up, provide your details, and verify your email or phone number." },
    ],
    payments: [
      { q: "What payment methods do you accept?", a: "We accept local debit cards, bank transfers, and mobile wallets." },
      { q: "Are there transaction fees?", a: "Yes, a small fee is applied per transaction to cover processing costs." },
    ],
    creators: [
      { q: "How do creators get paid?", a: "Creators receive payouts directly into their Nigerian bank accounts." },
      { q: "Is there a limit to how much I can earn?", a: "No, you can earn as much as you sell — there are no caps." },
    ],
    buyers: [
      { q: "How do I purchase content?", a: "Simply click 'Unlock' on a creator’s content and complete the one-time payment." },
      { q: "Can I get a refund?", a: "Refunds are handled case by case, depending on the situation." },
    ],
    technical: [
      { q: "Why can't I log in?", a: "Check your email for verification and reset your password if necessary." },
      { q: "Does Pay2View work on mobile?", a: "Yes, our platform is fully mobile-friendly." },
    ],
    security: [
      { q: "How secure is my data?", a: "We use bank-level encryption and fraud detection systems." },
      { q: "What if I suspect fraud?", a: "Contact our support team immediately for investigation." },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-page">
      {/* Title */}
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions</p>
      </header>

      {/* Category Selector */}
      <div className="faq-categories">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`faq-category ${activeCategory === cat.key ? "active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.key);
              setOpenIndex(null);
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="faq-list">
        {faqs[activeCategory].map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-question">
              <FaQuestionCircle className="q-icon" /> {item.q}
            </div>
            {openIndex === index && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="faq-support">
        <h3>Still have questions?</h3>
        <p>
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <a href="contact"><button className="support-btn">Contact Support</button></a>
      </div>
    </div>
  );
}
