import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";
import { useCart, useTheme, useUser } from "../hooks/useAppContext.js";
import { getInitials } from "../utils/format.js";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/services", label: "Services" },
  { to: "/reservations", label: "Reservations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <Icon name="leaf" size={18} />
          </span>
          Saffron <span className="brand-amp">&amp;</span> Sage
        </Link>

        <nav className={`nav-links ${isOpen ? "open" : ""}`} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>

          <NavLink to="/cart" className="icon-btn cart-btn" aria-label="Cart" onClick={closeMenu}>
            <Icon name="cart" />
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </NavLink>

          <NavLink to="/profile" className="avatar-btn" aria-label="Profile" onClick={closeMenu}>
            {getInitials(user.name)}
          </NavLink>

          <button
            className="icon-btn menu-toggle"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <Icon name={isOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
