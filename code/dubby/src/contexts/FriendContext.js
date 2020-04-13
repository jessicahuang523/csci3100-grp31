import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore, auth } from "firebase";
import { UserContext } from "./UserContext";

export const FriendContext = createContext();

const FriendContextProvider = (props) => {
  const { userData } = useContext(UserContext);

  const [sentRequests, setSentRequests] = useState(null);
  const [receivedRequests, setReceivedRequests] = useState(null);
  const [friendList, setFriendList] = useState(null);

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
      const sentRequestsRef = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("sent_friend_requests");
      const unsubscribeSentRequestsRefData = sentRequestsRef.onSnapshot(
        (snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
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
        (snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
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
      const unsubscribeFriendListData = friendListRef.onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((doc) => tmp.push(doc.data()));
        setFriendList(tmp);
      });
      return () => {
        unsubscribeFriendListData();
      };
    }
  }, [userData]);

  return (
    <FriendContext.Provider
      value={{ sentRequests, receivedRequests, friendList }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
