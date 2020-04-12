import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { Jumbotron, ButtonDropdown,  DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import ChatCard from "./ChatCard";

const ChatPage = () => {
  const { userData, userLoading } = useContext(UserContext);
  const [dropdownOpen, setOpen] = useState(false);
  const [chatList, setChatList] = useState();
  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    if (userData) {
      const { uid } = auth().currentUser;
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
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              New Chat
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Private chat</DropdownItem>
              <DropdownItem>Group chat</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Jumbotron>
        {chatList &&
          chatList.length > 0 &&
          chatList.map((chat) => <ChatCard key={chat.cid} cid={chat.cid} />)}
      </div>
    );
  }
};

export default ChatPage;
