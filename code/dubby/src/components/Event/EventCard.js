import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore, auth } from "firebase";
import { Card, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import LoadingEventCard from "../Loading/LoadingEventCard";

const EventCard = ({ eid, searchString }) => {
  const [eventData, setEventData] = useState();
  const [eventParticipants, setEventParticipants] = useState();
  const [hostUserData, setHostUserData] = useState();
  const [eventTypeData, setEventTypeData] = useState();
  const [eventLocationData, setEventLocationData] = useState();
  const [searchDisplay, setSearchDisplay] = useState(true);

  useEffect(() => {
    if (eid) {
      const eventRef = firestore().collection("event").doc(eid);
      const unsubscribeEventData = eventRef.onSnapshot((snap) =>
        setEventData(snap.data())
      );
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
      const eventTypeRef = firestore()
        .collection("event_types")
        .where("value", "==", eventData.eventType);
      const unsubscribeEventTypeData = eventTypeRef.onSnapshot((snap) =>
        snap.forEach((d) => setEventTypeData(d.data()))
      );
      const eventLocationRef = firestore()
        .collection("event_location")
        .where("value", "==", eventData.location);
      const unsubscribeEventLocationData = eventLocationRef.onSnapshot((snap) =>
        snap.forEach((d) => setEventLocationData(d.data()))
      );
      return () => {
        unsubscribeUserData();
        unsubscribeEventTypeData();
        unsubscribeEventLocationData();
      };
    }
  }, [eventData]);

  useEffect(() => {
    setSearchDisplay(true);
    try {
      if (
        eventData &&
        hostUserData &&
        searchString &&
        eventData.eventName.toLowerCase().search(searchString.toLowerCase()) <
          0 &&
        eventData.location.toLowerCase().search(searchString.toLowerCase()) <
          0 &&
        eid.toLowerCase().search(searchString.toLowerCase()) < 0 &&
        eventTypeData.display.toLowerCase().search(searchString.toLowerCase()) <
          0 &&
        eventTypeData.value.toLowerCase().search(searchString.toLowerCase()) <
          0 &&
        eventLocationData.display
          .toLowerCase()
          .search(searchString.toLowerCase()) < 0 &&
        eventLocationData.display_short
          .toLowerCase()
          .search(searchString.toLowerCase()) < 0 &&
        eventLocationData.value
          .toLowerCase()
          .search(searchString.toLowerCase()) < 0 &&
        eid.toLowerCase().search(searchString.toLowerCase()) < 0 &&
        hostUserData.username.toLowerCase().search(searchString.toLowerCase()) <
          0
      ) {
        setSearchDisplay(false);
      }
    } catch (e) {}
  }, [
    searchString,
    eventData,
    hostUserData,
    eid,
    eventTypeData,
    eventLocationData,
  ]);

  if (
    !eventData ||
    !eventParticipants ||
    !hostUserData ||
    !eventTypeData ||
    !eventLocationData
  ) {
    return <LoadingEventCard />;
  } else if (!searchDisplay) {
    return null;
  } else {
    const { eventName, startingTime, allowedPeople, eid } = eventData;
    const { uid } = auth().currentUser;
    return (
      <Card body style={{ marginBottom: "1rem" }}>
        <CardTitle>
          <i className={eventTypeData.icon}></i> [{eventTypeData.display}]{" "}
          {eventName}
        </CardTitle>
        <CardSubtitle>{eventLocationData.display}</CardSubtitle>
        <CardText>
          Starting at {new Date(startingTime).toLocaleString()}
        </CardText>
        <CardText>
          Vacancy:{" "}
          {allowedPeople -
            (eventParticipants.length ? eventParticipants.length : 0)}
        </CardText>
        <CardText>Hosted by {hostUserData.username}</CardText>
        <Button tag={Link} to={`/e/${eid}`}>
          More
          {eventParticipants.find((p) => p.uid === uid) ? " (joined)" : "/Join"}
        </Button>
      </Card>
    );
  }
};

export default EventCard;
