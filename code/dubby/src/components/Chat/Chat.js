import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Redirect, Link } from "react-router-dom";
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
  Jumbotron,
  Collapse,
  InputGroup,
  InputGroupAddon,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import UserList from "../Friend/UserList";
import ProfileHead from "../Profile/ProfileHead";
import {
  sendChatMessage,
  addParticipantToChat,
} from "../../utilityfunctions/Utilities";

export const Chat = () => {
  const { cid } = useParams();

  const { theme } = useContext(ThemeContext);
  const { userData } = useContext(UserContext);
  const { friendListData } = useContext(FriendContext);

  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  const [chatAuthorized, setChatAuthorized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFriendData, setSelectedFriendData] = useState([]);

  const divRef = useRef(null);

  const handleCollapseToggle = () => setCollapseOpen(!collapseOpen);
  const handleModalToggle = () => setModalOpen(!modalOpen);

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

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendChatMessage({ cid, inputMessage, chatParticipants });
    setInputMessage("");
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleAddFriendToChat = (e) => {
    e.preventDefault();
    for (const uid of selectedFriendData) {
      addParticipantToChat({ cid, uid });
    }
    setSelectedFriendData([]);
  };

  const handleSelectFriend = ({ targetUid }) => {
    if (targetUid && friendListData) {
      let tmp = selectedFriendData;
      tmp.push(targetUid);
      tmp = tmp.filter((uid, index, a) => a.indexOf(uid) === index);
      setSelectedFriendData(tmp);
    }
  };

  const handleDeselectFriend = ({ targetUid }) => {
    if (targetUid && selectedFriendData) {
      let tmp = selectedFriendData;
      tmp = tmp.filter((uid) => uid !== targetUid);
      setSelectedFriendData(tmp);
    }
  };

  // render
  if (!chatData || !chatMessages || !chatParticipantData || !friendListData) {
    return <Loading />;
  } else if (chatParticipants && !chatAuthorized) {
    return <Redirect to="/c" />;
  } else {
    const { type, icon, eid } = chatData;
    const title =
      type === "private"
        ? chatParticipantData.find((p) => p.uid !== userData.uid).username
        : chatData.title;
    return (
      <div style={theme.background}>
        <Navbar />
        <Jumbotron style={theme.jumbotron}>
          {type === "private" && (
            <Badge pill color="success">
              <i className={icon}></i> Private
            </Badge>
          )}
          {type === "group" && (
            <Badge pill color="info">
              <i className={icon}></i> Group
            </Badge>
          )}
          {type === "event" && (
            <Badge pill color="warning">
              <i className={icon}></i> Event
            </Badge>
          )}
          <h1>
            {title}
            {type === "event" && (
              <Button close tag={Link} to={`/e/${eid}`}>
                <i className="fas fa-info-circle"></i>
              </Button>
            )}
          </h1>
          <ButtonGroup>
            {type !== "private" && (
              <Button size="sm" color="success" onClick={handleCollapseToggle}>
                Participants
              </Button>
            )}
            {type === "group" && (
              <Button size="sm" onClick={handleModalToggle}>
                Invite Friends
              </Button>
            )}
          </ButtonGroup>
          <Collapse isOpen={collapseOpen}>
            <UserList users={chatParticipantData} />
          </Collapse>
        </Jumbotron>

        {/* modal to invite friends */}
        <Modal
          returnFocusAfterClose={false}
          isOpen={modalOpen}
          toggle={handleModalToggle}
        >
          <Form onSubmit={handleAddFriendToChat}>
            <ModalHeader toggle={handleModalToggle}>Invite Friends</ModalHeader>
            <ModalBody>
              <UserList
                users={friendListData.filter(
                  ({ uid }) => selectedFriendData.indexOf(uid) > -1
                )}
                heading="Participants"
                action={handleDeselectFriend}
                actionIcon="fas fa-minus"
                actionColor="warning"
              />
              <hr />
              <UserList
                users={friendListData.filter(
                  ({ uid }) => selectedFriendData.indexOf(uid) < 0
                )}
                heading="Add Users"
                action={handleSelectFriend}
                actionIcon="fas fa-plus"
                actionColor="primary"
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={handleModalToggle}>
                Done
              </Button>{" "}
              <Button color="danger" outline onClick={handleModalToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

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
        <div ref={divRef} />
      </div>
    );
  }
};

const containerStyle = { margin: "40px", display: "grid", columnGap: "20px" };

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
