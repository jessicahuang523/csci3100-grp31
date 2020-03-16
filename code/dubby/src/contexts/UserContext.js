import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userLoading, setUserLoading] = useState(true);
  const [userIsLoggedin, setUserIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribeAuthStateListener = firebase
      .auth()
      .onAuthStateChanged(user => {
        setUserLoading(true);
        console.log("UserContext changed", { user });
        if (user) {
          setUserIsLoggedin(true);
          setUserData(user);
        } else {
          setUserIsLoggedin(false);
          setUserData(null);
        }
        setUserLoading(false);
      });
    return () => {
      unsubscribeAuthStateListener();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userIsLoggedin, userData, userLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
