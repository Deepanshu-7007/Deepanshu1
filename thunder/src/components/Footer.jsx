import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Thunder E-commerce</h2>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" className="social-icon facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" className="social-icon twitter" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" className="social-icon instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-copy">
          <p>© 2024 Thunder E-commerce | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
