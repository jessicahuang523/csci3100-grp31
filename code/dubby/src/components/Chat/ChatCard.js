import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { firestore } from "firebase";
import { Card, CardHeader, CardText, CardBody } from "reactstrap";
import LoadingChatCard from "../Loading/LoadingChatCard";
import ProfileHead from "../Profile/ProfileHead";

const ChatCard = ({ cid }) => {
  const { userData, userLoading } = useContext(UserContext);

  const [chatData, setChatData] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  const [chatMessage, setChatMessage] = useState();
  const [chatSenderData, setChatSenderData] = useState();

  useEffect(() => {
    const chatRef = firestore().collection("chat").doc(cid);
    const unsubscribeChatData = chatRef.onSnapshot((snap) =>
      setChatData(snap.data())
    );
    const unsubscribeChatMessage = chatRef
      .collection("messages")
      .orderBy("created_at")
      .limitToLast(1)
      .onSnapshot((snap) => snap.forEach((doc) => setChatMessage(doc.data())));
    return () => {
      unsubscribeChatData();
      unsubscribeChatMessage();
    };
  }, [cid]);

  useEffect(() => {
    if (chatMessage && chatMessage.sender) {
      const { uid } = chatMessage.sender;
      const userDataRef = firestore().collection("user_profile").doc(uid);
      const unsubscribeChatSenderData = userDataRef.onSnapshot((snap) =>
        setChatSenderData(snap.data())
      );
      return () => {
        unsubscribeChatSenderData();
      };
    }
  }, [chatMessage]);

  useEffect(() => {
    if (userData) {
      const chatDataRef = firestore().collection("chat").doc(cid);
      const chatParticipantsRef = chatDataRef.collection("participants");
      const unsubscribeChatParticipants = chatParticipantsRef.onSnapshot(
        (snap) => {
          let tmp = [];
          snap.forEach((doc) => {
            tmp.push(doc.data());
          });
          setChatParticipants(tmp);
        }
      );
      return () => {
        unsubscribeChatParticipants();
      };
    }
  }, [userData, cid]);

  useEffect(() => {
    let pData = [];
    if (chatParticipants) {
      chatParticipants.forEach(({ uid }) => {
        const pRef = firestore().collection("user_profile").doc(uid);
        pRef.get().then((s) => {
          pData.push(s.data());
          if (pData.length === chatParticipants.length) {
            setchatParticipantData(pData);
          }
        });
      });
    }
  }, [chatParticipants]);

  if (!chatData || (chatMessage && !chatSenderData) || !chatParticipantData) {
    return <LoadingChatCard />;
  } else {
    const { icon } = chatData;
    const title =
      chatData.type === "private"
        ? chatParticipantData.find((p) => p.uid !== userData.uid).username
        : chatData.title;
    return (
      <div className="chat-card">
        <Card tag={Link} to={`/c/${cid}`}>
          <CardHeader>
            <i className={icon}></i>
            {title}
          </CardHeader>
          <CardBody>
            <CardText>
              {chatSenderData && (
                <ProfileHead
                  src={chatSenderData.profileImageSrc}
                  size="inline"
                />
              )}
              {chatMessage
                ? ` ${chatSenderData.username}: ${chatMessage.text}`
                : "Wow, such empty"}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default ChatCard;
