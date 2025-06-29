"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const StudyPlanContext = createContext();

export const StudyPlanProvider = ({ children }) => {
   const [startDate, setStartDate] = useState(null);
   const [currentDay, setCurrentDay] = useState(1);

   useEffect(() => {
      const savedDate = localStorage.getItem("startDate");
      if (savedDate) setStartDate(savedDate);

      // Auto-update at midnight
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const timeout = midnight.getTime() - now.getTime();


      const timer = setTimeout(() => {
         setCurrentDay((prev) => Math.min(prev + 1, 700));
      }, timeout);

      return () => clearTimeout(timer);
   }, []);

   return (
      <StudyPlanContext.Provider value={{ startDate, setStartDate, currentDay, setCurrentDay }}>
         {children}
      </StudyPlanContext.Provider>
   );
};

export const useStudyPlan = () => {
   const context = useContext(StudyPlanContext);
   if (!context) throw new Error("useStudyPlan must be used within a StudyPlanProvider");
   return context;
};
