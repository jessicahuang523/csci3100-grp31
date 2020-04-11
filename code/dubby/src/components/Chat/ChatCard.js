import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "firebase";
import { Card, CardHeader, CardText, CardBody } from "reactstrap";
import LoadingChatCard from "../Loading/LoadingChatCard";

const ChatCard = ({ cid }) => {
  const [chatData, setChatData] = useState();
  const [chatMessage, setChatMessage] = useState();
  const [chatSenderUsername, setChatSenderUsername] = useState();

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
      const unsubscribeChatSenderUsername = userDataRef.onSnapshot((snap) =>
        setChatSenderUsername(snap.data().username)
      );
      return () => {
        unsubscribeChatSenderUsername();
      };
    }
  }, [chatMessage]);

  if (!chatData || !chatSenderUsername) {
    return <LoadingChatCard />;
  } else {
    const { icon, title } = chatData;
    return (
      <div className="chat-card">
        <Card tag={Link} to={`/c/${cid}`}>
          <CardHeader>
            <i className={icon}></i> {title}
          </CardHeader>
          <CardBody>
            <CardText>
              {chatMessage
                ? `${chatSenderUsername}: ${chatMessage.text}`
                : "Wow, such empty"}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default ChatCard;
