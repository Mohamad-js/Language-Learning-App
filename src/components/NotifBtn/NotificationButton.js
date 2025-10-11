// app/components/NotificationButton.js
'use client';

import { useState, useEffect } from 'react';

export default function NotificationButton() {
  const [permission, setPermission] = useState('default');
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Initial notification permission:', Notification.permission);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((reg) => {
          console.log('Service worker ready:', reg);
          return reg.pushManager.getSubscription();
        })
        .then((sub) => {
          if (sub) {
            console.log('Existing subscription found:', sub);
            setSubscribed(true);
            setSubscription(sub);
          }
        })
        .catch((err) => console.error('Could not check subscription:', err));
    }
  }, []);

  useEffect(() => {
    if (permission === 'granted' && !subscribed && !loading) {
      console.log('Auto-subscribing to push notifications...');
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
      console.log('Requesting notification permission...');
      try {
        const perm = await Notification.requestPermission();
        console.log('Permission result:', perm);
        setPermission(perm);
        if (perm !== 'granted') {
          setError('Notification permission denied by user.');
          console.log('🚫 Notification permission denied by user.');
        }
      } catch (err) {
        console.error('Error requesting permission:', err);
        setError('Error requesting permission: ' + err.message);
      }
    } else {
      setError('Notifications not supported in this browser.');
    }
  };

  const subscribeToPush = async () => {
    if (subscribed || loading) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Waiting for service worker to be ready...');
      const registration = await navigator.serviceWorker.ready;
      console.log('Service worker ready:', registration);

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) throw new Error('Missing VAPID public key.');
      console.log('VAPID key:', vapidKey);

      console.log('Subscribing to push...');
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });
      console.log('Push subscription created:', sub);

      console.log('Saving subscription to backend...');
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
        throw new Error(result.error || 'Failed to save subscription.');
      }
    } catch (err) {
      console.error('❌ Subscription failed:', err);
      setError('Subscription failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!subscription) {
      alert('You are not subscribed yet.');
      return;
    }

    try {
      console.log('Sending test notification...');
      const res = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          title: 'Test Notification',
          body: 'Your push setup is working! 🎉',
        }),
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
        <div
          style={{
            color: 'red',
            padding: '8px',
            backgroundColor: '#ffe6e6',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
        >
          {error}
        </div>
      )}

      {!subscribed && permission !== 'granted' && (
        <button
          onClick={requestPermission}
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Enable Notifications
        </button>
      )}

      {permission === 'granted' && !subscribed && (
        <button
          onClick={subscribeToPush}
          disabled={loading}
          style={{
            padding: '10px 16px',
            backgroundColor: loading ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {loading ? 'Subscribing...' : 'Subscribe to Push Notifications'}
        </button>
      )}

      {subscribed && (
        <button
          onClick={sendTestNotification}
          style={{
            padding: '10px 16px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Send Test Notification
        </button>
      )}
    </div>
  );
}