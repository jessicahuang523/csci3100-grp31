import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore, auth } from "firebase";

const ChatPage = () => {
  return (
    <div className="main-container">
      <header>
        <h1>Chats</h1>
      </header>
      <ul>
        <ChatShort
          chat={{
            icon: "fa-basketball-ball",
            title: "2020/02/02 20:20 at SC",
            messages: [
              { sender: "none", message: "not displayed" },
              {
                sender: "none",
                message: "second last message also not displayed"
              },
              { sender: "Tom", message: "Where are you?" }
            ]
          }}
        />
        <ChatShort
          chat={{
            icon: "fa-user",
            title: "Tim",
            messages: [{ sender: "You", message: "..." }]
          }}
        />
        <ChatShort
          chat={{
            icon: "fa-users",
            title: "Tennis Group (6)",
            messages: [{ sender: "Tom", message: "..." }]
          }}
        />
      </ul>
    </div>
  );
};

const ChatShort = ({ chat }) => {
  const { icon, title, messages } = chat;
  return (
    <li className="chat-short-container">
      <span className="chat-short-icon">
        <i className={`fas ${icon}`}></i>
      </span>
      <span className="chat-short-detail">
        <div>
          <b>{title}</b>
          <p>{`${messages[messages.length - 1].sender}: ${
            messages[messages.length - 1].message
          }`}</p>
        </div>
      </span>
    </li>
  );
};

export const Chat = () => {
  const { cid } = useParams();

  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const chatData = firestore()
      .collection("chat")
      .doc(cid);
    const chatMessages = chatData.collection("messages");

    const unsubscribeChatData = chatData.onSnapshot(snap => {
      setChatData(snap.data());
    });
    const unsubscribeChatMessages = chatMessages
      .orderBy("created_at", "asc")
      .onSnapshot(snap => {
        const tmp = [];
        snap.forEach(doc => tmp.push(doc.data()));
        setChatMessages(tmp);
      });

    return () => {
      unsubscribeChatData();
      unsubscribeChatMessages();
    };
  }, [cid]);

  const handleMessageRequest = text => {
    if (text.length > 0) {
      const uid = auth().currentUser.uid;
      const username = "Anonymous User"; // change this after profile is set up
      const toSend = {
        text,
        created_at: Date.now(),
        sender: { username, uid }
      };

      firestore()
        .collection("chat")
        .doc(cid)
        .collection("messages")
        .add(toSend);
    }
  };

  if (chatData && chatMessages) {
    return (
      <div className="main-container">
        <h3>chat id: {cid}</h3>

        <h3>chatData (participants)</h3>
        <ul>
          {chatData &&
            chatData.participants.map(p => (
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
      </div>
    );
  }
};

export default ChatPage;
