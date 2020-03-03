import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import MainFeed from "./MainFeed";
import LandingPage from "./LandingPage";

const RootPage = () => {
  const { userIsLoggedin } = useContext(UserContext);

  if (userIsLoggedin) {
    return <MainFeed />;
  } else {
    return <LandingPage />;
  }
};

export default RootPage;
