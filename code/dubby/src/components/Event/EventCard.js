import React, { useState, useEffect, useContext } from "react";
import { GymContext } from "../../contexts/GymContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import { Link } from "react-router-dom";
import { firestore, auth } from "firebase";
import { Card, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import LoadingEventCard from "../Loading/LoadingEventCard";

const EventCard = ({ eid, searchString }) => {
  const { gymData } = useContext(GymContext);
  const { eventTypeData } = useContext(EventTypeContext);

  const [eventData, setEventData] = useState();
  const [eventParticipants, setEventParticipants] = useState();
  const [hostUserData, setHostUserData] = useState();
  const [foundTypeData, setFoundTypeData] = useState();
  const [foundLocationData, setFoundLocationData] = useState();
  const [matchSearchResult, setMatchSearchResult] = useState(true);

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
    if (eventData && eventTypeData && gymData) {
      setFoundTypeData(
        eventTypeData.find((t) => t.value === eventData.eventType)
      );
      setFoundLocationData(gymData.find((g) => g.value === eventData.location));
    }
  }, [eventData, eventTypeData, gymData]);

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
    setMatchSearchResult(true);
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
        foundTypeData.display.toLowerCase().search(searchString.toLowerCase()) <
          0 &&
        foundTypeData.value.toLowerCase().search(searchString.toLowerCase()) <
          0 &&
        foundLocationData.display
          .toLowerCase()
          .search(searchString.toLowerCase()) < 0 &&
        foundLocationData.display_short
          .toLowerCase()
          .search(searchString.toLowerCase()) < 0 &&
        foundLocationData.value
          .toLowerCase()
          .search(searchString.toLowerCase()) < 0 &&
        eid.toLowerCase().search(searchString.toLowerCase()) < 0 &&
        hostUserData.username.toLowerCase().search(searchString.toLowerCase()) <
          0
      ) {
        setMatchSearchResult(false);
      }
    } catch (e) {}
  }, [
    searchString,
    eventData,
    hostUserData,
    eid,
    foundTypeData,
    foundLocationData,
  ]);

  if (
    !eventData ||
    !eventParticipants ||
    !hostUserData ||
    !foundTypeData ||
    !foundLocationData
  ) {
    return <LoadingEventCard />;
  } else if (!matchSearchResult) {
    return null;
  } else {
    const { eventName, startingTime, allowedPeople, eid } = eventData;
    const { uid } = auth().currentUser;
    return (
      <Card body style={{ marginBottom: "1rem" }}>
        <CardTitle>
          <i className={foundTypeData.icon}></i> [{foundTypeData.display}]{" "}
          {eventName}
        </CardTitle>
        <CardSubtitle>{foundLocationData.display}</CardSubtitle>
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
