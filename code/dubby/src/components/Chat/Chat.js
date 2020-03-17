import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore, auth } from "firebase";

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
      </div>
    );
  }
};

export default Chat;
