import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <h1>Thunder</h1>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
