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

  const handleSignOutClick = () => auth().signOut();

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
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/e">Events</Link>
          </NavItem>
          <NavItem>
            <Link to="/c">Chat</Link>
          </NavItem>
          <NavItem>
            <Link to="/g">Gym</Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/u">Profile</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/friends">Friends</Link>
              </DropdownItem>
              <DropdownItem>
                <a href="/" onClick={handleSignOutClick}>
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
