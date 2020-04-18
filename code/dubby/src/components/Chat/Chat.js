import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Redirect, Link } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
  Jumbotron,
  Collapse,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import UserList from "../Friend/UserList";
import ProfileHead from "../Profile/ProfileHead";
import { sendChatMessage } from "../../utilityfunctions/Utilities";

export const Chat = () => {
  const { cid } = useParams();

  const { theme } = useContext(ThemeContext);
  const { userData, userLoading } = useContext(UserContext);

  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  const [chatAuthorized, setChatAuthorized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //const divRef = useRef(null);

  const toggle = () => setIsOpen(!isOpen);

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

  /*const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });*/

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
      <div style={theme.background}>
        <Navbar />
        <Jumbotron style={theme.jumbotron}>
          <h1>
            <i className={chatData.icon}></i>
            {chatData.title}{" "}
            {chatData.type === "event" && (
              <Button close="close" tag={Link} to={`/e/${chatData.eid}`}>
                <i className="fas fa-info-circle"></i>
              </Button>
            )}
          </h1>
          <hr />
          <Button size="sm" color="success" onClick={toggle}>
            Participants
          </Button>
          <Collapse isOpen={isOpen}>
            <UserList users={chatParticipantData} />
          </Collapse>
        </Jumbotron>
        <Container>
          <Row>
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
                <InputGroup>
                  <Input
                    id="message"
                    placeholder="message"
                    value={inputMessage}
                    onChange={handleInputChange}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="primary" type="submit">
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        {/* <div ref={divRef} /> */}
      </div>
    );
  }
};

const containerStyle = {
  margin: "40px",
  display: "grid",
  columnGap: "20px",
};

const messageStyle = {
  left: {
    container: {
      ...containerStyle,
      textAlign: "left",
      gridTemplateColumns: "70px 1fr",
    },
    bubbleClassName: "chat-bubble left",
    textClassName: "chat-text-left",
  },
  right: {
    container: {
      ...containerStyle,
      textAlign: "right",
      gridTemplateColumns: "1fr 70px",
    },
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

  const style =
    userData.uid === sender.uid ? messageStyle.right : messageStyle.left;

  return (
    <li style={style.container}>
      {userData.uid === sender.uid || (
        <ProfileHead src={profileImageSrc} size="chat" />
      )}
      <div className={style.bubbleClassName}>
        <p>{username}</p>
        <div className={style.textClassName}>
          <p>{text}</p>
        </div>
        <p>{time}</p>
      </div>
      {userData.uid === sender.uid && (
        <ProfileHead src={profileImageSrc} size="chat" />
      )}
    </li>
  );
};

export default Chat;
