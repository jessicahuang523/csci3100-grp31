import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore, auth } from "firebase";
import { UserContext } from "./UserContext";

export const FriendContext = createContext();

const FriendContextProvider = (props) => {
  const { userData } = useContext(UserContext);

  const [sentRequests, setSentRequests] = useState(null);
  const [receivedRequests, setReceivedRequests] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [sentRequestData, setSentRequestData] = useState(null);
  const [receivedRequestData, setReceivedRequestData] = useState(null);
  const [friendListData, setFriendListData] = useState(null);
  const [srLoaded, setSrLoaded] = useState(false);
  const [rrLoaded, setRrLoaded] = useState(false);
  const [flLoaded, setFlLoaded] = useState(false);
  const [friendContextLoaded, setFriendContextLoaded] = useState(false);

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
      const sentRequestsRef = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("sent_friend_requests");
      const unsubscribeSentRequestsRefData = sentRequestsRef.onSnapshot(
        (snap) => {
          if (snap.empty) {
            setSentRequests("none");
          } else {
            let tmp = [];
            snap.forEach((doc) => tmp.push(doc.data()));
            setSentRequests(tmp);
          }
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
          if (snap.empty) {
            setReceivedRequests("none");
          } else {
            let tmp = [];
            snap.forEach((doc) => tmp.push(doc.data()));
            setReceivedRequests(tmp);
          }
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
        if (snap.empty) {
          setFriendList("none");
        } else {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setFriendList(tmp);
        }
      });
      return () => {
        unsubscribeFriendListData();
      };
    }
  }, [userData]);

  useEffect(() => {
    let data = [];
    if (sentRequests) {
      if (sentRequests === "none") {
        setSentRequestData(null);
        setSrLoaded(true);
        return;
      }
      sentRequests.forEach(({ uid }) => {
        const ref = firestore().collection("user_profile").doc(uid);
        ref.get().then((s) => {
          data.push(s.data());
          if (data.length === sentRequests.length) {
            setSentRequestData(data);
            setSrLoaded(true);
          }
        });
      });
    }
  }, [sentRequests]);

  useEffect(() => {
    let data = [];
    if (receivedRequests) {
      if (receivedRequests === "none") {
        setReceivedRequestData(null);
        setRrLoaded(true);
        return;
      }
      receivedRequests.forEach(({ uid }) => {
        const ref = firestore().collection("user_profile").doc(uid);
        ref.get().then((s) => {
          data.push(s.data());
          if (data.length === receivedRequests.length) {
            setReceivedRequestData(data);
            setRrLoaded(true);
          }
        });
      });
    }
  }, [receivedRequests]);

  useEffect(() => {
    let data = [];
    if (friendList) {
      if (friendList === "none") {
        setFriendListData(null);
        setFlLoaded(true);
        return;
      }
      friendList.forEach(({ uid }) => {
        const ref = firestore().collection("user_profile").doc(uid);
        ref.get().then((s) => {
          data.push(s.data());
          if (data.length === friendList.length) {
            setFriendListData(data);
            setFlLoaded(true);
          }
        });
      });
    }
  }, [friendList]);

  useEffect(() => {
    if (srLoaded && rrLoaded && flLoaded) {
      setFriendContextLoaded(true);
    }
  }, [srLoaded, rrLoaded, flLoaded]);

  return (
    <FriendContext.Provider
      value={{
        sentRequestData,
        receivedRequestData,
        friendListData,
        friendContextLoaded,
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
