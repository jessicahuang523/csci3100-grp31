import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore } from "firebase";
import { UserContext } from "./UserContext";

export const EventTypeContext = createContext();

const EventTypeContextProvider = (props) => {
  const { userData } = useContext(UserContext);

  // eventTypeLoading = true when fetching data from database
  const [eventTypeLoading, setEventTypeLoading] = useState(true);
  // eventTypeData contains list of event type data in /event_types
  const [eventTypeData, setEventTypeData] = useState(null);

  // order events but put "others" at last
  const compare = (a, b) => {
    if (a.value === "others") {
      return 1;
    } else if (b.value === "others") {
      return -1;
    } else {
      return a.value.localeCompare(b.value);
    }
  };

  // subscribe to event type data (/event_types) on initialization
  useEffect(() => {
    if (userData) {
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
    }
  }, [userData]);

  return (
    // exports eventTypeData and boolean eventTypeLoading
    <EventTypeContext.Provider value={{ eventTypeData, eventTypeLoading }}>
      {props.children}
    </EventTypeContext.Provider>
  );
};

export default EventTypeContextProvider;
