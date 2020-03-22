import React, { useContext } from "react";
import NavBar from "../Navbar/Navbar";
import { UserContext } from "../../contexts/UserContext";

const Loading = ({ message }) => {
  const { userData, userLoading } = useContext(UserContext);

  if (userLoading || !userData) {
    return null;
  } else {
    return (
      <div>
        <NavBar />
        <h1>{message ? message : "Loading..."}</h1>
      </div>
    );
  }
};

export default Loading;
