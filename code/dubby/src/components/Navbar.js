import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";
import '../App.css';
import {Header} from 'react-mdl';

const Navbar = () => {
  const {userIsLoggedin} = useContext(UserContext);
  const [leftMenuMouseEnter, setLeftMenuMouseEnter] = useState(false);

  if (userIsLoggedin) {
    return (<nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="menubar menubar-left" onMouseEnter={() => setLeftMenuMouseEnter(true)} onMouseLeave={() => setLeftMenuMouseEnter(false)}>
            <ul className="menubar-menu">
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  <i className={`fas ${
                    leftMenuMouseEnter
                      ? "fa-chevron-circle-down"
                      : "fa-bars"}`}></i>
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
            <p>
              <b>Dubby</b>
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <div className="menubar menubar-right">
            <ul className="menubar-menu">
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  <i className="fas fa-user-circle"></i>
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
    </nav>);
  } else {
    return null;
  }
};

export default Navbar;
