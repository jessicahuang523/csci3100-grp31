import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { firestore, auth } from "firebase";
import { addParticipantToEvent } from "../../utilityfunctions/Utilities";
import Loading from "../Loading/Loading";
import NavBar from "../Navbar/Navbar";

const Event = () => {
  const { eid } = useParams();

  const { userData, userLoading } = useContext(UserContext);

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

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!eventData || !eventParticipants || !hostUserData) {
    return <Loading />;
  } else {
    const { uid } = auth().currentUser;
    return (
      <div>
        <NavBar />
        <header>
          <h1>{eventData.eventName}</h1>
          <p>Location: {eventData.location}</p>
        </header>
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
        <div className="event-description-actions">
          {eventParticipants.find(x => x.uid === uid) ? (
            <button>Joined</button>
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
          <button>
            <Link to={`/c/${eventData.cid}`}>Talk with participants!</Link>
          </button>
        </div>
      </div>
    );
  }
};

export default Event;
