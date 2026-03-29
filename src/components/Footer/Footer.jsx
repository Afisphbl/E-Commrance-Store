import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <section className="container footer-content">
        <div className="footer-section">
          <h3>AfisShops</h3>

          <p>
            Your ultimate destination for eco-friendly and premium products.
            Shop with confidence.
          </p>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>

          <ul>
            <li>
              <Link>Contact Us</Link>
            </li>
            <li>
              <Link>Shipping Policy</Link>
            </li>
            <li>
              <Link>Returns & Exchanges</Link>
            </li>
            <li>
              <Link>FAQs</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About Us</h4>

          <ul>
            <li>
              <Link>Our Story</Link>
            </li>
            <li>
              <Link>Careers</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
            <li>
              <Link>Terms of Service</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="footer-bottom">
        <p>&copy; 2024 AfisShops. All rights reserved.</p>
      </section>
    </footer>
  );
}

export default Footer;
