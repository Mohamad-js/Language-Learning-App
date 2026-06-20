import { useRef } from 'react';

export function useClickSound() {
  const audioRef = useRef(null);

  return {
    audioRef,
    play: () => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = 0;
      audioRef.current.play();
    },
  };
}