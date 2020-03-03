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
            className="menubar menubar-left"
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
                <Link className="menu-link" to="/e">
                  Events
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/c">
                  Chat
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/g">
                  Gym
                </Link>
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
          <div className="menubar menubar-right">
            <ul className="menubar-menu">
              <li className="menu-item">
                <Link className="menu-link">
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/u">
                  Profile
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/settings">
                  Settings
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/histrory">
                  History
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/friends">
                  Friends
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/signout">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
