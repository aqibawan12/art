import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

const WEBSITE_TITLE = "Comrade Husnain";

const Navbar = ({ cartCount }) => (
  <nav className="navbar">
    <div className="navbar-center">
      <Link to="/" className="navbar-logo">
        <span className="snake-title">
          {WEBSITE_TITLE.split("").map((char, i) => (
            <span
              key={i}
              className="snake-letter"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </Link>
    </div>
    <div className="navbar-right">
      <Link to="/cart" className="cart-link">
        <FaShoppingCart size={28} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </div>
  </nav>
);

export default Navbar;