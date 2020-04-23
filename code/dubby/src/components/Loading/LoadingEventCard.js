import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Card, Col } from "reactstrap";

const LoadingEventCard = () => {
  const { isPrimaryTheme } = useContext(ThemeContext);

  // renders an empty 14rem tall card
  return (
    <Col>
      <Card
        body
        inverse={!isPrimaryTheme}
        color={!isPrimaryTheme ? "dark" : null}
        style={{ height: "14rem", marginBottom: "1rem" }}
      ></Card>
    </Col>
  );
};

export default LoadingEventCard;
