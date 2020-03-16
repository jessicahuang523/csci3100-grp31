import React, { useState } from "react";
import { Tabs, Tab, Grid, Cell } from "react-mdl";

const GymPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleCategories = () => {
    if (activeTab === 0) {
      return (
        <div>
          <h1>This is CUHK</h1>
          <ul>
            <GymListItem gymName="University Gym" />
            <GymListItem gymName="New Asia College" />
            <GymListItem gymName="Shaw College" />
            <GymListItem gymName="United College" />
          </ul>
        </div>
      );
    }
    if (activeTab === 1) {
      return (
        <div>
          <h1>This is HKU</h1>
        </div>
      );
    }
  };

  return (
    <div className="catagory-tabs">
      <Tabs
        activeTab={activeTab}
        onChange={tabId => setActiveTab(tabId)}
        ripple="ripple"
      >
        <Tab>CUHK</Tab>
        <Tab>HKU</Tab>
      </Tabs>
      <Grid>
        <Cell col={12}>{toggleCategories()}</Cell>
      </Grid>
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
