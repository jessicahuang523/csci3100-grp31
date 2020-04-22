import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";

const messages = [
  "Hang on! We're getting your data ready...",
  "Just a sec! it's coming!",
  "You will love Dubby, just like I do",
  "Whoa, this is taking longer than expected...",
  "By the way have you eaten lunch yet? Dinner?",
  "I love hamburgers!",
  "Wiiiiiiii",
];

const LoadingUserCreation = () => {
  const [loadingMessage, setLoadingMessage] = useState(0);

  // displays a new message from list of messages every 3 seconds
  // updates loadingMessage
  useEffect(() => {
    const clear = setInterval(() => {
      setLoadingMessage((loadingMessage + 1) % messages.length);
    }, 3000);
    return () => {
      clearInterval(clear);
    };
  }, [loadingMessage]);

  // render
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
