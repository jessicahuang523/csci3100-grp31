import React from "react";
import { Link } from "react-router-dom";
import { auth } from "firebase";
import "../App.css";
import { Layout, Header, Navigation, Drawer } from "react-mdl";

const Navbar = () => {
  return (
    <Layout fixedHeader>
      <Header title="Dubby" scroll>
        <Navigation>
          <Link className="menu-link" to="/">
            Home
          </Link>
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
          <a
            href="/"
            className="menu-link"
            onClick={() => {
              auth().signOut();
            }}
          >
            Sign out
          </a>
        </Navigation>
      </Drawer>
    </Layout>
  );
};

export default Navbar;
