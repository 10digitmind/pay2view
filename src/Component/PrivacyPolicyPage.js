import { FaUserShield, FaInfoCircle, FaLock } from "react-icons/fa";
import "../Styles/privacy.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      {/* Header */}
      <header className="privacy-header">
        <FaUserShield className="privacy-icon" />
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: December 1, 2024</p>
        <p className="intro">
          Your privacy is important to us. This Privacy Policy explains how
          Pay2View collects, uses, and protects your personal information.
        </p>
      </header>

      {/* Privacy Principles */}
      <section className="principles-section">
        <h2>Our Privacy Principles</h2>
        <div className="principles-box">
          <div className="principle">
            <FaInfoCircle className="principle-icon" />
            <h3>Transparency</h3>
            <p>We're clear about what data we collect and how we use it.</p>
          </div>
          <div className="principle">
            <FaLock className="principle-icon" />
            <h3>Security</h3>
            <p>Your data is protected with industry-standard security measures.</p>
          </div>
          <div className="principle">
            <FaInfoCircle className="principle-icon" />
            <h3>Minimal Collection</h3>
            <p>We only collect data that's necessary to provide our services.</p>
          </div>
        </div>
      </section>

      {/* Types of Data */}
      <section className="data-section">
        <h2>Types of Data We Collect</h2>
        <div className="data-box">
          <h3>Account Information</h3>
          <p>Name, email address, phone number</p>
          <p>Profile picture and bio</p>
          <p>Account preferences and settings</p>

          <h3>Content Data</h3>
          <p>Uploaded content and metadata</p>
          <p>Content descriptions and pricing</p>
          <p>View and purchase history</p>

          <h3>Financial Information</h3>
          <p>Payment method details (processed securely)</p>
          <p>Transaction history and earnings</p>
          <p>Tax information (for creators)</p>

          <h3>Usage Data</h3>
          <p>Device and browser information</p>
          <p>IP address and location data</p>
          <p>Platform usage patterns and analytics</p>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="privacy-content">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us when you create an
          account, upload content, make purchases, or communicate with us.
        </p>
        <p>
          We also collect information automatically when you use our platform,
          including device information, usage data, and analytics.
        </p>
        <p>
          We may receive information about you from third-party payment
          processors and verification services.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our platform services</li>
          <li>To process transactions and send related information</li>
          <li>To communicate with you about your account and platform updates</li>
          <li>To detect, prevent, and address technical issues and security threats</li>
          <li>To comply with legal obligations and protect our rights</li>
          <li>To personalize your experience and provide relevant content recommendations</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties.</p>
        <p>We may share your information in the following limited circumstances:</p>
        <ul>
          <li>• With service providers who help us operate the platform</li>
          <li>• When required by law or to protect our rights</li>
          <li>• In connection with a business transfer or acquisition</li>
          <li>• With your explicit consent for specific purposes</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information.
        </p>
        <p>
          All sensitive data is encrypted in transit and at rest using
          industry-standard encryption.
        </p>
        <p>
          We regularly audit our security practices and update our systems to
          address emerging threats.
        </p>
        <p>
          Payment information is processed by certified third-party payment
          processors and is not stored on our servers.
        </p>

        <h2>5. Your Rights and Choices</h2>
        <ul>
          <li>You have the right to access, update, or delete your personal information.</li>
          <li>You can control your privacy settings and communication preferences in your account dashboard.</li>
          <li>You may request a copy of your personal data or ask us to transfer it to another service.</li>
          <li>You can object to certain processing activities or request that we restrict processing of your data.</li>
          <li>To exercise these rights, please contact us at privacy@pay2view.ng</li>
        </ul>

        <h2>6. Cookies and Tracking</h2>
        <p>We use cookies and similar technologies to enhance your experience on our platform.</p>
        <ul>
          <li>Essential cookies are necessary for platform functionality and cannot be disabled.</li>
          <li>Analytics cookies help us understand how users interact with our platform.</li>
          <li>You can control cookie preferences through your browser settings.</li>
          <li>We do not use third-party advertising cookies or tracking pixels.</li>
        </ul>

        <h2>7. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to provide
          our services.
        </p>
        <p>Account information is retained until you delete your account.</p>
        <p>
          Transaction data is retained for legal and accounting purposes as
          required by Nigerian law.
        </p>
        <p>
          Content is retained according to your account settings and applicable
          legal requirements.
        </p>
        <p>
          We will delete or anonymize your data upon request, subject to legal
          obligations.
        </p>

        <h2>8. International Transfers</h2>
        <p>Your data is primarily stored and processed in Nigeria.</p>
        <p>
          We may transfer data to other countries for specific services like
          analytics or customer support.
        </p>
        <p>
          All international transfers are protected by appropriate safeguards and
          comply with applicable data protection laws.
        </p>
        <p>We ensure that any third-party processors provide adequate protection for your data.</p>

        <h2>9. Children's Privacy</h2>
        <p>Our platform is not intended for users under the age of 18.</p>
        <p>We do not knowingly collect personal information from children under 18.</p>
        <p>
          If we become aware that a child under 18 has provided us with personal
          information, we will delete it.
        </p>
        <p>
          Parents or guardians who believe their child has provided us with
          information should contact us immediately.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements.
        </p>
        <p>
          We will notify you of any material changes by email or through a
          prominent notice on our platform.
        </p>
        <p>The updated policy will be effective as of the date posted.</p>
        <p>
          Your continued use of the platform after changes constitutes acceptance
          of the updated policy.
        </p>
      </section>

      {/* Privacy Rights */}
      <section className="rights-box">
        <h3>Exercise Your Privacy Rights</h3>
        <p>You have control over your personal data. Contact us to:</p>
        <ul>
          <li>• Access your personal information</li>
          <li>• Update or correct your data</li>
          <li>• Delete your account and data</li>
          <li>• Export your data</li>
          <li>• Opt out of communications</li>
        </ul>
        <p><strong>Contact:</strong> hello@pay2view.ng</p>
      </section>

      {/* DPO Section */}
      <section className="dpo-box">
        <h3>Data Protection Officer</h3>
        <p>For privacy-related questions or concerns, contact our Data Protection Officer:</p>
        <p><strong>Email:</strong> hello@pay2view.ng</p>
        <p><strong>Address:</strong> Pay2View Limited, Victoria Island, Lagos, Nigeria</p>
        <p><strong>Response Time:</strong> Within 72 hours for urgent matters</p>
      </section>
    </div>
  );
}
