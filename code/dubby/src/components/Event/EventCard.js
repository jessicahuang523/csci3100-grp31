import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
import LoadingEventCard from "../Loading/LoadingEventCard";
import { Link } from "react-router-dom";

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

  useEffect(() => console.log({ eventData, eventParticipants }), [
    eventData,
    eventParticipants
  ]);

  if (!eventData || !eventParticipants || !hostUserData) {
    return <LoadingEventCard />;
  } else {
    return (
      <div className="event-card">
        <div className="event-description-short">
          <div className="event-icon">
            <i className={`fas ${"fa-basketball-ball"}`}></i>
          </div>
          <div>
            <Link to={`/e/${eventData.eid}`}>
              <h3>{eventData.eventName}</h3>
            </Link>
            <p>at {eventData.location}</p>
            <span>
              Starting at {new Date(eventData.startingTime).toLocaleString()}
            </span>
            <p>
              Vacancy:{" "}
              {eventData.allowedPeople -
                (eventParticipants.length ? eventParticipants.length : 0)}
            </p>
            <p>
              Host:{" "}
              <Link to={`/u/${hostUserData.uid}`}>{hostUserData.username}</Link>
            </p>
          </div>
        </div>
        <div className="event-description-actions">
          <Link to={`/e/${eventData.eid}`}>More/Join</Link>
        </div>
      </div>
    );
  }
};

export default EventCard;
