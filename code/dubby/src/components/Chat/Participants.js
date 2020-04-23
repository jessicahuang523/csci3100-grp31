import React, {useEffect, useState, useContext, useRef} from "react";
import {useParams, Redirect, Link} from "react-router-dom";
import {firestore} from "firebase";
import {UserContext} from "../../contexts/UserContext";
import {ThemeContext} from "../../contexts/ThemeContext";
import {FriendContext} from "../../contexts/FriendContext";
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
  Badge
} from "reactstrap";
import Loading from "../Loading/Loading";
import UserList from "../Friend/UserList";
import ProfileHead from "../Profile/ProfileHead";
import {sendChatMessage, addParticipantToChat} from "../../utilityfunctions/Utilities";

const Participants = () => {
  const {cid} = useParams();

  const {theme} = useContext(ThemeContext);
  const {userData} = useContext(UserContext);
  const {friendListData} = useContext(FriendContext);

  // data for chat from database
  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatParticipantData, setchatParticipantData] = useState();
  // redirects to /c if not authorized (uid not in chatParticipants)
  const [chatAuthorized, setChatAuthorized] = useState(false);
  // new message input string
  const [inputMessage, setInputMessage] = useState("");
  // invite modal
  const [modalOpen, setModalOpen] = useState(false);
  // participant list
  const [collapseOpen, setCollapseOpen] = useState(false);
  // (for group chat) array of uid of selected friends to invite to chat
  const [selectedFriendData, setSelectedFriendData] = useState([]);

  // ref to bottom for auto scrolling
  const divRef = useRef(null);

  const handleCollapseToggle = () => setCollapseOpen(!collapseOpen);
  const handleModalToggle = () => setModalOpen(!modalOpen);

  // loads participants and determines if user is authorized
  // if not authorized, will redirect to /c
  // updates chatParticipants and chatAuthorized
  useEffect(() => {
    if (userData) {
      const chatDataRef = firestore().collection("chat").doc(cid);
      const chatParticipantsRef = chatDataRef.collection("participants");
      const unsubscribeChatParticipants = chatParticipantsRef.onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((doc) => {
          tmp.push(doc.data());
          if (userData.uid === doc.data().uid) {
            setChatAuthorized(true);
          }
        });
        setChatParticipants(tmp);
      });
      return() => {
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
      const unsubscribeChatMessages = chatMessagesRef.orderBy("created_at", "asc").onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((doc) => tmp.push(doc.data()));
        setChatMessages(tmp);
      });
      return() => {
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
      chatParticipants.forEach(({uid}) => {
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
      divRef.current.scrollIntoView({behavior: "smooth"});
    }
  };

  // writes new message to database
  // updates inputMessage (clears it)
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendChatMessage({cid, inputMessage, chatParticipants});
    setInputMessage("");
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // (for group chat) adds list of uids to group chat
  // updates selectedFriendData (clears it)
  const handleAddFriendToChat = (e) => {
    e.preventDefault();
    for (const uid of selectedFriendData) {
      addParticipantToChat({cid, uid});
    }
    setSelectedFriendData([]);
  };

  // adds uid of selected friend to selectedFriendData
  // updates selectedFriendData
  const handleSelectFriend = ({targetUid}) => {
    if (targetUid && friendListData) {
      let tmp = selectedFriendData;
      tmp.push(targetUid);
      tmp = tmp.filter((uid, index, a) => a.indexOf(uid) === index);
      setSelectedFriendData(tmp);
    }
  };

  // removes uid of selected friend from selectedFriendData
  // updates selectedFriendData
  const handleDeselectFriend = ({targetUid}) => {
    if (targetUid && selectedFriendData) {
      let tmp = selectedFriendData;
      tmp = tmp.filter((uid) => uid !== targetUid);
      setSelectedFriendData(tmp);
    }
  };

  // render
  if (!chatParticipants) {
    return <Loading/>;
  } else if (!chatAuthorized) {
    return <Redirect to="/c"/>;
  } else if (!chatData || !chatMessages || !chatParticipantData || !friendListData) {
    return <Loading/>;
  } else {
    const {type, icon, eid} = chatData;
    const title = type === "private"
      ? chatParticipantData.find((p) => p.uid !== userData.uid).username
      : chatData.title;

    // render
    return (<div>
      <Jumbotron style={theme.jumbotron} expand="sm">
        {
          type === "private" && (<Badge pill="pill" color="success">
            <i className={icon}></i>
            Private
          </Badge>)
        }
        {
          type === "group" && (<Badge pill="pill" color="info">
            <i className={icon}></i>
            Group
          </Badge>)
        }
        {
          type === "event" && (<Badge pill="pill" color="warning">
            <i className={icon}></i>
            Event
          </Badge>)
        }
        <h1>
          {title}
          {
            type === "event" && (<Button close="close" tag={Link} to={`/e/${eid}`}>
              <i className="fas fa-info-circle"></i>
            </Button>)
          }
        </h1>
        <ButtonGroup>
          {
            type !== "private" && (<Button size="sm" color="success" onClick={handleCollapseToggle}>
              Participants
            </Button>)
          }
          {
            type === "group" && (<Button size="sm" onClick={handleModalToggle}>
              Invite Friends
            </Button>)
          }
        </ButtonGroup>
        <Collapse isOpen={collapseOpen}>
          <UserList users={chatParticipantData}/>
        </Collapse>
      </Jumbotron>
      <Modal returnFocusAfterClose={false} isOpen={modalOpen} toggle={handleModalToggle}>
        <Form onSubmit={handleAddFriendToChat}>
          <ModalHeader toggle={handleModalToggle}>Invite Friends</ModalHeader>
          <ModalBody>
            <UserList users={friendListData.filter(({uid}) => selectedFriendData.indexOf(uid) > -1)} heading="Participants" action={handleDeselectFriend} actionIcon="fas fa-minus" actionColor="warning"/>
            <hr/>
            <UserList users={friendListData.filter(({uid}) => selectedFriendData.indexOf(uid) < 0)} heading="Add Users" action={handleSelectFriend} actionIcon="fas fa-plus" actionColor="primary"/>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={handleModalToggle}>
              Done
            </Button>{" "}
            <Button color="danger" outline="outline" onClick={handleModalToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>);
  };
}
export default Participants;
