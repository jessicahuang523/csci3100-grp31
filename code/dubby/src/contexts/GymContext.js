import React, { createContext, useState, useEffect } from "react";
import { firestore } from "firebase";

export const GymContext = createContext();

const GymContextProvider = (props) => {
  // gymLoading = true when fetching data from database
  const [gymLoading, setGymLoading] = useState(true);
  // gymData contains list of gym data in /event_location
  const [gymData, setGymData] = useState(null);

  // subscribe to gym data (/event_location) on initialization
  useEffect(() => {
    const unsubscribeGym = firestore()
      .collection("event_location")
      .onSnapshot((snap) => {
        setGymLoading(true);
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
    // exports gymData and boolean gymLoading
    <GymContext.Provider value={{ gymData, gymLoading }}>
      {props.children}
    </GymContext.Provider>
  );
};

export default GymContextProvider;
