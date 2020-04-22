import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Card } from "reactstrap";

const LoadingChatCard = () => {
  const { isPrimaryTheme } = useContext(ThemeContext);

  // renders an empty 5.6rem tall card
  return (
    <Card
      body
      inverse={!isPrimaryTheme}
      color={!isPrimaryTheme ? "dark" : null}
      style={{ height: "5.6rem", marginBottom: "0.5rem" }}
    ></Card>
  );
};

export default LoadingChatCard;
