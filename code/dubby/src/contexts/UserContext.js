import React, { createContext, useState, useEffect } from "react";
import { firestore, auth } from "firebase";
import { setupFirestoreForNewAccount } from "../utilityfunctions/Utilities";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribeAuthStateListener = auth().onAuthStateChanged(
      async user => {
        setUserLoading(true);
        if (user) {
          const profile = await firestore()
            .collection("user_profile")
            .doc(user.uid)
            .get();
          if (!profile.exists) {
            setupFirestoreForNewAccount(user);
          }
          setUserData(user);
        } else {
          setUserData(null);
        }
        setUserLoading(false);
      }
    );
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
