import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const purple = "#4B1248";
const yellow = "#F0C27B";

const backgroundStyle = { minHeight: "100vh" };

const jumbotronStyle = { textAlign: "center" };

const themes = {
  primary: {
    background: {
      backgroundColor: yellow,
      ...backgroundStyle,
    },
    jumbotron: {
      backgroundColor: yellow,
      ...jumbotronStyle,
    },
  },
  secondary: {
    background: {
      backgroundColor: purple,
      ...backgroundStyle,
    },
    jumbotron: {
      backgroundColor: purple,
      ...jumbotronStyle,
    },
  },
};

const ThemeContextProvider = (props) => {
  const [themeColor, setThemeColor] = useState();

  const toggleTheme = () => {
    setThemeColor(
      themeColor === themes.primary ? themes.secondary : themes.primary
    );
  };

  return (
    <ThemeContext.Provider value={{ themeColor, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
