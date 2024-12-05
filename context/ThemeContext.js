import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Get system theme
  const [theme, setTheme] = useState(systemTheme);
  const [useSystemTheme, setUseSystemTheme] = useState(true);

  // Load persisted theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedUseSystemTheme = await AsyncStorage.getItem('useSystemTheme');
      if (savedTheme) setTheme(savedTheme);
      if (savedUseSystemTheme) setUseSystemTheme(JSON.parse(savedUseSystemTheme));
    };
    loadTheme();
  }, []);

  // Update theme if system theme changes
  useEffect(() => {
    if (useSystemTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, useSystemTheme]);

  const toggleTheme = async (newTheme) => {
    if (newTheme === 'system') {
      setUseSystemTheme(true);
      setTheme(systemTheme);
      await AsyncStorage.setItem('useSystemTheme', JSON.stringify(true));
    } else {
      setUseSystemTheme(false);
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
      await AsyncStorage.setItem('useSystemTheme', JSON.stringify(false));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, useSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
