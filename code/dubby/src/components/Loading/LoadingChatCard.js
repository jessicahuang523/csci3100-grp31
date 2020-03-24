import React from "react";
import { Card } from "reactstrap";

const LoadingChatCard = () => {
  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: "#eee",
        height: "100px",
        border: "none",
        marginBottom: "1rem"
      }}
    ></Card>
  );
};

export default LoadingChatCard;
