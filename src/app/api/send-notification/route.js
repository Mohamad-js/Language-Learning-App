import webpush from 'web-push';
import { config } from 'dotenv';
config(); // Load .env file

export async function POST(request) {
  console.log('Environment variables:', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      'mailto:mohamadgomar1997@gmail.com',
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    console.log('VAPID keys set successfully');
  } else {
    console.warn('VAPID keys not set, skipping configuration');
    return new Response(JSON.stringify({ success: false, error: 'VAPID keys missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { subscription, title, body } = await request.json();
    if (!subscription) {
      return new Response(JSON.stringify({ success: false, error: 'No subscription provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const payload = JSON.stringify({
      title: title || 'Daily Idiom',
      body: body || 'Check out today\'s idiom!',
      icon: '/logo-192.png'
    });
    
    await webpush.sendNotification(subscription, payload);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Push notification error:', error.message, error.stack);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}