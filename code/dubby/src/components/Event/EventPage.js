import React, { useState, useEffect, useContext } from "react";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Jumbotron,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Row,
} from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "./EventCard";

const EventPage = () => {
  const { theme } = useContext(ThemeContext);
  const { userData } = useContext(UserContext);

  // list of data for events to be displayed
  const [eventList, setEventList] = useState();
  // search string for events
  const [searchEvent, setSearchEvent] = useState();

  // subscribe to events whose startingTime is later than now
  // updates eventList
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
  if (!eventList) {
    return <Loading />;
  } else {
    return (
      <div style={theme.background}>
        <NavBar />
        <Jumbotron style={theme.jumbotron}>
          <h1>Dubby</h1>
          <p>Find an event to join!</p>
          {/* input bar to search for event */}
          <InputGroup size="sm">
            <Input
              placeholder="Type in the type of sports you want to search..."
              onChange={(e) => setSearchEvent(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="dark">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Jumbotron>

        {/* list of loaded events */}
        <div style={theme.mainContainer}>
          {eventList.length > 0 && (
            <Row xs="1" sm="2" md="3">
              {eventList.map((eid) => (
                <EventCard key={eid} searchString={searchEvent} eid={eid} />
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
};

export default EventPage;
