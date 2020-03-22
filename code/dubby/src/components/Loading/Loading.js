import React from "react";
import NavBar from "../Navbar/Navbar";

const Loading = ({ message }) => {
  return (
    <div>
      <NavBar />
      <h1>{message ? message : "Loading..."}</h1>
    </div>
  );
};

export default Loading;
