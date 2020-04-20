import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { firestore } from "firebase";
import { Card, CardHeader, CardText, CardBody } from "reactstrap";
import LoadingChatCard from "../Loading/LoadingChatCard";
import ProfileHead from "../Profile/ProfileHead";

const ChatCard = ({ chatData }) => {
  const { userData } = useContext(UserContext);

  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  const [chatMessage, setChatMessage] = useState();
  const [chatSenderData, setChatSenderData] = useState();

  // subscribe to latest chat message
  useEffect(() => {
    if (chatData) {
      const { cid } = chatData;
      const chatRef = firestore().collection("chat").doc(cid);
      const unsubscribeChatMessage = chatRef
        .collection("messages")
        .orderBy("created_at")
        .limitToLast(1)
        .onSnapshot((snap) =>
          snap.forEach((doc) => setChatMessage(doc.data()))
        );
      return () => {
        unsubscribeChatMessage();
      };
    }
  }, [chatData]);

  // given latest message, subscribe to sender username
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

  // (for private chat) get participant list to determine chat name
  useEffect(() => {
    if (userData && chatData && chatData.type === "private") {
      const { cid } = chatData;
      const chatDataRef = firestore().collection("chat").doc(cid);
      const chatParticipantsRef = chatDataRef.collection("participants");
      chatParticipantsRef.get().then((snap) => {
        let tmp = [];
        snap.forEach((doc) => {
          tmp.push(doc.data());
        });
        setChatParticipants(tmp);
      });
    }
  }, [userData, chatData]);

  // (for private chat) get data of participants
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

  if (
    !chatData ||
    (chatMessage && !chatSenderData) ||
    (chatData.type === "private" && !chatParticipantData)
  ) {
    return <LoadingChatCard />;
  } else {
    const { icon, cid } = chatData;
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
