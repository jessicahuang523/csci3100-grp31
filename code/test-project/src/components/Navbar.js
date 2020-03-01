import React from "react";
import { NavLink } from "react-router-dom";

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
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {directories.map(d => (
          <li className="nav-item" key={d.dir}>
            <NavLink className="nav-link" to={d.dir}>
              {d.disp}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
