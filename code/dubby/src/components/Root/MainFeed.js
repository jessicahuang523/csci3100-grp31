import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Jumbotron, Button, Row, Col } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "../Event/EventCard";

const MainFeed = () => {
  const { theme } = useContext(ThemeContext);
  const { userData } = useContext(UserContext);

  // list of events for current user from /user_profile/{uid}/events
  const [userEventList, setUserEventList] = useState();

  // subscribe to events user participate in from /user_profile/{uid}/events
  useEffect(() => {
    if (userData) {
      const { uid } = userData;
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

  // render
  if (!userEventList) {
    return <Loading />;
  } else {
    return (
      <div style={theme.background}>
        <NavBar />
        <Jumbotron style={theme.jumbotron}>
          <h1>My Events</h1>
          <p>Events I joined or hosted by me!</p>
          <Button size="sm" color="success" tag={Link} to="/e/add">
            <i className="fas fa-plus"></i> New Event!
          </Button>
        </Jumbotron>

        <div style={theme.mainContainer}>
          {userEventList.length > 0 && (
            <Row xs="1" sm="2" md="3">
              {userEventList.map((event) => (
                <Col key={event.eid}>
                  <EventCard eid={event.eid} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
};

export default MainFeed;
