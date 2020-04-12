import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { Jumbotron, Input, Form } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "../Event/EventCard";

const MainFeed = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [eventList, setEventList] = useState();
  const [searchEvent, setSearchEvent] = useState();

  useEffect(() => {
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
  }, []);

  if (userLoading || !eventList) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else {
    return (
      <div>
        <NavBar />
        <Jumbotron>
          <h1>Dubby</h1>
          <p>Find an event to join!</p>
        </Jumbotron>
        <Form>
          <Input
            placeholder="search for an event..."
            onChange={(e) => setSearchEvent(e.target.value)}
          />
        </Form>
        {eventList &&
          eventList.length > 0 &&
          eventList.map((eid) => (
            <EventCard searchString={searchEvent} key={eid} eid={eid} />
          ))}
      </div>
    );
  }
};

export default MainFeed;
