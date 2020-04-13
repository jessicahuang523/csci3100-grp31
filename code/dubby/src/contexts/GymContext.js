import React, { createContext, useState, useEffect } from "react";
import { firestore } from "firebase";

export const GymContext = createContext();

const GymContextProvider = (props) => {
  const [gymLoading, setGymLoading] = useState(true);
  const [gymData, setGymData] = useState(null);

  useEffect(() => {
    const unsubscribeGym = firestore()
      .collection("event_location")
      .onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((d) => tmp.push(d.data()));
        setGymData(tmp);
        setGymLoading(false);
      });
    return () => {
      unsubscribeGym();
    };
  }, []);

  return (
    <GymContext.Provider value={{ gymData, gymLoading }}>
      {props.children}
    </GymContext.Provider>
  );
};

export default GymContextProvider;
