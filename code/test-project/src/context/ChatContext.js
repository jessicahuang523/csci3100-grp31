import React, { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const TestChatData = {
  participants: ["the3dsandwich", "sombody123"],
  conversation: [
    {
      sender: "sombody123",
      created_at: "2017-02-24T08:39:55.613886+00:00",
      text: "我要離開這個對話了太搞笑了"
    },
    {
      sender: "sombody123",
      created_at: "2017-02-24T08:39:25.396700+00:00",
      text: "掰掰"
    },
    {
      sender: "the3dsandwich",
      created_at: "2017-02-24T08:38:29.668808+00:00",
      text: "不懂"
    },
    {
      sender: "sombody123",
      created_at: "2017-02-24T08:38:01.435477+00:00",
      text: "多點了一個人吧"
    },
    {
      sender: "sombody123",
      created_at: "2017-02-24T08:37:55.658264+00:00",
      text: "唉你們兩個就當作我不小心"
    },
    {
      sender: "sombody123",
      created_at: "2017-02-24T08:37:11.037863+00:00",
      text: "我的同學是天才"
    },
    {
      sender: "sombody123",
      created_at: "2017-02-24T08:37:11.037862+00:00",
      media:
        "https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/fr/e15/p1080x1080/47584535_225759878360545_1017734586204445367_n.jpg?_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=f_HVaRHC07YAX-T9g5q&oh=7b23fa63d155a4d6b2232aaf93613d68&oe=5EC693B7&ig_cache_key=MjE3ODAzNzE0Mjg4MjA0MjUwMg%3D%3D.2"
    }
  ]
};

const ChatContextProvider = props => {
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatParticipants, setChatParticipants] = useState([]);
  const [chatConversation, setChatConversation] = useState([]);

  useEffect(() => {
    setChatParticipants(TestChatData.participants);
    setChatConversation(TestChatData.conversation);
    setChatLoaded(true);
  }, []);

  return (
    <ChatContext.Provider
      value={{ chatLoaded, chatParticipants, chatConversation }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
