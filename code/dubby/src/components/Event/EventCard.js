import React, { useState, useEffect } from "react";
import { firestore, auth } from "firebase";
import LoadingEventCard from "../Loading/LoadingEventCard";
import { addParticipantToEvent } from "../../utilityfunctions/Utilities";

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
    const { uid } = auth().currentUser;
    return (
      <div className="event-card">
        <div className="event-description-short">
          <div className="event-icon">
            <i className={`fas ${"fa-basketball-ball"}`}></i>
          </div>
          <div>
            <h3>{eventData.eventName}</h3>
            <p>at {eventData.location}</p>
            <span>
              Starting at {new Date(eventData.startingTime).toLocaleString()}
            </span>
            <p>
              Vacancy:{" "}
              {eventData.allowedPeople -
                (eventParticipants.length ? eventParticipants.length : 0)}
            </p>
            <p>Host: {hostUserData.username}</p>
          </div>
        </div>
        <div className="event-description-actions">
          {/* <p>Your friends Tom and others are going</p> */}
          {/* <button>Show more</button> */}
          {eventParticipants.find(x => x.uid === uid) ? (
            <p>joined!</p>
          ) : (
            <button
              onClick={async () => {
                await addParticipantToEvent({
                  eid: eventData.eid,
                  uid: auth().currentUser.uid,
                  status: "joined"
                });
                alert("joined!");
              }}
            >
              Join
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default EventCard;
