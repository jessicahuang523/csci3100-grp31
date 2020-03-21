import React, {useState} from "react";
import {Link} from "react-router-dom";
import {auth} from "firebase";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (<div>
    <Navbar color="light" light="light" expand="md">
      <NavbarText>
        <b>Dubby</b>
      </NavbarText>
      <NavbarToggler onClick={toggle}/>
      <Collapse isOpen={isOpen} navbar="navbar">
        <Nav className="mr-auto" navbar="navbar">
          <NavItem>
            <Link className="menu-link" to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link className="menu-link" to="/e">Events</Link>
          </NavItem>
          <NavItem>
            <Link className="menu-link" to="/c">Chat</Link>
          </NavItem>
          <NavItem>
            <Link className="menu-link" to="/g">Gym</Link>
          </NavItem>
          <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
            <DropdownToggle nav="nav" caret="caret">
              Menu
            </DropdownToggle>
            <DropdownMenu right="right">
              <DropdownItem>
                <Link className="menu-link" to="/u">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="menu-link" to="/settings">
                  Settings
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="menu-link" to="/friends">
                  Friends
                </Link>
              </DropdownItem>
              <DropdownItem>
                <a href="/" className="menu-link" onClick={() => {
                    auth().signOut();
                  }}>
                  Sign out
                </a>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  </div>);
}

export default NavBar;
