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
  Media,
  NavbarBrand
} from "reactstrap";
import logo from "../../image/Dubby_logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleSignOutClick = () => auth().signOut();

  return (
    <Navbar color="light" light expand="sm">
      <NavbarBrand tag={Link} to="/">
        <Media src={logo} style={{ height: "1rem" }} alt="logo" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem tag={Link} to="/e">
            Events
          </NavItem>
          <NavItem tag={Link} to="/c">
            Chat
          </NavItem>
          <NavItem tag={Link} to="/g">
            Gym
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag={Link} to="/u">
                Profile
              </DropdownItem>
              <DropdownItem tag={Link} to="/friends">
                Friends
              </DropdownItem>
              <DropdownItem tag={Link} to="/" onClick={handleSignOutClick}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
