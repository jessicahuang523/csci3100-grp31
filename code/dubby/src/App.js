import React from "react";
import Routes from "./Routes";
import UserContextProvider from "./contexts/UserContext";
import EventTypeContextProvider from "./contexts/EventTypeContext";
import GymContextProvider from "./contexts/GymContext";
import FriendContextProvider from "./contexts/FriendContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <GymContextProvider>
          <EventTypeContextProvider>
            <FriendContextProvider>
              <Routes />
            </FriendContextProvider>
          </EventTypeContextProvider>
        </GymContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
