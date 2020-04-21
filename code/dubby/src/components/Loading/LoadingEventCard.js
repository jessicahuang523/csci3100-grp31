import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Card } from "reactstrap";

const LoadingEventCard = () => {
  const { isPrimaryTheme } = useContext(ThemeContext);

  return (
    <Card
      body
      inverse={!isPrimaryTheme}
      color={!isPrimaryTheme ? "dark" : null}
      style={{ height: "200px", marginBottom: "1rem" }}
    ></Card>
  );
};

export default LoadingEventCard;
