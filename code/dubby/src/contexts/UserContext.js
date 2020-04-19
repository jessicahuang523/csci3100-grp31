import React, { createContext, useState, useEffect } from "react";
import { firestore, auth } from "firebase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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
    <UserContext.Provider value={{ userData, userLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
