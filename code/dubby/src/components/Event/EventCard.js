import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
import LoadingEventCard from "../Loading/LoadingEventCard";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";

const EventCard = ({ eid }) => {
  const [eventData, setEventData] = useState();
  const [eventParticipants, setEventParticipants] = useState();
  const [hostUserData, setHostUserData] = useState();

  useEffect(() => {
    if (eid) {
      const eventRef = firestore()
        .collection("event")
        .doc(eid);
      const unsubscribeEventData = eventRef.onSnapshot(snap =>
        setEventData(snap.data())
      );
      const unsubscribeEventParticipantData = eventRef
        .collection("participants")
        .onSnapshot(snap => {
          let tmp = [];
          snap.forEach(doc => tmp.push(doc.data()));
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
      const unsubscribeUserData = userRef.onSnapshot(snap =>
        setHostUserData(snap.data())
      );
      return () => {
        unsubscribeUserData();
      };
    }
  }, [eventData]);

  if (!eventData || !eventParticipants || !hostUserData) {
    return <LoadingEventCard />;
  } else {
    return (
      <Card body style={{ marginBottom: "1rem" }}>
        <CardTitle>{eventData.eventName}</CardTitle>
        <CardSubtitle>{eventData.location}</CardSubtitle>
        <CardText>
          Starting at {new Date(eventData.startingTime).toLocaleString()}
        </CardText>
        <CardText>
          Vacancy:{" "}
          {eventData.allowedPeople -
            (eventParticipants.length ? eventParticipants.length : 0)}
        </CardText>
        <CardText>Hosted by {hostUserData.username}</CardText>
        <Button tag={Link} to={`/e/${eventData.eid}`}>
          More/Join
        </Button>
      </Card>
    );
  }
};

export default EventCard;
