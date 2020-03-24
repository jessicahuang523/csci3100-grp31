import React from "react";
import { Card } from "reactstrap";

const LoadingEventCard = () => {
  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: "#eee",
        height: "200px",
        border: "none",
        marginBottom: "1rem"
      }}
    ></Card>
  );
};

export default LoadingEventCard;
