import React, { useState } from "react";
import { Link } from "react-router-dom";

const directories = [
  { dir: "/", disp: "Home" },
  { dir: "/u", disp: "User" },
  { dir: "/g", disp: "Gym" },
  { dir: "/e", disp: "Event" },
  { dir: "/u/test-user", disp: "Test User Data" },
  { dir: "/g/test-gym", disp: "Test Gym Data" },
  { dir: "/c/test-chat", disp: "Test Chat Data" },
  { dir: "/e/test-event", disp: "Test Event Data" }
];

const Navbar = () => {
  const [leftMenuMouseEnter, setLeftMenuMouseEnter] = useState(false);
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div
            className="menubar"
            onMouseEnter={() => setLeftMenuMouseEnter(true)}
            onMouseLeave={() => setLeftMenuMouseEnter(false)}
          >
            <ul className="menubar-menu">
              <li className="menu-item">
                <Link className="menu-link">
                  <i
                    class={`fas ${
                      leftMenuMouseEnter ? "fa-chevron-circle-down" : "fa-bars"
                    }`}
                  ></i>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link">Events</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link">Chat</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link">Gym</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Dubby
          </Link>
        </li>
        <li className="nav-item">
          <div className="menubar" style={{ textAlign: "end" }}>
            <ul className="menubar-menu">
              <li className="menu-item">
                <Link className="menu-link">
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link">Events</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link">Chat</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link">Gym</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
