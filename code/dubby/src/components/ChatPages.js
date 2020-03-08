import React from "react";

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

export default ChatPage;
