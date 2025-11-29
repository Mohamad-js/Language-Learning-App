'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Joyride from 'react-joyride';

export default function Tour({ steps, run = true, onTourComplete }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleJoyrideCallback = useCallback((data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      if (onTourComplete) onTourComplete();
    }
  }, [onTourComplete]);

  if (!isClient) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      continuous={true}
      showProgress={false}
      showSkipButton={true}
      styles={{
         options: {
            zIndex: 10000,
            primaryColor: '#ff5abdff'
         },

         tooltip: {
            borderRadius: '20px'
         }
      }}
    />
  );
}