'use client';

import { useEffect, useState } from 'react';

export default function NotificationButton() {
  const [permission, setPermission] = useState('default');
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const waitForServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service workers are not supported in this browser.');
    }

    if (!navigator.serviceWorker.controller) {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (err) {
        throw new Error(`Service worker registration failed: ${err.message}`);
      }
    }

    return Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error('Service worker was not ready after 10 seconds.')),
          10000
        );
      }),
    ]);
  };

  useEffect(() => {
    if (!('Notification' in window)) {
      setError('Notifications are not supported in this browser.');
      return;
    }

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setError('Push notifications are not supported in this browser.');
      return;
    }

    setPermission(Notification.permission);

    waitForServiceWorker()
      .then((reg) => reg.pushManager.getSubscription())
      .then(async (sub) => {
        if (sub) {
          setSubscribed(true);
          setSubscription(sub);
          await saveSubscription(sub);
        }
      })
      .catch((err) => {
        console.error('Could not check subscription:', err);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (permission === 'granted' && !subscribed && !loading) {
      subscribeToPush();
    }
  }, [permission, subscribed, loading]);

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
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

  const saveSubscription = async (sub) => {
    const res = await fetch('/api/save-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub.toJSON ? sub.toJSON() : sub),
    });

    const result = await res.json().catch(() => ({
      success: false,
      error: `Server returned ${res.status} while saving subscription.`,
    }));

    if (!result.success) {
      throw new Error(result.error || 'Failed to save subscription.');
    }

    return result;
  };

  const requestPermission = async () => {
    setError(null);
    setStatus('Waiting for notification permission...');

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== 'granted') {
        setStatus('');
        setError('Notification permission was not granted.');
      }
    } catch (err) {
      setStatus('');
      setError(`Error requesting permission: ${err.message}`);
    }
  };

  const subscribeToPush = async () => {
    if (subscribed || loading) return;

    setLoading(true);
    setError(null);
    setStatus('Waiting for service worker...');

    try {
      const registration = await waitForServiceWorker();
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidKey) {
        throw new Error('Missing VAPID public key.');
      }

      setStatus('Creating push subscription...');
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      setStatus('Saving subscription...');
      await saveSubscription(sub);
      setSubscribed(true);
      setSubscription(sub);
      setStatus('');
    } catch (err) {
      console.error('Subscription failed:', err);
      setError(`Subscription failed: ${err.message}`);
      setStatus('');
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
      const res = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: subscription.toJSON ? subscription.toJSON() : subscription,
          title: 'Test Notification',
          body: 'Your push setup is working!',
          url: '/',
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert('Test notification sent. Check your device.');
      } else {
        alert(`Failed: ${result.error}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
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

      {status && (
        <div
          style={{
            color: '#155724',
            padding: '8px',
            backgroundColor: '#d4edda',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
        >
          {status}
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
