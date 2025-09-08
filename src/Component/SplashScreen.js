import React, { useEffect } from "react";
import "../Styles/SpalshScreen.css";

const SplashScreen = ({ logoSrc, tagline = "Pay2View", duration = 1600, onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onDone]);


  return (
    <div className="splash">
      <div className="splash-card">
        {logoSrc ? (
          <img className="splash-logo" src={logoSrc} alt="Pay2View logo" />
        ) : (
          <div className="splash-logo-placeholder" aria-hidden="true">P2V</div>
        )}
        <p className="splash-tagline">{tagline}</p>
        <div className="splash-spinner" aria-label="Loading" />
      </div>
    </div>
  );
};

export default SplashScreen;
