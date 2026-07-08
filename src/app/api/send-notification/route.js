import webpush from 'web-push';
import {
  deleteSubscription,
  getAllSubscriptions,
} from '@/lib/pushSubscriptionStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function configureWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys missing');
  }

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:mohamadgomar1997@gmail.com',
    publicKey,
    privateKey
  );
}

function buildPayload({ title, body, icon, url }) {
  return JSON.stringify({
    title: title || 'iGhazal',
    body: body || 'A new lesson message is ready.',
    icon: icon || '/logo-192.png',
    url: url || '/',
  });
}

function isExpiredSubscriptionError(error) {
  return error.statusCode === 404 || error.statusCode === 410;
}

async function sendOne(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, payload);
    return { success: true, endpoint: subscription.endpoint };
  } catch (error) {
    if (isExpiredSubscriptionError(error)) {
      await deleteSubscription(subscription.endpoint);
    }

    return {
      success: false,
      endpoint: subscription.endpoint,
      removed: isExpiredSubscriptionError(error),
      error: error.message,
      statusCode: error.statusCode || null,
    };
  }
}

function assertBroadcastAuthorized(request) {
  const adminKey = process.env.PUSH_NOTIFICATION_ADMIN_KEY;

  if (!adminKey) {
    throw new Error('PUSH_NOTIFICATION_ADMIN_KEY is required for broadcasts');
  }

  if (request.headers.get('x-notification-admin-key') !== adminKey) {
    const error = new Error('Unauthorized broadcast request');
    error.status = 401;
    throw error;
  }
}

export async function POST(request) {
  try {
    configureWebPush();

    const requestBody = await request.json();
    const { subscription } = requestBody;
    const payload = buildPayload(requestBody);

    if (subscription) {
      const result = await sendOne(subscription, payload);

      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    assertBroadcastAuthorized(request);

    const subscriptions = await getAllSubscriptions();
    const results = await Promise.all(
      subscriptions.map((item) => sendOne(item, payload))
    );
    const sent = results.filter((item) => item.success).length;
    const failed = results.length - sent;
    const removed = results.filter((item) => item.removed).length;

    return new Response(
      JSON.stringify({
        success: failed === 0,
        total: subscriptions.length,
        sent,
        failed,
        removed,
        results,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Push notification error:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
