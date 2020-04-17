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
  Media,
  NavbarBrand,
  NavLink
} from "reactstrap";
import logo from "../../image/Dubby_logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleSignOutClick = () => auth().signOut();

  return (<Navbar color="light" light="light" expand="sm">
    <NavbarBrand tag={Link} to="/">
      <Media src={logo} style={{
          height: "1rem"
        }} alt="logo"/>
    </NavbarBrand>
    <NavbarToggler onClick={toggle}/>
    <Collapse isOpen={isOpen} navbar="navbar">
      <Nav className="mr-auto" navbar="navbar">
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
