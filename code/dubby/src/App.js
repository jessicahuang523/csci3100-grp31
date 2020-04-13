import React from "react";
import Routes from "./Routes";
import UserContextProvider from "./contexts/UserContext";
import EventTypeContextProvider from "./contexts/EventTypeContext";
import GymContextProvider from "./contexts/GymContext";

function App() {
  return (
    <div className="App">
      <GymContextProvider>
        <EventTypeContextProvider>
          <UserContextProvider>
            <Routes />
          </UserContextProvider>
        </EventTypeContextProvider>
      </GymContextProvider>
    </div>
  );
}

export default App;
