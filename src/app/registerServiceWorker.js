// app/registerServiceWorker.js (or similar)
"use client";

import { useEffect } from "react";

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // Prompt user to refresh for new content
              if (confirm("New version available! Refresh to update?")) {
                newWorker.postMessage({ action: "skipWaiting" });
              }
            }
          });
        });
      });
    }
  }, []);

  return null;
}