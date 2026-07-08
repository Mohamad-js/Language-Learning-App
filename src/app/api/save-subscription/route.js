import {
  deleteSubscription,
  getAllSubscriptions,
  upsertSubscription,
} from '@/lib/pushSubscriptionStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const subscription = await req.json();
    const { count } = await upsertSubscription(subscription, {
      userAgent: req.headers.get('user-agent'),
    });

    console.log('Push subscription saved:', subscription.endpoint);

    return new Response(JSON.stringify({ success: true, count }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  const subscriptions = await getAllSubscriptions();

  return new Response(JSON.stringify({ count: subscriptions.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req) {
  try {
    const { endpoint } = await req.json();
    const result = await deleteSubscription(endpoint);

    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
