import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "firebase";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  NavbarBrand,
  NavLink,
} from "reactstrap";
import logo from "../../image/Dubby_logo.png";

const NavBar = ({ isChat }) => {
  const { isPrimaryTheme, toggleTheme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleSignOutClick = () => auth().signOut();

  return (
    <Navbar
      color={isPrimaryTheme ? "dark" : "light"}
      dark={isPrimaryTheme}
      light={!isPrimaryTheme}
      expand="sm"
      style={isChat && { position: "fixed", top: 0, zIndex: 10, width: "100%" }}
    >
      <NavbarBrand tag={Link} to="/">
        <Media src={logo} style={{ height: "1rem" }} alt="logo" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/e">
              Events
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/c">
              Chat
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/g">
              Gym
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag={Link} to="/u">
                <i className="fas fa-user" /> Profile
              </DropdownItem>
              <DropdownItem tag={Link} to="/friends">
                <i className="fas fa-users"></i> Friends
              </DropdownItem>
              <DropdownItem onClick={() => toggleTheme()}>
                <i
                  className={`fas fa-toggle-${isPrimaryTheme ? "on" : "off"}`}
                ></i>{" "}
                {isPrimaryTheme ? "Lights Off" : "Lights On"}
              </DropdownItem>
              <DropdownItem tag={Link} to="/" onClick={handleSignOutClick}>
                <i className="fas fa-running"></i> Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
