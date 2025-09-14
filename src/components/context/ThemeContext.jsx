"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [lightTheme, setLightTheme] = useState(null); // null = not decided yet

  // On mount, load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("lightMode");
    if (savedTheme !== null) {
      setLightTheme(JSON.parse(savedTheme));
    } else {
      setLightTheme(true); // default to light if nothing saved
    }
  }, []);

  // Apply theme to document + save to localStorage
  useEffect(() => {
    if (lightTheme === null) return; // don’t run before loaded
    localStorage.setItem("lightMode", JSON.stringify(lightTheme));
    document.documentElement.classList.toggle("dark", !lightTheme);
    document.documentElement.classList.toggle("light", lightTheme);
  }, [lightTheme]);

  const toggleTheme = () => setLightTheme((prev) => !prev);

  // Prevent rendering until theme is known (avoids flash)
  if (lightTheme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
