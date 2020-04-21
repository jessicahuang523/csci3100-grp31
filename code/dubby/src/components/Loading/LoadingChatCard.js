import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Card } from "reactstrap";

const LoadingChatCard = () => {
  const { isPrimaryTheme } = useContext(ThemeContext);

  return (
    <Card
      body
      inverse={!isPrimaryTheme}
      color={!isPrimaryTheme ? "dark" : null}
      style={{ height: "90px", marginBottom: "0.5rem" }}
    ></Card>
  );
};

export default LoadingChatCard;
