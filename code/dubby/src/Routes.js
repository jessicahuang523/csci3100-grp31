import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import RootPage from "./components/RootPage";
import Signout from "./components/Signout";
import GymPage from "./components/GymPages";
import ChatPage, {Chat} from "./components/ChatPages";
import Profile from "./components/Profile";

const Routes = () => {
  return (<Router>
    <Route path="/" children={<Navbar />}/>
    <Switch>
      <Route exact="exact" path="/" children={<RootPage />}/>
      <Route exact="exact" path="/g" children={<GymPage />}/>
      <Route exact="exact" path="/e" children={<Redirect to = "/" />}/>
      <Route exact="exact" path="/c" children={<ChatPage />}/>
      <Route path="/c/:cid" children={<Chat />}/>
      <Route path="/signout" children={<Signout />}/>
      <Route exact="exact" path="/u" children={<Profile />}/>
    </Switch>
  </Router>);
};

export default Routes;
