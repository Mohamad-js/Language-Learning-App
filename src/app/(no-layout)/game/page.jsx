'use client';

import { useEffect, useRef } from 'react';

export default function GamePage() {

   const playerRef = useRef(null)

   useEffect(() => {

      console.log(playerRef.current);

   }, []);

   return (
      <div
         className="absolute w-16 h-16 bg-red-500" 
         ref={playerRef}
      />
   )
}