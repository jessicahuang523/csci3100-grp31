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
import Event from "./components/Event/Event";
import Friend from "./components/Friend/Friend";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/launch" children={<LandingPage />} />
        <Route exact path="/signup" children={<SignupPage />} />
        <Route exact path="/friends" children={<Friend />} />
        <Route exact path="/" children={<EventPage />} />
        <Route exact path="/g" children={<GymPage />} />
        <Route exact path="/e" children={<MainFeed />} />
        <Route exact path="/c" children={<ChatPage />} />
        <Route exact path="/u" children={<ProfilePage />} />
        <Route exact path="/e/add" children={<AddEvent />} />
        <Route path="/e/:eid" children={<Event />} />
        <Route path="/c/:cid" children={<Chat />} />
        <Route path="/u/:uid" children={<ProfilePage />} />
      </Switch>
    </Router>
  );
};

export default Routes;
