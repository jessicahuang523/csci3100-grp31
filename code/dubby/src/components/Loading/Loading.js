import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Spinner } from "reactstrap";
import NavBar from "../Navbar/Navbar";

const Loading = () => {
  const { userData, userLoading } = useContext(UserContext);

  if (userLoading || !userData) {
    return null;
  } else {
    return (
      <div>
        <NavBar />
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      </div>
    );
  }
};

export default Loading;
