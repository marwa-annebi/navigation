import React, { useCallback, useContext, useEffect, useState } from "react";

import { DefaultTheme, generateTheme } from "./Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = React.createContext({
  theme: generateTheme(DefaultTheme),
  appearance: null,
  switchTheme: () => {},
  loadingTheme: true,
});

const ThemeProvider = (props) => {
  const { defaultTheme, darkTheme, scheme, children } = props;
  const [state, setState] = useState({
    theme: generateTheme(DefaultTheme),
    appearance: null,
    loadingTheme: true,
  });

  useEffect(() => {
    const getAppearance = async () => {
      try {
        const value = await AsyncStorage.getItem("appearance");

        setState((prevState) => ({
          ...prevState,
          appearance: value || scheme,
        }));
      } catch (error) {
        console.error("error getAppearance", error);
      }
    };
    getAppearance();
  }, [scheme]);

  React.useEffect(() => {
    if (state.appearance === "dark" && darkTheme) {
      setState((prevState) => ({
        ...prevState,
        theme: generateTheme(darkTheme),
        loadingTheme: false,
      }));
    } else if (defaultTheme) {
      setState((prevState) => ({
        ...prevState,
        theme: generateTheme(defaultTheme),
        loadingTheme: false,
      }));
    }
  }, [darkTheme, defaultTheme, state.appearance]);

  const switchTheme = useCallback(async () => {
    try {
      // Determine the new appearance by toggling the current appearance
      const newAppearance = state.appearance === "dark" ? "light" : "dark";

      // Save the new appearance in AsyncStorage
      await AsyncStorage.setItem("appearance", newAppearance);

      // Select the theme based on the new appearance
      const themeToUse = newAppearance === "dark" ? darkTheme : defaultTheme;

      // Generate the new theme
      const newTheme = generateTheme(themeToUse || DefaultTheme);

      // Update the state with the new theme and appearance
      setState((prevState) => ({
        ...prevState,
        theme: newTheme,
        appearance: newAppearance,
      }));

      console.log("Current theme", newAppearance);
    } catch (error) {
      console.log("Error switching theme", error);
    }
  }, [darkTheme, defaultTheme, state.appearance]);
  return (
    <ThemeContext.Provider value={{ ...state, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { useTheme, ThemeProvider };
