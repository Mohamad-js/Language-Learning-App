'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {

   const [settings, setSettings] = useState({
      discoveryMode: false,
      quizMode: false,
      showIdiom: true
   });

   const value = { settings, setSettings };

   useEffect(() => {

      const savedSettings = localStorage.getItem('Settings');

      if(savedSettings) {
         setSettings(JSON.parse(savedSettings));
      }

   }, []);

   useEffect(() => {
      localStorage.setItem('Settings', JSON.stringify(settings));
   }, [settings]);

   return (
      <SettingsContext.Provider value={value}>
         {children}
      </SettingsContext.Provider>
   );
}

export function useSettings() {
   return useContext(SettingsContext);
}