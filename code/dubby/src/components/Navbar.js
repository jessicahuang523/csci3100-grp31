import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../App.css";
import { Layout, Header, Navigation, Drawer } from "react-mdl";

const Navbar = () => {
  const { userIsLoggedin } = useContext(UserContext);

  if (userIsLoggedin) {
    return (
      <Layout fixedHeader>
        <Header title="Dubby" scroll>
          <Navigation>
            <Link className="menu-link" to="/e">
              Events
            </Link>
            <Link className="menu-link" to="/c">
              Chat
            </Link>
            <Link className="menu-link" to="/g">
              Gym
            </Link>
          </Navigation>
        </Header>
        <Drawer title="Menu">
          <Navigation>
            <Link className="menu-link" to="/u">
              Profile
            </Link>
            <Link className="menu-link" to="/settings">
              Settings
            </Link>
            <Link className="menu-link" to="/friends">
              Friends
            </Link>
            <Link className="menu-link" to="/signout">
              Sign out
            </Link>
          </Navigation>
        </Drawer>
      </Layout>
    );
  } else {
    return null;
  }
};

export default Navbar;
