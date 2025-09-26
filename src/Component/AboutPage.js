import { FaBolt, FaUser, FaShieldAlt, FaUsers, FaGlobe } from "react-icons/fa";
import "../Styles/about.css";
import CountUp from "react-countup";

export default function AboutPage() {

     const stats = [
    { label: "Active Creators", value: 10000, suffix: "+" },
    { label: "Paid to Creators", value: 25000000, prefix: "₦", suffix: "+" },
    { label: "Content Sold", value: 50000, suffix: "+" },
  ];
  return (
    <>

    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="icon-circle">
          <FaBolt className="icon" />
        </div>
        <h1 className="hero-title">Empowering African Creators</h1>
        <p className="hero-text">
          Pay2View is Nigeria&apos;s leading platform for premium content
          monetization, connecting creators with their audience through secure,
          one-time purchases.
        </p>
      </section>

      {/* Stats Section */}
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
      {/* Our Story */}
      <section className="story">
        <h2>Our Story</h2>
        <p>
          Founded in 2023, Pay2View emerged from a simple observation: African
          creators needed a reliable, secure platform to monetize their premium
          content without complex subscriptions or high fees.
        </p>
        <p>
          Starting in Lagos, Nigeria, we&apos;ve grown to serve creators across
          West Africa, processing over ₦2 million in transactions and helping
          thousands of creators earn from their passion.
        </p>
        <p>
          Our mission is to democratize content monetization, making it as easy
          to sell digital content as it is to share it.
        </p>
      </section>

      {/* Our Values */}
      <section className="values">
        <h2>Our Values</h2>
        <div className="value-item">
          <FaUser className="value-icon" />
          <div>
            <h3>Creator First</h3>
            <p>
              We believe creators deserve fair compensation for their work. Our
              platform ensures maximum earnings with minimal fees.
            </p>
          </div>
        </div>
        <div className="value-item">
          <FaShieldAlt className="value-icon" />
          <div>
            <h3>Trust & Security</h3>
            <p>
              Your content and payments are protected with bank-level security.
              We use advanced encryption and fraud protection.
            </p>
          </div>
        </div>
        <div className="value-item">
          <FaUsers className="value-icon" />
          <div>
            <h3>Community Driven</h3>
            <p>
              Building a supportive ecosystem where creators and buyers connect
              meaningfully and authentically.
            </p>
          </div>
        </div>
        <div className="value-item">
          <FaGlobe className="value-icon" />
          <div>
            <h3>Accessible to All</h3>
            <p>
              Making premium content accessible across Nigeria and Africa with
              local payment methods and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="team">
        <h2>Leadership Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="avatar">AA</div>
            <h3>Adebayo Annoulai</h3>
            <p className="role">Co-Founder & CEO</p>
            <p className="bio">
              Former fintech executive with 8+ years in Nigerian digital
              payments.
            </p>
          </div>
          <div className="team-member">
            <div className="avatar">TM</div>
            <h3>Tunde Musa</h3>
            <p className="role">Co-Founder & CTO</p>
            <p className="bio">
              Tech entrepreneur passionate about building scalable platforms.
            </p>
          </div>
          <div className="team-member">
            <div className="avatar">EA</div>
            <h3>Ese Aakaunu</h3>
            <p className="role">Head of Operations</p>
            <p className="bio">
              Experienced software engineer with expertise in creator economy growth.
            </p>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="recognition">
        <h2>Recognition</h2>
        <p>
          Featured in top African tech blogs and trusted by thousands of
          creators across the continent.
        </p>
      </section>

      {/* Contact */}
      <section className="about-contact">
        <h2>Want to learn more?</h2>
        <p>
          Get in touch with our team to discuss partnerships, press inquiries,
          or general questions.
        </p>
        <a href="mailto:hello@pay2view.ng">hello@pay2view.io</a>
      </section>
    </div>
        </>
  );
}
