import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import Participants from "./Participants";
import ProfileHead from "../Profile/ProfileHead";
import { sendChatMessage } from "../../utilityfunctions/Utilities";

export const Chat = () => {
  const { cid } = useParams();

  const { theme } = useContext(ThemeContext);
  const { userData } = useContext(UserContext);
  const { friendListData } = useContext(FriendContext);

  // data for chat from database
  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  // redirects to /c if not authorized (uid not in chatParticipants)
  const [chatAuthorized, setChatAuthorized] = useState(false);
  // new message input string
  const [inputMessage, setInputMessage] = useState("");

  // ref to bottom for auto scrolling
  const divRef = useRef(null);

  // loads participants and determines if user is authorized
  // if not authorized, will redirect to /c
  // updates chatParticipants and chatAuthorized
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

  // loads data for chat if authorized
  // updates chatData and chatMessages
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

  // fetches data for participants from database in chat given list of users
  // updates chatParticipantData
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

  // scroll to bottom automatically
  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // writes new message to database
  // updates inputMessage (clears it)
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendChatMessage({ cid, inputMessage, chatParticipants });
    setInputMessage("");
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // render
  if (!chatParticipants) {
    return <Loading />;
  } else if (!chatAuthorized) {
    return <Redirect to="/c" />;
  } else if (
    !chatData ||
    !chatMessages ||
    !chatParticipantData ||
    !friendListData
  ) {
    return <Loading />;
  } else {
    return (
      <div style={theme.background}>
        <Navbar />
        <Participants
          chatParticipantData={chatParticipantData}
          chatData={chatData}
        />
        <Container style={{ marginBottom: "1rem" }}>
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
        <div ref={divRef} />
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

// displays individual chat message
const Message = ({ senderData, message }) => {
  const { userData } = useContext(UserContext);

  const { username } = senderData;
  const { created_at, text, sender } = message;
  const { profileImageSrc } = senderData;
  const time = new Date(created_at);
  const displayTime =
    time.toLocaleDateString() === new Date(Date.now()).toLocaleDateString()
      ? time.toLocaleTimeString()
      : time.toLocaleDateString();

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
        <p>{displayTime}</p>
      </div>
      {userData.uid === sender.uid && (
        <ProfileHead src={profileImageSrc} size="chat" />
      )}
    </li>
  );
};

export default Chat;
