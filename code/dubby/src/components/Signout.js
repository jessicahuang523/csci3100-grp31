import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "firebase";

const Signout = () => {
  const { userIsLoggedin } = useContext(UserContext);
  if (userIsLoggedin) {
    auth().signOut();
    return null;
  } else {
    return <Redirect to="/" />;
  }
};

export default Signout;
