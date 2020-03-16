import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";
import '../App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';

const Navbar = () => {
  const {userIsLoggedin} = useContext(UserContext);
  const [leftMenuMouseEnter, setLeftMenuMouseEnter] = useState(false);

  if (userIsLoggedin) {
    return (<div style={{
        height: '300px',
        position: 'relative'
      }}>
      <Layout>
        <Header className="header-color" title="Dubby" scroll="scroll">
          <Navigation>
            <Link className="menu-link" to="/e">Events</Link>
            <Link className="menu-link" to="/c">Chat</Link>
            <Link className="menu-link" to="/g">Gym</Link>
          </Navigation>
        </Header>
        <Drawer title="Menu">
          <Navigation>
            <Link className="menu-link" to="/u">Profile</Link>
            <Link className="menu-link" to="/settings">Settings</Link>
            <Link className="menu-link" to="/histrory">History</Link>
            <Link className="menu-link" to="/friends">Friends</Link>
            <Link className="menu-link" to="/signout">Sign out</Link>
          </Navigation>
        </Drawer>
      </Layout>
    </div>);
  } else {
    return null;
  }
};

export default Navbar;
