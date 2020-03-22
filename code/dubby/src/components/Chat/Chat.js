import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { firestore, auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";

export const Chat = () => {
  const { cid } = useParams();

  const { userData, userLoading } = useContext(UserContext);

  const [chatData, setChatData] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [chatParticipants, setChatParticipants] = useState();
  const [chatAuthorized, setChatAuthorized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (chatAuthorized) {
      const chatDataRef = firestore()
        .collection("chat")
        .doc(cid);
      const chatMessagesRef = chatDataRef.collection("messages");
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
      return () => {
        unsubscribeChatData();
        unsubscribeChatMessages();
      };
    }
  }, [chatAuthorized, cid]);

  useEffect(() => {
    if (userData) {
      const chatDataRef = firestore()
        .collection("chat")
        .doc(cid);
      const chatParticipantsRef = chatDataRef.collection("participants");
      const unsubscribeChatParticipants = chatParticipantsRef.onSnapshot(
        snap => {
          let tmp = [];
          snap.forEach(doc => {
            tmp.push(doc.data());
            if (userData.uid === doc.data().uid) {
              setChatAuthorized(true);
            }
          });
          setChatParticipants(tmp);
        }
      );
      return () => {
        unsubscribeChatParticipants();
      };
    }
  }, [userData, cid]);

  const firebasePushMessage = text => {
    if (text.length > 0 && userData) {
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

  const handleSendMessage = e => {
    e.preventDefault();
    firebasePushMessage(inputMessage);
    setInputMessage("");
  };

  const handleInputChange = e => {
    setInputMessage(e.target.value);
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (chatParticipants && !chatAuthorized) {
    return <Redirect to="/c" />;
  } else if (!chatData || !chatMessages) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="main-container">
          <header>
            <h1>
              <i className={chatData.icon}></i> {chatData.title}
            </h1>
          </header>
          <h1>chatParticipants</h1>
          <ul>
            {chatParticipants &&
              chatParticipants.map(p => (
                <li key={p.uid}>
                  {p.username} [uid: {p.uid}]
                </li>
              ))}
          </ul>
          <h1>chatMessages</h1>
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
          <form onSubmit={handleSendMessage}>
            <label>Message</label>
            <input value={inputMessage} onChange={handleInputChange} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Chat;
