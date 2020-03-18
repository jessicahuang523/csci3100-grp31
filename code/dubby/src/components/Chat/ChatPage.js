import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import ChatShort from "./ChatShort";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "../Navbar";
import { Layout } from "react-mdl";

const ChatPage = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [chatList, setChatList] = useState();

  useEffect(() => {
    if (userData) {
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
  }, [userData]);

  if (userLoading || !chatList) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="main-container">
          <Layout>
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
          </Layout>
        </div>
      </div>
    );
  }
};

export default ChatPage;
