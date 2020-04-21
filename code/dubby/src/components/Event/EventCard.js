import React, { useState, useEffect, useContext } from "react";
import { GymContext } from "../../contexts/GymContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import { Link } from "react-router-dom";
import { firestore, auth } from "firebase";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  ButtonGroup,
  Badge,
} from "reactstrap";
import LoadingEventCard from "../Loading/LoadingEventCard";
import ProfileHead from "../Profile/ProfileHead";

const EventCard = ({ eid, searchString }) => {
  const { gymData } = useContext(GymContext);
  const { isPrimaryTheme } = useContext(ThemeContext);
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

  const parseTimeDisplay = (time) => {
    const st = new Date(time);
    const stt = st.toLocaleTimeString();
    const std = st.toLocaleDateString();
    const isToday =
      new Date(Date.now()).toLocaleDateString() === st.toLocaleDateString();
    const parsedTime =
      (isToday ? "Today" : std.substring(0, std.length - 5)) +
      ", " +
      stt.substring(0, stt.length - 6) +
      stt.substring(stt.length - 2);
    return parsedTime;
  };

  // render
  if (
    !eventData ||
    !eventParticipants ||
    !hostUserData ||
    !foundTypeData ||
    !foundLocationData
  ) {
    return <LoadingEventCard />;
  } else if (
    !matchSearchResult ||
    (!eventParticipants.find((p) => p.uid === auth().currentUser.uid) &&
      !eventData.isPublic)
  ) {
    return null;
  } else {
    const { eventName, startingTime, allowedPeople, eid } = eventData;
    const { uid } = auth().currentUser;
    const vacancy =
      allowedPeople -
        (eventParticipants.length ? eventParticipants.length : 0) >
      0
        ? allowedPeople -
          (eventParticipants.length ? eventParticipants.length : 0)
        : 0;
    const parsedStartingTime = parseTimeDisplay(startingTime);

    return (
      <Card
        body
        inverse={!isPrimaryTheme}
        color={!isPrimaryTheme ? "dark" : null}
        style={{ marginBottom: "1rem" }}
      >
        <CardSubtitle>
          <Badge pill color="secondary">
            <i className={foundTypeData.icon}></i> {foundTypeData.display}
          </Badge>
          {eventParticipants.find((p) => p.uid === uid) &&
          eventParticipants.find((p) => p.uid === uid).status === "joined" ? (
            <Badge pill color="info">
              Joined
            </Badge>
          ) : (
            <Badge pill color="dark">
              Invited
            </Badge>
          )}
          {eventData.isPublic || (
            <Badge pill color="success">
              Private
            </Badge>
          )}
          {hostUserData.uid === uid && (
            <Badge pill color="warning">
              Hosting
            </Badge>
          )}
        </CardSubtitle>
        <CardTitle>
          <b>{eventName}</b>
        </CardTitle>
        <CardSubtitle>{foundLocationData.display_short}</CardSubtitle>
        <CardText>Starting at {parsedStartingTime}</CardText>
        <CardText>
          Vacancy: {vacancy}/{allowedPeople}
        </CardText>
        <ButtonGroup size="sm">
          <Button tag={Link} to={`/e/${eid}`}>
            <i className="fas fa-plus"></i> More
          </Button>
          <Button outline tag={Link} to={`/u/${hostUserData.uid}`}>
            <ProfileHead size="inline" src={hostUserData.profileImageSrc} />{" "}
            {hostUserData.username}
          </Button>
        </ButtonGroup>
      </Card>
    );
  }
};

export default EventCard;
