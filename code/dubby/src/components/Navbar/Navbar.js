import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {auth} from "firebase";
import {ThemeContext} from "../../contexts/ThemeContext";
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
  const {theme, isPrimaryTheme, toggleTheme} = useContext(ThemeContext);

  const [collapseIsOpen, setCollapseIsOpen] = useState(false);

  const toggleCollapse = () => setCollapseIsOpen(!collapseIsOpen);
  const handleSignOutClick = () => auth().signOut();

  // render
  return (<Navbar dark="dark" color="dark" expand="sm" style={theme.navbar}>
    {/* logo */}
    <NavbarBrand tag={Link} to="/">
      <Media src={logo} style={{
          height: "1rem"
        }} alt="Dubby"/>
    </NavbarBrand>

    {/* toggles item for navbar if size = sm */}
    <NavbarToggler onClick={toggleCollapse}/> {/* main navbar by collapse */}
    <Collapse isOpen={collapseIsOpen} navbar="navbar">
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
        <NavItem>
          <NavLink tag={Link} to="/u">
            Profile
          </NavLink>
        </NavItem>

        {/* secondary navbar */}
        <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
          <DropdownToggle nav="nav" caret="caret">
            Menu
          </DropdownToggle>
          <DropdownMenu right="right">
            <DropdownItem tag={Link} to="/friends">
              <i className="fas fa-users"></i>
              Friends
            </DropdownItem>
            <DropdownItem onClick={() => toggleTheme()}>
              <i className={`fas fa-toggle-${isPrimaryTheme
                  ? "on"
                  : "off"}`}></i>{" "}
              {
                isPrimaryTheme
                  ? "Purple"
                  : "Yellow"
              }
            </DropdownItem>
            <DropdownItem tag={Link} to="/launch" onClick={handleSignOutClick}>
              <i className="fas fa-running"></i>
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Collapse>
  </Navbar>);
};

export default NavBar;
