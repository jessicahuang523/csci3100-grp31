import React from "react";
import EventCard from "./EventCard";

const EventPage = () => {
  return (
    <div className="main-container">
      <header>
        <h1>Events</h1>
      </header>
      <ul>
        <EventCard eid="test-event" />
      </ul>
    </div>
  );
};

export default EventPage;
