import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Jumbotron, Input } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "./EventCard";

const EventPage = () => {
  const { theme } = useContext(ThemeContext);
  const { userData, userLoading } = useContext(UserContext);

  const [eventList, setEventList] = useState();
  const [searchEvent, setSearchEvent] = useState();

  // subscribe to events whose startingTime is later than now
  useEffect(() => {
    if (userData) {
      const eventRef = firestore()
        .collection("event")
        .where("startingTime", ">=", Date.now())
        .orderBy("startingTime")
        .limitToLast(100);
      const unsubscribeEventList = eventRef.onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((doc) => tmp.push(doc.id));
        setEventList(tmp);
      });
      return () => {
        unsubscribeEventList();
      };
    }
  }, [userData]);

  // render
  if (userLoading || !eventList) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else {
    return (
      <div style={theme.background}>
        <NavBar />
        <Jumbotron style={theme.jumbotron}>
          <h1>Dubby</h1>
          <p>Find an event to join!</p>
          <Input
            bsSize="sm"
            placeholder="Type in the type of sports you want to search..."
            onChange={(e) => setSearchEvent(e.target.value)}
          />
        </Jumbotron>

        <div style={theme.mainContainer}>
          {eventList.length > 0 &&
            eventList.map((eid) => (
              <EventCard searchString={searchEvent} key={eid} eid={eid} />
            ))}
        </div>
      </div>
    );
  }
};

export default EventPage;
