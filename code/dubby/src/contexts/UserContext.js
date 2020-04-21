import React, { createContext, useState, useEffect } from "react";
import { firestore, auth } from "firebase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  // userLoading = true when fetching data from database
  const [userLoading, setUserLoading] = useState(true);
  // userData contains data in /user_profile/{uid} if user exists and logged in
  // if not logged in, userData = null
  const [userData, setUserData] = useState(null);

  // subscribe to user data on initialization
  useEffect(() => {
    let unsubscribeUserData = () => {};
    const unsubscribeAuthStateListener = auth().onAuthStateChanged(
      async (user) => {
        setUserLoading(true);
        if (user) {
          const { uid } = user;
          const userDataRef = firestore().collection("user_profile").doc(uid);
          unsubscribeUserData = userDataRef.onSnapshot((snap) => {
            setUserData(snap.data());
            setUserLoading(false);
          });
        } else {
          setUserData(null);
          setUserLoading(false);
          unsubscribeUserData();
        }
      }
    );
    return () => {
      unsubscribeAuthStateListener();
      unsubscribeUserData();
    };
  }, []);

  return (
    // exports userData and boolean userLoading
    <UserContext.Provider value={{ userData, userLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
