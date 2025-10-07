// app/components/NotificationButton.js
'use client';

import { useState, useEffect } from 'react';

export default function NotificationButton() {
  const [permission, setPermission] = useState('default');
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check initial state
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(reg => reg.pushManager.getSubscription())
        .then(sub => {
          if (sub) {
            setSubscribed(true);
            setSubscription(sub);
          }
        })
        .catch(err => console.warn('Could not check subscription:', err));
    }
  }, []);

  // Auto-subscribe when permission becomes 'granted'
  useEffect(() => {
    if (permission === 'granted' && !subscribed && !loading) {
      subscribeToPush();
    }
  }, [permission, subscribed, loading]);

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

  const requestPermission = async () => {
    setError(null);
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') {
        setError('Permission denied. Please enable notifications in your browser settings.');
      }
    }
  };

const subscribeToPush = async () => {
  if (subscribed || loading) return;

  setLoading(true);
  setError(null);

  try {
    const registration = await navigator.serviceWorker.ready;
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    if (!vapidKey) {
      throw new Error('VAPID key missing. Check environment variables.');
    }

    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    // ✅ Save to API
    const res = await fetch('/api/save-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });

    const result = await res.json();
    if (result.success) {
      setSubscribed(true);
      setSubscription(sub);
      console.log('✅ Successfully subscribed to push notifications');
    } else {
      throw new Error(result.error || 'Unknown API error');
    }
  } catch (err) {
    console.error('❌ Subscription failed:', err);
    setError('Subscription failed: ' + err.message);
  } finally {
    setLoading(false);
  }
};


  const sendTestNotification = async () => {
    if (!subscription) return;
    try {
      const res = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          title: 'Test Notification',
          body: 'Your push setup is working! 🎉'
        })
      });
      const result = await res.json();
      if (result.success) {
        alert('Test notification sent! Check your device.');
      } else {
        alert('Failed: ' + result.error);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '10px', margin: '10px 0' }}>
      {error && (
        <div style={{ color: 'red', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {!subscribed && permission !== 'granted' && (
        <button onClick={requestPermission} style={{ padding: '10px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Enable Notifications
        </button>
      )}

      {permission === 'granted' && !subscribed && (
        <button 
          onClick={subscribeToPush} 
          disabled={loading}
          style={{ padding: '10px 16px', backgroundColor: loading ? '#6c757d' : '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {loading ? 'Subscribing...' : 'Subscribe to Push Notifications'}
        </button>
      )}

      {subscribed && (
        <button onClick={sendTestNotification} style={{ padding: '10px 16px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>
          Send Test Notification
        </button>
      )}
    </div>
  );
}