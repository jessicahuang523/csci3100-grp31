import React from "react";
import Routes from "./Routes";
import UserContextProvider from "./contexts/UserContext";
import EventTypeContextProvider from "./contexts/EventTypeContext";
import GymContextProvider from "./contexts/GymContext";
import FriendContextProvider from "./contexts/FriendContext";
import ThemeContextProvider from "./contexts/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <UserContextProvider>
          <GymContextProvider>
            <EventTypeContextProvider>
              <FriendContextProvider>
                <Routes />
              </FriendContextProvider>
            </EventTypeContextProvider>
          </GymContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
