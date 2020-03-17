import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import RootPage from "./components/RootPage";
import Signout from "./components/Signout";
import GymPage from "./components/GymPages";
import ChatPage from "./components/Chat/ChatPage";
import Chat from "./components/Chat/Chat";
import ProfilePage from "./components/Profile/ProfilePage";
import EventPage from "./components/Event/EventPage";

const Routes = () => {
  return (
    <Router>
      <Route path="/" children={<Navbar />} />
      <Switch>
        <Route exact path="/" children={<RootPage />} />
        <Route exact path="/g" children={<GymPage />} />
        <Route exact path="/e" children={<EventPage />} />
        <Route exact path="/c" children={<ChatPage />} />
        <Route path="/c/:cid" children={<Chat />} />
        <Route exact path="/u" children={<ProfilePage />} />
        <Route path="/u/:uid" children={<ProfilePage />} />
        <Route path="/signout" children={<Signout />} />
      </Switch>
    </Router>
  );
};

export default Routes;
