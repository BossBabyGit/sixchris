import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="brand">
        <div className="logo">
          <img src="/logo.png" alt="SixChris" />
        </div>
        <div>
          <strong>SixChris</strong>
          <br />
        </div>
      </div>

      <nav className="links" aria-label="Site navigation">
        <NavLink
          to="/leaderboards"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Leaderboards
        </NavLink>
        <NavLink
          to="/how-to-sign-up"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          How to Sign Up?
        </NavLink>
      </nav>
    </header>
  );
}