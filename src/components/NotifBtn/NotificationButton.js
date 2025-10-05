// app/components/NotificationButton.js
'use client';

import { useState, useEffect } from 'react';

export default function NotificationButton() {
  const [permission, setPermission] = useState('default');
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    
    // Check existing subscription
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.getSubscription().then(function(sub) {
          if (sub) {
            setSubscribed(true);
            setSubscription(sub);
          }
        });
      });
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setPermission(perm);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async () => {
    if ('serviceWorker' in navigator && permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
      });
      
      // Send subscription to your Vercel API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sub)
      });
      
      const result = await response.json();
      if (result.success) {
        setSubscribed(true);
        setSubscription(sub);
      }
    }
  };

  const sendPushNotification = async () => {
    if (!subscription) return;
    
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription,
        title: 'Daily Idiom Ready!',
        body: 'Your daily idiom has been updated. Check it out!'
      })
    });
    
    const result = await response.json();
    if (result.success) {
      alert('Push notification sent! Check your device notifications.');
    } else {
      alert('Failed to send notification: ' + result.error);
    }
  };

  return (
    <div style={{ padding: '10px', margin: '10px 0' }}>
      {permission !== 'granted' && (
        <button 
          onClick={requestPermission} 
          style={{ 
            padding: '8px 16px', 
            margin: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Enable Notifications
        </button>
      )}
      
      {permission === 'granted' && !subscribed && (
        <button 
          onClick={subscribeToPush} 
          style={{ 
            padding: '8px 16px', 
            margin: '5px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Subscribe to Daily Idiom Notifications
        </button>
      )}
      
      {subscribed && (
        <button 
          onClick={sendPushNotification} 
          style={{ 
            padding: '8px 16px', 
            margin: '5px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send Test Notification
        </button>
      )}
    </div>
  );
}