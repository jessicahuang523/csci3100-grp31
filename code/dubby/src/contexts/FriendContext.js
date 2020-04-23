import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore, auth } from "firebase";
import { UserContext } from "./UserContext";

export const FriendContext = createContext();

const FriendContextProvider = (props) => {
  const { userData } = useContext(UserContext);

  // lists of friend contexts from current user
  const [sentRequests, setSentRequests] = useState(null);
  const [receivedRequests, setReceivedRequests] = useState(null);
  const [friendList, setFriendList] = useState(null);
  // (exported) given above list, fetched user data from each user in list
  const [sentRequestData, setSentRequestData] = useState(null);
  const [receivedRequestData, setReceivedRequestData] = useState(null);
  const [friendListData, setFriendListData] = useState(null);
  // information on whether data are loaded
  const [srLoaded, setSrLoaded] = useState(false);
  const [rrLoaded, setRrLoaded] = useState(false);
  const [flLoaded, setFlLoaded] = useState(false);
  // (exported) true when all data are loaded
  const [friendContextLoaded, setFriendContextLoaded] = useState(false);

  // given userData, subscribe to requests
  // in /user_profile/{uid}/sent_friend_requests
  // updates sentRequests
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

  // given userData, subscribe to requests
  // in /user_profile/{uid}/received_friend_requests
  // updates receivedRequests
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

  // given userData, subscribe to friend data in /user_profile/{uid}/friend_list
  // updates friendList
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

  // given sentRequests (or lack thereof),
  // fetch user data of receivers from /user_profile/{uid}
  // updates srLoaded and sentRequestData
  useEffect(() => {
    let data = [];
    if (sentRequests) {
      if (sentRequests === "none") {
        setSentRequestData([]);
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

  // given receivedRequests (or lack thereof),
  // fetch user data of sender from /user_profile/{uid}
  // updates rrLoaded and receivedRequestData
  useEffect(() => {
    let data = [];
    if (receivedRequests) {
      if (receivedRequests === "none") {
        setReceivedRequestData([]);
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

  // given friendList (or lack thereof),
  // fetch user data of friends from /user_profile/{uid}
  // updates flLoaded and friendListData
  useEffect(() => {
    let data = [];
    if (friendList) {
      if (friendList === "none") {
        setFriendListData([]);
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

  // set friendContextLoaded (exported boolean) = true only when all
  // sent/received requests and friend list are loaded
  useEffect(() => {
    if (srLoaded && rrLoaded && flLoaded) {
      setFriendContextLoaded(true);
    }
  }, [srLoaded, rrLoaded, flLoaded]);

  return (
    // exports boolean friendContextLoaded, lists of user data in
    // sentRequestData, receivedRequestData, and friendListData
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
