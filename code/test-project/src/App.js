import React from "react";
import Routes from "./Routes";
import UserContextProvider from "./context/UserContext";
import ChatContextProvider from "./context/ChatContext";

function App() {
  return (
    <div className="App">
      <ChatContextProvider>
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </ChatContextProvider>
    </div>
  );
}

export default App;
