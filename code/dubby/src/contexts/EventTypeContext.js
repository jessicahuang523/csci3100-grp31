import React, { createContext, useState, useEffect } from "react";
import { firestore } from "firebase";

export const EventTypeContext = createContext();

const EventTypeContextProvider = (props) => {
  const [eventTypeLoading, setEventTypeLoading] = useState(true);
  const [eventTypeData, setEventTypeData] = useState(null);

  const compare = (a, b) => {
    if (a.value === "others") {
      return 1;
    } else if (b.value === "others") {
      return -1;
    } else {
      return a.value.localeCompare(b.value);
    }
  };

  useEffect(() => {
    const unsubscribeEventType = firestore()
      .collection("event_types")
      .onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((d) => tmp.push(d.data()));
        tmp.sort(compare);
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
