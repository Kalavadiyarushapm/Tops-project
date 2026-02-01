// Footer.jsx
import React from "react";
 

const Footer = () => {
  return (
    <footer className="zay-footer z-10">
      <div className="container py-5">
        <div className="row">

          {/* Brand / Address */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h4 className="footer-title brand">Zay</h4>
            <ul className="footer-list">
              <li>123 Consectetur at ligula</li>
              <li>+91 90000 00000</li>
              <li>info@company.com</li>
            </ul>
          </div>

          {/* Shop */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="footer-title">Shop</h5>
            <ul className="footer-list">
              <li><a href="#">Products</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Shop Locations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="footer-title">Company</h5>
            <ul className="footer-list">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="footer-title">Follow Us</h5>
            <p className="footer-text">
              Receive updates, hot deals, and discounts.
            </p>

            <div className="footer-subscribe">
              <input
                type="email"
                placeholder="Email address"
                className="form-control"
              />
              <button className="btn btn-success">Subscribe</button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 pt-3">
          <p className="mb-2 mb-md-0">
            © 2024 Company Name. All Rights Reserved.
          </p>

          <div className="footer-payments">
            <img src="/visa.png " alt="visa" />
            <img src="/mastercard.png" alt="mastercard" />
            <img src="/paypal.png" alt="paypal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
