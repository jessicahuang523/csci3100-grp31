import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { firestore, auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { CardColumns, Jumbotron, Button } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "./EventCard";

const EventPage = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [userEventList, setUserEventList] = useState();

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
      const unsubscribeUserEventList = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("events")
        .orderBy("startingTime")
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setUserEventList(tmp);
        });
      return () => {
        unsubscribeUserEventList();
      };
    }
  }, [userData]);

  if (userLoading || !userEventList) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else {
    return (
      <div>
        <NavBar />
        <Jumbotron>
          <h1>My Events</h1>
          <p>Events I joined or hosted by me!</p>
          <hr />
          <Button tag={Link} to="/e/add">
            Add new Event
          </Button>
        </Jumbotron>
        {userEventList && userEventList.length > 0 && (
          <CardColumns>
            {userEventList.map((event) => (
              <EventCard key={event.eid} eid={event.eid} />
            ))}
          </CardColumns>
        )}
      </div>
    );
  }
};

export default EventPage;
