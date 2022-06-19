import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top border-bottom border-primary border-3">
      <div className="container-lg">
        <Link to="/" className="navbar-brand">
          Science With Me
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="main-nav"
        >
          <ul className="navbar-nav gap-3">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-house"></i> Home
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                <i className="bi bi-door-open-fill"></i> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
