import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import { UserContext } from "../contexts/UserContext";
import { devSetupChat, devAddToChat } from "../devutil";

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

const ChatShort = ({ cid }) => {
  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  useEffect(() => {
    const chatRef = firestore()
      .collection("chat")
      .doc(cid);
    const unsubscribeChatData = chatRef.onSnapshot(snap =>
      setChatData(snap.data())
    );
    const unsubscribeChatMessages = chatRef
      .collection("messages")
      .orderBy("created_at")
      .limitToLast(1)
      .onSnapshot(snap => snap.forEach(doc => setChatMessages(doc.data())));
    return () => {
      unsubscribeChatData();
      unsubscribeChatMessages();
    };
  }, [cid]);

  if (chatData && chatMessages) {
    return (
      <li className="chat-short-container">
        <Link to={`/c/${cid}`}>
          <span className="chat-short-icon">
            <i className={chatData.icon}></i>
          </span>
          <span className="chat-short-detail">
            <div>
              <b>{chatData.title}</b>
              <p>{`${chatMessages.sender.username}: ${chatMessages.text}`}</p>
            </div>
          </span>
        </Link>
      </li>
    );
  } else {
    return null;
  }
};

export const Chat = () => {
  const { cid } = useParams();

  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const chatDataRef = firestore()
      .collection("chat")
      .doc(cid);
    const chatMessagesRef = chatDataRef.collection("messages");
    const chatParticipantsRef = chatDataRef.collection("participants");

    const unsubscribeChatData = chatDataRef.onSnapshot(snap => {
      setChatData(snap.data());
    });
    const unsubscribeChatMessages = chatMessagesRef
      .orderBy("created_at", "asc")
      .onSnapshot(snap => {
        let tmp = [];
        snap.forEach(doc => tmp.push(doc.data()));
        setChatMessages(tmp);
      });
    const unsubscribeChatParticipants = chatParticipantsRef.onSnapshot(snap => {
      let tmp = [];
      snap.forEach(doc => tmp.push(doc.data()));
      setChatParticipants(tmp);
    });

    return () => {
      unsubscribeChatData();
      unsubscribeChatMessages();
      unsubscribeChatParticipants();
    };
  }, [cid]);

  const handleMessageRequest = text => {
    if (text.length > 0) {
      const { uid } = auth().currentUser;
      const storedUserData = chatParticipants.find(p => p.uid === uid);
      if (storedUserData) {
        const { username } = storedUserData;
        const toSend = {
          text: text.trim(),
          created_at: Date.now(),
          sender: { username, uid }
        };

        firestore()
          .collection("chat")
          .doc(cid)
          .collection("messages")
          .add(toSend);
      }
    }
  };

  if (chatData && chatMessages) {
    return (
      <div className="main-container">
        <h3>chat id: {cid}</h3>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => devAddToChat(cid, auth().currentUser.uid)}
        >
          <i>(dev) click to add self to chat</i>
        </p>

        <h3>chatParticipants</h3>
        <ul>
          {chatParticipants &&
            chatParticipants.map(p => (
              <li key={p.uid}>
                {p.username} [uid: {p.uid}]
              </li>
            ))}
        </ul>

        <h3>chatMessages</h3>
        <ul>
          {chatMessages &&
            chatMessages.length > 0 &&
            chatMessages.map(message => (
              <li key={message.created_at}>
                [{new Date(message.created_at).toLocaleTimeString()}]{" "}
                {message.sender.username}: {message.text}
              </li>
            ))}
          {chatMessages && chatMessages.length === 0 && (
            <li>Wow, such empty</li>
          )}
        </ul>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleMessageRequest(inputMessage);
            setInputMessage("");
          }}
        >
          <label>Message</label>
          <input
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <h3>chat id: {cid}</h3>
        <h3>Loading... (or this chat doesn't exist)</h3>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            devSetupChat(cid);
            devAddToChat(cid, auth().currentUser.uid);
          }}
        >
          <i>(dev) click to setup this chat</i>
        </p>
      </div>
    );
  }
};

export default ChatPage;
