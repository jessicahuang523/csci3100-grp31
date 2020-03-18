import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GymPage from "./components/GymPages";
import ChatPage from "./components/Chat/ChatPage";
import Chat from "./components/Chat/Chat";
import ProfilePage from "./components/Profile/ProfilePage";
import EventPage from "./components/Event/EventPage";
import LandingPage from "./components/LandingPage";
import MainFeed from "./components/MainFeed";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/launch" children={<LandingPage />} />
        <Route exact path="/" children={<MainFeed />} />
        <Route exact path="/g" children={<GymPage />} />
        <Route exact path="/e" children={<EventPage />} />
        <Route exact path="/c" children={<ChatPage />} />
        <Route exact path="/u" children={<ProfilePage />} />
        <Route path="/c/:cid" children={<Chat />} />
        <Route path="/u/:uid" children={<ProfilePage />} />
      </Switch>
    </Router>
  );
};

export default Routes;
