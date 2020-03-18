import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribeAuthStateListener = firebase
      .auth()
      .onAuthStateChanged(user => {
        setUserLoading(true);
        if (user) {
          setUserData(user);
        } else {
          setUserData(null);
        }
        setUserLoading(false);
      });
    return () => {
      unsubscribeAuthStateListener();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
