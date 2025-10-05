// app/api/send-notification/route.js
import webpush from 'web-push';

// Configure VAPID keys from environment variables
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(request) {
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
    
    // Send the push notification
    await webpush.sendNotification(subscription, payload);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Push notification error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}