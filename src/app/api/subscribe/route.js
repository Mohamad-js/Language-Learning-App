import { upsertSubscription } from '@/lib/pushSubscriptionStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const subscription = await request.json();
    const { count } = await upsertSubscription(subscription, {
      userAgent: request.headers.get('user-agent'),
    });

    return new Response(JSON.stringify({ success: true, count }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
