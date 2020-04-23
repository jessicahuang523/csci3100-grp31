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
  Badge,
  Col,
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

  // subscribe to event data from /event/{eid}
  // and participant data from /event/{eid}/participants
  // updates eventData and eventParticipants
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

  // loads data for type and location given eventData and type/gym contexts
  // updates foundTypeData and foundLocationData
  useEffect(() => {
    if (eventData && eventTypeData && gymData) {
      setFoundTypeData(
        eventTypeData.find((t) => t.value === eventData.eventType)
      );
      setFoundLocationData(gymData.find((g) => g.value === eventData.location));
    }
  }, [eventData, eventTypeData, gymData]);

  // subscribe to data for host user from /user_profile/{eventData.hostUid}
  // updates hostUserData
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

  // checks if this event should be displayed given search string
  // updates matchSearchResult
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

  // display string given event starting time
  const parseTimeDisplay = (time) => {
    const st = new Date(time);
    const stt = st.toLocaleTimeString("en-US");
    const std = st.toLocaleDateString("en-US");
    const isToday =
      new Date(Date.now()).toLocaleDateString("en-US") ===
      st.toLocaleDateString("en-US");
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
    // don't display if private and participants doesn't contain current user
    (!eventParticipants.find((p) => p.uid === auth().currentUser.uid) &&
      !eventData.isPublic)
  ) {
    return null;
  } else {
    const { eventName, startingTime, allowedPeople, eid } = eventData;
    const { uid } = auth().currentUser;
    const joinedParticipants = eventParticipants.filter(
      ({ status }) => status === "joined"
    );
    const vacancy =
      allowedPeople -
        (joinedParticipants.length ? joinedParticipants.length : 0) >
      0
        ? allowedPeople -
          (joinedParticipants.length ? joinedParticipants.length : 0)
        : 0;
    const parsedStartingTime = parseTimeDisplay(startingTime);
    const isFuture = startingTime > Date.now();

    return (
      <Col>
        <div className="event-card" style={{ marginBottom: "1rem" }}>
          <Card
            body
            tag={Link}
            to={`/e/${eid}`}
            inverse={!isPrimaryTheme}
            color={!isPrimaryTheme ? "dark" : null}
          >
            <CardSubtitle>
              <Badge pill color="secondary">
                <i className={foundTypeData.icon}></i> {foundTypeData.display}
              </Badge>
              {eventParticipants.find((p) => p.uid === uid) &&
                eventParticipants.find((p) => p.uid === uid).status ===
                  "joined" && (
                  <Badge pill color="info">
                    Joined
                  </Badge>
                )}
              {eventParticipants.find((p) => p.uid === uid) &&
                eventParticipants.find((p) => p.uid === uid).status ===
                  "invited" && (
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
            <CardTitle tag="h3">
              <b>{eventName}</b>
            </CardTitle>
            <CardText>
              <Badge pill color="warning">
                Location
              </Badge>{" "}
              {foundLocationData.display_short}
            </CardText>
            <CardText>
              <Badge
                pill
                color={
                  isFuture ? (isPrimaryTheme ? "dark" : "light") : "secondary"
                }
              >
                {isFuture ? "Starting" : "Started"}
              </Badge>{" "}
              {parsedStartingTime}
              <br />
              <Badge pill color="success">
                Vacancy
              </Badge>{" "}
              {vacancy}/{allowedPeople}
            </CardText>
            <CardSubtitle>
              <Badge pill color={isPrimaryTheme ? "dark" : "light"}>
                Host
              </Badge>{" "}
              <ProfileHead size="inline" src={hostUserData.profileImageSrc} />{" "}
              {hostUserData.username}
            </CardSubtitle>
          </Card>
        </div>
      </Col>
    );
  }
};

export default EventCard;
