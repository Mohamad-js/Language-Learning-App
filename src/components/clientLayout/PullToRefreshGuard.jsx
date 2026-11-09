'use client';

import { useEffect } from 'react';

function canScrollUp(target) {
  if (window.scrollY > 0) return true;

  for (let node = target; node instanceof Element; node = node.parentElement) {
    if (node.scrollTop > 0 && /^(auto|scroll|overlay)$/.test(getComputedStyle(node).overflowY)) {
      return true;
    }
  }
  return false;
}

export default function PullToRefreshGuard() {
  useEffect(() => {
    if (window.CSS?.supports?.('overscroll-behavior-y', 'contain')) return;

    let start = null;
    let distance = 0;

    function reset() {
      start = null;
      distance = 0;
    }

    function onStart(event) {
      reset();
      if (event.touches.length === 1 && !canScrollUp(event.target)) {
        start = event.touches[0];
      }
    }

    function onMove(event) {
      if (!start) return;
      const touch = event.touches[0];
      const dy = touch.clientY - start.clientY;
      const dx = touch.clientX - start.clientX;
      if (!event.cancelable || event.touches.length !== 1 || dy <= 0 || Math.abs(dx) > dy) {
        reset();
        return;
      }
      event.preventDefault();
      distance = dy;
    }

    function onEnd() {
      const shouldAsk = distance >= 80;
      reset();
      if (shouldAsk && window.confirm('Restart the app?')) window.location.reload();
    }

    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
    document.addEventListener('touchcancel', reset);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      document.removeEventListener('touchcancel', reset);
    };
  }, []);

  return null;
}
