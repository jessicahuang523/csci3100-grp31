import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userIsLoggedin, setUserIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribeAuthStateListener = firebase
      .auth()
      .onAuthStateChanged(user => {
        console.log("UserContext changed", { user });
        if (user) {
          setUserIsLoggedin(true);
          setUserData(user);
        } else {
          setUserIsLoggedin(false);
          setUserData(null);
        }
      });
    return () => {
      unsubscribeAuthStateListener();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userIsLoggedin, userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
