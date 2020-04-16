import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";

const messages = [
  "Hang on! We're getting your data ready...",
  "Just a sec! it's coming!",
  "Whoa, this is taking longer than expected...",
  "Wiiiiiiii",
];

const LoadingUserCreation = () => {
  const [loadingMessage, setLoadingMessage] = useState(0);

  useEffect(() => {
    const clear = setInterval(() => {
      setLoadingMessage((loadingMessage + 1) % messages.length);
    }, 3000);
    return () => {
      clearInterval(clear);
    };
  }, [loadingMessage]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner color="warning" />
      <p>{messages[loadingMessage]}</p>
    </div>
  );
};

export default LoadingUserCreation;
