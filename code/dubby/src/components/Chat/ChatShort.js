import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "firebase";

const ChatShort = ({ cid }) => {
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

  if (chatData && chatMessages) {
    return (
      <li className="chat-short-container">
        <Link to={`/c/${cid}`}>
          <span className="chat-short-icon">
            <i className={chatData.icon}></i>
          </span>
          <span className="chat-short-detail">
            <div>
              <b>{chatData.title}</b>
              <p>{`${chatMessages.sender.username}: ${chatMessages.text}`}</p>
            </div>
          </span>
        </Link>
      </li>
    );
  } else {
    return (
      <li
        className="chat-short-container"
        style={{ height: "150px", backgroundColor: "#eee" }}
      ></li>
    );
  }
};

export default ChatShort;
