import React from "react";
import EventCard from "./EventPages";
import { devSetupAccount } from "../devutil";

const MainFeed = () => {
  return (
    <div className="main-container">
      <header>
        <h1>Events</h1>
        <p style={{ cursor: "pointer" }} onClick={() => devSetupAccount()}>
          <i>(dev) click to setup my account</i>
        </p>
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
