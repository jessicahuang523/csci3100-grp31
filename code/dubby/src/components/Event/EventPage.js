import React, { useState, useEffect, useContext } from "react";
import EventCard from "./EventCard";
import { UserContext } from "../../contexts/UserContext";
import { firestore, auth } from "firebase";
import { Redirect } from "react-router-dom";

const EventPage = () => {
  const { userIsLoggedin, userLoading } = useContext(UserContext);

  const [userEventList, setUserEventList] = useState();

  useEffect(() => {
    if (userIsLoggedin) {
      const { uid } = auth().currentUser;
      const unsubscribeUserEventList = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("events")
        .onSnapshot(snap => {
          let tmp = [];
          snap.forEach(doc => tmp.push(doc.data()));
          setUserEventList(tmp);
        });
      return () => {
        unsubscribeUserEventList();
      };
    }
  }, []);

  if (userLoading || !userEventList) {
    return (
      <div className="main-container">
        <header>
          <h1>loading...</h1>
        </header>
      </div>
    );
  } else if (userIsLoggedin) {
    return (
      <div className="main-container">
        <header>
          <h1>Events</h1>
        </header>
        {userEventList && userEventList.length > 0 && (
          <ul>
            {userEventList.map(event => (
              <EventCard key={event.eid} eid={event.eid} />
            ))}
          </ul>
        )}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default EventPage;
