import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import User, { UserDetails } from "./components/User";
import Gym, { GymDetails } from "./components/Gym";
import Chat from "./components/Chat";
import Event, { EventDetails } from "./components/Event";
import Navbar from "./components/Navbar";
import RootPage from "./components/Root";

const Routes = () => {
  return (
    <Router>
      <Route path="/" children={<Navbar />} />
      <div className="main">
        <Switch>
          <Route exact path="/" children={<RootPage />} />
          <Route exact path="/g" children={<Gym />} />
          <Route exact path="/u" children={<User />} />
          <Route exact path="/e" children={<Event />} />
          <Route path="/g/:gid" children={<GymDetails />} />
          <Route path="/u/:uid" children={<UserDetails />} />
          <Route path="/c/:cid" children={<Chat />} />
          <Route path="/e/:eid" children={<EventDetails />} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
