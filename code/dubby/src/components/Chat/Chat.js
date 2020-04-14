import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Jumbotron,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import { sendChatMessage } from "../../utilityfunctions/Utilities";
import ProfileHead from "../Profile/ProfileHead";

export const Chat = () => {
  const { cid } = useParams();

  const { userData, userLoading } = useContext(UserContext);

  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  const [chatAuthorized, setChatAuthorized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (chatAuthorized) {
      const chatDataRef = firestore().collection("chat").doc(cid);
      const chatMessagesRef = chatDataRef.collection("messages");
      const unsubscribeChatData = chatDataRef.onSnapshot((snap) => {
        setChatData(snap.data());
      });
      const unsubscribeChatMessages = chatMessagesRef
        .orderBy("created_at", "asc")
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setChatMessages(tmp);
        });
      return () => {
        unsubscribeChatData();
        unsubscribeChatMessages();
      };
    }
  }, [chatAuthorized, cid]);

  useEffect(() => {
    if (userData) {
      const chatDataRef = firestore().collection("chat").doc(cid);
      const chatParticipantsRef = chatDataRef.collection("participants");
      const unsubscribeChatParticipants = chatParticipantsRef.onSnapshot(
        (snap) => {
          let tmp = [];
          snap.forEach((doc) => {
            tmp.push(doc.data());
            if (userData.uid === doc.data().uid) {
              setChatAuthorized(true);
            }
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendChatMessage({ cid, inputMessage, chatParticipants });
    setInputMessage("");
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (chatParticipants && !chatAuthorized) {
    return <Redirect to="/c" />;
  } else if (!chatData || !chatMessages || !chatParticipantData) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <Jumbotron>
          <h1>
            <i className={chatData.icon}></i> {chatData.title}
          </h1>
        </Jumbotron>
        <Container>
          <Row>
            {/* <Col sm="4">
              <h3>Participants</h3>
              <ul>
              {chatParticipants &&
                chatParticipants.map(p => (
                  <li key={p.uid}>
                    {p.username} [uid: {p.uid}]
                  </li>
                ))}
            </ul>
            </Col> */}
            <Col sm={12}>
              <ul>
                {chatMessages &&
                  chatMessages.length > 0 &&
                  chatMessages.map((message) => (
                    <Message
                      key={message.created_at}
                      message={message}
                      senderData={chatParticipantData.find(
                        ({ uid }) => uid === message.sender.uid
                      )}
                    />
                  ))}
              </ul>
              <Form onSubmit={handleSendMessage}>
                <FormGroup row>
                  <Col sm={10}>
                    <Input
                      id="message"
                      placeholder="message"
                      value={inputMessage}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button type="submit">
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

const messageStyle = {
  left: {
    container: { margin: "40px", textAlign: "left" },
    bubbleClassName: "chat-bubble left",
    textClassName: "chat-text-left",
  },
  right: {
    container: { margin: "40px", textAlign: "right" },
    bubbleClassName: "chat-bubble right",
    textClassName: "chat-text-right",
  },
};

const Message = ({ senderData, message }) => {
  const { userData } = useContext(UserContext);

  const { username } = senderData;
  const { created_at, text, sender } = message;
  const { profileImageSrc } = senderData;
  const time = new Date(created_at).toLocaleTimeString();

  console.log({ senderData });

  const style =
    userData.uid === sender.uid ? messageStyle.right : messageStyle.left;

  return (
    <div style={style.container}>
      <ProfileHead src={profileImageSrc} size="chat" />
      <p>{username}</p>
      <div className={style.bubbleClassName}>
        <div className={style.textClassName}>
          <p>{text}</p>
        </div>
      </div>
      <p>{time}</p>
    </div>
  );
};

export default Chat;
