import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { RESTAURANT, OPENING_HOURS } from "../data/siteData.js";
import { validateNewsletter } from "../utils/validators.js";

function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    const message = validateNewsletter(email);
    setError(message);

    if (!message) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <Icon name="leaf" size={18} />
            </span>
            Saffron <span className="brand-amp">&amp;</span> Sage
          </Link>
          <p className="muted">
            Global flavours, local ingredients and warm hospitality since 2014.
          </p>
          <ul className="footer-contact">
            <li><Icon name="map" size={16} /> {RESTAURANT.address}</li>
            <li><Icon name="phone" size={16} /> {RESTAURANT.phone}</li>
            <li><Icon name="mail" size={16} /> {RESTAURANT.email}</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/reservations">Book a Table</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Opening Hours</h4>
          <ul className="footer-hours">
            {OPENING_HOURS.map((slot) => (
              <li key={slot.day}>
                <span>{slot.day}</span>
                <span className="muted">{slot.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p className="muted">Seasonal menus and member-only offers, once a month.</p>

          {subscribed ? (
            <p className="alert alert-success">
              <Icon name="check" size={16} /> Thanks for subscribing!
            </p>
          ) : (
            <form className="newsletter" onSubmit={handleSubscribe} noValidate>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                aria-invalid={Boolean(error)}
              />
              <button className="btn btn-primary" type="submit">Join</button>
              {error && <span className="field-error">{error}</span>}
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Saffron &amp; Sage. All rights reserved.</p>
          <p>Built with React, React Router &amp; Redux Toolkit.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
