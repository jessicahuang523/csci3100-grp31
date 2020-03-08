import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import RootPage from "./components/RootPage";
import Signout from "./components/Signout";
import GymPage from "./components/GymPages";

const Routes = () => {
  return (
    <Router>
      <Route path="/" children={<Navbar />} />
      <Switch>
        <Route exact path="/" children={<RootPage />} />
        <Route exact path="/g" children={<GymPage />} />
        <Route path="/signout" children={<Signout />} />
      </Switch>
    </Router>
  );
};

export default Routes;
