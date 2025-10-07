let savedSubscription = null; // Temporary in-memory storage

export async function POST(req) {
  try {
    const subscription = await req.json();
    if (!subscription || !subscription.endpoint) {
      return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    savedSubscription = subscription;
    console.log('✅ Subscription saved:', subscription.endpoint);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error saving subscription:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  if (!savedSubscription) {
    return new Response(JSON.stringify({ error: 'No subscription saved' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify(savedSubscription), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
