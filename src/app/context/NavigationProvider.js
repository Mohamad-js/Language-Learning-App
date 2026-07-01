'use client';

import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
   const [active, setActive] = useState(0);
   const [practiceOnly, setPracticeOnly] = useState(false);
   const [nextIsReview, setNextIsReview] = useState(false);


   return (
      <NavigationContext.Provider
         value={{ active, setActive, practiceOnly, setPracticeOnly, nextIsReview, setNextIsReview }}
      >
         {children}
      </NavigationContext.Provider>
   );
}

export function useNavigation() {
   return useContext(NavigationContext);
}