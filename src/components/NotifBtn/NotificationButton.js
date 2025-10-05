// app/components/NotificationButton.js
'use client';

import { useState, useEffect } from 'react';

export default function NotificationButton() {
  const [permission, setPermission] = useState('default');
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.getSubscription().then(function(sub) {
          if (sub) {
            setSubscribed(true);
            setSubscription(sub);
          }
        }).catch(err => {
          console.error('Error checking subscription:', err);
          setError('Failed to check subscription: ' + err.message);
        });
      }).catch(err => {
        console.error('Service worker not ready:', err);
        setError('Service worker not ready: ' + err.message);
      });
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') {
        setError('Please grant notification permission to continue');
      }
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
    setError(null); // Clear previous errors
    
    if (!('serviceWorker' in navigator)) {
      setError('Service workers not supported in this browser');
      return;
    }
    
    if (permission !== 'granted') {
      setError('Notification permission not granted');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      console.log('Service worker ready:', registration);
      
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      console.log('VAPID Key:', vapidKey);
      
      if (!vapidKey) {
        setError('VAPID public key not configured');
        return;
      }
      
      const applicationServerKey = urlBase64ToUint8Array(vapidKey);
      console.log('Application server key converted successfully');
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
      
      console.log('Subscription created:', sub);
      
      // Send to API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sub)
      });
      
      const result = await response.json();
      console.log('API response:', result);
      
      if (result.success) {
        setSubscribed(true);
        setSubscription(sub);
        console.log('Successfully subscribed!');
      } else {
        setError('Failed to subscribe: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Subscription failed: ' + err.message);
    }
  };

  const sendPushNotification = async () => {
    if (!subscription) return;
    
    try {
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
    } catch (err) {
      console.error('Send notification error:', err);
      alert('Error sending notification: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '10px', margin: '10px 0' }}>
      {error && (
        <div style={{ 
          color: 'red', 
          padding: '8px', 
          backgroundColor: '#ffe6e6', 
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}
      
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