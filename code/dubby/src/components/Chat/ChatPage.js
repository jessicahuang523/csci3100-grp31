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

  const [chatList, setChatList] = useState();
  const [chatListData, setChatListData] = useState();
  const [privateModalOpen, setPrivateModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [selectedFriendData, setSelectedFriendData] = useState([]);
  const [chatName, setChatName] = useState();
  const [chatCreatedCid, setChatCreatedCid] = useState();
  const [createChatPrompt, setCreateChatPrompt] = useState(" Create Chat!");

  useEffect(() => {
    if (userData) {
      const { uid } = userData;
      const unsubscribeChatList = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("chats")
        .orderBy("title")
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

  useEffect(() => {
    const getData = async () => {
      let tmp = [];
      await Promise.all(
        chatList.map(async ({ cid }) => {
          const chatData = await firestore().collection("chat").doc(cid).get();
          tmp.push(chatData.data());
        })
      );
      tmp = tmp.sort((a, b) =>
        a.lastModified
          ? b.lastModified
            ? a.lastModified - b.lastModified
            : 1
          : b.lastModified
          ? 1
          : 0
      );
      setChatListData(tmp);
    };
    if (chatList) {
      getData();
    }
  }, [chatList]);

  const handlePrivateModalToggle = () => setPrivateModalOpen(!privateModalOpen);
  const handleGroupModalToggle = () => setGroupModalOpen(!groupModalOpen);

  const handlePrivateSelectFriend = async ({ targetUid }) => {
    if (targetUid) {
      console.log({ targetUid });
      const { cid } = await setupFirestoreForNewPrivateChat({ targetUid });
      setChatCreatedCid(cid);
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
          </Modal>

          <Modal isOpen={groupModalOpen} toggle={handleGroupModalToggle}>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                // TODO: create group chat and redirect to chat page
                if (selectedFriendData && chatName) {
                  setCreateChatPrompt(" Creating...");
                  const users = [
                    userData,
                    ...selectedFriendData.map((d) => ({ uid: d })),
                  ];
                  const { cid } = await setupFirestoreForNewGroupChat({
                    users,
                    chatName,
                  });
                  setChatCreatedCid(cid);
                }
              }}
            >
              <ModalHeader toggle={handleGroupModalToggle}>
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
                  <i className="fas fa-comment-dots"></i>
                  {createChatPrompt}
                </Button>{" "}
                <Button color="danger" outline onClick={handleGroupModalToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Jumbotron>

        <div style={{ padding: "1rem" }}>
          {chatListData &&
            chatListData.length > 0 &&
            chatListData.map(({ cid }) => <ChatCard key={cid} cid={cid} />)}
        </div>
      </div>
    );
  }
};

export default ChatPage;
