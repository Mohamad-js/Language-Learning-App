'use client'; // Mark this as a Client Component
import { useEffect, useState } from 'react';
const RevealWrapper = ({ children, ...props }) => {
const [Reveal, setReveal] = useState(null);

useEffect(() => {
   // Dynamically import react-awesome-reveal to ensure it only runs client-side
   import('react-awesome-reveal').then((mod) => {
      setReveal(() => mod.default); // Set the Reveal component
   });
}, []);

if (!Reveal) {
   return <>{children}</>; // Render children without animation if not loaded
}

   return <Reveal {...props}>{children}</Reveal>;
};

export default RevealWrapper;