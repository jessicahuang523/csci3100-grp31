import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { GymContext } from "../../contexts/GymContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import { Jumbotron, Button, Badge, Row, Col } from "reactstrap";
import Loading from "../Loading/Loading";
import NavBar from "../Navbar/Navbar";
import {
  addParticipantToEvent,
  deleteEvent,
} from "../../utilityfunctions/Utilities";
import ProfileHead from "../Profile/ProfileHead";

const Event = () => {
  const { eid } = useParams();

  const { userData, userLoading } = useContext(UserContext);
  const { gymData } = useContext(GymContext);
  const { eventTypeData } = useContext(EventTypeContext);

  const [eventData, setEventData] = useState();
  const [noEventRedirect, setNoEventRedirect] = useState(false);
  const [eventParticipants, setEventParticipants] = useState();
  const [hostUserData, setHostUserData] = useState();
  const [foundTypeData, setFoundTypeData] = useState();
  const [foundLocationData, setFoundLocationData] = useState();
  const [joinLoading, setJoinLoading] = useState(false);
  const [eventDeleteLoading, setEventDeleteLoading] = useState(false);

  useEffect(() => {
    if (eid) {
      const eventRef = firestore().collection("event").doc(eid);
      const unsubscribeEventData = eventRef.onSnapshot((snap) => {
        if (snap.exists) {
          setEventData(snap.data());
        } else {
          setNoEventRedirect(true);
        }
      });
      const unsubscribeEventParticipantData = eventRef
        .collection("participants")
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setEventParticipants(tmp);
        });
      return () => {
        unsubscribeEventData();
        unsubscribeEventParticipantData();
      };
    }
  }, [eid]);

  useEffect(() => {
    if (eventData) {
      const userRef = firestore()
        .collection("user_profile")
        .doc(eventData.hostUid);
      const unsubscribeUserData = userRef.onSnapshot((snap) =>
        setHostUserData(snap.data())
      );
      return () => {
        unsubscribeUserData();
      };
    }
  }, [eventData]);

  useEffect(() => {
    if (eventData && eventTypeData && gymData) {
      setFoundTypeData(
        eventTypeData.find((t) => t.value === eventData.eventType)
      );
      setFoundLocationData(gymData.find((g) => g.value === eventData.location));
    }
  }, [eventData, eventTypeData, gymData]);

  const handleJoinButtonClick = async () => {
    setJoinLoading(true);
    await addParticipantToEvent({
      eid: eventData.eid,
      uid: auth().currentUser.uid,
      status: "joined",
    });
    setJoinLoading(false);
  };

  const handleDeleteEventButtonClick = async () => {
    setEventDeleteLoading(true);
    await deleteEvent(eventData);
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (noEventRedirect) {
    return <Redirect to="/e" />;
  } else if (
    eventDeleteLoading ||
    !eventData ||
    !eventParticipants ||
    !hostUserData ||
    joinLoading
  ) {
    return <Loading />;
  } else {
    const { uid } = auth().currentUser;
    return (
      <div>
        <NavBar />
        <Jumbotron fluid style={{ padding: "1rem" }}>
          <h1>
            <i className={foundTypeData.icon}></i>[{foundTypeData.display}]{" "}
            {eventData.eventName}{" "}
            {eventParticipants.find((x) => x.uid === uid) && (
              <Badge pill color="info">
                Joined
              </Badge>
            )}
          </h1>
        </Jumbotron>
        <div style={{ padding: "1rem" }}>
          <p>Location: {foundLocationData.display}</p>
          <p>Starting at {new Date(eventData.startingTime).toLocaleString()}</p>
          <p>
            Vacancy:{" "}
            {eventData.allowedPeople -
              (eventParticipants.length ? eventParticipants.length : 0)}
          </p>
          <Row>
            <Col sm={{ size: 6 }}>
              <Button block outline tag={Link} to={`/u/${hostUserData.uid}`}>
                <ProfileHead size="inline" src={hostUserData.profileImageSrc} />{" "}
                {hostUserData.username}
              </Button>
            </Col>
            <Col sm={{ size: 6 }}>
              {eventParticipants.find((x) => x.uid === uid) ? (
                <Button block tag={Link} to={`/c/${eventData.cid}`}>
                  <i className="fas fa-comment-dots"></i>
                  Chat!
                </Button>
              ) : (
                <Button block onClick={handleJoinButtonClick}>
                  Join
                </Button>
              )}
            </Col>
          </Row>
          <hr />{" "}
          {uid === hostUserData.uid ? (
            <Row>
              <Col>
                <Button block tag={Link} to="/">
                  <i className="fas fa-undo"></i> Back to My Events
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <Button block tag={Link} to="/e">
                  <i className="fas fa-undo"></i> Back to Events Page
                </Button>
              </Col>
            </Row>
          )}
          <hr />
          {uid === hostUserData.uid && (
            <Row>
              <Col>
                <Button block onClick={handleDeleteEventButtonClick}>
                  <i className="fas fa-trash"></i>
                  Delete
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
};

export default Event;
