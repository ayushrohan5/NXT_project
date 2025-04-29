import React from 'react';
import './Footer.css'; // Assuming you're creating a separate CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <h2>BE THE FIRST TO KNOW</h2>
        <p>Sign up for updates from mettā muse.</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your e-mail..." />
          <button type="button">SUBSCRIBE</button>
        </div>
      </div>
      
      <div className="footer-links">
        <div className="brand">
          <h3>mettā muse</h3>
          <ul>
            <li>About Us</li>
            <li>Stories</li>
            <li>Artisans</li>
            <li>Boutiques</li>
            <li>Contact Us</li>
            <li>EU Compliances Docs</li>
          </ul>
        </div>
        
        <div className="quick-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li>Orders & Shipping</li>
            <li>Join/Login as a Seller</li>
            <li>Payment & Pricing</li>
            <li>Return & Refunds</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="contact">
          <h3>CONTACT US</h3>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <h3>CURRENCY</h3>
          <p>• USD</p>
          <p>Transactions will be completed in Euros and a currency reference is available on hover.</p>
        </div>

        <div className="follow-us">
          <h3>FOLLOW US</h3>
          <p>Instagram | LinkedIn</p>
        </div>
      </div>

      <div className="payment-methods">
        <p>mettā muse ACCEPTS</p>
        <div className="payment-icons">
          <img src="/google-pay-icon.png" alt="Google Pay" />
          <img src="/paypal-icon.png" alt="PayPal" />
          <img src="/amex-icon.png" alt="AMEX" />
          <img src="/apple-pay-icon.png" alt="Apple Pay" />
          <img src="/other-pay-icon.png" alt="Other Payment" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2023 mettāmuse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;