import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

// color variables
const purple = "#AD93AB";
const yellow = "#F0C27B";
const jumbotron_purple = "#BBA6BA";
const jumbotron_yellow = "#F2CD93";

// common container styles
const backgroundStyle = {
  minHeight: "100vh",
  overflowX: "hidden",
};
const jumbotronStyle = {
  textAlign: "center",
  marginTop: "3rem",
  width: "100%",
};
const profileContainerStyle = {
  padding: "2rem",
  paddingTop: "4.5rem",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
const navbarStyle = { position: "fixed", top: 0, zIndex: 10, width: "100%" };
const mainContainerStyle = { padding: "1rem" };
const loadingStyle = {
  width: "100vw",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
};

// combine above variables to theme selections
// themes.primary (yellow based, light) or
// themes.secondary (purple based, dark)
const themes = {
  primary: {
    background: { ...backgroundStyle, backgroundColor: yellow },
    jumbotron: { ...jumbotronStyle, backgroundColor: jumbotron_yellow },
    profileContainer: profileContainerStyle,
    mainContainer: mainContainerStyle,
    navbar: navbarStyle,
    loading: loadingStyle,
    spinnerColor: "dark",
  },

  secondary: {
    background: { ...backgroundStyle, backgroundColor: purple },
    jumbotron: { ...jumbotronStyle, backgroundColor: jumbotron_purple },
    profileContainer: profileContainerStyle,
    mainContainer: mainContainerStyle,
    navbar: navbarStyle,
    loading: loadingStyle,
    spinnerColor: "light",
  },
};

const ThemeContextProvider = (props) => {
  // boolean value on current theme
  const [isPrimaryTheme, setIsPrimaryTheme] = useState(true);

  const toggleTheme = () => {
    setIsPrimaryTheme(!isPrimaryTheme);
  };

  return (
    // exports toggle function, isPrimaryTheme boolean, and theme object
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
