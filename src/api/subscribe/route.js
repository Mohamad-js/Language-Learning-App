// app/api/subscribe/route.js
export async function POST(request) {
  try {
    const subscription = await request.json();
    
    // In a real app, you'd save this to your database
    // For now, we'll just log it and return success
    console.log('New push subscription:', subscription);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}