import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "firebase";
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
  NavbarText
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarText>
        <Link to="/">
          <b>Dubby</b>
        </Link>
      </NavbarText>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="menu-link" to="/">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link className="menu-link" to="/e">
              Events
            </Link>
          </NavItem>
          <NavItem>
            <Link className="menu-link" to="/c">
              Chat
            </Link>
          </NavItem>
          <NavItem>
            <Link className="menu-link" to="/g">
              Gym
            </Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link className="menu-link" to="/u">
                  Profile
                </Link>
              </DropdownItem>
              {/* <DropdownItem>
                <Link className="menu-link" to="/settings">
                  Settings
                </Link>
              </DropdownItem> */}
              <DropdownItem>
                <Link className="menu-link" to="/friends">
                  Friends
                </Link>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/"
                  className="menu-link"
                  onClick={() => {
                    auth().signOut();
                  }}
                >
                  Sign out
                </a>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
