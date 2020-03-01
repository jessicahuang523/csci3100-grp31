import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { cid } = useParams();

  const { chatLoaded, chatParticipants, chatConversation } = useContext(
    ChatContext
  );

  return (
    chatLoaded && (
      <div>
        <ul>
          {chatParticipants.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
        <ul>
          {chatConversation.map(c => (
            <li key={c.created_at}>
              <p>{c.sender}</p>
              {c.text && <p>{c.text}</p>}
              {c.media && <img src={c.media} alt="chat img" />}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Chat;
