import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import "../Styles/biolink.css";

export default function BioLinksPage() {
  return (
    <div className="page">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="title"
        >
          Choose what you want 👇
        </motion.h1>

        {/* Pay2View */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h2>Pay2View.io</h2>
          <p>
            Earn money when people view your content. Perfect for creators, influencers, and hustlers who want to monetize attention directly.
          </p>
          <a
            className="button primary"
            href="https://www.pay2view.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Pay2View <ExternalLink size={16} />
          </a>
        </motion.div>

        {/* Telegram Bot */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h2>Telegram Automation Bot</h2>
          <p>
           A Telegram bot that automatically replies to all your DMs, helps you make money while you sleep, and filters out unserious chats. You only talk to users who have paid your serious fee.
          </p>
          <a
            className="button secondary"
            href="https://t.me/seriousDmBot?start=ref_pa2view_biolink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Telegram Bot <ExternalLink size={16} />
          </a>
        </motion.div>

        <p className="footer">One link. Two powerful ways to earn.</p>
      </div>
    </div>
  );
}


