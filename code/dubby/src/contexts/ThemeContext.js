import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const purple = "#4B1248";
const yellow = "#F0C27B";
const black = "#000000";
const white = "#FFFFFF";

const backgroundStyle = {
  minHeight: "100vh",
  paddingBottom: "1rem",
  overflowX: "hidden",
};

const jumbotronStyle = { textAlign: "center" };

const loadingStyle = {
  width: "100vw",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
};

const themes = {
  primary: {
    background: {
      backgroundColor: yellow,
      color: black,
      ...backgroundStyle,
    },
    jumbotron: {
      backgroundColor: yellow,
      color: black,
      ...jumbotronStyle,
    },
    loading: {
      ...loadingStyle,
    },
    spinnerColor: "dark",
  },
  secondary: {
    background: {
      backgroundColor: purple,
      color: white,
      ...backgroundStyle,
    },
    jumbotron: {
      backgroundColor: purple,
      color: white,
      ...jumbotronStyle,
    },
    loading: {
      ...loadingStyle,
    },
    spinnerColor: "light",
  },
};

const ThemeContextProvider = (props) => {
  const [isPrimaryTheme, setIsPrimaryTheme] = useState(true);

  const toggleTheme = () => {
    setIsPrimaryTheme(!isPrimaryTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        isPrimaryTheme,
        theme: isPrimaryTheme ? themes.primary : themes.secondary,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
