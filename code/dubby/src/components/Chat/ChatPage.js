import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import { FriendContext } from "../../contexts/FriendContext";
import { UserContext } from "../../contexts/UserContext";
import {
  Jumbotron,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import ChatCard from "./ChatCard";
import ProfileHead from "../Profile/ProfileHead";

const ChatPage = () => {
  const { userData, userLoading } = useContext(UserContext);
  const { friendListData } = useContext(FriendContext);
  const [chatList, setChatList] = useState();
  const [dropdownOpen, setOpen] = useState(false);
  const [modal_private, setModalP] = useState(false);
  const [modal_group, setModalG] = useState(false);
  const toggle_dropdown = () => setOpen(!dropdownOpen);
  const toggle_modal_private = () => setModalP(!modal_private);
  const toggle_modal_group = () => setModalG(!modal_group);

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

  if (userLoading || !chatList) {
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
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle_dropdown}>
            <DropdownToggle caret>New Chat</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggle_modal_private}>
                Private chat
              </DropdownItem>
              <DropdownItem onClick={toggle_modal_group}>
                Group chat
              </DropdownItem>
            </DropdownMenu>
            <Modal isOpen={modal_private} toggle={toggle_modal_private}>
              <ModalHeader toggle={toggle_modal_private}>
                Private Chat
              </ModalHeader>
              <ModalBody>
                <h4>To:</h4>
                <FriendList list={friendListData} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle_modal_private}>
                  Done
                </Button>{" "}
                <Button color="secondary" onClick={toggle_modal_private}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={modal_group} toggle={toggle_modal_group}>
              <ModalHeader toggle={toggle_modal_group}>Group Chat</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <h4>Group name:</h4>
                    <Input type="text" id="groupChatName" />
                  </FormGroup>
                </Form>
                <h4>Participants:</h4>
                <FriendList list={friendListData} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle_modal_group}>
                  Done
                </Button>{" "}
                <Button color="secondary" onClick={toggle_modal_group}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ButtonDropdown>
        </Jumbotron>
        {chatList &&
          chatList.length > 0 &&
          chatList.map((chat) => <ChatCard key={chat.cid} cid={chat.cid} />)}
      </div>
    );
  }
};

const FriendList = ({ list }) => {
  return (
    <Form>
      {list && list.length > 0 ? (
        list.map(({ username }) => (
          <div style={{ margin: "10px" }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> {username}
              </Label>
            </FormGroup>
          </div>
        ))
      ) : (
        <p>you have no friend</p>
      )}
    </Form>
  );
};

export default ChatPage;
