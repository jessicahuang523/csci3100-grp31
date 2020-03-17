import React from "react";
import EventCard from "./EventPages";

const MainFeed = () => {
  return (
    <div className="main-container">
      <header>
        <h1>Events</h1>
      </header>
      <ul>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </ul>
    </div>
  );
};

export default MainFeed;
