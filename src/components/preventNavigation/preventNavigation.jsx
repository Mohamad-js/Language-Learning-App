'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

function PreventNavigation({ warning, setWarning, ConfirmDialogue }) {
   const router = useRouter();
   const [pendingNavigation, setPendingNavigation] = useState(false);

   useEffect(() => {
      // Handle browser back/forward navigation
      const handlePopState = (event) => {
         if (warning) {
            event.preventDefault();
            setPendingNavigation(true);
            setWarning(true);
            // Push the current state back to prevent navigation
            window.history.pushState(null, null, window.location.href);
         }
      };

      if (warning) {
         setPendingNavigation(true);
         setWarning(true);
         // Push the current state back to prevent navigation
         window.history.pushState(null, null, window.location.href);
      }

      // Push current state to history to detect back navigation
      window.history.pushState(null, null, window.location.href);

      // Add popstate listener
      window.addEventListener('popstate', handlePopState);

      // Handle beforeunload for browser close/refresh
      const handleBeforeUnload = (e) => {
         if (warning) {
            e.preventDefault();
            e.returnValue = '';
         }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up
      return () => {
         window.removeEventListener('popstate', handlePopState);
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, [warning, router, setWarning]);

   const handleConfirm = () => {
      setWarning(false);
      setPendingNavigation(false);
      router.back(); // Proceed with navigation
   };

   const handleCancel = () => {
      setWarning(false);
      setPendingNavigation(false);
   };

   return (
      <ConfirmDialogue
         open={warning && pendingNavigation}
         onConfirm={handleConfirm}
         onCancel={handleCancel}
      />
   );
}

PreventNavigation.propTypes = {
   warning: PropTypes.bool.isRequired,
   setWarning: PropTypes.func.isRequired,
   ConfirmDialogue: PropTypes.elementType.isRequired,
};

export default PreventNavigation;