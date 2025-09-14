"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [lightTheme, setLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem("lightMode");
    return savedTheme ? JSON.parse(savedTheme) : true; // default: light
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("lightMode", JSON.stringify(lightTheme));
    document.documentElement.classList.toggle("dark", !lightTheme);
    document.documentElement.classList.toggle("light", lightTheme);
  }, [lightTheme]);

  const toggleTheme = () => setLightTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme anywhere
export function useTheme() {
  return useContext(ThemeContext);
}
