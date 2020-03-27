import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "firebase";
import LoadingChatCard from "../Loading/LoadingChatCard";
import { Card, CardHeader, CardText, CardBody } from "reactstrap";

const ChatCard = ({ cid }) => {
  const [chatData, setChatData] = useState();
  const [chatMessage, setChatMessage] = useState();

  useEffect(() => {
    const chatRef = firestore()
      .collection("chat")
      .doc(cid);
    const unsubscribeChatData = chatRef.onSnapshot(snap =>
      setChatData(snap.data())
    );
    const unsubscribeChatMessage = chatRef
      .collection("messages")
      .orderBy("created_at")
      .limitToLast(1)
      .onSnapshot(snap => snap.forEach(doc => setChatMessage(doc.data())));
    return () => {
      unsubscribeChatData();
      unsubscribeChatMessage();
    };
  }, [cid]);

  if (!chatData) {
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
                ? `${chatMessage.sender.username}: ${chatMessage.text}`
                : "Wow, such empty"}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default ChatCard;
