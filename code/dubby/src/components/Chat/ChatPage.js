import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import {
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  ButtonGroup,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import ChatCard from "./ChatCard";
import UserList from "../Friend/UserList";
import {
  setupFirestoreForNewGroupChat,
  setupFirestoreForNewPrivateChat,
} from "../../utilityfunctions/Utilities";

const ChatPage = () => {
  const { theme } = useContext(ThemeContext);
  const { friendListData } = useContext(FriendContext);
  const { userData, userLoading } = useContext(UserContext);

  const [chatListData, setChatListData] = useState();
  // modal open data for chat creation
  const [privateModalOpen, setPrivateModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [creatingOpen, setCreatingOpen] = useState(false);
  // select friends when creating group chat
  const [selectedFriendData, setSelectedFriendData] = useState([]);
  // chat name for group chat
  const [chatName, setChatName] = useState();
  // chat id for redirection when created new chat
  const [chatCreatedCid, setChatCreatedCid] = useState();
  // confirm button text for creating group chat
  const [createChatPrompt, setCreateChatPrompt] = useState(" Create Chat!");

  // given userData, subscribe to data of chats user has
  // updates chatListData
  useEffect(() => {
    if (userData) {
      const { uid } = userData;
      const unsubscribeChatListData = firestore()
        .collection("chat")
        .where("participants", "array-contains", uid)
        .orderBy("lastModified", "desc")
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setChatListData(tmp);
        });
      return () => {
        unsubscribeChatListData();
      };
    }
  }, [userData]);

  // toggles for chat creation modals
  const togglePrivateModalOpen = () => setPrivateModalOpen(!privateModalOpen);
  const toggleGroupModalOpen = () => setGroupModalOpen(!groupModalOpen);
  const toggleCreatingOpen = () => setCreatingOpen(!creatingOpen);

  const handlePrivateCreateChat = async ({ targetUid }) => {
    if (targetUid) {
      toggleCreatingOpen();
      const { cid } = await setupFirestoreForNewPrivateChat({ targetUid });
      toggleCreatingOpen();
      setChatCreatedCid(cid);
    }
  };

  const handleGroupCreateChat = async (e) => {
    e.preventDefault();
    if (selectedFriendData && chatName) {
      setCreateChatPrompt(" Creating...");
      toggleCreatingOpen();
      const users = [userData, ...selectedFriendData.map((d) => ({ uid: d }))];
      const { cid } = await setupFirestoreForNewGroupChat({ users, chatName });
      toggleCreatingOpen();
      setChatCreatedCid(cid);
    }
  };

  // add friend to selectedFriendData and removes duplicate
  const handleGroupSelectFriend = ({ targetUid }) => {
    if (targetUid && friendListData) {
      let tmp = selectedFriendData;
      tmp.push(targetUid);
      tmp = tmp.filter((uid, index, a) => a.indexOf(uid) === index);
      setSelectedFriendData(tmp);
    }
  };

  // remove friend from selectedFriendData and removes duplicate
  const handleGroupDeselectFriend = ({ targetUid }) => {
    if (targetUid && selectedFriendData) {
      let tmp = selectedFriendData;
      tmp = tmp.filter((uid) => uid !== targetUid);
      setSelectedFriendData(tmp);
    }
  };

  // render
  if (userLoading || !chatListData || !friendListData) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (chatCreatedCid) {
    return <Redirect to={`/c/${chatCreatedCid}`} />;
  } else {
    return (
      <div style={theme.background}>
        <Navbar />
        <Jumbotron style={theme.jumbotron}>
          <h1>Chats</h1>
          {/* <button
            onClick={(e) => {
              console.log("begin delete");
              firestore()
                .collection("user_profile")
                .where("username", "==", "Lil Potato")
                .get()
                .then((s) => s.forEach((d) => d.ref.delete()))
                .then(() => console.log("delete complete"));
            }}
          >
            delete empty user
          </button> */}

          {/* top chat creation buttons */}
          <ButtonGroup size="sm">
            <Button color="success" onClick={togglePrivateModalOpen}>
              <i className="fas fa-plus"></i> Private Chat
            </Button>
            <Button color="info" onClick={toggleGroupModalOpen}>
              <i className="fas fa-plus"></i> Group Chat
            </Button>
          </ButtonGroup>

          {/* modal for creating private chat */}
          <Modal
            returnFocusAfterClose={false}
            isOpen={privateModalOpen}
            toggle={togglePrivateModalOpen}
          >
            <ModalHeader toggle={togglePrivateModalOpen}>
              Private Chat
            </ModalHeader>
            <ModalBody>
              <UserList
                users={friendListData}
                heading="Click to chat"
                action={handlePrivateCreateChat}
                actionIcon="fas fa-comment-dots"
                actionColor="primary"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={togglePrivateModalOpen}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* modal when chat is being created so users won't click on other things */}
          <Modal
            returnFocusAfterClose={false}
            isOpen={creatingOpen}
            fade={false}
          >
            <ModalBody>Creating...</ModalBody>
          </Modal>

          {/* modal for creating group chat */}
          <Modal
            returnFocusAfterClose={false}
            isOpen={groupModalOpen}
            toggle={toggleGroupModalOpen}
          >
            <Form onSubmit={handleGroupCreateChat}>
              <ModalHeader toggle={toggleGroupModalOpen}>
                Group Chat
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <h4>Group name:</h4>
                  <Input
                    required="required"
                    type="text"
                    id="groupChatName"
                    onChange={(e) => setChatName(e.target.value)}
                  />
                </FormGroup>
                <UserList
                  users={friendListData.filter(
                    ({ uid }) => selectedFriendData.indexOf(uid) > -1
                  )}
                  heading="Participants"
                  action={handleGroupDeselectFriend}
                  actionIcon="fas fa-minus"
                  actionColor="warning"
                />
                <hr />
                <UserList
                  users={friendListData.filter(
                    ({ uid }) => selectedFriendData.indexOf(uid) < 0
                  )}
                  heading="Add Users"
                  action={handleGroupSelectFriend}
                  actionIcon="fas fa-plus"
                  actionColor="primary"
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  <i className="fas fa-comment-dots"></i>
                  {createChatPrompt}
                </Button>{" "}
                <Button color="danger" outline onClick={toggleGroupModalOpen}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Jumbotron>

        <div style={theme.mainContainer}>
          {chatListData.length > 0 &&
            chatListData.map((chatData) => (
              <ChatCard key={chatData.cid} chatData={chatData} />
            ))}
        </div>
      </div>
    );
  }
};

export default ChatPage;
