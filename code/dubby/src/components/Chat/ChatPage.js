import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import ChatShort from "./ChatShort";
import { UserContext } from "../../contexts/UserContext";

const ChatPage = () => {
  const [chatList, setChatList] = useState();
  const { userIsLoggedin, userLoading } = useContext(UserContext);

  useEffect(() => {
    if (userIsLoggedin) {
      const { uid } = auth().currentUser;
      const unsubscribeChatList = firestore()
        .collection("user_profile")
        .doc(uid)
        .collection("chats")
        .onSnapshot(snap => {
          let tmp = [];
          snap.forEach(doc => tmp.push(doc.data()));
          setChatList(tmp);
        });
      return () => {
        unsubscribeChatList();
      };
    }
  }, [userIsLoggedin, chatList]);

  if (userLoading || !chatList) {
    return (
      <div className="main-container">
        <header>
          <h1>loading...</h1>
        </header>
      </div>
    );
  } else if (userIsLoggedin) {
    return (
      <div className="main-container">
        <header>
          <h1>Chats</h1>
        </header>
        {chatList && chatList.length > 0 && (
          <ul>
            {chatList.map(chat => (
              <ChatShort key={chat.cid} cid={chat.cid} />
            ))}
          </ul>
        )}
        <Link to="/c/test">
          (dev) link to test chat. click add yourself in it as well.
        </Link>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default ChatPage;
