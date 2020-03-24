import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "firebase";
import LoadingChatCard from "../Loading/LoadingChatCard";
import { Card, CardHeader, CardText, CardBody } from "reactstrap";

const ChatCard = ({ cid }) => {
  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();

  useEffect(() => {
    const chatRef = firestore()
      .collection("chat")
      .doc(cid);
    const unsubscribeChatData = chatRef.onSnapshot(snap =>
      setChatData(snap.data())
    );
    const unsubscribeChatMessages = chatRef
      .collection("messages")
      .orderBy("created_at")
      .limitToLast(1)
      .onSnapshot(snap => snap.forEach(doc => setChatMessages(doc.data())));
    return () => {
      unsubscribeChatData();
      unsubscribeChatMessages();
    };
  }, [cid]);

  if (!chatData) {
    return <LoadingChatCard />;
  } else {
    return (
      <Card tag={Link} to={`/c/${cid}`} style={{ marginBottom: "1rem" }}>
        <CardHeader>
          <i className={chatData.icon}></i>
          {chatData.title}
        </CardHeader>
        <CardBody>
          <CardText>
            {chatMessages
              ? `${chatMessages.sender.username}: ${chatMessages.text}`
              : "Wow, such empty"}
          </CardText>
        </CardBody>
      </Card>
    );
  }
};

export default ChatCard;
