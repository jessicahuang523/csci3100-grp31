import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import EventCard from "../Event/EventCard";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import { Jumbotron } from "reactstrap";

const MainFeed = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [eventList, setEventList] = useState();

  useEffect(() => {
    const eventRef = firestore()
      .collection("event")
      .orderBy("startingTime")
      .limitToLast(20);
    const unsubscribeEventList = eventRef.onSnapshot(snap => {
      let tmp = [];
      snap.forEach(doc => tmp.push(doc.id));
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
          <h1>My Feed</h1>
        </Jumbotron>
        {eventList &&
          eventList.length > 0 &&
          eventList.map(eid => <EventCard key={eid} eid={eid} />)}
      </div>
    );
  }
};

export default MainFeed;
