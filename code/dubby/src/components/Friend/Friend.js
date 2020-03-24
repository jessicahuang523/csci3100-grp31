import React, { useContext, useState, useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import {
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button
} from "reactstrap";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";
import { Redirect, Link } from "react-router-dom";
import { firestore, auth } from "firebase";
import { acceptFriendRequest } from "../../utilityfunctions/Utilities";

const Friend = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [sentRequests, setSentRequests] = useState();
  const [receivedRequests, setReceivedRequests] = useState();
  const [friendList, setFriendList] = useState();

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
      const sentRequestsRef = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("sent_friend_requests");
      const unsubscribeSentRequestsRefData = sentRequestsRef.onSnapshot(
        snap => {
          let tmp = [];
          snap.forEach(doc => tmp.push(doc.data()));
          setSentRequests(tmp);
        }
      );
      return () => {
        unsubscribeSentRequestsRefData();
      };
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
      const receivedRequestsRef = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("received_friend_requests");
      const unsubscribeReceivedRequestData = receivedRequestsRef.onSnapshot(
        snap => {
          let tmp = [];
          snap.forEach(doc => tmp.push(doc.data()));
          setReceivedRequests(tmp);
        }
      );
      return () => {
        unsubscribeReceivedRequestData();
      };
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
      const friendListRef = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("friend_list");
      const unsubscribeFriendListData = friendListRef.onSnapshot(snap => {
        let tmp = [];
        snap.forEach(doc => tmp.push(doc.data()));
        setFriendList(tmp);
      });
      return () => {
        unsubscribeFriendListData();
      };
    }
  }, [userData]);

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  }
  return (
    <div>
      <NavBar />
      <Jumbotron>
        <h1>Friends</h1>
      </Jumbotron>
      <ListGroup>
        <ListGroupItemHeading>Friends</ListGroupItemHeading>
        {friendList && friendList.length > 0 ? (
          friendList.map(u => (
            <ListGroupItem key={u.uid}>
              <Link to={`/u/${u.uid}`}>{u.username}</Link>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>Wow, such empty</ListGroupItem>
        )}
      </ListGroup>
      <ListGroup>
        <ListGroupItemHeading>Sent Requests</ListGroupItemHeading>
        {sentRequests && sentRequests.length > 0 ? (
          sentRequests.map(u => (
            <ListGroupItem key={u.uid}>
              <Link to={`/u/${u.uid}`}>{u.username}</Link>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>Wow, such empty</ListGroupItem>
        )}
      </ListGroup>
      <ListGroup>
        <ListGroupItemHeading>Received Requests</ListGroupItemHeading>
        {receivedRequests && receivedRequests.length > 0 ? (
          receivedRequests.map(u => (
            <ListGroupItem key={u.uid}>
              <Link to={`/u/${u.uid}`}>{u.username}</Link>
              <Button onClick={() => acceptFriendRequest({ targetUid: u.uid })}>
                Accept
              </Button>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>Wow, such empty</ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
};

export default Friend;
