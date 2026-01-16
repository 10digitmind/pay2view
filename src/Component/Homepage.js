import React, { useEffect } from 'react'
import '../Styles/Homepage.css'
import { FaUpload, FaDollarSign, FaBolt } from "react-icons/fa";
import CountUp from "react-countup";
import TelegramBotAd from './TelegramBotAd';

const testimonials = [
  {
    name: "Adaobi E.",
    job: "Photographer",
    story: "Pay2View made it easy to charge for my photos without building a full website.",
    image: "https://plus.unsplash.com/premium_photo-1671748710978-2ff3ae35a64d?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Tunde B.",
    job: "Digital Artist",
    story: "I use Pay2View as a simple payment and access tool for my digital art.",
    image: "https://images.unsplash.com/photo-1484517186945-df8151a1a871?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Chiamaka O.",
    job: "Content Creator",
    story: "Pay2View helps me share paid content with my audience without technical setup.",
    image: "https://images.unsplash.com/photo-1647338064700-21f154b6720e?w=900&auto=format&fit=crop&q=60",
  },
];




 const stats = [
  { label: "Setup Time", value:3, suffix: " Minutes" },
  { label: "Steps to Sell", value: 3 },
  { label: "Monthly Fees", value: 0, suffix: "%" },
];


export default function Homepage() {
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (
    <>
  <section className='hero-section'>
    <div>
      <TelegramBotAd/>
        <p>🚀 A Simple Tool for Selling Digital Content</p>
             <p>Turn your photos, Videos and PDFs into paid content in minutes</p>
                  <p>Pay2View gives you the tools to upload content, collect payments, and deliver access  all in one place</p>
                 
    </div>
    <div>
        <a href='getstarted'><button>Create Your Pay2View Link →  </button></a>
    </div>
     <p>No monthly fees • Fast payouts • Payments handled securely</p>


  </section>
    <div className="home-stats-container">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <p className="stat-value">
            <CountUp
              start={0}
              end={s.value}
              duration={2.5}
              separator=","
              prefix={s.prefix || ""}
              suffix={s.suffix || ""}
              enableScrollSpy   // 👈 only animates when visible
              scrollSpyOnce     // 👈 animates once per page load
            />
          </p>
          <p className="stat-label">{s.label}</p>
        </div>
      ))}
      <p>Pay2View is a payment tool, not a marketplace. You bring your audience — we handle payments and access.</p>
    </div>
<section className="how-it-works">
  <h2>How It Works</h2>
  <div className="steps">
    <div className="step">
      <div className="icon"><FaUpload /></div>
      <h3>Upload Content</h3>
      <p>Upload your photos,Videos and  PDFs and control who can access them.</p>
    </div>

    <div className="step">
      <div className="icon"><FaDollarSign /></div>
      <h3>Set a Price</h3>
      <p>Choose how much people pay to unlock your content and generate a shareable link.</p>
    </div>

    <div className="step">
      <div className="icon"><FaBolt /></div>
      <h3>Share & Get Paid</h3>
      <p>Share your Pay2View link with your audience. Payments and access are handled automatically.</p>
    </div>
  </div>
</section>


    <section className="success-stories">
      <h2>Success Stories</h2>
      <div className="stories-container">
        {testimonials.map((t, index) => (
          <div className="story-card" key={index}>
            <img src={t.image} alt={t.name} className="story-image" />
            <h3 className="story-name">{t.name}</h3>
            <p className="story-job">{t.job}</p>
            <p className="story-text">"{t.story}"</p>
          </div>
        ))}
      </div>
    </section>
  <section className='earning-section'>
    <div>
        
             <p>Ready to set up paid content?</p>
<p>Create your link, share it with your audience, and get paid.</p>

                 
    </div>
    <div>
       <a href='getstarted'> <button>Create Your Pay2View Link → </button></a>
    </div>
     <p>Already have a account <a href='login'> <span> Log In</span> </a></p>

  </section>
   
    </>
  )
}
