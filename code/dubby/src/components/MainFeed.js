import React from "react";
import { Link } from "react-router-dom";

const MainFeed = () => {
  return (
    <div className="main-container">
      <header>
        <h1>My Feed</h1>
      </header>
      <p>
        to separate event page and main feed, temporately setting here like
        this.
      </p>
      <Link to="/e">link to event page</Link>
    </div>
  );
};

export default MainFeed;
