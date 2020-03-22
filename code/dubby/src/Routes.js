import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GymPage from "./components/Gym/GymPages";
import ChatPage from "./components/Chat/ChatPage";
import Chat from "./components/Chat/Chat";
import ProfilePage from "./components/Profile/ProfilePage";
import EventPage from "./components/Event/EventPage";
import LandingPage from "./components/Landing/LandingPage";
import MainFeed from "./components/Root/MainFeed";
import SignupPage from "./components/Landing/SignupPage";
import AddEvent from "./components/Event/AddEvent";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/launch" children={<LandingPage />} />
        <Route exact path="/signup" children={<SignupPage />} />
        <Route exact path="/" children={<MainFeed />} />
        <Route exact path="/g" children={<GymPage />} />
        <Route exact path="/e" children={<EventPage />} />
        <Route exact path="/c" children={<ChatPage />} />
        <Route exact path="/u" children={<ProfilePage />} />
        <Route exact path="/e/add" children={<AddEvent />} />
        <Route path="/e/:eid" children={null} />
        <Route path="/c/:cid" children={<Chat />} />
        <Route path="/u/:uid" children={<ProfilePage />} />
      </Switch>
    </Router>
  );
};

export default Routes;
