import { FaFileContract, FaInfoCircle } from "react-icons/fa";
import "../Styles/terms.css";

export default function TermsPage() {
  return (
    <div className="terms-page">
      {/* Header */}
      <header className="terms-header">
        <FaFileContract className="terms-icon" />
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: December 1, 2024</p>
        <p className="intro">
          Please read these terms carefully before using Pay2View. These terms
          govern your use of our platform and services.
        </p>
      </header>

      {/* Important Notice */}
      <div className="notice-box">
        <FaInfoCircle className="notice-icon" />
        <div>
          <h3>Important Notice</h3>
          <p>
            By using Pay2View, you agree to these Terms of Service. If you don't
            agree with any part of these terms, please do not use our platform.
          </p>
        </div>
      </div>

      {/* Terms Sections */}
      <section className="terms-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Pay2View ('the Platform'), you agree to be bound
          by these Terms of Service ('Terms').
        </p>
        <p>
          If you disagree with any part of these terms, you may not access the
          Platform.
        </p>
        <p>
          These Terms apply to all visitors, users, creators, and others who
          access or use the Platform.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Pay2View is a digital platform that allows content creators to upload
          and monetize premium content through one-time purchases.
        </p>
        <p>
          The Platform facilitates transactions between creators and buyers for
          digital content including images, videos, and other digital media.
        </p>
        <p>
          We provide payment processing, content hosting, and related services
          to support creator monetization.
        </p>

        <h2>3. User Accounts</h2>
        <p>You must create an account to access certain features of the Platform.</p>
        <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
        <p>You must provide accurate, current, and complete information during registration.</p>
        <p>You are responsible for all activities that occur under your account.</p>
        <p>You must immediately notify us of any unauthorized use of your account.</p>

        <h2>4. Creator Responsibilities</h2>
        <p>Content creators must own or have the legal right to upload and monetize all content.</p>
        <p>Creators are responsible for setting appropriate pricing for their content.</p>
        <p>Creators must ensure their content complies with all applicable laws and Platform guidelines.</p>
        <p>Creators grant Pay2View a license to host, display, and distribute their content.</p>
        <p>Creators are responsible for tax obligations related to their earnings.</p>

        <h2>5. Content Guidelines</h2>
        <p>Content must not violate any laws or regulations in Nigeria or the user's jurisdiction.</p>
        <p>Prohibited content includes but is not limited to:</p>
        <ul>
          <li>• Copyrighted material without proper authorization</li>
          <li>• Illegal, harmful, or offensive content</li>
          <li>• Content promoting violence, hate speech, or discrimination</li>
          <li>• Spam, malware, or malicious content</li>
        </ul>
        <p>We reserve the right to remove content that violates these guidelines.</p>

        <h2>6. Payment Terms</h2>
        <p>All transactions are processed in Nigerian Naira (₦) unless otherwise specified.</p>
<p>
  A payment processing fee of 10% applies to each sale  of images and pdf files and will be deducted upon creator withdrawals.
</p>
<p>
  A payment processing fee of 20% applies to each sale on videos  and will be deducted upon creator withdrawals.
</p>
        <p>Creator payouts are subject to minimum thresholds and processing schedules.</p>
        <p>All sales are final unless otherwise specified in our refund policy.</p>
        <p>We use secure third-party payment processors and do not store payment information.</p>

        <h2>7. Intellectual Property</h2>
        <p>Creators retain ownership of their uploaded content.</p>
        <p>Pay2View owns all rights to the Platform software, design, and related intellectual property.</p>
        <p>Users grant Pay2View limited rights to use their content for Platform operation and promotion.</p>
        <p>Any unauthorized use of the Platform or creator content is prohibited.</p>

        <h2>8. Privacy and Data Protection</h2>
        <p>Your privacy is important to us. Please review our Privacy Policy.</p>
        <p>We collect and process personal data in accordance with Nigerian data protection laws.</p>
        <p>We implement security measures to protect your personal information.</p>
        <p>We do not sell personal data to third parties.</p>

        <h2>9. Prohibited Uses</h2>
        <p>
          You may not use the Platform for any unlawful purpose or to violate any
          local, state, national, or international law.
        </p>
        <p>Prohibited activities include:</p>
        <ul>
          <li>• Impersonating others or providing false information</li>
          <li>• Attempting to gain unauthorized access to Platform systems</li>
          <li>• Interfering with or disrupting Platform services</li>
          <li>• Using automated tools to access or use the Platform</li>
          <li>• Engaging in fraudulent activities or money laundering</li>
        </ul>

        <h2>10. Termination</h2>
        <p>You may terminate your account at any time by contacting customer support.</p>
        <p>We may terminate or suspend your account for violations of these Terms.</p>
        <p>Upon termination, you lose access to the Platform and any purchased content.</p>
        <p>Creators will receive final payouts for eligible earnings upon termination.</p>

        <h2>11. Disclaimers and Limitations</h2>
        <p>The Platform is provided 'as is' without warranties of any kind.</p>
        <p>We do not guarantee uninterrupted or error-free service.</p>
        <p>We are not responsible for creator content or disputes between users.</p>
        <p>Our liability is limited to the maximum extent permitted by law.</p>
        <p>In no event shall Pay2View be liable for indirect, incidental, or consequential damages.</p>

        <h2>12. Governing Law</h2>
        <p>These Terms are governed by the laws of the Federal Republic of Nigeria.</p>
        <p>Any disputes will be resolved in the courts of Lagos State, Nigeria.</p>
        <p>If any provision of these Terms is found to be unenforceable, the remaining provisions remain in effect.</p>

        <h2>13. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time.</p>
        <p>Changes will be posted on this page with an updated 'Last Modified' date.</p>
        <p>Continued use of the Platform after changes constitutes acceptance of the new Terms.</p>
        <p>Material changes will be communicated via email or Platform notification.</p>
      </section>

      {/* Contact Section */}
      <div className="contact-box">
        <h3>Questions About These Terms?</h3>
        <p>If you have any questions about these Terms of Service, please contact us:</p>
        <p><strong>Email:</strong> hello@pay2view.ng</p>
        <p><strong>Address:</strong> Pay2View Limited, Victoria Island, Lagos, Nigeria</p>
        <p><strong>Phone:</strong> +234 (0) 906 123 4567</p>
      </div>
    </div>
  );
}
