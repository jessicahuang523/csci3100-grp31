import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const themes = {
  light: { color: "#000", backgroundColor: "#fff" },
  dark: { color: "#fff", backgroundColor: "#000" },
};

const ThemeContextProvider = (props) => {
  const [themeColor, setThemeColor] = useState();

  const toggleTheme = () => {
    setThemeColor(themeColor === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
