import React, {useState} from "react";
import {Link} from "react-router-dom";
import {auth} from "firebase";
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
  NavbarBrand
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleSignOutClick = () => auth().signOut();

  return (<Navbar color="light" light="light" expand="sm">
    <NavbarBrand tag={Link} to="/">
      Dubby
    </NavbarBrand>
    <NavbarToggler onClick={toggle}/>
    <Collapse isOpen={isOpen} navbar="navbar">
      <Nav className="mr-auto" navbar="navbar">
        <NavItem tag={Link} to="/e">
          Events
        </NavItem>
        <NavItem tag={Link} to="/c">
          Chat
        </NavItem>
        <NavItem tag={Link} to="/g">
          Gym
        </NavItem>
        <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
          <DropdownToggle nav="nav" caret="caret">
            Menu
          </DropdownToggle>
          <DropdownMenu right="right">
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
  </Navbar>);
};

export default NavBar;
