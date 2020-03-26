import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { firestore, auth } from "firebase";
import { addParticipantToEvent } from "../../utilityfunctions/Utilities";
import Loading from "../Loading/Loading";
import NavBar from "../Navbar/Navbar";
import { Jumbotron, Button, Badge } from "reactstrap";

const Event = () => {
  const { eid } = useParams();

  const { userData, userLoading } = useContext(UserContext);

  const [eventData, setEventData] = useState();
  const [eventParticipants, setEventParticipants] = useState();
  const [hostUserData, setHostUserData] = useState();
  const [joinLoading, setJoinLoading] = useState(false);

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

  const handleJoinButtonClick = async () => {
    setJoinLoading(true);
    await addParticipantToEvent({
      eid: eventData.eid,
      uid: auth().currentUser.uid,
      status: "joined"
    });
    setJoinLoading(false);
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!eventData || !eventParticipants || !hostUserData || joinLoading) {
    return <Loading />;
  } else {
    const { uid } = auth().currentUser;
    return (
      <div>
        <NavBar />
        <Jumbotron fluid>
          <h1>
            {eventData.eventName}{" "}
            {eventParticipants.find(x => x.uid === uid) && (
              <Badge>Joined</Badge>
            )}
          </h1>
          {eventParticipants.find(x => x.uid === uid) ? (
            <Button tag={Link} to={`/c/${eventData.cid}`}>
              Talk with participants!
            </Button>
          ) : (
            <Button onClick={handleJoinButtonClick}>Join</Button>
          )}
        </Jumbotron>
        <p>Location: {eventData.location}</p>
        <p>Starting at {new Date(eventData.startingTime).toLocaleString()}</p>
        <p>
          Vacancy:{" "}
          {eventData.allowedPeople -
            (eventParticipants.length ? eventParticipants.length : 0)}
        </p>
        <Button tag={Link} to={`/u/${hostUserData.uid}`}>
          Host: {hostUserData.username}
        </Button>
      </div>
    );
  }
};

export default Event;
