import React from "react";

const EventCard = () => {
  return (
    <div className="event-card">
      <div className="event-description-short">
        <div className="event-icon">
          <i className={`fas ${"fa-basketball-ball"}`}></i>
        </div>
        <div>
          <h3>Basketball</h3>
          <p>at Shaw College Court</p>
          <span>Starting at 2020/02/02 20:20</span>
          <p>Vacancy: 2</p>
        </div>
      </div>
      <div className="event-description-actions">
        <p>Your friends Tom and others are going</p>
        <button>Show more</button>
      </div>
    </div>
  );
};

export default EventCard;
