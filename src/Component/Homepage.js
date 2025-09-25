import React, { useEffect } from 'react'
import '../Styles/Homepage.css'
import { FaUpload, FaDollarSign, FaBolt,FaArrowAltCircleRight } from "react-icons/fa";
import CountUp from "react-countup";

const testimonials = [
  {
    name: "Adaobi Eze",
    job: "Photographer",
    story: "I started sharing my exclusive photos with Pay2View and earned ₦50,000 in my first week!",
    image: "https://plus.unsplash.com/premium_photo-1671748710978-2ff3ae35a64d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2V4eSUyMGJsYWNrJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Tunde Balogun",
    job: "Digital Artist",
    story: "Pay2View helped me monetize my digital art instantly without any hassle.",
    image: "https://images.unsplash.com/photo-1484517186945-df8151a1a871?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGJsYWNrJTIwbWFufGVufDB8fDB8fHww",
  },
  {
    name: "Chiamaka Okafor",
    job: "Content Creator",
    story: "I never thought sharing picture online could be this rewarding!",
    image: "https://images.unsplash.com/photo-1647338064700-21f154b6720e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2V4eSUyMGJsYWNrJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
  },
];



   const stats = [
    { label: "Active Creators", value: 10000, suffix: "+" },
    { label: "Paid to Creators", value: 25000000, prefix: "₦", suffix: "+" },
    { label: "Content Sold", value: 50000, suffix: "+" },
  ];

export default function Homepage() {
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (
    <>
  <section className='hero-section'>
    <div>
        <p>🚀 Join 10,000+ Creators</p>
             <p>Turn Your Content Into Cash Instantly</p>
                  <p>Creators on Pay2View are already earning by sharing exclusive PHOTOS, VIDEOS and PDF . Start monetizing your creativity today.</p>
                 
    </div>
    <div>
        <a href='getstarted'><button>Start Earning Now  →  </button></a>
    </div>
     <p>No monthly fees • Instant payouts • Secure payments</p>

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
    </div>
 <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="icon"><FaUpload /></div>
          <h3>Upload Content</h3>
          <p>Upload your premium photos, videos, or digital art to your profile.</p>
        </div>
        <div className="step">
          <div className="icon"><FaDollarSign /></div>
          <h3>Set Your Price</h3>
          <p>Choose how much buyers pay to unlock your exclusive content and share your link .</p>
        </div>
        <div className="step">
          <div className="icon"><FaBolt /></div>
          <h3>Get Paid Instantly</h3>
          <p>Receive payments instantly when buyers unlock your content.</p>
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
        
             <p>Ready to start earning ?</p>
                  <p>Join thousands of creators who are already making money from their content.</p>
                 
    </div>
    <div>
       <a href='getstarted'> <button>Start Earning Now → </button></a>
    </div>
     <p>Already have a account <a href='login'> <span> Log In</span> </a></p>

  </section>
   
    </>
  )
}
