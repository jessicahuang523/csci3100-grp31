import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { FriendContext } from "../../contexts/FriendContext";
import { UserContext } from "../../contexts/UserContext";
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

const ChatPage = () => {
  const { userData, userLoading } = useContext(UserContext);
  const { friendListData } = useContext(FriendContext);

  const [chatList, setChatList] = useState();
  const [privateModalOpen, setPrivateModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [selectedFriendData, setSelectedFriendData] = useState([]);

  useEffect(() => {
    if (userData) {
      const { uid } = userData;
      const unsubscribeChatList = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("chats")
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setChatList(tmp);
        });
      return () => {
        unsubscribeChatList();
      };
    }
  }, [userData]);

  const handlePrivateModalToggle = () => setPrivateModalOpen(!privateModalOpen);
  const handleGroupModalToggle = () => setGroupModalOpen(!groupModalOpen);

  const handlePrivateSelectFriend = ({ targetUid }) => {
    if (targetUid && friendListData) {
      const friend = friendListData.find(({ uid }) => uid === targetUid);
      console.log({ friend });
      // TODO: create new chat and redirect to chat page
    }
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

  if (userLoading || !chatList || !friendListData) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else {
    return (
      <div>
        <Navbar />
        <Jumbotron>
          <h1>Chats</h1>
          <hr />
          <ButtonGroup>
            <Button color="primary" onClick={handlePrivateModalToggle}>
              New Private Chat
            </Button>
            <Button color="info" onClick={handleGroupModalToggle}>
              New Group Chat
            </Button>
          </ButtonGroup>

          <Modal isOpen={privateModalOpen} toggle={handlePrivateModalToggle}>
            <Form>
              <ModalHeader toggle={handlePrivateModalToggle}>
                Private Chat
              </ModalHeader>
              <ModalBody>
                <UserList
                  users={friendListData}
                  heading="To..."
                  action={handlePrivateSelectFriend}
                  actionIcon="fas fa-comment-dots"
                  actionColor="primary"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={handlePrivateModalToggle}>
                  Done
                </Button>
              </ModalFooter>
            </Form>
          </Modal>

          <Modal isOpen={groupModalOpen} toggle={handleGroupModalToggle}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: create group chat and redirect to chat page
              }}
            >
              <ModalHeader toggle={handleGroupModalToggle}>
                Group Chat
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <h4>Group name:</h4>
                  <Input required type="text" id="groupChatName" />
                </FormGroup>
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
                <Button type="submit" color="primary">
                  <i className="fas fa-comment-dots"></i> Create Chat!
                </Button>{" "}
                <Button color="secondary" onClick={handleGroupModalToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Jumbotron>

        <div style={{ padding: "1rem" }}>
          {chatList &&
            chatList.length > 0 &&
            chatList.map((chat) => <ChatCard key={chat.cid} cid={chat.cid} />)}
        </div>
      </div>
    );
  }
};

export default ChatPage;
