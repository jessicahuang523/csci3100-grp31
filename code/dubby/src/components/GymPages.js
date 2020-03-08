import React from "react";

const GymPage = () => {
  return (
    <div className="main-container">
      <header>
        <h1>Gym Information</h1>
      </header>
      <ul className="gym-page-list">
        <GymListItem gymName="University Gym" />
        <GymListItem gymName="New Asia College" />
        <GymListItem gymName="Shaw College" />
        <GymListItem gymName="United College" />
        <GymListItem gymName="University Gym" />
        <GymListItem gymName="New Asia College" />
        <GymListItem gymName="Shaw College" />
        <GymListItem gymName="United College" />
        <GymListItem gymName="University Gym" />
        <GymListItem gymName="New Asia College" />
        <GymListItem gymName="Shaw College" />
        <GymListItem gymName="United College" />
        <GymListItem gymName="University Gym" />
        <GymListItem gymName="New Asia College" />
        <GymListItem gymName="Shaw College" />
        <GymListItem gymName="United College" />
        <GymListItem gymName="University Gym" />
        <GymListItem gymName="New Asia College" />
        <GymListItem gymName="Shaw College" />
        <GymListItem gymName="United College" />
      </ul>
    </div>
  );
};

const GymListItem = ({ gymName }) => (
  <li className="gym-list-item">
    <span className="gym-list-title">
      <h3>{gymName}</h3>
    </span>
    <span className="gym-detail">
      <div className="gym-detail-card">
        <u>Gym</u>
        <div className="gym-detail-timetable">
          <ul>
            <li>Mon-Fri</li>
            <li>Sat-Sun</li>
          </ul>
          <ul>
            <li>10:00-22:00</li>
            <li>Closed</li>
          </ul>
        </div>
        <u>Basketball Court</u>
        <div className="gym-detail-timetable">
          <ul>
            <li>Mon-Sun</li>
          </ul>
          <ul>
            <li>7:00-22:00</li>
          </ul>
        </div>
      </div>
    </span>
  </li>
);

export default GymPage;
