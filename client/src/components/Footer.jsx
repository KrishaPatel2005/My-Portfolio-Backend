import React from "react";
import "../index.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <p className="footer-text">
            © {new Date().getFullYear()} Krisha Patel. All Rights Reserved.
          </p>
        </div>

        <div className="footer-right">
          <a href="#hero" className="back-to-top">
            <i className="fas fa-arrow-up"></i> Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
