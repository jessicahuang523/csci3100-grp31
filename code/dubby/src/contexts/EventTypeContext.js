import React, { createContext, useState, useEffect } from "react";
import { firestore } from "firebase";

export const EventTypeContext = createContext();

const EventTypeContextProvider = (props) => {
  const [eventTypeLoading, setEventTypeLoading] = useState(true);
  const [eventTypeData, setEventTypeData] = useState(null);

  useEffect(() => {
    const unsubscribeEventType = firestore()
      .collection("event_types")
      .onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((d) => tmp.push(d.data()));
        setEventTypeData(tmp);
        setEventTypeLoading(false);
      });
    return () => {
      unsubscribeEventType();
    };
  }, []);

  return (
    <EventTypeContext.Provider value={{ eventTypeData, eventTypeLoading }}>
      {props.children}
    </EventTypeContext.Provider>
  );
};

export default EventTypeContextProvider;
